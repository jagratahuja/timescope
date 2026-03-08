"use client"

import { useEffect, useState } from "react"
import { getTimeRemaining, type TimeRemaining } from "@/lib/timescope"

export function useCountdown(deadline: number): TimeRemaining {
  const [time, setTime] = useState<TimeRemaining>(() => getTimeRemaining(deadline))

  useEffect(() => {
    const update = () => setTime(getTimeRemaining(deadline))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [deadline])

  return time
}
