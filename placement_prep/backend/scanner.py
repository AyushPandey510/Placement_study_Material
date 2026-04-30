from pathlib import Path

from .config import EXCLUDED_DIRS
from .models import ScannedFile


HTML_EXTENSIONS = {".html", ".htm"}
PDF_EXTENSIONS = {".pdf"}
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"}
CODE_EXTENSIONS = {".py", ".cpp", ".c", ".java", ".js", ".ts", ".tsx", ".jsx", ".go", ".rs"}
TEXT_EXTENSIONS = {".md", ".txt", ".csv", ".json", ".yaml", ".yml"}


def detect_file_type(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix in HTML_EXTENSIONS:
        return "html"
    if suffix in PDF_EXTENSIONS:
        return "pdf"
    if suffix in IMAGE_EXTENSIONS:
        return "image"
    if suffix in CODE_EXTENSIONS:
        return "code"
    if suffix in TEXT_EXTENSIONS:
        return "text"
    return "unknown"


def scan_roots(roots: list[Path]) -> list[ScannedFile]:
    seen: set[Path] = set()
    files: list[ScannedFile] = []
    for root in roots:
        if not root.exists():
            continue
        for path in root.rglob("*"):
            if any(part in EXCLUDED_DIRS for part in path.parts):
                continue
            if not path.is_file() or path in seen:
                continue
            seen.add(path)
            try:
                stat = path.stat()
            except OSError:
                continue
            files.append(ScannedFile(path=path, file_type=detect_file_type(path), size=stat.st_size))
    return files

