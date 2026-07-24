import { useState } from "react"
import { Check, Monitor, Smartphone, UploadCloud, Undo2, Redo2 } from "lucide-react"

import { Dialog } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type Viewport = "desktop" | "mobile"

type Props = {
  viewport: Viewport
  setViewport: (v: Viewport) => void
  onPublish: () => void
  onDiscard: () => void
  published: boolean
  light?: boolean
  canUndo?: boolean
  canRedo?: boolean
  onUndo?: () => void
  onRedo?: () => void
  className?: string
}

function IconBtn({ label, onClick, disabled, active, light, children }: { label: string; onClick?: () => void; disabled?: boolean; active?: boolean; light?: boolean; children: React.ReactNode }) {
  return (
    <span className="group/tt relative flex">
      <button
        type="button"
        aria-label={label}
        aria-pressed={active}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "flex size-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-none",
          light
            ? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100"
            : "text-white/80 hover:bg-white/10 hover:text-white focus-visible:bg-white/10",
          active && (light ? "bg-neutral-200 text-neutral-900" : "bg-white/15 text-white"),
          disabled && "pointer-events-none opacity-35",
        )}
      >
        {children}
      </button>
      {!disabled && (
        <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-neutral-800 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-md ring-1 ring-white/10 transition-opacity group-hover/tt:opacity-100 group-focus-within/tt:opacity-100">
          {label}
        </span>
      )}
    </span>
  )
}

export function PreviewToolbar({ viewport, setViewport, onPublish, onDiscard, published, light = false, canUndo = false, canRedo = false, onUndo, onRedo, className }: Props) {
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  return (
    <div className={cn("absolute bottom-6 left-1/2 z-20 -translate-x-1/2", className)}>
      <div className={cn("flex items-center gap-0.5 rounded-2xl p-1.5 shadow-lg ring-1", light ? "bg-white ring-black/10" : "bg-neutral-900 ring-white/10")}>
        <IconBtn label="Undo" light={light} onClick={onUndo} disabled={!canUndo}><Undo2 className="size-[18px]" /></IconBtn>
        <IconBtn label="Redo" light={light} onClick={onRedo} disabled={!canRedo}><Redo2 className="size-[18px]" /></IconBtn>

        <div className={cn("mx-1 h-5 w-px", light ? "bg-neutral-200" : "bg-white/15")} />

        <IconBtn label="Desktop preview" light={light} onClick={() => setViewport("desktop")} active={viewport === "desktop"}><Monitor className="size-[18px]" /></IconBtn>
        <IconBtn label="Mobile preview" light={light} onClick={() => setViewport("mobile")} active={viewport === "mobile"}><Smartphone className="size-[18px]" /></IconBtn>

        <div className={cn("mx-1 h-5 w-px", light ? "bg-neutral-200" : "bg-white/15")} />

        <Dialog.Root open={confirmDiscard} onOpenChange={setConfirmDiscard}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className={cn(
                "flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors",
                light ? "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900" : "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              Discard
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-black/50" />
            <Dialog.Content onCloseAutoFocus={(e) => e.preventDefault()} className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white p-6 text-neutral-900 shadow-xl duration-200">
              <Dialog.Title className="text-base font-semibold">Discard all changes?</Dialog.Title>
              <Dialog.Description className="mt-1.5 text-sm text-neutral-500">This resets everything to the default theme and can't be undone.</Dialog.Description>
              <div className="mt-5 flex justify-end gap-2">
                <Dialog.Close asChild>
                  <Button variant="outline" size="sm">Cancel</Button>
                </Dialog.Close>
                <Button variant="destructive" size="sm" onClick={() => { setConfirmDiscard(false); onDiscard() }}>Discard changes</Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <button
          type="button"
          onClick={onPublish}
          className="ml-0.5 flex h-9 items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          {published ? <Check className="size-4" /> : <UploadCloud className="size-4" />}
          {published ? "Published" : "Publish"}
        </button>
      </div>
    </div>
  )
}
