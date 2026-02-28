import { describe, it, expect, beforeEach } from 'vitest'
import { useFilterStore } from '../useFilterStore'

describe('useFilterStore', () => {
  beforeEach(() => {
    useFilterStore.setState({
      selectedDays: [],
      selectedCategories: [],
      selectedCities: [],
    })
  })

  it('has empty initial state', () => {
    const state = useFilterStore.getState()
    expect(state.selectedDays).toEqual([])
    expect(state.selectedCategories).toEqual([])
    expect(state.selectedCities).toEqual([])
  })

  it('toggleDay adds day when not in list', () => {
    useFilterStore.getState().toggleDay('Sat Feb 28')
    expect(useFilterStore.getState().selectedDays).toContain('Sat Feb 28')
  })

  it('toggleDay removes day when in list', () => {
    useFilterStore.setState({ selectedDays: ['Sat Feb 28'] })
    useFilterStore.getState().toggleDay('Sat Feb 28')
    expect(useFilterStore.getState().selectedDays).not.toContain('Sat Feb 28')
  })

  it('toggleCategory adds category when not in list', () => {
    useFilterStore.getState().toggleCategory('Rock')
    expect(useFilterStore.getState().selectedCategories).toContain('Rock')
  })

  it('toggleCategory removes category when in list', () => {
    useFilterStore.setState({ selectedCategories: ['Rock'] })
    useFilterStore.getState().toggleCategory('Rock')
    expect(useFilterStore.getState().selectedCategories).not.toContain('Rock')
  })

  it('toggleCity adds city when not in list', () => {
    useFilterStore.getState().toggleCity('Durham')
    expect(useFilterStore.getState().selectedCities).toContain('Durham')
  })

  it('toggleCity removes city when in list', () => {
    useFilterStore.setState({ selectedCities: ['Durham'] })
    useFilterStore.getState().toggleCity('Durham')
    expect(useFilterStore.getState().selectedCities).not.toContain('Durham')
  })

  it('clearAll resets all filters', () => {
    useFilterStore.setState({
      selectedDays: ['Sat Feb 28'],
      selectedCategories: ['Rock'],
      selectedCities: ['Durham'],
    })
    useFilterStore.getState().clearAll()
    const state = useFilterStore.getState()
    expect(state.selectedDays).toEqual([])
    expect(state.selectedCategories).toEqual([])
    expect(state.selectedCities).toEqual([])
  })
})
