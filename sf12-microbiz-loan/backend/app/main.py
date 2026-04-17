from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from pathlib import Path

from app.database import Base, SessionLocal, engine
from app.routers import admin, loans, sellers
from app.services.seed_loader import seed_demo_data

# Ensure model metadata is registered before create_all
from app.models import models as _models  # noqa: F401

load_dotenv()

app = FastAPI(
    title="[SF12] MicroBiz Loan for Digital Economy Sellers",
    description="AI-powered micro loan product using alternative credit scoring",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sellers.router)
app.include_router(loans.router)
app.include_router(admin.router)


@app.on_event("startup")
def bootstrap():
    rebuild_schema = (
        os.getenv("DEMO_REBUILD_SCHEMA_ON_STARTUP", "false").lower() == "true"
    )
    if rebuild_schema:
        Base.metadata.drop_all(bind=engine)

    Base.metadata.create_all(bind=engine)

    seed_dir = Path(__file__).resolve().parents[1] / "seed_data"
    if not seed_dir.exists():
        return

    reset_on_startup = os.getenv("DEMO_RESET_ON_STARTUP", "false").lower() == "true"
    db = SessionLocal()
    try:
        seed_demo_data(db, seed_dir=seed_dir, reset=reset_on_startup)
    finally:
        db.close()


@app.get("/")
async def root():
    return {
        "project": "[SF12] MicroBiz Loan",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
