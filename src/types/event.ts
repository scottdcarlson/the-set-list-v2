export interface RawEvent {
  artist_event: string;
  venue: string;
  date: string;
  start_time: string;
  city: string;
  category: string;
}

export interface ParsedEvent extends RawEvent {
  id: string;
  slug: string;
  parsedDate: Date;
}
