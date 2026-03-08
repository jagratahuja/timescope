"use client"

import { Timer } from "lucide-react"
import { CountdownCard } from "@/components/countdown-card"
import type { CountdownEvent } from "@/lib/timescope"

interface EventsGridProps {
  events: CountdownEvent[]
  onRemove: (id: string) => void
  onEdit: (event: CountdownEvent) => void
  hydrated: boolean
}

export function EventsGrid({ events, onRemove, onEdit, hydrated }: EventsGridProps) {
  if (!hydrated) {
    // Skeleton state while loading from localStorage
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-52 rounded-xl bg-card border border-surface-border animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
          <Timer className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-foreground">No events added yet</p>
          <p className="text-sm text-muted-foreground max-w-xs text-balance">
            Add your first countdown to start tracking time.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <CountdownCard key={event.id} event={event} onRemove={onRemove} onEdit={onEdit} />
      ))}
    </div>
  )
}
