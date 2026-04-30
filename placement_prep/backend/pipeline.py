import json
import time
import traceback
from pathlib import Path
from threading import Event, Thread

from .config import COURSES_ROOT, DATA_ROOT, KNOWN_INPUT_ROOTS, LOG_ROOT, RAW_ROOT
from .extractors import ContentExtractor
from .image_pipeline import ImageStore
from .models import ProcessedDocument
from .scanner import scan_roots
from .utils import relative_posix


class ProcessingPipeline:
    def __init__(self) -> None:
        self.image_store = ImageStore()
        self.extractor = ContentExtractor(self.image_store)
        self.index_path = DATA_ROOT / "course_index.json"
        self.state_path = DATA_ROOT / "processed_state.json"
        self.error_log = LOG_ROOT / "errors.log"
        DATA_ROOT.mkdir(parents=True, exist_ok=True)
        LOG_ROOT.mkdir(parents=True, exist_ok=True)

    def process_all(self, include_existing_materials: bool = True) -> dict:
        roots = [RAW_ROOT]
        if include_existing_materials:
            roots = KNOWN_INPUT_ROOTS
        files = scan_roots(roots)
        state = self._load_json(self.state_path, {})
        documents: list[ProcessedDocument] = []
        errors = 0

        for scanned in files:
            if scanned.file_type == "unknown":
                continue
            key = scanned.path.as_posix()
            signature = f"{scanned.size}:{int(scanned.path.stat().st_mtime)}"
            if state.get(key) == signature:
                continue
            try:
                doc = self.extractor.process(scanned.path, COURSES_ROOT)
                if doc:
                    documents.append(doc)
                    state[key] = signature
            except Exception:
                errors += 1
                self._log_error(scanned.path)

        self._save_json(self.state_path, state)
        index = self.rebuild_index()
        return {
            "scanned": len(files),
            "processed": len(documents),
            "errors": errors,
            "courses": len(index["courses"]),
        }

    def rebuild_index(self) -> dict:
        courses: dict[str, dict] = {}
        for path in COURSES_ROOT.rglob("*.md"):
            metadata, body = read_markdown(path)
            course = metadata.get("course") or path.parts[-3]
            topic = metadata.get("topic") or path.parts[-2]
            item = {
                "id": relative_posix(path, COURSES_ROOT),
                "title": metadata.get("title") or path.stem,
                "course": course,
                "topic": topic,
                "path": "/" + relative_posix(path, COURSES_ROOT),
                "source": metadata.get("source", ""),
                "excerpt": " ".join(body.split())[:240],
                "wordCount": len(body.split()),
            }
            course_entry = courses.setdefault(course, {"title": course, "topics": {}})
            course_entry["topics"].setdefault(topic, {"title": topic, "items": []})["items"].append(item)

        normalized_courses = []
        for course in sorted(courses.values(), key=lambda c: c["title"]):
            topics = []
            for topic in sorted(course["topics"].values(), key=lambda t: t["title"]):
                topic["items"].sort(key=lambda item: item["title"])
                topics.append(topic)
            normalized_courses.append({"title": course["title"], "topics": topics})

        index = {"generatedAt": int(time.time()), "courses": normalized_courses}
        self._save_json(self.index_path, index)
        return index

    def watch(self, interval_seconds: int = 5, include_existing_materials: bool = False) -> "PipelineWatcher":
        watcher = PipelineWatcher(self, interval_seconds, include_existing_materials)
        watcher.start()
        return watcher

    def _load_json(self, path: Path, default):
        if not path.exists():
            return default
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            return default

    def _save_json(self, path: Path, data) -> None:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(data, indent=2), encoding="utf-8")

    def _log_error(self, path: Path) -> None:
        self.error_log.parent.mkdir(parents=True, exist_ok=True)
        with self.error_log.open("a", encoding="utf-8") as handle:
            handle.write(f"\n--- {path} ---\n")
            handle.write(traceback.format_exc())


class PipelineWatcher:
    def __init__(self, pipeline: ProcessingPipeline, interval_seconds: int, include_existing_materials: bool) -> None:
        self.pipeline = pipeline
        self.interval_seconds = interval_seconds
        self.include_existing_materials = include_existing_materials
        self.stop_event = Event()
        self.thread = Thread(target=self._run, daemon=True)

    def start(self) -> None:
        self.thread.start()

    def stop(self) -> None:
        self.stop_event.set()

    def _run(self) -> None:
        while not self.stop_event.wait(self.interval_seconds):
            self.pipeline.process_all(include_existing_materials=self.include_existing_materials)


def read_markdown(path: Path) -> tuple[dict[str, str], str]:
    text = path.read_text(encoding="utf-8", errors="ignore")
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    metadata: dict[str, str] = {}
    for line in parts[1].splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip().strip('"')
    return metadata, parts[2].strip()

