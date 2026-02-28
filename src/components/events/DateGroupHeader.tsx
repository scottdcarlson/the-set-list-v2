interface DateGroupHeaderProps {
  label: string
}

export function DateGroupHeader({ label }: DateGroupHeaderProps) {
  let styleClass = 'text-text-muted font-semibold text-xs uppercase tracking-widest'

  if (label === 'TONIGHT 🔥') {
    styleClass = 'text-danger font-black text-lg uppercase'
  } else if (label === 'TOMORROW') {
    styleClass = 'text-accent font-bold text-sm uppercase tracking-widest'
  }

  return (
    <div className='sticky top-0 z-10 bg-primary/95 px-4 py-2 backdrop-blur'>
      <h2 className={styleClass}>{label}</h2>
    </div>
  )
}
