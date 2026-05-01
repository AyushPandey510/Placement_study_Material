import React,{ useState, useEffect, useRef, useCallback } from "react";

const API = import.meta.env.VITE_API_URL ?? "";

function renderMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, (m) => {
      const code = m.replace(/```\w*\n?/, "").replace(/```$/, "");
      return `<pre style="background:rgba(0,0,0,0.3);padding:10px;border-radius:6px;overflow-x:auto;font-size:12px"><code>${code.replace(/</g, "&lt;")}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, '<code style="background:rgba(0,0,0,0.3);padding:2px 5px;border-radius:4px;font-size:12px">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^#{1,3}\s(.+)/gm, '<strong style="font-size:15px">$1</strong>')
    .replace(/^\s*[-*]\s(.+)/gm, "<li style='margin-left:16px;margin-bottom:4px'>$1</li>")
    .replace(/(<li[\s\S]+?<\/li>)/g, "<ul style='padding:0;margin:6px 0'>$1</ul>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

export default function SelectionPopup({ currentCourse }) {
  const [popup, setPopup]       = useState(null);  // { x, y, text, context }
  const [drawer, setDrawer]     = useState(null);  // { selectedText, explanation, streaming }
  const [loading, setLoading]   = useState(false);
  const drawerRef = useRef(null);

  // ── Detect text selection ────────────────────────────────────────────────
  const handleMouseUp = useCallback((e) => {
    // Don't trigger inside our own UI
    if (drawerRef.current?.contains(e.target)) return;

    setTimeout(() => {
      const selection = window.getSelection();
      const text      = selection?.toString().trim();

      if (!text || text.length < 3 || text.length > 500) {
        setPopup(null);
        return;
      }

      // get surrounding paragraph as context
      const anchorNode = selection.anchorNode;
      const context    = anchorNode?.parentElement?.closest("p,li,td,pre,blockquote")?.textContent
                      || anchorNode?.parentElement?.textContent
                      || "";

      const range = selection.getRangeAt(0);
      const rect  = range.getBoundingClientRect();

      setPopup({
        x:       rect.left + rect.width / 2,
        y:       rect.top + window.scrollY - 12,
        text,
        context: context.slice(0, 1000),
      });
    }, 10);
  }, []);

  // ── Close popup on click outside ─────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("[data-selection-popup]")) {
        setPopup(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Register selection listener ───────────────────────────────────────────
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseUp]);

  // ── Trigger explanation ───────────────────────────────────────────────────
  async function askExplain() {
    if (!popup || loading) return;
    const { text, context } = popup;
    setPopup(null);
    setDrawer({ selectedText: text, explanation: "", streaming: true });
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selected_text:       text,
          surrounding_context: context,
          course:              currentCourse || "",
        }),
      });

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const obj = JSON.parse(data);
            if (obj.token) {
              setDrawer(prev => ({
                ...prev,
                explanation: (prev?.explanation ?? "") + obj.token,
              }));
            }
            if (obj.error) throw new Error(obj.error);
          } catch {}
        }
      }

      setDrawer(prev => ({ ...prev, streaming: false }));
    } catch (err) {
      setDrawer(prev => ({
        ...prev,
        explanation: `Error: ${err.message}`,
        streaming: false,
      }));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .ask-btn:hover { background: linear-gradient(135deg,#4f46e5,#7c3aed) !important; transform: scale(1.03); }
      `}</style>

      {/* ── Selection popup bubble ─────────────────────────────────────────── */}
      {popup && (
        <div
          data-selection-popup
          style={{
            position:  "absolute",
            top:       popup.y - 44,
            left:      popup.x,
            transform: "translateX(-50%)",
            zIndex:    99999,
            animation: "fadeIn 0.15s ease",
          }}
        >
          <button
            className="ask-btn"
            onClick={askExplain}
            style={{
              background:   "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border:       "none",
              borderRadius: 20,
              padding:      "6px 14px",
              color:        "#fff",
              fontSize:     12.5,
              fontWeight:   600,
              cursor:       "pointer",
              display:      "flex",
              alignItems:   "center",
              gap:          6,
              whiteSpace:   "nowrap",
              boxShadow:    "0 4px 16px rgba(99,102,241,0.5)",
              transition:   "transform 0.15s, background 0.15s",
              fontFamily:   "'IBM Plex Sans', system-ui, sans-serif",
            }}
          >
            <span>✨</span>
            <span>Explain this</span>
          </button>
          {/* Arrow */}
          <div style={{
            width: 0, height: 0, margin: "0 auto",
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "6px solid #8b5cf6",
          }} />
        </div>
      )}

      {/* ── Explanation drawer (slides in from right) ─────────────────────── */}
      {drawer && (
        <div
          ref={drawerRef}
          style={{
            position:      "fixed",
            top:           0,
            right:         0,
            width:         420,
            height:        "100vh",
            zIndex:        99998,
            background:    "rgba(10, 10, 18, 0.98)",
            backdropFilter:"blur(20px)",
            borderLeft:    "1px solid rgba(99,102,241,0.2)",
            boxShadow:     "-20px 0 60px rgba(0,0,0,0.5)",
            display:       "flex",
            flexDirection: "column",
            animation:     "slideInRight 0.25s ease",
            fontFamily:    "'IBM Plex Sans', system-ui, sans-serif",
          }}
        >
          {/* Header */}
          <div style={{
            padding:      "16px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display:      "flex",
            alignItems:   "flex-start",
            gap:          10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: "#fff",
            }}>A</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14 }}>Explaining</div>
              <div style={{
                color: "#818cf8", fontSize: 12, marginTop: 2,
                fontStyle: "italic", overflow: "hidden",
                textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                "{drawer.selectedText.slice(0, 60)}{drawer.selectedText.length > 60 ? "…" : ""}"
              </div>
            </div>
            <button
              onClick={() => setDrawer(null)}
              style={{
                background: "transparent", border: "none", color: "#64748b",
                cursor: "pointer", fontSize: 18, lineHeight: 1,
                padding: "2px 4px", borderRadius: 4,
              }}
            >✕</button>
          </div>

          {/* Content */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "18px",
            scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent",
          }}>
            {drawer.explanation ? (
              <div style={{ color: "#e2e8f0", fontSize: 13.5, lineHeight: 1.7 }}>
                <span dangerouslySetInnerHTML={{ __html: renderMarkdown(drawer.explanation) }} />
                {drawer.streaming && (
                  <span style={{ animation: "blink 1s infinite", color: "#8b5cf6" }}>▋</span>
                )}
              </div>
            ) : (
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                height: "100%", color: "#475569",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
                <div style={{ fontSize: 13 }}>Generating explanation…</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding:   "12px 18px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display:   "flex", gap: 8,
          }}>
            <button
              onClick={() => {
                // Pre-fill the chat widget with a follow-up question
                window.dispatchEvent(new CustomEvent("open-chat-with", {
                  detail: { question: `Can you tell me more about: ${drawer.selectedText}` }
                }));
                setDrawer(null);
              }}
              style={{
                flex: 1, background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: 8, padding: "8px 0",
                color: "#818cf8", fontSize: 12.5, cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              💬 Ask follow-up
            </button>
            <button
              onClick={() => setDrawer(null)}
              style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8, padding: "8px 0",
                color: "#64748b", fontSize: 12.5, cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}