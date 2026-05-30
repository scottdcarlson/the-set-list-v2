import { useMemo } from 'react'
import type { EventData } from '../types/event'
import { useFilterStore } from '../store/useFilterStore'

interface FilterChipsProps {
  events: EventData[]
}

function parseStartMinutes(startTime: string): number {
  const match = startTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return Number.MAX_SAFE_INTEGER
  let hour = Number(match[1])
  const minutes = Number(match[2])
  const suffix = match[3].toUpperCase()
  if (suffix === 'PM' && hour !== 12) hour += 12
  if (suffix === 'AM' && hour === 12) hour = 0
  return hour * 60 + minutes
}

function displayDate(date: string): string {
  return date.replace(/ 0(\d)$/, ' $1')
}

export function FilterChips({ events }: FilterChipsProps) {
  const {
    selectedDay,
    selectedTime,
    selectedCategories,
    selectedCities,
    setSelectedDay,
    setSelectedTime,
    toggleCategory,
    toggleCity,
  } = useFilterStore()

  const { days, times, categories, cities } = useMemo(() => {
    const daysSet = new Set<string>()
    const timesSet = new Set<string>()
    const categoriesSet = new Set<string>()
    const citiesSet = new Set<string>()

    events.forEach((e) => {
      if (e.date) daysSet.add(e.date)
      if (e.start_time) timesSet.add(e.start_time)
      if (e.category) categoriesSet.add(e.category)
      if (e.city) citiesSet.add(e.city)
    })

    return {
      days: Array.from(daysSet).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
      times: Array.from(timesSet).sort((a, b) => parseStartMinutes(a) - parseStartMinutes(b)),
      categories: Array.from(categoriesSet).sort(),
      cities: Array.from(citiesSet).sort(),
    }
  }, [events])

  const chipClass = (active: boolean) =>
    `px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
      active
        ? 'bg-[#F59E0B] text-[#0A0A0A]'
        : 'bg-[#1A1A1A] text-[#9CA3AF] border border-[#333]'
    }`

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Date</label>
          <select
            className="bg-[#1A1A1A] text-[#F5F5F5] border border-[#333] rounded-lg px-3 py-2 w-full text-sm outline-none focus:border-[#F59E0B]"
            onChange={(e) => setSelectedDay(e.target.value)}
            value={selectedDay}
          >
            <option value="">All Dates</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {displayDate(day)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Start Time</label>
          <select
            className="bg-[#1A1A1A] text-[#F5F5F5] border border-[#333] rounded-lg px-3 py-2 w-full text-sm outline-none focus:border-[#F59E0B]"
            onChange={(e) => setSelectedTime(e.target.value)}
            value={selectedTime}
          >
            <option value="">All Times</option>
            {times.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">Category</label>
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
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#9CA3AF] uppercase tracking-wider font-semibold">City</label>
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
    </div>
  )
}
