import base64
import mimetypes
import re
import urllib.request
from io import BytesIO
from pathlib import Path
from urllib.parse import urlparse

from PIL import Image

from .config import IMAGE_ROOT, ROOT
from .utils import slugify, stable_hash


MAX_IMAGE_SIDE = 1800


class ImageStore:
    def __init__(self) -> None:
        self.hash_to_path: dict[str, Path] = {}

    def save_from_src(self, src: str, course: str, topic: str, source_dir: Path) -> str | None:
        data = self._read_image_bytes(src, source_dir)
        if not data:
            return None

        digest = stable_hash(data)
        if digest in self.hash_to_path:
            return "/" + self.hash_to_path[digest].relative_to(ROOT).as_posix()

        image_dir = IMAGE_ROOT / slugify(course) / slugify(topic)
        image_dir.mkdir(parents=True, exist_ok=True)
        output = image_dir / f"{digest[:16]}.webp"

        try:
            with Image.open(BytesIO(data)) as image:
                image.thumbnail((MAX_IMAGE_SIDE, MAX_IMAGE_SIDE))
                if image.mode not in {"RGB", "RGBA"}:
                    image = image.convert("RGBA")
                image.save(output, "WEBP", quality=82, method=6)
        except Exception:
            extension = self._extension_from_src(src) or ".bin"
            output = image_dir / f"{digest[:16]}{extension}"
            output.write_bytes(data)

        self.hash_to_path[digest] = output
        return "/" + output.relative_to(ROOT).as_posix()

    def _read_image_bytes(self, src: str, source_dir: Path) -> bytes | None:
        if not src:
            return None
        if src.startswith("data:image"):
            match = re.match(r"data:image/[^;]+;base64,(.*)", src, re.DOTALL)
            if not match:
                return None
            try:
                return base64.b64decode(match.group(1))
            except ValueError:
                return None
        if src.startswith(("http://", "https://")):
            try:
                with urllib.request.urlopen(src, timeout=8) as response:
                    return response.read()
            except Exception:
                return None

        candidate = (source_dir / src).resolve()
        try:
            if candidate.exists() and candidate.is_file():
                return candidate.read_bytes()
        except OSError:
            return None
        return None

    def _extension_from_src(self, src: str) -> str | None:
        if src.startswith("data:image/"):
            mime = src.split(";", 1)[0].removeprefix("data:")
            return mimetypes.guess_extension(mime)
        parsed = urlparse(src)
        return Path(parsed.path).suffix or None
