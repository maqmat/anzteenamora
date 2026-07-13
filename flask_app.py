from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='dist')

# Serve static assets (js, css, images, videos)
@app.route('/assets/<path:path>')
def serve_assets(path):
    return send_from_directory(os.path.join('dist', 'assets'), path)

# Serve static files or fallback to index.html for SPA routing
@app.route('/<path:path>')
def serve_static(path):
    full_path = os.path.join('dist', path)
    if os.path.exists(full_path) and os.path.isfile(full_path):
        return send_from_directory('dist', path)
    # Fallback to index.html for SPA routing
    return send_from_directory('dist', 'index.html')

@app.route('/')
def index():
    return send_from_directory('dist', 'index.html')

if __name__ == '__main__':
    app.run(port=5000)
