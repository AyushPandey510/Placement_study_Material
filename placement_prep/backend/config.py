import os
from pathlib import Path

# ── Project root ──────────────────────────────────────────────────────────────
#
# In development: cwd() is the repo root.
# On Vercel / Railway: cwd() is the deployment root — same layout expected.
# Override with ROOT_DIR env var if your layout differs.
#
ROOT = Path(os.environ.get("ROOT_DIR", os.getcwd())).resolve()

# ── Input roots (raw source material) ────────────────────────────────────────
RAW_ROOT  = ROOT / "raw_material"

KNOWN_INPUT_ROOTS: list[Path] = [
    RAW_ROOT,
    ROOT / "DSA",
    ROOT / "SystemDesignInterview",
    ROOT / "MachineLearning",
    ROOT,
]

EXCLUDED_DIRS: set[str] = {
    ".git",
    ".sixth",
    "node_modules",
    "courses",
    "assets",
    "placement_prep",
    "dist",
    "__pycache__",
}

# ── Output roots (generated / served) ────────────────────────────────────────
COURSES_ROOT = ROOT / "courses"
ASSETS_ROOT  = ROOT / "assets"
IMAGE_ROOT   = ASSETS_ROOT / "images"
DATA_ROOT    = ROOT / "placement_prep" / "data"
LOG_ROOT     = ROOT / "placement_prep" / "logs"

# ── Ensure writable output dirs exist on first run ───────────────────────────
#
# Only create them locally; on Vercel the filesystem is read-only for dirs
# that don't exist in the deployment image, so we skip creation when the
# deploy flag is set.
#
if not os.environ.get("VERCEL") and not os.environ.get("RENDER"):
    for _d in (COURSES_ROOT, ASSETS_ROOT, IMAGE_ROOT, DATA_ROOT, LOG_ROOT):
        _d.mkdir(parents=True, exist_ok=True)