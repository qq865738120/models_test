from html.parser import HTMLParser


class StandardParser(HTMLParser):
    """仅提取原标准，不生成或改写任务要求。"""

    def __init__(self):
        super().__init__()
        self.section = None
        self.pre = False
        self.buffer = []
        self.prompts = {}
        self.sections = {}
        self.section_text = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'section':
            self.section = attrs.get('id')
            self.section_text = []
        if tag == 'pre' and self.section:
            self.pre = True
            self.buffer = []
        if tag in ('p', 'h2', 'h3', 'li', 'tr') and self.section:
            self.section_text.append('\n')

    def handle_endtag(self, tag):
        if tag == 'pre' and self.pre:
            self.prompts.setdefault(self.section, []).append(''.join(self.buffer).strip())
            self.pre = False
        if tag == 'section':
            self.sections[self.section] = ''.join(self.section_text).strip()
            self.section = None

    def handle_data(self, text):
        if self.section:
            self.section_text.append(text)
        if self.pre:
            self.buffer.append(text)


def read_standard(path):
    parser = StandardParser()
    parser.feed(path.read_text(encoding='utf-8'))
    for n in range(1, 6):
        if len(parser.prompts.get(f'task{n}', [])) != 2:
            raise ValueError(f'原标准第 {n} 题必须有初始与追加两段提示词')
    return parser

