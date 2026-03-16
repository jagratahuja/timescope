"use client"

import { useState } from "react"
import { Plus, Timer, Hourglass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddEventDialog } from "@/components/add-event-dialog"
import { EditEventDialog } from "@/components/edit-event-dialog"
import { EventsGrid } from "@/components/events-grid"
import { useEvents } from "@/hooks/use-events"
import { MAX_EVENTS, type CountdownEvent } from "@/lib/timescope"

export function TimeScopeDashboard() {
  const { events, addEvent, removeEvent, updateEvent, hydrated } = useEvents()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CountdownEvent | null>(null)

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-violet-500/25 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="w-full px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Hourglass className="w-4 h-4 text-violet-400" />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground">
              TimeScope
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hydrated && (
              <span className="text-xs text-muted-foreground hidden sm:inline-block">
                {events.length} / {MAX_EVENTS} events
              </span>
            )}
            <Button
              onClick={() => setAddDialogOpen(true)}
              disabled={events.length >= MAX_EVENTS}
              size="sm"
              className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white hover:opacity-90 font-semibold gap-1.5 shadow-[0_0_16px_rgba(59,130,246,0.35)] border-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Event
            </Button>
          </div>
        </div>
      </header>

      {/* Hero - Only show when no events */}
      {hydrated && events.length === 0 && (
        <section className="relative border-b border-violet-500/25 bg-card/40 overflow-hidden">
          {/* Atmospheric glow orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#3b82f6]/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#a855f7]/15 blur-3xl" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center text-center gap-5">
            {/* Gradient badge/pill */}
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 text-xs font-medium tracking-wide uppercase">
              <Timer className="w-3.5 h-3.5 text-[#00d4ff]" />
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#00d4ff] bg-clip-text text-transparent">
                Live Countdown Dashboard
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
              Every second counts.{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] via-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent">
                Track them all.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty max-w-xl leading-relaxed">
              Add your most important events and watch the time tick down in real time. Sorted by closest deadline, updated every second.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <Button
                onClick={() => setAddDialogOpen(true)}
                disabled={events.length >= MAX_EVENTS}
                size="lg"
                className="bg-gradient-to-r from-[#3b82f6] to-[#a855f7] text-white hover:opacity-90 font-semibold gap-2 px-6 h-11 shadow-[0_0_24px_rgba(59,130,246,0.4)] border-0"
              >
                <Plus className="w-4 h-4" />
                Add Your First Event
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Main */}
      <main
        className={
          hydrated && events.length === 0
            ? "flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 flex items-center justify-center"
            : "flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8"
        }
      >
        {hydrated && events.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Your Countdowns</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Closest deadline first. Updates every second.</p>
          </div>
        )}
        <EventsGrid
          events={events}
          onRemove={removeEvent}
          onEdit={setEditingEvent}
          hydrated={hydrated}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-violet-500/25 bg-card/40 mt-auto">
        <div className="w-full px-4 sm:px-8 py-6 grid grid-cols-3 items-center text-sm text-muted-foreground">
          <span className="text-xs">v2.0</span>
          <div className="flex flex-col items-center gap-1">
            <span>
              Built with{" "}
              <span className="text-red-400" aria-label="love">
                ♥
              </span>{" "}
              by{" "}
              <span className="text-foreground font-medium">Jagrat Ahuja</span>
            </span>
            <span>© 2026 All rights reserved.</span>
          </div>
          <div />
        </div>
      </footer>

      <AddEventDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAdd={addEvent}
        currentCount={events.length}
      />
      <EditEventDialog
        event={editingEvent}
        open={editingEvent !== null}
        onOpenChange={(open) => { if (!open) setEditingEvent(null) }}
        onUpdate={updateEvent}
      />
    </div>
  )
}
