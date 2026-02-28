import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useEventStore } from '../../store/useEventStore'
import { BottomNav } from './BottomNav'

export function AppShell() {
  const events = useEventStore((state) => state.events)
  const isLoading = useEventStore((state) => state.isLoading)
  const error = useEventStore((state) => state.error)
  const fetchEvents = useEventStore((state) => state.fetchEvents)

  useEffect(() => {
    if (!isLoading && !error && events.length === 0) {
      void fetchEvents()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (events.length === 0 && isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-primary'>
        <div className='text-center'>
          <div className='animate-pulse text-5xl text-accent'>🎸</div>
          <p className='mt-3 text-sm text-text-muted'>Loading The Set List...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-primary flex flex-col'>
      <main className='flex-1 pb-16 overflow-y-auto'>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
