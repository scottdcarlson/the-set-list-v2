import Fuse from 'fuse.js'
import type { EventData } from '../types/event'

export interface EventSearch {
  fuse: Fuse<EventData>
  events: EventData[]
}

export function createEventSearch(events: EventData[]): EventSearch {
  return {
    fuse: new Fuse(events, {
      keys: ['artist_event', 'venue', 'category', 'city'],
      threshold: 0.4,
    }),
    events,
  }
}

export function searchEvents(search: EventSearch, query: string): EventData[] {
  if (!query.trim()) {
    return search.events
  }
  return search.fuse.search(query).map((r) => r.item)
}
