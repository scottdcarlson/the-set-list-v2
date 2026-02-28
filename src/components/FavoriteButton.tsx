import { useFavoritesStore } from '../store/useFavoritesStore'

interface FavoriteButtonProps {
  name: string
  type: 'artist' | 'venue'
}

export function FavoriteButton({ name, type }: FavoriteButtonProps) {
  const { toggleArtist, toggleVenue, isArtistFavorite, isVenueFavorite } =
    useFavoritesStore()

  const isFavorite =
    type === 'artist' ? isArtistFavorite(name) : isVenueFavorite(name)
  const toggle = type === 'artist' ? toggleArtist : toggleVenue

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        toggle(name)
      }}
      className="text-xl"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <span className="text-[#F59E0B]">❤️</span>
      ) : (
        <span className="text-[#9CA3AF]">🤍</span>
      )}
    </button>
  )
}
