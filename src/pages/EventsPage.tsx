import { useEffect } from 'react'
import { useEventStore } from '../store/useEventStore'
import { groupEventsByDate } from '../utils/dateGrouping'
import { DateGroupHeader } from '../components/DateGroupHeader'
import { EventCard } from '../components/EventCard'

export function EventsPage() {
  const { events, loading, error, fetchEvents } = useEventStore()

  // CRITICAL: Empty deps array — never put fetchEvents or events in deps
  useEffect(() => {
    void fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="p-4" data-testid="loading">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    )
  }

  const groups = groupEventsByDate(events)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#F59E0B] mb-4">The Set List</h1>
      {groups.map((group) => (
        <div key={group.label} className="mb-6">
          <DateGroupHeader
            label={group.label}
            isTonightOrTomorrow={group.isTonightOrTomorrow}
          />
          <div className="flex flex-col gap-3 px-4">
            {group.events.map((event, idx) => (
              <EventCard key={`${event.artist_event}-${idx}`} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
