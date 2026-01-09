from fastapi import APIRouter
from backend.app.db.database import calls_collection

router = APIRouter(prefix="/calls")

@router.get("/health")
def calls_health():
    return {"status": "calls route ok"}