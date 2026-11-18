"""
FastAPI Backend Server for HunarSathi — HunarLink Buyer Chatbot.
Exposes /api/chat, /api/reset, and /api/health with CORS for the main HunarLink page.
"""

import os
from pathlib import Path

import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from chatbot import BOT_NAME, DEFAULT_MODEL, ask_hunarsathi, get_gemini_config, reset_session

load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")

app = FastAPI(
    title="HunarSathi — HunarLink Buyer Chatbot API",
    description="LangChain + Gemini 3.8 Flash assistant restricted strictly to the HunarLink platform.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1200)
    session_id: str = Field(default="buyer-default", max_length=128)


class ResetRequest(BaseModel):
    session_id: str = Field(default="buyer-default", max_length=128)


@app.get("/api/health")
def health_check():
    api_key, model_name = get_gemini_config()
    key_configured = bool(api_key and api_key != "GEMINI_API_KEY")
    return {
        "status": "ok",
        "bot": BOT_NAME,
        "model": model_name or DEFAULT_MODEL,
        "gemini_key_configured": key_configured,
    }


@app.post("/api/chat")
def chat_endpoint(payload: ChatRequest):
    try:
        return ask_hunarsathi(payload.message, payload.session_id)
    except ValueError as err:
        raise HTTPException(status_code=503, detail=str(err)) from err
    except Exception as err:
        raise HTTPException(status_code=500, detail=f"HunarSathi Gemini error: {err}") from err


@app.post("/api/reset")
def reset_endpoint(payload: ResetRequest):
    reset_session(payload.session_id)
    return {"status": "reset", "bot": BOT_NAME, "session_id": payload.session_id}


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5050"))
    print(f"Starting {BOT_NAME} API (LangChain + {os.getenv('GEMINI_MODEL', DEFAULT_MODEL)}) on http://127.0.0.1:{port}")
    uvicorn.run("server:app", host="127.0.0.1", port=port, reload=False)

