from pathlib import Path
from bs4 import BeautifulSoup

SD_DIR = Path("courses/System Design")

for file in SD_DIR.glob("*.html"):
    print(f"Cleaning: {file.name}")

    html = file.read_text(encoding="utf-8", errors="ignore")
    soup = BeautifulSoup(html, "html.parser")

    # 🔥 Remove "Saved from..." blocks
    for tag in soup.find_all(string=True):
        if "Saved from:" in tag:
            parent = tag.find_parent()
            if parent:
                parent.decompose()

    # 🔥 Remove Date lines also
    for tag in soup.find_all(string=True):
        if "Date:" in tag:
            parent = tag.find_parent()
            if parent:
                parent.decompose()

    file.write_text(str(soup), encoding="utf-8")

print("✅ System Design HTML cleaned!")