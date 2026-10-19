"""Relative five-level effort, distinct from legacy vendor-specific reasoning."""
REASONING_OPTIONS = [('1','1档 · 最低'),('2','2档 · 较低'),('3','3档 · 中等'),('4','4档 · 较高'),('5','5档 · 最高')]

def reasoning_options():
    return [dict(id=key,label=label) for key,label in REASONING_OPTIONS]

def normalize_reasoning(value):
    if value is None or value=='': return None
    if not isinstance(value,str) or value not in {'1','2','3','4','5','unsupported'}:
        raise ValueError('思考强度请选择1至5档或不支持设置')
    return value

def set_reasoning(meta,value,at):
    value=normalize_reasoning(value)
    environment=meta.setdefault('environment',{})
    before=environment.get('reasoningLevel')
    if before!=value:
        meta.setdefault('reasoningHistory',[]).append({'at':at,'before':before,'after':value})
    environment['reasoningLevel']=value
