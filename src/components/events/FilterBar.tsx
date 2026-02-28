import { useEventStore } from '../../store/useEventStore'

export function FilterBar() {
  const hidePastEvents = useEventStore((state) => state.hidePastEvents)
  const toggleHidePastEvents = useEventStore((state) => state.toggleHidePastEvents)

  return (
    <div className='sticky top-0 z-20 bg-primary px-4 py-2'>
      <label className='inline-flex items-center gap-2 text-xs text-text-muted'>
        <input
          type='checkbox'
          className='accent-accent'
          checked={hidePastEvents}
          onChange={toggleHidePastEvents}
        />
        Hide past
      </label>
    </div>
  )
}
