import argparse
import csv
import io
import json
import unittest
from pathlib import Path
from unittest.mock import patch
import test_lifecycle as fixture
from evalkit import manager as m
from evalkit.catalog import catalog, candidate_task, candidate_change, RUBRIC_VERSION
from evalkit.harnesses import normalize_harness, harness_options
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
            self.assertEqual(len(task['rubric']),5)
            for dims in (task['rubric'],task.get('rubricChange',task['rubric'])):
                self.assertEqual(sum(d['weight'] for d in dims),100)
                for d in dims:
                    self.assertEqual([a['score'] for a in d['anchors']],[0,2,5,8,10])
                    self.assertTrue(d['checks'])
            if task['id'] in ('02-dispatch','03-game2d','04-game3d'):
                prompt=candidate_task(task['id'],standard)
                self.assertGreater(len(prompt),1500)
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
        old_task=(old/'tasks/04-game3d/TASK.md').read_bytes()
        old_rubric=(old/'control/rubric.json').read_bytes()
        meta=m.load(self.prepared/'bundle.json');meta['version']='pelican-v1.0-longread-20261018';m.dump(self.prepared/'bundle.json',meta)
        with patch.object(m.subprocess,'run',side_effect=AssertionError('must stay offline')):
            m.revise_prepared(argparse.Namespace())
        self.assertEqual((old/'tasks/04-game3d/TASK.md').read_bytes(),old_task)
        self.assertEqual((old/'control/rubric.json').read_bytes(),old_rubric)
        self.assertEqual(m.ensure_prepared()['version'],m.VERSION)
        self.assertEqual(m.load(self.prepared/'rubric.json')['version'],RUBRIC_VERSION)
        self.assertEqual(len(list(self.root.glob('.prepared-backup-*'))),1)
        self.assertNotIn('追加', (self.prepared/'tasks/04-game3d/materials/CONTRACT.md').read_text())
        self.assertNotIn('fragilePackageId',m.load(self.prepared/'tasks/03-game2d/materials/level.json'))
        self.assertEqual((self.prepared/'tasks/03-game2d/materials/level.json').read_bytes(),(self.prepared/'tasks/03-game2d/public/materials/level.json').read_bytes())
        new=self.init('new',task='all')
        self.assertNotEqual(m.load(new/'control/run.json')['bundleSha256'],m.load(old/'control/run.json')['bundleSha256'])
        with self.assertRaisesRegex(ValueError,'拒绝重复'):m.revise_prepared(argparse.Namespace())

    def test_revision_from_prompt_v3_preserves_predecessor(self):
        meta=m.load(self.prepared/'bundle.json');meta['version']='pelican-v1.0-prompts-20261019';m.dump(self.prepared/'bundle.json',meta)
        old_hash=meta['bundleSha256']
        old_text=(self.prepared/'tasks/02-dispatch/TASK.md').read_bytes()
        with patch.object(m.subprocess,'run',side_effect=AssertionError('must stay offline')):
            m.revise_prepared(argparse.Namespace())
        backup=next(self.root.glob('.prepared-backup-*'))
        self.assertEqual((backup/'tasks/02-dispatch/TASK.md').read_bytes(),old_text)
        self.assertEqual(m.load(backup/'bundle.json')['bundleSha256'],old_hash)
        self.assertEqual(m.ensure_prepared()['previousBundleSha256'],old_hash)
        expected=candidate_task('02-dispatch',read_standard(self.root/'llm-evaluation-standard.html'))+'\n'
        self.assertEqual((self.prepared/'tasks/02-dispatch/TASK.md').read_text(),expected)

    def test_tampered_bundle_revision_rejected(self):
        meta=m.load(self.prepared/'bundle.json');meta['version']='pelican-v1.0-longread-20261018';m.dump(self.prepared/'bundle.json',meta)
        m.write(self.prepared/'tasks/01-svg/TASK.md','tampered')
        with self.assertRaisesRegex(ValueError,'完整性'):m.revise_prepared(argparse.Namespace())
        self.assertFalse(list(self.root.glob('.prepared-backup-*')))
