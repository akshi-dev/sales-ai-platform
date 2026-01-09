from fastapi import APIRouter
from backend.app.db.database import leads_collection

router = APIRouter(prefix="/leads")

@router.get("/health")
def leads_health():
    return {"status": "leads route ok"}