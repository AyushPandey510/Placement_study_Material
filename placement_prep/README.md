# Placement Prep Platform

An automated course-generation platform that converts messy placement-prep material into clean, structured, searchable lessons.

It is designed for saved HTML pages, PDFs, screenshots, diagrams, notes, Markdown, text, and code files. The pipeline extracts the useful content, removes noisy navigation/branding, optimizes images, writes clean Markdown, and serves everything through a FastAPI backend plus a React frontend.

## What It Does

- Recursively scans raw study material.
- Detects file types automatically.
- Cleans noisy HTML pages.
- Removes copied sidebars, menus, progress widgets, metadata blocks, ByteByteGo traces, AI bot/avatar images, and repeated indexes.
- Extracts headings, paragraphs, lists, code blocks, and diagrams.
- Preserves code formatting inside fenced Markdown blocks.
- Decodes base64 images and saves them locally.
- Converts images to compressed WebP.
- Deduplicates images by content hash.
- Classifies content into course/topic/subtopic folders.
- Builds a searchable course index.
- Provides a modern reading UI with search, bookmarks, completion, notes, highlights, breadcrumbs, and a table of contents.

## Project Layout

```text
OOD-Design-Principles/
  raw_material/                     # Put new uploads here
  courses/                          # Generated clean Markdown lessons
  assets/images/                    # Generated optimized images
  placement_prep/
    backend/
      api.py                        # FastAPI app
      cli.py                        # Processor CLI
      scanner.py                    # Recursive adaptive file scanner
      extractors.py                 # HTML/text/code/PDF/image extraction
      image_pipeline.py             # Image decode, dedupe, WebP conversion
      classifier.py                 # Course/topic heuristics
      pipeline.py                   # End-to-end orchestration and index build
    data/
      course_index.json             # Generated course/search index
      processed_state.json          # Incremental processing cache
    frontend/
      src/                          # React app
      .env.local                    # Frontend API URL
    logs/
      errors.log                    # Processing errors, if any
```

## Requirements

Python:

- Python 3.10+
- `beautifulsoup4`
- `fastapi`
- `uvicorn`
- `pillow`
- Optional: `PyMuPDF` for PDFs
- Optional: `pytesseract` and system Tesseract for OCR

Frontend:

- Node.js 18+
- npm

Install frontend dependencies:

```bash
cd placement_prep/frontend
npm install
```

If Python dependencies are missing:

```bash
pip install -r requirements.txt
```

On this machine, some Python packages may already be installed through the system Python.

## Uploading New Materials

Create a `raw_material` folder at the repo root if it does not exist:

```bash
mkdir -p raw_material
```

Drop any new files or folders inside it:

```text
raw_material/
  DSA/
    Prefix Sums/
      notes.html
      diagram.png
  System Design/
    caching.pdf
  code/
    binary_search.py
```

Nested folders are supported. Naming does not need to be perfect; the classifier uses folder paths, filenames, titles, and text hints.

Supported inputs:

- HTML: `.html`, `.htm`
- PDFs: `.pdf`
- Images: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.bmp`
- Code: `.py`, `.cpp`, `.c`, `.java`, `.js`, `.ts`, `.tsx`, `.jsx`, `.go`, `.rs`
- Notes/data: `.md`, `.txt`, `.csv`, `.json`, `.yaml`, `.yml`

Unknown files are skipped gracefully.

## Processing Materials

Process only new uploads in `raw_material`:

```bash
python3 -m placement_prep.backend.cli --raw-only
```

Process `raw_material` plus the existing repo folders:

```bash
python3 -m placement_prep.backend.cli
```

Watch `raw_material` continuously:

```bash
python3 -m placement_prep.backend.cli --raw-only --watch
```

Watch everything:

```bash
python3 -m placement_prep.backend.cli --watch
```

Change the watch interval:

```bash
python3 -m placement_prep.backend.cli --raw-only --watch --interval 10
```

## Generated Output

Clean lessons are written to:

```text
courses/<Course>/<Topic>/<Subtopic>.md
```

Example:

```text
courses/DSA/PrefixSums/k-sum-subarrays.md
```

Images are written to:

```text
assets/images/<course>/<topic>/<hash>.webp
```

The frontend/backend index is written to:

```text
placement_prep/data/course_index.json
```

The incremental processing cache is written to:

```text
placement_prep/data/processed_state.json
```

If a source file has not changed, the processor skips it on later runs.

## Running The Backend

Start the FastAPI server:

```bash
python3 -m uvicorn placement_prep.backend.api:app --reload --host 0.0.0.0 --port 8000
```

If port `8000` is already busy, use another port:

```bash
python3 -m uvicorn placement_prep.backend.api:app --reload --host 0.0.0.0 --port 8765
```

Health check:

```bash
curl http://localhost:8000/api/health
```

Useful endpoints:

```text
GET  /api/health
GET  /api/courses
GET  /api/content/{course_path}
GET  /api/search?q=<query>
POST /api/process
GET  /assets/{asset_path}
```

Trigger processing through the API:

```bash
curl -X POST "http://localhost:8000/api/process?include_existing_materials=true"
```

## Running The Frontend

Set the API URL in:

```text
placement_prep/frontend/.env.local
```

Example:

```text
VITE_API_URL=http://localhost:8000
```

Start the React app:

```bash
cd placement_prep/frontend
npm run dev -- --port 5173
```

Open:

```text
http://localhost:5173/
```

Build for production:

```bash
cd placement_prep/frontend
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deploying To Vercel

This project is now configured for Vercel.

Added deployment files:

```text
vercel.json                  # Vercel build/output/rewrite config
api/index.py                 # Serverless FastAPI entrypoint
package.json                 # Root build script for Vercel
.vercelignore                # Keeps raw/source-only files out of deployment
```

Vercel deployment model:

- The React frontend is built as static files.
- FastAPI runs as a Python serverless function.
- Generated `courses/` and `assets/images/` are served as read-only content.
- New uploads should be processed locally before deployment.
- `/api/process` is disabled on Vercel because serverless deployments should not mutate the deployed filesystem.

### Before Deploying

Make sure your generated content is up to date:

```bash
python3 -m placement_prep.backend.cli
```

Or, if you only want to process files from `raw_material/`:

```bash
python3 -m placement_prep.backend.cli --raw-only
```

Verify the frontend build:

```bash
npm run build
```

Commit these important generated folders/files:

```text
courses/
assets/images/
placement_prep/data/course_index.json
api/index.py
vercel.json
package.json
requirements.txt
```

Do not commit:

```text
raw_material/
node_modules/
placement_prep/frontend/dist/
placement_prep/logs/
placement_prep/data/processed_state.json
```

Those are ignored or excluded from deployment.

### Vercel Project Settings

If importing the repo in the Vercel dashboard, use:

```text
Framework Preset: Other
Build Command: npm run build
Output Directory: placement_prep/frontend/dist
Install Command: default
Root Directory: ./
```

You usually do not need to set `VITE_API_URL` on Vercel. In production, the frontend uses same-origin API calls:

```text
/api/courses
/api/content/...
/assets/images/...
```

For local development, keep:

```text
placement_prep/frontend/.env.local
```

Example:

```text
VITE_API_URL=http://localhost:8000
```

The `.env.local` file is excluded from Vercel deployment.

### Deploy With Vercel CLI

Install Vercel CLI if needed:

```bash
npm install -g vercel
```

Login:

```bash
vercel login
```

Preview deployment:

```bash
vercel
```

Production deployment:

```bash
vercel --prod
```

### Deploy From GitHub

1. Push the repo to GitHub.
2. Import it in Vercel.
3. Keep root directory as `./`.
4. Use the project settings shown above.
5. Deploy.

### After Adding New Material

Vercel does not receive runtime uploads automatically. Use this workflow:

```bash
mkdir -p raw_material
# add your new files under raw_material/
python3 -m placement_prep.backend.cli --raw-only
npm run build
git add courses assets/images placement_prep/data/course_index.json
git commit -m "Add new study material"
git push
```

Vercel will redeploy from the pushed generated content.

### Vercel Routes

The app uses these Vercel rewrites:

```text
/api/*            -> FastAPI serverless function
/assets/images/*  -> FastAPI serverless function for generated course images
/*                -> React frontend
```

Vite's own JS/CSS assets still use `/assets/...` and are served statically from the frontend build.

## Frontend Features

- Auto-generated course cards.
- Collapsible course/topic sidebar.
- Global search.
- Recently viewed lessons.
- Bookmarks.
- Completed lessons.
- Progress percentage.
- Personal notes per lesson.
- Phrase highlighting.
- Auto-generated table of contents.
- Breadcrumbs.
- Dark mode by default.
- Light/dark toggle.
- Responsive layout.

Browser state is stored in `localStorage`, so progress, notes, bookmarks, and highlights stay on the same browser profile.

## HTML Cleaning Rules

The HTML cleaner is adaptive. It scores likely content containers and keeps the strongest one instead of relying on one exact selector.

It removes:

- `script`, `style`, `noscript`, `iframe`, `canvas`, forms, buttons
- `aside`, `nav`, `header`, `footer`
- Sidebar/menu/progress/navigation blocks
- "Saved from" metadata
- ByteByteGo branding traces
- Completed/checkmark navigation images
- ALEX/AI bot/avatar images
- Tiny UI icons and arrow images

It keeps:

- Headings
- Paragraphs
- Lists
- Code blocks
- Images and diagrams that look like lesson content

## Code Formatting

The extractor preserves code from highlighted HTML by reading the code text without inserting artificial newlines between every token.

Example output:

```python
def compute_prefix_sums(nums):
    # Start by adding the first number to the prefix sums array.
    prefix_sum = [nums[0]]
    # For all remaining indexes, add 'nums[i]' to the cumulative sum from the previous
    # index.
    for i in range(1, len(nums)):
        prefix_sum.append(prefix_sum[-1] + nums[i])
```

Code files are wrapped directly as fenced Markdown blocks with their language inferred from the extension.

## Image Handling

For each image, the pipeline:

1. Reads the image from base64, URL, or local path.
2. Hashes the raw bytes.
3. Skips duplicates using the hash.
4. Resizes very large images to a safe maximum side length.
5. Converts to WebP when possible.
6. Replaces the original source with a local `/assets/images/...` path.

Example Markdown output:

```md
![diagram](/assets/images/dsa/prefixsums/93567dcd8cfc156f.webp)
```

## Classification

The classifier uses a mix of path and content hints.

Known course buckets:

- `DSA`
- `System Design`
- `Machine Learning`
- `OOD`
- `Aptitude`
- `OS`
- `DBMS`

Path-based classification is preferred when the file lives under known folders such as `DSA`, `SystemDesignInterview`, or `MachineLearning`.

For unknown folders, it falls back to keyword scoring from the filename, title, and early body text.

## Regenerating Everything From Scratch

If you want to fully rebuild all generated output:

```bash
rm -rf courses assets placement_prep/data placement_prep/logs
python3 -m placement_prep.backend.cli
```

For raw uploads only:

```bash
rm -rf courses assets placement_prep/data placement_prep/logs
python3 -m placement_prep.backend.cli --raw-only
```

Use this when extractor rules change and you want every lesson regenerated.

## Troubleshooting

Backend command not found:

```bash
python3 -m uvicorn placement_prep.backend.api:app --reload --host 0.0.0.0 --port 8000
```

Use `python3 -m uvicorn` instead of `uvicorn` if the script is not on your shell path.

Port already in use:

```bash
python3 -m uvicorn placement_prep.backend.api:app --reload --host 0.0.0.0 --port 8765
```

Then update:

```text
placement_prep/frontend/.env.local
```

with:

```text
VITE_API_URL=http://localhost:8765
```

Frontend cannot connect to backend:

- Make sure the backend is running.
- Make sure `VITE_API_URL` matches the backend port.
- Restart `npm run dev` after changing `.env.local`.

PDF extraction is weak or placeholder text appears:

- Install PyMuPDF:

```bash
pip install PyMuPDF
```

Image OCR is not available:

- Install system Tesseract.
- Install Python wrapper:

```bash
pip install pytesseract
```

Generated lessons still look stale:

```bash
rm -rf placement_prep/data
python3 -m placement_prep.backend.cli
```

This clears the incremental cache and forces reprocessing.

Check errors:

```bash
cat placement_prep/logs/errors.log
```

## Development Notes

Main files to modify:

- Scanner/file type support: `placement_prep/backend/scanner.py`
- HTML/code cleanup: `placement_prep/backend/extractors.py`
- Image rules: `placement_prep/backend/image_pipeline.py`
- Classification heuristics: `placement_prep/backend/classifier.py`
- API routes: `placement_prep/backend/api.py`
- Frontend UI: `placement_prep/frontend/src/main.jsx`
- Styling: `placement_prep/frontend/src/styles.css`

## Current Limitations

- PostgreSQL/S3 are not wired yet; metadata is stored in JSON and files are stored locally.
- OCR is a hook unless Tesseract is installed.
- PDF extraction depends on PyMuPDF availability.
- AI summaries, quiz generation, and flashcards are not yet connected to an LLM provider.
- Watch mode uses polling for reliability without extra dependencies.

## Recommended Workflow

1. Add new files to `raw_material/`.
2. Run:

```bash
python3 -m placement_prep.backend.cli --raw-only
```

3. Start or refresh the backend:

```bash
python3 -m uvicorn placement_prep.backend.api:app --reload --host 0.0.0.0 --port 8000
```

4. Start the frontend:

```bash
cd placement_prep/frontend
npm run dev -- --port 5173
```

5. Open:

```text
http://localhost:5173/
```
