from flask import Flask
import requests

app = Flask(__name__)

@app.route("/")
def hello_world():
    resp = requests.get('http://fake-openai:3000/', stream=True)
    return resp.iter_content()
