"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  type CountdownEvent,
  EVENT_COLORS,
  COLOR_MAP,
} from "@/lib/timescope"

interface EditEventDialogProps {
  event: CountdownEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (id: string, patch: Partial<Pick<CountdownEvent, "name" | "color">>) => void
}

const COLOR_LABELS: Record<CountdownEvent["color"], string> = {
  cyan: "Cyan",
  blue: "Blue",
  green: "Green",
  purple: "Purple",
  amber: "Amber",
}

export function EditEventDialog({
  event,
  open,
  onOpenChange,
  onUpdate,
}: EditEventDialogProps) {
  const [name, setName] = useState("")
  const [color, setColor] = useState<CountdownEvent["color"]>("cyan")
  const [error, setError] = useState("")

  // Populate fields when the dialog opens with an event
  useEffect(() => {
    if (event) {
      setName(event.name)
      setColor(event.color)
      setError("")
    }
  }, [event, open])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!name.trim()) {
      setError("Please enter an event name.")
      return
    }
    if (!event) return
    onUpdate(event.id, { name: name.trim(), color })
    onOpenChange(false)
  }

  function handleClose(val: boolean) {
    if (!val) setError("")
    onOpenChange(val)
  }

  if (!event) return null

  const deadlineStr = new Date(event.deadline).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-surface-border text-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Edit Event
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the name or color. The deadline cannot be changed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-event-name" className="text-sm font-medium text-foreground">
              Event Name
            </Label>
            <Input
              id="edit-event-name"
              placeholder="e.g. Chemistry Exam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-surface-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              maxLength={60}
            />
          </div>

          {/* Deadline (read-only) */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-muted-foreground">
              Deadline <span className="text-xs">(cannot be changed)</span>
            </Label>
            <div className="px-3 py-2 rounded-md bg-secondary border border-surface-border text-sm text-muted-foreground select-none">
              {deadlineStr}
            </div>
          </div>

          {/* Color */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-foreground">Color</Label>
            <div className="flex gap-2 flex-wrap">
              {EVENT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                    COLOR_MAP[c].badge,
                    color === c
                      ? "ring-2 ring-offset-2 ring-offset-card scale-105"
                      : "opacity-60 hover:opacity-100"
                  )}
                  aria-pressed={color === c}
                  aria-label={`Select ${COLOR_LABELS[c]} color`}
                >
                  {COLOR_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p role="alert" className="text-sm text-destructive-foreground">
              {error}
            </p>
          )}

          <div className="flex gap-3 justify-end pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleClose(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:opacity-90 font-semibold"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
