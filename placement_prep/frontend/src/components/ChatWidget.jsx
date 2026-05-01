import React,{ useState, useRef, useEffect } from "react";

const API = import.meta.env.VITE_API_URL ?? "";

// ── Markdown renderer (lightweight, no deps) ──────────────────────────────────
function renderMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, (m) => {
      const code = m.replace(/```\w*\n?/, "").replace(/```$/, "");
      return `<pre><code>${code.replace(/</g, "&lt;")}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^#{1,3}\s(.+)/gm, "<strong>$1</strong>")
    .replace(/^\s*[-*]\s(.+)/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]+?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12,
    }}>
      {!isUser && (
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, color: "#fff", fontWeight: 700,
          flexShrink: 0, marginRight: 8, marginTop: 2,
        }}>A</div>
      )}
      <div style={{
        maxWidth: "80%",
        padding: "10px 14px",
        borderRadius: isUser ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
        background: isUser
          ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
          : "rgba(255,255,255,0.06)",
        color: "#f1f5f9",
        fontSize: 13.5,
        lineHeight: 1.6,
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
      }}>
        {msg.streaming ? (
          <span>{msg.content}<span style={{ opacity: 0.5, animation: "blink 1s infinite" }}>▋</span></span>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
        )}
        {msg.sources?.length > 0 && (
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Sources</div>
            {msg.sources.map((s, i) => (
              <div key={i} style={{
                fontSize: 11, color: "#818cf8",
                background: "rgba(99,102,241,0.12)",
                borderRadius: 4, padding: "2px 6px",
                display: "inline-block", marginRight: 4, marginBottom: 2,
              }}>
                📄 {s.source.split("/").pop()}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatWidget({ currentCourse }) {
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your study assistant. Ask me anything about your course material — I'll answer based only on what's in the content, no hallucinations. 🎯",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  async function sendMessage(question) {
    if (!question.trim() || loading) return;

    const userMsg = { role: "user", content: question };
    const history = messages
      .filter(m => !m.streaming)
      .map(m => ({ role: m.role, content: m.content }));

    setMessages(prev => [...prev, userMsg, { role: "assistant", content: "", streaming: true }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          course_filter: currentCourse || null,
          history,
        }),
      });

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = "";
      let   sources = [];

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
              setMessages(prev => {
                const msgs = [...prev];
                msgs[msgs.length - 1] = {
                  ...msgs[msgs.length - 1],
                  content: msgs[msgs.length - 1].content + obj.token,
                };
                return msgs;
              });
            }
            if (obj.sources) sources = obj.sources;
            if (obj.error) throw new Error(obj.error);
          } catch {}
        }
      }

      // finalize last message
      setMessages(prev => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = {
          ...msgs[msgs.length - 1],
          streaming: false,
          sources,
        };
        return msgs;
      });
    } catch (err) {
      setMessages(prev => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = {
          role: "assistant",
          content: `Sorry, something went wrong: ${err.message}`,
          streaming: false,
        };
        return msgs;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0.4)} 70%{box-shadow:0 0 0 10px rgba(99,102,241,0)} }
        .chat-input:focus { outline:none; border-color: rgba(99,102,241,0.6) !important; }
        .chat-send:hover { background: linear-gradient(135deg,#4f46e5,#7c3aed) !important; }
        .chat-close:hover { background: rgba(255,255,255,0.1) !important; }
      `}</style>

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          width: 52, height: 52, borderRadius: "50%", border: "none",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff", fontSize: 22, cursor: "pointer",
          boxShadow: "0 4px 20px rgba(99,102,241,0.5)",
          animation: open ? "none" : "pulse 2s infinite",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}
        title="Ask your study assistant"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: 88, right: 24, zIndex: 9998,
          width: 380, height: 520,
          background: "rgba(15, 15, 25, 0.97)",
          backdropFilter: "blur(20px)",
          borderRadius: 16,
          border: "1px solid rgba(99,102,241,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          display: "flex", flexDirection: "column",
          animation: "slideUp 0.25s ease",
          fontFamily: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif",
        }}>
          {/* Header */}
          <div style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700, color: "#fff",
            }}>A</div>
            <div>
              <div style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 14 }}>Study Assistant</div>
              <div style={{ color: "#64748b", fontSize: 11 }}>
                {currentCourse ? `📚 ${currentCourse}` : "All courses"} · powered by Groq
              </div>
            </div>
            <button
              className="chat-close"
              onClick={() => setOpen(false)}
              style={{
                marginLeft: "auto", background: "transparent", border: "none",
                color: "#64748b", cursor: "pointer", fontSize: 16,
                width: 28, height: 28, borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "14px 14px 4px",
            scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent",
          }}>
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 12px 14px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            display: "flex", gap: 8, alignItems: "flex-end",
          }}>
            <textarea
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask anything from your courses…"
              rows={1}
              style={{
                flex: 1, background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "9px 12px",
                color: "#f1f5f9", fontSize: 13.5, resize: "none",
                fontFamily: "inherit", lineHeight: 1.5,
                transition: "border-color 0.2s",
                maxHeight: 100,
              }}
              disabled={loading}
            />
            <button
              className="chat-send"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none", borderRadius: 10,
                width: 38, height: 38, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, color: "#fff",
                opacity: loading || !input.trim() ? 0.4 : 1,
                transition: "background 0.2s, opacity 0.2s",
                flexShrink: 0,
              }}
            >
              {loading ? "⏳" : "↑"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}