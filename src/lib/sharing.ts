import type { ParsedEvent } from '../types/event'

function getSharePayload(event: ParsedEvent) {
  const title = event.artist_event
  const text = `${event.artist_event} @ ${event.venue} — ${event.date} ${event.start_time}`
  const url = `${window.location.origin}/event/${event.slug}`

  return { title, text, url }
}

export function supportsShare(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share
}

export async function shareEvent(event: ParsedEvent): Promise<void> {
  const payload = getSharePayload(event)
  const clipboardText = `${payload.text}\n${payload.url}`

  if (supportsShare()) {
    try {
      await navigator.share(payload)
      return
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(clipboardText)
    alert('Copied to clipboard!')
    return
  }

  alert(clipboardText)
}
