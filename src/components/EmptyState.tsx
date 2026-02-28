interface EmptyStateProps {
  icon: string
  title: string
  subtitle: string
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <span className="text-4xl mb-4">{icon}</span>
      <h2 className="text-lg font-semibold text-[#F5F5F5]">{title}</h2>
      <p className="text-sm text-[#9CA3AF]">{subtitle}</p>
    </div>
  )
}
