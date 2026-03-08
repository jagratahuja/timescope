"use client"

import { useState } from "react"
import { nanoid } from "nanoid"
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
  MAX_EVENTS,
} from "@/lib/timescope"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (event: CountdownEvent) => void
  currentCount: number
}

const COLOR_LABELS: Record<CountdownEvent["color"], string> = {
  cyan: "Cyan",
  blue: "Blue",
  green: "Green",
  purple: "Purple",
  amber: "Amber",
}

export function AddEventDialog({
  open,
  onOpenChange,
  onAdd,
  currentCount,
}: AddEventDialogProps) {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [color, setColor] = useState<CountdownEvent["color"]>("cyan")
  const [error, setError] = useState("")

  function reset() {
    setName("")
    setDate("")
    setTime("")
    setColor("cyan")
    setError("")
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Please enter an event name.")
      return
    }
    if (!date) {
      setError("Please select a date.")
      return
    }

    const dateTimeStr = time ? `${date}T${time}` : `${date}T23:59:59`
    const deadline = new Date(dateTimeStr).getTime()

    if (isNaN(deadline)) {
      setError("Invalid date or time.")
      return
    }

    if (deadline <= Date.now()) {
      setError("Deadline must be in the future.")
      return
    }

    if (currentCount >= MAX_EVENTS) {
      setError(`Maximum of ${MAX_EVENTS} events allowed.`)
      return
    }

    const event: CountdownEvent = {
      id: nanoid(),
      name: name.trim(),
      deadline,
      createdAt: Date.now(),
      color,
    }
    onAdd(event)
    reset()
    onOpenChange(false)
  }

  function handleClose(val: boolean) {
    if (!val) reset()
    onOpenChange(val)
  }

  // Min date = today
  const today = new Date().toISOString().split("T")[0]

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-surface-border text-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            New Countdown
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new event to track in your dashboard.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-name" className="text-sm font-medium text-foreground">
              Event Name
            </Label>
            <Input
              id="event-name"
              placeholder="e.g. Chemistry Exam"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-surface-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              maxLength={60}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-date" className="text-sm font-medium text-foreground">
                Date
              </Label>
              <Input
                id="event-date"
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                className="bg-secondary border-surface-border text-foreground [color-scheme:dark] focus-visible:ring-primary"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="event-time" className="text-sm font-medium text-muted-foreground">
                Time{" "}
                <span className="text-xs text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="event-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-secondary border-surface-border text-foreground [color-scheme:dark] focus-visible:ring-primary"
              />
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
                  style={
                    color === c
                      ? { ringColor: "currentColor" }
                      : undefined
                  }
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

          {/* Limit warning */}
          {currentCount >= MAX_EVENTS && (
            <p className="text-sm text-amber-400">
              You've reached the maximum of {MAX_EVENTS} events.
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
              disabled={currentCount >= MAX_EVENTS}
              className="bg-primary text-primary-foreground hover:opacity-90 font-semibold"
            >
              Add Countdown
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
