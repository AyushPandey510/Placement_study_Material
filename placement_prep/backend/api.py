import json
import mimetypes
import os
from pathlib import Path

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles

from .config import ASSETS_ROOT, COURSES_ROOT, ROOT
from .pipeline import read_markdown


app = FastAPI(title="Placement Prep Platform")

# ── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Derived roots ─────────────────────────────────────────────────────────────
#
# All optional roots are resolved once at startup.  Every path that might
# not exist is guarded with .exists() before use so the server never crashes
# on a fresh clone or partial deployment.
#
INDEX_FILE  = ROOT / "placement_prep" / "data" / "course_index.json"
ML_ROOT = ROOT / "courses" / "Machine Learning" / "MachineLearning"
SD_ROOT     = ROOT / "courses" / "System Design"

# Additional HTML roots — extend this list if you add more course folders
# that contain raw .html files served via /api/html/
_HTML_ROOTS: list[Path] = [ML_ROOT, SD_ROOT]

# ── Static assets ─────────────────────────────────────────────────────────────
if ASSETS_ROOT.exists():
    app.mount("/assets", StaticFiles(directory=str(ASSETS_ROOT)), name="assets")


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def _safe_resolve(base: Path, relative: str) -> Path:
    """
    Resolve *relative* inside *base* and raise 403 if the result escapes base.
    Strips leading slashes / path separators before joining so a caller cannot
    pass an absolute path that sidesteps the base directory.
    """
    # Strip any leading slashes or dots that could traverse upward
    clean = relative.lstrip("/").lstrip("\\")
    resolved = (base / clean).resolve()
    if base.resolve() not in resolved.parents and resolved != base.resolve():
        raise HTTPException(status_code=403, detail="Path not allowed")
    return resolved


def _load_index() -> dict:
    """Return the course index dict, or an empty skeleton on any read error."""
    if not INDEX_FILE.exists():
        return {"courses": []}
    try:
        with open(INDEX_FILE, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, json.JSONDecodeError) as exc:
        raise HTTPException(status_code=500, detail=f"Index unreadable: {exc}")


# ─────────────────────────────────────────────────────────────────────────────
# Health
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/api/health")
def health() -> dict:
    return {
        "ok": True,
        "index_exists": INDEX_FILE.exists(),
        "courses_root_exists": COURSES_ROOT.exists(),
    }


# ─────────────────────────────────────────────────────────────────────────────
# Processing (disabled on Vercel — must run locally)
# ─────────────────────────────────────────────────────────────────────────────

@app.post("/api/process")
def process():
    raise HTTPException(
        status_code=403,
        detail="Processing disabled on Vercel. Run the CLI locally and push generated data.",
    )


# ─────────────────────────────────────────────────────────────────────────────
# Courses index
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/api/courses")
def courses() -> dict:
    """Return the full course index JSON, empty skeleton if not yet generated."""
    return _load_index()


# ─────────────────────────────────────────────────────────────────────────────
# Lesson content  (Markdown → {metadata, body})
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/api/content/{content_path:path}")
def content(content_path: str) -> dict:
    """
    Serve a parsed markdown lesson.

    FIX: uses _safe_resolve() instead of inline resolve() so path-traversal
    attempts are rejected with 403 rather than silently succeeding.
    """
    path = _safe_resolve(COURSES_ROOT, content_path)

    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404, detail=f"Not found: {content_path}")

    if path.suffix.lower() not in {".md", ".markdown"}:
        raise HTTPException(status_code=400, detail="Only markdown files are served here")

    try:
        metadata, body = read_markdown(path)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Could not parse file: {exc}")

    return {"metadata": metadata, "body": body}


# ─────────────────────────────────────────────────────────────────────────────
# HTML lesson files  (Machine Learning, System Design, …)
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/api/html/{filename:path}")
def serve_html(filename: str):
    """
    Serve a raw .html file from one of the known HTML roots.

    FIX 1: _safe_resolve() on every root — no traversal possible.
    FIX 2: only .html files are served; other extensions get 400.
    FIX 3: explicit Content-Type so browsers always parse as HTML.
    FIX 4: iterates _HTML_ROOTS so adding a new course folder is one-line.
    """
    # Only .html files — reject anything else up front
    requested_suffix = Path(filename).suffix.lower()
    if requested_suffix not in {".html", ""}:
        raise HTTPException(status_code=400, detail="Only .html files are served here")

    for root in _HTML_ROOTS:
        if not root.exists():
            continue
        try:
            path = _safe_resolve(root, filename)
        except HTTPException:
            # This root rejected the traversal — try the next one
            continue

        if path.exists() and path.is_file() and path.suffix.lower() == ".html":
            return FileResponse(str(path), media_type="text/html; charset=utf-8")

    raise HTTPException(status_code=404, detail=f"HTML file not found: {filename}")


# ─────────────────────────────────────────────────────────────────────────────
# ML lesson index  (used by the frontend to discover available HTML lessons)
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/api/ml-lessons")
def get_ml_lessons() -> dict:
    """
    FIX: was returning raw filenames as `path`; frontend expected relative
    paths that match how items are stored in the course index.  Now returns
    the same relative string the frontend would pass to /api/html/.
    """
    if not ML_ROOT.exists():
        return {"lessons": []}

    lessons = sorted(
        [
            {
                "title": f.stem.replace("-", " ").replace("_", " ").title(),
                "path": f.name,          # e.g. "linear-regression.html"
                "type": "html",
                "course": "Machine Learning",
            }
            for f in ML_ROOT.glob("*.html")
            if f.is_file()
        ],
        key=lambda x: x["title"],
    )
    return {"lessons": lessons}


# ─────────────────────────────────────────────────────────────────────────────
# Assets  (images embedded in markdown)
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/api/assets/{asset_path:path}")
def asset(asset_path: str):
    """
    FIX 1: uses _safe_resolve() — the original used ASSETS_ROOT.resolve() in
            parents check but didn't guard against encoded traversal sequences.
    FIX 2: infers Content-Type from extension so SVGs / WebPs are served
            correctly, not just as application/octet-stream.
    FIX 3: 404 message now includes the requested path for easier debugging.
    """
    path = _safe_resolve(ASSETS_ROOT, asset_path)

    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404, detail=f"Asset not found: {asset_path}")

    media_type, _ = mimetypes.guess_type(str(path))
    return FileResponse(str(path), media_type=media_type or "application/octet-stream")


# ─────────────────────────────────────────────────────────────────────────────
# Search
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/api/search")
def search(
    q: str = Query(default="", max_length=200),
    course: str = Query(default=""),
    topic: str = Query(default=""),
    limit: int = Query(default=100, ge=1, le=500),
) -> dict:
    """
    FIX 1: Added Query() with max_length so a huge q string can't DoS the loop.
    FIX 2: Added `limit` param (replaces hardcoded [:100]).
    FIX 3: Search also checks item `body` field when present (mirrors the
            frontend fix that added body to the haystack).
    FIX 4: Graceful HTTPException on JSON read error instead of silent 500.
    """
    index = _load_index()

    query   = q.lower().strip()
    course_filter = course.lower().strip()
    topic_filter  = topic.lower().strip()
    results: list[dict] = []

    for course_entry in index.get("courses", []):
        if course_filter and course_entry["title"].lower() != course_filter:
            continue

        for topic_entry in course_entry.get("topics", []):
            if topic_filter and topic_entry["title"].lower() != topic_filter:
                continue

            for item in topic_entry.get("items", []):
                haystack = " ".join([
                    item.get("title",   ""),
                    item.get("excerpt", ""),
                    item.get("body",    ""),   # full body when indexed
                    item.get("course",  course_entry["title"]),
                    item.get("topic",   topic_entry["title"]),
                ]).lower()

                if not query or query in haystack:
                    results.append(item)

    return {"results": results[:limit]}

@app.get("/api/debug/tree")
def debug_tree():
    courses = COURSES_ROOT
    if not courses.exists():
        return {"error": "courses/ does not exist", "root": str(ROOT)}
    tree = {}
    for p in sorted(courses.rglob("*"))[:100]:  # limit output
        tree[str(p.relative_to(ROOT))] = p.is_file()
    return {"root": str(ROOT), "tree": tree}


# ─────────────────────────────────────────────────────────────────────────────
# Root
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/")
def root() -> PlainTextResponse:
    return PlainTextResponse("Placement Prep API is running.")