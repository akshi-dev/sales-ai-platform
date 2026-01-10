from fastapi import APIRouter, UploadFile, File, Form
from backend.app.db.database import calls_collection
import uuid, datetime, os

router = APIRouter(prefix="/upload")

UPLOAD_DIR = "storage/audio"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/call")
async def upload_call(
    salesman_id: str = Form(...),
    phone_number: str = Form(...),
    timestamp: str = Form(...),
    duration: str = Form(...),
    audio: UploadFile = File(...)
):
    call_id = str(uuid.uuid4())
    file_path = f"{UPLOAD_DIR}/{call_id}.mp3"

    with open(file_path, "wb") as f:
        f.write(await audio.read())

    record = {
        "_id": call_id,
        "salesman_id": salesman_id,
        "phone_number": phone_number,
        "timestamp": timestamp,
        "duration": duration,
        "file_path": file_path,
        "status": "uploaded",
        "created_at": datetime.datetime.utcnow().isoformat()
    }

    calls_collection.insert_one(record)

    return {"status": "ok", "id": call_id}
