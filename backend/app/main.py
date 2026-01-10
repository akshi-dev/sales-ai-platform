from fastapi import FastAPI

# Import Routers
from backend.app.routes.leads import router as leads_router
from backend.app.routes.calls import router as calls_router
from backend.app.routes.analytics import router as analytics_router
from backend.app.routes.users import router as users_router
from backend.app.routes.upload import router as upload_router

app = FastAPI()

@app.get("/")
def root():
    return {"status": "backend working"}

# Register routers
app.include_router(upload_router)     # <-- Mobile uploads call audio here
app.include_router(leads_router)
app.include_router(calls_router)      # <-- Dashboard fetches call list + details here
app.include_router(analytics_router)  # <-- Charts / insights
app.include_router(users_router)      # <-- Users + Salesman + Manager
