from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import os
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

PROMPTS = [
    "Describe your day yesterday in past tense.",
    "Talk about your favorite food and how it's prepared.",
    "Imagine a trip you want to take and describe it in future tense.",
    "Explain how you spend your weekends.",
    "Describe your hometown and what makes it special.",
    "Talk about a book or movie that you liked recently.",
    "Describe your favorite holiday celebration.",
    "Write a short story using at least five adjectives.",
    "Explain the importance of learning new languages.",
]

DATA_FILE = "progress.json"
MIN_WORDS = 2
MAX_DAILY_PROMPTS = 2

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE) as f:
            return json.load(f)
    return {
        "last_date": "",
        "completed_count": 0,
        "streak": 0,
        "xp": 0,
        "freeze_tokens": 1
    }

def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

@app.route("/api/prompts", methods=["GET"])
def get_prompts():
    data = load_data()
    today = datetime.now().date().isoformat()

    # Reset daily count if it's a new day
    if data.get("last_date") != today:
        data["last_date"] = today
        data["completed_count"] = 0
        save_data(data)

    if data["completed_count"] >= MAX_DAILY_PROMPTS:
        return jsonify({"completed": True, "message": "You’ve already completed both prompts for today."})

    # Sample only remaining number of prompts
    remaining = MAX_DAILY_PROMPTS - data["completed_count"]
    prompts = random.sample(PROMPTS, remaining)

    return jsonify({
        "completed": False,
        "remaining": remaining,
        "prompts": prompts
    })

@app.route("/api/submit", methods=["POST"])
def submit():
    req = request.get_json()
    responses = req.get("responses", [])

    if not (1 <= len(responses) <= 2):
        return jsonify({"error": "You must submit 1 or 2 responses."}), 400

    for response in responses:
        if len(response.strip().split()) < MIN_WORDS:
            return jsonify({"error": "Each response must contain at least 2 words."}), 400

    data = load_data()
    today = datetime.now().date().isoformat()

    # Reset daily if new day
    if data.get("last_date") != today:
        data["last_date"] = today
        data["completed_count"] = 0

    if data["completed_count"] + len(responses) > MAX_DAILY_PROMPTS:
        return jsonify({"error": f"You can only submit {MAX_DAILY_PROMPTS - data['completed_count']} more response(s) today."}), 400

    data["completed_count"] += len(responses)

    # XP and streak update only after full completion (both)
    if data["completed_count"] == MAX_DAILY_PROMPTS:
        today_date = datetime.now().date()
        last_date = datetime.strptime(data.get("last_date", ""), "%Y-%m-%d").date() if data.get("last_date") else None

        if last_date and (today_date - last_date).days > 1:
            if data["freeze_tokens"] > 0:
                data["freeze_tokens"] -= 1
            else:
                data["streak"] = 0

        data["streak"] += 1
        data["xp"] += 20

    save_data(data)

    return jsonify({
        "message": f"Submitted {len(responses)} response(s) successfully.",
        "xp": data["xp"],
        "streak": data["streak"],
        "freeze_tokens": data["freeze_tokens"],
        "completed_count": data["completed_count"]
    })

if __name__ == "__main__":
    app.run(debug=True)
