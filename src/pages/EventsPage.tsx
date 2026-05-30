import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventStore } from '../store/useEventStore'
import { useFilterStore } from '../store/useFilterStore'
import { groupEventsByDate } from '../utils/dateGrouping'
import { DateGroupHeader } from '../components/DateGroupHeader'
import { EventCard } from '../components/EventCard'
import { FilterChips } from '../components/FilterChips'
import { SkeletonCard } from '../components/SkeletonCard'
import { EmptyState } from '../components/EmptyState'

export function EventsPage() {
  const navigate = useNavigate()
  const { events, loading, error, fetchEvents } = useEventStore()
  const { selectedDay, selectedTime, selectedCategories, selectedCities } = useFilterStore()

  // CRITICAL: Empty deps array — never put fetchEvents or events in deps
  useEffect(() => {
    void fetchEvents()
  }, [])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedDay && event.date !== selectedDay) {
        return false
      }
      if (selectedTime && event.start_time !== selectedTime) {
        return false
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) {
        return false
      }
      if (selectedCities.length > 0 && !selectedCities.includes(event.city)) {
        return false
      }
      return true
    })
  }, [events, selectedDay, selectedTime, selectedCategories, selectedCities])

  if (loading) {
    return (
      <div className="p-4" data-testid="loading">
        <h1 className="text-2xl font-bold text-[#F59E0B] mb-4">The Set List</h1>
        <div className="flex flex-col gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
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

  const groups = groupEventsByDate(filteredEvents)

  const handleEventClick = (event: { artist_event: string; date: string }) => {
    const id = encodeURIComponent(`${event.artist_event}|${event.date}`)
    navigate(`/event/${id}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-[#F59E0B] mb-4">The Set List</h1>
      <FilterChips events={events} />
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon="🎵"
          title="No events found"
          subtitle="Try adjusting your filters"
        />
      ) : (
        groups.map((group) => (
          <div key={group.label} className="mb-6">
            <DateGroupHeader
              label={group.label}
              isTonightOrTomorrow={group.isTonightOrTomorrow}
            />
            <div className="flex flex-col gap-3 px-4">
              {group.events.map((event, idx) => (
                <EventCard
                  key={`${event.artist_event}-${idx}`}
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
