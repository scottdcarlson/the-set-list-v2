import { describe, it, expect, beforeEach } from 'vitest'
import { useFavoritesStore } from '../useFavoritesStore'

describe('useFavoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({
      favoriteArtists: [],
      favoriteVenues: [],
    })
  })

  it('has empty initial state', () => {
    const state = useFavoritesStore.getState()
    expect(state.favoriteArtists).toEqual([])
    expect(state.favoriteVenues).toEqual([])
  })

  it('toggleArtist adds artist when not in list', () => {
    useFavoritesStore.getState().toggleArtist('The Mountain Goats')
    expect(useFavoritesStore.getState().favoriteArtists).toContain('The Mountain Goats')
  })

  it('toggleArtist removes artist when in list', () => {
    useFavoritesStore.setState({ favoriteArtists: ['The Mountain Goats'] })
    useFavoritesStore.getState().toggleArtist('The Mountain Goats')
    expect(useFavoritesStore.getState().favoriteArtists).not.toContain('The Mountain Goats')
  })

  it('toggleVenue adds venue when not in list', () => {
    useFavoritesStore.getState().toggleVenue("Cat's Cradle")
    expect(useFavoritesStore.getState().favoriteVenues).toContain("Cat's Cradle")
  })

  it('toggleVenue removes venue when in list', () => {
    useFavoritesStore.setState({ favoriteVenues: ["Cat's Cradle"] })
    useFavoritesStore.getState().toggleVenue("Cat's Cradle")
    expect(useFavoritesStore.getState().favoriteVenues).not.toContain("Cat's Cradle")
  })

  it('isArtistFavorite returns true when artist is favorited', () => {
    useFavoritesStore.setState({ favoriteArtists: ['The Mountain Goats'] })
    expect(useFavoritesStore.getState().isArtistFavorite('The Mountain Goats')).toBe(true)
  })

  it('isArtistFavorite returns false when artist is not favorited', () => {
    expect(useFavoritesStore.getState().isArtistFavorite('Unknown Artist')).toBe(false)
  })

  it('isVenueFavorite returns true when venue is favorited', () => {
    useFavoritesStore.setState({ favoriteVenues: ["Cat's Cradle"] })
    expect(useFavoritesStore.getState().isVenueFavorite("Cat's Cradle")).toBe(true)
  })

  it('isVenueFavorite returns false when venue is not favorited', () => {
    expect(useFavoritesStore.getState().isVenueFavorite('Unknown Venue')).toBe(false)
  })
})
