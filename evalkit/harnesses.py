"""Harness identities, independent from model names. Sources checked 2026-10-19; Kimi and MiniMax Code added 2026-10-24."""
HARNESS_OPTIONS = [
    ('codex','Codex','https://github.com/openai/codex'),
    ('claude-code','Claude Code','https://code.claude.com/docs/'),
    ('deepseek-harness','DeepSeek Harness','https://www.deepseek.com/harness/'),
    ('opencode','OpenCode','https://opencode.ai/'),
    ('gemini-cli','Gemini CLI','https://github.com/google-gemini/gemini-cli'),
    ('cursor','Cursor','https://cursor.com/'),
    ('github-copilot','GitHub Copilot','https://github.com/features/copilot'),
    ('github-copilot-cli','GitHub Copilot CLI','https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli'),
    ('cline','Cline','https://github.com/cline/cline'),
    ('kilo-code','Kilo Code','https://github.com/Kilo-Org/kilocode'),
    ('aider','Aider','https://github.com/Aider-AI/aider'),
    ('continue','Continue','https://github.com/continuedev/continue'),
    ('goose','Goose','https://github.com/aaif-goose/goose'),
    ('openhands','OpenHands','https://github.com/OpenHands/OpenHands'),
    ('qwen-code','Qwen Code','https://github.com/QwenLM/qwen-code'),
    ('kimi','Kimi','https://www.kimi.com/'),
    ('kimi-code','Kimi Code CLI','https://github.com/MoonshotAI/kimi-code'),
    ('kimi-cli','Kimi CLI（旧版）','https://github.com/MoonshotAI/kimi-cli'),
    ('minimax-code','MiniMax Code','https://agent.minimax.io/download'),
    ('factory-droid','Factory Droid','https://www.factory.ai/'),
    ('trae','TRAE','https://www.trae.ai/'),
    ('auggie','Augment / Auggie CLI','https://www.augmentcode.com/product/CLI'),
    ('amp','Amp','https://ampcode.com/'),
    ('kiro','Kiro','https://kiro.dev/'),
    ('devin','Devin','https://devin.ai/desktop'),
    ('windsurf','Windsurf（历史名称）','https://windsurf.com/editor'),
    ('other','其他 / 自定义',''),
]

def harness_options():
    return [dict(id=i,label=label,url=url) for i,label,url in HARNESS_OPTIONS]

def normalize_harness(value=None, custom=''):
    if value is None: value=''
    if not isinstance(value,str) or value not in {'', *(i for i,_,_ in HARNESS_OPTIONS)}:
        raise ValueError('请选择有效的 Harness')
    if not isinstance(custom,str) or len(custom)>120 or any(ord(c)<32 for c in custom):
        raise ValueError('自定义 Harness 格式无效或过长')
    custom=custom.strip()
    if value=='other' and not custom: raise ValueError('请填写自定义 Harness 名称')
    return {'harness':value or None,'harnessCustom':custom if value=='other' else ''}
