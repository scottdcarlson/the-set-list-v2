import { useEventStore } from '../../store/useEventStore'

export function FilterBar() {
  const hidePastEvents = useEventStore((state) => state.hidePastEvents)
  const toggleHidePastEvents = useEventStore((state) => state.toggleHidePastEvents)
  const filteredCount = useEventStore((state) => state.getFilteredEvents().length)

  return (
    <div className='sticky top-[73px] z-20 border-b border-white/5 bg-primary px-4 py-3'>
      <div className='flex items-center justify-between gap-4'>
        <button
          type='button'
          role='switch'
          aria-checked={hidePastEvents}
          onClick={toggleHidePastEvents}
          className='inline-flex items-center gap-2 text-xs text-text-muted'
        >
          <span
            className={`relative h-6 w-10 rounded-full transition ${
              hidePastEvents ? 'bg-accent/70' : 'bg-white/10'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                hidePastEvents ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </span>
          <span>Hide past</span>
        </button>
        <span className='text-xs text-text-muted'>{filteredCount} shows</span>
      </div>
    </div>
  )
}
