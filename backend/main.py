import uuid
import json
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .pptx_engine import generate_presentation

load_dotenv()

app = FastAPI(title="AI PPTX Builder")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "backend/uploads"

@app.post("/generate")
async def generate(
    template: UploadFile = File(...),
    content: UploadFile = File(...)
):
    uid = str(uuid.uuid4())

    template_path = f"{UPLOAD_DIR}/{uid}_template.pptx"
    content_path = f"{UPLOAD_DIR}/{uid}_content.json"
    output_path = f"{UPLOAD_DIR}/{uid}_result.pptx"

    with open(template_path, "wb") as f:
        f.write(await template.read())

    with open(content_path, "wb") as f:
        f.write(await content.read())

    with open(content_path, "r", encoding="utf-8") as f:
        content_data = json.load(f)

    generate_presentation(template_path, content_data, output_path)

    return FileResponse(
        output_path,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        filename="presentation.pptx"
    )