import argparse
import contextlib
import io
import os
import platform
import shutil
import tempfile
import unittest
import zipfile
from pathlib import Path
from unittest.mock import patch

from evalkit import manager as m
from evalkit.assets import TASKS, generate, write, dump
from evalkit.standard import read_standard

SOURCE=m.ROOT


class LifecycleTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory()
        self.root=Path(self.temp.name)
        shutil.copytree(SOURCE/'templates',self.root/'templates',ignore=shutil.ignore_patterns('package-lock.json'))
        shutil.copytree(SOURCE/'rules',self.root/'rules')
        shutil.copy(SOURCE/'llm-evaluation-standard.html',self.root/'llm-evaluation-standard.html')
        self.prepared=self.root/'.prepared'
        generate(self.root,self.prepared)
        standard=read_standard(self.root/'llm-evaluation-standard.html')
        for n,key in enumerate(TASKS,1):
            project=self.prepared/'tasks'/key
            for name in m.RULE_NAMES[:3]: shutil.copy(self.root/'rules/COMMON_RULES.md',project/name)
            write(project/'TASK.md',standard.prompts[f'task{n}'][0])
            write(project/'materials/START.md','本测试用的空环境；未联网。')
            write(self.prepared/'admin'/key/'change.txt',standard.prompts[f'task{n}'][1])
            write(project/'node_modules/local-library.txt','固定依赖样本')
        entries=m.manifest(self.prepared)
        dump(self.prepared/'bundle.json',{'suiteId':m.SUITE_ID,'version':m.VERSION,'seed':20261018,'bundleSha256':m.digest(entries),
            'files':entries,'rulesSha256':m.sha(self.root/'rules/COMMON_RULES.md'),
            'architecture':platform.machine(),'platform':platform.platform(),'node':'test-node','npm':'test-npm'})
        self.patches=[patch.object(m,'ROOT',self.root),patch.object(m,'PREPARED',self.prepared),patch.object(m,'RUNS',self.root/'runs')]
        for p in self.patches: p.start()
        self.stdout=io.StringIO()
        self.redirect=contextlib.redirect_stdout(self.stdout); self.redirect.__enter__()

    def tearDown(self):
        self.redirect.__exit__(None,None,None)
        for p in reversed(self.patches): p.stop()
        # 快照防误写权限不妨碍清理：父目录仍可写。
        self.temp.cleanup()

    def init(self,run_id='test-run',task='1'):
        return m.init_run(argparse.Namespace(model='测试模型',repeat=1,task=task,run_id=run_id,profile='local'))

    def args(self,run,**kwargs): return argparse.Namespace(run=str(run),task='1',**kwargs)

    def test_repeat_init_refuses_overwrite(self):
        run=self.init(); marker=run/'tasks/01-svg/solution/user.svg'; write(marker,'用户成果')
        with self.assertRaisesRegex(ValueError,'拒绝覆盖'): self.init()
        self.assertEqual(marker.read_text(),'用户成果')

    def test_two_runs_have_identical_input_and_independent_files(self):
        first=self.init('a'); second=self.init('b')
        self.assertEqual(m.load(first/'control/baseline.json'),m.load(second/'control/baseline.json'))
        write(first/'tasks/01-svg/solution/a.svg','a')
        self.assertFalse((second/'tasks/01-svg/solution/a.svg').exists())

    def test_future_prompt_and_holdout_not_in_task(self):
        run=self.init(task='all')
        for key in TASKS:
            task=run/'tasks'/key
            self.assertFalse((task/'materials/CHANGE.md').exists())
            self.assertFalse((run/'control/prompts'/f'{key}-change.txt').exists())
            self.assertNotIn('把叉车车宽增加20%',(task/'TASK.md').read_text())
        self.assertFalse((run/'tasks/05-memory/materials/holdout.json').exists())
        self.assertEqual(len(m.load(run/'tasks/05-memory/materials/dev.json')),20)
        self.assertEqual(len(m.load(run/'control/private/05-memory/holdout.json')),60)

    def test_protected_edit_detected_and_invalid_snapshot_kept(self):
        run=self.init(); rules=run/'tasks/01-svg/COMMON_RULES.md'; write(rules,'伪造规则')
        self.assertTrue(m.integrity(run,'01-svg'))
        with self.assertRaisesRegex(ValueError,'变化'): m.snapshot(self.args(run,phase='initial',allow_invalid=False))
        m.snapshot(self.args(run,phase='initial',allow_invalid=True))
        frozen=m.load(run/'control/snapshots/01-svg/initial/snapshot.json')
        self.assertFalse(frozen['integrityPassed'])
        with self.assertRaisesRegex(ValueError,'无效'): m.release_change(run,'01-svg',run/'tasks/01-svg')

    def test_new_protected_file_and_removed_input_detected(self):
        run=self.init(); project=run/'tasks/01-svg'
        write(project/'materials/extra.txt','额外材料')
        (project/'materials/README.md').unlink()
        problems=m.integrity(run,'01-svg')
        self.assertIn('added',[p['kind'] for p in problems]); self.assertIn('missing',[p['kind'] for p in problems])

    def test_solution_edit_and_runtime_cache_are_allowed(self):
        run=self.init(); project=run/'tasks/01-svg'
        write(project/'solution/test.svg','svg'); write(project/'.runtime/cache.txt','cache')
        self.assertEqual(m.integrity(run,'01-svg'),[])
        m.snapshot(self.args(run,phase='initial',allow_invalid=False))
        self.assertFalse((run/'control/snapshots/01-svg/initial/project/.runtime').exists())

    def test_change_requires_freeze_and_does_not_rewrite_snapshot(self):
        run=self.init(); project=run/'tasks/01-svg'
        with self.assertRaisesRegex(ValueError,'尚未冻结'): m.release_change(run,'01-svg',project)
        write(project/'solution/animation.svg','初始版')
        m.snapshot(self.args(run,phase='initial',allow_invalid=False))
        m.release_change(run,'01-svg',project)
        write(project/'solution/animation.svg','追加版')
        m.snapshot(self.args(run,phase='change',allow_invalid=False))
        self.assertEqual((run/'control/snapshots/01-svg/initial/project/solution/animation.svg').read_text(),'初始版')
        self.assertEqual((run/'control/snapshots/01-svg/change/project/solution/animation.svg').read_text(),'追加版')

    def test_snapshot_cannot_be_overwritten(self):
        run=self.init(); args=self.args(run,phase='initial',allow_invalid=False)
        m.snapshot(args)
        with self.assertRaisesRegex(ValueError,'拒绝覆盖'): m.snapshot(args)

    def test_modification_after_initial_freeze_blocks_change(self):
        run=self.init(); m.snapshot(self.args(run,phase='initial',allow_invalid=False))
        write(run/'tasks/01-svg/solution/late.svg','偷偷增加实现')
        with self.assertRaisesRegex(ValueError,'不同'): m.release_change(run,'01-svg',run/'tasks/01-svg')

    def test_modified_frozen_snapshot_blocks_change(self):
        run=self.init(); m.snapshot(self.args(run,phase='initial',allow_invalid=False))
        p=run/'control/snapshots/01-svg/initial/project/TASK.md'; p.chmod(0o644); write(p,'篡改')
        with self.assertRaisesRegex(ValueError,'篡改'): m.release_change(run,'01-svg',run/'tasks/01-svg')

    def test_external_directory_symlink_is_rejected(self):
        run=self.init(); project=run/'tasks/01-svg'
        (project/'outside').symlink_to(self.root,target_is_directory=True)
        with self.assertRaisesRegex(ValueError,'越界'): m.integrity(run,'01-svg')

    def test_external_file_symlink_is_rejected(self):
        run=self.init(); project=run/'tasks/01-svg'
        (project/'solution/secret').symlink_to(self.root/'llm-evaluation-standard.html')
        with self.assertRaisesRegex(ValueError,'越界'): m.snapshot(self.args(run,phase='initial',allow_invalid=False))

    def test_external_hardlink_is_rejected(self):
        run=self.init(); os.link(self.root/'llm-evaluation-standard.html',run/'tasks/01-svg/solution/secret')
        with self.assertRaisesRegex(ValueError,'硬链接'): m.integrity(run,'01-svg')

    def test_path_traversal_and_foreign_run_rejected(self):
        with self.assertRaises(ValueError): self.init('../escape')
        with self.assertRaises(ValueError): m.get_run(str(self.root))
        self.assertFalse((self.root/'escape').exists())

    def test_tampered_prepared_bundle_prevents_new_runs(self):
        write(self.prepared/'tasks/01-svg/TASK.md','changed')
        with self.assertRaisesRegex(ValueError,'变化'): self.init()

    def test_export_omits_future_and_admin_material(self):
        run=self.init(task='5')
        m.export_project(argparse.Namespace(run=str(run),task='5'))
        with zipfile.ZipFile(run/'control/exports/05-memory.zip') as archive:
            names=archive.namelist()
        self.assertTrue(any(name.endswith('materials/dev.json') for name in names))
        self.assertFalse(any('holdout' in name or 'change' in name or 'node_modules' in name for name in names))

    def test_export_refuses_implementation_changes(self):
        run=self.init(); write(run/'tasks/01-svg/solution/done.svg','完成成果')
        with self.assertRaisesRegex(ValueError,'实现变更'): m.export_project(self.args(run))

    def test_memory_change_materials_only_released_after_freeze(self):
        run=self.init(task='5'); project=run/'tasks/05-memory'
        self.assertFalse((project/'materials/change').exists())
        m.snapshot(argparse.Namespace(run=str(run),task='5',phase='initial',allow_invalid=False))
        m.release_change(run,'05-memory',project)
        self.assertEqual(len(m.load(project/'materials/change/dev.json')),24)
        self.assertEqual(m.integrity(run,'05-memory'),[])
        write(project/'materials/change/dev.json','[]')
        self.assertTrue(m.integrity(run,'05-memory'))

    def test_sandbox_command_has_no_host_root_or_network(self):
        run=self.init(); project=run/'tasks/01-svg'
        cmd=m.sandbox_command(run,'01-svg',project,'image:1')
        self.assertEqual(cmd[cmd.index('--network')+1],'none')
        self.assertIn('--read-only',cmd); self.assertIn('--cap-drop',cmd)
        self.assertNotIn('--privileged',cmd); self.assertNotIn('/var/run/docker.sock',' '.join(cmd))
        mounts=[cmd[i+1] for i,value in enumerate(cmd) if value=='--mount']
        self.assertTrue(all(f'source={project}' in mount for mount in mounts))

    def test_sandbox_profile_rejects_mac_dependencies(self):
        if not platform.platform().startswith('macOS'): self.skipTest('当前非macOS')
        with self.assertRaisesRegex(ValueError,'Linux'):
            m.init_run(argparse.Namespace(model='m',repeat=1,task='1',run_id='bad',profile='sandbox'))

    def test_generated_game_and_research_contracts_are_deterministic(self):
        other=self.root/'regenerated'; generate(self.root,other)
        for key,filename in [('03-game2d','level.json'),('04-game3d','warehouse.json'),('05-memory','corpus.json')]:
            self.assertEqual((self.prepared/'tasks'/key/'materials'/filename).read_bytes(),(other/'tasks'/key/'materials'/filename).read_bytes())
        dev=m.load(self.prepared/'tasks/05-memory/materials/dev.json')
        holdout=m.load(self.prepared/'admin/05-memory/holdout.json')
        self.assertFalse({q['group'] for q in dev}&{q['group'] for q in holdout})


if __name__=='__main__': unittest.main()
