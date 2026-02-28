import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEventStore } from '../store/useEventStore'
import { generateICS, generateGoogleCalURL } from '../utils/calendar'
import { FavoriteButton } from '../components/FavoriteButton'

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { events, fetchEvents } = useEventStore()

  // CRITICAL: Empty deps array
  useEffect(() => {
    void fetchEvents()
  }, [])

  if (!id) {
    return <div className="p-4 text-red-500">Invalid event ID</div>
  }

  const decoded = decodeURIComponent(id)
  const [artistEvent, date] = decoded.split('|')

  const event = events.find(
    (e) => e.artist_event === artistEvent && e.date === date
  )

  if (!event && events.length > 0) {
    return (
      <div className="p-4">
        <p className="text-red-500 mb-4">Event not found</p>
        <button
          onClick={() => navigate('/')}
          className="text-[#F59E0B] underline"
        >
          Back to events
        </button>
      </div>
    )
  }

  if (!event) {
    return <div className="p-4" data-testid="loading">Loading...</div>
  }

  const handleShare = async () => {
    const shareData = {
      title: event.artist_event,
      text: `${event.artist_event} at ${event.venue} - ${event.date} ${event.start_time}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch {
        // User cancelled or share failed, fallback to clipboard
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copied to clipboard!')
      }
    } else {
      await navigator.clipboard.writeText(shareData.url)
      alert('Link copied to clipboard!')
    }
  }

  const handleDownloadICS = () => {
    const ics = generateICS(event)
    const blob = new Blob([ics], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${event.artist_event.replace(/\s+/g, '-')}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="text-[#9CA3AF] mb-4 flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="flex items-start justify-between mb-2">
        <h1 className="text-2xl font-bold text-[#F5F5F5]">{event.artist_event}</h1>
        <FavoriteButton name={event.artist_event} type="artist" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <p className="text-lg text-[#9CA3AF]">{event.venue}</p>
        <FavoriteButton name={event.venue} type="venue" />
      </div>

      <p className="text-[#F5F5F5] mb-1">
        {event.date} at {event.start_time}
      </p>
      <p className="text-[#9CA3AF] mb-2">{event.city}</p>
      <span className="inline-block bg-[#F59E0B]/20 text-[#F59E0B] text-sm px-3 py-1 rounded-full mb-6">
        {event.category}
      </span>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleShare}
          className="bg-[#F59E0B] text-[#0A0A0A] font-semibold px-4 py-2 rounded-lg"
        >
          Share
        </button>
        <a
          href={generateGoogleCalURL(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#F59E0B] text-[#0A0A0A] font-semibold px-4 py-2 rounded-lg text-center"
        >
          Add to Google Calendar
        </a>
        <button
          onClick={handleDownloadICS}
          className="bg-[#F59E0B] text-[#0A0A0A] font-semibold px-4 py-2 rounded-lg"
        >
          Download .ics
        </button>
      </div>
    </div>
  )
}
