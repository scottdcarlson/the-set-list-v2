import { create } from 'zustand'

interface FilterStore {
  selectedDays: string[]
  selectedCategories: string[]
  selectedCities: string[]
  toggleDay: (day: string) => void
  toggleCategory: (cat: string) => void
  toggleCity: (city: string) => void
  clearAll: () => void
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  selectedDays: [],
  selectedCategories: [],
  selectedCities: [],
  toggleDay: (day: string) => {
    const current = get().selectedDays
    if (current.includes(day)) {
      set({ selectedDays: current.filter((d) => d !== day) })
    } else {
      set({ selectedDays: [...current, day] })
    }
  },
  toggleCategory: (cat: string) => {
    const current = get().selectedCategories
    if (current.includes(cat)) {
      set({ selectedCategories: current.filter((c) => c !== cat) })
    } else {
      set({ selectedCategories: [...current, cat] })
    }
  },
  toggleCity: (city: string) => {
    const current = get().selectedCities
    if (current.includes(city)) {
      set({ selectedCities: current.filter((c) => c !== city) })
    } else {
      set({ selectedCities: [...current, city] })
    }
  },
  clearAll: () => {
    set({ selectedDays: [], selectedCategories: [], selectedCities: [] })
  },
}))
