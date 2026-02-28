import { create } from '../lib/zustand'
import { groupEventsByDate, parseEvents } from '../lib/parseEvents'
import { isEventPast } from '../lib/dateUtils'
import type { ParsedEvent, RawEvent } from '../types/event'

interface EventStore {
  events: ParsedEvent[]
  isLoading: boolean
  error: string | null
  hidePastEvents: boolean
  fetchEvents: () => Promise<void>
  toggleHidePastEvents: () => void
  getEventBySlug: (slug: string) => ParsedEvent | undefined
  getFilteredEvents: () => ParsedEvent[]
  getGroupedEvents: () => Map<string, ParsedEvent[]>
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  isLoading: false,
  error: null,
  hidePastEvents: true,
  fetchEvents: async () => {
    if (get().isLoading) {
      return
    }

    set({ isLoading: true, error: null })

    try {
      const response = await fetch('/events_latest.json')
      if (!response.ok) {
        throw new Error(`Failed to load events (${response.status})`)
      }

      const rawEvents = (await response.json()) as RawEvent[]
      const parsedEvents = parseEvents(rawEvents)
      set({ events: parsedEvents, isLoading: false, error: null })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load events'
      set({ error: message, isLoading: false })
    }
  },
  toggleHidePastEvents: () => {
    set((state) => ({ hidePastEvents: !state.hidePastEvents }))
  },
  getEventBySlug: (slug) => {
    return get().events.find((event) => event.slug === slug)
  },
  getFilteredEvents: () => {
    const { events, hidePastEvents } = get()
    if (!hidePastEvents) {
      return events
    }

    return events.filter((event) => !isEventPast(event.parsedDate))
  },
  getGroupedEvents: () => {
    return groupEventsByDate(get().getFilteredEvents())
  },
}))

export type { EventStore }
