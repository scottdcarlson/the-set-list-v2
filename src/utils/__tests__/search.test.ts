import { describe, it, expect } from 'vitest'
import { createEventSearch, searchEvents } from '../search'
import type { EventData } from '../../types/event'

const mockEvents: EventData[] = [
  {
    artist_event: 'The Mountain Goats',
    venue: "Cat's Cradle",
    date: 'Sat Feb 28',
    start_time: '8:00 PM',
    city: 'Carrboro',
    category: 'Indie',
  },
  {
    artist_event: 'Sylvan Esso',
    venue: 'Motorco',
    date: 'Sun Mar 01',
    start_time: '9:00 PM',
    city: 'Durham',
    category: 'Electronic',
  },
]

describe('search', () => {
  it('fuzzy finds matches', () => {
    const fuse = createEventSearch(mockEvents)
    const results = searchEvents(fuse, 'mountain')
    expect(results).toHaveLength(1)
    expect(results[0].artist_event).toBe('The Mountain Goats')
  })

  it('returns all events for empty query', () => {
    const fuse = createEventSearch(mockEvents)
    const results = searchEvents(fuse, '')
    expect(results).toHaveLength(2)
  })

  it('searches by venue', () => {
    const fuse = createEventSearch(mockEvents)
    const results = searchEvents(fuse, 'motorco')
    expect(results).toHaveLength(1)
    expect(results[0].venue).toBe('Motorco')
  })

  it('searches by city', () => {
    const fuse = createEventSearch(mockEvents)
    const results = searchEvents(fuse, 'durham')
    expect(results).toHaveLength(1)
    expect(results[0].city).toBe('Durham')
  })

  it('returns empty array for no matches', () => {
    const fuse = createEventSearch(mockEvents)
    const results = searchEvents(fuse, 'zzzznonexistent')
    expect(results).toHaveLength(0)
  })
})
