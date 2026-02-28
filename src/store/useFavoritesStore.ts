import { create } from '../lib/zustand'
import { persist } from '../lib/zustandPersist'
import type { ParsedEvent } from '../types/event'

interface FavoritesStore {
  favoriteArtists: string[]
  favoriteVenues: string[]
  toggleArtist: (artist: string) => void
  toggleVenue: (venue: string) => void
  isArtistFavorited: (artist: string) => boolean
  isVenueFavorited: (venue: string) => boolean
  isEventFavorited: (event: ParsedEvent) => boolean
}

function toggleValue(values: string[], value: string): string[] {
  if (values.includes(value)) {
    return values.filter((item) => item !== value)
  }

  return [...values, value]
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteArtists: [],
      favoriteVenues: [],
      toggleArtist: (artist) => {
        set((state) => ({
          favoriteArtists: toggleValue(state.favoriteArtists, artist),
        }))
      },
      toggleVenue: (venue) => {
        set((state) => ({
          favoriteVenues: toggleValue(state.favoriteVenues, venue),
        }))
      },
      isArtistFavorited: (artist) => get().favoriteArtists.includes(artist),
      isVenueFavorited: (venue) => get().favoriteVenues.includes(venue),
      isEventFavorited: (event) => {
        const state = get()
        return (
          state.favoriteArtists.includes(event.artist_event) ||
          state.favoriteVenues.includes(event.venue)
        )
      },
    }),
    {
      name: 'setlist-v2-favorites',
    },
  ),
)

export type { FavoritesStore }
