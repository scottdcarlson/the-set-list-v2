import { describe, it, expect, beforeEach } from 'vitest'
import { useFilterStore } from '../useFilterStore'

describe('useFilterStore', () => {
  beforeEach(() => {
    useFilterStore.setState({
      selectedDay: '',
      selectedTime: '',
      selectedCategories: [],
      selectedCities: [],
    })
  })

  it('has empty initial state', () => {
    const state = useFilterStore.getState()
    expect(state.selectedDay).toEqual('')
    expect(state.selectedTime).toEqual('')
    expect(state.selectedCategories).toEqual([])
    expect(state.selectedCities).toEqual([])
  })

  it('setSelectedDay updates day', () => {
    useFilterStore.getState().setSelectedDay('Sat Feb 28')
    expect(useFilterStore.getState().selectedDay).toEqual('Sat Feb 28')
  })

  it('setSelectedTime updates time', () => {
    useFilterStore.getState().setSelectedTime('7:30 PM')
    expect(useFilterStore.getState().selectedTime).toEqual('7:30 PM')
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
      selectedDay: 'Sat Feb 28',
      selectedTime: '7:30 PM',
      selectedCategories: ['Rock'],
      selectedCities: ['Durham'],
    })
    useFilterStore.getState().clearAll()
    const state = useFilterStore.getState()
    expect(state.selectedDay).toEqual('')
    expect(state.selectedTime).toEqual('')
    expect(state.selectedCategories).toEqual([])
    expect(state.selectedCities).toEqual([])
  })
})
