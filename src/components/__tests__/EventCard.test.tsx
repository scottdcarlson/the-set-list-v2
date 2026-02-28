import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EventCard } from '../EventCard'
import type { EventData } from '../../types/event'

const mockEvent: EventData = {
  artist_event: 'The Mountain Goats',
  venue: "Cat's Cradle",
  date: 'Sat Feb 28',
  start_time: '8:00 PM',
  city: 'Carrboro',
  category: 'Indie',
}

describe('EventCard', () => {
  it('renders artist name', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('The Mountain Goats')).toBeInTheDocument()
  })

  it('renders venue', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText("Cat's Cradle")).toBeInTheDocument()
  })

  it('renders time and city', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('8:00 PM · Carrboro')).toBeInTheDocument()
  })

  it('renders category badge', () => {
    render(<EventCard event={mockEvent} />)
    expect(screen.getByText('Indie')).toBeInTheDocument()
  })
})
