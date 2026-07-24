import { useState, type CSSProperties, type ReactNode } from "react"
import { BookOpen, FileText, HeadphonesIcon } from "lucide-react"
import { resolveTokenColor, withBase, type PreviewStyle, type TokenMap } from "./data"

/**
 * Live preview of the community, rendered with INLINE styles driven by the
 * user's tokens. Intentionally NOT built on shadcn — it must reflect whatever
 * theme the user is editing, independent of our app's own theme.
 */

export function LogoSvg({ color = "currentColor", textColor = "#2B3346", height = 40 }: { color?: string; textColor?: string; height?: number }) {
  const w = Math.round((height * 112) / 40)
  return (
    <svg width={w} height={height} viewBox="0 0 112 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9394 9C4.89797 9 0 13.8915 0 19.925C0 25.9585 4.89797 30.85 10.9394 30.85H27.0606C28.1943 30.85 29.2876 30.6775 30.3159 30.3578L33.3939 32L36.7149 25.7877C37.5585 24.2063 37.9998 22.4419 38 20.6501V19.925C38 13.8915 33.102 9 27.0606 9H10.9394ZM32.2424 19.925C32.2424 18.5525 31.6965 17.2362 30.7247 16.2657C29.7529 15.2952 28.4349 14.75 27.0606 14.75H10.9394C10.2589 14.75 9.58508 14.8839 8.9564 15.1439C8.32771 15.404 7.75647 15.7852 7.2753 16.2657C6.79412 16.7463 6.41243 17.3168 6.15202 17.9446C5.89161 18.5725 5.75758 19.2454 5.75758 19.925C5.75758 20.6046 5.89161 21.2775 6.15202 21.9054C6.41243 22.5332 6.79412 23.1037 7.2753 23.5843C7.75647 24.0648 8.32771 24.446 8.9564 24.7061C9.58508 24.9661 10.2589 25.1 10.9394 25.1H27.0606C28.428 25.1 29.7399 24.5603 30.7105 23.5985C31.6812 22.6367 32.2318 21.3308 32.2424 19.9653V19.925Z" fill={color} />
      <g clipPath="url(#clip0_logo)">
        <path fillRule="evenodd" clipRule="evenodd" d="M95.2101 20C94.3936 24.5682 97.3358 28 102.108 28C106.879 28 111.048 24.5682 111.865 20C112.681 15.4318 109.739 12 104.967 12C100.195 12 96.0266 15.4318 95.2101 20ZM107.42 20C107.014 22.2727 105.017 24.0227 102.818 24.0227C100.619 24.0227 99.248 22.2727 99.6544 20C100.061 17.7273 102.057 15.9773 104.256 15.9773C106.455 15.9773 107.827 17.7273 107.42 20Z" fill={textColor} />
        <path d="M86.1617 28C81.4368 28 78.4642 24.4773 79.2644 20C80.0646 15.5227 84.2494 12 89.0212 12C91.8281 12 94.3368 13.4091 95.024 15.9773L91.1505 17.8864C90.7025 16.7272 89.9517 15.9546 88.1272 15.9546C85.9051 15.9546 84.1274 17.6591 83.6965 20.0682C83.2456 22.5909 84.4541 24.2046 86.84 24.2046C88.1031 24.2046 88.9189 24.0909 89.7025 23.5L90.065 21.3862L86.0162 19.6211H94.5656L94.445 20.3409H94.4545L94.3208 21.0878L94.3127 21.1371L94.312 21.1374L93.6417 24.8864C92.1008 26.7045 89.3428 28 86.1617 28Z" fill={textColor} />
        <path fillRule="evenodd" clipRule="evenodd" d="M62.1318 20C61.3153 24.5682 64.2574 28 69.0292 28C73.801 28 77.9698 24.5682 78.7862 20C79.6026 15.4318 76.6605 12 71.8888 12C67.117 12 62.9482 15.4318 62.1318 20ZM74.3419 20C73.9357 22.2727 71.9388 24.0227 69.7401 24.0227C67.5413 24.0227 66.1699 22.2727 66.5761 20C66.9823 17.7273 68.9792 15.9773 71.178 15.9773C73.3767 15.9773 74.7481 17.7273 74.3419 20Z" fill={textColor} />
        <path d="M56.5288 12.3188L54.4776 23.7961H61.4481L60.7577 27.6597H53.2023C50.5358 27.6597 49.7035 26.2961 50.0894 24.137L52.2015 12.3188H56.5288Z" fill={textColor} />
      </g>
      <defs>
        <clipPath id="clip0_logo">
          <rect width="62" height="16" fill="white" transform="translate(50 12)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function PreviewBtn({
  children, bg, hoverBg, activeBg, color, border = "none", shadow = "none", hoverShadow, activeShadow, style = {}, onClick,
}: {
  children: ReactNode
  bg: string
  hoverBg?: string
  activeBg?: string
  color: string
  border?: string
  shadow?: string
  hoverShadow?: string
  activeShadow?: string
  style?: CSSProperties
  onClick?: () => void
}) {
  const [st, setSt] = useState<"default" | "hover" | "active">("default")
  const bgs = { default: bg, hover: hoverBg ?? bg, active: activeBg ?? hoverBg ?? bg }
  const shadows = { default: shadow, hover: hoverShadow ?? shadow, active: activeShadow ?? hoverShadow ?? shadow }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setSt("hover")} onMouseLeave={() => setSt("default")}
      onMouseDown={() => setSt("active")} onMouseUp={() => setSt("hover")}
      style={{ ...style, background: bgs[st], color, border, boxShadow: shadows[st] === "none" ? "none" : shadows[st], transition: "background 0.12s, transform 0.08s", transform: st === "active" ? "scale(0.97)" : "scale(1)", cursor: "pointer" }}
    >
      {children}
    </button>
  )
}

type BtnTokens = Record<string, string | number>

type CardStateColors = { bg: string; title: string; content: string; borderColor: string; shadow: string }
type CardStates = { default: CardStateColors; hover: CardStateColors; pressed: CardStateColors }

/** A card / list row that swaps its colors on hover and press, mirroring the
 *  per-state tokens. `children` receives the current state's colors so inner
 *  text (title / body) can follow. */
function PreviewCard({ states, borderWidth = 0, radius, style = {}, children }: {
  states: CardStates
  borderWidth?: number
  radius?: number | string
  style?: CSSProperties
  children: (c: CardStateColors) => ReactNode
}) {
  const [st, setSt] = useState<"default" | "hover" | "pressed">("default")
  const c = states[st]
  return (
    <div
      onMouseEnter={() => setSt("hover")} onMouseLeave={() => setSt("default")}
      onMouseDown={() => setSt("pressed")} onMouseUp={() => setSt("hover")}
      style={{
        ...style,
        background: c.bg,
        ...(borderWidth > 0 ? { border: `${borderWidth}px solid ${c.borderColor}` } : {}),
        ...(radius != null ? { borderRadius: radius } : {}),
        boxShadow: c.shadow === "none" ? "none" : c.shadow,
        transition: "background .12s, box-shadow .12s, border-color .12s",
        cursor: "pointer",
      }}
    >
      {children(c)}
    </div>
  )
}

type NavProps = {
  s: PreviewStyle
  btnTokens?: BtnTokens
  activeTok?: TokenMap
  logoLight?: string | null
  mode?: string
  colorTab?: string
  setColorTab?: (v: string) => void
  isMobile?: boolean
}

export function PreviewNav({ s, btnTokens = {}, activeTok = {}, logoLight = null, mode = "single", colorTab = "light", setColorTab = () => {}, isMobile = false }: NavProps) {
  const primary = s.colors.primary
  const font = `'${s.font}',system-ui,sans-serif`
  const fs = (n: number) => Math.round(n * s.scale)
  const bfw = (btnTokens["button.font.weight"] as number) || 600
  const bbw = (btnTokens["button.border.width"] as number) ?? 1
  const btnFontVal = btnTokens["button.font.family"] as string
  const btnFont = btnFontVal && btnFontVal !== "inherit" ? btnFontVal : font
  const mkPrimaryBtn = () => {
    const bg = resolveTokenColor(btnTokens["button.primary.background.default"], activeTok)
    const hoverBg = resolveTokenColor(btnTokens["button.primary.background.hover"], activeTok)
    const activeBg = resolveTokenColor(btnTokens["button.primary.background.pressed"], activeTok)
    const color = resolveTokenColor(btnTokens["button.primary.content.default"], activeTok)
    const bdrVal = resolveTokenColor(btnTokens["button.primary.border.default"], activeTok)
    return {
      bg: bg || primary,
      hoverBg: hoverBg || s.colors.primaryHover,
      activeBg: activeBg || s.colors.primaryPressed,
      color: color || "#fff",
      border: bdrVal && bdrVal !== "none" ? `${bbw}px solid ${bdrVal}` : `${bbw}px solid ${primary}`,
      shadow: (btnTokens["button.primary.shadow.default"] as string) || "none",
      hoverShadow: (btnTokens["button.primary.shadow.hover"] as string) || "none",
      activeShadow: (btnTokens["button.primary.shadow.pressed"] as string) || "none",
    }
  }
  const [activeNav, setActiveNav] = useState("Community")
  const navLinks = ["Community", "Knowledge Base", "Ideas", "Events", "Groups"]
  const b = mkPrimaryBtn()

  return (
    <div style={{ background: s.colors.surface, borderBottom: `1px solid ${s.colors.border}`, height: 72, flexShrink: 0 }}>
      <div style={{ maxWidth: 1140, width: "100%", margin: "0 auto", padding: `0 ${isMobile ? 16 : 24}px`, display: "flex", alignItems: "center", gap: 6, height: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: 16, flexShrink: 0 }}>
          {logoLight ? <img src={logoLight} style={{ height: 40, maxWidth: 160, objectFit: "contain" }} /> : <LogoSvg color={s.colors.brand} textColor={s.colors.text} height={40} />}
        </div>
        <div style={{ display: "flex", flex: 1, overflow: "hidden", alignItems: "center", gap: 2 }}>
          {!isMobile && navLinks.map((item) => (
            <PreviewBtn key={item} bg="transparent" hoverBg="transparent" activeBg="transparent"
              color={activeNav === item ? s.colors.link : s.colors.muted}
              style={{ padding: "0 10px", fontSize: fs(14), fontWeight: activeNav === item ? 600 : 400, border: "none", fontFamily: font, whiteSpace: "nowrap", cursor: "pointer" }}
              onClick={() => setActiveNav(item)}>
              {item}
            </PreviewBtn>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, marginLeft: 8 }}>
          {mode === "dual" && (
            <PreviewBtn bg="transparent" hoverBg={s.colors.border} color={s.colors.muted}
              style={{ width: 32, height: 32, borderRadius: s.radius.button, border: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              onClick={() => setColorTab(colorTab === "light" ? "dark" : "light")}>
              {colorTab === "light"
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>}
            </PreviewBtn>
          )}
          {!isMobile && (
            <>
              <PreviewBtn bg="transparent" hoverBg={s.colors.border} color={s.colors.muted} style={{ height: 32, padding: "0 8px", fontSize: fs(12), fontWeight: 500, borderRadius: s.radius.button, border: "none", fontFamily: font, display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                EN
              </PreviewBtn>
              <PreviewBtn bg="transparent" hoverBg={s.colors.border} color={s.colors.muted} style={{ width: 32, height: 32, borderRadius: s.radius.button, border: "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              </PreviewBtn>
            </>
          )}
          <PreviewBtn bg={b.bg} hoverBg={b.hoverBg} activeBg={b.activeBg} color={b.color} border={b.border} shadow={b.shadow} hoverShadow={b.hoverShadow} activeShadow={b.activeShadow} style={{ height: 32, padding: "0 14px", fontSize: fs(12), fontWeight: bfw, borderRadius: s.radius.button, border: "none", fontFamily: btnFont }}>New post</PreviewBtn>
          <img src={withBase("/avatars/6.jpg")} alt="" style={{ width: 30, height: 30, borderRadius: s.radius.badge, objectFit: "cover", boxShadow: "0 0 0 1px rgba(0,0,0,0.1)", marginLeft: 2 }} />
        </div>
      </div>
    </div>
  )
}

export function Preview({
  s, card: cardTok, feed: feedTok, feedView = "cards", isMobile = false,
}: {
  s: PreviewStyle
  card?: { borderWidth: number; states: CardStates }
  feed?: {
    item: { borderWidth: number; states: CardStates }
    container: { borderColor: string; borderWidth: number; shadow: string }
  }
  feedView?: "cards" | "list"
  isMobile?: boolean
}) {
  const px = isMobile ? 16 : 24
  const cols3 = isMobile ? "1fr" : "repeat(3, 1fr)"
  const primary = s.colors.primary
  const brand = s.colors.brand
  const link = s.colors.link
  const highlighted = s.colors.highlighted
  const font = `'${s.font}',system-ui,sans-serif`
  const fontHeading = `'${s.fontHeading}',system-ui,sans-serif`
  const fs = (n: number) => Math.round(n * s.scale)
  // Card colors resolve from card tokens (App), falling back to theme colors.
  const themeCard: CardStateColors = { bg: s.colors.surface, title: s.colors.text, content: s.colors.muted, borderColor: s.colors.border, shadow: "none" }
  const cardStates: CardStates = cardTok?.states ?? { default: themeCard, hover: themeCard, pressed: themeCard }
  const cardBW = cardTok?.borderWidth ?? 1
  const feedItemStates: CardStates = feedTok?.item.states ?? { default: themeCard, hover: themeCard, pressed: themeCard }
  const feedItemBW = feedTok?.item.borderWidth ?? 1
  // Static card style for non-interactive widgets (default state).
  const card: CSSProperties = { background: cardStates.default.bg, borderRadius: s.radius.card, border: s.cardBorder, boxShadow: s.shadow }

  const feedPosts = [
    { author: "Dana", role: "New Participant", meta: "Published in Tips & Tricks", title: "Guide to Ideation", badge: { label: "Guide", color: "#7c3aed" }, body: "Read me first if you got a need for a feature that is currently not offered or a feedback regarding the way things work, and want to make sure it reaches the right team.", likes: 0, views: 26, comments: 1, time: "1 month ago", avatar: "/avatars/8.jpg" },
    { author: "Anna", role: "New Participant", meta: "Asked in General Q&A", title: "How can I earn community badges?", answered: true, body: "I've noticed some fancy badges below some community profiles. What do I need to do to get these as well and where can I view them all?", likes: 0, views: 119, comments: 2, time: "2 years ago", avatar: "/avatars/2.jpg" },
    { author: "Dana", role: "New Participant", meta: "Posted in Ideas", title: "Add more filtering options to the dashboards", badge: { label: "New", color: brand }, body: "I'm a big fan of the recent improvements that you have made to the dashboards, it allows me to do in-depth analytics and generate the reports that I use in my QBRs. It would be great to have even more granular filters.", likes: 1, views: 17, comments: 0, time: "3 years ago", avatar: "/avatars/8.jpg" },
    { author: "Anna", role: "New Participant", meta: "Posted in Ideas", title: "Convert topics to Articles", badge: { label: "Discussion ongoing", color: "#c2410c" }, body: "Please add an ability to convert any useful instruction or answer provided by any community member to an Article. Actually it is one of the trending features of modern communities.", likes: 3, views: 38, comments: 4, time: "4 years ago", avatar: "/avatars/2.jpg" },
    { author: "Dana", role: "New Participant", meta: "Asked in General Q&A", title: "Where do I change my notification settings?", answered: true, body: "I'm getting way too many emails from the community. Where can I fine-tune which notifications I receive and how often?", likes: 2, views: 54, comments: 3, time: "5 years ago", avatar: "/avatars/8.jpg" },
  ]

  // Inner content of a feed post; title/body colors differ per layout
  // (card view → card tokens, list view → feed.item tokens).
  type FeedPost = (typeof feedPosts)[number]
  const postInner = (p: FeedPost, titleColor: string, bodyColor: string, borderColor: string) => (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <img src={withBase(p.avatar)} alt="" style={{ width: 32, height: 32, borderRadius: s.radius.badge, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ fontSize: fs(14) }}>
            <span style={{ color: link, fontWeight: 600 }}>{p.author}</span> <span style={{ color: s.colors.muted }}>{p.role}</span>
          </div>
        </div>
        <div style={{ fontSize: fs(13), color: s.colors.muted, flexShrink: 0 }}>{p.meta}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontFamily: fontHeading, fontSize: fs(16), fontWeight: 700, color: titleColor }}>{p.title}</span>
        {p.badge && <span style={{ fontSize: fs(10), fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", background: p.badge.color, borderRadius: 5, padding: "3px 7px" }}>{p.badge.label}</span>}
        {p.answered && <span style={{ width: 16, height: 16, borderRadius: "50%", background: s.colors.answered, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="2,6 5,9 10,3" /></svg></span>}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <p style={{ margin: 0, flex: 1, fontSize: fs(14), color: bodyColor, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.body}</p>
      </div>
      <div style={{ borderTop: `1px solid ${borderColor}`, marginTop: 14, paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: fs(13), color: s.colors.muted }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><svg width={fs(14)} height={fs(14)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>{p.likes}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><svg width={fs(14)} height={fs(14)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>{p.views}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><svg width={fs(14)} height={fs(14)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>{p.comments}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: fs(13), color: s.colors.muted }}>
          <img src={withBase(p.avatar)} alt="" style={{ width: 22, height: 22, borderRadius: s.radius.badge, objectFit: "cover" }} />{p.time}
        </div>
      </div>
    </>
  )

  const [feedTab, setFeedTab] = useState("Recent activity")

  return (
    <div id="sb-preview" style={{ background: s.colors.bg, minHeight: "100%", fontFamily: font, color: s.colors.text }}>
      {/* Hero */}
      <section style={{ background: `radial-gradient(80% 75% at 50% 0%, ${brand}2e 0%, ${brand}16 45%, ${brand}07 100%)` }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: isMobile ? "40px 16px" : "64px 24px 64px", textAlign: "center", boxSizing: "border-box" }}>
          <h1 style={{ fontFamily: fontHeading, fontSize: fs(isMobile ? 26 : 38), fontWeight: 800, lineHeight: 1.1, margin: "0 0 14px", letterSpacing: "-0.025em" }}>Welcome to our Customer Community!</h1>
          <p style={{ fontSize: fs(15), color: s.colors.muted, lineHeight: 1.65, maxWidth: 460, margin: "0 auto" }}>Ask questions, get answers and engage with your peers</p>
          <div style={{ maxWidth: 520, margin: "28px auto 0", display: "flex", alignItems: "center", gap: 10, background: s.colors.surface, border: `1px solid ${s.colors.border}`, borderRadius: s.radius.card, padding: "12px 12px 12px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <svg width={fs(18)} height={fs(18)} viewBox="0 0 24 24" fill="none" stroke={s.colors.muted} strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <span style={{ flex: 1, textAlign: "left", fontSize: fs(14), color: s.colors.subtlest, fontFamily: font }}>Unlock greatness in every search...</span>
            <span style={{ flexShrink: 0, fontSize: fs(12), fontWeight: 500, color: s.colors.muted, background: s.colors.surfaceMuted, border: `1px solid ${s.colors.border}`, borderRadius: 6, padding: "3px 8px", fontFamily: font }}>⌘ K</span>
          </div>
          <div style={{ maxWidth: 520, margin: "14px auto 0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontSize: fs(13), color: s.colors.muted }}>Try:</span>
            {["What can I do in the community", "What are badges"].map((chip) => (
              <span key={chip} style={{ fontSize: fs(13), color: s.colors.text, background: s.colors.surface, border: `1px solid ${s.colors.border}`, borderRadius: s.radius.button, padding: "5px 12px" }}>{chip}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: s.colors.surface, borderBottom: `1px solid ${s.colors.border}`, height: 64 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: `0 ${px}px`, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 14 : 24 }}>
            {[["20", "Topics"], ["11", "Replies"], ["9", "Members"]].map(([n, l]) => (
              <span key={l} style={{ fontSize: fs(14), color: s.colors.muted }}>
                <b style={{ color: s.colors.text, fontWeight: 700 }}>{n}</b> {l}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!isMobile && <span style={{ fontSize: fs(14), color: s.colors.muted }}>Recently online:</span>}
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((n, i) => (
                <img key={n} src={withBase(`/avatars/${n}.jpg`)} alt="" style={{ width: 24, height: 24, borderRadius: s.radius.badge, objectFit: "cover", marginLeft: i === 0 ? 0 : -3, boxShadow: `0 0 0 2px ${s.colors.surface}` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category tiles */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: isMobile ? "36px 16px 0" : "52px 24px 0", width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols3, gap: 16 }}>
          {[
            { title: "Community", desc: "Start discussions, ask questions, get answers", icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /> },
            { title: "Knowledge Base", desc: "Read product guides, how-to's and best practices", icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
            { title: "Customer Ideas", desc: "Submit ideas and suggestions to our team", icon: <><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></> },
            { title: "Product Updates", desc: "Read the latest news from our product team", icon: <><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></> },
            { title: "Events", desc: "Explore and RSVP for upcoming events", icon: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></> },
            { title: "Groups", desc: "Connect with like-minded professionals", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
          ].map((t) => (
            <PreviewCard key={t.title} states={cardStates} borderWidth={cardBW} radius={s.radius.card} style={{ padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              {(c) => (
                <>
                  <div style={{ width: 48, height: 48, borderRadius: s.radius.cardSm, background: `${brand}1a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <svg width={fs(22)} height={fs(22)} viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{t.icon}</svg>
                  </div>
                  <div style={{ fontFamily: fontHeading, fontSize: fs(16), fontWeight: 700, color: c.title, marginBottom: 5 }}>{t.title}</div>
                  <div style={{ fontSize: fs(13), color: c.content, lineHeight: 1.5, maxWidth: 220 }}>{t.desc}</div>
                </>
              )}
            </PreviewCard>
          ))}
        </div>
      </div>

      <div style={{ padding: isMobile ? "36px 16px 0" : "52px 24px 0", display: "flex", flexDirection: "column", gap: 14, maxWidth: 1140, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: cols3, gap: isMobile ? 16 : 24, alignItems: "start" }}>
          {/* Left — Feed (span 2) */}
          <div style={{ gridColumn: isMobile ? "auto" : "span 2", display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Feed header + tabs */}
            <div>
              <div style={{ fontFamily: fontHeading, fontSize: fs(22), fontWeight: 800, color: s.colors.text, marginBottom: 4, letterSpacing: "-0.02em" }}>What's Happening Now</div>
              <div style={{ fontSize: fs(14), color: s.colors.muted }}>See the latest activity, browse open questions, and explore categories.</div>
              <div style={{ display: "flex", gap: 24, marginTop: 16, borderBottom: `1px solid ${s.colors.border}` }}>
                {["Recent activity", "Help others", "Categories"].map((t) => (
                  <div key={t} onClick={() => setFeedTab(t)} style={{ paddingBottom: 10, fontSize: fs(14), fontWeight: feedTab === t ? 600 : 400, color: feedTab === t ? s.colors.text : s.colors.muted, borderBottom: `2px solid ${feedTab === t ? primary : "transparent"}`, marginBottom: -1, cursor: "pointer" }}>{t}</div>
                ))}
              </div>
            </div>

            {/* Feed posts — separate cards, or gapless rows in a list container */}
            {feedView === "list" ? (
              <div style={{
                borderRadius: s.radius.card,
                border: (feedTok?.container.borderWidth ?? 0) > 0 ? `${feedTok!.container.borderWidth}px solid ${feedTok!.container.borderColor}` : "none",
                boxShadow: feedTok && feedTok.container.shadow !== "none" ? feedTok.container.shadow : "none",
                overflow: "hidden",
              }}>
                {feedPosts.map((p, i) => (
                  <PreviewCard key={i} states={feedItemStates} style={{ padding: 20, borderBottom: i < feedPosts.length - 1 ? `${feedItemBW}px solid ${feedItemStates.default.borderColor}` : "none" }}>
                    {(c) => postInner(p, c.title, c.content, c.borderColor)}
                  </PreviewCard>
                ))}
              </div>
            ) : (
              feedPosts.map((p, i) => (
                <PreviewCard key={i} states={cardStates} borderWidth={cardBW} radius={s.radius.card} style={{ padding: 20 }}>
                  {(c) => postInner(p, c.title, c.content, c.borderColor)}
                </PreviewCard>
              ))
            )}
          </div>
          {/* Right — Form + Leaderboard */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ ...card, padding: 18 }}>
              <div style={{ fontFamily: fontHeading, fontSize: fs(16), fontWeight: 700, color: s.colors.text, marginBottom: 2 }}>Events Calendar</div>
              <div style={{ fontSize: fs(13), color: s.colors.muted, marginBottom: 18 }}>Stay up to date with upcoming events.</div>
              {[
                { month: "JAN", day: "27", type: "Webinar", title: "How to get the most from your Customer Success tech stack!" },
                { month: "MAR", day: "10", type: "Virtual Conference", title: "Company Annual Virtual Conference" },
                { month: "MAY", day: "5", type: "Webinar", title: "'Is #CustomerEngagement just another buzzword?'" },
                { month: "JUL", day: "12", type: "Virtual Workshop", title: "Workshop: Custom Integrations & Reporting" },
                { month: "JUL", day: "14", type: "Meetup", title: "Amsterdam Meetup" },
              ].map((e, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 46, flexShrink: 0, borderRadius: s.radius.cardSm, overflow: "hidden", border: `1px solid ${s.colors.border}`, textAlign: "center" }}>
                    <div style={{ background: `${brand}1a`, color: brand, fontSize: fs(10), fontWeight: 700, letterSpacing: "0.06em", padding: "3px 0" }}>{e.month}</div>
                    <div style={{ background: s.colors.surface, color: s.colors.text, fontSize: fs(17), fontWeight: 700, padding: "4px 0" }}>{e.day}</div>
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: fs(11), color: s.colors.subtlest, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 3 }}>{e.type}</div>
                    <div style={{ fontSize: fs(14), fontWeight: 600, color: s.colors.text, lineHeight: 1.35 }}>{e.title}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: fs(13), fontWeight: 600, color: link, cursor: "pointer" }}>Show more</div>
            </div>
            <div style={{ ...card, padding: 18 }}>
              <div style={{ fontFamily: fontHeading, fontSize: fs(16), fontWeight: 700, color: s.colors.text, marginBottom: 14 }}>Leaderboard</div>
              {[
                { i: "AK", n: "Anna K.", r: "Designer", pts: 2841, rank: 1 },
                { i: "ML", n: "Marc L.", r: "Engineer", pts: 2310, rank: 2 },
                { i: "SN", n: "Sara N.", r: "PM", pts: 1987, rank: 3 },
                { i: "TW", n: "Tom W.", r: "Developer", pts: 1654, rank: 4 },
                { i: "JL", n: "Julia L.", r: "Marketing", pts: 1203, rank: 5 },
              ].map(({ n, r, pts, rank }) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 14, fontSize: fs(12), fontWeight: 700, color: rank <= 3 ? highlighted : s.colors.muted, textAlign: "right", flexShrink: 0 }}>{rank}</div>
                  <img src={withBase(`/avatars/${rank + 5}.jpg`)} alt="" style={{ width: 36, height: 36, borderRadius: s.radius.badge, objectFit: "cover", boxShadow: "0 0 0 1px rgba(0,0,0,0.1)", flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: fs(14), fontWeight: 600, lineHeight: 1.2 }}>{n}</div>
                    <div style={{ fontSize: fs(13), color: s.colors.muted, marginTop: 3 }}>{r}</div>
                  </div>
                  <div style={{ fontSize: fs(13), fontWeight: 600, color: rank === 1 ? highlighted : s.colors.muted, flexShrink: 0 }}>{pts.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div style={{ ...card, padding: 18 }}>
              <div style={{ fontFamily: fontHeading, fontSize: fs(16), fontWeight: 700, color: s.colors.text, marginBottom: 14 }}>Popular tags</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["new", "feature", "reporting", "badges", "ideation", "integrations", "introduction", "analytics", "badge", "colors", "crm", "dashboards", "feedback", "getting started", "moderate"].map((tag) => (
                  <span key={tag} style={{ fontSize: fs(13), color: s.colors.text, background: s.colors.surface, border: `1px solid ${s.colors.border}`, borderRadius: s.radius.button, padding: "5px 12px" }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Need more help */}
      <div style={{ background: s.colors.bg, padding: isMobile ? "36px 0" : "52px 0" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: `0 ${isMobile ? 16 : 24}px`, boxSizing: "border-box" }}>
          <h2 style={{ fontFamily: fontHeading, fontSize: fs(22), fontWeight: 700, color: s.colors.text, marginBottom: 24 }}>Need more help?</h2>
          <div style={{ display: "grid", gridTemplateColumns: cols3, gap: isMobile ? 12 : 20 }}>
            {[
              { icon: <FileText size={fs(28)} strokeWidth={1.5} />, title: "API documentation", desc: "Learn everything you need to know about our REST API and endpoints" },
              { icon: <HeadphonesIcon size={fs(28)} strokeWidth={1.5} />, title: "Contact support", desc: "Contact our support team and we'll be happy to help you get up and running!" },
              { icon: <BookOpen size={fs(28)} strokeWidth={1.5} />, title: "Resources", desc: "Find all the guidance you need as you navigate through our success resources" },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ ...card, padding: 0, overflow: "hidden" }}>
                <div style={{ height: 120, background: `${brand}18`, display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 24px", color: brand }}>
                  {icon}
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontFamily: fontHeading, fontSize: fs(15), fontWeight: 700, color: brand, marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: fs(13), color: s.colors.muted, lineHeight: 1.55 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: s.colors.surface, borderTop: `1px solid ${s.colors.border}`, padding: "28px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: fs(13), color: s.colors.muted }}>
            <span>Powered by</span>
            <LogoSvg color={brand} textColor={s.colors.muted} height={22} />
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: fs(13), color: s.colors.muted }}>
            {["Terms & Conditions", "Cookie settings", "Accessibility statement"].map((l) => (
              <span key={l} style={{ cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
