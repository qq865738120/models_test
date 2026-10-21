"""Host-side structural and quotation checks; these do not prove scientific truth."""
import hashlib
import json
import re
from pathlib import Path


def audit_draft(draft, root):
    root = Path(root).resolve()
    corpus = root / 'research/longread-20261018'
    errors, hashes, rows = [], {}, []
    quotes_checked = 0
    text_cache = {}

    def evidence(items, context):
        nonlocal quotes_checked
        if not isinstance(items, list) or not items:
            errors.append(context + ': 缺少证据')
            return set()
        sources = set()
        for item in items:
            if not isinstance(item, dict):
                errors.append(context + ': 证据必须为对象')
                continue
            path = root / item.get('path', '')
            resolved = path.resolve()
            if corpus not in resolved.parents or path.is_symlink() or not path.is_file():
                errors.append(context + ': 证据路径必须是冻结语料中的普通文件')
                continue
            if path.suffix != '.txt':
                errors.append(context + ': 引文需要对应TXT路径，PDF页码另列locator')
                continue
            if path not in text_cache:
                raw = path.read_bytes()
                text_cache[path] = ''.join(raw.decode('utf-8').split())
                hashes[path.relative_to(root).as_posix()] = hashlib.sha256(raw).hexdigest()
            quote = ''.join(str(item.get('quote', '')).split())
            if len(quote) < 5 or quote not in text_cache[path]:
                errors.append(context + ': 引文未在原文中找到：' + str(item.get('locator', '')))
            else:
                quotes_checked += 1
            if not item.get('locator'):
                errors.append(context + ': 缺少页码/段落定位')
            source = item.get('source', '')
            if not isinstance(source, str) or not re.fullmatch(r'(?:[PM]\d{2}|N\d{3})', source):
                errors.append(context + ': 语料来源编号无效')
            elif not path.name.startswith(source):
                errors.append(context + ': 来源编号与证据文件不一致')
            else:
                sources.add(source)
        return sources

    for phase in ('initial', 'change'):
        answers = {a['id']: a for a in draft['answers'][phase]}
        for q in draft['questions'][phase]:
            ident = q['id']
            answer = answers[ident]
            sources = evidence(answer.get('evidence'), ident)
            if len(sources) < 2:
                errors.append(ident + ': 总证据不足两篇/两章')
            public_text = '\n'.join([q['question'], *q.get('options', {}).values(),
                                     *(p.get('name','') for p in q.get('answerParts',[]))])
            if re.search(r'(?<![A-Za-z0-9])(?:[PM]\d{2}|N\d{3}(?:-P\d+)?)(?![A-Za-z0-9])', public_text):
                errors.append(ident + ': 题干或选项含目标材料定位编号')
            if q.get('answerType') == 'structured':
                minimum = 2
                if len(sources) < minimum:
                    errors.append(ident + ': 短答题跨材料证据不足' + str(minimum) + '份')
                for field in ('derivation', 'dependencies', 'ablation', 'claimScope', 'difficultyRationale'):
                    if not answer.get(field):
                        errors.append(ident + ': 缺少推理审计字段 ' + field)
                rows.append({'id': ident, 'phase': phase, 'sources': sorted(sources),
                             'scoring': q['scoring'], 'answerType': 'structured'})
                continue
            audit = answer.get('optionAudit', {})
            if set(audit) != set(q['options']):
                errors.append(ident + ': 选项审计不完整')
            for letter, item in audit.items():
                credit = (answer['creditByAnswer'][letter] if q.get('scoring') == 'evidence-tier'
                          else int(letter in answer['answer']))
                if item.get('credit', credit) != credit:
                    errors.append(ident + '/' + letter + ': 审计分档与答案不同')
                if item.get('correct') != (credit == 1):
                    errors.append(ident + '/' + letter + ': 审计真值与满分答案不同')
                if not isinstance(item.get('reason'), str) or not item['reason'].strip():
                    errors.append(ident + '/' + letter + ': 缺少判分理由')
                evidence(item.get('evidence'), ident + '/' + letter)
            rows.append({'id': ident, 'phase': phase, 'sources': sorted(sources),
                         'scoring': q.get('scoring', 'exact')})
    return {'passed': not errors, 'errors': errors, 'questions': rows,
            'quotesChecked': quotes_checked, 'sourceSha256': hashes,
            'scope': '字段、来源定位、引用子串与答案档位一致性；科学有效性和跨材料必要性须另行独立复核。'}


def audit_file(path, root):
    return audit_draft(json.loads(Path(path).read_text(encoding='utf-8')), root)
