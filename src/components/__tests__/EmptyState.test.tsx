import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from '../EmptyState'

describe('EmptyState', () => {
  it('renders icon', () => {
    render(<EmptyState icon="🎵" title="Test Title" subtitle="Test subtitle" />)
    expect(screen.getByText('🎵')).toBeInTheDocument()
  })

  it('renders title', () => {
    render(<EmptyState icon="🎵" title="Test Title" subtitle="Test subtitle" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<EmptyState icon="🎵" title="Test Title" subtitle="Test subtitle" />)
    expect(screen.getByText('Test subtitle')).toBeInTheDocument()
  })

  it('has proper styling', () => {
    const { container } = render(
      <EmptyState icon="🎵" title="Test Title" subtitle="Test subtitle" />
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('flex')
    expect(wrapper.className).toContain('flex-col')
    expect(wrapper.className).toContain('items-center')
  })
})
