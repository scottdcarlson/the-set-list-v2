import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { SkeletonCard } from '../SkeletonCard'

describe('SkeletonCard', () => {
  it('renders skeleton card', () => {
    const { container } = render(<SkeletonCard />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has animate-pulse class on skeleton bars', () => {
    const { container } = render(<SkeletonCard />)
    const pulseElements = container.querySelectorAll('.animate-pulse')
    expect(pulseElements.length).toBeGreaterThan(0)
  })

  it('has proper background styling', () => {
    const { container } = render(<SkeletonCard />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('bg-[#1A1A1A]')
    expect(wrapper.className).toContain('rounded-xl')
  })
})
