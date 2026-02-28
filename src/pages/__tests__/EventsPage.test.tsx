import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { EventsPage } from '../EventsPage'
import { useEventStore } from '../../store/useEventStore'

// Mock the current date for consistent testing
vi.mock('../../utils/dateGrouping', async () => {
  const actual = await vi.importActual('../../utils/dateGrouping')
  return {
    ...actual,
    groupEventsByDate: (events: unknown[]) => {
      const { groupEventsByDate } = actual as { groupEventsByDate: (events: unknown[], now: Date) => unknown }
      return groupEventsByDate(events, new Date('2026-02-28T18:00:00'))
    },
  }
})

describe('EventsPage', () => {
  beforeEach(() => {
    useEventStore.setState({
      events: [],
      loading: false,
      error: null,
    })
    vi.restoreAllMocks()
  })

  it('shows loading state', () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(
      () => new Promise(() => {})
    )

    render(<EventsPage />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('renders date group headers and event cards', async () => {
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

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    render(<EventsPage />)

    await waitFor(() => {
      expect(screen.getByText('TONIGHT 🔥')).toBeInTheDocument()
    })

    expect(screen.getByText('TOMORROW')).toBeInTheDocument()
    expect(screen.getByText('The Mountain Goats')).toBeInTheDocument()
    expect(screen.getByText('Sylvan Esso')).toBeInTheDocument()
  })

  it('shows error message on failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    } as Response)

    render(<EventsPage />)

    await waitFor(() => {
      expect(screen.getByText('Error: HTTP 500')).toBeInTheDocument()
    })
  })
})
