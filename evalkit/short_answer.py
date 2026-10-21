"""Data-only canonicalization for exact structured answers; no expression evaluation."""
import re
from fractions import Fraction

KINDS = frozenset({'integer', 'rational', 'code'})
INTEGER = re.compile(r'[+-]?[0-9]+\Z')
RATIONAL = re.compile(r'[+-]?(?:[0-9]+/[0-9]+|[0-9]+(?:\.[0-9]+)?|\.[0-9]+)\Z')
CODE = re.compile(r'[A-Z0-9]+\Z')


def validate_format(parts):
    if not isinstance(parts, list) or not 1 <= len(parts) <= 12:
        raise ValueError('结构化答案需要1至12个字段')
    names = set()
    for part in parts:
        if (not isinstance(part, dict) or set(part) != {'name', 'kind'}
                or not isinstance(part['name'], str) or not part['name'].strip()
                or len(part['name']) > 200 or part['name'] in names
                or not isinstance(part['kind'], str) or part['kind'] not in KINDS):
            raise ValueError('结构化答案字段名称或类型无效')
        names.add(part['name'])


def normalize(value, parts):
    if not isinstance(value, str) or len(value) > 4096:
        return None
    fields = ''.join(value.upper().split()).split(';')
    if len(fields) != len(parts):
        return None
    result = []
    for field, part in zip(fields, parts):
        if not field or len(field) > 256:
            return None
        kind = part['kind']
        try:
            if kind == 'integer' and INTEGER.fullmatch(field):
                result.append(str(int(field)))
            elif kind == 'rational' and RATIONAL.fullmatch(field):
                result.append(str(Fraction(field)))
            elif kind == 'code' and CODE.fullmatch(field):
                result.append(field)
            else:
                return None
        except (ValueError, ZeroDivisionError, OverflowError):
            return None
    return ';'.join(result)
