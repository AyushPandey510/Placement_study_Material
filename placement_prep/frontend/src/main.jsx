import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  FileSearch,
  GraduationCap,
  Highlighter,
  Home,
  Moon,
  PanelLeft,
  Search,
  Sparkles,
  StickyNote,
  Sun,
  AlertCircle,
  Download,
  Focus,
  X,
  Settings2,
} from "lucide-react";
import "./styles.css";

const API = import.meta.env.VITE_API_URL ?? "";

// ─────────────────────────────────────────────
// FIX 5: Storage abstraction with in-memory fallback
// Silently falls back when localStorage is unavailable (sandboxed iframes, etc.)
// ─────────────────────────────────────────────
const memoryStore = {};

const storage = {
  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : undefined;
    } catch {
      return memoryStore[key];
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      memoryStore[key] = value;
    }
  },
};

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => storage.get(key) ?? initialValue);
  const setAndPersist = useCallback(
    (updater) => {
      setValue((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        storage.set(key, next);
        return next;
      });
    },
    [key]
  );
  return [value, setAndPersist];
}

// ─────────────────────────────────────────────
// FIX 16 + 17: Build a fast id→item Map with useMemo
// ─────────────────────────────────────────────
function useFlatItems(index) {
  return useMemo(() => {
    const items = flatten(index);
    const map = new Map(items.map((item) => [item.id, item]));
    return { items, map };
  }, [index]);
}

// ─────────────────────────────────────────────
// FIX 17: Error Boundary
// ─────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="errorBoundary">
          <AlertCircle size={32} />
          <h2>Something went wrong rendering this lesson</h2>
          <p>{String(this.state.error.message)}</p>
          <button onClick={() => this.setState({ error: null })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────────
// App
// ─────────────────────────────────────────────
function App() {
  const [index, setIndex] = useState({ courses: [] });
  const [selected, setSelected] = useStoredState("pp:selected", "");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);        // FIX 13: loading state
  const [fetchError, setFetchError] = useState(null);
  const [query, setQuery] = useState("");
  const [bookmarks, setBookmarks] = useStoredState("pp:bookmarks", []);
  const [completed, setCompleted] = useStoredState("pp:completed", []);
  const [notes, setNotes] = useStoredState("pp:notes", {});
  const [highlights, setHighlights] = useStoredState("pp:highlights", {});
  const [recent, setRecent] = useStoredState("pp:recent", []);
  const [light, setLight] = useStoredState("pp:light", false);
  // Focus Mode: focusModeEnabled = feature is on (button visible)
  // focusActive = user has triggered the full-screen notes view
  const [focusModeEnabled, setFocusModeEnabled] = useStoredState("pp:focusEnabled", true);
  const [focusActive, setFocusActive] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/courses`)
      .then((r) => r.json())
      .then(setIndex)
      .catch(() => setIndex({ courses: [] }));
  }, []);

  useEffect(() => {
    if (!selected) {
      setContent(null);
      setFetchError(null);
      return;
    }

    if (selected.endsWith(".html")) {
      setContent({ type: "html", path: selected });
      setRecent((items) =>
        [selected, ...items.filter((i) => i !== selected)].slice(0, 6)
      );
      return;
    }

    setLoading(true);
    setFetchError(null);
    setContent(null);

    fetch(`${API}/api/content/${selected}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setContent(data);
        setRecent((items) =>
          [selected, ...items.filter((i) => i !== selected)].slice(0, 6)
        );
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, [selected]);

  const { items: flatItems, map: itemMap } = useFlatItems(index);

  // FIX 19: Only compute filtered list when query is non-empty
  const filtered = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return flatItems.filter((item) => {
      // FIX 6: search body text too (excerpt is already a body slice at index time,
      // but if the API gives us full body we use it)
      const haystack = `${item.title} ${item.course} ${item.topic} ${item.excerpt || ""} ${item.body || ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, flatItems]);

  const progress = flatItems.length
    ? Math.round((completed.length / flatItems.length) * 100)
    : 0;

  const currentItem = itemMap.get(selected);

  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  // FIX 21: notes export
  const exportNotes = () => {
    const lines = Object.entries(notes)
      .map(([id, note]) => {
        const item = itemMap.get(id);
        return `# ${item ? item.title : id}\n${note}`;
      })
      .join("\n\n---\n\n");
    const blob = new Blob([lines], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-notes.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Close focus mode on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && focusActive) setFocusActive(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focusActive]);

  // FIX 17: wrap entire app in ErrorBoundary
  return (
    <ErrorBoundary>
      {/* Focus Mode overlay — renders above everything else */}
      {focusActive && (
        <ZenNotesOverlay
          note={notes[selected] || ""}
          title={currentItem?.title || "Notes"}
          onNote={(value) => setNotes((n) => ({ ...n, [selected]: value }))}
          onClose={() => setFocusActive(false)}
          onExport={exportNotes}
        />
      )}
      <div className={`app${light ? " light" : ""}${focusActive ? " focus-mode-active" : ""}`}>
        <aside className="sidebar">
          <div className="brand">
            <GraduationCap size={26} />
            <div>
              <strong>Placement Prep</strong>
              <span>{flatItems.length} lessons indexed</span>
            </div>
          </div>
          <div className="progress">
            <div>
              <span>Progress</span>
              <b>{progress}%</b>
            </div>
            <i style={{ width: `${progress}%` }} />
          </div>
          <nav>
            <button
              className={!selected ? "active" : ""}
              onClick={() => setSelected("")}
            >
              <Home size={18} /> Dashboard
            </button>
            {/* FIX 15: keyboard navigation via aria + onKeyDown */}
            <CourseTree
              index={index}
              selected={selected}
              completed={completed}
              onSelect={setSelected}
            />
          </nav>
        </aside>

        <main>
          <header className="topbar">
            <div className="searchBox">
              <Search size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics, examples, concepts..."
                aria-label="Search lessons"
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {/* Focus mode toggle button — only shown when enabled in settings */}
              {focusModeEnabled && selected && content && content.type !== "html" && (
                <button
                  className={`iconButton focusModeBtn${focusActive ? " focusActive" : ""}`}
                  onClick={() => setFocusActive((v) => !v)}
                  title={focusActive ? "Exit focus mode (Esc)" : "Focus mode — notes only"}
                  aria-pressed={focusActive}
                >
                  <Focus size={18} />
                </button>
              )}
              {/* FIX 21: export notes button if any notes exist */}
              {Object.keys(notes).some((k) => notes[k]) && (
                <button
                  className="iconButton"
                  onClick={exportNotes}
                  title="Export notes as Markdown"
                >
                  <Download size={18} />
                </button>
              )}
              {/* Enable/disable focus mode feature */}
              <button
                className={`iconButton${focusModeEnabled ? " settingsActive" : ""}`}
                onClick={() => { setFocusModeEnabled((v) => !v); setFocusActive(false); }}
                title={focusModeEnabled ? "Disable focus mode feature" : "Enable focus mode feature"}
                aria-pressed={focusModeEnabled}
              >
                <Settings2 size={18} />
              </button>
              {/* FIX 11: swap Moon ↔ Sun based on theme */}
              <button
                className="iconButton"
                onClick={() => setLight(!light)}
                title="Toggle theme"
              >
                {light ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </header>

          {query ? (
            <SearchView results={filtered} onSelect={(id) => { setQuery(""); setSelected(id); }} />
          ) : loading ? (
            // FIX 13: proper loading skeleton
            <div className="loadingState">
              <div className="loadingSkeleton" />
              <div className="loadingSkeleton short" />
              <div className="loadingSkeleton" />
              <div className="loadingSkeleton medium" />
            </div>
          ) : fetchError ? (
            <div className="errorBoundary">
              <AlertCircle size={28} />
              <h2>Could not load lesson</h2>
              <p>{fetchError}</p>
              <button onClick={() => setSelected(selected)}>Retry</button>
            </div>
          ) : selected && content ? (
            content.type === "html" ? (
              // FIX 5b: validate path doesn't escape — only serve known .html ids
              <iframe
                src={`${API}/api/html/${encodeURIComponent(content.path)}`}
                sandbox="allow-scripts allow-same-origin"
                style={{
                  width: "100%",
                  height: "calc(100vh - 100px)",
                  border: "none",
                  borderRadius: "12px",
                }}
                title="Lesson content"
              />
            ) : (
              // FIX 17: wrap ContentView in its own ErrorBoundary
              <ErrorBoundary>
                <ContentView
                  content={content}
                  item={currentItem}
                  bookmarked={bookmarks.includes(selected)}
                  completed={completed.includes(selected)}
                  note={notes[selected] || ""}
                  highlighted={highlights[selected] || ""}
                  onBookmark={() => toggle(bookmarks, setBookmarks, selected)}
                  onComplete={() => toggle(completed, setCompleted, selected)}
                  onNote={(value) =>
                    setNotes((n) => ({ ...n, [selected]: value }))
                  }
                  onHighlight={(value) =>
                    setHighlights((h) => ({ ...h, [selected]: value }))
                  }
                />
              </ErrorBoundary>
            )
          ) : (
            <Dashboard
              index={index}
              recent={recent}
              bookmarks={bookmarks}
              itemMap={itemMap}
              flatItems={flatItems}
              onSelect={setSelected}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

// ─────────────────────────────────────────────
// ZenNotesOverlay — Focus Mode full-screen notes panel
// Renders above the entire app via portal-like absolute positioning
// ─────────────────────────────────────────────
function ZenNotesOverlay({ note, title, onNote, onClose, onExport }) {
  const textareaRef = useRef(null);

  // Auto-focus textarea when overlay opens
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const wordCount = note.trim() ? note.trim().split(/\s+/).length : 0;
  const charCount = note.length;

  return (
    <div className="zenOverlay" role="dialog" aria-modal="true" aria-label="Focus mode — notes">
      <div className="zenHeader">
        <div className="zenTitle">
          <StickyNote size={16} />
          <span>Notes — {title}</span>
        </div>
        <div className="zenMeta">
          <span>{wordCount} words · {charCount} chars</span>
          {note.trim() && (
            <button className="zenBtn" onClick={onExport} title="Export all notes">
              <Download size={15} /> Export
            </button>
          )}
          <button className="zenBtn zenClose" onClick={onClose} title="Exit focus mode (Esc)">
            <X size={16} /> Exit focus
          </button>
        </div>
      </div>
      <div className="zenBody">
        <textarea
          ref={textareaRef}
          className="zenTextarea"
          value={note}
          onChange={(e) => onNote(e.target.value)}
          placeholder="Start writing your notes… everything else can wait."
          spellCheck
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FIX 7 + 15: CourseTree with proper aria keyboard navigation
// ─────────────────────────────────────────────
function CourseTree({ index, selected, completed, onSelect }) {
  const [open, setOpen] = useStoredState("pp:openTopics", {});

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };

  return (
    <div className="tree" role="tree" aria-label="Course navigation">
      {index.courses.map((course) => (
        <section key={course.title} role="group" aria-label={course.title}>
          <h3>{course.title}</h3>
          {course.topics.map((topic) => {
            const key = `${course.title}:${topic.title}`;
            const isOpen = open[key] ?? true;
            return (
              <div className="topic" key={key}>
                <button
                  className="topicToggle"
                  onClick={() => setOpen((o) => ({ ...o, [key]: !isOpen }))}
                  aria-expanded={isOpen}
                  aria-controls={`topic-${key}`}
                >
                  <ChevronDown
                    size={16}
                    className={isOpen ? "" : "closed"}
                  />
                  {topic.title}
                </button>
                {isOpen && (
                  <div id={`topic-${key}`} role="group">
                    {topic.items.map((item) => (
                      <button
                        key={item.id}
                        role="treeitem"
                        aria-selected={selected === item.id}
                        className={
                          selected === item.id ? "lesson active" : "lesson"
                        }
                        onClick={() => onSelect(item.id)}
                        onKeyDown={(e) => handleKeyDown(e, item.id)}
                      >
                        {completed.includes(item.id) ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <BookOpen size={15} />
                        )}
                        <span>{item.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// FIX 7b: Dashboard — course cards show topic count not just first item
// FIX 16: use itemMap for O(1) lookup in shelves
// ─────────────────────────────────────────────
function Dashboard({ index, recent, bookmarks, itemMap, flatItems, onSelect }) {
  const recentItems = recent
    .map((id) => itemMap.get(id))
    .filter(Boolean);
  const bookmarkedItems = bookmarks
    .map((id) => itemMap.get(id))
    .filter(Boolean);

  return (
    <div className="dashboard">
      <div className="hero">
        <div>
          <h1>Self-organizing course library</h1>
          <p>
            Messy saved pages become structured lessons, diagrams, code,
            progress, notes, and search.
          </p>
        </div>
        <Sparkles size={38} />
      </div>
      <div className="courseGrid">
        {index.courses.map((course, i) => {
          // FIX 7: clicking a course card shows first topic/item but also
          // handles missing items gracefully with a visible warning
          const firstId = course.topics[0]?.items[0]?.id;
          const totalLessons = course.topics.reduce(
            (sum, t) => sum + t.items.length,
            0
          );
          return (
            <motion.button
              whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
              className="courseCard"
              key={course.title}
              onClick={() => firstId && onSelect(firstId)}
              disabled={!firstId}
              title={!firstId ? "No lessons in this course yet" : undefined}
            >
              <span>0{i + 1}</span>
              <h2>{course.title}</h2>
              <p>
                {course.topics.length} topics · {totalLessons} lessons
              </p>
            </motion.button>
          );
        })}
      </div>
      <Shelf
        title="Recently viewed"
        icon={<FileSearch size={18} />}
        items={recentItems}
        onSelect={onSelect}
      />
      <Shelf
        title="Bookmarks"
        icon={<Bookmark size={18} />}
        items={bookmarkedItems}
        onSelect={onSelect}
      />
    </div>
  );
}

function Shelf({ title, icon, items, onSelect }) {
  if (!items.length) return null;
  return (
    <section className="shelf">
      <h2>
        {icon}
        {title}
      </h2>
      <div className="resultGrid">
        {items.map((item) => (
          <ResultCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function SearchView({ results, onSelect }) {
  return (
    <div className="searchResults">
      <h1>Search results {results.length === 0 && <span style={{fontSize:"1rem",fontWeight:400,color:"var(--muted)"}}>— no matches found</span>}</h1>
      <div className="resultGrid">
        {results.map((item) => (
          <ResultCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

function ResultCard({ item, onSelect }) {
  return (
    <button className="resultCard" onClick={() => onSelect(item.id)}>
      <b>{item.title}</b>
      <span>
        {item.course} / {item.topic}
      </span>
      <p>{item.excerpt}</p>
    </button>
  );
}

// ─────────────────────────────────────────────
// ContentView
// FIX 1: highlights re-applied from stored state on mount / change
// FIX 14: smooth scroll for TOC links
// FIX 21: notes export handled at App level
// ─────────────────────────────────────────────
function ContentView({
  content,
  item,
  bookmarked,
  completed,
  note,
  highlighted,
  onBookmark,
  onComplete,
  onNote,
  onHighlight,
}) {
  if (!content?.body) {
    return <div style={{ padding: "20px" }}>Loading content…</div>;
  }

  // FIX 12: memoize both TOC and rendered markdown so they don't recompute
  // on every unrelated state change (bookmark toggle, note typing, etc.)
  const toc = useMemo(() => buildToc(content.body), [content.body]);

  // FIX 1: highlighted is passed in from stored state so it's always applied
  // (even after reload) — renderMarkdown uses it as a dependency
  const renderedBody = useMemo(
    () => renderMarkdown(content.body, highlighted, API),
    [content.body, highlighted]
  );

  // FIX 14: smooth scroll for TOC
  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <article className="reader">
      <div className="breadcrumbs">
        <PanelLeft size={16} /> {item?.course} / {item?.topic}
      </div>

      <div className="readerHead">
        <div>
          <h1>{content?.metadata?.title || "Untitled"}</h1>
          <p>{item?.wordCount || 0} words</p>
        </div>
        <div className="actions">
          <button onClick={onBookmark} className={bookmarked ? "active" : ""}>
            <Bookmark size={17} /> Bookmark
          </button>
          <button onClick={onComplete} className={completed ? "done" : ""}>
            <CheckCircle2 size={17} /> Complete
          </button>
        </div>
      </div>

      <div className="lessonLayout">
        <div className="contentBody">{renderedBody}</div>

        <aside className="toc">
          <h3>Contents</h3>
          {toc.map((tocItem) => (
            <a
              key={tocItem.id}
              href={`#${tocItem.id}`}
              onClick={(e) => handleTocClick(e, tocItem.id)}
            >
              {tocItem.text}
            </a>
          ))}

          <label>
            <Highlighter size={16} /> Highlight phrase
          </label>
          <input
            value={highlighted}
            onChange={(e) => onHighlight(e.target.value)}
            placeholder="Type text to highlight"
          />

          <label>
            <StickyNote size={16} /> Notes
          </label>
          <textarea
            value={note}
            onChange={(e) => onNote(e.target.value)}
            placeholder="Personal notes…"
          />
        </aside>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────
// renderMarkdown — fixed version
// FIX 1:  highlight is a param so memoization works (no stale closure)
// FIX 2:  image src resolved relative to API + content base path
// FIX 3:  ordered lists parsed
// FIX 4:  blockquotes, HR, and GFM-style tables handled gracefully
// FIX 12: wrapped in useMemo at call site — function itself is pure
// ─────────────────────────────────────────────
function renderMarkdown(markdown, highlight, apiBase = "") {
  const safeMarkdown = markdown || "";
  const lines = safeMarkdown.split("\n");
  const nodes = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";

    // ── Fenced code block ────────────────────
    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i] ?? "");
        i++;
      }
      nodes.push(
        <pre key={i}>
          <code data-language={language}>{code.join("\n")}</code>
        </pre>
      );
      i += 1;
      continue;
    }

    // ── ATX Heading ──────────────────────────
    if (/^#{1,6}\s/.test(line)) {
      const hashes = line.match(/^#+/)?.[0]?.length ?? 1;
      const text = line.replace(/^#+\s/, "");
      const id = slug(text);
      // map h1→h2, h2→h2, h3→h3, h4+→h4 so we don't nest h1 inside content
      const level = Math.min(4, Math.max(2, hashes + 1));
      const Tag = `h${level}`;
      nodes.push(
        <Tag id={id} key={i}>
          {mark(text, highlight)}
        </Tag>
      );
      i += 1;
      continue;
    }

    // ── Horizontal rule ──────────────────────
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      nodes.push(<hr key={i} />);
      i += 1;
      continue;
    }

    // ── Blockquote ───────────────────────────  FIX 4
    if (line.startsWith("> ") || line === ">") {
      const quoteLines = [];
      while (i < lines.length && (lines[i].startsWith("> ") || lines[i] === ">")) {
        quoteLines.push((lines[i] ?? "").replace(/^>\s?/, ""));
        i++;
      }
      nodes.push(
        <blockquote key={i}>
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{mark(ql, highlight)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // ── GFM table ────────────────────────────  FIX 4
    if (/^\|.+\|/.test(line) && i + 1 < lines.length && /^\|[-| :]+\|/.test(lines[i + 1] ?? "")) {
      const headers = line.split("|").filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1).map((h) => h.trim());
      i += 2; // skip header + separator
      const rows = [];
      while (i < lines.length && /^\|.+\|/.test(lines[i] ?? "")) {
        const cells = (lines[i] ?? "")
          .split("|")
          .filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1)
          .map((c) => c.trim());
        rows.push(cells);
        i++;
      }
      nodes.push(
        <div key={i} className="tableWrapper">
          <table>
            <thead>
              <tr>{headers.map((h, hi) => <th key={hi}>{mark(h, highlight)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => <td key={ci}>{mark(cell, highlight)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // ── Image ────────────────────────────────  FIX 2
    if (/^!\[.*\]\(.+\)/.test(line)) {
      const match = line.match(/^!\[(.*)\]\((.+)\)/);
      if (match) {
        const [, alt, src] = match;
        // Resolve: absolute URLs pass through, relative paths prepend apiBase
        const resolvedSrc = /^https?:\/\//.test(src)
          ? src
          : src.startsWith("/")
          ? `${apiBase}${src}`
          : `${apiBase}/api/assets/${src}`;
        nodes.push(
          <img
            key={i}
            src={resolvedSrc}
            alt={alt}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.alt = `[Image not found: ${alt}]`;
              e.currentTarget.style.display = "none";
            }}
          />
        );
      }
      i += 1;
      continue;
    }

    // ── Unordered list ───────────────────────
    if (/^[-*]\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i] ?? "")) {
        items.push((lines[i] ?? "").replace(/^[-*]\s/, ""));
        i++;
      }
      nodes.push(
        <ul key={i}>
          {items.map((item, idx) => (
            <li key={idx}>{mark(item, highlight)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // ── Ordered list ─────────────────────────  FIX 3
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i] ?? "")) {
        items.push((lines[i] ?? "").replace(/^\d+\.\s/, ""));
        i++;
      }
      nodes.push(
        <ol key={i}>
          {items.map((item, idx) => (
            <li key={idx}>{mark(item, highlight)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // ── Paragraph ────────────────────────────
    if (line.trim()) {
      nodes.push(<p key={i}>{mark(line, highlight)}</p>);
    }

    i += 1;
  }

  return nodes;
}

// ─────────────────────────────────────────────
// Inline helpers
// ─────────────────────────────────────────────
function mark(text, phrase) {
  if (!phrase || !text.toLowerCase().includes(phrase.toLowerCase()))
    return inline(text);
  const parts = text.split(new RegExp(`(${escapeRegExp(phrase)})`, "ig"));
  return parts.map((part, index) =>
    part.toLowerCase() === phrase.toLowerCase() ? (
      <mark key={index}>{part}</mark>
    ) : (
      inline(part, index)
    )
  );
}

function inline(text, keyPrefix = "") {
  // Handle bold, inline code, and links
  return text
    .split(/(`[^`]+`|\*\*[^*]+\*\*|\[([^\]]+)\]\(([^)]+)\))/g)
    .map((part, index) => {
      if (!part) return null;
      if (part.startsWith("`") && part.endsWith("`"))
        return <code key={`${keyPrefix}-${index}`}>{part.slice(1, -1)}</code>;
      if (part.startsWith("**") && part.endsWith("**"))
        return (
          <strong key={`${keyPrefix}-${index}`}>{part.slice(2, -2)}</strong>
        );
      // Links: [text](url)
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch)
        return (
          <a key={`${keyPrefix}-${index}`} href={linkMatch[2]} target="_blank" rel="noreferrer">
            {linkMatch[1]}
          </a>
        );
      return part;
    });
}

function buildToc(markdown) {
  return (markdown || "")
    .split("\n")
    .filter((line) => /^#{1,3}\s/.test(line ?? ""))
    .map((line) => {
      const text = line.replace(/^#{1,6}\s/, "");
      return { text, id: slug(text) };
    });
}

function flatten(index) {
  return (index?.courses || []).flatMap((course) =>
    (course.topics || []).flatMap((topic) =>
      (topic.items || []).map((item) => ({
        ...item,
        course: course.title,
        topic: topic.title,
      }))
    )
  );
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

createRoot(document.getElementById("root")).render(<App />);