import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { useEventStore } from './store/useEventStore'

// Mock the current date for consistent testing
vi.mock('./utils/dateGrouping', async () => {
  const actual = await vi.importActual('./utils/dateGrouping')
  return {
    ...actual,
    groupEventsByDate: (events: unknown[]) => {
      const { groupEventsByDate } = actual as { groupEventsByDate: (events: unknown[], now: Date) => unknown }
      return groupEventsByDate(events, new Date('2026-02-28T18:00:00'))
    },
  }
})

describe('App', () => {
  beforeEach(() => {
    useEventStore.setState({
      events: [],
      loading: false,
      error: null,
    })
    vi.restoreAllMocks()
  })

  it('renders with bottom navigation', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Events')).toBeInTheDocument()
    })

    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
  })

  it('shows loading state on events page', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise(() => {})
    )

    render(<App />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('renders events after successful fetch', async () => {
    const mockEvents = [
      {
        artist_event: 'Test Band',
        venue: 'Test Venue',
        date: 'Sat Feb 28',
        start_time: '8:00 PM',
        city: 'Durham',
        category: 'Rock',
      },
    ]

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Test Band')).toBeInTheDocument()
    })

    expect(screen.getByText('The Set List')).toBeInTheDocument()
  })
})
