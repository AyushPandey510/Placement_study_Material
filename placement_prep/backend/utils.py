import hashlib
import re
from pathlib import Path


def slugify(value: str, fallback: str = "untitled") -> str:
    value = value.replace("___Technical_Interview_Prep", "")
    value = value.replace("Technical_Interview_Prep", "")
    value = value.replace("_", " ")
    value = re.sub(r"\s+", " ", value).strip()
    value = re.sub(r"[^a-zA-Z0-9\s\-]+", "", value)
    value = re.sub(r"\s+", "-", value).strip("-").lower()
    return value or fallback


def titleize(value: str, fallback: str = "Untitled") -> str:
    value = value.replace("___Technical_Interview_Prep", "")
    value = value.replace("Technical_Interview_Prep", "")
    value = value.replace("_", " ").replace("-", " ")
    value = re.sub(r"\s+", " ", value).strip()
    if not value:
        return fallback
    return " ".join(part[:1].upper() + part[1:] for part in value.split())


def stable_hash(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def relative_posix(path: Path, root: Path) -> str:
    return path.resolve().relative_to(root.resolve()).as_posix()


def safe_write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")

