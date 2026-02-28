import type { EventData } from '../types/event'

const MONTHS: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
}

function parseEventDateTime(event: EventData): { start: Date; end: Date } {
  // Parse "Sat Feb 28" and "8:00 PM"
  const dateParts = event.date.split(' ')
  const month = MONTHS[dateParts[1]] || '01'
  const day = dateParts[2].padStart(2, '0')
  const year = new Date().getFullYear()

  // Parse time "8:00 PM"
  const timeMatch = event.start_time.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hour = 19
  let minute = 0

  if (timeMatch) {
    hour = parseInt(timeMatch[1], 10)
    minute = parseInt(timeMatch[2], 10)
    const isPM = timeMatch[3].toUpperCase() === 'PM'
    if (isPM && hour !== 12) hour += 12
    if (!isPM && hour === 12) hour = 0
  }

  const start = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10), hour, minute)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000) // 2h duration

  return { start, end }
}

function formatICSDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    '00'
  )
}

export function generateICS(event: EventData): string {
  const { start, end } = parseEventDateTime(event)
  const uid = `${event.artist_event}-${event.date}@setlist.app`.replace(/\s/g, '-')

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The Set List//EN
BEGIN:VEVENT
UID:${uid}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${event.artist_event}
LOCATION:${event.venue}, ${event.city}
DESCRIPTION:${event.category} show at ${event.venue}
END:VEVENT
END:VCALENDAR`
}

export function generateGoogleCalURL(event: EventData): string {
  const { start, end } = parseEventDateTime(event)
  const formatGCal = (d: Date) => formatICSDate(d)

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.artist_event,
    dates: `${formatGCal(start)}/${formatGCal(end)}`,
    location: `${event.venue}, ${event.city}`,
    details: `${event.category} show at ${event.venue}`,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
