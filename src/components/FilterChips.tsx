import { useMemo } from 'react'
import type { EventData } from '../types/event'
import { useFilterStore } from '../store/useFilterStore'

interface FilterChipsProps {
  events: EventData[]
}

export function FilterChips({ events }: FilterChipsProps) {
  const {
    selectedDays,
    selectedCategories,
    selectedCities,
    toggleDay,
    toggleCategory,
    toggleCity,
  } = useFilterStore()

  const { days, categories, cities } = useMemo(() => {
    const daysSet = new Set<string>()
    const categoriesSet = new Set<string>()
    const citiesSet = new Set<string>()

    events.forEach((e) => {
      daysSet.add(e.date)
      categoriesSet.add(e.category)
      citiesSet.add(e.city)
    })

    return {
      days: Array.from(daysSet),
      categories: Array.from(categoriesSet),
      cities: Array.from(citiesSet),
    }
  }, [events])

  const chipClass = (active: boolean) =>
    `px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
      active
        ? 'bg-[#F59E0B] text-[#0A0A0A]'
        : 'bg-[#1A1A1A] text-[#9CA3AF] border border-[#333]'
    }`

  return (
    <div className="space-y-2 mb-4">
      <div className="flex flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day}
            className={chipClass(selectedDays.includes(day))}
            onClick={() => toggleDay(day)}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={chipClass(selectedCategories.includes(cat))}
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <button
            key={city}
            className={chipClass(selectedCities.includes(city))}
            onClick={() => toggleCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}
