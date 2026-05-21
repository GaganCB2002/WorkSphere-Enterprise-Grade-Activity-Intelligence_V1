import { useEffect, useRef } from 'react'
import { API_URL } from '../api/client'
import type { ActivityItem } from '../types'

export function useRealtimeFeed(token: string | null, onEvent: (item: ActivityItem) => void) {
  const onEventRef = useRef(onEvent)
  
  useEffect(() => {
    onEventRef.current = onEvent
  }, [onEvent])

  useEffect(() => {
    if (!token) {
      return
    }

    const source = new EventSource(`${API_URL}/api/events?token=${encodeURIComponent(token)}`)
    source.onmessage = (event) => {
      try {
        const item = JSON.parse(event.data) as ActivityItem
        onEventRef.current(item)
      } catch (err) {
        console.error('Failed to parse SSE payload:', err)
      }
    }

    return () => source.close()
  }, [token])
}
