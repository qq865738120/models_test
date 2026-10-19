import argparse
import csv
import io
import json
import unittest
from pathlib import Path
from unittest.mock import patch
import test_lifecycle as fixture
from evalkit import manager as m
from evalkit.reasoning import normalize_reasoning,reasoning_options
from evalkit.studio import Studio

class ReasoningTests(unittest.TestCase):
    def test_exactly_five_levels_and_separate_status(self):
        self.assertEqual([o['id'] for o in reasoning_options()],['1','2','3','4','5'])
        for value in ('1','2','3','4','5','unsupported'):self.assertEqual(normalize_reasoning(value),value)
        for value in (None,''):self.assertIsNone(normalize_reasoning(value))
        for value in (True,1,5,[],{},'high','default','0','6','1\n'):
            with self.subTest(value=value),self.assertRaises(ValueError):normalize_reasoning(value)

class ReasoningPersistenceTests(unittest.TestCase):
    setUp=fixture.LifecycleTests.setUp
    tearDown=fixture.LifecycleTests.tearDown
    init=fixture.LifecycleTests.init

    def studio(self):
        studio=Studio(self.root/'data');self.addCleanup(studio.worker.shutdown);return studio

    def test_create_edit_restart_export_and_invalid_atomicity(self):
        run=m.init_run(argparse.Namespace(model='M',repeat=1,task='1',run_id='effort',profile='local',harness='codex',harness_custom='',reasoning_level='4'))
        s=self.studio()
        self.assertEqual(s.summary(run)['reasoningLevel'],'4')
        s.update_run(run.name,{'reasoningLevel':'5'})
        self.assertEqual(self.studio().detail(run.name)['run']['reasoningLevel'],'5')
        self.assertEqual(m.load(run/'control/run.json')['reasoningHistory'][-1]['before'],'4')
        before=(run/'control/run.json').read_bytes()
        with self.assertRaises(ValueError):s.update_run(run.name,{'model':'Changed','reasoningLevel':'high'})
        self.assertEqual((run/'control/run.json').read_bytes(),before)
        m.write(run/'tasks/01-svg/output/index.html','<!doctype html><title>test</title>')
        detail=s.import_artifact(run.name,'01-svg','initial');a=detail['tasks']['01-svg']['artifacts']['initial'][0]
        from evalkit.catalog import catalog
        s.save_score(run.name,'01-svg','initial',{'revision':detail['review']['revision'],'artifactId':a['id'],'values':{d['id']:5 for d in catalog()[0]['rubric']}})
        rows=list(csv.DictReader(io.StringIO(s.export('csv')[0].decode('utf-8-sig'))))
        self.assertTrue(rows);self.assertEqual(rows[0]['reasoning_level'],'5')
        self.assertEqual(json.loads(s.export('json')[0])['records'][0]['run']['reasoningLevel'],'5')
        s.update_run(run.name,{'reasoningLevel':'unsupported'});self.assertEqual(s.summary(run)['reasoningLevel'],'unsupported')
        s.update_run(run.name,{'reasoningLevel':''});self.assertIsNone(s.summary(run)['reasoningLevel'])

    def test_legacy_raw_value_not_guessed_and_record_cli(self):
        run=self.init();meta=m.load(run/'control/run.json');meta['environment']['reasoning']='high';meta['environment'].pop('reasoningLevel',None);m.dump(run/'control/run.json',meta)
        s=self.studio();self.assertIsNone(s.summary(run)['reasoningLevel']);self.assertEqual(s.summary(run)['reasoningOriginal'],'high')
        m.record(argparse.Namespace(run=str(run),agentClient=None,browser=None,reasoning=None,temperature=None,hardware=None,reasoning_level='3',intervention=None))
        self.assertEqual(s.summary(run)['reasoningLevel'],'3');self.assertEqual(s.summary(run)['reasoningOriginal'],'high')
        s.update_run(run.name,{'reasoningLevel':'5'})
        self.assertEqual(m.load(run/'control/run.json')['environment']['reasoning'],'high')

    def test_api_passes_level_and_rejects_bad_values(self):
        s=self.studio()
        with patch.object(s,'submit',side_effect=lambda label,operation:operation()),patch.object(m,'init_run',return_value=Path('/tmp/test')) as init:
            s.create_run({'model':'M','harness':'codex','reasoningLevel':'2'})
            self.assertEqual(init.call_args.args[0].reasoning_level,'2')
        for value in ('high',True,[],{}):
            with self.assertRaises(ValueError):s.create_run({'model':'M','reasoningLevel':value})
