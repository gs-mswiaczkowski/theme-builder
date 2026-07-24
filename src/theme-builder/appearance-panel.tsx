import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { ArrowLeft, Check, ChevronRight, Code2, Component, Contrast, Image as ImageIcon, Moon, Palette, RotateCcw, Search, Shapes, Sun, Type, UploadCloud } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  BTN_TOKEN_DEFAULTS,
  BUTTON_TYPES,
  CARD_TOKEN_DEFAULTS,
  cardTreatmentOf,
  FEED_TOKEN_DEFAULTS,
  FONT_CATEGORY_LABELS,
  GOOGLE_FONTS,
  HOME_SECTIONS,
  PRESETS,
  PRESET_TOKENS,
  STYLE_GROUPS,
  TOKEN_GROUPS,
  googleFontCssUrl,
  googleFontId,
  googleFontStack,
  prettifyFontName,
  resolveTokenColor,
  type BtnTokens,
  type CardTokens,
  type CustomFont,
  type FeedTokens,
  type FeedView,
  type Font,
  type FontCategory,
  type PresetTokens,
  type StyleShapes,
  type TextSize,
  type TokenMap,
} from "./data"
import { ColorCard } from "./color-input"
import { CodeEditor } from "./code-editor"
import { LogoSvg } from "./preview"

/* Shared row layout used by every card-like control. */
const ROW =
  "flex min-h-[74px] flex-row items-center gap-4 rounded-lg border p-4 shadow-none transition-colors hover:bg-accent/50"

/* ─── Building blocks ─── */

function SidebarHeader({ title, subtitle, onBack, scrolled, screenKey, children }: { title: string; subtitle?: string; onBack?: () => void; scrolled?: boolean; screenKey: string; children?: ReactNode }) {
  return (
    <div className={cn("bg-background relative z-10 shrink-0 px-6 pt-6 pb-5 transition-shadow", scrolled && "shadow-[0_6px_14px_-8px_rgb(0_0_0/0.2)]")}>
      {onBack
        ? <Button variant="outline" size="icon" className="mb-5 size-8 rounded-full" onClick={onBack}><ArrowLeft /></Button>
        : <div className="mb-5 flex size-8 items-center justify-center rounded-lg border"><Palette className="text-muted-foreground size-4" /></div>
      }
      <div key={screenKey} className="animate-in fade-in slide-in-from-right-3 duration-200">
        <h2 className="text-2xl leading-none font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-2 text-sm leading-snug">{subtitle}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  )
}

function SectionLabel({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="mb-3">
      <p className="text-sm font-medium">{title}</p>
      {desc && <p className="text-muted-foreground text-xs">{desc}</p>}
    </div>
  )
}

function InfoBanner({ children }: { children: ReactNode }) {
  return <div className="bg-muted text-muted-foreground mb-4 rounded-md p-3 text-xs leading-relaxed">{children}</div>
}

function Seg({ value, onValueChange, options, className }: { value: string; onValueChange: (v: string) => void; options: [string, string][]; className?: string }) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className={cn("h-8", className)}>
        {options.map(([v, l]) => (
          <TabsTrigger key={v} value={v} className="text-xs">{l}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

function StateTabs({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Seg
      value={value}
      onValueChange={onChange}
      className="w-full [&>*]:flex-1"
      options={[["default", "Default"], ["hover", "Hover"], ["pressed", "Pressed"]]}
    />
  )
}

/** Plain clickable card (no radio). */
function OptionCard({
  left, label, desc, actionLabel, onAction, onClick,
}: {
  left?: ReactNode; label: ReactNode; desc?: ReactNode; actionLabel?: string; onAction?: () => void; onClick?: () => void
}) {
  return (
    <Card onClick={onClick} className={cn(ROW, "cursor-pointer")}>
      {left}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{label}</div>
        {desc && <div className="text-muted-foreground mt-0.5 text-xs">{desc}</div>}
      </div>
      {actionLabel && (
        <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onAction?.() }}>{actionLabel}</Button>
      )}
    </Card>
  )
}

/** Radio row — full card is the label, highlights when checked. */
function RadioCardItem({
  value, left, label, desc, actionLabel, onAction,
}: {
  value: string; left?: ReactNode; label: ReactNode; desc?: ReactNode; actionLabel?: string; onAction?: () => void
}) {
  const id = useId()
  return (
    <Label
      htmlFor={id}
      className={cn(ROW, "cursor-pointer font-normal", "has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-primary/40 has-[[data-state=checked]]:ring-1")}
    >
      {left}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium">{label}</span>
        {desc && <span className="text-muted-foreground block truncate text-xs">{desc}</span>}
      </span>
      {actionLabel && (
        <Button variant="outline" size="sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAction?.() }}>{actionLabel}</Button>
      )}
      <RadioGroupItem id={id} value={value} />
    </Label>
  )
}

function IconRadioCard({ value, icon, label }: { value: string; icon: ReactNode; label: string }) {
  const id = useId()
  return (
    <Label
      htmlFor={id}
      className={cn(
        "flex min-h-[74px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-3 font-normal transition-colors",
        "has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-primary/40 has-[[data-state=checked]]:ring-1",
      )}
    >
      <RadioGroupItem id={id} value={value} className="sr-only" />
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Label>
  )
}

function NavRow({ label, desc, onClick, icon }: { label: string; desc?: string; onClick: () => void; icon?: ReactNode }) {
  return (
    <Card onClick={onClick} className={cn(ROW, "cursor-pointer")}>
      {icon && <div className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">{icon}</div>}
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        {desc && <div className="text-muted-foreground mt-0.5 text-xs">{desc}</div>}
      </div>
      <ChevronRight className="text-muted-foreground/60 size-4" />
    </Card>
  )
}

const HOME_ICONS: Record<string, ReactNode> = {
  branding: <ImageIcon className="size-[18px]" />,
  colors: <Palette className="size-[18px]" />,
  typography: <Type className="size-[18px]" />,
  styles: <Shapes className="size-[18px]" />,
  components: <Component className="size-[18px]" />,
  advanced: <Code2 className="size-[18px]" />,
}

/** Mini theme preview — a cropped top-left corner of a themed UI at 40px. */
function ThemeThumb({ tok }: { tok: TokenMap }) {
  const page = tok["color.surface.page"] || "#f5f5f5"
  const surface = tok["color.surface.default"] || "#ffffff"
  const brand = tok["color.action.primary.default"] || "#888888"
  const text = tok["color.content.default"] || "#111111"
  const subtle = tok["color.content.subtle"] || "#9ca3af"
  const line = tok["color.line.default"] || "#e5e7eb"
  const bar = (w: string, c: string, o?: number) => (
    <div style={{ height: 2.5, width: w, borderRadius: 2, background: c, opacity: o }} />
  )
  return (
    <div
      className="relative size-10 shrink-0 overflow-hidden rounded-[11px] border"
      style={{ background: `linear-gradient(to top, ${brand}3d, ${brand}00), ${page}` }}
    >
      <div
        className="absolute overflow-hidden rounded-[7px] border"
        style={{ top: 6, left: 6, right: -8, bottom: -10, background: surface, borderColor: line, padding: "6px 6px 0" }}
      >
        <div className="mb-[3px] flex items-center gap-1">
          <div className="size-[9px] shrink-0 rounded-full" style={{ background: brand }} />
          {bar("55%", text, 0.85)}
        </div>
        <div className="flex flex-col">
          <div style={{ height: 2.5, width: "100%", borderRadius: 2, background: subtle, marginTop: 1 }} />
          <div style={{ height: 2.5, width: "80%", borderRadius: 2, background: subtle, opacity: 0.55, marginTop: 3 }} />
        </div>
      </div>
    </div>
  )
}

/* ─── Branding ─── */

function LogoUpload({ label, desc, value, onChange, dark, primaryColor }: { label: string; desc: string; value: string | null; onChange: (v: string) => void; dark?: boolean; primaryColor: string }) {
  const ref = useRef<HTMLInputElement>(null)
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = (ev) => onChange(ev.target?.result as string)
    r.readAsDataURL(f)
  }
  return (
    <div className="space-y-2">
      <SectionLabel title={label} desc={desc} />
      <div
        onClick={() => ref.current?.click()}
        className={cn("group relative flex aspect-[16/5] cursor-pointer items-center justify-center overflow-hidden rounded-lg border", dark ? "bg-neutral-900" : "bg-muted")}
      >
        {value ? <img src={value} alt="" className="max-h-10 max-w-[80%] object-contain" /> : <LogoSvg color={primaryColor} textColor={dark ? "#ffffff" : "#2B3346"} height={28} />}
        <div className="absolute inset-0 hidden flex-col items-center justify-center gap-1 bg-black/55 text-white group-hover:flex">
          <UploadCloud className="size-5" />
          <span className="text-sm font-medium">Upload image</span>
          <span className="text-xs text-white/70">SVG, PNG — recommended</span>
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*,.svg" onChange={handle} className="hidden" />
    </div>
  )
}

function FaviconUpload() {
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string | null>(null)
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const r = new FileReader()
    r.onload = (ev) => setValue(ev.target?.result as string)
    r.readAsDataURL(f)
  }
  return (
    <div className="space-y-2">
      <SectionLabel title="Favicon" desc="Shown in browser tabs. 32×32px or larger." />
      <div className="flex items-center gap-3">
        <div onClick={() => ref.current?.click()} className="hover:bg-accent flex size-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed transition-colors">
          {value ? <img src={value} alt="" className="size-full object-contain p-1" /> : <UploadCloud className="text-muted-foreground size-4" />}
        </div>
        <p className="text-muted-foreground text-xs leading-snug">Upload favicon<br />ICO, PNG or SVG. Will be automatically resized.</p>
      </div>
      <input ref={ref} type="file" accept="image/*,.svg,.ico" onChange={handle} className="hidden" />
    </div>
  )
}

/* ─── Typography ─── */

function FontNavRow({ label, fontId, fonts, onClick }: { label: string; fontId: string; fonts: Font[]; onClick: () => void }) {
  const f = fonts.find((x) => x.id === fontId)
  return (
    <button type="button" onClick={onClick} className={cn(ROW, "w-full cursor-pointer text-left")}>
      <div className="min-w-0 flex-1 text-sm font-medium">{label}</div>
      <span className="max-w-[55%] shrink-0 truncate text-base" style={{ fontFamily: f?.stack }}>{f?.name ?? "Default"}</span>
      <ChevronRight className="text-muted-foreground/60 size-4 shrink-0" />
    </button>
  )
}

const MAX_FONT_BYTES = 1.5 * 1024 * 1024

function FontUpload({ onAdd }: { onAdd: (f: CustomFont) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    if (file.size > MAX_FONT_BYTES) {
      setError("Font is too large (max 1.5 MB). Try a .woff2 file.")
      return
    }
    setError(null)
    const r = new FileReader()
    r.onload = (ev) => {
      const name = prettifyFontName(file.name)
      onAdd({ id: `custom-${Date.now()}`, name, stack: `'${name}', sans-serif`, dataUrl: ev.target?.result as string })
    }
    r.readAsDataURL(file)
  }
  return (
    <div>
      <Button variant="outline" size="sm" className="w-full" onClick={() => ref.current?.click()}>
        <UploadCloud className="size-4" /> Upload custom font
      </Button>
      <p className="text-muted-foreground mt-1.5 text-xs">.woff2, .woff, .ttf or .otf — up to 1.5 MB</p>
      {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
      <input ref={ref} type="file" accept=".woff2,.woff,.ttf,.otf,font/*" onChange={handle} className="hidden" />
    </div>
  )
}

/** Loads a lightweight preview face (subset to the family name glyphs) exactly once. */
function useGoogleFontPreview(name: string, skip = false) {
  useEffect(() => {
    if (skip) return
    const id = "gfp-" + googleFontId(name)
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href = googleFontCssUrl(name, name)
    document.head.appendChild(link)
  }, [name, skip])
}

type CatalogFont = { id: string; name: string; category: FontCategory; stack: string; preloaded: boolean }

function FontCatalogRow({ font, selected, onSelect }: { font: CatalogFont; selected: boolean; onSelect: () => void }) {
  // Built-in / already-added fonts are loaded app-wide; only fetch a preview
  // face for catalog entries that aren't in the pool yet.
  useGoogleFontPreview(font.name, font.preloaded)
  return (
    <button
      type="button"
      onClick={onSelect}
      className="hover:bg-accent/50 flex w-full cursor-pointer items-center gap-3 rounded-lg border p-3 text-left transition-colors"
    >
      <span className="min-w-0 flex-1 truncate text-base" style={{ fontFamily: font.stack }}>{font.name}</span>
      <span className="text-muted-foreground shrink-0 text-xs">{FONT_CATEGORY_LABELS[font.category]}</span>
      {selected && <Check className="text-primary size-4 shrink-0" />}
    </button>
  )
}

function FontPicker({
  currentId,
  fonts,
  onPick,
  onAddGoogle,
  onAddCustom,
}: {
  currentId: string
  fonts: Font[]
  onPick: (id: string) => void
  onAddGoogle: (name: string) => void
  onAddCustom: (f: CustomFont) => void
}) {
  const [source, setSource] = useState<"browse" | "upload">("browse")
  const [q, setQ] = useState("")
  const [cat, setCat] = useState<"all" | FontCategory>("all")

  // One unified catalog: everything already in the pool (built-ins, added Google,
  // uploads) plus the full browsable Google catalog, deduped by name. No split.
  const catalog: CatalogFont[] = useMemo(() => {
    const googleCat = new Map(GOOGLE_FONTS.map((g) => [g.name.toLowerCase(), g.category]))
    const seen = new Set<string>()
    const out: CatalogFont[] = []
    const push = (f: CatalogFont) => {
      const key = f.name.toLowerCase()
      if (seen.has(key)) return
      seen.add(key)
      out.push(f)
    }
    for (const f of fonts) {
      push({ id: f.id, name: f.name, category: f.category ?? googleCat.get(f.name.toLowerCase()) ?? "sans", stack: f.stack, preloaded: true })
    }
    for (const g of GOOGLE_FONTS) {
      push({ id: googleFontId(g.name), name: g.name, category: g.category, stack: googleFontStack(g.name, g.category), preloaded: false })
    }
    return out
  }, [fonts])

  const query = q.trim().toLowerCase()
  const results = catalog.filter((f) => (cat === "all" || f.category === cat) && (!query || f.name.toLowerCase().includes(query)))
  const shown = results.slice(0, 50)
  const cats: ("all" | FontCategory)[] = ["all", "sans", "serif", "display"]

  const select = (f: CatalogFont) => {
    if (f.preloaded) onPick(f.id)
    else onAddGoogle(f.name)
  }

  return (
    <div className="space-y-3">
      <Seg
        value={source}
        onValueChange={(v) => setSource(v as "browse" | "upload")}
        className="w-full [&>*]:flex-1"
        options={[["browse", "Browse"], ["upload", "Upload"]]}
      />
      {source === "upload" ? (
        <div className="pt-1"><FontUpload onAdd={onAddCustom} /></div>
      ) : (
        <>
          <div className="relative">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search fonts" className="h-9 pl-8" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs transition-colors",
                  cat === c ? "bg-foreground text-background border-foreground" : "hover:bg-accent",
                )}
              >
                {c === "all" ? "All" : FONT_CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {shown.map((f) => (
              <FontCatalogRow key={f.id} font={f} selected={f.id === currentId} onSelect={() => select(f)} />
            ))}
            {shown.length === 0 && <p className="text-muted-foreground py-4 text-center text-sm">No fonts match your search.</p>}
            {results.length > shown.length && (
              <p className="text-muted-foreground pt-1 text-center text-xs">Showing {shown.length} of {results.length} — refine your search to see more.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Styles previews ─── */

const styleWrap = "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-muted"

/** A shape cropped to its bottom-left corner, hanging from the top edge. */
function StyleCardCorner({ radius, bordered, elevated, fill }: { radius: number; bordered?: boolean; elevated?: boolean; fill?: string }) {
  return (
    <div className={cn(styleWrap, "relative")}>
      <div
        className={cn("absolute", !fill && "bg-background", bordered && "border")}
        style={{ top: -10, left: 8, right: -10, bottom: 8, borderBottomLeftRadius: radius, background: fill, boxShadow: elevated ? "0 2px 6px rgba(0,0,0,0.16)" : undefined }}
      />
    </div>
  )
}

function StylePreview({ group, value, accent }: { group: string; value: string; accent?: string }) {
  if (group === "corners") return <StyleCardCorner radius={value === "sharp" ? 0 : value === "round" ? 20 : 8} bordered />
  if (group === "cards") return <StyleCardCorner radius={8} bordered={value === "border"} elevated={value === "elevated"} />
  if (group === "buttons") {
    const r = value === "sharp" ? 0 : value === "pill" ? 999 : 7
    return (
      <div className={cn(styleWrap, "relative")}>
        <div className="absolute" style={{ top: 10, bottom: 10, left: 8, right: -10, background: accent ?? "var(--primary)", borderRadius: r }}>
          <svg width="41" height="15" viewBox="0 0 44 16" fill="none" style={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%) scaleY(-1)" }}>
            <path d="M2 10 C3 3 5 3 6 9 C7 13 9 12 10 8 C11 3 17 3 16 9 C15 13 11 12 13 8 C15 5 18 7 20 10 C21 12 23 11 25 7 C26 4 28 6 30 9 C31 12 33 12 35 7 C37 3 40 6 43 9" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    )
  }
  // avatars — a generic avatar image at full size, corners rounded per option
  const r = value === "circle" ? "9999px" : value === "rounded" ? "8px" : "0px"
  return (
    <img src="/avatars/unassigned.png" alt="" className="size-10 shrink-0 object-cover" style={{ borderRadius: r }} />
  )
}

/* ─── Components: buttons ─── */

const BTN_DEFAULTS = BTN_TOKEN_DEFAULTS()
const CARD_DEFAULTS = CARD_TOKEN_DEFAULTS()
const FEED_DEFAULTS = FEED_TOKEN_DEFAULTS()

function rgbToHex(r: number, g: number, b: number) {
  const h = (n: number) => n.toString(16).padStart(2, "0")
  return `#${h(r)}${h(g)}${h(b)}`
}

// Tailwind's shadow scale is always two layers — a tight "contact" shadow plus a
// softer, more diffuse one — which is what makes it read as soft instead of flat.
// These stops are lifted straight from shadow/md/lg/xl (indexed by the contact
// layer's blur, which is what the Size slider controls) and interpolated between.
const SHADOW_STOPS = [
  { size: 0, y1: 0, s1: 0, y2: 0, b2: 0, s2: 0 },
  { size: 3, y1: 1, s1: 0, y2: 1, b2: 2, s2: -1 },
  { size: 6, y1: 4, s1: -1, y2: 2, b2: 4, s2: -2 },
  { size: 15, y1: 10, s1: -3, y2: 4, b2: 6, s2: -4 },
  { size: 25, y1: 20, s1: -5, y2: 8, b2: 10, s2: -6 },
]
function shadowLayersAt(size: number) {
  const s = Math.max(0, Math.min(25, size))
  const i = SHADOW_STOPS.findIndex((stop) => s <= stop.size)
  const b = SHADOW_STOPS[i === -1 ? SHADOW_STOPS.length - 1 : i]
  const a = SHADOW_STOPS[Math.max(0, (i === -1 ? SHADOW_STOPS.length - 1 : i) - 1)]
  const t = a.size === b.size ? 0 : (s - a.size) / (b.size - a.size)
  const lerp = (x: number, y: number) => Math.round(x + (y - x) * t)
  return { y1: lerp(a.y1, b.y1), s1: lerp(a.s1, b.s1), y2: lerp(a.y2, b.y2), b2: lerp(a.b2, b.b2), s2: lerp(a.s2, b.s2) }
}
function buildShadowFromSize(size: number, hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
  const rgba = `rgba(${r},${g},${b},0.10)`
  const { y1, s1, y2, b2, s2 } = shadowLayersAt(size)
  return `0px ${y1}px ${size}px ${s1}px ${rgba}, 0px ${y2}px ${b2}px ${s2}px ${rgba}`
}
function parseShadowSize(v: string): { size: number; hex: string } {
  // Match against the raw string (not comma-split) — a comma also separates the
  // r/g/b/a channels inside rgba(...), so splitting on "," first would truncate
  // mid-layer and never match.
  const m = /-?\d+px\s+-?\d+px\s+(\d+)px\s+-?\d+px\s+rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,/.exec(v || "")
  if (!m) return { size: 8, hex: "#000000" }
  return { size: +m[1], hex: rgbToHex(+m[2], +m[3], +m[4]) }
}

// Reachable shadow sizes: 0 (none) plus even px values only — every step is a
// visually distinct jump, no near-identical neighbors to agonize over.
const SHADOW_SIZES = [0, 2, 4, 6, 8, 10, 12, 14, 16]
function nearestShadowSize(size: number): number {
  return SHADOW_SIZES.reduce((best, s) => (Math.abs(s - size) < Math.abs(best - size) ? s : best))
}

function ShadowField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const isNone = !value || value === "none"
  const { size: rawSize, hex } = isNone ? { size: 0, hex: "#000000" } : parseShadowSize(value)
  const size = nearestShadowSize(rawSize)
  const idx = SHADOW_SIZES.indexOf(size)
  const set = (nextSize: number) => onChange(nextSize <= 0 ? "none" : buildShadowFromSize(nextSize, hex))
  return (
    <div>
      <SectionLabel title="Shadow" />
      <div className="flex items-center gap-3">
        <Slider value={[idx]} onValueChange={([i]) => set(SHADOW_SIZES[i])} min={0} max={SHADOW_SIZES.length - 1} step={1} className="flex-1" />
        <span className="text-muted-foreground w-10 shrink-0 text-right text-sm tabular-nums">{size}px</span>
      </div>
    </div>
  )
}

function BorderWidthSlider({ value, onChange, min = 0, max = 8 }: { value: number; onChange: (v: number) => void; min?: number; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <Slider value={[value]} onValueChange={([v]) => onChange(v)} min={min} max={max} step={1} className="flex-1" />
      <span className="text-muted-foreground w-10 shrink-0 text-right text-sm tabular-nums">{value}px</span>
    </div>
  )
}

function BtnPreviewMini({ typeId, state, tok, primaryColor, colorTokens, radius }: { typeId: string; state: string; tok: BtnTokens; primaryColor: string; colorTokens: TokenMap; radius: number }) {
  const resolve = (field: string) => resolveTokenColor(tok[`button.${typeId}.${field}.${state}`], colorTokens) || primaryColor
  const bg = resolve("background")
  const fg = resolve("content")
  const bdrVal = resolve("border")
  const bw = Number(tok["button.border.width"] ?? 1)
  const bdr = bdrVal && bdrVal !== "none" ? `${bw}px solid ${bdrVal}` : "none"
  const shd = (tok[`button.${typeId}.shadow.${state}`] as string) || "none"
  const fw = Number(tok["button.font.weight"] || 700)
  const tt = (tok["button.text.transform"] as CSSProperties["textTransform"]) || "none"
  const label = BUTTON_TYPES.find((b) => b.id === typeId)?.label || "Button"
  return (
    <button
      style={{ width: "100%", height: 44, borderRadius: radius, background: bg, color: fg, border: bdr, boxShadow: shd === "none" ? "none" : shd, fontSize: 13, fontWeight: fw, textTransform: tt, letterSpacing: tt === "uppercase" ? "0.05em" : "0", cursor: "default" }}
    >
      {label}
    </button>
  )
}

function GlobalField({ label, desc, modified, onReset, children }: { label: string; desc: string; modified?: boolean; onReset?: () => void; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-medium">{label}</div>
          <div className="text-muted-foreground text-xs leading-snug">{desc}</div>
        </div>
        {modified && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-muted-foreground hover:text-foreground flex shrink-0 items-center gap-1 text-xs transition-colors"
          >
            <RotateCcw className="size-3" /> Reset
          </button>
        )}
      </div>
      {children}
    </div>
  )
}

function ButtonsBody({ onNavigateType, onOpenGlobals }: { onNavigateType: (id: string) => void; onOpenGlobals: () => void }) {
  return (
    <div>
      <nav className="space-y-3">
        {BUTTON_TYPES.map((bt) => (
          <NavRow key={bt.id} label={bt.label} desc={bt.desc} onClick={() => onNavigateType(bt.id)} />
        ))}
      </nav>
      <Separator className="my-4" />
      <NavRow label="Global settings" desc="Font, weight and border for all buttons" onClick={onOpenGlobals} />
    </div>
  )
}

function ButtonGlobalsBody({ tok, setTok, fonts }: { tok: BtnTokens; setTok: (updater: (p: BtnTokens) => BtnTokens) => void; fonts: Font[] }) {
  const set = (key: string, val: string | number) => setTok((p) => ({ ...p, [key]: val }))
  const family = (tok["button.font.family"] as string) || "inherit"
  const weight = Number(tok["button.font.weight"] || 700)
  const transform = String(tok["button.text.transform"] || "none")
  const border = Number(tok["button.border.width"] ?? 1)
  return (
    <div>
      <div className="space-y-5">
        <GlobalField label="Font" desc="Font family for button labels." modified={family !== "inherit"} onReset={() => set("button.font.family", "inherit")}>
          <Select value={family} onValueChange={(v) => set("button.font.family", v)}>
            <SelectTrigger className="h-9 w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="inherit">Same as body</SelectItem>
              <SelectSeparator />
              {fonts.map((f) => (
                <SelectItem key={f.id} value={f.stack} style={{ fontFamily: f.stack }}>{f.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </GlobalField>

        <GlobalField label="Font weight" desc="Weight of button labels." modified={weight !== 700} onReset={() => set("button.font.weight", 700)}>
          <Select value={String(weight)} onValueChange={(v) => set("button.font.weight", Number(v))}>
            <SelectTrigger className="h-9 w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[[400, "Regular"], [500, "Medium"], [600, "Semibold"], [700, "Bold"], [800, "Extrabold"]].map(([v, l]) => (
                <SelectItem key={v} value={String(v)}>{v} — {l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </GlobalField>

        <GlobalField label="Text transform" desc="Casing of button labels." modified={transform !== "none"} onReset={() => set("button.text.transform", "none")}>
          <Select value={transform} onValueChange={(v) => set("button.text.transform", v)}>
            <SelectTrigger className="h-9 w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[["none", "None"], ["uppercase", "Uppercase"], ["capitalize", "Capitalize"]].map(([v, l]) => (
                <SelectItem key={v} value={v}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </GlobalField>
      </div>

      <Separator className="my-5" />

      <GlobalField label="Border width" desc="Border thickness on all buttons." modified={border !== 1} onReset={() => set("button.border.width", 1)}>
        <BorderWidthSlider value={border} onChange={(v) => set("button.border.width", v)} min={0} max={8} />
      </GlobalField>
    </div>
  )
}

function ButtonTypeBody({ typeId, tok, setTok, primaryColor, colorTokens, btnRadius }: { typeId: string; tok: BtnTokens; setTok: (updater: (p: BtnTokens) => BtnTokens) => void; primaryColor: string; colorTokens: TokenMap; btnRadius: number }) {
  const [state, setState] = useState("default")
  const set = (key: string, val: string) => setTok((p) => ({ ...p, [key]: val }))

  const colorFields: { field: string; label: string }[] = [
    { field: "background", label: "Background" },
    { field: "content", label: "Text" },
    { field: "border", label: "Border" },
  ]
  const shadowKey = `button.${typeId}.shadow.${state}`
  const shadowVal = (tok[shadowKey] as string) || ""

  return (
    <div>
      <SectionLabel title="State" />
      <StateTabs value={state} onChange={setState} />
      <div className="bg-muted mt-4 rounded-lg border p-6">
        <BtnPreviewMini typeId={typeId} state={state} tok={tok} primaryColor={primaryColor} colorTokens={colorTokens} radius={btnRadius} />
      </div>
      <Separator className="my-5" />
      <SectionLabel title="Colors" />
      <div className="space-y-3">
        {colorFields.map((f) => {
          const key = `button.${typeId}.${f.field}.${state}`
          const def = (BTN_DEFAULTS[key] as string) ?? ""
          const value = resolveTokenColor(tok[key], colorTokens)
          return (
            <ColorCard
              key={f.field}
              label={f.label}
              value={value && value !== "none" ? value : "#ffffff"}
              onChange={(v) => set(key, v)}
              modified={(tok[key] as string) !== def}
              onReset={() => set(key, def)}
            />
          )
        })}
      </div>
      <Separator className="my-5" />
      <ShadowField key={state} value={shadowVal} onChange={(v) => set(shadowKey, v)} />
    </div>
  )
}

/* ─── Components: cards & list views ─── */

function CardPreviewMini({ state, tok, activeTok, radius }: { state: string; tok: CardTokens; activeTok: TokenMap; radius: number }) {
  const resolve = (field: string) => resolveTokenColor(tok[`card.${field}.${state}`], activeTok) || "#ffffff"
  const bw = Number(tok["card.border.width"] ?? 1)
  const borderColor = resolve("border")
  const shadow = (tok[`card.shadow.${state}`] as string) || "none"
  return (
    <div
      style={{
        background: resolve("background"),
        borderRadius: radius,
        border: bw > 0 ? `${bw}px solid ${borderColor}` : "none",
        boxShadow: shadow === "none" ? "none" : shadow,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: resolve("title"), marginBottom: 6 }}>Card title</div>
      <div style={{ fontSize: 13, color: resolve("content"), lineHeight: 1.4 }}>Supporting text for this card.</div>
    </div>
  )
}

function CardsBody({ tok, setTok, activeTok, cardRadius }: { tok: CardTokens; setTok: (updater: (p: CardTokens) => CardTokens) => void; activeTok: TokenMap; cardRadius: number }) {
  const [state, setState] = useState("default")
  const set = (key: string, val: string | number) => setTok((p) => ({ ...p, [key]: val }))
  const bw = Number(tok["card.border.width"] ?? 1)

  // Resolve a field's color: an alias follows a semantic token, else it's literal.
  const resolve = (field: string) => resolveTokenColor(tok[`card.${field}.${state}`], activeTok) || "#ffffff"

  const colorFields: { field: string; label: string }[] = [
    { field: "background", label: "Background" },
    { field: "title", label: "Title" },
    { field: "content", label: "Text" },
    { field: "border", label: "Border" },
  ]
  const shadowKey = `card.shadow.${state}`
  const shadowVal = (tok[shadowKey] as string) || "none"

  return (
    <div>
      <GlobalField label="Border width" desc="Thickness of the card border, in pixels." modified={bw !== 1} onReset={() => set("card.border.width", 1)}>
        <BorderWidthSlider value={bw} onChange={(v) => set("card.border.width", v)} min={0} max={8} />
      </GlobalField>

      <Separator className="my-5" />

      <SectionLabel title="State" />
      <StateTabs value={state} onChange={setState} />
      <div className="bg-muted mt-4 rounded-lg border p-6">
        <CardPreviewMini state={state} tok={tok} activeTok={activeTok} radius={cardRadius} />
      </div>

      <Separator className="my-5" />

      <SectionLabel title="Colors" />
      <div className="space-y-3">
        {colorFields.map((f) => {
          const key = `card.${f.field}.${state}`
          const def = (CARD_DEFAULTS[key] as string) ?? ""
          const value = resolve(f.field)
          return (
            <ColorCard
              key={f.field}
              label={f.label}
              value={value}
              onChange={(v) => set(key, v)}
              modified={(tok[key] as string) !== def}
              onReset={() => set(key, def)}
            />
          )
        })}
      </div>

      <Separator className="my-5" />

      <ShadowField key={state} value={shadowVal} onChange={(v) => set(shadowKey, v)} />
    </div>
  )
}

function FeedRowPreviewMini({ state, tok, activeTok }: { state: string; tok: FeedTokens; activeTok: TokenMap }) {
  const resolve = (field: string) => resolveTokenColor(tok[`feed.item.${field}.${state}`], activeTok) || "#ffffff"
  const bw = Number(tok["feed.item.border.width"] ?? 1)
  return (
    <div
      style={{
        background: resolve("background"),
        border: bw > 0 ? `${bw}px solid ${resolve("border")}` : "none",
        borderRadius: 8,
        padding: 20,
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: resolve("title"), marginBottom: 6 }}>Post title</div>
      <div style={{ fontSize: 13, color: resolve("content"), lineHeight: 1.4 }}>Supporting text for this row.</div>
    </div>
  )
}

function ListViewsBody({ view, setView, tok, setTok, activeTok }: { view: FeedView; setView: (v: FeedView) => void; tok: FeedTokens; setTok: (updater: (p: FeedTokens) => FeedTokens) => void; activeTok: TokenMap }) {
  const [state, setState] = useState("default")
  const set = (key: string, val: string | number) => setTok((p) => ({ ...p, [key]: val }))
  const bw = Number(tok["feed.item.border.width"] ?? 1)
  const resolve = (field: string) => resolveTokenColor(tok[`feed.item.${field}.${state}`], activeTok) || "#ffffff"

  const colorFields: { field: string; label: string }[] = [
    { field: "background", label: "Background" },
    { field: "title", label: "Title" },
    { field: "content", label: "Text" },
    { field: "border", label: "Border" },
  ]

  return (
    <div>
      <SectionLabel title="Layout" desc="How feed posts are displayed." />
      <Seg
        value={view}
        onValueChange={(v) => setView(v as FeedView)}
        className="w-full [&>*]:flex-1"
        options={[["cards", "Card list"], ["list", "List"]]}
      />

      {view === "cards" ? (
        <div className="mt-5">
          <InfoBanner>In card list view, posts use the <span className="text-foreground font-medium">Cards</span> style. Edit it in Cards. The list's elevation follows the card style too.</InfoBanner>
        </div>
      ) : (
        <>
          <Separator className="my-5" />
          <GlobalField label="Border width" desc="Divider thickness between rows." modified={bw !== 1} onReset={() => set("feed.item.border.width", 1)}>
            <BorderWidthSlider value={bw} onChange={(v) => set("feed.item.border.width", v)} min={0} max={8} />
          </GlobalField>

          <Separator className="my-5" />
          <SectionLabel title="State" />
          <StateTabs value={state} onChange={setState} />
          <div className="bg-muted mt-4 rounded-lg border p-6">
            <FeedRowPreviewMini state={state} tok={tok} activeTok={activeTok} />
          </div>

          <Separator className="my-5" />
          <SectionLabel title="Colors" />
          <div className="space-y-3">
            {colorFields.map((f) => {
              const key = `feed.item.${f.field}.${state}`
              const def = (FEED_DEFAULTS[key] as string) ?? ""
              return (
                <ColorCard
                  key={f.field}
                  label={f.label}
                  value={resolve(f.field)}
                  onChange={(v) => set(key, v)}
                  modified={(tok[key] as string) !== def}
                  onReset={() => set(key, def)}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Advanced: edit tokens, tokens JSON, custom CSS ─── */

function EditTokensBody({ mode, tokens, setTokens }: { mode: "light" | "dark"; tokens: PresetTokens; setTokens: (updater: (p: PresetTokens) => PresetTokens) => void }) {
  return (
    <div>
      {TOKEN_GROUPS.map((g) => (
        <div key={g.id} className="mb-6 last:mb-0">
          <SectionLabel title={g.label} desc={g.desc} />
          <div className="space-y-3">
            {g.tokens.map((tok) => (
              <ColorCard
                key={tok.key}
                label={tok.label}
                desc={tok.desc}
                value={tokens[mode]?.[tok.key] || "#000000"}
                onChange={(v) => setTokens((prev) => ({ ...prev, [mode]: { ...prev[mode], [tok.key]: v } }))}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TokensBody({ tokens, headingFont, bodyFont, textSize, styles, cardTreatment, brandColor, btnTokens, cardTokens, feedTokens, fonts, setTokens, setHeadingFont, setBodyFont, setTextSize, setStyles, setBtnTokens, setCardTokens, setFeedTokens }: {
  tokens: PresetTokens
  headingFont: string
  bodyFont: string
  textSize: TextSize
  styles: StyleShapes
  cardTreatment: string
  brandColor: string
  btnTokens: BtnTokens
  cardTokens: CardTokens
  feedTokens: FeedTokens
  fonts: Font[]
  setTokens: (updater: (p: PresetTokens) => PresetTokens) => void
  setHeadingFont: (f: string) => void
  setBodyFont: (f: string) => void
  setTextSize: (v: TextSize) => void
  setStyles: (s: StyleShapes) => void
  setBtnTokens: (updater: (p: BtnTokens) => BtnTokens) => void
  setCardTokens: (updater: (p: CardTokens) => CardTokens) => void
  setFeedTokens: (updater: (p: FeedTokens) => FeedTokens) => void
}) {
  const nameOf = (id: string) => fonts.find((f) => f.id === id)?.name || id
  const buildJSON = () => ({
    colors: { light: tokens.light, dark: tokens.dark },
    typography: { headingFont: nameOf(headingFont), bodyFont: nameOf(bodyFont), textSize },
    layout: { corners: styles.corners, buttons: styles.buttons, cards: cardTreatment, avatars: styles.avatars },
    brand: { primaryColor: brandColor },
    components: { button: btnTokens, card: cardTokens, feed: feedTokens },
  })
  const [text, setText] = useState(() => JSON.stringify(buildJSON(), null, 2))
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const applyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const ownUpdate = useRef(false)

  useEffect(() => {
    if (ownUpdate.current) { ownUpdate.current = false; return }
    setText(JSON.stringify(buildJSON(), null, 2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, headingFont, bodyFont, textSize, styles, brandColor, btnTokens, cardTokens, feedTokens])

  const applyJSON = (val: string) => {
    try {
      const parsed = JSON.parse(val)
      ownUpdate.current = true
      if (parsed.colors?.light) setTokens((prev) => ({ ...prev, light: parsed.colors.light }))
      if (parsed.colors?.dark) setTokens((prev) => ({ ...prev, dark: parsed.colors.dark }))
      const byName = (n: string) => fonts.find((f) => f.name === n)?.id
      if (parsed.typography?.headingFont) { const id = byName(parsed.typography.headingFont); if (id) setHeadingFont(id) }
      if (parsed.typography?.bodyFont) { const id = byName(parsed.typography.bodyFont); if (id) setBodyFont(id) }
      if (["S", "M", "L"].includes(parsed.typography?.textSize)) setTextSize(parsed.typography.textSize)
      if (parsed.layout) setStyles({ ...styles, ...parsed.layout })
      if (parsed.components?.button) setBtnTokens(() => parsed.components.button)
      if (parsed.components?.card) setCardTokens(() => parsed.components.card)
      if (parsed.components?.feed) setFeedTokens(() => parsed.components.feed)
      setError(null)
    } catch (e) {
      setError("Invalid JSON — " + (e as Error).message)
      ownUpdate.current = false
    }
  }

  const handleChange = (val: string) => {
    setText(val)
    setError(null)
    clearTimeout(applyTimer.current)
    applyTimer.current = setTimeout(() => applyJSON(val), 300)
  }

  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-full flex-col">
      <p className="text-muted-foreground mb-3 shrink-0 text-xs leading-relaxed">
        All design tokens in one place. Edit to apply live, or copy to use in your project.
      </p>
      <CodeEditor value={text} onChange={handleChange} language="json" />
      {error && <p className="text-destructive mt-1.5 shrink-0 text-xs">{error}</p>}
      <Button variant="outline" size="sm" className="mt-2.5 w-full shrink-0" onClick={copy}>{copied ? "✓ Copied" : "Copy JSON"}</Button>
    </div>
  )
}

function CustomCssBody({ css, setCss }: { css: string; setCss: (v: string) => void }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-muted-foreground mb-3 shrink-0 text-xs leading-relaxed">
        Changes apply live and are scoped to the preview. Platform updates may affect custom code.
      </p>
      <CodeEditor value={css} onChange={setCss} language="css" />
    </div>
  )
}

/* ─── Panel ─── */

type PanelProps = {
  open: boolean
  selectedPreset: string
  setSelectedPreset: (id: string) => void
  isCustomized: boolean
  brandColor: string
  setBrandColor: (c: string) => void
  mode: string
  setMode: (m: string) => void
  colorTab: string
  setColorTab: (t: string) => void
  headingFont: string
  setHeadingFont: (f: string) => void
  bodyFont: string
  setBodyFont: (f: string) => void
  textSize: TextSize
  setTextSize: (v: TextSize) => void
  fonts: Font[]
  onAddFont: (f: CustomFont) => void
  onAddGoogleFont: (name: string) => void
  styles: StyleShapes
  setStyles: (s: StyleShapes) => void
  setCardTreatment: (v: string) => void
  cardTokens: CardTokens
  setCardTokens: (updater: (p: CardTokens) => CardTokens) => void
  feedTokens: FeedTokens
  setFeedTokens: (updater: (p: FeedTokens) => FeedTokens) => void
  feedView: FeedView
  setFeedView: (v: FeedView) => void
  logoLight: string | null
  setLogoLight: (v: string) => void
  logoDark: string | null
  setLogoDark: (v: string) => void
  btnTokens: BtnTokens
  setBtnTokens: (updater: (p: BtnTokens) => BtnTokens) => void
  activeTok: TokenMap
  tokens: PresetTokens
  setTokens: (updater: (p: PresetTokens) => PresetTokens) => void
  customCss: string
  setCustomCss: (v: string) => void
}

const META: Record<string, { title: string; subtitle?: string; back?: boolean }> = {
  home: { title: "Appearance", subtitle: "Customize how your community looks and feels." },
  colors: { title: "Theme", subtitle: "Customize your community's look and feel.", back: true },
  browse: { title: "Presets", subtitle: "Start from a ready-made theme.", back: true },
  branding: { title: "Branding", subtitle: "Upload your logo and favicon.", back: true },
  typography: { title: "Typography", subtitle: "Choose fonts and text size.", back: true },
  "edit-theme": { title: "Edit theme", subtitle: "Fine-tune colors for light and dark.", back: true },
  styles: { title: "Styles", subtitle: "Control the shape of buttons, cards and avatars.", back: true },
  components: { title: "Components", subtitle: "Fine-tune individual UI elements.", back: true },
  buttons: { title: "Buttons", subtitle: "Customize button appearance and variants.", back: true },
  "button-globals": { title: "Global settings", subtitle: "Font, weight and border for all buttons.", back: true },
  cards: { title: "Cards", subtitle: "Set colors, border and shadow for each state.", back: true },
  "list-views": { title: "Feeds", subtitle: "Choose the feed layout and style the list.", back: true },
  advanced: { title: "Advanced", subtitle: "Fine-tune with tokens and custom CSS.", back: true },
  tokens: { title: "Tokens", subtitle: "View, edit and export all design tokens.", back: true },
  "custom-css": { title: "Custom CSS", subtitle: "Override any style with your own CSS.", back: true },
}

export function AppearancePanel(props: PanelProps) {
  const {
    open, selectedPreset, setSelectedPreset, isCustomized, brandColor, setBrandColor, mode, setMode, colorTab, setColorTab,
    headingFont, setHeadingFont, bodyFont, setBodyFont, textSize, setTextSize, fonts, onAddFont, onAddGoogleFont,
    styles, setStyles, setCardTreatment, cardTokens, setCardTokens, feedTokens, setFeedTokens, feedView, setFeedView, logoLight, setLogoLight, logoDark, setLogoDark,
    btnTokens, setBtnTokens, activeTok, tokens, setTokens, customCss, setCustomCss,
  } = props
  const [stack, setStack] = useState<string[]>(["home"])
  const [editMode, setEditMode] = useState<"light" | "dark">("light")
  // Each time the panel opens it starts at the Appearance home, not wherever the
  // user left off before Discard/Publish closed it.
  useEffect(() => {
    if (open) setStack(["home"])
  }, [open])
  // "match" = one font for headings + body; "mix" = set headings and body separately.
  const [typoMode, setTypoMode] = useState<"match" | "mix">(() => (bodyFont !== "inherit" ? "mix" : "match"))
  const switchTypoMode = (v: string) => {
    setTypoMode(v as "match" | "mix")
    // Single collapses body onto heading; Separate concretizes body to a real
    // font (never "inherit") so the picker always has a row to highlight.
    if (v === "match") setBodyFont("inherit")
    else if (bodyFont === "inherit") setBodyFont(headingFont)
  }
  const asideRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  const current = stack[stack.length - 1]
  const push = (id: string) => setStack((s) => [...s, id])
  const back = () => setStack((s) => s.slice(0, -1))

  // Re-attach scroll listener on every navigation so stale viewport refs never silently drop it.
  useEffect(() => {
    const vp = asideRef.current?.querySelector<HTMLElement>("[data-radix-scroll-area-viewport]")
    setScrolled(false)
    if (!vp) return
    vp.scrollTo({ top: 0, behavior: "instant" })
    const onScroll = () => setScrolled(vp.scrollTop > 0)
    vp.addEventListener("scroll", onScroll, { passive: true })
    return () => vp.removeEventListener("scroll", onScroll)
  }, [current])

  const section = HOME_SECTIONS.find((s) => s.id === current)
  const btnType = current.startsWith("btn-") ? BUTTON_TYPES.find((b) => b.id === current.slice(4)) : null
  const fontMeta = current === "font-heading"
    ? { title: typoMode === "match" ? "Font" : "Heading font", subtitle: "Pick a typeface, or add a new one.", back: true }
    : current === "font-body"
      ? { title: "Body font", subtitle: "Pick a typeface, or add a new one.", back: true }
      : null
  const meta = btnType
    ? { title: btnType.label, subtitle: "Set colors and shadow for each state.", back: true }
    : fontMeta ?? META[current] ?? { title: section?.label ?? "Section", subtitle: "Coming in the next step.", back: true }
  const presetName = PRESETS.find((p) => p.id === selectedPreset)?.name ?? "Ocean"

  const renderBody = () => {
    if (current === "home") {
      return (
        <nav className="space-y-3">
          {HOME_SECTIONS.map((sec) => (
            <NavRow key={sec.id} label={sec.label} desc={sec.desc} icon={HOME_ICONS[sec.id]} onClick={() => push(sec.id)} />
          ))}
        </nav>
      )
    }

    if (current === "colors") {
      const appearance = mode === "dual" ? "dual" : colorTab
      const setAppearance = (v: string) => {
        if (v === "dual") setMode("dual")
        else { setMode("single"); setColorTab(v) }
      }
      return (
        <div className="space-y-6">
          {/* Theme */}
          <OptionCard left={<ThemeThumb tok={tokens.light} />} label={isCustomized ? "Custom" : presetName} actionLabel="Browse" onAction={() => push("browse")} onClick={() => push("browse")} />

          <Separator />

          {/* Customization */}
          <div className="space-y-3">
            <SectionLabel title="Customize theme" />
            <ColorCard label="Brand color" desc="Used for buttons, links and accents" value={brandColor} onChange={setBrandColor} />
            <NavRow label="Edit palette" desc="Adjust individual colors for light and dark" onClick={() => push("edit-theme")} />
          </div>

          <Separator />

          {/* Color modes */}
          <div>
            <SectionLabel title="Color modes" desc="Which appearance modes members can use" />
            <RadioGroup value={appearance} onValueChange={setAppearance} className="grid grid-cols-3 gap-2">
              <IconRadioCard value="light" icon={<Sun className="size-5" />} label="Light" />
              <IconRadioCard value="dark" icon={<Moon className="size-5" />} label="Dark" />
              <IconRadioCard value="dual" icon={<Contrast className="size-5" />} label="Both" />
            </RadioGroup>
          </div>
        </div>
      )
    }

    if (current === "browse") {
      return (
        <RadioGroup
          value={isCustomized ? "__custom__" : selectedPreset}
          onValueChange={(id) => { if (id !== "__custom__") { setSelectedPreset(id); back() } }}
          className="gap-3"
        >
          {isCustomized && (
            <>
              <RadioCardItem value="__custom__" left={<ThemeThumb tok={tokens.light} />} label="Custom" desc="Your edited theme" />
              <div className="bg-muted/60 text-muted-foreground rounded-md px-3 py-2 text-xs leading-relaxed">
                Switching to a preset will discard your custom changes.
              </div>
            </>
          )}
          {PRESETS.map((p) => (
            <RadioCardItem key={p.id} value={p.id} left={<ThemeThumb tok={PRESET_TOKENS[p.id].light} />} label={p.name} />
          ))}
        </RadioGroup>
      )
    }

    if (current === "branding") {
      return (
        <div className="space-y-6">
          <LogoUpload label="Logo — light mode" desc="Displayed on light backgrounds." value={logoLight} onChange={setLogoLight} primaryColor={brandColor} />
          <LogoUpload label="Logo — dark mode" desc="Displayed on dark backgrounds. If not set, the light logo is used." value={logoDark} onChange={setLogoDark} dark primaryColor={brandColor} />
          <FaviconUpload />
        </div>
      )
    }

    if (current === "typography") {
      return (
        <div className="space-y-6">
          {/* Tier 1 — Typefaces (Single = one font, Separate = headings and body apart) */}
          <div className="space-y-3">
            <SectionLabel title="Typefaces" desc="Use a single font across your community, or set headings and body separately." />
            <Seg
              value={typoMode}
              onValueChange={switchTypoMode}
              className="w-full [&>*]:flex-1"
              options={[["match", "Single"], ["mix", "Separate"]]}
            />
            <div key={typoMode} className="animate-in fade-in space-y-3 pt-1 duration-150">
              {typoMode === "match" ? (
                <FontNavRow label="Font" fontId={headingFont} fonts={fonts} onClick={() => push("font-heading")} />
              ) : (
                <>
                  <FontNavRow label="Heading font" fontId={headingFont} fonts={fonts} onClick={() => push("font-heading")} />
                  <FontNavRow label="Body font" fontId={bodyFont} fonts={fonts} onClick={() => push("font-body")} />
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Tier 2 — Text size */}
          <div className="space-y-2">
            <SectionLabel title="Text size" desc="Overall scale of text across the platform" />
            <Seg
              value={textSize}
              onValueChange={(v) => setTextSize(v as TextSize)}
              className="w-full [&>*]:flex-1"
              options={[["S", "Small"], ["M", "Medium"], ["L", "Large"]]}
            />
          </div>
        </div>
      )
    }

    if (current === "font-heading" || current === "font-body") {
      const slot = current === "font-body" ? "body" : "heading"
      const currentId = slot === "body" ? bodyFont : headingFont
      const setSlot = slot === "body" ? setBodyFont : setHeadingFont
      const pick = (id: string) => { setSlot(id); back() }
      return (
        <FontPicker
          currentId={currentId}
          fonts={fonts}
          onPick={pick}
          onAddGoogle={(name) => { onAddGoogleFont(name); pick(googleFontId(name)) }}
          onAddCustom={(f) => { onAddFont(f); pick(f.id) }}
        />
      )
    }

    if (current === "styles") {
      return (
        <div className="space-y-6">
          {STYLE_GROUPS.map((g) => (
            <div key={g.id}>
              <SectionLabel title={g.label} desc={g.desc} />
              <RadioGroup value={g.id === "cards" ? cardTreatmentOf(cardTokens) : styles[g.id as keyof StyleShapes]} onValueChange={(v) => (g.id === "cards" ? setCardTreatment(v) : setStyles({ ...styles, [g.id]: v }))} className="gap-3">
                {g.opts.map((o) => (
                  <RadioCardItem key={o.v} value={o.v} left={<StylePreview group={g.id} value={o.v} accent={brandColor} />} label={o.label} />
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      )
    }

    if (current === "components") {
      return (
        <nav className="space-y-3">
          {[
            { id: "buttons", label: "Buttons", desc: "Make buttons match your brand in every state" },
            { id: "cards", label: "Cards", desc: "Style cards so they feel consistent everywhere" },
            { id: "list-views", label: "Feeds", desc: "Pick how posts are displayed in the feed" },
          ].map((item) => (
            <NavRow key={item.id} label={item.label} desc={item.desc} onClick={() => push(item.id)} />
          ))}
        </nav>
      )
    }

    if (current === "buttons") {
      return <ButtonsBody onNavigateType={(id) => push(`btn-${id}`)} onOpenGlobals={() => push("button-globals")} />
    }

    if (current === "button-globals") {
      return <ButtonGlobalsBody tok={btnTokens} setTok={setBtnTokens} fonts={fonts} />
    }

    if (btnType) {
      return <ButtonTypeBody typeId={btnType.id} tok={btnTokens} setTok={setBtnTokens} primaryColor={brandColor} colorTokens={activeTok} btnRadius={styles.buttons === "sharp" ? 0 : styles.buttons === "pill" ? 9999 : 8} />
    }

    if (current === "cards") {
      return <CardsBody tok={cardTokens} setTok={setCardTokens} activeTok={activeTok} cardRadius={styles.corners === "sharp" ? 0 : styles.corners === "round" ? 24 : 8} />
    }

    if (current === "list-views") {
      return <ListViewsBody view={feedView} setView={setFeedView} tok={feedTokens} setTok={setFeedTokens} activeTok={activeTok} />
    }

    if (current === "advanced") {
      return (
        <nav className="space-y-3">
          {[
            { id: "tokens", label: "Tokens", desc: "View and edit all design tokens" },
            { id: "custom-css", label: "Custom CSS", desc: "Override styles with your own CSS" },
          ].map((item) => (
            <NavRow key={item.id} label={item.label} desc={item.desc} onClick={() => push(item.id)} />
          ))}
        </nav>
      )
    }

    if (current === "edit-theme") {
      return <EditTokensBody mode={editMode} tokens={tokens} setTokens={setTokens} />
    }

    if (current === "tokens") {
      return (
        <TokensBody
          tokens={tokens}
          headingFont={headingFont}
          bodyFont={bodyFont}
          textSize={textSize}
          styles={styles}
          cardTreatment={cardTreatmentOf(cardTokens)}
          brandColor={brandColor}
          btnTokens={btnTokens}
          cardTokens={cardTokens}
          feedTokens={feedTokens}
          fonts={fonts}
          setTokens={setTokens}
          setHeadingFont={setHeadingFont}
          setBodyFont={setBodyFont}
          setTextSize={setTextSize}
          setStyles={setStyles}
          setBtnTokens={setBtnTokens}
          setCardTokens={setCardTokens}
          setFeedTokens={setFeedTokens}
        />
      )
    }

    if (current === "custom-css") {
      return <CustomCssBody css={customCss} setCss={setCustomCss} />
    }

    return (
      <div className="text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
        This section is next on the list.
      </div>
    )
  }

  return (
    <aside ref={asideRef} className="bg-background flex h-screen w-[400px] shrink-0 flex-col overflow-hidden border-l">
      <SidebarHeader title={meta.title} subtitle={meta.subtitle} onBack={meta.back ? back : undefined} scrolled={scrolled} screenKey={current}>
        {current === "edit-theme" && (
          <Seg
            value={editMode}
            onValueChange={(v) => { setEditMode(v as "light" | "dark"); setColorTab(v) }}
            className="w-full [&>*]:flex-1"
            options={[["light", "Light"], ["dark", "Dark"]]}
          />
        )}
      </SidebarHeader>
      {current === "tokens" || current === "custom-css" ? (
        // Editor screens fill the available height and scroll internally.
        <div key={current} className="animate-in fade-in slide-in-from-right-3 flex min-h-0 flex-1 flex-col px-6 pb-6 duration-200">
          {renderBody()}
        </div>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <div key={current} className="animate-in fade-in slide-in-from-right-3 px-6 pb-8 duration-200">
            {renderBody()}
          </div>
        </ScrollArea>
      )}
    </aside>
  )
}
