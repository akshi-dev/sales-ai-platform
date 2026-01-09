from fastapi import APIRouter

router = APIRouter(prefix="/analytics")

@router.get("/health")
def analytics_health():
    return {"status": "analytics route ok"}