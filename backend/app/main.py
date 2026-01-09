from fastapi import FastAPI

from backend.app.routes.leads import router as leads_router
from backend.app.routes.calls import router as calls_router
from backend.app.routes.analytics import router as analytics_router
from backend.app.routes.users import router as users_router

app = FastAPI()

@app.get("/")
def root():
    return {"status": "backend working"}

app.include_router(leads_router)
app.include_router(calls_router)
app.include_router(analytics_router)
app.include_router(users_router)