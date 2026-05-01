"""
rag.py — Lightweight RAG retrieval over your course markdown files.

Uses TF-IDF (scikit-learn) for embeddings — no GPU, no heavy deps, works on
Render free tier. Chunks markdown files into ~400-token windows, builds an
in-memory index, and retrieves top-k chunks for a given query.
"""

from __future__ import annotations

import re
import json
from pathlib import Path
from typing import NamedTuple

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from .config import COURSES_ROOT, DATA_ROOT

# ── Constants ─────────────────────────────────────────────────────────────────
CHUNK_SIZE   = 400   # words per chunk
CHUNK_OVERLAP = 80   # overlap between chunks
TOP_K        = 5     # chunks returned per query
INDEX_CACHE  = DATA_ROOT / "rag_index.json"


# ── Data structures ───────────────────────────────────────────────────────────
class Chunk(NamedTuple):
    text:      str
    source:    str   # relative path of the source file
    course:    str   # course slug
    chunk_idx: int


# ── Index (singleton, built once per process) ─────────────────────────────────
_chunks:     list[Chunk] = []
_vectorizer: TfidfVectorizer | None = None
_matrix      = None   # sparse TF-IDF matrix


def _split_into_chunks(text: str, source: str, course: str) -> list[Chunk]:
    """Split text into overlapping word-windows."""
    words  = text.split()
    chunks = []
    start  = 0
    idx    = 0
    while start < len(words):
        end        = start + CHUNK_SIZE
        chunk_text = " ".join(words[start:end])
        chunks.append(Chunk(chunk_text, source, course, idx))
        start += CHUNK_SIZE - CHUNK_OVERLAP
        idx   += 1
    return chunks


def _collect_markdown_files() -> list[tuple[Path, str]]:
    """Return (path, course_slug) pairs for every .md file under COURSES_ROOT."""
    results = []
    if not COURSES_ROOT.exists():
        return results
    for md_file in COURSES_ROOT.rglob("*.md"):
        # derive course slug from first directory component under COURSES_ROOT
        try:
            parts  = md_file.relative_to(COURSES_ROOT).parts
            course = parts[0] if parts else "general"
        except ValueError:
            course = "general"
        results.append((md_file, course))
    return results


def build_index() -> int:
    """
    (Re)build the TF-IDF index from all markdown files.
    Returns the number of chunks indexed.
    """
    global _chunks, _vectorizer, _matrix

    all_chunks: list[Chunk] = []
    for md_path, course in _collect_markdown_files():
        try:
            text = md_path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue
        # strip markdown syntax to improve retrieval quality
        text = re.sub(r"```[\s\S]*?```", " ", text)    # code blocks
        text = re.sub(r"`[^`]+`", " ", text)            # inline code
        text = re.sub(r"#+\s", " ", text)               # headings
        text = re.sub(r"[*_]{1,2}(.+?)[*_]{1,2}", r"\1", text)  # bold/italic
        text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)     # links
        text = re.sub(r"\s+", " ", text).strip()

        source = md_path.relative_to(COURSES_ROOT).as_posix()
        all_chunks.extend(_split_into_chunks(text, source, course))

    if not all_chunks:
        _chunks, _vectorizer, _matrix = [], None, None
        return 0

    texts       = [c.text for c in all_chunks]
    _vectorizer = TfidfVectorizer(
        max_features=50_000,
        ngram_range=(1, 2),
        sublinear_tf=True,
    )
    _matrix  = _vectorizer.fit_transform(texts)
    _chunks  = all_chunks
    return len(_chunks)


def retrieve(query: str, top_k: int = TOP_K, course_filter: str | None = None) -> list[dict]:
    """
    Return top_k most relevant chunks for `query`.
    Optionally filter to a specific course slug.
    """
    if _vectorizer is None or _matrix is None:
        build_index()

    if not _chunks:
        return []

    q_vec  = _vectorizer.transform([query])
    scores = cosine_similarity(q_vec, _matrix).flatten()

    # apply course filter if requested
    if course_filter:
        mask = np.array([c.course == course_filter for c in _chunks], dtype=float)
        scores = scores * mask

    top_indices = scores.argsort()[::-1][:top_k]
    results = []
    for i in top_indices:
        if scores[i] < 0.01:   # skip irrelevant chunks
            continue
        c = _chunks[i]
        results.append({
            "text":   c.text,
            "source": c.source,
            "course": c.course,
            "score":  float(scores[i]),
        })
    return results


def ensure_index() -> None:
    """Build index if not already built."""
    if _vectorizer is None:
        build_index()