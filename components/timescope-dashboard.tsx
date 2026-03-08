"use client"

import { useState } from "react"
import { Plus, Clock, Timer } from "lucide-react"
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
      <header className="border-b border-surface-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
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
              className="bg-primary text-primary-foreground hover:opacity-90 font-semibold gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Event
            </Button>
          </div>
        </div>
      </header>

      {/* Hero - Only show when no events */}
      {hydrated && events.length === 0 && (
        <section className="border-b border-surface-border bg-card/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center text-center gap-5">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium tracking-wide uppercase">
              <Timer className="w-3.5 h-3.5" />
              Live Countdown Dashboard
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.1]">
              Every second counts.{" "}
              <span
                className="text-primary"
                style={{ textShadow: "0 0 32px color-mix(in oklch, var(--primary) 45%, transparent)" }}
              >
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
                className="bg-primary text-primary-foreground hover:opacity-90 font-semibold gap-2 px-6 h-11"
              >
                <Plus className="w-4 h-4" />
                Add Your First Event
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Main */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10">
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
      <footer className="border-t border-surface-border bg-card/40 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
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
