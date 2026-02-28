import { useEffect } from 'react'
import { useEventStore } from './store/useEventStore'

function App() {
  const { events, loading, error, fetchEvents } = useEventStore()

  // CRITICAL: Empty deps array — never put fetchEvents or events in deps
  useEffect(() => {
    void fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-amber-500 text-xl">Loading events...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-amber-500 text-3xl font-bold mb-4">The Set List</h1>
      <p className="text-gray-300">{events.length} events loaded</p>
    </div>
  )
}

export default App
