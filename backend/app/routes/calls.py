from fastapi import APIRouter
from backend.app.db.database import load_calls

router = APIRouter(prefix="/calls")

@router.get("/health")
def calls_health():
    return {"status": "calls route ok"}

@router.get("/")
def list_calls():
    return load_calls()

@router.get("/{call_id}")
def get_call(call_id: str):
    data = load_calls()
    for r in data:
        if r["id"] == call_id:
            return r
    return {"error": "not found"}

