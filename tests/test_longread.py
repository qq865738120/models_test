import argparse,datetime as dt,json,tempfile,unittest
from pathlib import Path
from evalkit import manager as m
from evalkit.longread import validate,install
from evalkit.catalog import catalog,candidate_task
from evalkit.standard import read_standard
import test_lifecycle as fixture

ROOT=Path(__file__).resolve().parents[1]
class CorpusTests(unittest.TestCase):
    def test_frozen_corpus_dates_integrity_and_novel_anchors(self):
        source,meta=validate(ROOT)
        self.assertEqual(meta['statistics']['publicationMonths'],{'2026-10':25,'2026-09':17,'2026-08':8})
        novel=meta['novel'];self.assertEqual(novel['paragraphs'],4517)
        full=(source/'novel/novel.txt').read_text()
        self.assertIn('[N012-P0097]',full);self.assertIn('[N058-P0038]',full)
        self.assertIn('〔原书注：',full)
        self.assertEqual(full,'\n'.join((source/'novel'/s['file']).read_text() for s in novel['sections']))
    def test_distribution_excludes_host_reference_and_legacy_answers(self):
        with tempfile.TemporaryDirectory() as folder:
            target=Path(folder);install(ROOT,target)
            task=target/'tasks/06-memory'
            self.assertEqual(len(list((task/'materials/papers').glob('*.pdf'))),50)
            self.assertEqual(len(list((task/'materials/novel').glob('N*.txt'))),58)
            self.assertFalse((task/'materials/host').exists())
            self.assertFalse((task/'materials/holdout.json').exists())
            self.assertTrue((target/'admin/06-memory/reference.md').exists())
            self.assertFalse(any(p.name in ('REFERENCE.md','RUBRIC.json','TASK-CORE.md') for p in task.rglob('*')))
    def test_objective_questions_with_separate_host_key(self):
        prompt=candidate_task('06-memory',read_standard(ROOT/'llm-evaluation-standard.html'))
        for word in ['18题','output/answers.json','全部字段正确','0分']:
            self.assertIn(word,prompt)
        for word in ['output/index.html','N058-P0038','西游记','NPC']:
            self.assertNotIn(word,prompt)
        self.assertEqual(sum(d['weight'] for d in catalog()[-1]['rubric']),100)

class HistoryTests(unittest.TestCase):
    setUp=fixture.LifecycleTests.setUp
    tearDown=fixture.LifecycleTests.tearDown
    init=fixture.LifecycleTests.init
    def test_new_research_change_needs_no_legacy_npc_files(self):
        run=self.init(task='6')
        private=run/'control/private/06-memory'
        for name in ('change-corpus.json','change-dev.json'):
            (private/name).unlink()
        from evalkit.longread import CHANGE
        (private/'change.txt').write_text(CHANGE)
        m.snapshot(argparse.Namespace(run=str(run),task='6',phase='initial',allow_invalid=False))
        m.release_change(run,'06-memory',run/'tasks/06-memory')
        self.assertIn('前提敏感性复核',(run/'control/prompts/06-memory-change.txt').read_text())
        self.assertFalse((run/'tasks/06-memory/materials/change').exists())
        self.assertEqual(m.integrity(run,'06-memory'),[])
    def test_pinned_old_title_and_timer_survive_catalog_changes(self):
        run=self.init(task='6');pinned=m.load(run/'control/rubric.json')
        old=next(t for t in pinned['tasks'] if t['id']=='06-memory');old.update(title='旧研究题',minutes=90)
        m.dump(run/'control/rubric.json',pinned)
        m.mark_start(argparse.Namespace(run=str(run),task='6'))
        state=m.load(run/'control/run.json')['tasks']['06-memory']
        duration=dt.datetime.fromisoformat(state['deadlineAt'])-dt.datetime.fromisoformat(state['startedAt'])
        self.assertAlmostEqual(duration.total_seconds(),5400,delta=2)
        from evalkit.studio import Studio
        studio=Studio(self.root/'data',9000)
        try:self.assertEqual(studio.summary(run)['taskCatalog'][-1]['title'],'旧研究题')
        finally:studio.worker.shutdown()
    def test_prepared_catalog_version_is_pinned(self):
        pinned={'version':'fixed-test-version','tasks':catalog()}
        pinned['tasks'][-1]['title']='固定材料题'
        m.dump(self.prepared/'rubric.json',pinned)
        meta=m.load(self.prepared/'bundle.json');meta['files']=m.manifest(self.prepared,skip=('bundle.json',));meta['bundleSha256']=m.digest(meta['files']);m.dump(self.prepared/'bundle.json',meta)
        run=self.init()
        self.assertEqual(m.load(run/'control/rubric.json'),pinned)
        self.assertEqual(m.load(run/'control/run.json')['rubricVersion'],'fixed-test-version')
