"use client"

import { Trash2, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCountdown } from "@/hooks/use-countdown"
import {
  type CountdownEvent,
  COLOR_MAP,
  getProgress,
} from "@/lib/timescope"

interface CountdownCardProps {
  event: CountdownEvent
  onRemove: (id: string) => void
  onEdit: (event: CountdownEvent) => void
}

function TimeUnit({
  value,
  label,
  color,
}: {
  value: number
  label: string
  color: string
}) {
  return (
    <div className="flex flex-col items-center min-w-[48px]">
      <span
        className={cn(
          "text-2xl font-mono font-bold leading-none tabular-nums",
          color
        )}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] font-medium text-muted-foreground mt-1 uppercase tracking-widest">
        {label}
      </span>
    </div>
  )
}

export function CountdownCard({ event, onRemove, onEdit }: CountdownCardProps) {
  const time = useCountdown(event.deadline)
  const progress = getProgress(event)
  const colors = COLOR_MAP[event.color]

  return (
    <article
      className={cn(
        "relative flex flex-col gap-4 rounded-xl p-5 border transition-all",
        "bg-card border-surface-border",
        colors.glow
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h2
            className="font-semibold text-base text-foreground leading-tight truncate"
            title={event.name}
          >
            {event.name}
          </h2>
          <p className="text-xs text-muted-foreground">
            {new Date(event.deadline).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Edit — only shown when event is still active */}
          {!time.expired && (
            <button
              onClick={() => onEdit(event)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label={`Edit ${event.name}`}
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}

          {/* Delete — highlighted red when expired */}
          <button
            onClick={() => onRemove(event.id)}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              time.expired
                ? "text-destructive-foreground bg-destructive/20 hover:bg-destructive/40 ring-1 ring-destructive/40"
                : "text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/20"
            )}
            aria-label={`Remove ${event.name}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Countdown */}
      {time.expired ? (
        <div className="flex items-center justify-center py-2">
          <span
            className={cn(
              "text-sm font-semibold px-3 py-1 rounded-full border",
              colors.badge
            )}
          >
            Event has passed
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-3 py-1">
          <TimeUnit value={time.days} label="Days" color={colors.text} />
          <Separator />
          <TimeUnit value={time.hours} label="Hrs" color={colors.text} />
          <Separator />
          <TimeUnit value={time.minutes} label="Min" color={colors.text} />
          <Separator />
          <TimeUnit value={time.seconds} label="Sec" color={colors.text} />
        </div>
      )}

      {/* Progress bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-1000", colors.bar)}
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${event.name} progress`}
          />
        </div>
      </div>
    </article>
  )
}

function Separator() {
  return (
    <span className="text-xl font-bold text-muted-foreground/50 mb-4 select-none">:</span>
  )
}

