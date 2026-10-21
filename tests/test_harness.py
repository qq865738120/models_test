import argparse
import csv
import io
import json
import shutil
import unittest
from pathlib import Path
from unittest.mock import patch
import test_lifecycle as fixture
from evalkit import manager as m
from evalkit.catalog import catalog, candidate_task, candidate_change, RUBRIC_VERSION
from evalkit.harnesses import normalize_harness, harness_options
from evalkit.objective import question_bank
from evalkit.standard import read_standard
from evalkit.studio import Studio


class HarnessTests(unittest.TestCase):
    def test_catalog_and_validation(self):
        ids=[o['id'] for o in harness_options()]
        self.assertEqual(len(ids),len(set(ids)))
        self.assertTrue({'codex','claude-code','deepseek-harness','opencode','other'}<=set(ids))
        for bad in ([],True,'imaginary'):
            with self.assertRaises(ValueError): normalize_harness(bad)
        for args in [('other',''),('other','x'*121),('other','bad\nname')]:
            with self.assertRaises(ValueError): normalize_harness(*args)
        self.assertEqual(normalize_harness()['harness'],None)

    def test_detailed_rubrics_and_public_separation(self):
        standard=read_standard(m.ROOT/'llm-evaluation-standard.html')
        for task in catalog():
            if task.get('scoringMode')=='objective':
                self.assertEqual(len(task['rubric']),18)
                self.assertEqual(len(task['rubricChange']),6)
                public=question_bank()['phases']
                for phase,dims in (('initial',task['rubric']),('change',task['rubricChange'])):
                    self.assertEqual(sum(d['weight'] for d in dims),100)
                    kinds={q['id']:q['scoring'] for q in public[phase]}
                    for d in dims:
                        self.assertEqual([a['score'] for a in d['anchors']],
                                         [0,0.5,1] if kinds[d['id']]=='evidence-tier' else [0,1])
                continue
            self.assertGreaterEqual(len(task['rubric']),3 if task['id'] in ('01-svg','02-static') else 5)
            for dims in (task['rubric'],task.get('rubricChange',task['rubric'])):
                self.assertEqual(sum(d['weight'] for d in dims),100)
                for d in dims:
                    self.assertEqual([a['score'] for a in d['anchors']],
                                     [0,1] if d['scoring']=='auto' else [0,5,10])
                    self.assertTrue(d['checks'])
            if task['id'] in ('03-dispatch','04-game2d','05-game3d'):
                prompt=candidate_task(task['id'],standard)
                self.assertIn('output/index.html',prompt)
                self.assertIn({'03-dispatch':'React','04-game2d':'Phaser','05-game3d':'enable3d'}[task['id']],prompt)
                self.assertNotIn('rubric',prompt)
                for hidden in ('评分','权重','fragilePackageId','车宽增加20%','URL同步'):
                    self.assertNotIn(hidden,prompt)
                self.assertTrue(candidate_change(task['id'],standard))


class HarnessPersistenceTests(unittest.TestCase):
    setUp=fixture.LifecycleTests.setUp
    tearDown=fixture.LifecycleTests.tearDown
    init=fixture.LifecycleTests.init

    def studio(self):
        s=Studio(self.root/'data'); self.addCleanup(s.worker.shutdown); return s

    def test_create_edit_export_and_legacy_unknown(self):
        run=m.init_run(argparse.Namespace(model='M',repeat=1,task='1',run_id='harness',profile='local',harness='deepseek-harness',harness_custom=''))
        self.assertNotIn('harnessVersion',m.load(run/'control/run.json'))
        # Preserve historical metadata while excluding it from current summaries/exports.
        meta=m.load(run/'control/run.json');meta['harnessVersion']='legacy';m.dump(run/'control/run.json',meta)
        studio=self.studio()
        self.assertEqual(studio.summary(run)['harness'],'deepseek-harness')
        updated=studio.update_run(run.name,{'harness':'other','harnessCustom':'Custom','harnessVersion':'v2'})
        self.assertEqual(updated['run']['harnessCustom'],'Custom')
        self.assertEqual(m.load(run/'control/run.json')['harnessVersion'],'legacy')
        self.assertEqual(len(m.load(run/'control/run.json')['harnessHistory']),1)
        exported=json.loads(studio.export('json')[0]); self.assertNotIn('harnessVersion',exported['records'][0]['run'])
        header=next(csv.reader(io.StringIO(studio.export('csv')[0].decode('utf-8-sig'))))
        self.assertNotIn('harness_version',header)
        old=self.init('old');meta=m.load(old/'control/run.json')
        for key in ('harness','harnessCustom','harnessVersion'):meta.pop(key,None)
        m.dump(old/'control/run.json',meta)
        self.assertIsNone(studio.summary(old)['harness'])
        before=(run/'control/run.json').read_bytes()
        with self.assertRaises(ValueError): studio.update_run(run.name,{'model':'changed','harness':'invalid'})
        self.assertEqual((run/'control/run.json').read_bytes(),before)

    def test_api_create_passes_harness_to_initialization(self):
        studio=self.studio()
        with patch.object(studio,'submit',side_effect=lambda label,operation:operation()),patch.object(m,'init_run',return_value=Path('/tmp/new')) as init:
            self.assertEqual(studio.create_run({'model':'M','harness':'codex','harnessVersion':'7'})['runId'],'new')
            self.assertEqual(init.call_args.args[0].harness,'codex')
            self.assertFalse(hasattr(init.call_args.args[0],'harness_version'))
        with self.assertRaises(ValueError):studio.create_run({'model':'M','harness':'other'})

    def test_offline_revision_preserves_old_runs_and_refuses_repeat(self):
        old=self.init('old',task='all')
        old_task=(old/'tasks/05-game3d/TASK.md').read_bytes()
        old_rubric=(old/'control/rubric.json').read_bytes()
        meta=m.load(self.prepared/'bundle.json');meta['version']='pelican-v1.0-longread-20261018';m.dump(self.prepared/'bundle.json',meta)
        with patch.object(m.subprocess,'run',side_effect=AssertionError('must stay offline')):
            m.revise_prepared(argparse.Namespace())
        self.assertEqual((old/'tasks/05-game3d/TASK.md').read_bytes(),old_task)
        self.assertEqual((old/'control/rubric.json').read_bytes(),old_rubric)
        self.assertEqual(m.ensure_prepared()['version'],m.VERSION)
        self.assertEqual(m.load(self.prepared/'rubric.json')['version'],RUBRIC_VERSION)
        self.assertEqual(len(list(self.root.glob('.prepared-backup-*'))),1)
        self.assertNotIn('追加', (self.prepared/'tasks/05-game3d/materials/CONTRACT.md').read_text())
        self.assertNotIn('fragilePackageId',m.load(self.prepared/'tasks/04-game2d/materials/level.json'))
        self.assertEqual((self.prepared/'tasks/04-game2d/materials/level.json').read_bytes(),(self.prepared/'tasks/04-game2d/public/materials/level.json').read_bytes())
        new=self.init('new',task='all')
        self.assertNotEqual(m.load(new/'control/run.json')['bundleSha256'],m.load(old/'control/run.json')['bundleSha256'])
        with self.assertRaisesRegex(ValueError,'拒绝重复'):m.revise_prepared(argparse.Namespace())

    def test_revision_from_prompt_v3_preserves_predecessor(self):
        meta=m.load(self.prepared/'bundle.json');meta['version']='pelican-v1.0-prompts-20261019';m.dump(self.prepared/'bundle.json',meta)
        old_hash=meta['bundleSha256']
        old_text=(self.prepared/'tasks/03-dispatch/TASK.md').read_bytes()
        with patch.object(m.subprocess,'run',side_effect=AssertionError('must stay offline')):
            m.revise_prepared(argparse.Namespace())
        backup=next(self.root.glob('.prepared-backup-*'))
        self.assertEqual((backup/'tasks/03-dispatch/TASK.md').read_bytes(),old_text)
        self.assertEqual(m.load(backup/'bundle.json')['bundleSha256'],old_hash)
        self.assertEqual(m.ensure_prepared()['previousBundleSha256'],old_hash)
        expected=candidate_task('03-dispatch',read_standard(self.root/'llm-evaluation-standard.html'))+'\n'
        self.assertEqual((self.prepared/'tasks/03-dispatch/TASK.md').read_text(),expected)

    def test_tampered_bundle_revision_rejected(self):
        meta=m.load(self.prepared/'bundle.json');meta['version']='pelican-v1.0-longread-20261018';m.dump(self.prepared/'bundle.json',meta)
        m.write(self.prepared/'tasks/01-svg/TASK.md','tampered')
        with self.assertRaisesRegex(ValueError,'完整性'):m.revise_prepared(argparse.Namespace())
        self.assertFalse(list(self.root.glob('.prepared-backup-*')))

    def test_objective_five_task_bundle_revises_offline_without_renumbering_history(self):
        legacy_ids={'03-dispatch':'02-dispatch','04-game2d':'03-game2d',
                    '05-game3d':'04-game3d','06-memory':'05-memory'}
        legacy_tasks={legacy_ids.get(key,key):value for key,value in m.TASKS.items() if key!='02-static'}
        for relative in ('tasks/02-static','admin/02-static'):
            shutil.rmtree(self.prepared/relative)
        for current,legacy in legacy_ids.items():
            for relative in ('tasks','admin'):
                (self.prepared/relative/current).rename(self.prepared/relative/legacy)
        old_catalog=[task for task in catalog() if task['id']!='02-static']
        for task in old_catalog:
            task['id']=legacy_ids.get(task['id'],task['id'])
            task['number']=task['id'].split('-',1)[0]
        m.dump(self.prepared/'rubric.json',{'version':'pelican-rubric-5','tasks':old_catalog})
        m.dump(self.prepared/'catalog.json',{key:{'title':v[0],'initialMinutes':v[1],'changeMinutes':v[2]} for key,v in legacy_tasks.items()})
        meta=m.load(self.prepared/'bundle.json')
        meta.update(version='pelican-v1.0-objective-20261020')
        meta['files']=m.manifest(self.prepared,skip=('bundle.json',))
        meta['bundleSha256']=m.digest(meta['files'])
        m.dump(self.prepared/'bundle.json',meta)
        with patch.object(m,'VERSION',meta['version']),patch.dict(m.TASKS,legacy_tasks,clear=True):
            old=self.init('old-five',task='all')
        before=m.manifest(old)
        with patch.object(m.subprocess,'run',side_effect=AssertionError('must stay offline')):
            m.revise_prepared(argparse.Namespace())
        self.assertEqual(m.manifest(old),before)
        self.assertEqual(m.get_task(old,'2')[0],'02-dispatch')
        self.assertEqual(m.get_task(old,'5')[0],'05-memory')
        self.assertEqual(len(m.load(old/'control/rubric.json')['tasks']),5)
        backup=next(self.root.glob('.prepared-backup-*'))
        self.assertEqual(m.load(backup/'bundle.json'),meta)
        self.assertFalse((backup/'tasks/02-static').exists())
        self.assertEqual(list(m.load(self.prepared/'catalog.json')),list(m.TASKS))
        prepared_rubric=m.load(self.prepared/'rubric.json')
        self.assertEqual(prepared_rubric['version'],m.RUBRIC_VERSION)
        self.assertEqual([task['number'] for task in prepared_rubric['tasks']],['01','02','03','04','05','06'])
        self.assertEqual(len(m.load(self.prepared/'catalog.json')),6)
        new=self.init('new-six',task='all')
        self.assertEqual(m.get_task(new,'2')[0],'02-static')
        self.assertEqual(m.get_task(new,'3')[0],'03-dispatch')
        self.assertEqual(m.get_task(new,'6')[0],'06-memory')
        self.assertEqual(len(m.load(new/'control/run.json')['tasks']),6)
        self.assertTrue((new/'tasks/02-static/TASK.md').is_file())
        self.assertTrue((new/'tasks/02-static/materials/START.md').is_file())
        self.assertFalse((new/'tasks/02-static/package.json').exists())
        self.assertFalse((new/'tasks/02-static/node_modules').exists())
        self.assertEqual(m.integrity(new,'02-static'),[])
        static=new/'tasks/02-static'
        public_text='\n'.join(path.read_text() for path in static.rglob('*') if path.is_file())
        self.assertNotIn('30秒认识鹈鹕',public_text)
        self.assertNotIn('不超过180字',public_text)
        self.assertNotIn('rubricChange',public_text)
        self.assertFalse((static/'materials/CHANGE.md').exists())
        self.assertIn('30秒认识鹈鹕',(new/'control/private/02-static/change.txt').read_text())

    def test_numeric_selection_uses_run_catalog_and_id_prefix_fallback(self):
        self.assertEqual(m.task_keys('2'),['02-static'])
        self.assertEqual(m.task_keys('6'),['06-memory'])
        with self.assertRaises(ValueError): m.task_keys('7')
        run=self.init('memory-only',task='6')
        self.assertEqual(m.get_task(run,'6')[0],'06-memory')
        self.assertEqual(m.get_task(run,'06-memory')[0],'06-memory')
        with self.assertRaises(ValueError): m.get_task(run,'5')
        (run/'control/rubric.json').unlink()
        self.assertEqual(m.get_task(run,'6')[0],'06-memory')
        with self.assertRaises(ValueError): m.get_task(run,'5')
        with self.assertRaises(ValueError): m.get_task(run,'all')

    def test_hybrid_bundle_with_duplicate_prefixes_revises_both_task_and_admin_directories(self):
        legacy_ids={'03-dispatch':'02-dispatch','04-game2d':'03-game2d',
                    '05-game3d':'04-game3d','06-memory':'05-memory'}
        legacy_tasks={legacy_ids.get(key,key):value for key,value in m.TASKS.items()}
        for current,legacy in legacy_ids.items():
            for relative in ('tasks','admin'):
                (self.prepared/relative/current).rename(self.prepared/relative/legacy)
        old_catalog=catalog()
        for task in old_catalog: task['id']=legacy_ids.get(task['id'],task['id'])
        m.dump(self.prepared/'rubric.json',{'version':'pelican-rubric-7','tasks':old_catalog})
        m.dump(self.prepared/'catalog.json',{key:{'title':v[0],'initialMinutes':v[1],'changeMinutes':v[2]}
                                            for key,v in legacy_tasks.items()})
        meta=m.load(self.prepared/'bundle.json')
        meta['version']='pelican-v1.0-hybrid-20261020'
        meta['files']=m.manifest(self.prepared,skip=('bundle.json',))
        meta['bundleSha256']=m.digest(meta['files'])
        m.dump(self.prepared/'bundle.json',meta)
        with patch.object(m,'VERSION',meta['version']),patch.dict(m.TASKS,legacy_tasks,clear=True):
            old=self.init('old-duplicate-prefixes',task='all')
        before=m.manifest(old)
        with patch.object(m.subprocess,'run',side_effect=AssertionError('must stay offline')):
            m.revise_prepared(argparse.Namespace())
        self.assertEqual(m.manifest(old),before)
        for relative in ('tasks','admin'):
            self.assertEqual(sorted(path.name for path in (self.prepared/relative).iterdir()
                                    if path.is_dir()),list(m.TASKS))
        self.assertEqual(m.load(self.prepared/'bundle.json')['previousBundleSha256'],meta['bundleSha256'])
        new=self.init('new-contiguous-prefixes',task='all')
        self.assertEqual(sorted(path.name for path in (new/'tasks').iterdir()),list(m.TASKS))
        for number,key in enumerate(m.TASKS,1):
            self.assertEqual(m.get_task(new,str(number)),m.get_task(new,key))
            self.assertEqual(m.integrity(new,key),[])
