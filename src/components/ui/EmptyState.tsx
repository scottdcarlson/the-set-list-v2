interface EmptyStateProps {
  icon: string
  title: string
  subtitle: string
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <div className='flex min-h-[40vh] flex-col items-center justify-center px-6 text-center'>
      <div className='text-5xl'>{icon}</div>
      <h2 className='mt-4 text-xl font-bold text-white'>{title}</h2>
      <p className='mt-2 text-sm text-text-muted'>{subtitle}</p>
    </div>
  )
}
