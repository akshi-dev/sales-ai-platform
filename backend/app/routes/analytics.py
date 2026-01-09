from fastapi import APIRouter
from backend.app.db.database import calls_collection

router = APIRouter(prefix="/analytics")

@router.get("/histograms")
def histograms():
    return {
        "callDuration": [
            {"name": "0-1 min", "value": calls_collection.count_documents({"duration": {"$lte": 60}})},
            {"name": "1-3 min", "value": calls_collection.count_documents({"duration": {"$gt": 60, "$lte": 180}})},
            {"name": "3-5 min", "value": calls_collection.count_documents({"duration": {"$gt": 180, "$lte": 300}})},
            {"name": "5+ min", "value": calls_collection.count_documents({"duration": {"$gt": 300}})}
        ],

        "sentiment": [
            {"name": "Positive", "value": calls_collection.count_documents({"sentiment": "Positive"})},
            {"name": "Neutral", "value": calls_collection.count_documents({"sentiment": "Neutral"})},
            {"name": "Negative", "value": calls_collection.count_documents({"sentiment": "Negative"})}
        ],

        "callQuality": [
            {"name": "0-40", "value": calls_collection.count_documents({"call_score": {"$lte": 40}})},
            {"name": "40-60", "value": calls_collection.count_documents({"call_score": {"$gt": 40, "$lte": 60}})},
            {"name": "60-80", "value": calls_collection.count_documents({"call_score": {"$gt": 60, "$lte": 80}})},
            {"name": "80-100", "value": calls_collection.count_documents({"call_score": {"$gt": 80}})}
        ]
    }
