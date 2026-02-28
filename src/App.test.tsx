import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { useEventStore } from './store/useEventStore'

describe('App', () => {
  beforeEach(() => {
    // Reset store state before each test
    useEventStore.setState({
      events: [],
      loading: false,
      error: null,
    })
    vi.restoreAllMocks()
  })

  it('shows loading state while fetching', () => {
    // Mock fetch to not resolve immediately
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(<App />)

    expect(screen.getByText('Loading events...')).toBeInTheDocument()
  })

  it('shows event count after successful fetch', async () => {
    const mockEvents = [
      {
        artist_event: 'Test Band',
        venue: 'Test Venue',
        date: 'Sat Feb 28',
        start_time: '8:00 PM',
        city: 'Durham',
        category: 'Rock',
      },
      {
        artist_event: 'Another Band',
        venue: 'Another Venue',
        date: 'Sun Mar 01',
        start_time: '9:00 PM',
        city: 'Raleigh',
        category: 'Jazz',
      },
    ]

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('2 events loaded')).toBeInTheDocument()
    })

    expect(screen.getByText('The Set List')).toBeInTheDocument()
  })

  it('shows error message on failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Error: HTTP 404')).toBeInTheDocument()
    })
  })
})
