import { useEffect } from 'react'
import { EventList } from '../components/events/EventList'
import { FilterBar } from '../components/events/FilterBar'
import { useEventStore } from '../store/useEventStore'

export function EventsPage() {
  const fetchEvents = useEventStore((state) => state.fetchEvents)

  useEffect(() => {
    void fetchEvents()
  }, [fetchEvents])

  return (
    <div className='text-text-primary'>
      <header className='border-b border-white/5 bg-card px-4 py-4'>
        <h1 className='text-2xl font-black text-white'>The Set List 🎸</h1>
        <p className='mt-1 text-sm text-text-muted'>Triangle Live Music</p>
      </header>
      <FilterBar />
      <EventList />
    </div>
  )
}
