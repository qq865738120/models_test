"""Static-only CORS preview for sandboxed iframe validation; no application backend."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
class StaticCORS(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', 56244), partial(StaticCORS, directory='output')).serve_forever()
