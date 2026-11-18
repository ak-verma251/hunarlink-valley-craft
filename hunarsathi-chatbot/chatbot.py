"""
HunarSathi — LangChain + Gemini (gemini-3.8-flash) Buyer Chatbot for HunarLink.
Loads GEMINI_API_KEY from .env and enforces strict HunarLink-only answers.
"""

import os
from pathlib import Path
from typing import Dict, List, Tuple

from dotenv import load_dotenv
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_google_genai import ChatGoogleGenerativeAI

from knowledge_base import HUNARLINK_KNOWLEDGE, SYSTEM_PROMPT_TEMPLATE

# Load .env located inside hunarsathi-chatbot/
ENV_PATH = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

BOT_NAME = "HunarSathi"
DEFAULT_MODEL = "gemini-3.8-flash"

OFF_TOPIC_REFUSAL = (
    "I am HunarSathi, the dedicated buyer assistant for HunarLink. "
    "I can only answer questions related to the HunarLink platform — such as our GI-certified "
    "Kashmiri crafts (Pashmina, Walnut Woodcarving, Papier-Mâché, Silk Rugs, Kani & Sozni), "
    "prices, GI Tag verification, artisans, orders, escrow payments, and delivery. "
    "How can I help you explore HunarLink today?"
)

# Simple in-memory conversation store keyed by session_id
_SESSION_HISTORY: Dict[str, List[BaseMessage]] = {}
MAX_HISTORY_TURNS = 10


def get_gemini_config() -> Tuple[str, str]:
    """Read GEMINI_API_KEY and GEMINI_MODEL from .env."""
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    model = os.getenv("GEMINI_MODEL", DEFAULT_MODEL).strip() or DEFAULT_MODEL
    return api_key, model


def build_hunarsathi_chain():
    """Create the LangChain LCEL pipeline calling Gemini (gemini-3.8-flash)."""
    api_key, model_name = get_gemini_config()
    if not api_key or api_key == "GEMINI_API_KEY":
        raise ValueError(
            "Please set a valid GEMINI_API_KEY in hunarsathi-chatbot/.env before calling Gemini."
        )

    llm = ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=api_key,
        temperature=0.25,
        max_output_tokens=512,
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", SYSTEM_PROMPT_TEMPLATE),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{user_input}"),
        ]
    )

    chain = prompt | llm | StrOutputParser()
    return chain, model_name


def ask_hunarsathi(user_message: str, session_id: str = "default") -> Dict[str, object]:
    """
    Send a buyer's question to HunarSathi via LangChain + Gemini 3.8 Flash.
    Maintains per-session conversation history and enforces HunarLink-only answers.
    """
    cleaned = (user_message or "").strip()
    if not cleaned:
        return {
            "bot": BOT_NAME,
            "model": os.getenv("GEMINI_MODEL", DEFAULT_MODEL),
            "reply": "Namaste! Ask me anything about HunarLink crafts, prices, GI verification, or your orders.",
            "session_id": session_id,
        }

    history = _SESSION_HISTORY.setdefault(session_id, [])

    chain, model_name = build_hunarsathi_chain()
    reply = chain.invoke(
        {
            "knowledge": HUNARLINK_KNOWLEDGE,
            "chat_history": history[-(MAX_HISTORY_TURNS * 2) :],
            "user_input": cleaned,
        }
    )

    reply_text = (reply or "").strip() or OFF_TOPIC_REFUSAL

    # Persist turn in session memory
    history.append(HumanMessage(content=cleaned))
    history.append(AIMessage(content=reply_text))
    if len(history) > MAX_HISTORY_TURNS * 2:
        _SESSION_HISTORY[session_id] = history[-(MAX_HISTORY_TURNS * 2) :]

    return {
        "bot": BOT_NAME,
        "model": model_name,
        "reply": reply_text,
        "session_id": session_id,
    }


def reset_session(session_id: str = "default") -> None:
    """Clear conversation history for a buyer session."""
    _SESSION_HISTORY.pop(session_id, None)

