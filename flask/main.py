#For making requests to the API
import requests
#Get environment variables from env
import os
from dotenv import load_dotenv
#To encode the scopes into a url
import urllib.parse
#Retrieve current date and time
from datetime import datetime

#Steamline the process of creating a basic web app
from flask import Flask, redirect, request, jsonify, session

#Initialize web app, app secret is needed to retain information per session 
app = Flask(__name__)
app.secret_key = '53d355f8-571a-4590-a310-1f9579440851'

#Create constants
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = 'http://localhost:5000/callback'

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1/'

#Create Authentication URL to redirect users to upon clicking the 'login' button on the front-end
@app.route('/login')
def login():

    #Reminder to create API to check if user already logged in
    """
    if 'access_token' in session:
        auth_url = f"{'http://localhost:5173?success=true'}"
        return jsonify({'auth_url': auth_url})
    """   

    scope = 'user-read-private user-read-email playlist-read-private user-read-currently-playing'

    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': REDIRECT_URI,
        'show_dialog': True
    }

    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"

    return jsonify({'auth_url': auth_url})

#Accounting for the redirect back to the app once a user has attempted Spotify login, whether failed or successful
@app.route('/callback')
def callback():
    if 'error' in request.args:
        return jsonify({"error": request.args['error']})
    
    if 'code' in request.args:
        req_body = {
            'code': request.args['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }

        response = requests.post(TOKEN_URL, data=req_body)
        token_info = response.json()

        #On a successful login retrieve tokens and store them in session
        session['access_token'] = token_info['access_token']
        session['refresh_token'] = token_info['refresh_token']
        session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']

        #Redirect back to the frontend with a true flag to indicate that login was successful
        return redirect('http://localhost:5173?success=true')
    
#If Login is successful get current track    
@app.route('/current_track')
def get_current_track():
    session['api_url'] = '/current_track'

    if 'access_token' not in session:
        return redirect('/login')
    
    if datetime.now().timestamp() > session['expires_at']:
        return redirect('/refresh-token')
    
    headers = {
        'Authorization': f"Bearer {session['access_token']}"
    }

    response = requests.get(API_BASE_URL + 'me/player/currently-playing', headers=headers)
    current_track = response.json()
    name = current_track['item']['name']

    return jsonify({'name':name})

#If Login is sucessful get categories
@app.route('/categories')
def get_categories():
    session['api_url'] = '/categories'

    if 'access_token' not in session:
        return redirect('/login')
    
    if datetime.now().timestamp() > session['expires_at']:
        return redirect('/refresh-token')
    
    headers = {
        'Authorization': f"Bearer {session['access_token']}"
    }

    response = requests.get(API_BASE_URL + 'browse/categories?offset=30&limit=50', headers=headers)
    categories = response.json()

    return jsonify(categories)

#If Login is successful get playlists
@app.route('/playlists')
def get_playlists():
    session['api_url'] = '/playlists'

    if 'access_token' not in session:
        return redirect('/login')
    
    if datetime.now().timestamp() > session['expires_at']:
        return redirect('/refresh-token')
    
    headers = {
        'Authorization': f"Bearer {session['access_token']}"
    }

    response = requests.get(API_BASE_URL + 'me/playlists', headers=headers)
    playlists = response.json()

    return jsonify(playlists)

#Refresh Access Token
@app.route('/refresh-token')
def refresh_token():
    if 'refresh_token' not in session:
        return redirect('/login')
    
    if datetime.now().timestamp() > session['expires_at']:
        req_body = {
            'grant_type': 'refresh_token',
            'refresh_token': session['refresh_token'],
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }

    response = requests.post(TOKEN_URL, data=req_body)
    new_token_info = response.json()

    session['access_token'] = new_token_info['access_token']
    session['expires_at'] = datetime.now().timestamp() + new_token_info['expires_in']

    return redirect(session['api_url'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug = True)