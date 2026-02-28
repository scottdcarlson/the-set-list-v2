const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MILLIS_PER_DAY = 24 * 60 * 60 * 1000

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function parseEventDate(dateStr: string, timeStr: string): Date {
  const dateMatch = dateStr.match(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s+([A-Za-z]{3})\s+(\d{1,2})$/)
  if (!dateMatch) {
    return new Date(dateStr)
  }

  const [, dayLabel, monthLabel, dayOfMonthRaw] = dateMatch
  const monthIndex = MONTHS.indexOf(monthLabel)
  const weekdayIndex = DAYS_OF_WEEK.indexOf(dayLabel)
  const dayOfMonth = Number(dayOfMonthRaw)

  if (monthIndex === -1 || weekdayIndex === -1 || Number.isNaN(dayOfMonth)) {
    return new Date(dateStr)
  }

  const timeMatch = timeStr.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i)
  const hourRaw = timeMatch ? Number(timeMatch[1]) : 12
  const minutes = timeMatch?.[2] ? Number(timeMatch[2]) : 0
  const meridiem = timeMatch?.[3]?.toUpperCase() ?? 'AM'

  let hours = hourRaw % 12
  if (meridiem === 'PM') {
    hours += 12
  }

  const now = new Date()
  const currentYear = now.getFullYear()
  let parsed = new Date(currentYear, monthIndex, dayOfMonth, hours, minutes, 0, 0)

  if (parsed.getDay() !== weekdayIndex) {
    parsed = new Date(parsed.getTime())
  }

  const sixtyDaysAgo = now.getTime() - 60 * MILLIS_PER_DAY
  if (parsed.getTime() < sixtyDaysAgo) {
    parsed.setFullYear(parsed.getFullYear() + 1)
  }

  return parsed
}

export function getDateGroup(date: Date): string {
  const now = new Date()
  const today = startOfDay(now)
  const tomorrow = addDays(today, 1)
  const target = startOfDay(date)

  if (target.getTime() === today.getTime()) {
    return 'TONIGHT 🔥'
  }

  if (target.getTime() === tomorrow.getTime()) {
    return 'TOMORROW'
  }

  const currentDay = now.getDay()
  let saturday: Date
  let sunday: Date

  if (currentDay === 6) {
    saturday = today
    sunday = addDays(today, 1)
  } else if (currentDay === 0) {
    saturday = addDays(today, -1)
    sunday = today
  } else {
    const daysUntilSaturday = 6 - currentDay
    saturday = addDays(today, daysUntilSaturday)
    sunday = addDays(saturday, 1)
  }

  if (target >= saturday && target <= sunday) {
    return 'THIS WEEKEND'
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function isEventPast(date: Date): boolean {
  return date.getTime() < Date.now()
}
