interface CategoryPillProps {
  category: string
}

const categoryClasses: Record<string, string> = {
  Rock: 'bg-amber-400/20 text-amber-300',
  Jazz: 'bg-blue-400/20 text-blue-300',
  'Hip-Hop': 'bg-purple-400/20 text-purple-300',
  Electronic: 'bg-cyan-400/20 text-cyan-300',
  Folk: 'bg-green-400/20 text-green-300',
  Indie: 'bg-pink-400/20 text-pink-300',
  Blues: 'bg-indigo-400/20 text-indigo-300',
  Country: 'bg-yellow-400/20 text-yellow-300',
}

export function CategoryPill({ category }: CategoryPillProps) {
  const colorClass = categoryClasses[category] ?? 'bg-gray-400/20 text-gray-300'

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colorClass}`}
    >
      {category}
    </span>
  )
}
