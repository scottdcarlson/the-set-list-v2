import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { SearchPage } from '../SearchPage'
import { useEventStore } from '../../store/useEventStore'

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
      <SearchPage />
    </BrowserRouter>
  )
}

describe('SearchPage', () => {
  beforeEach(() => {
    useEventStore.setState({
      events: [],
      loading: false,
      error: null,
    })
    vi.restoreAllMocks()
  })

  it('renders search input', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByTestId('search-input')).toBeInTheDocument()
    })
  })

  it('shows all events initially', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('The Mountain Goats')).toBeInTheDocument()
    })
    expect(screen.getByText('Sylvan Esso')).toBeInTheDocument()
  })

  it('shows filtered results on type', async () => {
    const user = userEvent.setup()

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByTestId('search-input')).toBeInTheDocument()
    })

    const input = screen.getByTestId('search-input')
    await user.type(input, 'mountain')

    await waitFor(() => {
      expect(screen.getByText('The Mountain Goats')).toBeInTheDocument()
    })
    expect(screen.queryByText('Sylvan Esso')).not.toBeInTheDocument()
  })
})
