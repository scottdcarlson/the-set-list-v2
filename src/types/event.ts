export interface EventData {
  artist_event: string
  venue: string
  date: string // "Sat Feb 28"
  start_time: string // "7:30 PM"
  city: string
  category: string
}

export interface DateGroup {
  label: string
  events: EventData[]
  isTonightOrTomorrow: boolean
}
