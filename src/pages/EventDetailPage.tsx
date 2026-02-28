import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { CategoryPill } from '../components/events/CategoryPill'
import { FavoriteButton } from '../components/events/FavoriteButton'
import { downloadIcs, getGoogleCalendarUrl } from '../lib/calendar'
import { shareEvent } from '../lib/sharing'
import { EmptyState } from '../components/ui/EmptyState'
import { useEventStore } from '../store/useEventStore'

export function EventDetailPage() {
  const { slug } = useParams()
  const [showCalendarActions, setShowCalendarActions] = useState(false)
  const events = useEventStore((state) => state.events)
  const fetchEvents = useEventStore((state) => state.fetchEvents)
  const getEventBySlug = useEventStore((state) => state.getEventBySlug)

  useEffect(() => {
    if (events.length === 0) {
      void fetchEvents()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      <div className='mt-4 space-y-2'>
        <button
          type='button'
          onClick={() => void shareEvent(event)}
          className='rounded-lg border border-white/10 bg-card px-4 py-2 text-sm text-white hover:bg-card-hover'
        >
          📤 Share Event
        </button>
        <div className='flex flex-wrap items-center gap-2'>
          <button
            type='button'
            onClick={() => setShowCalendarActions((previous) => !previous)}
            className='rounded-lg border border-white/10 bg-card px-4 py-2 text-sm text-white hover:bg-card-hover'
          >
            📅 Add to Calendar
          </button>
          {showCalendarActions ? (
            <>
              <button
                type='button'
                onClick={() => downloadIcs(event)}
                className='rounded-lg border border-white/10 bg-card px-4 py-2 text-sm text-white hover:bg-card-hover'
              >
                📅 Download .ics
              </button>
              <button
                type='button'
                onClick={() =>
                  window.open(getGoogleCalendarUrl(event), '_blank', 'noopener,noreferrer')
                }
                className='rounded-lg border border-white/10 bg-card px-4 py-2 text-sm text-white hover:bg-card-hover'
              >
                🗓 Google Calendar
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
