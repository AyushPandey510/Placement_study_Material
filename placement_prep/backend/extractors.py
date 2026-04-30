import html
import re
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

from .classifier import classify
from .image_pipeline import ImageStore
from .models import ProcessedDocument
from .utils import slugify, titleize


NOISE_PATTERNS = re.compile(
    r"(saved from|completed|coding interview patterns|progress|menu|sidebar|navigation|advertisement|bytebytego)",
    re.I,
)

IMAGE_NOISE_PATTERNS = re.compile(r"(alex|ai\s*bot|aibot|bytebytego|completed|arrow-right|avatar)", re.I)


class ContentExtractor:
    def __init__(self, image_store: ImageStore) -> None:
        self.image_store = image_store

    def process(self, path: Path, output_root: Path) -> ProcessedDocument | None:
        file_type = path.suffix.lower()
        if file_type in {".html", ".htm"}:
            return self._process_html(path, output_root)
        if file_type in {".md", ".txt"}:
            return self._process_text(path, output_root)
        if file_type in {".py", ".cpp", ".c", ".java", ".js", ".ts", ".tsx", ".jsx", ".go", ".rs"}:
            return self._process_code(path, output_root)
        if file_type == ".pdf":
            return self._process_pdf(path, output_root)
        if file_type in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"}:
            return self._process_image(path, output_root)
        return None

    def _process_html(self, path: Path, output_root: Path) -> ProcessedDocument:
        soup = BeautifulSoup(path.read_text(encoding="utf-8", errors="ignore"), "html.parser")
        for node in soup(["script", "style", "noscript", "iframe", "svg", "canvas", "form", "button"]):
            node.decompose()
        for node in soup.find_all(["aside", "nav", "header", "footer"]):
            node.decompose()
        for node in soup.find_all("img"):
            if self._is_noise_image(node):
                node.decompose()

        for node in soup.find_all(True):
            class_id = " ".join(node.get("class", [])) + " " + str(node.get("id", ""))
            if NOISE_PATTERNS.search(class_id):
                node.decompose()
                continue
            allowed_attrs = {"href", "src", "alt"}
            if node.name in {"pre", "code"}:
                allowed_attrs.add("class")
            node.attrs = {key: value for key, value in node.attrs.items() if key in allowed_attrs}

        main = self._find_main_content(soup)
        title = self._title_from_html(soup, main, path)
        body_text = main.get_text(" ", strip=True) if main else soup.get_text(" ", strip=True)
        course, topic, subtopic = classify(path, title, body_text)
        markdown, images = self._html_to_markdown(main or soup, course, topic, path.parent)
        return self._document(path, output_root, course, topic, subtopic, title, markdown, images)

    def _find_main_content(self, soup: BeautifulSoup) -> Tag:
        candidates = soup.find_all(["article", "main", "section", "div"])
        if not candidates:
            return soup
        best = max(candidates, key=self._content_score)
        return best if self._content_score(best) > 20 else soup

    def _content_score(self, node: Tag) -> int:
        text = node.get_text(" ", strip=True)
        words = len(text.split())
        content_tags = len(node.find_all(["p", "pre", "code", "li", "h1", "h2", "h3", "h4", "img"]))
        link_words = sum(len(a.get_text(" ", strip=True).split()) for a in node.find_all("a"))
        noise_penalty = 400 if NOISE_PATTERNS.search(text[:1000]) else 0
        return words + content_tags * 25 - link_words * 2 - noise_penalty

    def _title_from_html(self, soup: BeautifulSoup, main: Tag, path: Path) -> str:
        for selector in ["h1", "h2", "title"]:
            node = (main or soup).find(selector) if selector != "title" else soup.find("title")
            if node and node.get_text(strip=True):
                title = node.get_text(" ", strip=True)
                if "ByteByteGo" not in title and title.strip().lower() not in {"intuition", "solution", "approach"}:
                    return titleize(title)
        return titleize(path.stem)

    def _html_to_markdown(self, root: Tag, course: str, topic: str, source_dir: Path) -> tuple[str, list[str]]:
        lines: list[str] = []
        images: list[str] = []
        seen_blocks: set[str] = set()

        for node in root.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "pre", "img"], recursive=True):
            if self._inside_processed_container(node):
                continue
            block = self._node_to_markdown(node, course, topic, source_dir, images)
            block = re.sub(r"\n{3,}", "\n\n", block).strip()
            if not block or block.lower() in seen_blocks or NOISE_PATTERNS.search(block[:120]):
                continue
            seen_blocks.add(block.lower())
            lines.append(block)

        return "\n\n".join(lines).strip() + "\n", images

    def _inside_processed_container(self, node: Tag) -> bool:
        parent = node.parent
        while isinstance(parent, Tag):
            if parent.name in {"ul", "ol", "pre"} and node.name != parent.name:
                return True
            parent = parent.parent
        return False

    def _node_to_markdown(self, node: Tag, course: str, topic: str, source_dir: Path, images: list[str]) -> str:
        if node.name and re.fullmatch(r"h[1-6]", node.name):
            level = int(node.name[1])
            return f"{'#' * level} {node.get_text(' ', strip=True)}"
        if node.name == "p":
            return self._inline_text(node)
        if node.name in {"ul", "ol"}:
            rows = []
            for index, li in enumerate(node.find_all("li", recursive=False), start=1):
                bullet = f"{index}." if node.name == "ol" else "-"
                rows.append(f"{bullet} {self._inline_text(li)}")
            return "\n".join(rows)
        if node.name == "pre":
            code = self._clean_code_text(node)
            language = self._language_from_code(node)
            return f"```{language}\n{html.unescape(code)}\n```"
        if node.name == "img":
            if self._is_noise_image(node):
                return ""
            src = node.get("src", "")
            saved = self.image_store.save_from_src(src, course, topic, source_dir)
            if not saved:
                return ""
            images.append(saved)
            alt = node.get("alt") or "diagram"
            return f"![{alt}]({saved})"
        return node.get_text(" ", strip=True)

    def _is_noise_image(self, node: Tag) -> bool:
        descriptor = " ".join(
            str(node.get(attr, ""))
            for attr in ["alt", "title", "src", "srcset", "class", "id"]
        )
        if IMAGE_NOISE_PATTERNS.search(descriptor):
            return True
        try:
            width = int(str(node.get("width", "0")).strip() or "0")
            height = int(str(node.get("height", "0")).strip() or "0")
        except ValueError:
            return False
        return 0 < width <= 32 and 0 < height <= 32

    def _clean_code_text(self, node: Tag) -> str:
        code_node = node.find("code") or node
        code = code_node.get_text("", strip=False)
        code = html.unescape(code).replace("\xa0", " ").replace("\r\n", "\n").replace("\r", "\n")
        code = re.sub(r"[ \t]+\n", "\n", code)
        code = re.sub(r"\n{3,}", "\n\n", code)
        return code.strip("\n")

    def _inline_text(self, node: Tag) -> str:
        pieces: list[str] = []
        for child in node.children:
            if isinstance(child, NavigableString):
                pieces.append(str(child))
            elif isinstance(child, Tag) and child.name == "code":
                pieces.append(f"`{child.get_text(' ', strip=True)}`")
            elif isinstance(child, Tag) and child.name == "strong":
                pieces.append(f"**{child.get_text(' ', strip=True)}**")
            elif isinstance(child, Tag) and child.name == "em":
                pieces.append(f"*{child.get_text(' ', strip=True)}*")
            elif isinstance(child, Tag) and child.name == "a":
                text = child.get_text(" ", strip=True)
                href = child.get("href", "")
                pieces.append(f"[{text}]({href})" if href and text else text)
            elif isinstance(child, Tag):
                pieces.append(child.get_text(" ", strip=True))
        return re.sub(r"\s+", " ", "".join(pieces)).strip()

    def _language_from_code(self, node: Tag) -> str:
        class_text = " ".join(node.get("class", [])) + " " + " ".join(node.code.get("class", []) if node.code else [])
        for language in ["python", "java", "cpp", "javascript", "typescript", "sql", "bash"]:
            if language in class_text.lower():
                return language
        return ""

    def _process_text(self, path: Path, output_root: Path) -> ProcessedDocument:
        text = path.read_text(encoding="utf-8", errors="ignore")
        title = titleize(path.stem)
        course, topic, subtopic = classify(path, title, text)
        return self._document(path, output_root, course, topic, subtopic, title, text.strip() + "\n", [])

    def _process_code(self, path: Path, output_root: Path) -> ProcessedDocument:
        code = path.read_text(encoding="utf-8", errors="ignore")
        title = titleize(path.stem)
        course, topic, subtopic = classify(path, title, code)
        language = path.suffix.lstrip(".")
        markdown = f"# {title}\n\n```{language}\n{code.strip()}\n```\n"
        return self._document(path, output_root, course, topic, subtopic, title, markdown, [])

    def _process_pdf(self, path: Path, output_root: Path) -> ProcessedDocument:
        title = titleize(path.stem)
        try:
            import fitz

            with fitz.open(path) as doc:
                text = "\n\n".join(page.get_text() for page in doc)
        except Exception:
            text = "PDF extraction requires PyMuPDF. The file was indexed as a source for later retry."
        course, topic, subtopic = classify(path, title, text)
        return self._document(path, output_root, course, topic, subtopic, title, f"# {title}\n\n{text}\n", [])

    def _process_image(self, path: Path, output_root: Path) -> ProcessedDocument:
        title = titleize(path.stem)
        course, topic, subtopic = classify(path, title, "")
        saved = self.image_store.save_from_src(path.name, course, topic, path.parent)
        markdown = f"# {title}\n\n"
        if saved:
            markdown += f"![{title}]({saved})\n\n"
        markdown += "OCR extraction is available when Tesseract and pytesseract are installed.\n"
        return self._document(path, output_root, course, topic, subtopic, title, markdown, [saved] if saved else [])

    def _document(
        self,
        source: Path,
        output_root: Path,
        course: str,
        topic: str,
        subtopic: str,
        title: str,
        markdown: str,
        images: list[str],
    ) -> ProcessedDocument:
        output_path = output_root / course / topic / f"{slugify(subtopic)}.md"
        concepts = extract_concepts(markdown)
        examples = re.findall(r"(?im)^#{2,6}\s*example[^\n]*|^example\s*\d*:.*$", markdown)
        code_snippets = re.findall(r"```[\s\S]*?```", markdown)
        frontmatter = [
            "---",
            f'title: "{title.replace(chr(34), chr(39))}"',
            f'course: "{course}"',
            f'topic: "{topic}"',
            f'source: "{source.as_posix()}"',
            "---",
            "",
        ]
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_text("\n".join(frontmatter) + markdown, encoding="utf-8")
        return ProcessedDocument(source, course, topic, subtopic, title, output_path, markdown, concepts, examples, code_snippets, images)


def extract_concepts(markdown: str) -> list[str]:
    headings = re.findall(r"(?m)^#{1,6}\s+(.+)$", markdown)
    bolds = re.findall(r"\*\*([^*]{3,80})\*\*", markdown)
    concepts = []
    for item in headings + bolds:
        clean = re.sub(r"\s+", " ", item).strip()
        if clean and clean.lower() not in {c.lower() for c in concepts}:
            concepts.append(clean)
    return concepts[:20]
