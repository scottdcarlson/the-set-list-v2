import { create } from 'zustand'
import type { EventData } from '../types/event'

interface EventStore {
  events: EventData[]
  loading: boolean
  error: string | null
  fetchEvents: () => Promise<void>
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  loading: false,
  error: null,
  fetchEvents: async () => {
    if (get().loading) return // guard against double-calls
    set({ loading: true, error: null })
    try {
      const res = await fetch('/events_latest.json')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: EventData[] = await res.json()
      set({ events: data, loading: false })
    } catch (e) {
      set({ error: (e as Error).message, loading: false })
    }
  },
}))
