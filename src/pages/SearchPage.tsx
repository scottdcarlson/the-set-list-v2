import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventStore } from '../store/useEventStore'
import { createEventSearch, searchEvents } from '../utils/search'
import { EventCard } from '../components/EventCard'

export function SearchPage() {
  const navigate = useNavigate()
  const { events, fetchEvents } = useEventStore()
  const [query, setQuery] = useState('')

  // CRITICAL: Empty deps array
  useEffect(() => {
    void fetchEvents()
  }, [])

  const fuse = useMemo(() => createEventSearch(events), [events])
  const results = useMemo(() => searchEvents(fuse, query), [fuse, query])

  const handleEventClick = (event: { artist_event: string; date: string }) => {
    const id = encodeURIComponent(`${event.artist_event}|${event.date}`)
    navigate(`/event/${id}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#F59E0B] mb-4">Search</h1>
      <input
        type="text"
        placeholder="Search artists, venues, cities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-[#1A1A1A] text-[#F5F5F5] rounded-xl px-4 py-3 w-full border border-[#333] focus:border-[#F59E0B] outline-none mb-4"
        data-testid="search-input"
      />
      <div className="flex flex-col gap-3">
        {results.map((event, idx) => (
          <EventCard
            key={`${event.artist_event}-${idx}`}
            event={event}
            onClick={() => handleEventClick(event)}
          />
        ))}
      </div>
      {query && results.length === 0 && (
        <p className="text-[#9CA3AF]">No results found for "{query}"</p>
      )}
    </div>
  )
}
