import subprocess,json
BASE=['codex','sandbox','-P','benchcheck','-C','/Users/zhengwenjun/大模型测试/verification']
CONFIG={'permissions.benchcheck.filesystem."/"':'read','permissions.benchcheck.filesystem.":workspace_roots"':'write','permissions.benchcheck.filesystem.":tmp"':'write','permissions.benchcheck.network.enabled':True,'permissions.benchcheck.network.allow_local_binding':True,'permissions.benchcheck.network.domains."localhost"':'allow','permissions.benchcheck.network.domains."127.0.0.1"':'allow','permissions.benchcheck.network.domains."::1"':'allow','features.network_proxy':True}
for k,v in CONFIG.items():
 if '.domains.' not in k and '.filesystem.' not in k:BASE+=['-c',k+'='+json.dumps(v)]
BASE+=['-c','permissions.benchcheck.filesystem={"/"="read", ":workspace_roots"="write", ":tmp"="write"}']
BASE+=['-c','permissions.benchcheck.network.domains={localhost="allow", "127.0.0.1"="allow", "::1"="allow"}']
if __name__=='__main__':
 r=subprocess.run(BASE+['python3','-c','import socket;s=socket.socket();s.bind(("127.0.0.1",0));print("BIND_OK",s.getsockname());s.close()'],capture_output=True,text=True,timeout=20)
 print(r.returncode,r.stdout,r.stderr)
