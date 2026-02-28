import { describe, it, expect } from 'vitest'
import { generateICS, generateGoogleCalURL } from '../calendar'
import type { EventData } from '../../types/event'

const mockEvent: EventData = {
  artist_event: 'The Mountain Goats',
  venue: "Cat's Cradle",
  date: 'Sat Feb 28',
  start_time: '8:00 PM',
  city: 'Carrboro',
  category: 'Indie',
}

describe('calendar', () => {
  describe('generateICS', () => {
    it('generates valid ICS with VEVENT', () => {
      const ics = generateICS(mockEvent)
      expect(ics).toContain('BEGIN:VCALENDAR')
      expect(ics).toContain('BEGIN:VEVENT')
      expect(ics).toContain('END:VEVENT')
      expect(ics).toContain('END:VCALENDAR')
    })

    it('includes event details', () => {
      const ics = generateICS(mockEvent)
      expect(ics).toContain('SUMMARY:The Mountain Goats')
      expect(ics).toContain("LOCATION:Cat's Cradle, Carrboro")
      expect(ics).toContain('DTSTART:')
      expect(ics).toContain('DTEND:')
    })

    it('includes UID', () => {
      const ics = generateICS(mockEvent)
      expect(ics).toContain('UID:')
    })
  })

  describe('generateGoogleCalURL', () => {
    it('generates valid Google Calendar URL', () => {
      const url = generateGoogleCalURL(mockEvent)
      expect(url).toContain('https://calendar.google.com/calendar/render')
      expect(url).toContain('action=TEMPLATE')
    })

    it('includes event text', () => {
      const url = generateGoogleCalURL(mockEvent)
      expect(url).toContain('text=The+Mountain+Goats')
    })

    it('includes dates parameter', () => {
      const url = generateGoogleCalURL(mockEvent)
      expect(url).toContain('dates=')
    })

    it('includes location', () => {
      const url = generateGoogleCalURL(mockEvent)
      expect(url).toContain('location=')
      expect(url).toContain('Carrboro')
    })
  })
})
