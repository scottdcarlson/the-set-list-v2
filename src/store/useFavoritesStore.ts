import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  favoriteArtists: string[]
  favoriteVenues: string[]
  toggleArtist: (artist: string) => void
  toggleVenue: (venue: string) => void
  isArtistFavorite: (artist: string) => boolean
  isVenueFavorite: (venue: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteArtists: [],
      favoriteVenues: [],
      toggleArtist: (artist: string) => {
        const current = get().favoriteArtists
        if (current.includes(artist)) {
          set({ favoriteArtists: current.filter((a) => a !== artist) })
        } else {
          set({ favoriteArtists: [...current, artist] })
        }
      },
      toggleVenue: (venue: string) => {
        const current = get().favoriteVenues
        if (current.includes(venue)) {
          set({ favoriteVenues: current.filter((v) => v !== venue) })
        } else {
          set({ favoriteVenues: [...current, venue] })
        }
      },
      isArtistFavorite: (artist: string) => get().favoriteArtists.includes(artist),
      isVenueFavorite: (venue: string) => get().favoriteVenues.includes(venue),
    }),
    { name: 'setlist-favorites' }
  )
)
