import type { ParsedEvent, RawEvent } from '../types/event'
import { getDateGroup, parseEventDate } from './dateUtils'
import { generateEventId, slugify } from './slugify'

export function parseEvents(raw: RawEvent[]): ParsedEvent[] {
  return raw
    .map((event) => {
      const parsedDate = parseEventDate(event.date, event.start_time)
      const id = generateEventId(event.artist_event, event.date)
      const slug = slugify(`${event.artist_event}-${event.venue}-${event.date}`)

      return {
        ...event,
        id,
        slug,
        parsedDate,
      }
    })
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
}

export function groupEventsByDate(events: ParsedEvent[]): Map<string, ParsedEvent[]> {
  const grouped = new Map<string, ParsedEvent[]>()

  for (const event of events) {
    const label = getDateGroup(event.parsedDate)
    const list = grouped.get(label)

    if (list) {
      list.push(event)
    } else {
      grouped.set(label, [event])
    }
  }

  return grouped
}
