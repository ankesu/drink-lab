import http.server
import os

PORT = 4173
DIR = '/workspace/drink-lab/dist'

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)

    def send_response_only(self, code, message=None):
        super().send_response_only(code, message)
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')

if __name__ == '__main__':
    server = http.server.HTTPServer(('0.0.0.0', PORT), NoCacheHandler)
    print(f'Serving {DIR} on port {PORT} (no-cache)')
    server.serve_forever()
