import { NavLink } from 'react-router'

export function BottomNav() {
  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-card border-t border-white/10 z-50'>
      <div className='flex'>
        <NavTab to='/events' label='📅 Events' />
        <NavTab to='/search' label='🔍 Search' />
        <NavTab to='/favorites' label='♥ Favorites' />
      </div>
    </nav>
  )
}

interface NavTabProps {
  to: string
  label: string
}

function NavTab({ to, label }: NavTabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-1/3 py-3 flex items-center justify-center ${
          isActive ? 'text-accent font-semibold' : 'text-text-muted'
        }`
      }
    >
      {label}
    </NavLink>
  )
}
