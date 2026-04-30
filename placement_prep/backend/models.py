from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


@dataclass
class ScannedFile:
    path: Path
    file_type: str
    size: int


@dataclass
class ProcessedDocument:
    source_path: Path
    course: str
    topic: str
    subtopic: str
    title: str
    output_path: Path
    content_markdown: str
    concepts: list[str] = field(default_factory=list)
    examples: list[str] = field(default_factory=list)
    code_snippets: list[str] = field(default_factory=list)
    images: list[str] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)

