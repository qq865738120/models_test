import concurrent.futures
import json
import os
import shutil
import subprocess
import tempfile
import unittest
import urllib.error
import urllib.request
from pathlib import Path

from evalkit.manager import ROOT


@unittest.skipUnless(shutil.which('node'),'需要Node才能检验公开Mock')
class MockTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(); root=Path(self.temp.name)
        (root/'tools').mkdir(); (root/'materials').mkdir()
        shutil.copy(ROOT/'templates/03-dispatch/tools/mock-server.mjs',root/'tools/mock-server.mjs')
        rows=[{'id':f'O{i}','customer':f'客户{i}','address':'A园' if i%2==0 else 'B园','status':'pending','courierId':None} for i in range(30)]
        (root/'materials/orders.json').write_text(json.dumps(rows))
        self.proc=subprocess.Popen(['node','tools/mock-server.mjs'],cwd=root,env=dict(os.environ,MOCK_PORT='0'),stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
        self.base=self.proc.stdout.readline().strip().removeprefix('Mock: ')
        if not self.base.startswith('http://'): self.fail('Mock无法启动')

    def tearDown(self):
        self.proc.terminate(); self.proc.communicate(timeout=5); self.temp.cleanup()

    def call(self,path,data=None):
        request=urllib.request.Request(self.base+path,data=None if data is None else json.dumps(data).encode(),headers={'Content-Type':'application/json'})
        try:
            with urllib.request.urlopen(request,timeout=5) as response: return response.status,json.load(response)
        except urllib.error.HTTPError as exc: return exc.code,json.load(exc)

    def test_query_filter_pagination_detail_and_invalid_input(self):
        status,data=self.call('/api/orders?q=A&page=2&pageSize=5')
        self.assertEqual(status,200); self.assertEqual(data['total'],15); self.assertEqual(len(data['items']),5)
        self.assertEqual(self.call('/api/orders/O2')[1]['id'],'O2')
        self.assertEqual(self.call('/api/orders?page=0')[0],400)
        self.assertEqual(self.call('/api/orders/unknown')[0],404)

    def test_failure_is_atomic_and_next_request_succeeds(self):
        self.call('/__control',{'failNextAssign':True})
        body={'ids':['O1','O2'],'courierId':'P01'}
        self.assertEqual(self.call('/api/assign',body)[0],503)
        self.assertEqual(self.call('/api/orders/O1')[1]['status'],'pending')
        self.assertEqual(self.call('/api/assign',body)[0],200)
        self.assertEqual(self.call('/api/orders/O1')[1]['courierId'],'P01')
        self.assertEqual(self.call('/api/assign',body)[0],409)
        self.call('/__control',{'reset':True})
        self.assertEqual(self.call('/api/orders/O1')[1]['status'],'pending')

    def test_response_order_and_query_failure_are_controllable(self):
        self.call('/__control',{'delays':{'a':350,'b':20}})
        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
            a=pool.submit(self.call,'/api/orders?q=a'); b=pool.submit(self.call,'/api/orders?q=b')
            done=next(concurrent.futures.as_completed([a,b])); self.assertIs(done,b)
        self.call('/__control',{'failNextQuery':True})
        self.assertEqual(self.call('/api/orders?q=b')[0],503)
        self.assertEqual(self.call('/api/orders?q=b')[0],200)


if __name__=='__main__': unittest.main()
