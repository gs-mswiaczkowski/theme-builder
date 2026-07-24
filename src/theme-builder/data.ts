/**
 * Theme-builder data model, ported 1:1 from the source artifact.
 * These describe the COMMUNITY's theme being edited — they are intentionally
 * plain values (not shadcn tokens), because the live Preview renders whatever
 * the user picks, independent of our app's own theme.
 */

export type TokenMap = Record<string, string>
export type PresetTokens = { light: TokenMap; dark: TokenMap }

export const PRESET_TOKENS: Record<string, PresetTokens> = {
  neutral: {
    light: {
      "color.action.primary.default": "#9254D9", "color.action.primary.hover": "#7B3FBF", "color.action.primary.pressed": "#6530A6",
      "color.action.neutral.default": "#ffffff", "color.action.neutral.hover": "#f5effe", "color.action.neutral.pressed": "#ecdffe",
      "color.surface.default": "#ffffff", "color.surface.muted": "#f9fafb", "color.surface.inverse": "#1a0a2e", "color.surface.overlay": "#ffffff", "color.surface.page": "#f9fafb", "color.surface.disabled": "#f3f4f6",
      "color.content.default": "#111827", "color.content.subtle": "#6b7280", "color.content.subtlest": "#9ca3af", "color.content.heading.default": "#111827", "color.content.heading.hero": "#111827", "color.content.inverse": "#ffffff", "color.content.disabled": "#9ca3af",
      "color.line.default": "#e5e7eb", "color.line.disabled": "#f3f4f6",
      "color.status.success": "#166534", "color.status.information": "#1d4ed8", "color.status.danger": "#c2410c", "color.action.destructive.default": "#ef4444", "color.action.destructive.hover": "#dc2626", "color.action.destructive.pressed": "#b91c1c",
      "color.community.answered": "#166534", "color.community.unanswered": "#6b7280", "color.community.highlighted": "#9254D9", "color.community.pinned": "#9254D9", "color.community.sticky": "#9254D9",
      "color.link.default": "#9254D9", "color.link.hover": "#7B3FBF",
    },
    dark: {
      "color.action.primary.default": "#C084F5", "color.action.primary.hover": "#D4A8F8", "color.action.primary.pressed": "#E4CDF9",
      "color.action.neutral.default": "#1f1a2e", "color.action.neutral.hover": "#160f26", "color.action.neutral.pressed": "#0d0818",
      "color.surface.default": "#1f1a2e", "color.surface.muted": "#160f26", "color.surface.inverse": "#f5effe", "color.surface.overlay": "#1f1a2e", "color.surface.page": "#160f26", "color.surface.disabled": "#1f1a2e",
      "color.content.default": "#f5effe", "color.content.subtle": "#a5a0b8", "color.content.subtlest": "#6e6885", "color.content.heading.default": "#f5effe", "color.content.heading.hero": "#f5effe", "color.content.inverse": "#160f26", "color.content.disabled": "#4b5563",
      "color.line.default": "#3b2e52", "color.line.disabled": "#1f1a2e",
      "color.status.success": "#4ade80", "color.status.information": "#60a5fa", "color.status.danger": "#f87171", "color.action.destructive.default": "#f87171", "color.action.destructive.hover": "#fca5a5", "color.action.destructive.pressed": "#fecaca",
      "color.community.answered": "#4ade80", "color.community.unanswered": "#9ca3af", "color.community.highlighted": "#C084F5", "color.community.pinned": "#C084F5", "color.community.sticky": "#C084F5",
      "color.link.default": "#C084F5", "color.link.hover": "#D4A8F8",
    },
  },
  ocean: {
    light: {
      "color.action.primary.default": "#1d4ed8", "color.action.primary.hover": "#1e40af", "color.action.primary.pressed": "#1e3a8a",
      "color.action.neutral.default": "#ffffff", "color.action.neutral.hover": "#f0f4ff", "color.action.neutral.pressed": "#e0e8ff",
      "color.surface.default": "#ffffff", "color.surface.muted": "#f3f4f6", "color.surface.inverse": "#0d1b3e", "color.surface.overlay": "#ffffff", "color.surface.page": "#f8faff", "color.surface.disabled": "#f3f4f6",
      "color.content.default": "#0d1b3e", "color.content.subtle": "#4a6280", "color.content.subtlest": "#93b4cf", "color.content.heading.default": "#0d1b3e", "color.content.heading.hero": "#0d1b3e", "color.content.inverse": "#ffffff", "color.content.disabled": "#9ca3af",
      "color.line.default": "#e5e7eb", "color.line.disabled": "#f3f4f6",
      "color.status.success": "#166534", "color.status.information": "#1d4ed8", "color.status.danger": "#c2410c", "color.action.destructive.default": "#ef4444", "color.action.destructive.hover": "#dc2626", "color.action.destructive.pressed": "#b91c1c",
      "color.community.answered": "#166534", "color.community.unanswered": "#64748b", "color.community.highlighted": "#1d4ed8", "color.community.pinned": "#1d4ed8", "color.community.sticky": "#1d4ed8",
      "color.link.default": "#1d4ed8", "color.link.hover": "#1e40af",
    },
    dark: {
      "color.action.primary.default": "#60a5fa", "color.action.primary.hover": "#93c5fd", "color.action.primary.pressed": "#bae6fd",
      "color.action.neutral.default": "#1e3a5f", "color.action.neutral.hover": "#0c2a4a", "color.action.neutral.pressed": "#0c1a2e",
      "color.surface.default": "#1e3a5f", "color.surface.muted": "#0c2a4a", "color.surface.inverse": "#e0f2fe", "color.surface.overlay": "#1e3a5f", "color.surface.page": "#0c1a2e", "color.surface.disabled": "#1e3a5f",
      "color.content.default": "#e0f2fe", "color.content.subtle": "#94a9c0", "color.content.subtlest": "#5f7896", "color.content.heading.default": "#e0f2fe", "color.content.heading.hero": "#e0f2fe", "color.content.inverse": "#0c1a2e", "color.content.disabled": "#1e3a5f",
      "color.line.default": "#2d5278", "color.line.disabled": "#1e3a5f",
      "color.status.success": "#4ade80", "color.status.information": "#60a5fa", "color.status.danger": "#f87171", "color.action.destructive.default": "#f87171", "color.action.destructive.hover": "#fca5a5", "color.action.destructive.pressed": "#fecaca",
      "color.community.answered": "#4ade80", "color.community.unanswered": "#94a3b8", "color.community.highlighted": "#60a5fa", "color.community.pinned": "#60a5fa", "color.community.sticky": "#60a5fa",
      "color.link.default": "#60a5fa", "color.link.hover": "#93c5fd",
    },
  },
  ember: {
    light: {
      "color.action.primary.default": "#c2410c", "color.action.primary.hover": "#9a3412", "color.action.primary.pressed": "#7c2d12",
      "color.action.neutral.default": "#ffffff", "color.action.neutral.hover": "#fdf3ee", "color.action.neutral.pressed": "#fde8d8",
      "color.surface.default": "#ffffff", "color.surface.muted": "#f3f4f6", "color.surface.inverse": "#2c1206", "color.surface.overlay": "#ffffff", "color.surface.page": "#fdfaf8", "color.surface.disabled": "#f3f4f6",
      "color.content.default": "#2c1206", "color.content.subtle": "#7a5540", "color.content.subtlest": "#c4957a", "color.content.heading.default": "#2c1206", "color.content.heading.hero": "#2c1206", "color.content.inverse": "#ffffff", "color.content.disabled": "#9ca3af",
      "color.line.default": "#e5e7eb", "color.line.disabled": "#f3f4f6",
      "color.status.success": "#166534", "color.status.information": "#1d4ed8", "color.status.danger": "#c2410c", "color.action.destructive.default": "#ef4444", "color.action.destructive.hover": "#dc2626", "color.action.destructive.pressed": "#b91c1c",
      "color.community.answered": "#166534", "color.community.unanswered": "#6b7280", "color.community.highlighted": "#c2410c", "color.community.pinned": "#c2410c", "color.community.sticky": "#c2410c",
      "color.link.default": "#c2410c", "color.link.hover": "#9a3412",
    },
    dark: {
      "color.action.primary.default": "#f87171", "color.action.primary.hover": "#fca5a5", "color.action.primary.pressed": "#fecaca",
      "color.action.neutral.default": "#2d1010", "color.action.neutral.hover": "#1c0a0a", "color.action.neutral.pressed": "#0a0000",
      "color.surface.default": "#2d1010", "color.surface.muted": "#1c0a0a", "color.surface.inverse": "#fee2e2", "color.surface.overlay": "#2d1010", "color.surface.page": "#1c0a0a", "color.surface.disabled": "#2d1010",
      "color.content.default": "#fee2e2", "color.content.subtle": "#c0a09a", "color.content.subtlest": "#8f6f68", "color.content.heading.default": "#fee2e2", "color.content.heading.hero": "#fee2e2", "color.content.inverse": "#1c0a0a", "color.content.disabled": "#2d1010",
      "color.line.default": "#4a2020", "color.line.disabled": "#2d1010",
      "color.status.success": "#4ade80", "color.status.information": "#60a5fa", "color.status.danger": "#f87171", "color.action.destructive.default": "#f87171", "color.action.destructive.hover": "#fca5a5", "color.action.destructive.pressed": "#fecaca",
      "color.community.answered": "#4ade80", "color.community.unanswered": "#9ca3af", "color.community.highlighted": "#f87171", "color.community.pinned": "#f87171", "color.community.sticky": "#f87171",
      "color.link.default": "#f87171", "color.link.hover": "#fca5a5",
    },
  },
  meadow: {
    light: {
      "color.action.primary.default": "#166534", "color.action.primary.hover": "#14532d", "color.action.primary.pressed": "#052e16",
      "color.action.neutral.default": "#ffffff", "color.action.neutral.hover": "#f0fdf5", "color.action.neutral.pressed": "#dcfce7",
      "color.surface.default": "#ffffff", "color.surface.muted": "#f3f4f6", "color.surface.inverse": "#052e16", "color.surface.overlay": "#ffffff", "color.surface.page": "#f7fdf9", "color.surface.disabled": "#f3f4f6",
      "color.content.default": "#052e16", "color.content.subtle": "#3d6b52", "color.content.subtlest": "#6fa882", "color.content.heading.default": "#052e16", "color.content.heading.hero": "#052e16", "color.content.inverse": "#ffffff", "color.content.disabled": "#9ca3af",
      "color.line.default": "#e5e7eb", "color.line.disabled": "#f3f4f6",
      "color.status.success": "#166534", "color.status.information": "#1d4ed8", "color.status.danger": "#c2410c", "color.action.destructive.default": "#ef4444", "color.action.destructive.hover": "#dc2626", "color.action.destructive.pressed": "#b91c1c",
      "color.community.answered": "#166534", "color.community.unanswered": "#6b7280", "color.community.highlighted": "#166534", "color.community.pinned": "#166534", "color.community.sticky": "#166534",
      "color.link.default": "#166534", "color.link.hover": "#14532d",
    },
    dark: {
      "color.action.primary.default": "#4ade80", "color.action.primary.hover": "#86efac", "color.action.primary.pressed": "#bbf7d0",
      "color.action.neutral.default": "#0f4a24", "color.action.neutral.hover": "#052e16", "color.action.neutral.pressed": "#021a0e",
      "color.surface.default": "#0f4a24", "color.surface.muted": "#052e16", "color.surface.inverse": "#dcfce7", "color.surface.overlay": "#0f4a24", "color.surface.page": "#052e16", "color.surface.disabled": "#0f4a24",
      "color.content.default": "#dcfce7", "color.content.subtle": "#9db8a6", "color.content.subtlest": "#6a8a76", "color.content.heading.default": "#dcfce7", "color.content.heading.hero": "#dcfce7", "color.content.inverse": "#052e16", "color.content.disabled": "#0f4a24",
      "color.line.default": "#1e6634", "color.line.disabled": "#0f4a24",
      "color.status.success": "#4ade80", "color.status.information": "#60a5fa", "color.status.danger": "#f87171", "color.action.destructive.default": "#f87171", "color.action.destructive.hover": "#fca5a5", "color.action.destructive.pressed": "#fecaca",
      "color.community.answered": "#4ade80", "color.community.unanswered": "#9ca3af", "color.community.highlighted": "#4ade80", "color.community.pinned": "#4ade80", "color.community.sticky": "#4ade80",
      "color.link.default": "#4ade80", "color.link.hover": "#86efac",
    },
  },
  violet: {
    light: {
      "color.action.primary.default": "#4f46e5", "color.action.primary.hover": "#4338ca", "color.action.primary.pressed": "#3730a3",
      "color.action.neutral.default": "#ffffff", "color.action.neutral.hover": "#f5f5ff", "color.action.neutral.pressed": "#eef0ff",
      "color.surface.default": "#ffffff", "color.surface.muted": "#f3f4f6", "color.surface.inverse": "#1e1b4b", "color.surface.overlay": "#ffffff", "color.surface.page": "#fafaff", "color.surface.disabled": "#f3f4f6",
      "color.content.default": "#1e1b4b", "color.content.subtle": "#5b5880", "color.content.subtlest": "#9896c8", "color.content.heading.default": "#1e1b4b", "color.content.heading.hero": "#1e1b4b", "color.content.inverse": "#ffffff", "color.content.disabled": "#9ca3af",
      "color.line.default": "#e5e7eb", "color.line.disabled": "#f3f4f6",
      "color.status.success": "#166534", "color.status.information": "#4f46e5", "color.status.danger": "#c2410c", "color.action.destructive.default": "#ef4444", "color.action.destructive.hover": "#dc2626", "color.action.destructive.pressed": "#b91c1c",
      "color.community.answered": "#166534", "color.community.unanswered": "#6b7280", "color.community.highlighted": "#4f46e5", "color.community.pinned": "#4f46e5", "color.community.sticky": "#4f46e5",
      "color.link.default": "#4f46e5", "color.link.hover": "#4338ca",
    },
    dark: {
      "color.action.primary.default": "#a78bfa", "color.action.primary.hover": "#c4b5fd", "color.action.primary.pressed": "#ddd6fe",
      "color.action.neutral.default": "#2d0d4e", "color.action.neutral.hover": "#1e0533", "color.action.neutral.pressed": "#0f0020",
      "color.surface.default": "#2d0d4e", "color.surface.muted": "#1e0533", "color.surface.inverse": "#f3e8ff", "color.surface.overlay": "#2d0d4e", "color.surface.page": "#1e0533", "color.surface.disabled": "#2d0d4e",
      "color.content.default": "#f3e8ff", "color.content.subtle": "#b0a5c4", "color.content.subtlest": "#7d6f96", "color.content.heading.default": "#f3e8ff", "color.content.heading.hero": "#f3e8ff", "color.content.inverse": "#1e0533", "color.content.disabled": "#2d0d4e",
      "color.line.default": "#4a1d7a", "color.line.disabled": "#2d0d4e",
      "color.status.success": "#4ade80", "color.status.information": "#60a5fa", "color.status.danger": "#f87171", "color.action.destructive.default": "#f87171", "color.action.destructive.hover": "#fca5a5", "color.action.destructive.pressed": "#fecaca",
      "color.community.answered": "#4ade80", "color.community.unanswered": "#9ca3af", "color.community.highlighted": "#a78bfa", "color.community.pinned": "#a78bfa", "color.community.sticky": "#a78bfa",
      "color.link.default": "#a78bfa", "color.link.hover": "#c4b5fd",
    },
  },
  slate: {
    light: {
      "color.action.primary.default": "#334155", "color.action.primary.hover": "#1e293b", "color.action.primary.pressed": "#0f172a",
      "color.action.neutral.default": "#ffffff", "color.action.neutral.hover": "#f8f9fa", "color.action.neutral.pressed": "#f1f3f5",
      "color.surface.default": "#ffffff", "color.surface.muted": "#f3f4f6", "color.surface.inverse": "#0f172a", "color.surface.overlay": "#ffffff", "color.surface.page": "#f9fafb", "color.surface.disabled": "#e2e8f0",
      "color.content.default": "#0f172a", "color.content.subtle": "#64748b", "color.content.subtlest": "#94a3b8", "color.content.heading.default": "#0f172a", "color.content.heading.hero": "#0f172a", "color.content.inverse": "#ffffff", "color.content.disabled": "#9ca3af",
      "color.line.default": "#e2e8f0", "color.line.disabled": "#f1f5f9",
      "color.status.success": "#166534", "color.status.information": "#1d4ed8", "color.status.danger": "#c2410c", "color.action.destructive.default": "#ef4444", "color.action.destructive.hover": "#dc2626", "color.action.destructive.pressed": "#b91c1c",
      "color.community.answered": "#166534", "color.community.unanswered": "#64748b", "color.community.highlighted": "#334155", "color.community.pinned": "#334155", "color.community.sticky": "#334155",
      "color.link.default": "#334155", "color.link.hover": "#1e293b",
    },
    dark: {
      "color.action.primary.default": "#818cf8", "color.action.primary.hover": "#a5b4fc", "color.action.primary.pressed": "#c7d2fe",
      "color.action.neutral.default": "#1e293b", "color.action.neutral.hover": "#0f172a", "color.action.neutral.pressed": "#020617",
      "color.surface.default": "#1e293b", "color.surface.muted": "#0f172a", "color.surface.inverse": "#f1f5f9", "color.surface.overlay": "#1e293b", "color.surface.page": "#0f172a", "color.surface.disabled": "#1e293b",
      "color.content.default": "#f1f5f9", "color.content.subtle": "#94a3b8", "color.content.subtlest": "#64748b", "color.content.heading.default": "#f1f5f9", "color.content.heading.hero": "#f1f5f9", "color.content.inverse": "#0f172a", "color.content.disabled": "#475569",
      "color.line.default": "#475569", "color.line.disabled": "#334155",
      "color.status.success": "#4ade80", "color.status.information": "#60a5fa", "color.status.danger": "#f87171", "color.action.destructive.default": "#f87171", "color.action.destructive.hover": "#fca5a5", "color.action.destructive.pressed": "#fecaca",
      "color.community.answered": "#4ade80", "color.community.unanswered": "#94a3b8", "color.community.highlighted": "#818cf8", "color.community.pinned": "#818cf8", "color.community.sticky": "#818cf8",
      "color.link.default": "#818cf8", "color.link.hover": "#a5b4fc",
    },
  },
}

export type Preset = { id: string; name: string; colors: string[] }
export const PRESETS: Preset[] = [
  { id: "neutral", name: "Default", colors: ["#9254D9", "#C084F5", "#f9fafb", "#160f26"] },
  { id: "ocean", name: "Ocean", colors: ["#2563eb", "#0ea5e9", "#f0f9ff", "#0c1a2e"] },
  { id: "ember", name: "Ember", colors: ["#dc2626", "#f97316", "#fff5f5", "#1c0a0a"] },
  { id: "meadow", name: "Meadow", colors: ["#16a34a", "#65a30d", "#f0fdf4", "#052e16"] },
  { id: "violet", name: "Violet", colors: ["#7c3aed", "#db2777", "#faf5ff", "#1e0533"] },
  { id: "slate", name: "Slate", colors: ["#818cf8", "#fbbf24", "#0f172a", "#f1f5f9"] },
]

export type Font = { id: string; name: string; stack: string; category?: FontCategory }
export const FONTS: Font[] = [
  { id: "dm-sans", name: "DM Sans", stack: "'DM Sans', sans-serif", category: "sans" },
  { id: "figtree", name: "Figtree", stack: "'Figtree', sans-serif", category: "sans" },
  { id: "plus-jakarta", name: "Plus Jakarta Sans", stack: "'Plus Jakarta Sans', sans-serif", category: "sans" },
  { id: "outfit", name: "Outfit", stack: "'Outfit', sans-serif", category: "sans" },
  { id: "nunito", name: "Nunito", stack: "'Nunito', sans-serif", category: "sans" },
  { id: "syne", name: "Syne", stack: "'Syne', sans-serif", category: "display" },
  { id: "fraunces", name: "Fraunces", stack: "'Fraunces', serif", category: "serif" },
  { id: "raleway", name: "Raleway", stack: "'Raleway', sans-serif", category: "sans" },
]

export type CustomFont = { id: string; name: string; stack: string; dataUrl: string }

/* ─── Google Fonts catalog ─── */

export type FontCategory = "sans" | "serif" | "display"
export type GoogleFont = { name: string; category: FontCategory }

export const FONT_CATEGORY_LABELS: Record<FontCategory, string> = {
  sans: "Sans serif",
  serif: "Serif",
  display: "Display",
}

const CATEGORY_FALLBACK: Record<FontCategory, string> = {
  sans: "sans-serif",
  serif: "serif",
  display: "sans-serif",
}

/** Curated set of the most popular Google Fonts families, by category. */
export const GOOGLE_FONTS: GoogleFont[] = [
  // Sans serif
  ...(["Roboto", "Open Sans", "Lato", "Montserrat", "Inter", "Poppins", "Nunito", "Nunito Sans", "Work Sans", "Rubik", "Mulish", "Karla", "Manrope", "Sora", "Space Grotesk", "Public Sans", "IBM Plex Sans", "Source Sans 3", "Noto Sans", "PT Sans", "Oxygen", "Cabin", "Quicksand", "Josefin Sans", "Barlow", "Barlow Condensed", "Fira Sans", "Titillium Web", "Hind", "Heebo", "Assistant", "Kanit", "Prompt", "Signika", "Overpass", "Red Hat Display", "Red Hat Text", "Albert Sans", "Onest", "Schibsted Grotesk", "Instrument Sans", "Archivo", "Archivo Narrow", "Chivo", "Exo 2", "Saira", "Urbanist", "Lexend", "Be Vietnam Pro", "Epilogue", "Jost", "Hanken Grotesk", "Geologica", "Alegreya Sans"] as const).map((name) => ({ name, category: "sans" as const })),
  // Serif
  ...(["Merriweather", "Lora", "PT Serif", "Noto Serif", "Source Serif 4", "Libre Baskerville", "Bitter", "Crimson Text", "Crimson Pro", "EB Garamond", "Cormorant", "Cormorant Garamond", "Spectral", "Zilla Slab", "Domine", "Frank Ruhl Libre", "Bodoni Moda", "Newsreader", "Literata", "DM Serif Text", "Alegreya", "Vollkorn", "Roboto Slab", "Bree Serif", "Playfair Display"] as const).map((name) => ({ name, category: "serif" as const })),
  // Display
  ...(["Oswald", "Bebas Neue", "Anton", "Righteous", "Abril Fatface", "Comfortaa", "Lobster", "Fredoka", "Chakra Petch", "Teko", "Staatliches", "Alfa Slab One", "Bungee", "Archivo Black", "Titan One", "Paytone One", "Baloo 2", "Bricolage Grotesque", "Unbounded", "DM Serif Display", "Big Shoulders Display"] as const).map((name) => ({ name, category: "display" as const })),
]

/** Stable font id for a Google font, matching across the merged font list. */
export function googleFontId(name: string): string {
  return "gf-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

/** CSS font-family stack for a Google font, with a category-appropriate fallback. */
export function googleFontStack(name: string, category: FontCategory): string {
  return `'${name}', ${CATEGORY_FALLBACK[category]}`
}

/**
 * Google Fonts css2 URL. Pass `text` to subset for a lightweight preview
 * (loads only the glyphs needed), or omit for the full weight range.
 */
export function googleFontCssUrl(name: string, text?: string): string {
  const fam = name.replace(/ /g, "+")
  const weights = "wght@400;500;600;700"
  const base = `https://fonts.googleapis.com/css2?family=${fam}:${weights}&display=swap`
  return text ? `${base}&text=${encodeURIComponent(text)}` : base
}

/** Derive a clean display name from an uploaded font's filename. */
export function prettifyFontName(filename: string): string {
  const n = filename
    .replace(/\.(woff2?|ttf|otf)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
  return n || "Custom font"
}

export type TextSize = "S" | "M" | "L"
export const TEXT_SCALE: Record<TextSize, number> = { S: 0.95, M: 1.05, L: 1.15 }

export type StyleRadius = { button: string; card: string; cardSm: string; badge: string }
export type BaseStyle = {
  font: string
  fontHeading?: string
  scale?: number
  radius: StyleRadius
  shadow: string
  cardBorder?: string
}

export const DEFAULT_STYLE: BaseStyle & { colors: Record<string, string> } = {
  colors: { primary: "#2563eb", secondary: "#0ea5e9", bg: "#f0f9ff", surface: "#ffffff", text: "#0c1a2e", muted: "#3b73a0", border: "#bae6fd" },
  font: "Figtree",
  radius: { button: "8px", card: "12px", cardSm: "6px", badge: "99px" },
  shadow: "none",
  cardBorder: "1px solid #bae6fd",
}

export const HOME_SECTIONS = [
  { id: "branding", label: "Branding", desc: "Upload your logo and favicon" },
  { id: "colors", label: "Theme", desc: "Set colors and appearance" },
  { id: "typography", label: "Typography", desc: "Choose fonts and text size" },
  { id: "styles", label: "Styles", desc: "Shape buttons, cards and avatars" },
  { id: "components", label: "Components", desc: "Fine-tune individual elements" },
  { id: "advanced", label: "Advanced", desc: "Edit tokens and custom CSS" },
]

export const TOKEN_GROUPS: { id: string; label: string; desc?: string; tokens: { key: string; label: string; desc: string }[] }[] = [
  { id: "surface", label: "Backgrounds", desc: "Background colors for pages, cards and overlays.", tokens: [
    { key: "color.surface.page", label: "Page", desc: "Canvas behind all UI" },
    { key: "color.surface.default", label: "Container", desc: "Cards, panels and content areas" },
    { key: "color.surface.muted", label: "Muted area", desc: "Grouped sub-areas like reply bubbles" },
    { key: "color.surface.overlay", label: "Overlay", desc: "Modals, dropdowns and popovers" },
    { key: "color.surface.inverse", label: "High-contrast surface", desc: "Tooltips and other inverse UI" },
    { key: "color.surface.disabled", label: "Disabled", desc: "Backgrounds of disabled inputs and controls" },
  ] },
  { id: "content", label: "Text", desc: "Text colors for body copy, headings and labels.", tokens: [
    { key: "color.content.default", label: "Body text", desc: "Primary, high-emphasis text" },
    { key: "color.content.subtle", label: "Secondary text", desc: "Helper text, metadata, captions" },
    { key: "color.content.subtlest", label: "Placeholder text", desc: "Placeholders and low-emphasis copy" },
    { key: "color.content.heading.default", label: "Headings", desc: "Section and component titles" },
    { key: "color.content.heading.hero", label: "Hero heading", desc: "Large titles on hero / banner areas" },
    { key: "color.content.inverse", label: "Text on dark", desc: "Text on any dark or high-contrast background" },
    { key: "color.content.disabled", label: "Disabled text", desc: "Text on disabled or unavailable elements" },
  ] },
  { id: "action", label: "Actions", desc: "Colors for buttons, toggles and tabs.", tokens: [
    { key: "color.action.primary.default", label: "Primary action", desc: "Main CTAs — buttons, toggles, tabs" },
    { key: "color.action.primary.hover", label: "Primary — hover", desc: "When the pointer is over it" },
    { key: "color.action.primary.pressed", label: "Primary — pressed", desc: "While it's being clicked" },
    { key: "color.action.neutral.default", label: "Secondary action", desc: "Supporting, less prominent actions" },
    { key: "color.action.neutral.hover", label: "Secondary — hover", desc: "When the pointer is over it" },
    { key: "color.action.neutral.pressed", label: "Secondary — pressed", desc: "While it's being clicked" },
    { key: "color.action.destructive.default", label: "Destructive action", desc: "Irreversible or harmful actions" },
    { key: "color.action.destructive.hover", label: "Destructive — hover", desc: "When the pointer is over it" },
    { key: "color.action.destructive.pressed", label: "Destructive — pressed", desc: "While it's being clicked" },
  ] },
  { id: "line", label: "Borders", desc: "Colors for borders and dividers.", tokens: [
    { key: "color.line.default", label: "Border", desc: "Separators and component outlines" },
    { key: "color.line.disabled", label: "Disabled border", desc: "Borders on disabled components" },
  ] },
  { id: "status", label: "Status", desc: "Colors for success, info and error states.", tokens: [
    { key: "color.status.success", label: "Success", desc: "Confirmations and successful outcomes" },
    { key: "color.status.information", label: "Information", desc: "Neutral informational messages" },
    { key: "color.status.danger", label: "Error", desc: "Errors and critical issues" },
  ] },
  { id: "community", label: "Community", desc: "Status colors for topics and posts.", tokens: [
    { key: "color.community.answered", label: "Answered", desc: "Has an accepted answer" },
    { key: "color.community.unanswered", label: "Unanswered", desc: "Awaiting a response" },
    { key: "color.community.highlighted", label: "Highlighted", desc: "Featured or promoted content" },
    { key: "color.community.pinned", label: "Pinned", desc: "Pinned to the top of listings" },
    { key: "color.community.sticky", label: "Sticky", desc: "Stickied by a moderator" },
  ] },
  { id: "link", label: "Links", desc: "Colors for text links.", tokens: [
    { key: "color.link.default", label: "Link", desc: "Interactive text links" },
    { key: "color.link.hover", label: "Link — hover", desc: "When the pointer is over it" },
  ] },
]

export type StyleShapes = { corners: string; buttons: string; cards: string; avatars: string }
export const DEFAULT_SHAPES: StyleShapes = { corners: "soft", buttons: "rounded", cards: "border", avatars: "circle" }

export type BtnTokens = Record<string, string | number>

export const BUTTON_TYPES = [
  { id: "primary", label: "Primary button", desc: "Main action, e.g. create topic, reply, login." },
  { id: "neutral", label: "Neutral button", desc: "Secondary action supporting the primary." },
  { id: "warning", label: "Warning button", desc: "Destructive or irreversible actions." },
]

export const BUTTON_STATES = ["default", "hover", "pressed"] as const

// Button tokens: colors default to an alias referencing a semantic token; an
// override replaces the alias with a literal, and Reset restores the alias.
export const BTN_TOKEN_DEFAULTS = (): BtnTokens => ({
  "button.primary.background.default": "{color.action.primary.default}", "button.primary.content.default": "{color.content.inverse}", "button.primary.border.default": "{color.action.primary.default}", "button.primary.shadow.default": "none",
  "button.primary.background.hover": "{color.action.primary.hover}", "button.primary.content.hover": "{color.content.inverse}", "button.primary.border.hover": "{color.action.primary.hover}", "button.primary.shadow.hover": "none",
  "button.primary.background.pressed": "{color.action.primary.pressed}", "button.primary.content.pressed": "{color.content.inverse}", "button.primary.border.pressed": "{color.action.primary.pressed}", "button.primary.shadow.pressed": "none",
  "button.neutral.background.default": "{color.action.neutral.default}", "button.neutral.content.default": "{color.content.default}", "button.neutral.border.default": "{color.line.default}", "button.neutral.shadow.default": "none",
  "button.neutral.background.hover": "{color.action.neutral.hover}", "button.neutral.content.hover": "{color.content.default}", "button.neutral.border.hover": "{color.line.default}", "button.neutral.shadow.hover": "none",
  "button.neutral.background.pressed": "{color.action.neutral.pressed}", "button.neutral.content.pressed": "{color.content.default}", "button.neutral.border.pressed": "{color.line.default}", "button.neutral.shadow.pressed": "none",
  "button.warning.background.default": "{color.action.destructive.default}", "button.warning.content.default": "{color.content.inverse}", "button.warning.border.default": "{color.action.destructive.default}", "button.warning.shadow.default": "none",
  "button.warning.background.hover": "{color.action.destructive.hover}", "button.warning.content.hover": "{color.content.inverse}", "button.warning.border.hover": "{color.action.destructive.hover}", "button.warning.shadow.hover": "none",
  "button.warning.background.pressed": "{color.action.destructive.pressed}", "button.warning.content.pressed": "{color.content.inverse}", "button.warning.border.pressed": "{color.action.destructive.pressed}", "button.warning.shadow.pressed": "none",
  "button.border.width": 1,
  "button.font.weight": 700,
  "button.text.transform": "none",
  "button.font.family": "inherit",
})

// Two-layer, Tailwind-style shadow (contact + ambient) — equivalent to size=4 on
// the Shadow field's Size slider in appearance-panel.tsx.
export const CARD_ELEVATED_SHADOW = "0px 2px 4px 0px rgba(0,0,0,0.10), 0px 1px 3px -1px rgba(0,0,0,0.10)"

// Resolve a component-token color value. A value wrapped in braces is an alias
// (reference) to another token, e.g. "{color.content.heading.default}", resolved
// against the active (mode-specific) token map. Anything else is a literal.
export function resolveTokenColor(value: string | number | undefined, tokenMap: TokenMap): string {
  if (value == null) return ""
  const v = String(value)
  if (v.startsWith("{") && v.endsWith("}")) return tokenMap[v.slice(1, -1)] ?? ""
  return v
}

// Card tokens mirror the design system: per-state background / title / content /
// border colors + shadow, plus a structural border width. Colors default to an
// alias referencing a semantic token (component-tokens.json style) — the title
// lights to a link on hover and darkens (link.hover) on press, while the body
// stays neutral. Overriding a token replaces its alias with a literal; Reset
// restores the alias. The
// treatment picked in Styles seeds the border width and default-state shadow.
export type CardTokens = Record<string, string | number>
export const CARD_TOKEN_DEFAULTS = (): CardTokens => ({
  "card.border.width": 1,
  "card.background.default": "{color.surface.default}", "card.title.default": "{color.content.heading.default}", "card.content.default": "{color.content.default}", "card.border.default": "{color.line.default}", "card.shadow.default": "none",
  "card.background.hover": "{color.surface.default}", "card.title.hover": "{color.link.default}", "card.content.hover": "{color.content.default}", "card.border.hover": "{color.line.default}", "card.shadow.hover": "none",
  "card.background.pressed": "{color.surface.muted}", "card.title.pressed": "{color.link.default}", "card.content.pressed": "{color.content.default}", "card.border.pressed": "{color.line.default}", "card.shadow.pressed": "none",
})

// Border width + default-state shadow seeded when a card treatment is picked in
// Styles. Colors are left untouched (they keep following the theme or overrides).
export const CARD_TREATMENT_PRESET: Record<string, { borderWidth: number; shadow: string }> = {
  flat: { borderWidth: 0, shadow: "none" },
  border: { borderWidth: 1, shadow: "none" },
  elevated: { borderWidth: 1, shadow: CARD_ELEVATED_SHADOW },
}

// The treatment shown in Styles is derived from the tokens so it can never lie:
// a default-state shadow means elevated; otherwise a border means border; else flat.
export function cardTreatmentOf(tok: CardTokens): string {
  const shadow = (tok["card.shadow.default"] as string) || "none"
  if (shadow !== "none") return "elevated"
  return Number(tok["card.border.width"] ?? 1) > 0 ? "border" : "flat"
}

// The feed ("What's Happening Now") shows posts in one of two layouts:
//  - "cards": each post is a separate card, styled by the Cards tokens (card.*).
//  - "list":  gapless rows in a container, styled by the feed.item tokens below.
// feed.item.* mirrors component-tokens.json (config-list-views-card-*): per-state
// colors as aliases (on hover the title becomes a link; pressed keeps the same
// title color but shifts the background to a muted gray). List rows have no
// shadow. The container is purely structural —
// its radius comes from Corners, and its border width + shadow from the shared
// card treatment (variant B); its border color follows feed.item.border, and it
// has no background of its own (the gapless rows are the visible surface).
export type FeedView = "cards" | "list"
export type FeedTokens = Record<string, string | number>
export const FEED_TOKEN_DEFAULTS = (): FeedTokens => ({
  "feed.item.border.width": 1,
  "feed.item.background.default": "{color.surface.default}", "feed.item.title.default": "{color.content.heading.default}", "feed.item.content.default": "{color.content.default}", "feed.item.border.default": "{color.line.default}",
  "feed.item.background.hover": "{color.surface.default}", "feed.item.title.hover": "{color.link.default}", "feed.item.content.hover": "{color.content.default}", "feed.item.border.hover": "{color.line.default}",
  "feed.item.background.pressed": "{color.surface.muted}", "feed.item.title.pressed": "{color.link.default}", "feed.item.content.pressed": "{color.content.default}", "feed.item.border.pressed": "{color.line.default}",
})

export const STYLE_GROUPS = [
  { id: "corners", label: "Corners", desc: "Round the corners of cards and containers", opts: [{ v: "sharp", label: "Sharp" }, { v: "soft", label: "Soft" }, { v: "round", label: "Round" }] },
  { id: "buttons", label: "Buttons", desc: "Shape your buttons", opts: [{ v: "sharp", label: "Sharp" }, { v: "rounded", label: "Rounded" }, { v: "pill", label: "Pill" }] },
  { id: "cards", label: "Cards", desc: "Set how cards stand out from the page", opts: [{ v: "flat", label: "Flat" }, { v: "border", label: "Border" }, { v: "elevated", label: "Elevated" }] },
  { id: "avatars", label: "Avatars", desc: "Shape your profile pictures", opts: [{ v: "circle", label: "Circle" }, { v: "rounded", label: "Rounded" }, { v: "square", label: "Square" }] },
]

/* ─── Helpers ─── */

/** Prefixes a public-folder path (e.g. "/avatars/1.jpg") with the app's base
 *  URL, so static assets resolve correctly when deployed under a subpath
 *  (e.g. GitHub Pages at /theme-builder/) instead of always assuming root. */
export function withBase(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
}

export function presetSwatchColors(tokens?: PresetTokens | TokenMap): string[] {
  const l = (tokens as PresetTokens)?.light || (tokens as TokenMap) || {}
  return [
    l["color.action.primary.default"] || "#888",
    l["color.content.subtlest"] || "#aaa",
    l["color.surface.page"] || "#f5f5f5",
    l["color.content.default"] || "#111111",
  ]
}

export function darken(hex: string, t = 0.15): string {
  if (!hex || hex.length < 7) return "#000000"
  try {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
    const m = (c: number) => Math.max(0, Math.round(c * (1 - t))).toString(16).padStart(2, "0")
    return `#${m(r)}${m(g)}${m(b)}`
  } catch {
    return hex
  }
}

export function lighten(hex: string, t = 0.88): string {
  if (!hex || hex.length < 7) return "#e0e7ff"
  try {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
    const m = (c: number) => Math.round(c + (255 - c) * t).toString(16).padStart(2, "0")
    return `#${m(r)}${m(g)}${m(b)}`
  } catch {
    return "#e0e7ff"
  }
}

/**
 * Brand palette generated from a single seed color. The seed sits at step 600
 * (the brand base); lighter steps mix toward white, darker steps toward black.
 * This is the single source every brand-derived token draws from.
 */
export type BrandPalette = Record<number, string>
export const BRAND_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] as const

export function generateBrandPalette(seed: string): BrandPalette {
  return {
    100: lighten(seed, 0.90),
    200: lighten(seed, 0.78),
    300: lighten(seed, 0.60),
    400: lighten(seed, 0.36),
    500: lighten(seed, 0.14),
    600: seed,
    700: darken(seed, 0.14),
    800: darken(seed, 0.28),
    900: darken(seed, 0.42),
    1000: darken(seed, 0.56),
  }
}

/**
 * Tokens seeded from the brand palette when the brand color changes. Light and
 * dark pick different steps so each mode stays legible on its own surface.
 * After generation these tokens are freely editable in the palette editor.
 */
export function brandDerivedTokens(seed: string, mode: "light" | "dark"): Partial<TokenMap> {
  const p = generateBrandPalette(seed)
  if (mode === "dark") {
    return {
      "color.action.primary.default": p[500],
      "color.action.primary.hover": p[400],
      "color.action.primary.pressed": p[300],
      "color.link.default": p[400],
      "color.link.hover": p[300],
      "color.community.highlighted": p[400],
    }
  }
  return {
    "color.action.primary.default": p[600],
    "color.action.primary.hover": p[700],
    "color.action.primary.pressed": p[800],
    "color.link.default": p[700],
    "color.link.hover": p[800],
    "color.community.highlighted": p[600],
  }
}

/** Mode-aware solid brand mark (logo, badges, icon strokes) — contrasts with the surface. */
export function brandBase(seed: string, mode: "light" | "dark"): string {
  const p = generateBrandPalette(seed)
  return mode === "dark" ? p[400] : p[600]
}

export type PreviewColors = {
  primary: string; primaryHover: string; primaryPressed: string
  destructive: string; destructiveHover: string; destructivePressed: string
  secondary: string; bg: string; surface: string; surfaceMuted: string
  actionNeutral: string; actionNeutralHover: string; actionNeutralPressed: string
  text: string; muted: string; subtlest: string; border: string
  unanswered: string; answered: string; highlighted: string
  brand: string; link: string; linkHover: string
}

export type PreviewStyle = {
  colors: PreviewColors
  font: string
  fontHeading: string
  scale: number
  radius: StyleRadius
  shadow: string
  cardBorder: string
}

// `brand` is the mode-aware brand base (from the brand palette). Action controls
// read the primary tokens; brand surfaces (logo, hero, icons) read `brand`.
export function tokensToPreviewStyle(tok: TokenMap, brand: string, baseStyle: BaseStyle): PreviewStyle {
  return {
    font: baseStyle.font,
    fontHeading: baseStyle.fontHeading ?? baseStyle.font,
    scale: baseStyle.scale ?? 1,
    radius: baseStyle.radius,
    shadow: baseStyle.shadow,
    colors: {
      primary: tok["color.action.primary.default"] || brand,
      primaryHover: tok["color.action.primary.hover"] || darken(brand, 0.12),
      primaryPressed: tok["color.action.primary.pressed"] || darken(brand, 0.22),
      destructive: tok["color.action.destructive.default"] || "#ef4444",
      destructiveHover: tok["color.action.destructive.hover"] || "#dc2626",
      destructivePressed: tok["color.action.destructive.pressed"] || "#b91c1c",
      secondary: tok["color.action.primary.hover"],
      bg: tok["color.surface.page"],
      surface: tok["color.surface.default"],
      surfaceMuted: tok["color.surface.muted"] || "#f3f4f6",
      actionNeutral: tok["color.action.neutral.default"] || "#ffffff",
      actionNeutralHover: tok["color.action.neutral.hover"] || "#f9fafb",
      actionNeutralPressed: tok["color.action.neutral.pressed"] || "#f3f4f6",
      text: tok["color.content.default"],
      muted: tok["color.content.subtle"],
      subtlest: tok["color.content.subtlest"] || "#a1a1aa",
      border: tok["color.line.default"],
      unanswered: tok["color.community.unanswered"] || "#71717a",
      answered: tok["color.community.answered"] || "#16a34a",
      highlighted: tok["color.community.highlighted"] || brand,
      brand,
      link: tok["color.link.default"] || brand,
      linkHover: tok["color.link.hover"] || darken(brand, 0.12),
    },
    cardBorder: baseStyle.cardBorder ?? `1px solid ${tok["color.line.default"]}`,
  }
}
