import unittest

from evalkit import manager as m
from evalkit.catalog import catalog
import test_lifecycle as fixture


EXPECTED_IDS = [
    '01-svg', '02-static', '03-dispatch',
    '04-game2d', '05-game3d', '06-memory',
]
RETIRED_IDS = ['02-dispatch', '03-game2d', '04-game3d', '05-memory']


class CatalogNumberingTests(unittest.TestCase):
    def test_task_ids_match_displayed_numbers_in_order(self):
        tasks = catalog()
        self.assertEqual([task['id'] for task in tasks], EXPECTED_IDS)
        for number, task in enumerate(tasks, 1):
            with self.subTest(task=task['id']):
                self.assertEqual(task['number'], f'{number:02d}')
                self.assertEqual(task['id'].split('-', 1)[0], task['number'])

    def test_cli_numbers_and_explicit_ids_select_the_same_tasks(self):
        self.assertEqual(m.task_keys('all'), EXPECTED_IDS)
        for number, key in enumerate(EXPECTED_IDS, 1):
            with self.subTest(task=key):
                self.assertEqual(m.task_keys(str(number)), [key])
                self.assertEqual(m.task_keys(key), [key])

    def test_retired_ids_are_rejected_instead_of_selecting_another_task(self):
        for key in RETIRED_IDS:
            with self.subTest(task=key), self.assertRaises(ValueError):
                m.task_keys(key)


class InitializedNumberingTests(unittest.TestCase):
    setUp = fixture.LifecycleTests.setUp
    tearDown = fixture.LifecycleTests.tearDown
    init = fixture.LifecycleTests.init

    def test_all_six_task_directories_have_unique_contiguous_prefixes(self):
        run = self.init(task='all')
        directories = sorted(path.name for path in (run / 'tasks').iterdir() if path.is_dir())
        self.assertEqual(directories, EXPECTED_IDS)
        self.assertEqual([key.split('-', 1)[0] for key in directories],
                         [f'{number:02d}' for number in range(1, 7)])
        self.assertEqual(list(m.load(run / 'control/run.json')['tasks']), EXPECTED_IDS)
        self.assertEqual(list(m.load(run / 'control/baseline.json')), EXPECTED_IDS)

    def test_run_number_and_explicit_id_resolve_the_same_directory(self):
        run = self.init(task='all')
        for number, key in enumerate(EXPECTED_IDS, 1):
            with self.subTest(task=key):
                expected = (key, run / 'tasks' / key)
                self.assertEqual(m.get_task(run, str(number)), expected)
                self.assertEqual(m.get_task(run, key), expected)
        for key in RETIRED_IDS:
            with self.subTest(retired=key), self.assertRaises(ValueError):
                m.get_task(run, key)


if __name__ == '__main__':
    unittest.main()
