import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventStore } from '../store/useEventStore'
import { useFavoritesStore } from '../store/useFavoritesStore'
import { EventCard } from '../components/EventCard'
import { EmptyState } from '../components/EmptyState'

export function FavoritesPage() {
  const navigate = useNavigate()
  const { events, fetchEvents } = useEventStore()
  const { favoriteArtists, favoriteVenues } = useFavoritesStore()

  // CRITICAL: Empty deps array
  useEffect(() => {
    void fetchEvents()
  }, [])

  const artistEvents = useMemo(() => {
    return events.filter((e) => favoriteArtists.includes(e.artist_event))
  }, [events, favoriteArtists])

  const venueEvents = useMemo(() => {
    return events.filter((e) => favoriteVenues.includes(e.venue))
  }, [events, favoriteVenues])

  const handleEventClick = (event: { artist_event: string; date: string }) => {
    const id = encodeURIComponent(`${event.artist_event}|${event.date}`)
    navigate(`/event/${id}`)
  }

  const isEmpty = favoriteArtists.length === 0 && favoriteVenues.length === 0

  if (isEmpty) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-[#F59E0B] mb-4">Favorites</h1>
        <div data-testid="empty-state">
          <EmptyState
            icon="❤️"
            title="No favorites yet"
            subtitle="Tap the ❤️ on events you love"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#F59E0B] mb-4">Favorites</h1>

      {favoriteArtists.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-3">Artists</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {favoriteArtists.map((artist) => (
              <span
                key={artist}
                className="bg-[#F59E0B]/20 text-[#F59E0B] px-3 py-1 rounded-full text-sm"
              >
                {artist}
              </span>
            ))}
          </div>
          {artistEvents.length > 0 && (
            <div className="flex flex-col gap-3">
              {artistEvents.map((event, idx) => (
                <EventCard
                  key={`${event.artist_event}-${idx}`}
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {favoriteVenues.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-[#F5F5F5] mb-3">Venues</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {favoriteVenues.map((venue) => (
              <span
                key={venue}
                className="bg-[#F59E0B]/20 text-[#F59E0B] px-3 py-1 rounded-full text-sm"
              >
                {venue}
              </span>
            ))}
          </div>
          {venueEvents.length > 0 && (
            <div className="flex flex-col gap-3">
              {venueEvents.map((event, idx) => (
                <EventCard
                  key={`${event.venue}-${idx}`}
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
