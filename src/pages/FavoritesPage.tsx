import { useEffect, useMemo } from 'react'
import { EventCard } from '../components/events/EventCard'
import { EmptyState } from '../components/ui/EmptyState'
import { isEventPast } from '../lib/dateUtils'
import { useEventStore } from '../store/useEventStore'
import { useFavoritesStore } from '../store/useFavoritesStore'

export function FavoritesPage() {
  const events = useEventStore((state) => state.events)
  const fetchEvents = useEventStore((state) => state.fetchEvents)

  const favoriteArtists = useFavoritesStore((state) => state.favoriteArtists)
  const favoriteVenues = useFavoritesStore((state) => state.favoriteVenues)
  const toggleArtist = useFavoritesStore((state) => state.toggleArtist)
  const toggleVenue = useFavoritesStore((state) => state.toggleVenue)

  useEffect(() => {
    if (events.length === 0) {
      void fetchEvents()
    }
  }, [events.length, fetchEvents])

  const hasFavorites = favoriteArtists.length > 0 || favoriteVenues.length > 0

  const upcomingForFavorites = useMemo(
    () =>
      events.filter(
        (event) =>
          !isEventPast(event.parsedDate) &&
          (favoriteArtists.includes(event.artist_event) || favoriteVenues.includes(event.venue)),
      ),
    [events, favoriteArtists, favoriteVenues],
  )

  return (
    <div className='pb-24 text-text-primary'>
      <h1 className='px-4 pt-4 text-2xl font-black text-white'>Favorites ♥</h1>
      <p className='mt-1 px-4 text-sm text-text-muted'>Your saved artists and venues</p>

      {!hasFavorites ? (
        <EmptyState
          icon='♡'
          title='No favorites yet'
          subtitle='Tap ♥ on any show to save artists and venues'
        />
      ) : (
        <>
          {favoriteArtists.length > 0 ? (
            <section>
              <h2 className='mb-2 mt-4 px-4 text-sm font-bold uppercase tracking-widest text-text-muted'>
                🎤 Artists
              </h2>
              <div className='scrollbar-hide overflow-x-auto px-4'>
                <div className='flex w-max gap-2 pb-1'>
                  {favoriteArtists.map((artist) => (
                    <span
                      key={artist}
                      className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-card px-3 py-1 text-sm text-white'
                    >
                      {artist}
                      <button
                        type='button'
                        onClick={() => toggleArtist(artist)}
                        className='text-text-muted transition hover:text-white'
                        aria-label={`Remove ${artist} from favorites`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {favoriteVenues.length > 0 ? (
            <section>
              <h2 className='mb-2 mt-4 px-4 text-sm font-bold uppercase tracking-widest text-text-muted'>
                📍 Venues
              </h2>
              <div className='scrollbar-hide overflow-x-auto px-4'>
                <div className='flex w-max gap-2 pb-1'>
                  {favoriteVenues.map((venue) => (
                    <span
                      key={venue}
                      className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-card px-3 py-1 text-sm text-white'
                    >
                      {venue}
                      <button
                        type='button'
                        onClick={() => toggleVenue(venue)}
                        className='text-text-muted transition hover:text-white'
                        aria-label={`Remove ${venue} from favorites`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section>
            <h2 className='mb-2 mt-6 px-4 text-lg font-bold text-white'>Upcoming Shows</h2>

            {upcomingForFavorites.length === 0 ? (
              <p className='px-4 text-sm text-text-muted'>No upcoming shows for your favorites</p>
            ) : (
              <div className='space-y-2 px-4'>
                {upcomingForFavorites.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
