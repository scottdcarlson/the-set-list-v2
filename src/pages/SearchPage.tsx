import { useEffect, useMemo, useState } from 'react'
import { EventCard } from '../components/events/EventCard'
import { EmptyState } from '../components/ui/EmptyState'
import { EventCardSkeleton } from '../components/ui/Skeleton'
import { createSearchIndex, searchEvents } from '../lib/search'
import { useEventStore } from '../store/useEventStore'
import type { ParsedEvent } from '../types/event'

export function SearchPage() {
  const events = useEventStore((state) => state.events)
  const isLoading = useEventStore((state) => state.isLoading)
  const fetchEvents = useEventStore((state) => state.fetchEvents)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ParsedEvent[]>([])

  useEffect(() => {
    if (events.length === 0) {
      void fetchEvents()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fuse = useMemo(() => createSearchIndex(events), [events])

  useEffect(() => {
    setResults(searchEvents(fuse, query))
  }, [fuse, query])

  const trimmedQuery = query.trim()
  const resultsText =
    trimmedQuery.length > 0
      ? `${results.length} results for "${trimmedQuery}"`
      : `${events.length} results`

  return (
    <div className='pb-24 text-text-primary'>
      <h1 className='px-4 pt-4 text-2xl font-black text-white'>Search 🔍</h1>

      <input
        type='text'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder='Artist, venue, city...'
        className='mx-4 mt-3 w-[calc(100%-2rem)] rounded-xl border border-white/10 bg-card px-4 py-3 text-white placeholder-text-muted focus:border-accent focus:outline-none'
      />

      <p className='mt-3 px-4 text-xs text-text-muted'>{resultsText}</p>

      {isLoading ? (
        <div className='space-y-2 px-4 pt-3'>
          {Array.from({ length: 4 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      ) : trimmedQuery.length === 0 ? (
        <EmptyState
          icon='🎵'
          title='Search Triangle music'
          subtitle='Find artists, venues, and shows'
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon='😶'
          title='No results'
          subtitle='Try a different search'
        />
      ) : (
        <div className='space-y-2 px-4 pt-3'>
          {results.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
