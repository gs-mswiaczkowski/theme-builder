import { useEffect, useRef, useState } from "react"
import { RotateCcw } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

/**
 * Dependency-free color picker built on the shadcn Popover: a 2D
 * saturation/value area, a hue slider and an editable hex field. Exposes the
 * same { value, onChange } contract used across the theme builder.
 */

type HSV = { h: number; s: number; v: number }

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n))
}

function hexToHsv(hex: string): HSV {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return { h: 0, s: 0, v: 0 }
  const int = parseInt(m[1], 16)
  const r = ((int >> 16) & 255) / 255
  const g = ((int >> 8) & 255) / 255
  const b = (int & 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: max === 0 ? 0 : d / max, v: max }
}

function hsvToHex({ h, s, v }: HSV): string {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r = 0, g = 0, b = 0
  if (h < 60) [r, g, b] = [c, x, 0]
  else if (h < 120) [r, g, b] = [x, c, 0]
  else if (h < 180) [r, g, b] = [0, c, x]
  else if (h < 240) [r, g, b] = [0, x, c]
  else if (h < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const hex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0")
  return `#${hex(r)}${hex(g)}${hex(b)}`
}

function usePointerDrag(onMove: (xRatio: number, yRatio: number) => void) {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const emit = (e: PointerEvent | React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    onMove(clamp01((e.clientX - rect.left) / rect.width), clamp01((e.clientY - rect.top) / rect.height))
  }
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    emit(e)
    const move = (ev: PointerEvent) => dragging.current && emit(ev)
    const up = () => {
      dragging.current = false
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }
  return { ref, onPointerDown }
}

function ColorPickerBody({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const dragging = useRef(false)
  const [hsv, setHsv] = useState<HSV>(() => hexToHsv(value))

  useEffect(() => {
    if (dragging.current) return
    if (hsvToHex(hsv) !== value.toLowerCase()) setHsv(hexToHsv(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const update = (next: HSV) => {
    dragging.current = true
    setHsv(next)
    onChange(hsvToHex(next))
    setTimeout(() => { dragging.current = false }, 0)
  }

  const sv = usePointerDrag((x, y) => update({ ...hsv, s: x, v: 1 - y }))
  const hue = usePointerDrag((x) => update({ ...hsv, h: x * 360 }))
  const hueColor = `hsl(${Math.round(hsv.h)}, 100%, 50%)`

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={sv.ref}
        onPointerDown={sv.onPointerDown}
        className="relative h-36 w-full cursor-crosshair touch-none rounded-md"
        style={{ backgroundImage: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})` }}
      >
        <span
          className="pointer-events-none absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
        />
      </div>

      <div
        ref={hue.ref}
        onPointerDown={hue.onPointerDown}
        className="relative h-3 w-full cursor-pointer touch-none rounded-full"
        style={{ backgroundImage: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}
      >
        <span
          className="pointer-events-none absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
          style={{ left: `${(hsv.h / 360) * 100}%` }}
        />
      </div>

    </div>
  )
}

function HexInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="border-input bg-background focus-within:border-ring focus-within:ring-ring/50 mt-3 flex items-center gap-2 rounded-md border px-2 focus-within:ring-[3px]" style={{ height: 36 }}>
      <div className="size-4 shrink-0 rounded-full border" style={{ backgroundColor: value || "transparent" }} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="min-w-0 flex-1 bg-transparent font-mono text-xs outline-none"
      />
    </div>
  )
}

export function ColorInput({ value, onChange, hideHex, full }: { value: string; onChange: (v: string) => void; hideHex?: boolean; full?: boolean }) {
  if (hideHex) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Open color picker"
            className="size-6 shrink-0 cursor-pointer rounded-full border shadow-sm transition-opacity hover:opacity-80"
            style={{ backgroundColor: value || "transparent" }}
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-60 p-3">
          <ColorPickerBody value={value} onChange={onChange} />
          <HexInput value={value} onChange={onChange} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <div className={`border-input bg-background focus-within:border-ring focus-within:ring-ring/50 relative flex h-9 items-center gap-2 rounded-md border px-2 focus-within:ring-[3px] ${full ? "w-full" : "w-fit"}`}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="Open color picker"
            className="size-5 shrink-0 rounded-full border"
            style={{ backgroundColor: value || "transparent" }}
          />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56 p-3">
          <ColorPickerBody value={value} onChange={onChange} />
        </PopoverContent>
      </Popover>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        size={full ? undefined : 8}
        className={`bg-transparent font-mono text-xs outline-none ${full ? "min-w-0 flex-1" : ""}`}
      />
    </div>
  )
}

/** Card-style color picker — trigger shows label + description + color circle.
 *  The hex input lives inside the popover. Used for brand color in Colors screen. */
export function ColorCard({ label, desc, value, onChange, modified, onReset }: { label: string; desc?: string; value: string; onChange: (v: string) => void; modified?: boolean; onReset?: () => void }) {
  return (
    <Popover>
      <div className="relative">
        <PopoverTrigger asChild>
          <button
            type="button"
            className="hover:bg-accent/50 flex min-h-[74px] w-full cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors focus-visible:outline-none focus-visible:ring-2"
          >
            <div className="min-w-0 flex-1 text-left">
              <div className="text-sm font-semibold">{label}</div>
              {desc && <div className="text-muted-foreground mt-0.5 text-xs">{desc}</div>}
            </div>
            <div
              className="size-10 shrink-0 rounded-full border shadow-sm"
              style={{ backgroundColor: value || "transparent" }}
            />
          </button>
        </PopoverTrigger>
        {modified && onReset && (
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onReset() }}
            className="text-muted-foreground hover:text-foreground hover:bg-accent absolute top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors"
            style={{ right: 64 }}
          >
            <RotateCcw className="size-3" /> Reset
          </button>
        )}
      </div>
      <PopoverContent align="end" className="w-60 p-3">
        <ColorPickerBody value={value} onChange={onChange} />
        <HexInput value={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}
