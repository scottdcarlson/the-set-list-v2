import type { MouseEvent } from 'react'
import { useFavoritesStore } from '../../store/useFavoritesStore'

interface FavoriteButtonProps {
  type: 'artist' | 'venue'
  name: string
  size?: 'sm' | 'lg'
}

export function FavoriteButton({ type, name, size = 'sm' }: FavoriteButtonProps) {
  const toggleArtist = useFavoritesStore((state) => state.toggleArtist)
  const toggleVenue = useFavoritesStore((state) => state.toggleVenue)
  const isFavorited = useFavoritesStore((state) =>
    type === 'artist' ? state.isArtistFavorited(name) : state.isVenueFavorited(name),
  )

  const label = type === 'artist' ? 'Favorite Artist' : 'Favorite Venue'
  const icon = isFavorited ? '♥' : '♡'
  const sizeClass =
    size === 'lg'
      ? 'px-3 py-2 text-sm font-semibold rounded-lg border border-white/10'
      : 'h-7 w-7 text-base rounded-full'
  const toneClass = isFavorited ? 'text-amber-400 bg-amber-400/10' : 'text-text-muted bg-transparent'

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.preventDefault()

    if (type === 'artist') {
      toggleArtist(name)
      return
    }

    toggleVenue(name)
  }

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label={`${label}: ${name}`}
      className={`inline-flex items-center justify-center gap-2 transition hover:text-amber-300 ${sizeClass} ${toneClass}`}
    >
      <span>{icon}</span>
      {size === 'lg' ? <span>{label}</span> : null}
    </button>
  )
}
