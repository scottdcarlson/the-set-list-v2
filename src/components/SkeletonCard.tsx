export function SkeletonCard() {
  return (
    <div className="bg-[#1A1A1A] rounded-xl p-4">
      <div className="h-5 w-3/4 bg-[#333] rounded animate-pulse mb-2" />
      <div className="h-4 w-1/2 bg-[#333] rounded animate-pulse mb-2" />
      <div className="h-3 w-1/3 bg-[#333] rounded animate-pulse" />
    </div>
  )
}
