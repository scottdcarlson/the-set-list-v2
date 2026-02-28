import { EventList } from '../components/events/EventList'
import { FilterBar } from '../components/events/FilterBar'
import { isEventPast } from '../lib/dateUtils'
import { useEventStore } from '../store/useEventStore'

export function EventsPage() {
  const events = useEventStore((state) => state.events)
  const upcomingCount = events.filter((event) => !isEventPast(event.parsedDate)).length

  return (
    <div className='text-text-primary'>
      <header className='sticky top-0 z-30 border-b border-white/5 bg-card px-4 py-4'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-xl font-black text-white'>🎸 The Set List</h1>
          <span className='rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent'>
            {upcomingCount} upcoming
          </span>
        </div>
      </header>
      <FilterBar />
      <EventList />
    </div>
  )
}
