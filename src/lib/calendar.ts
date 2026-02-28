import type { ParsedEvent } from '../types/event'

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function formatLocalIcsDate(date: Date): string {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  return `${year}${month}${day}T${hours}${minutes}${seconds}`
}

function formatUtcDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function getEventEndDate(event: ParsedEvent): Date {
  return new Date(event.parsedDate.getTime() + 2 * 60 * 60 * 1000)
}

export function downloadIcs(event: ParsedEvent): void {
  const endDate = getEventEndDate(event)
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Set List v2//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.slug}@thesetlist.app`,
    `DTSTAMP:${formatUtcDate(new Date())}`,
    `DTSTART:${formatLocalIcsDate(event.parsedDate)}`,
    `DTEND:${formatLocalIcsDate(endDate)}`,
    `SUMMARY:${escapeIcs(event.artist_event)}`,
    `LOCATION:${escapeIcs(`${event.venue}, ${event.city}`)}`,
    `DESCRIPTION:${escapeIcs(event.category)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `${event.slug}.ics`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export function getGoogleCalendarUrl(event: ParsedEvent): string {
  const endDate = getEventEndDate(event)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.artist_event,
    dates: `${formatUtcDate(event.parsedDate)}/${formatUtcDate(endDate)}`,
    location: `${event.venue}, ${event.city}`,
    details: event.category,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
