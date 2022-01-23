import threading
from flask import Flask, jsonify, request, abort, session, redirect, g, url_for
from flask_cors import CORS

class API:
    def __init__(self, blocklist):
        self.app = Flask(__name__)
        self.blocklist = blocklist
        CORS(self.app)
        self.app.route('/api/check_url')(self.check_url_hash)

    def run_server(self):
        self.app.run(host='0.0.0.0', port=80, threading=True, debug=False)

    def check_url_hash(self):
        url_hash = request.values.get('url_hash')
        if url_hash is None or len(url_hash) != 32:
            return jsonify({'error': 'invalid hash', 'safe': True})
        if self.blocklist.check_url_hash(url_hash):
            return jsonify({'error': '', 'safe': False})
        return jsonify({'error': '', 'safe': True})
