interface DateGroupHeaderProps {
  label: string
  isTonightOrTomorrow: boolean
}

export function DateGroupHeader({ label }: DateGroupHeaderProps) {
  const isTonight = label === 'TONIGHT 🔥'

  return (
    <div className="sticky top-0 bg-[#0A0A0A] py-2 px-4">
      <h2
        className={
          isTonight
            ? 'text-[#DC2626] font-bold text-lg'
            : 'text-[#F59E0B] font-semibold text-base'
        }
      >
        {label}
      </h2>
    </div>
  )
}
