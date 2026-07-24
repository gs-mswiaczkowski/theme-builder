import { useRef, type CSSProperties } from "react"

/**
 * Dependency-free code editor with syntax highlighting: a transparent-text
 * textarea layered over a highlighted <pre>, plus a line-number gutter.
 * Highlight colors are inline so they survive dangerouslySetInnerHTML.
 */

function escapeHtml(code: string) {
  return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function highlightJSON(code: string) {
  return escapeHtml(code)
    .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span style="color:#0284c7">$1</span>:')
    .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span style="color:#16a34a">$1</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color:#d97706">$1</span>')
    .replace(/:\s*(true|false|null)/g, ': <span style="color:#7c3aed">$1</span>')
}

function highlightCSS(code: string) {
  return escapeHtml(code)
    .split("\n")
    .map((line) => {
      if (line.trim().startsWith("/*") || line.trim().startsWith("*") || line.trim().startsWith("*/"))
        return `<span style="color:#6b7280;font-style:italic">${line}</span>`
      return line
        .replace(/^(\s*)([^{}\n]+?)(\s*\{)/, (_, ws, sel, b) => `${ws}<span style="color:#0284c7">${sel}</span>${b}`)
        .replace(/^(\s*)([\w-]+)(\s*:\s*)([^;}\n]+)(;?)/, (_, ws, p, c, v, s) => `${ws}<span style="color:#d97706">${p}</span>${c}<span style="color:#16a34a">${v}</span>${s}`)
        .replace(/(@[\w-]+)/g, '<span style="color:#7c3aed">$1</span>')
    })
    .join("\n")
}

const TYPE: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 12,
  lineHeight: "20px",
  margin: 0,
  whiteSpace: "pre",
  tabSize: 2,
  boxSizing: "border-box",
}

export function CodeEditor({
  value, onChange, language = "css",
}: {
  value: string
  onChange: (v: string) => void
  language?: "css" | "json"
}) {
  const taRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const gutterRef = useRef<HTMLPreElement>(null)
  const highlight = language === "json" ? highlightJSON : highlightCSS
  const lineNums = value.split("\n").map((_, i) => i + 1).join("\n")

  const sync = () => {
    const ta = taRef.current
    if (!ta) return
    if (preRef.current) { preRef.current.scrollTop = ta.scrollTop; preRef.current.scrollLeft = ta.scrollLeft }
    if (gutterRef.current) gutterRef.current.scrollTop = ta.scrollTop
  }

  return (
    <div className="border-input bg-muted/30 relative flex min-h-0 flex-1 overflow-hidden rounded-md border">
      <pre
        ref={gutterRef}
        aria-hidden
        className="text-muted-foreground/70 shrink-0 overflow-hidden border-r py-3 pr-2 pl-3 text-right select-none"
        style={{ ...TYPE, width: 44 }}
      >
        {lineNums}
      </pre>
      <div className="relative flex-1">
        <pre
          ref={preRef}
          aria-hidden
          className="text-foreground pointer-events-none absolute inset-0 overflow-auto p-3"
          style={TYPE}
          dangerouslySetInnerHTML={{ __html: highlight(value) + "\n" }}
        />
        <textarea
          ref={taRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={sync}
          spellCheck={false}
          className="absolute inset-0 size-full resize-none overflow-auto border-none p-3 outline-none"
          style={{ ...TYPE, background: "transparent", color: "transparent", caretColor: "var(--foreground)" }}
        />
      </div>
    </div>
  )
}
