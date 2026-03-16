export const MAX_EVENTS = 10

export interface CountdownEvent {
  id: string
  name: string
  deadline: number // unix ms
  createdAt: number // unix ms
  color: "cyan" | "blue" | "green" | "purple" | "amber"
}

export const EVENT_COLORS: CountdownEvent["color"][] = [
  "cyan",
  "blue",
  "green",
  "purple",
  "amber",
]

export const COLOR_MAP: Record<
  CountdownEvent["color"],
  { bar: string; glow: string; badge: string; text: string; topAccent: string }
> = {
  cyan: {
    bar: "bg-cyan-400",
    glow: "shadow-[0_0_18px_2px_rgba(0,212,255,0.3)]",
    badge: "bg-cyan-400/10 text-cyan-400 border-cyan-400/20",
    text: "text-cyan-400",
    topAccent: "from-transparent via-cyan-400/60 to-transparent",
  },
  blue: {
    bar: "bg-blue-400",
    glow: "shadow-[0_0_18px_2px_rgba(96,165,250,0.25)]",
    badge: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    text: "text-blue-400",
    topAccent: "from-transparent via-blue-400/60 to-transparent",
  },
  green: {
    bar: "bg-emerald-400",
    glow: "shadow-[0_0_18px_2px_rgba(52,211,153,0.25)]",
    badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    text: "text-emerald-400",
    topAccent: "from-transparent via-emerald-400/60 to-transparent",
  },
  purple: {
    bar: "bg-violet-400",
    glow: "shadow-[0_0_18px_2px_rgba(168,85,247,0.3)]",
    badge: "bg-violet-400/10 text-violet-400 border-violet-400/20",
    text: "text-violet-400",
    topAccent: "from-transparent via-violet-400/60 to-transparent",
  },
  amber: {
    bar: "bg-amber-400",
    glow: "shadow-[0_0_18px_2px_rgba(251,191,36,0.25)]",
    badge: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    text: "text-amber-400",
    topAccent: "from-transparent via-amber-400/60 to-transparent",
  },
}

export interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
  expired: boolean
}

export function getTimeRemaining(deadline: number): TimeRemaining {
  const now = Date.now()
  const total = deadline - now
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0, expired: true }
  }
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  return { days, hours, minutes, seconds, total, expired: false }
}

export function getProgress(event: CountdownEvent): number {
  const now = Date.now()
  const totalDuration = event.deadline - event.createdAt
  if (totalDuration <= 0) return 100
  const timePassed = now - event.createdAt
  const progress = (timePassed / totalDuration) * 100
  return Math.min(100, Math.max(0, progress))
}

const STORAGE_KEY = "timescope_events"

export function loadEvents(): CountdownEvent[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CountdownEvent[]
  } catch {
    return []
  }
}

export function saveEvents(events: CountdownEvent[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export function sortByDeadline(events: CountdownEvent[]): CountdownEvent[] {
  return [...events].sort((a, b) => a.deadline - b.deadline)
}
