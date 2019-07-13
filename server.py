import os
from flask import Flask, render_template ,request ,send_from_directory

import time
import requests
import json
from flask_cors import CORS, cross_origin


app=Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app", "static", "dist")



@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(root, path)

@app.route('/', methods=['GET'])
def redirect_to_index():
    return send_from_directory(root, 'index.html')


if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0', debug=True)


