"""Black-box checks against a fresh dispatch HTTP server; never score self-reported results."""
import copy
import datetime
import json
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlencode, urlsplit


def grade_api(base_url, seed, restart=None):
    """Use only a fresh test instance. Optional restart() returns a new instance or base URL."""
    from . import manager as m
    from .fullstack import http_request

    original = copy.deepcopy(seed)
    if (not isinstance(original, list) or len(original) != 10000 or
            len({row.get('id') for row in original}) != len(original)):
        raise ValueError('自动接口验收需要固定10000条原始订单')
    checks = []
    started = m.now()
    endpoint = base_url

    def port():
        parsed = urlsplit(endpoint)
        if (parsed.scheme != 'http' or parsed.hostname != '127.0.0.1' or
                parsed.username or parsed.password or parsed.path not in ('', '/') or
                parsed.query or parsed.fragment or not parsed.port):
            raise ValueError('自动接口验收只接受独立实例的127.0.0.1 HTTP地址')
        return parsed.port

    def request(method, path, body=None):
        try:
            status, data = http_request(port(), method, path,
                json.dumps(body).encode() if body is not None else None)
            return status, json.loads(data), ''
        except Exception as exc:
            return 0, None, type(exc).__name__+': '+str(exc)[:160]

    def record(ident, group, passed, description, response=None):
        detail = description
        if response is not None and not passed:
            status, _, error = response
            detail += f'；实际HTTP {status}' + ('；'+error if error else '')
        checks.append({'id': ident, 'group': group, 'passed': passed, 'message': detail})

    def matches(actual, expected):
        return isinstance(actual, dict) and all(
            key in actual and actual[key] == value and
            (type(actual[key]) is bool if type(value) is bool else type(actual[key]) is not bool)
            for key, value in expected.items())

    def matches_items(actual, expected):
        return (isinstance(actual, list) and len(actual) == len(expected) and
                all(matches(row, want) for row, want in zip(actual, expected)))

    def error_response(response, expected):
        status, data, _ = response
        error = data.get('error') if isinstance(data, dict) else None
        return (status == expected and isinstance(error, dict) and
                error.get('code') == {400:'INVALID_ARGUMENT',404:'NOT_FOUND',409:'CONFLICT'}[expected] and
                isinstance(error.get('message'), str) and bool(error['message'].strip()))

    def counts(rows):
        return {'all': len(rows), **{status: sum(row['status'] == status for row in rows)
                for status in ('pending', 'assigned', 'delivered')}}

    def stats_match(response, expected):
        status, data, _ = response
        try:
            stamp=datetime.datetime.fromisoformat(data['updatedAt'].replace('Z','+00:00'))
            fresh=stamp.tzinfo is not None and abs((datetime.datetime.now(datetime.timezone.utc)-stamp).total_seconds())<30
        except (TypeError,ValueError,KeyError,AttributeError):
            fresh=False
        return status==200 and matches(data,expected) and fresh

    def query_check(ident, params, expected):
        response = request('GET', '/api/orders?'+urlencode(params))
        status, data, _ = response
        page, page_size = params.get('page', 1), params.get('pageSize', 20)
        valid = (status == 200 and matches(data, {'total': len(expected), 'page': page, 'pageSize': page_size}) and
            matches_items(data.get('items'), expected[(page-1)*page_size:page*page_size]))
        record(ident, 'query', valid, '查询、总数、页码和返回订单与固定数据逐字段核对', response)

    health = request('GET', '/health')
    record('health', 'architecture', health[0] == 200 and matches(health[1], {'ok': True}),
           '真实HTTP健康接口返回200和ok=true', health)
    couriers = request('GET', '/api/couriers')
    courier_items = couriers[1].get('items') if isinstance(couriers[1], dict) else None
    record('couriers', 'architecture', couriers[0] == 200 and isinstance(courier_items, list) and
           len(courier_items) == 3 and {row.get('id') for row in courier_items if isinstance(row, dict)} == {'P01','P02','P03'} and
           all(isinstance(row,dict) and row.get('name')=={'P01':'鹈鹕一号','P02':'鹈鹕二号','P03':'鹈鹕三号'}.get(row.get('id'))
               for row in courier_items),
           '配送员HTTP接口包含固定三名配送员及非空名称', couriers)
    initial_stats = request('GET', '/api/stats')
    record('initial_stats', 'consistency', stats_match(initial_stats, counts(original)),
           '新实例统计与10000条固定种子一致', initial_stats)
    query_check('default_page', {}, original)
    query_check('pagination', {'page': 2, 'pageSize': 7}, original)
    query_check('out_of_range', {'page': 99999, 'pageSize': 20}, original)
    for status in ('pending', 'assigned', 'delivered'):
        query_check('filter_'+status, {'status': status, 'pageSize': 11},
                    [row for row in original if row['status'] == status])
    for field in ('id', 'customer', 'address'):
        value = str(original[137][field]).upper()
        query = ' '+value+' '
        expected = [row for row in original if value.lower() in
                    ' '.join(str(row[key]).lower() for key in ('id','customer','address'))]
        query_check('search_'+field, {'q': query, 'pageSize': 13}, expected)
    query_check('empty_query', {'q': 'no-such-order-unique-eval-9f0c'}, [])
    detail = request('GET', '/api/orders/'+original[0]['id'])
    record('detail', 'query', detail[0] == 200 and matches(detail[1], original[0]),
           '详情通过HTTP读取完整固定订单字段', detail)
    unknown = request('GET', '/api/orders/NO-SUCH-ORDER-EVAL')
    record('unknown_detail', 'validation', error_response(unknown, 404),
           '未知详情返回404及结构化错误', unknown)
    invalid_query = [
        '/api/orders?page=0', '/api/orders?page=-1', '/api/orders?page=1.5',
        '/api/orders?page=wrong', '/api/orders?pageSize=0', '/api/orders?pageSize=101',
        '/api/orders?pageSize=1.5', '/api/orders?status=unknown',
        '/api/orders?page=9007199254740992', '/api/orders?page=1&page=2',
        '/api/orders?unsupported=true','/api/orders?page=1e2','/api/orders?status=',
        '/api/orders?page=','/api/orders?pageSize=']
    responses = [request('GET', path) for path in invalid_query]
    record('invalid_query', 'validation', all(error_response(row, 400) for row in responses),
           '非法/非安全整数/重复/未知查询参数均返回400及结构化错误')
    pending = [row for row in original if row['status'] == 'pending']
    if len(pending) < 6:
        raise ValueError('固定种子缺少用于独立派单验收的待派订单')
    first = [row['id'] for row in reversed(pending[:2])]
    valid_assignment = request('POST', '/api/assign', {'ids': first, 'courierId': 'P01'})
    expected_assigned = [{**row, 'status': 'assigned', 'courierId': 'P01'} for row in reversed(pending[:2])]
    record('assign_batch', 'assignment', valid_assignment[0] == 200 and
           isinstance(valid_assignment[1], dict) and matches_items(valid_assignment[1].get('items'), expected_assigned),
           '真实POST整批派单返回两条已更新订单', valid_assignment)
    repeated = request('POST', '/api/assign', {'ids': first, 'courierId': 'P02'})
    record('assigned_conflict', 'assignment', error_response(repeated, 409),
           '已派订单再次派送返回409，不覆盖已有配送员', repeated)
    persisted = [request('GET', '/api/orders/'+row['id']) for row in expected_assigned]
    record('read_after_write', 'consistency', all(res[0] == 200 and matches(res[1], row)
           for res, row in zip(persisted, expected_assigned)),
           '新HTTP连接重新读取详情仍保持同一服务端状态')
    untouched = pending[3]
    mixed = request('POST', '/api/assign', {'ids': [untouched['id'], first[0]], 'courierId': 'P02'})
    untouched_after = request('GET', '/api/orders/'+untouched['id'])
    record('mixed_atomicity', 'assignment', error_response(mixed, 409) and
           untouched_after[0] == 200 and matches(untouched_after[1], untouched),
           '待派＋已派混合批次整批409，待派订单保持原样', mixed)
    missing = request('POST', '/api/assign', {'ids': [untouched['id'],first[0], 'NO-SUCH-ORDER-EVAL'], 'courierId': 'P02'})
    after_missing = request('GET', '/api/orders/'+untouched['id'])
    record('unknown_assignment', 'validation', error_response(missing, 404) and
           after_missing[0] == 200 and matches(after_missing[1], untouched),
           '含未知ID的批次返回404，已存在的订单不被部分修改', missing)
    invalid_assignments = [
        {'ids': [], 'courierId': 'P01'},
        {'ids': [untouched['id'], untouched['id']], 'courierId': 'P01'},
        {'ids': [row['id'] for row in pending[:101]], 'courierId': 'P01'},
        {'ids': [untouched['id']], 'courierId': 'P99'},
        {'ids': 'not-an-array', 'courierId': 'P01'},
        {'ids': [None], 'courierId': 'P01'},
        {'ids': [''], 'courierId': 'P01'},
        {'ids': [untouched['id']], 'courierId': 'P01', 'extra': True}]
    invalid_results = [request('POST', '/api/assign', body) for body in invalid_assignments]
    record('invalid_assignment', 'validation', all(error_response(row, 400) for row in invalid_results),
           '空、重复、超100、非法配送员、非数组、非字符串ID及额外字段均返回400')
    try:
        bad_status,bad_bytes=http_request(port(),'POST','/api/assign',b'{')
        malformed=(bad_status,json.loads(bad_bytes),'')
    except Exception as exc:
        malformed=(0,None,str(exc)[:160])
    record('malformed_json','validation',error_response(malformed,400),'无效JSON返回400和结构化错误',malformed)
    try:
        bad_status,bad_bytes=http_request(port(),'POST','/api/assign',
            json.dumps({'ids':[untouched['id']],'courierId':'P01'}).encode(),content_type='text/plain')
        media=(bad_status,json.loads(bad_bytes),'')
    except Exception as exc:
        media=(0,None,str(exc)[:160])
    record('invalid_content_type','validation',error_response(media,400),'非JSON Content-Type返回400结构化错误',media)
    concurrent_id = pending[2]['id']
    batches = [[concurrent_id, pending[4]['id']], [concurrent_id, pending[5]['id']]]
    with ThreadPoolExecutor(max_workers=2) as pool:
        futures = [pool.submit(request, 'POST', '/api/assign',
                              {'ids': ids, 'courierId': courier})
                   for ids, courier in zip(batches, ('P02', 'P03'))]
        concurrent = [future.result() for future in futures]
    statuses = sorted(res[0] for res in concurrent)
    winner = next((courier for courier, result in zip(('P02','P03'), concurrent) if result[0] == 200), None)
    concurrent_detail = request('GET', '/api/orders/'+concurrent_id)
    record('concurrent_assignment', 'assignment', statuses == [200,409] and
           all(error_response(res, 409) for res in concurrent if res[0] != 200) and
           concurrent_detail[0] == 200 and matches(concurrent_detail[1],
               {**pending[2], 'status': 'assigned', 'courierId': winner}),
           '两次并发派送同单仅一次成功，最终归属与成功请求一致')
    winning_ids = batches[('P02', 'P03').index(winner)] if winner else []
    side_responses = [request('GET', '/api/orders/'+row['id']) for row in pending[4:6]]
    side_expected = [{**row, 'status': 'assigned', 'courierId': winner} if row['id'] in winning_ids else row
                     for row in pending[4:6]]
    record('concurrent_batch_atomicity', 'assignment', winner is not None and
           all(response[0] == 200 and matches(response[1], expected)
               for response, expected in zip(side_responses, side_expected)),
           '相交并发批次中，失败批次独有订单保持原样；成功批次所有订单统一提交')
    expected_state = copy.deepcopy(original)
    for row in expected_state:
        if row['id'] in first:
            row.update(status='assigned', courierId='P01')
        elif row['id'] in winning_ids:
            row.update(status='assigned', courierId=winner)
    after_stats = request('GET', '/api/stats')
    record('stats_after_assignment', 'consistency', winner is not None and stats_match(after_stats, counts(expected_state)),
           '有效更新、失败和并发操作后的全局状态总数保持一致', after_stats)
    latest = request('GET', '/api/orders?'+urlencode({'q': first[0]}))
    record('list_detail_consistency', 'consistency', latest[0] == 200 and isinstance(latest[1], dict) and
           matches_items(latest[1].get('items'), [expected_assigned[0]]),
           '重新HTTP查询列表与已经更新的详情一致', latest)
    repeated_reads = [request('GET', '/api/orders/'+first[0]) for _ in range(3)]
    record('state_across_connections', 'runtime', all(res[0] == 200 and matches(res[1], expected_assigned[0])
           for res in repeated_reads), '连续新连接读取不重建数据；此项仅验收HTTP状态，不代替真实浏览器刷新')
    if restart is None:
        record('restart_resets_seed', 'runtime', None, '未提供独立实例重启回调，重启复位待核验')
    else:
        try:
            restarted = restart()
            endpoint = restarted.base_url if hasattr(restarted, 'base_url') else restarted
            stats = request('GET', '/api/stats')
            detail = request('GET', '/api/orders/'+first[0])
            valid = stats_match(stats, counts(original)) and detail[0] == 200 and matches(detail[1], pending[1])
            record('restart_resets_seed', 'runtime', valid, '重启独立进程后统计和已修改订单恢复原始种子', stats)
        except Exception as exc:
            record('restart_resets_seed', 'runtime', False, '独立实例重启失败：'+str(exc)[:200])
    return {'checks': checks, 'checkedAt': m.now(), 'startedAt': started,
            'scope': '真实HTTP黑盒验收；需要全新独立实例，不含浏览器布局与交互判定'}
