import { Link } from 'react-router'
import type { ParsedEvent } from '../../types/event'
import { useFavoritesStore } from '../../store/useFavoritesStore'
import { CategoryPill } from './CategoryPill'
import { FavoriteButton } from './FavoriteButton'

interface EventCardProps {
  event: ParsedEvent
}

export function EventCard({ event }: EventCardProps) {
  const isFavorited = useFavoritesStore((state) => state.isEventFavorited(event))

  return (
    <Link
      to={`/event/${event.slug}`}
      className={`block rounded-xl border border-white/5 bg-card p-4 transition hover:bg-card-hover ${
        isFavorited ? 'border-l-2 border-l-accent' : ''
      }`}
    >
      <div className='flex items-start justify-between gap-3'>
        <h3 className='text-lg font-bold text-white leading-tight'>{event.artist_event}</h3>
        <FavoriteButton type='artist' name={event.artist_event} size='sm' />
      </div>
      <p className='mt-2 text-sm text-text-muted'>
        📍 {event.venue} · {event.city}
      </p>
      <div className='mt-3 grid grid-cols-[1fr_auto_auto] items-center gap-2'>
        <span className='text-sm text-text-muted'>⏰ {event.start_time}</span>
        <CategoryPill category={event.category} />
        <FavoriteButton type='venue' name={event.venue} size='sm' />
      </div>
    </Link>
  )
}
