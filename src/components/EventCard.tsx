import type { EventData } from '../types/event'

interface EventCardProps {
  event: EventData
  onClick?: () => void
}

export function EventCard({ event, onClick }: EventCardProps) {
  return (
    <div
      className="bg-[#1A1A1A] hover:bg-[#222222] rounded-xl p-4 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-[#F5F5F5]">
        {event.artist_event}
      </h3>
      <p className="text-sm text-[#9CA3AF]">{event.venue}</p>
      <p className="text-sm text-[#9CA3AF]">
        {event.start_time} · {event.city}
      </p>
      <span className="inline-block bg-[#F59E0B]/20 text-[#F59E0B] text-xs px-2 py-0.5 rounded-full mt-2">
        {event.category}
      </span>
    </div>
  )
}
