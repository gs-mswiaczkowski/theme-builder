import { useEffect, useRef, useState, type ReactNode } from "react"

import {
  BTN_TOKEN_DEFAULTS,
  CARD_TOKEN_DEFAULTS,
  CARD_TREATMENT_PRESET,
  DEFAULT_SHAPES,
  FEED_TOKEN_DEFAULTS,
  resolveTokenColor,
  FONTS,
  GOOGLE_FONTS,
  PRESET_TOKENS,
  TEXT_SCALE,
  brandBase,
  brandDerivedTokens,
  googleFontCssUrl,
  googleFontId,
  googleFontStack,
  tokensToPreviewStyle,
  type BtnTokens,
  type CardTokens,
  type CustomFont,
  type FeedTokens,
  type FeedView,
  type Font,
  type PresetTokens,
  type StyleShapes,
  type TextSize,
  type TokenMap,
} from "@/theme-builder/data"
import { Check, ChevronDown, ChevronsRight, EyeOff, Languages, Palette, Pencil, Settings, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Preview, PreviewNav } from "@/theme-builder/preview"
import { PreviewToolbar, type Viewport } from "@/theme-builder/preview-toolbar"
import { AppearancePanel } from "@/theme-builder/appearance-panel"

const STORAGE_KEY = "theme-builder:v1"

/* ── Widget-builder floating sidebar (entry point before the panel opens) ── */
function SideSep() {
  return <div className="my-1 h-px w-5 bg-white/15" />
}
function SideBtn({ icon, label, active, onClick }: { icon: ReactNode; label?: string; active?: boolean; onClick?: () => void }) {
  return (
    <div className="group/side relative">
      <button
        type="button"
        onClick={onClick}
        className={cn("flex size-9 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white", active && "bg-white/15 text-white")}
      >
        {icon}
      </button>
      {label && (
        <span className="pointer-events-none absolute top-1/2 right-full mr-2 -translate-y-1/2 rounded-md bg-neutral-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-md ring-1 ring-white/10 transition-opacity group-hover/side:opacity-100">
          {label}
        </span>
      )}
    </div>
  )
}
function WidgetSidebar({ onAppearance, hidden }: { onAppearance: () => void; hidden: boolean }) {
  return (
    <div
      className={cn(
        "absolute top-1/2 right-5 z-30 flex -translate-y-1/2 flex-col gap-3 transition-all duration-300 ease-out",
        hidden ? "pointer-events-none translate-x-[calc(100%+2rem)] opacity-0" : "translate-x-0 opacity-100 delay-[600ms]",
      )}
    >
      <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-neutral-900 p-1.5 text-white shadow-lg ring-1 ring-white/10">
        <SideBtn icon={<ChevronsRight className="size-[18px]" />} />
        <SideSep />
        <SideBtn icon={<Pencil className="size-[18px]" />} />
        <SideBtn icon={<Palette className="size-[18px]" />} label="Appearance" onClick={onAppearance} />
        <SideSep />
        <SideBtn icon={<EyeOff className="size-[18px]" />} />
        <SideBtn icon={<Settings className="size-[18px]" />} />
        <SideSep />
        <SideBtn icon={<Shield className="size-[18px]" />} />
      </div>
      <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-neutral-900 p-1.5 text-white shadow-lg ring-1 ring-white/10">
        <SideBtn icon={<Languages className="size-[18px]" />} />
        <button type="button" className="flex size-9 items-center justify-center gap-px rounded-lg text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white">
          EN <ChevronDown className="size-3" />
        </button>
      </div>
    </div>
  )
}

const clonePreset = (id: string): PresetTokens => ({
  light: { ...PRESET_TOKENS[id].light },
  dark: { ...PRESET_TOKENS[id].dark },
})

function App() {
  const [selectedPreset, setSelectedPreset] = useState("neutral")
  const [mode, setMode] = useState("single")
  const [colorTab, setColorTab] = useState("light")
  const [headingFont, setHeadingFont] = useState("dm-sans")
  // "inherit" means the body font follows the heading font.
  const [bodyFont, setBodyFont] = useState("inherit")
  const [textSize, setTextSize] = useState<TextSize>("M")
  const [customFonts, setCustomFonts] = useState<CustomFont[]>([])
  const [googleFonts, setGoogleFonts] = useState<string[]>([])
  const [styles, setStyles] = useState<StyleShapes>(DEFAULT_SHAPES)
  const [cardTokens, setCardTokens] = useState<CardTokens>(() => CARD_TOKEN_DEFAULTS())
  const [feedTokens, setFeedTokens] = useState<FeedTokens>(() => FEED_TOKEN_DEFAULTS())
  const [feedView, setFeedView] = useState<FeedView>("cards")
  const [logoLight, setLogoLight] = useState<string | null>(null)
  const [logoDark, setLogoDark] = useState<string | null>(null)
  const [btnTokens, setBtnTokens] = useState<BtnTokens>(() => BTN_TOKEN_DEFAULTS())
  const [tokens, setTokens] = useState<PresetTokens>(() => clonePreset("neutral"))
  const [brandColor, setBrandColorState] = useState(() => PRESET_TOKENS["neutral"].light["color.action.primary.default"])
  const [customCss, setCustomCss] = useState("")
  const [viewport, setViewport] = useState<Viewport>("desktop")
  const [published, setPublished] = useState(false)
  // The prototype opens on the community with the widget sidebar; the Appearance
  // panel + toolbar only appear after the user clicks "Appearance".
  const [panelOpen, setPanelOpen] = useState(false)
  // Shared discard confirmation — opened by the toolbar's Discard button and the
  // panel's top-right X.
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  // All fonts available to pick from: built-in + added Google Fonts + uploaded.
  const googleFontList: Font[] = googleFonts.map((name) => {
    const category = GOOGLE_FONTS.find((g) => g.name === name)?.category ?? "sans"
    return { id: googleFontId(name), name, stack: googleFontStack(name, category) }
  })
  const fonts: Font[] = [...FONTS, ...googleFontList, ...customFonts.map(({ id, name, stack }) => ({ id, name, stack }))]

  // Load the selectable built-in fonts from Google Fonts.
  useEffect(() => {
    FONTS.forEach((f) => {
      const id = "gf-" + f.id
      if (document.getElementById(id)) return
      const link = document.createElement("link")
      link.id = id
      link.rel = "stylesheet"
      link.href = `https://fonts.googleapis.com/css2?family=${f.name.replace(/ /g, "+")}:wght@400;500;600;700;800&display=swap`
      document.head.appendChild(link)
    })
  }, [])

  // Load added Google Fonts (full weight range) — re-injected on mount from storage.
  useEffect(() => {
    googleFonts.forEach((name) => {
      const id = googleFontId(name)
      if (document.getElementById(id)) return
      const link = document.createElement("link")
      link.id = id
      link.rel = "stylesheet"
      link.href = googleFontCssUrl(name)
      document.head.appendChild(link)
    })
  }, [googleFonts])

  // Register uploaded fonts with the document via the FontFace API.
  const registered = useRef<Set<string>>(new Set())
  useEffect(() => {
    customFonts.forEach((f) => {
      if (registered.current.has(f.id)) return
      registered.current.add(f.id)
      const face = new FontFace(f.name, `url(${f.dataUrl})`)
      face
        .load()
        .then((loaded) => document.fonts.add(loaded))
        .catch(() => registered.current.delete(f.id))
    })
  }, [customFonts])

  // Inject custom CSS, scoped to the preview only (#sb-preview).
  useEffect(() => {
    const scoped = customCss.replace(/([^{},]+)(\{)/g, (m, sel, brace) => {
      const st = sel.trim()
      if (!st || st.startsWith("@") || st.startsWith("/*")) return m
      return st.split(",").map((p: string) => `#sb-preview ${p.trim()}`).join(", ") + " " + brace
    })
    let el = document.getElementById("custom-css-inject") as HTMLStyleElement | null
    if (!el) {
      el = document.createElement("style")
      el.id = "custom-css-inject"
      document.head.appendChild(el)
    }
    el.textContent = scoped
  }, [customCss])

  // Apply a saved configuration object onto the working state.
  const applySaved = (d: Record<string, unknown>) => {
    if (d.selectedPreset) setSelectedPreset(d.selectedPreset as string)
    if (d.mode) setMode(d.mode as typeof mode)
    if (d.colorTab) setColorTab(d.colorTab as typeof colorTab)
    if (d.headingFont) setHeadingFont(d.headingFont as string)
    if (d.bodyFont) setBodyFont(d.bodyFont as string)
    if (d.textSize) setTextSize(d.textSize as TextSize)
    if (Array.isArray(d.customFonts)) setCustomFonts(d.customFonts as CustomFont[])
    if (Array.isArray(d.googleFonts)) setGoogleFonts(d.googleFonts as string[])
    if (d.styles) setStyles(d.styles as StyleShapes)
    if (d.cardTokens) setCardTokens(d.cardTokens as CardTokens)
    if (d.feedTokens) setFeedTokens(d.feedTokens as FeedTokens)
    if (d.feedView) setFeedView(d.feedView as FeedView)
    if ("logoLight" in d) setLogoLight(d.logoLight as string | null)
    if ("logoDark" in d) setLogoDark(d.logoDark as string | null)
    if (d.btnTokens) setBtnTokens(d.btnTokens as BtnTokens)
    if (d.tokens) setTokens(d.tokens as PresetTokens)
    if (d.brandColor) setBrandColorState(d.brandColor as string)
    if (typeof d.customCss === "string") setCustomCss(d.customCss)
  }

  // Load a previously saved configuration on first mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) applySaved(JSON.parse(raw))
    } catch {
      /* ignore malformed storage */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Selecting a preset resets brand color, working tokens and button overrides.
  const selectPreset = (id: string) => {
    setSelectedPreset(id)
    setTokens(clonePreset(id))
    setBrandColorState(PRESET_TOKENS[id].light["color.action.primary.default"])
    setBtnTokens(BTN_TOKEN_DEFAULTS())
  }

  // Picking a card treatment in Styles seeds the structural card tokens: border
  // width + the shadow across all states (so "elevated" keeps its shadow on
  // hover/press too, not just at rest). Colors are left as-is so overrides survive.
  // The Styles chip is derived from these tokens (cardTreatmentOf), so it always
  // reflects reality — removing the shadow moves it from Elevated back to Border.
  const setCardTreatment = (v: string) => {
    const preset = CARD_TREATMENT_PRESET[v]
    if (preset) setCardTokens((p) => ({ ...p, "card.border.width": preset.borderWidth, "card.shadow.default": preset.shadow, "card.shadow.hover": preset.shadow, "card.shadow.pressed": preset.shadow }))
  }

  const addFont = (f: CustomFont) => setCustomFonts((prev) => [...prev, f])
  const addGoogleFont = (name: string) => setGoogleFonts((prev) => (prev.includes(name) ? prev : [...prev, name]))

  // Removes either an added Google Font or an uploaded font, by merged-list id.
  const removeFont = (id: string) => {
    const googleName = googleFonts.find((n) => googleFontId(n) === id)
    if (googleName) {
      document.getElementById(id)?.remove()
      setGoogleFonts((prev) => prev.filter((n) => n !== googleName))
    } else {
      const f = customFonts.find((cf) => cf.id === id)
      if (f) {
        document.fonts.forEach((ff) => { if (ff.family === f.name) document.fonts.delete(ff) })
        registered.current.delete(id)
      }
      setCustomFonts((prev) => prev.filter((cf) => cf.id !== id))
    }
    if (headingFont === id) setHeadingFont("dm-sans")
    if (bodyFont === id) setBodyFont("inherit")
  }

  // Added (Google/uploaded) fonts only live in the pool while a slot uses them.
  // Changing a slot's font prunes the one it was on — unless it's built-in or the
  // other slot still references it — so the pool never accumulates junk.
  const isAddedFont = (id: string) => id.startsWith("gf-") || id.startsWith("custom-")
  const pruneOrphan = (candidate: string, keptA: string, keptB: string) => {
    if (isAddedFont(candidate) && candidate !== keptA && candidate !== keptB) removeFont(candidate)
  }
  const chooseHeadingFont = (id: string) => {
    setHeadingFont(id)
    pruneOrphan(headingFont, id, bodyFont)
  }
  const chooseBodyFont = (id: string) => {
    setBodyFont(id)
    pruneOrphan(bodyFont, id, headingFont)
  }

  // Save the whole configuration; Reset reverts to the selected preset baseline.
  const saveAll = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedPreset, mode, colorTab, headingFont, bodyFont, textSize, customFonts, googleFonts, styles, cardTokens, feedTokens, feedView, logoLight, logoDark, btnTokens, tokens, brandColor, customCss }))
    } catch {
      /* storage full — likely large uploaded fonts */
    }
  }
  const resetAll = () => {
    setSelectedPreset("neutral")
    setTokens(clonePreset("neutral"))
    setBrandColorState(PRESET_TOKENS["neutral"].light["color.action.primary.default"])
    setHeadingFont("dm-sans")
    setBodyFont("inherit")
    setTextSize("M")
    setStyles(DEFAULT_SHAPES)
    setCardTokens(CARD_TOKEN_DEFAULTS())
    setFeedTokens(FEED_TOKEN_DEFAULTS())
    setFeedView("cards")
    setBtnTokens(BTN_TOKEN_DEFAULTS())
    setLogoLight(null)
    setLogoDark(null)
    setCustomCss("")
  }

  // Discard reverts to the last published (saved) state — not the default theme.
  // If nothing was ever published, the baseline is the fresh default.
  const restoreSaved = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) applySaved(JSON.parse(raw))
      else resetAll()
    } catch {
      resetAll()
    }
  }

  // Publish persists the config; the toolbar shows a brief confirmation.
  const publishedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const handlePublish = () => {
    saveAll()
    setPublished(true)
    if (publishedTimer.current) clearTimeout(publishedTimer.current)
    publishedTimer.current = setTimeout(() => setPublished(false), 2600)
    // Publishing applies the changes and returns to the community (closes the panel).
    setPanelOpen(false)
  }

  // ── Undo / redo ─────────────────────────────────────────────────────────
  // History records the theme config only (not view state like colorTab/viewport).
  // Rapid changes (e.g. dragging the color picker) coalesce into one step.
  const historyConfig = { selectedPreset, mode, headingFont, bodyFont, textSize, customFonts, googleFonts, styles, cardTokens, feedTokens, feedView, logoLight, logoDark, btnTokens, tokens, brandColor, customCss }
  const cur = JSON.stringify(historyConfig)
  const latestConfig = useRef(cur)
  latestConfig.current = cur
  const hist = useRef({ past: [] as string[], future: [] as string[], last: cur, applying: false, pendingPrev: null as string | null })
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ready = useRef(false)
  const [, bumpHistory] = useState(0)

  const applyConfig = (c: typeof historyConfig) => {
    hist.current.applying = true
    setSelectedPreset(c.selectedPreset)
    setMode(c.mode)
    setHeadingFont(c.headingFont)
    setBodyFont(c.bodyFont)
    setTextSize(c.textSize)
    setCustomFonts(c.customFonts)
    setGoogleFonts(c.googleFonts)
    setStyles(c.styles)
    setCardTokens(c.cardTokens)
    setFeedTokens(c.feedTokens)
    setFeedView(c.feedView)
    setLogoLight(c.logoLight)
    setLogoDark(c.logoDark)
    setBtnTokens(c.btnTokens)
    setTokens(c.tokens)
    setBrandColorState(c.brandColor)
    setCustomCss(c.customCss)
  }

  // Enable history only after the initial mount + storage load have settled.
  useEffect(() => {
    const id = setTimeout(() => { hist.current.last = latestConfig.current; ready.current = true }, 0)
    return () => clearTimeout(id)
  }, [])

  // Record changes into the history stack (debounced to coalesce bursts).
  useEffect(() => {
    const h = hist.current
    if (h.applying) { h.applying = false; h.last = cur; return }
    if (!ready.current || cur === h.last) return
    if (h.pendingPrev === null) h.pendingPrev = h.last
    if (commitTimer.current) clearTimeout(commitTimer.current)
    commitTimer.current = setTimeout(() => {
      h.past.push(h.pendingPrev as string)
      if (h.past.length > 100) h.past.shift()
      h.future = []
      h.last = latestConfig.current
      h.pendingPrev = null
      bumpHistory((v) => v + 1)
    }, 350)
  }, [cur])

  const flushPending = () => {
    const h = hist.current
    if (commitTimer.current) clearTimeout(commitTimer.current)
    if (h.pendingPrev !== null) {
      h.past.push(h.pendingPrev)
      h.future = []
      h.last = latestConfig.current
      h.pendingPrev = null
    }
  }
  const undo = () => {
    flushPending()
    const h = hist.current
    if (h.past.length === 0) return
    h.future.push(h.last)
    h.last = h.past.pop() as string
    applyConfig(JSON.parse(h.last))
    bumpHistory((v) => v + 1)
  }
  const redo = () => {
    const h = hist.current
    if (h.future.length === 0) return
    h.past.push(h.last)
    h.last = h.future.pop() as string
    applyConfig(JSON.parse(h.last))
    bumpHistory((v) => v + 1)
  }
  const canUndo = hist.current.past.length > 0 || hist.current.pendingPrev !== null
  const canRedo = hist.current.future.length > 0

  const tab = colorTab === "dark" ? "dark" : "light"
  const nameOf = (id: string) => fonts.find((f) => f.id === id)?.name ?? "DM Sans"
  // Body follows heading unless it has been given its own font.
  const resolvedBodyFont = bodyFont === "inherit" ? headingFont : bodyFont

  // The theme is "custom" once the working tokens diverge from the preset baseline.
  const isCustomized = JSON.stringify(tokens) !== JSON.stringify(PRESET_TOKENS[selectedPreset])

  // Brand color is an independent seed. Changing it regenerates the brand-derived
  // tokens (primary action, link, highlighted) for both light and dark — which
  // then remain freely editable in the palette editor. Editing those tokens does
  // NOT feed back into the brand color.
  const activeTok: TokenMap = tokens[tab]
  const setBrandColor = (c: string) => {
    setBrandColorState(c)
    setTokens((prev) => ({
      light: { ...prev.light, ...brandDerivedTokens(c, "light") } as TokenMap,
      dark: { ...prev.dark, ...brandDerivedTokens(c, "dark") } as TokenMap,
    }))
  }

  // Map shape choices → preview radius / shadow / border.
  const btnR = styles.buttons === "sharp" ? "0px" : styles.buttons === "pill" ? "9999px" : "8px"
  const cardRadiusPx = styles.corners === "sharp" ? 0 : styles.corners === "round" ? 24 : 8
  const cardR = `${cardRadiusPx}px`
  const cardSmR = `${Math.round(cardRadiusPx / 2)}px`
  const avR = styles.avatars === "circle" ? "9999px" : styles.avatars === "rounded" ? "8px" : "0px"
  // Resolve card colors for every interaction state (a color left "" follows its
  // semantic default) so the preview can react to hover / press. The treatment
  // picked in Styles seeds the border width + default shadow.
  const cardBW = Number(cardTokens["card.border.width"] ?? 1)
  const cardStateColors = (state: string) => ({
    bg: resolveTokenColor(cardTokens[`card.background.${state}`], activeTok),
    title: resolveTokenColor(cardTokens[`card.title.${state}`], activeTok),
    content: resolveTokenColor(cardTokens[`card.content.${state}`], activeTok),
    borderColor: resolveTokenColor(cardTokens[`card.border.${state}`], activeTok),
    shadow: (cardTokens[`card.shadow.${state}`] as string) || "none",
  })
  const cardStates = { default: cardStateColors("default"), hover: cardStateColors("hover"), pressed: cardStateColors("pressed") }
  const cardObj = { borderWidth: cardBW, states: cardStates }
  const cardShadow = cardStates.default.shadow === "none" ? "none" : cardStates.default.shadow
  const cardBorder = cardBW > 0 ? `${cardBW}px solid ${cardStates.default.borderColor}` : "none"

  // Feed list-view rows (feed.item) per state; rows have no shadow. The container
  // is structural — border color follows the item border, width + shadow come
  // from the shared card treatment (variant B) so "elevated" lifts the whole list.
  const feedItemColors = (state: string) => ({
    bg: resolveTokenColor(feedTokens[`feed.item.background.${state}`], activeTok),
    title: resolveTokenColor(feedTokens[`feed.item.title.${state}`], activeTok),
    content: resolveTokenColor(feedTokens[`feed.item.content.${state}`], activeTok),
    borderColor: resolveTokenColor(feedTokens[`feed.item.border.${state}`], activeTok),
    shadow: "none",
  })
  const feedItemStates = { default: feedItemColors("default"), hover: feedItemColors("hover"), pressed: feedItemColors("pressed") }
  const feedObj = {
    item: { borderWidth: Number(feedTokens["feed.item.border.width"] ?? 1), states: feedItemStates },
    container: { borderColor: feedItemStates.default.borderColor, borderWidth: cardBW, shadow: cardShadow },
  }

  const s = tokensToPreviewStyle(activeTok, brandBase(brandColor, tab), {
    font: nameOf(resolvedBodyFont),
    fontHeading: nameOf(headingFont),
    scale: TEXT_SCALE[textSize],
    radius: { button: btnR, card: cardR, cardSm: cardSmR, badge: avR },
    shadow: cardShadow,
    cardBorder,
  })

  return (
    <div className="relative flex h-screen overflow-hidden">
      <main className="bg-muted/40 relative flex min-w-0 flex-1 justify-center overflow-clip">
        <WidgetSidebar onAppearance={() => setPanelOpen(true)} hidden={panelOpen} />
        <div
          className={cn(
            "flex min-w-0 flex-col overflow-hidden",
            viewport === "mobile"
              ? "bg-background my-6 w-[390px] shrink-0 rounded-2xl border shadow-sm"
              : "w-full",
          )}
        >
          <PreviewNav s={s} btnTokens={btnTokens} activeTok={activeTok} logoLight={logoLight} mode={mode} colorTab={colorTab} setColorTab={setColorTab} isMobile={viewport === "mobile"} />
          <ScrollArea className="flex-1 min-h-0">
            <Preview s={s} card={cardObj} feed={feedObj} feedView={feedView} isMobile={viewport === "mobile"} />
          </ScrollArea>
        </div>
        <PreviewToolbar
          viewport={viewport}
          setViewport={setViewport}
          onPublish={handlePublish}
          onDiscard={() => { setPanelOpen(false); window.setTimeout(restoreSaved, 700) }}
          published={published}
          light={tab === "dark"}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={undo}
          onRedo={redo}
          confirmDiscard={confirmDiscard}
          setConfirmDiscard={setConfirmDiscard}
          className={cn("transition-all duration-300 ease-out", panelOpen ? "translate-y-0 opacity-100 delay-[600ms]" : "pointer-events-none translate-y-[180%] opacity-0")}
        />
      </main>
      <div className={cn("shrink-0 overflow-hidden transition-[width] duration-300 delay-300 ease-out", panelOpen ? "w-[400px]" : "w-0")}>
      <div
        className={cn(
          "h-full w-[400px] transition-transform duration-300 delay-300 ease-out",
          panelOpen ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
      <AppearancePanel
        open={panelOpen}
        onRequestClose={() => setConfirmDiscard(true)}
        selectedPreset={selectedPreset}
        setSelectedPreset={selectPreset}
        isCustomized={isCustomized}
        brandColor={brandColor}
        setBrandColor={setBrandColor}
        mode={mode}
        setMode={setMode}
        colorTab={colorTab}
        setColorTab={setColorTab}
        headingFont={headingFont}
        setHeadingFont={chooseHeadingFont}
        bodyFont={bodyFont}
        setBodyFont={chooseBodyFont}
        textSize={textSize}
        setTextSize={setTextSize}
        fonts={fonts}
        onAddFont={addFont}
        onAddGoogleFont={addGoogleFont}
        styles={styles}
        setStyles={setStyles}
        setCardTreatment={setCardTreatment}
        cardTokens={cardTokens}
        setCardTokens={setCardTokens}
        feedTokens={feedTokens}
        setFeedTokens={setFeedTokens}
        feedView={feedView}
        setFeedView={setFeedView}
        logoLight={logoLight}
        setLogoLight={setLogoLight}
        logoDark={logoDark}
        setLogoDark={setLogoDark}
        btnTokens={btnTokens}
        setBtnTokens={setBtnTokens}
        activeTok={activeTok}
        tokens={tokens}
        setTokens={setTokens}
        customCss={customCss}
        setCustomCss={setCustomCss}
      />
      </div>
      </div>

      {/* Publish confirmation toast */}
      <div
        className={cn(
          "pointer-events-none fixed top-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out",
          published ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        )}
      >
        <div className="flex items-center gap-2.5 rounded-xl bg-neutral-900 py-2.5 pr-4 pl-2.5 text-sm font-medium text-white shadow-lg ring-1 ring-white/10">
          <span className="flex size-5 items-center justify-center rounded-full bg-green-500">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          Changes published
        </div>
      </div>
    </div>
  )
}

export default App
