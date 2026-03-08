"use client"

import { useState, useEffect } from "react"
import { loadEvents, saveEvents, sortByDeadline, type CountdownEvent } from "@/lib/timescope"

export function useEvents() {
  const [events, setEvents] = useState<CountdownEvent[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setEvents(sortByDeadline(loadEvents()))
    setHydrated(true)
  }, [])

  function addEvent(event: CountdownEvent) {
    setEvents((prev) => {
      const next = sortByDeadline([...prev, event])
      saveEvents(next)
      return next
    })
  }

  function removeEvent(id: string) {
    setEvents((prev) => {
      const next = prev.filter((e) => e.id !== id)
      saveEvents(next)
      return next
    })
  }

  function updateEvent(id: string, patch: Partial<Pick<CountdownEvent, "name" | "color">>) {
    setEvents((prev) => {
      const next = sortByDeadline(
        prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
      )
      saveEvents(next)
      return next
    })
  }

  return { events, addEvent, removeEvent, updateEvent, hydrated }
}
