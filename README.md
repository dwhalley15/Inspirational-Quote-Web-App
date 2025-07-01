# Inspirational Quotes App

A simple web application built with **Python Flask** and vanilla **JavaScript** that serves inspirational quotes. Users can view, add, update, and delete quotes stored in a JSON file. The app also features a random quote generator.

---

## Features

- Display a list of inspirational quotes
- Add new quotes dynamically
- Update and save quotes to a JSON file via PUT request
- Delete quotes from the list
- Get a random inspirational quote
- Date displayed on the page header
- All data persists in a JSON file (`data.json`)

---

## Tech Stack

- Backend: Python Flask
- Frontend: HTML, CSS, JavaScript (Vanilla)
- Data storage: JSON file (`data.json`)

---

## Setup & Usage

1. **Clone the repository**

```bash
git clone https://github.com/your-username/inspirational-quotes-app.git
cd inspirational-quotes-app

2. **Install dependencies**

Make sure you have Python installed (version 3.6+ recommended).

```bash
pip install flask

3. **Run the Flask app**

```bash
python app.py

4. **Open your browser**

Visit http://localhost:8080 to access the app.

## Notes

-The app stores all quotes in a local JSON file (files/data.json). Ensure the app has read/write permissions to this file.
-The frontend interacts with the backend via AJAX calls using vanilla JavaScript.
-The random quote endpoint returns a single random quote to display on the page.


