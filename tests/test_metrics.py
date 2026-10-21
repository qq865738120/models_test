import importlib.util
import unittest
from evalkit.manager import ROOT

spec=importlib.util.spec_from_file_location('metrics',ROOT/'templates/06-memory/tools/metrics.py')
metrics=importlib.util.module_from_spec(spec); spec.loader.exec_module(metrics)


class MetricsTests(unittest.TestCase):
    def test_empty_answers_have_separate_denominator(self):
        rows=[{'id':'a','group':'g','category':'update','retrievedIds':['new','old'],'validEvidenceIds':['new'],'staleEvidenceIds':['old']},
              {'id':'b','group':'h','category':'abstain','retrievedIds':['bad'],'validEvidenceIds':[],'staleEvidenceIds':[]}]
        result=metrics.summary(rows)
        self.assertEqual(result['recallAt5'],{'value':1,'n':1})
        self.assertEqual(result['staleFraction'],{'value':.5,'n':1})
        self.assertEqual(result['abstainError'],{'value':1,'n':1})

    def test_grouped_pairing_is_reproducible_and_rejects_mismatches(self):
        row={'id':'a','group':'g','category':'update','retrievedIds':[],'validEvidenceIds':['new'],'staleEvidenceIds':['old']}
        better={**row,'retrievedIds':['new']}
        result=metrics.paired_interval([row],[better])
        self.assertEqual(result['difference'],1); self.assertEqual(result['ci95'],[1,1])
        self.assertEqual(result,metrics.paired_interval([row],[better]))
        with self.assertRaises(ValueError): metrics.paired_interval([row],[{**better,'id':'other'}])


if __name__=='__main__': unittest.main()
