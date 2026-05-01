"""
chat.py — Groq-powered chat with RAG context.

Exposes two functions:
  stream_chat()       — async generator that yields SSE-formatted chunks
  explain_selection() — one-shot explanation of a selected text passage
"""

from __future__ import annotations

import os
import json
import httpx
from typing import AsyncGenerator

from .rag import retrieve, ensure_index

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_URL     = "https://api.groq.com/openai/v1/chat/completions"
MODEL        = "llama-3.3-70b-versatile"   # updated: llama3-70b-8192 is deprecated on Groq

SYSTEM_PROMPT = """You are a knowledgeable study assistant for a technical interview prep platform.
Your job is to help students understand concepts from their course material.

Rules:
- Answer ONLY based on the provided context from the course material.
- If the context doesn't contain enough information to answer, say: "I don't have enough information in the course material to answer that. Try searching for related topics."
- Be concise but thorough. Use examples when they help.
- Format responses with markdown: use **bold** for key terms, `code` for code snippets, and bullet points for lists.
- Never hallucinate or make up information not present in the context.
"""

SELECTION_SYSTEM_PROMPT = """You are a knowledgeable study assistant. A student has selected a piece of text from their study material and wants a detailed explanation.

Rules:
- Explain the selected concept from the ground up, as if teaching it for the first time.
- Use the surrounding course context to make the explanation accurate and relevant.
- Structure your answer: definition → how it works → why it matters → example.
- Use markdown formatting.
- Never hallucinate. If you're uncertain, say so.
"""


def _build_context(chunks: list[dict]) -> str:
    if not chunks:
        return "No relevant course material found."
    parts = []
    for i, c in enumerate(chunks, 1):
        parts.append(f"[Source {i}: {c['source']}]\n{c['text']}")
    return "\n\n---\n\n".join(parts)


async def stream_chat(
    question: str,
    course_filter: str | None = None,
    history: list[dict] | None = None,
) -> AsyncGenerator[str, None]:
    """
    Async generator yielding SSE-formatted strings.
    Usage in FastAPI:
        return StreamingResponse(stream_chat(q), media_type="text/event-stream")
    """
    if not GROQ_API_KEY:
        yield "data: {\"error\": \"GROQ_API_KEY not set\"}\n\n"
        return

    ensure_index()
    chunks  = retrieve(question, top_k=5, course_filter=course_filter)
    context = _build_context(chunks)

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]

    # inject context as a system message
    messages.append({
        "role":    "system",
        "content": f"Relevant course material:\n\n{context}",
    })

    # include short conversation history (last 6 turns)
    if history:
        messages.extend(history[-6:])

    messages.append({"role": "user", "content": question})

    payload = {
        "model":       MODEL,
        "messages":    messages,
        "stream":      True,
        "temperature": 0.3,
        "max_tokens":  1024,
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type":  "application/json",
    }

    async with httpx.AsyncClient(timeout=60) as client:
        async with client.stream("POST", GROQ_URL, json=payload, headers=headers) as resp:
            if resp.status_code != 200:
                error_body = await resp.aread()
                print("🔥 GROQ ERROR:", error_body.decode())
                yield f"data: {{\"error\": \"Groq API error {resp.status_code}\"}}\n\n"
                return

            async for line in resp.aiter_lines():
                if not line.startswith("data: "):
                    continue
                data = line[6:]
                if data == "[DONE]":
                    yield "data: [DONE]\n\n"
                    break
                try:
                    obj   = json.loads(data)
                    delta = obj["choices"][0]["delta"].get("content", "")
                    if delta:
                        yield f"data: {json.dumps({'token': delta})}\n\n"
                except (json.JSONDecodeError, KeyError):
                    continue

    # send sources after streaming completes
    source_list = [{"source": c["source"], "course": c["course"]} for c in chunks]
    yield f"data: {json.dumps({'sources': source_list})}\n\n"


async def explain_selection(
    selected_text: str,
    surrounding_context: str = "",
    course: str = "",
) -> AsyncGenerator[str, None]:
    """
    Explain a piece of selected text in depth.
    surrounding_context is the paragraph/section around the selection.
    """
    if not GROQ_API_KEY:
        yield "data: {\"error\": \"GROQ_API_KEY not set\"}\n\n"
        return

    ensure_index()

    # retrieve chunks related to the selection for grounding
    rag_chunks  = retrieve(selected_text, top_k=4, course_filter=course or None)
    rag_context = _build_context(rag_chunks)

    user_message = f"""The student selected this text from their study material:

"{selected_text}"

Surrounding context from the page:
{surrounding_context or '(not provided)'}

Relevant course material for grounding:
{rag_context}

Please explain "{selected_text}" in depth."""

    messages = [
        {"role": "system", "content": SELECTION_SYSTEM_PROMPT},
        {"role": "user",   "content": user_message},
    ]

    payload = {
        "model":       MODEL,
        "messages":    messages,
        "stream":      True,
        "temperature": 0.2,
        "max_tokens":  1500,
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type":  "application/json",
    }

    async with httpx.AsyncClient(timeout=60) as client:
        async with client.stream("POST", GROQ_URL, json=payload, headers=headers) as resp:
            # FIX: was indented inside the if-block, so the async for loop
            # never ran — response was consumed by aread() and the stream
            # was already closed before iteration began.
            if resp.status_code != 200:
                error_body = await resp.aread()
                print("🔥 GROQ ERROR:", error_body.decode())
                yield f"data: {{\"error\": \"Groq API error {resp.status_code}\"}}\n\n"
                return

            async for line in resp.aiter_lines():
                if not line.startswith("data: "):
                    continue
                data = line[6:]
                if data == "[DONE]":
                    yield "data: [DONE]\n\n"
                    break
                try:
                    obj   = json.loads(data)
                    delta = obj["choices"][0]["delta"].get("content", "")
                    if delta:
                        yield f"data: {json.dumps({'token': delta})}\n\n"
                except (json.JSONDecodeError, KeyError):
                    continue