from flask import Flask, jsonify, request, abort, session, redirect, g, url_for
from flask_cors import CORS

class API:
    def __init__(self, blocklist):
        self.app = Flask(__name__)
        self.blocklist = blocklist
        CORS(self.app)
        self.app.route('/')(self.default_page)
        self.app.route('/api/check_url', methods=['POST'])(self.check_url_hash)
        self.app.route('/api/check_word', methods=['POST'])(self.check_word)

    def run_server(self):
        self.app.run(host='0.0.0.0', port=80, threaded=True, debug=False)

    def default_page(self):
        return 'I\'m alive!'

    def check_url_hash(self):
        url_hash = request.json.get('url_hash')
        if url_hash is None or len(url_hash) != 32:
            return jsonify({'error': 'invalid hash', 'safe': True})
        if self.blocklist.check_url_hash(url_hash):
            return jsonify({'error': '', 'safe': False})
        return jsonify({'error': '', 'safe': True})

    def check_word(self): # In case model doesn't work in time
        word = request.json.get('word')
        if word is None or len(word) == 0:
            return jsonify({'error': 'no input', 'safe': True})
        if len(word) >= 6 and any(c.isalpha() for c in word) and any(c.isdigit() for c in word) and len(word) <= 16:
            return jsonify({'error': '', 'safe': False})
        return jsonify({'error': '', 'safe': True})