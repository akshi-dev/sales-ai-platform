import json, os

DB_DIR = "db"
CALLS_FILE = f"{DB_DIR}/calls.json"

os.makedirs(DB_DIR, exist_ok=True)

# initialize file if not exists
if not os.path.exists(CALLS_FILE):
    json.dump([], open(CALLS_FILE, "w"))

def load_calls():
    try:
        return json.load(open(CALLS_FILE))
    except:
        return []

def save_calls(data):
    json.dump(data, open(CALLS_FILE, "w"), indent=2)
