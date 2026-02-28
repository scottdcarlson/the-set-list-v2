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
    <article
      className={`relative rounded-xl border border-white/5 bg-card p-4 transition-all duration-150 hover:bg-card-hover ${
        isFavorited ? 'border-l-2 border-l-accent' : ''
      }`}
    >
      <Link
        to={`/event/${event.slug}`}
        aria-label={`Open ${event.artist_event} at ${event.venue}`}
        className='absolute inset-0 z-10 rounded-xl'
      />

      <div className='relative z-0'>
        <h3 className='pr-12 text-lg leading-tight font-bold text-white'>{event.artist_event}</h3>
        <p className='mt-2 pr-12 text-sm text-text-muted'>
          📍 {event.venue} · {event.city}
        </p>
        <div className='mt-3 grid grid-cols-[1fr_auto] items-center gap-2 pr-12'>
          <span className='text-sm text-text-muted'>⏰ {event.start_time}</span>
          <CategoryPill category={event.category} />
        </div>
      </div>

      <div className='absolute right-4 top-4 z-20'>
        <FavoriteButton type='artist' name={event.artist_event} size='sm' />
      </div>
      <div className='absolute right-4 bottom-4 z-20'>
        <FavoriteButton type='venue' name={event.venue} size='sm' />
      </div>
    </article>
  )
}
