from flask import Flask, render_template, jsonify, request, make_response

import json, os, random

app = Flask(__name__)

#Function that calls and displays index.html file when requested.

@app.route('/')
def get_index():
    return render_template('index.html')

#Function that reads data.json file turns it into a dictionary then sends it as a respons to a GET request.

@app.route('/api/quotes', methods=['GET'])
def get_json_quotes():
  try:
    site_route = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_route, "files", "data.json")
    with open(json_url, 'r') as file:
      json_object = json.load(file)
    return json_object
  except FileNotFoundError():
    print("Error: file not found.")

#Function that overwrites data.json with the request data as a response to a PUT request.

@app.route('/api/quotes', methods=['PUT'])
def put_json_quotes():
  message_success = jsonify(message="Quotes updated!")
  message_fail = jsonify(message="Failed to update incorrect data format!")
  if request.is_json:
    data = request.get_json()
    site_route = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_route, "files", "data.json")
    with open(json_url, 'w') as file:
      json.dump(data, file)
    return message_success, 200
  else:
    return message_fail, 400

#Function that responds to a GET request with a random quote from the data.json file.

@app.route('/api/random', methods=['GET'])
def get_random_quote():
  try:
    site_route = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(site_route, "files", "data.json")
    with open(json_url, 'r') as file:
      json_object = json.load(file)
    keys = list(json_object['quotes'])
    random_quote = random.choice(keys)
    response = make_response(
      jsonify({"quote": str(random_quote['quote'] + " - " + str(random_quote['author']) )}),
      200
    )
    response.headers["Content-Type"] = "application/json"
    return response
  except FileNotFoundError():
    print("Error: file not found.")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
