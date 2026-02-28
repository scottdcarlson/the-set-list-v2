import { describe, it, expect } from 'vitest'
import {
  parseEventDate,
  getDateGroupLabel,
  groupEventsByDate,
} from '../dateGrouping'
import type { EventData } from '../../types/event'

// Fixed reference date: Saturday Feb 28 2026 at 6pm
const NOW = new Date('2026-02-28T18:00:00')

describe('parseEventDate', () => {
  it('parses "Sat Feb 28" to Feb 28 of current year', () => {
    const result = parseEventDate('Sat Feb 28', NOW)
    expect(result.getMonth()).toBe(1) // February
    expect(result.getDate()).toBe(28)
    expect(result.getFullYear()).toBe(2026)
  })

  it('parses "Sun Mar 01" to Mar 1 of current year', () => {
    const result = parseEventDate('Sun Mar 01', NOW)
    expect(result.getMonth()).toBe(2) // March
    expect(result.getDate()).toBe(1)
    expect(result.getFullYear()).toBe(2026)
  })

  it('rolls over to next year if date is >60 days in the past', () => {
    // Dec 1 is ~89 days before Feb 28
    const result = parseEventDate('Mon Dec 01', NOW)
    expect(result.getFullYear()).toBe(2026)
  })

  it('returns invalid date for malformed input', () => {
    const result = parseEventDate('invalid', NOW)
    expect(isNaN(result.getTime())).toBe(true)
  })
})

describe('getDateGroupLabel', () => {
  it('returns "TONIGHT 🔥" for same day', () => {
    const date = new Date('2026-02-28T20:00:00')
    expect(getDateGroupLabel(date, NOW)).toBe('TONIGHT 🔥')
  })

  it('returns "TOMORROW" for next day', () => {
    const date = new Date('2026-03-01T20:00:00')
    expect(getDateGroupLabel(date, NOW)).toBe('TOMORROW')
  })

  it('returns formatted date for Mon Mar 02', () => {
    const date = new Date('2026-03-02T20:00:00')
    expect(getDateGroupLabel(date, NOW)).toBe('Monday, March 2')
  })

  it('returns "THIS WEEKEND" for Saturday when today is not Saturday', () => {
    // Test from a Thursday perspective
    const thursday = new Date('2026-02-26T18:00:00')
    const saturday = new Date('2026-02-28T20:00:00')
    expect(getDateGroupLabel(saturday, thursday)).toBe('THIS WEEKEND')
  })
})

describe('groupEventsByDate', () => {
  it('returns empty array for empty input', () => {
    expect(groupEventsByDate([], NOW)).toEqual([])
  })

  it('groups events by date label', () => {
    const events: EventData[] = [
      {
        artist_event: 'Band A',
        venue: 'Venue 1',
        date: 'Sat Feb 28',
        start_time: '8:00 PM',
        city: 'Durham',
        category: 'Rock',
      },
      {
        artist_event: 'Band B',
        venue: 'Venue 2',
        date: 'Sun Mar 01',
        start_time: '9:00 PM',
        city: 'Raleigh',
        category: 'Jazz',
      },
    ]

    const result = groupEventsByDate(events, NOW)

    expect(result).toHaveLength(2)
    expect(result[0].label).toBe('TONIGHT 🔥')
    expect(result[0].events).toHaveLength(1)
    expect(result[0].isTonightOrTomorrow).toBe(true)
    expect(result[1].label).toBe('TOMORROW')
    expect(result[1].events).toHaveLength(1)
    expect(result[1].isTonightOrTomorrow).toBe(true)
  })

  it('sets isTonightOrTomorrow correctly', () => {
    const events: EventData[] = [
      {
        artist_event: 'Band A',
        venue: 'Venue 1',
        date: 'Sat Feb 28',
        start_time: '8:00 PM',
        city: 'Durham',
        category: 'Rock',
      },
      {
        artist_event: 'Band B',
        venue: 'Venue 2',
        date: 'Mon Mar 02',
        start_time: '9:00 PM',
        city: 'Raleigh',
        category: 'Jazz',
      },
    ]

    const result = groupEventsByDate(events, NOW)

    expect(result[0].isTonightOrTomorrow).toBe(true) // Tonight
    expect(result[1].isTonightOrTomorrow).toBe(false) // Monday
  })

  it('sorts events chronologically', () => {
    const events: EventData[] = [
      {
        artist_event: 'Band B',
        venue: 'Venue 2',
        date: 'Sun Mar 01',
        start_time: '9:00 PM',
        city: 'Raleigh',
        category: 'Jazz',
      },
      {
        artist_event: 'Band A',
        venue: 'Venue 1',
        date: 'Sat Feb 28',
        start_time: '8:00 PM',
        city: 'Durham',
        category: 'Rock',
      },
    ]

    const result = groupEventsByDate(events, NOW)

    expect(result[0].label).toBe('TONIGHT 🔥')
    expect(result[1].label).toBe('TOMORROW')
  })
})
