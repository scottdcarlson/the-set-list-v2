interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`block rounded bg-card-hover animate-pulse ${className}`} />
}

export function EventCardSkeleton() {
  return (
    <div className='rounded-xl border border-white/5 bg-card p-4 space-y-3'>
      <div className='flex items-center justify-between gap-3'>
        <Skeleton className='h-6 w-48' />
        <Skeleton className='h-5 w-5 rounded-full' />
      </div>
      <Skeleton className='h-4 w-56' />
      <div className='flex items-center justify-between gap-3'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-5 w-16 rounded-full' />
        <Skeleton className='h-5 w-5 rounded-full' />
      </div>
    </div>
  )
}
