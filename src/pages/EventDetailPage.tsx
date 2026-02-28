import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { CategoryPill } from '../components/events/CategoryPill'
import { FavoriteButton } from '../components/events/FavoriteButton'
import { EmptyState } from '../components/ui/EmptyState'
import { useEventStore } from '../store/useEventStore'

export function EventDetailPage() {
  const { slug } = useParams()
  const events = useEventStore((state) => state.events)
  const fetchEvents = useEventStore((state) => state.fetchEvents)
  const getEventBySlug = useEventStore((state) => state.getEventBySlug)

  useEffect(() => {
    if (events.length === 0) {
      void fetchEvents()
    }
  }, [events.length, fetchEvents])

  const event = slug ? getEventBySlug(slug) : undefined

  if (!event) {
    return (
      <EmptyState
        icon='🎵'
        title='Show not found'
        subtitle='It may have already happened'
      />
    )
  }

  return (
    <div className='px-4 py-4 pb-24 text-text-primary'>
      <Link to='/events' className='text-sm text-accent'>
        ← Back
      </Link>

      <h1 className='mt-4 text-3xl font-black text-white'>{event.artist_event}</h1>
      <p className='mt-1 text-xl text-accent'>{event.venue}</p>
      <p className='mt-2 text-text-muted'>
        {event.date} at {event.start_time}
      </p>
      <p className='text-text-muted'>{event.city}</p>
      <div className='mt-3'>
        <CategoryPill category={event.category} />
      </div>

      <div className='mt-6 flex flex-wrap items-center gap-3'>
        <FavoriteButton type='artist' name={event.artist_event} size='lg' />
        <FavoriteButton type='venue' name={event.venue} size='lg' />
      </div>
    </div>
  )
}
