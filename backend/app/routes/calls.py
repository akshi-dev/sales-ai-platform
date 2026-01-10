from fastapi import APIRouter
from backend.app.db.database import calls_collection

router = APIRouter(prefix="/calls")

@router.get("/health")
def calls_health():
    return {"status": "calls route ok"}

@router.get("/")
def list_calls():
    data = list(calls_collection.find({}))
    # Convert ObjectId to string for frontend
    for d in data:
        d["_id"] = str(d["_id"])
    return data

@router.get("/{call_id}")
def get_call(call_id: str):
    record = calls_collection.find_one({"_id": call_id})
    if not record:
        return {"error": "not found"}
    record["_id"] = str(record["_id"])
    return record
