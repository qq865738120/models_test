"""Versioned objective long-reading questions and deterministic host-only grading."""
import copy
import hashlib
import json
import math
from pathlib import Path
from . import short_answer

VERSION = 'longread-qa-v4'
SUPPORTED_VERSIONS = frozenset({'longread-qa-v2', 'longread-qa-v3', 'longread-qa-v4'})
SOURCE = Path(__file__).resolve().parents[1] / 'research' / VERSION
PHASES = ('initial', 'change')
OPTIONS = 'ABCDEF'
PUBLIC_FIELDS = {'id', 'question', 'options', 'multiple', 'weight', 'scoring'}
STRUCTURED_FIELDS = {'id', 'question', 'answerType', 'answerParts', 'weight', 'scoring'}


def read_json(path):
    return json.loads(path.read_text(encoding='utf-8'))


def question_bank():
    return read_json(SOURCE / 'questions.json')


def normalize_answer(value, question):
    if question.get('answerType') == 'structured':
        return short_answer.normalize(value, question['answerParts'])
    if not isinstance(value, str):
        return None
    answer = ''.join(value.upper().split())
    if (not answer or len(set(answer)) != len(answer)
            or any(letter not in question['options'] for letter in answer)
            or (not question['multiple'] and len(answer) != 1)):
        return None
    return ''.join(sorted(answer))


def validate_key(key):
    if (not isinstance(key, dict) or key.get('version') not in SUPPORTED_VERSIONS
            or not isinstance(key.get('phases'), dict) or set(key['phases']) != set(PHASES)):
        raise ValueError('题库版本或阶段无效')
    all_ids = set()
    for phase in PHASES:
        questions = key['phases'][phase]
        if not isinstance(questions, list) or not questions:
            raise ValueError('题库不能为空')
        for q in questions:
            if not isinstance(q, dict):
                raise ValueError('题目必须为对象')
            if not isinstance(q.get('id'), str) or not q['id'] or q['id'] in all_ids:
                raise ValueError('题号缺失或重复')
            all_ids.add(q['id'])
            if key['version'] == 'longread-qa-v4' and q.get('answerType') != 'structured':
                raise ValueError('v4仅接受结构化短答题')
            weight = q.get('weight')
            if (isinstance(weight, bool) or not isinstance(weight, (int, float))
                    or not math.isfinite(weight) or weight <= 0):
                raise ValueError('权重必须为正的有限数字')
            if q.get('answerType') == 'structured':
                if (key['version'] != 'longread-qa-v4' or 'options' in q or 'multiple' in q
                        or not isinstance(q.get('question'), str) or not q['question'].strip()
                        or q.get('scoring') != 'exact'):
                    raise ValueError('结构化题目类型或判分方式无效')
                short_answer.validate_format(q.get('answerParts'))
            elif (q.get('answerType') is not None or not isinstance(q.get('multiple'), bool)
                    or not isinstance(q.get('options'), dict)
                    or set(q['options']) != set(OPTIONS)
                    or any(not isinstance(text, str) or not text.strip()
                           for text in q['options'].values())
                    or not isinstance(q.get('question'), str) or not q['question'].strip()):
                raise ValueError('选择题选项或类型无效')
            normalized = normalize_answer(q.get('answer'), q)
            if normalized is None or normalized != q.get('answer'):
                raise ValueError('标准答案无效：' + q['id'])
            scoring = q.get('scoring')
            if scoring not in ('exact', 'evidence-tier'):
                raise ValueError('判分方式无效：' + q['id'])
            if scoring == 'evidence-tier':
                credits = q.get('creditByAnswer')
                if (q['multiple']
                        or not isinstance(credits, dict) or set(credits) != set(q['options'])
                        or any(isinstance(v, bool) or not isinstance(v, (int, float))
                               or v not in (0, 0.5, 1) for v in credits.values())
                        or 0.5 not in credits.values() or credits.get(q['answer']) != 1):
                    raise ValueError('证据分档必须为单选，完整定义0/半分/满分并有满分答案：' + q['id'])
            elif 'creditByAnswer' in q:
                raise ValueError('对错题不能附带分档答案：' + q['id'])
        if not math.isclose(sum(q['weight'] for q in questions), 100, rel_tol=0, abs_tol=1e-9):
            raise ValueError('每个阶段权重之和必须为100')
    return key


def merge_answer_key(bank, answers):
    """Join host answers without allowing them to change public scoring contracts."""
    if answers['version'] != bank['version']:
        raise ValueError('题目和标准答案版本不一致')
    key = copy.deepcopy(bank)
    for phase in PHASES:
        rows = answers['phases'][phase]
        mapping = {row['id']: row for row in rows}
        if len(mapping) != len(rows) or set(mapping) != {q['id'] for q in key['phases'][phase]}:
            raise ValueError('题目与答案题号不一致')
        for q in key['phases'][phase]:
            row = mapping[q['id']]
            public_fields = STRUCTURED_FIELDS if q.get('answerType') == 'structured' else PUBLIC_FIELDS
            if not public_fields <= set(q) or set(q) - public_fields - {'domain'}:
                raise ValueError('公开题目字段不完整或包含保留内容：' + q['id'])
            if (set(row) & (PUBLIC_FIELDS | STRUCTURED_FIELDS | {'domain'})) - {'id'}:
                raise ValueError('标准答案不能覆盖题干、选项或权重：' + q['id'])
            if not row.get('evidence'):
                raise ValueError('标准答案缺少核对依据：' + q['id'])
            q.update(copy.deepcopy(row))
    return validate_key(key)


def answer_key():
    return merge_answer_key(question_bank(), read_json(SOURCE / 'host' / 'answer-key.json'))


def validate_release(source=None):
    """Reject changed or unreviewed material before it enters a candidate workspace."""
    source = Path(source) if source is not None else SOURCE
    release = read_json(source / 'host/release.json')
    bank = read_json(source / 'questions.json')
    if (release.get('version') != bank.get('version') or bank.get('version') not in SUPPORTED_VERSIONS
            or release.get('status') != 'frozen-before-candidate'):
        raise ValueError('题库尚未完成交叉核验和冻结')
    root = Path(__file__).resolve().parents[1]
    paths = release.get('sha256', {})
    required = {str((source / name).relative_to(root)) for name in
                ('questions.json', 'host/answer-key.json', 'host/mechanical-audit.json')}
    if not required <= set(paths):
        raise ValueError('题库冻结清单不完整')
    for name, expected in paths.items():
        path = root / name
        if (not path.resolve().is_relative_to(source.resolve()) or path.is_symlink()
                or hashlib.sha256(path.read_bytes()).hexdigest() != expected):
            raise ValueError('冻结后的题库或核验材料已变化：' + name)
    evidence = read_json(source / 'host/mechanical-audit.json')
    corpus = root / 'research/longread-20261018'
    for name, expected in evidence.get('sourceSha256', {}).items():
        path = root / name
        if (not path.resolve().is_relative_to(corpus.resolve()) or path.is_symlink()
                or hashlib.sha256(path.read_bytes()).hexdigest() != expected):
            raise ValueError('冻结后的引文原始材料已变化：' + name)
    key = merge_answer_key(bank, read_json(source / 'host/answer-key.json'))
    merged_sha = hashlib.sha256((json.dumps(key, ensure_ascii=False, indent=2) + '\n').encode()).hexdigest()
    if merged_sha != release.get('mergedAnswerKeySha256'):
        raise ValueError('冻结标准答案与题库不一致')
    return release


def task_spec(previous):
    task = copy.deepcopy(previous)
    bank = question_bank()
    tiered = any(q['scoring']=='evidence-tier' for rows in bank['phases'].values() for q in rows)
    structured = all(q.get('answerType') == 'structured' for rows in bank['phases'].values() for q in rows)
    score_description = ('事实计算题按对错，标明的证据分档题按固定档位自动评分。' if tiered else '每题按对错自动评分，多选须全对；漏选或多选不得分。')
    if structured:
        score_description = '每题全部字段正确才取得权重分；任一字段错误或缺失得0分。等值有理数、空白和代码大小写自动规范化。'
    initial_count = len(bank['phases']['initial'])
    change_count = len(bank['phases']['change'])
    task.update(
        delivery='answers-json', scoringMode='objective',
        questionVersion=VERSION,
        answerKeySha256=hashlib.sha256(
            (json.dumps(answer_key(), ensure_ascii=False, indent=2) + '\n').encode('utf-8')).hexdigest(),
        promptVersion=VERSION,
        description=f'综合五十篇论文与《三体Ⅲ：死神永生》，回答{initial_count}道客观题，只提交答案。',
        brief=[f'使用50篇论文与小说全文完成{initial_count}道客观题。',
               ('论文题须跨论文联立条件与计算，小说题须重建跨章节事件和信息关系；只填写数值或代码序列。'
                if structured else '论文题须跨论文推理，小说题须跨章节关联；单选与多选均有标准答案。'),
               '仅提交output/answers.json；'+score_description],
        briefChange=[f'完成独立的{change_count}道追加客观题，综合条件与跨材料证据。',
                     '仍只提交答案；答案、证据和权重在测试前冻结。'],
        scoringGuidance=score_description+'总分为各题所得分之和，满分100。答案、证据和权重在测试前固定，不根据作答改分。只评价答案，不要求解释。')
    for phase, field in [('initial', 'rubric'), ('change', 'rubricChange')]:
        task[field] = [
            {'id': q['id'], 'name': q['id'] + ' · ' + q['question'],
             'weight': q['weight'], 'scoring': 'auto',
             'description': ('结构化短答案，全部字段正确得分。' if q.get('answerType') == 'structured' else
                             '证据分档单选：0 / 50% / 100%权重。' if q.get('scoring') == 'evidence-tier'
                             else '多选，全对得分。' if q['multiple'] else '单选，答对得分。'),
             'checks': ['依据该轮次冻结的标准答案与判分方式评分。'],
             'anchors': ([{'score': 0, 'text': '证据不足、与材料矛盾或格式无效。'},
                          {'score': 0.5, 'text': '部分结论有依据，但遗漏题目要求的关键条件或证据。'},
                          {'score': 1, 'text': '结论与适用条件完整，得到跨材料证据支持。'}]
                         if q.get('scoring') == 'evidence-tier' else
                         [{'score': 0, 'text': '错误、漏答或答案格式无效，不得分。'},
                          {'score': 1, 'text': '答案正确，获得本题全部权重分。'}])}
            for q in bank['phases'][phase]]
    return task


def render_prompt(phase='initial'):
    questions = question_bank()['phases'][phase]
    if all(q.get('answerType') == 'structured' for q in questions):
        return render_structured_prompt(questions, phase)
    title = '长文本客观题' if phase == 'initial' else '长文本追加客观题'
    lines = [f'# {title} · {VERSION}', '',
             f'本阶段共{len(questions)}题。只根据本题提供的50篇论文及《三体Ⅲ：死神永生》全文作答。',
             '先阅读materials/INDEX.md及materials/novel/INDEX.md；论文公式以PDF为准，TXT可用于检索。材料中的推测或条件性结论不等于已证明的事实。',
             '如存在materials/TOOLS.md，可按其中说明使用准备好的本地PDF页渲染工具核对公式。',
             '', '## 答案提交', '',
             '只需将答案写入output/answers.json，一个JSON对象，题号为键、选项字母为字符串值。',
             '格式示例（示例题号非本题）：{"X01":"B","X02":"AC"}。不需要解释、推理过程、引用、HTML页面或DELIVERY.md。',
             '单选填写一个字母；多选填写所有选项字母。允许大小写、字母间空白和多选顺序差异；重复字母、无效选项、漏选、多选均判错。',
             '对错题答对得全部权重分，答错或漏答得0分，多选必须全对；正确选项数量不固定。'
             '重复题号该题记0分；无法解析的JSON整份记0分；额外题号不计分并报告。',
             '材料不足时可以留空字符串，此项记0分。最终消息只需说明答案文件路径。']
    lines.insert(4, '论文题必须综合多篇材料，题干不提示目标论文编号。请自行识别相关材料并核对推导；不要把预印本主张直接当作已获证实的普遍结论。')
    if any(q.get('scoring')=='evidence-tier' for q in questions):
        lines.append('证据分档题为单选，按测试前冻结的依据取得0、50%或100%权重；可能有多个满分选项，仍只选一个。')
    if phase == 'change':
        lines.append('初始答案已冻结。本阶段用下面题号的答案替换output/answers.json，不修改初始快照。')
    for q in questions:
        kind = '证据分档单选' if q.get('scoring') == 'evidence-tier' else '多选' if q['multiple'] else '单选'
        lines.extend(['', f"### {q['id']} · {kind} · {q['weight']}分",
                      q['question']])
        lines.extend(f'{letter}. {text}' for letter, text in q['options'].items())
    return '\n'.join(lines) + '\n'


def render_structured_prompt(questions, phase):
    lines = [f'# 长文本推理短答题 · {VERSION}', '',
             f'本阶段共{len(questions)}题。只根据提供的50篇论文与《三体Ⅲ：死神永生》全文作答。',
             '先阅读materials/INDEX.md和materials/novel/INDEX.md。论文公式以PDF为准，TXT可用于检索。可用materials/TOOLS.md说明的本地PDF工具核对。',
             '自行识别相关材料，联立条件、计算或重建事件与信息关系。预印本主张仅按其定义、假设及报告使用，不当作普遍成立的事实。',
             '', '## 只提交答案', '',
             '将答案写入output/answers.json：JSON对象，题号为键，答案为一个字符串。不要解释、引用、HTML或报告。',
             '按每题列出的字段顺序，用英文分号 ; 分隔。整数只填十进制整数；有理数可填整数、分数或有限小数，按精确数值比较，不接受近似值或运算表达式；代码按题目定义的顺序连接字母或数字。',
             '答案中的空白忽略，代码大小写不影响判分；字段与代码顺序有意义。示例：{"EXAMPLE":"5/8;7;BDAC"}（仅示范格式，与本题答案无关）。',
             '每题须全部字段正确才得本题权重，任何字段错误、多填、漏填均得0分。重复题号该题记0分；无法解析的JSON整份记0分；额外题号不计分。可留空表示未答。',
             '最终消息只说明答案文件路径。']
    if phase == 'change':
        lines.append('初始答案已冻结。本阶段用下面题号的答案替换output/answers.json，不修改初始快照。')
    labels = {'integer': '整数', 'rational': '精确有理数', 'code': '代码序列'}
    for q in questions:
        fields = '；'.join(f'{part["name"]}（{labels[part["kind"]]}）' for part in q['answerParts'])
        lines.extend(['', f'### {q["id"]} · {q["weight"]}分', q['question'],
                      '答案字段顺序：' + fields + '。'])
    return '\n'.join(lines) + '\n'


def install(target):
    """Only initial questions go to candidates; all answers and future questions stay private."""
    bank, key = question_bank(), answer_key()
    project = target / 'tasks' / '06-memory'
    private = target / 'admin' / '06-memory'
    (project / 'materials').mkdir(parents=True, exist_ok=True)
    private.mkdir(parents=True, exist_ok=True)
    def write_json(path, value):
        path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    write_json(project / 'materials' / 'questions.json',
               {'version': VERSION, 'phase': 'initial', 'questions': bank['phases']['initial']})
    write_json(project / 'materials' / 'answer-template.json',
               {q['id']: '' for q in bank['phases']['initial']})
    write_json(private / 'answer-key.json', key)
    if VERSION in ('longread-qa-v3', 'longread-qa-v4'):
        write_json(private / 'release.json', validate_release())
    from .catalog import CATALOG
    write_json(private / 'rubric.json', task_spec(CATALOG[-1]))
    tiered = any(q.get('scoring') == 'evidence-tier' for rows in bank['phases'].values() for q in rows)
    (private / 'reference.md').write_text(
        '# 长文本客观题主持人标准 · ' + VERSION + '\n\n'
        '标准答案、题目权重及逐题原文定位见answer-key.json。对错题须全对才得本题权重分。'
        + ('标明的证据分档单选题按冻结档位给0、50%或100%权重。' if tiered else '') +
        '不评价推理过程、引用或页面。'
        '两阶段独立满分100分。此目录及评分报告仅供主持人使用，不分发给被测模型。\n',
        encoding='utf-8')
    (private / 'change.txt').write_text(render_prompt('change'), encoding='utf-8')
    (project / 'output').mkdir(exist_ok=True)


class AnswerObject(dict):
    def __init__(self, pairs):
        super().__init__(pairs)
        seen = set()
        self.duplicates = set()
        for key, _ in pairs:
            if key in seen:
                self.duplicates.add(key)
            seen.add(key)


def finite_float(value):
    number = float(value)
    if not math.isfinite(number):
        raise ValueError('数字超出有限范围')
    return number


def grade_submission(text, key, phase='initial'):
    """Parse data only; apply exact matches or the host's frozen evidence-credit table."""
    validate_key(key)
    if phase not in PHASES:
        raise ValueError('评分阶段无效')
    errors = []
    try:
        answers = json.loads(text.lstrip('\ufeff'), object_pairs_hook=AnswerObject,
                             parse_float=finite_float,
                             parse_constant=lambda value: (_ for _ in ()).throw(ValueError(value)))
        if not isinstance(answers, AnswerObject):
            raise ValueError('顶层必须为JSON对象')
    except (ValueError, RecursionError) as exc:
        errors.append('答案JSON无效，所有题记0分：' + str(exc))
        answers = AnswerObject([])
    questions = key['phases'][phase]
    known = {q['id'] for q in questions}
    for extra in sorted(set(answers) - known):
        errors.append('额外题号不计分：' + extra)
    items = []
    for q in questions:
        value = answers.get(q['id'])
        normalized = normalize_answer(value, q)
        if q['id'] in answers.duplicates:
            errors.append('重复题号，该题记0分：' + q['id'])
            normalized = None
        elif q['id'] not in answers:
            errors.append('漏答：' + q['id'])
        elif normalized is None:
            errors.append('答案格式或选项无效：' + q['id'])
        tiered = q.get('scoring') == 'evidence-tier'
        credit = q['creditByAnswer'].get(normalized, 0) if tiered else int(normalized == q['answer'])
        item = {'id': q['id'], 'correct': credit == 1, 'credit': credit,
                'scoring': q.get('scoring', 'exact'), 'weight': q['weight'],
                'earned': q['weight'] * credit, 'answer': value,
                'expected': ' / '.join(letter for letter, score in q['creditByAnswer'].items() if score == 1)
                            if tiered else q['answer']}
        if tiered:
            item['creditByAnswer'] = copy.deepcopy(q['creditByAnswer'])
            item['rationaleByAnswer'] = {
                letter: audit.get('reason', '') for letter, audit in q.get('optionAudit', {}).items()}
        items.append(item)
    return {'version': key['version'], 'phase': phase,
            'correct': sum(item['correct'] for item in items), 'totalQuestions': len(items),
            'partial': sum(0 < item['credit'] < 1 for item in items),
            'total': round(sum(item['earned'] for item in items), 6),
            'values': {item['id']: item['credit'] for item in items},
            'items': items, 'errors': errors}


def grade_run(args):
    """CLI uses the run's pinned key and snapshot when available, without changing reviews."""
    from . import manager as m
    run = m.get_run(args.run)
    key_id, project = m.get_task(run, '06-memory')
    spec = m.pinned_task(run, key_id)
    if spec.get('scoringMode') != 'objective':
        raise ValueError('该轮次使用旧版题目，已有成果与分数保留；不能套用新版标准答案重算')
    state = m.load(run / 'control/run.json')['tasks'][key_id]
    if args.phase == 'change' and not state.get('changeReleasedAt'):
        raise ValueError('追加阶段尚未开放')
    frozen = run / 'control' / 'snapshots' / key_id / args.phase
    if state.get(args.phase + 'Snapshot'):
        snapshot = m.load(frozen / 'snapshot.json')
        if m.manifest(frozen / 'project') != snapshot['files']:
            raise ValueError('阶段快照已变化，不能评分')
        project = frozen / 'project'
        issues = snapshot['issues']
    else:
        issues = m.integrity(run, key_id)
    path = Path(args.answers).absolute() if args.answers else project / 'output' / 'answers.json'
    if path.is_symlink() or any(p.is_symlink() for p in path.parents):
        raise ValueError('答案路径不能包含符号链接')
    key_path = run / 'control' / 'private' / key_id / 'answer-key.json'
    if spec.get('answerKeySha256') and m.sha(key_path) != spec['answerKeySha256']:
        raise ValueError('该轮次的标准答案完整性校验失败')
    key = read_json(key_path)
    if key.get('version') != spec.get('questionVersion'):
        raise ValueError('轮次题库与答案版本不一致')
    answer_bytes = path.read_bytes()
    result = grade_submission(answer_bytes.decode('utf-8'), key, args.phase)
    result.update(runId=run.name, source=str(path), integrityPassed=not issues,
                  issues=issues, externalAnswers=bool(args.answers),
                  answerSha256=hashlib.sha256(answer_bytes).hexdigest(),
                  keySha256=m.sha(key_path))
    output = json.dumps(result, ensure_ascii=False, indent=2) + '\n'
    if args.output:
        # A score report never replaces an answer, key, or earlier report.
        with Path(args.output).open('x', encoding='utf-8') as stream:
            stream.write(output)
    print(output, end='')
