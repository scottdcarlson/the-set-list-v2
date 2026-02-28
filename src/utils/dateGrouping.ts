import type { EventData, DateGroup } from '../types/event'

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

export function parseEventDate(dateStr: string, now: Date = new Date()): Date {
  // Parse "Sat Feb 28" → Date object
  const parts = dateStr.split(' ')
  if (parts.length < 3) {
    return new Date(NaN)
  }

  const monthStr = parts[1]
  const day = parseInt(parts[2], 10)
  const month = MONTHS[monthStr]

  if (month === undefined || isNaN(day)) {
    return new Date(NaN)
  }

  let year = now.getFullYear()
  const parsed = new Date(year, month, day)

  // If parsed date is > 60 days in the past, use next year
  const diffMs = now.getTime() - parsed.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  if (diffDays > 60) {
    year += 1
    return new Date(year, month, day)
  }

  return parsed
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

function getNextDay(date: Date): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + 1)
  return next
}

function isThisWeekend(eventDate: Date, now: Date): boolean {
  // Get the Saturday and Sunday of the current week
  const dayOfWeek = now.getDay() // 0 = Sunday, 6 = Saturday

  // Find this week's Saturday
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7
  const saturday = new Date(now)
  saturday.setDate(now.getDate() + daysUntilSaturday)
  saturday.setHours(0, 0, 0, 0)

  // Find this week's Sunday (day after Saturday)
  const sunday = new Date(saturday)
  sunday.setDate(saturday.getDate() + 1)

  const eventDay = eventDate.getDay()
  return (
    (eventDay === 6 && isSameDay(eventDate, saturday)) ||
    (eventDay === 0 && isSameDay(eventDate, sunday))
  )
}

export function getDateGroupLabel(date: Date, now: Date = new Date()): string {
  // Same calendar day as now → "TONIGHT 🔥"
  if (isSameDay(date, now)) {
    return 'TONIGHT 🔥'
  }

  // Next calendar day → "TOMORROW"
  const tomorrow = getNextDay(now)
  if (isSameDay(date, tomorrow)) {
    return 'TOMORROW'
  }

  // Same week Saturday or Sunday (not today/tomorrow) → "THIS WEEKEND"
  if (isThisWeekend(date, now)) {
    return 'THIS WEEKEND'
  }

  // Otherwise → format like "Monday, March 2"
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
  const monthName = date.toLocaleDateString('en-US', { month: 'long' })
  const dayNum = date.getDate()

  return `${dayName}, ${monthName} ${dayNum}`
}

export function groupEventsByDate(
  events: EventData[],
  now: Date = new Date()
): DateGroup[] {
  if (events.length === 0) {
    return []
  }

  // Parse and sort events chronologically
  const eventsWithDates = events.map((event) => ({
    event,
    parsed: parseEventDate(event.date, now),
  }))

  eventsWithDates.sort((a, b) => a.parsed.getTime() - b.parsed.getTime())

  // Group by label
  const groupMap = new Map<string, EventData[]>()
  const labelOrder: string[] = []

  for (const { event, parsed } of eventsWithDates) {
    const label = getDateGroupLabel(parsed, now)

    if (!groupMap.has(label)) {
      groupMap.set(label, [])
      labelOrder.push(label)
    }

    groupMap.get(label)!.push(event)
  }

  // Build result array
  return labelOrder.map((label) => ({
    label,
    events: groupMap.get(label)!,
    isTonightOrTomorrow: label === 'TONIGHT 🔥' || label === 'TOMORROW',
  }))
}
