from __future__ import unicode_literals
from flask import Flask, redirect, request, abort, render_template,  url_for, jsonify, make_response
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
import requests
import json
import configparser
import os
import csv

from urllib import parse

app = Flask(__name__, static_url_path='/static')
UPLOAD_FOLDER = 'static'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg', 'gif'])


config = configparser.ConfigParser()
config.read('config.ini')

line_bot_api = LineBotApi(config.get('line-bot', 'channel_access_token'))
handler = WebhookHandler(config.get('line-bot', 'channel_secret'))
my_line_id = config.get('line-bot', 'my_line_id')
end_point = config.get('line-bot', 'end_point')
line_login_id = config.get('line-bot', 'line_login_id')
line_login_secret = config.get('line-bot', 'line_login_secret')
my_phone = config.get('line-bot', 'my_phone')
HEADER = {
    'Content-type': 'application/json',
    'Authorization': F'Bearer {config.get("line-bot", "channel_access_token")}'
}


@app.route("/", methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        return 'ok'
    

@app.route("/callback", methods=['POST'])
def callback():
    signature = request.headers['X-Line-Signature']
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    try:
        handler.handle(body, signature)

    except InvalidSignatureError:
        abort(400)

    return 'OK'

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/line_login', methods=['GET'])
def line_login():
    if 'userID' in request.cookies:
        return redirect(url_for('userex'))

    if request.method == 'GET':
        code = request.args.get("code", None)
        state = request.args.get("state", None)

        if code and state:
            content = LineLogin(code, state)

            name = content["displayName"]
            userID = content["userId"]
            pictureURL = content["pictureUrl"]
            statusMessage = content.get("statusMessage", "no exist")

            restaurants = GetRestaurants(userID)
            patterns = GetPatterns(userID)
            frequencies = GetFrequencies(userID)

            response = make_response(render_template('userex.html', name=name, pictureURL=pictureURL, userID=userID, statusMessage=statusMessage, restaurants=restaurants, patterns=patterns, frequencies=frequencies))
            response.set_cookie('name', name)
            response.set_cookie('userID', userID)
            response.set_cookie('pictureURL', pictureURL)
            response.set_cookie('statusMessage', statusMessage)
            return response
        else:
            response = make_response(render_template('login.html', client_id=line_login_id, end_point=end_point))
            return response



@app.route('/index')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/userex')
def userex():
    if 'userID' in request.cookies:        
        name = request.cookies.get('name')
        userID = request.cookies.get('userID')
        pictureURL = request.cookies.get('pictureURL')
        statusMessage = request.cookies.get('statusMessage')

        restaurants= GetRestaurants(userID)    
        patterns= GetPatterns(userID)    
        frequencies= GetFrequencies(userID)  
        return render_template('userex.html', name=name, pictureURL=pictureURL, userID=userID, statusMessage=statusMessage, restaurants=restaurants,patterns=patterns, frequencies=frequencies )
    else:
        return redirect(url_for('line_login'))
   

def LineLogin(code, state):
    HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'}
    url = "https://api.line.me/oauth2/v2.1/token"
    FormData = {"grant_type": 'authorization_code', "code": code, "redirect_uri": F"{end_point}/line_login", "client_id": line_login_id, "client_secret":line_login_secret}
    data = parse.urlencode(FormData)
    content = requests.post(url=url, headers=HEADERS, data=data).text
    content = json.loads(content)
    url = "https://api.line.me/v2/profile"
    HEADERS = {'Authorization': content["token_type"]+" "+content["access_token"]}
    content = requests.get(url=url, headers=HEADERS).text
    content = json.loads(content)
    return content

def GetRestaurants(user_id):
    if user_id:
        api_url = f'https://timetoeats.com/api/users/get-restaurants?user_id={user_id}'
        response = requests.get(api_url)
        
        if response.status_code == 200:
            restaurants_data = response.json()
            
            return restaurants_data
        else:
            return f"Error fetching data from API: {response.status_code}", 500
    else:
        return "Missing user_id parameter", 400
    

def GetPatterns(user_id):
    if user_id:
        api_url = f'https://timetoeats.com/api/users/get-patterns?user_id={user_id}'
        response = requests.get(api_url)
        
        if response.status_code == 200:
            patterns_data = response.json()
            
            return patterns_data
        else:
            return f"Error fetching data from API: {response.status_code}", 500
    else:
        return "Missing user_id parameter", 400


def GetFrequencies(user_id):
    if user_id:
        api_url = f'https://timetoeats.com/api/users/get-frequencies?user_id={user_id}'
        response = requests.get(api_url)
        
        if response.status_code == 200:
            frequencies_data = response.json()
            
            return frequencies_data
        else:
            return f"Error fetching data from API: {response.status_code}", 500
    else:
        return "Missing user_id parameter", 400

@app.route('/get_chart_data')
def get_chart_data():
    user_id = request.cookies.get('userID')  
    
    if user_id:
        frequencies_data = GetFrequencies(user_id)
        patterns_data = GetPatterns(user_id)
        
        return jsonify({
            'patterns_data': patterns_data,
            'frequencies_data': frequencies_data,
        })
    else:
        return "Missing user_id parameter", 400
    

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']
        message = request.form['message']

        with open('contacts.csv', 'a', newline='') as csvfile:
            fieldnames = ['name', 'email', 'phone', 'message']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writerow({'name': name, 'email': email,'phone':phone, 'message': message})

        return redirect(url_for('contact'))


if __name__ == "__main__":
    app.debug = True
    app.run()
