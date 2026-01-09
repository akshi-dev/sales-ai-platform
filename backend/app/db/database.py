from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)
db = client["sales_ai_platform"]

users_collection = db["users"]
leads_collection = db["leads"]
calls_collection = db["calls"]
analytics_collection = db["analytics"]