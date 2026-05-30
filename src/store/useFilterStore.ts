import { create } from 'zustand'

interface FilterStore {
  selectedDay: string
  selectedTime: string
  selectedCategories: string[]
  selectedCities: string[]
  setSelectedDay: (day: string) => void
  setSelectedTime: (time: string) => void
  toggleCategory: (cat: string) => void
  toggleCity: (city: string) => void
  clearAll: () => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedDay: '',
  selectedTime: '',
  selectedCategories: [],
  selectedCities: [],
  setSelectedDay: (day: string) => set({ selectedDay: day }),
  setSelectedTime: (time: string) => set({ selectedTime: time }),
  toggleCategory: (cat: string) => set((state) => ({
    selectedCategories: state.selectedCategories.includes(cat)
      ? state.selectedCategories.filter((c) => c !== cat)
      : [...state.selectedCategories, cat]
  })),
  toggleCity: (city: string) => set((state) => ({
    selectedCities: state.selectedCities.includes(city)
      ? state.selectedCities.filter((c) => c !== city)
      : [...state.selectedCities, city]
  })),
  clearAll: () => {
    set({ selectedDay: '', selectedTime: '', selectedCategories: [], selectedCities: [] })
  },
}))
