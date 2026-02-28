import Fuse from 'fuse.js'
import type { ParsedEvent } from '../types/event'

export function createSearchIndex(events: ParsedEvent[]): Fuse<ParsedEvent> {
  return new Fuse(events, {
    keys: ['artist_event', 'venue', 'city', 'category'],
    threshold: 0.3,
    includeScore: true,
  })
}

export function searchEvents(fuse: Fuse<ParsedEvent>, query: string): ParsedEvent[] {
  const normalizedQuery = query.trim()
  if (normalizedQuery.length < 2) {
    return []
  }

  return fuse.search(normalizedQuery).map((result) => result.item)
}
