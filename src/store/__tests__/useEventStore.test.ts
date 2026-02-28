import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useEventStore } from '../useEventStore'

describe('useEventStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useEventStore.setState({
      events: [],
      loading: false,
      error: null,
    })
    vi.restoreAllMocks()
  })

  it('has correct initial state', () => {
    const state = useEventStore.getState()
    expect(state.events).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBe(null)
  })

  it('sets loading to true when fetching', async () => {
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

    const fetchPromise = useEventStore.getState().fetchEvents()

    // Check loading state immediately after calling
    expect(useEventStore.getState().loading).toBe(true)

    await fetchPromise

    expect(useEventStore.getState().loading).toBe(false)
    expect(useEventStore.getState().events).toEqual(mockEvents)
  })

  it('sets error on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    } as Response)

    await useEventStore.getState().fetchEvents()

    expect(useEventStore.getState().loading).toBe(false)
    expect(useEventStore.getState().error).toBe('HTTP 500')
    expect(useEventStore.getState().events).toEqual([])
  })

  it('sets error on network failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))

    await useEventStore.getState().fetchEvents()

    expect(useEventStore.getState().loading).toBe(false)
    expect(useEventStore.getState().error).toBe('Network error')
  })

  it('does not double-call if already loading', async () => {
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

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockEvents,
    } as Response)

    // Set loading to true manually to simulate in-progress fetch
    useEventStore.setState({ loading: true })

    await useEventStore.getState().fetchEvents()

    // fetch should not have been called because loading was already true
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
