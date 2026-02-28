import { useEventStore } from '../../store/useEventStore'
import { EmptyState } from '../ui/EmptyState'
import { EventCardSkeleton } from '../ui/Skeleton'
import { DateGroupHeader } from './DateGroupHeader'
import { EventCard } from './EventCard'

export function EventList() {
  const { events, isLoading, error, getGroupedEvents } = useEventStore((state) => ({
    events: state.events,
    isLoading: state.isLoading,
    error: state.error,
    getGroupedEvents: state.getGroupedEvents,
  }))

  if (isLoading) {
    return (
      <div className='space-y-2 px-4 pb-24 pt-2'>
        {Array.from({ length: 6 }).map((_, index) => (
          <EventCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return <EmptyState icon='⚠️' title='Unable to load shows' subtitle={error} />
  }

  const groupedEvents = getGroupedEvents()

  if (events.length === 0 || groupedEvents.size === 0) {
    return (
      <EmptyState
        icon='🎸'
        title='No shows found'
        subtitle='Check back soon — the Triangle never sleeps'
      />
    )
  }

  return (
    <div className='space-y-2 px-4 pb-24 pt-2'>
      {Array.from(groupedEvents.entries()).map(([label, grouped]) => (
        <section key={label} className='space-y-2'>
          <DateGroupHeader label={label} />
          <div className='space-y-2'>
            {grouped.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
