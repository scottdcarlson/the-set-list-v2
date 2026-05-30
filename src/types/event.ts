export interface EventData {
  artist_event: string
  venue: string
  date: string // "Sat May 30"
  start_time: string // "7:30 PM"
  end_time?: string
  location?: string
  city: string
  category: string
}

export interface DateGroup {
  label: string
  events: EventData[]
  isTonightOrTomorrow: boolean
}
