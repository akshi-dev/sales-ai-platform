from fastapi import APIRouter

router = APIRouter(prefix="/users")

@router.get("/health")
def users_health():
    return {"status": "users route ok"}