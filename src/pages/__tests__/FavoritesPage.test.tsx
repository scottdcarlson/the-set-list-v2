import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesPage } from '../FavoritesPage'
import { useEventStore } from '../../store/useEventStore'
import { useFavoritesStore } from '../../store/useFavoritesStore'

const mockEvents = [
  {
    artist_event: 'The Mountain Goats',
    venue: "Cat's Cradle",
    date: 'Sat Feb 28',
    start_time: '8:00 PM',
    city: 'Carrboro',
    category: 'Indie',
  },
  {
    artist_event: 'Sylvan Esso',
    venue: 'Motorco',
    date: 'Sun Mar 01',
    start_time: '9:00 PM',
    city: 'Durham',
    category: 'Electronic',
  },
]

function renderWithRouter() {
  return render(
    <BrowserRouter>
      <FavoritesPage />
    </BrowserRouter>
  )
}

describe('FavoritesPage', () => {
  beforeEach(() => {
    useEventStore.setState({
      events: [],
      loading: false,
      error: null,
    })
    useFavoritesStore.setState({
      favoriteArtists: [],
      favoriteVenues: [],
    })
    vi.restoreAllMocks()
  })

  it('shows empty state when no favorites', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    })
    expect(screen.getByText(/No favorites yet/)).toBeInTheDocument()
  })

  it('shows favorited artists and their events', async () => {
    useFavoritesStore.setState({
      favoriteArtists: ['The Mountain Goats'],
      favoriteVenues: [],
    })

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('Artists')).toBeInTheDocument()
    })
    // Artist name appears in both pill and event card
    expect(screen.getAllByText('The Mountain Goats')).toHaveLength(2)
  })

  it('shows favorited venues and their events', async () => {
    useFavoritesStore.setState({
      favoriteArtists: [],
      favoriteVenues: ['Motorco'],
    })

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('Venues')).toBeInTheDocument()
    })
    // Venue name appears in both pill and event card
    expect(screen.getAllByText('Motorco')).toHaveLength(2)
  })
})
