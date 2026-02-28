import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', icon: '🎵', label: 'Events' },
  { to: '/search', icon: '🔍', label: 'Search' },
  { to: '/favorites', icon: '❤️', label: 'Favorites' },
]

export function BottomNav() {
  return (
    <nav className="bg-[#1A1A1A] border-t border-[#333] px-6 py-2 flex justify-around">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 ${
              isActive ? 'text-[#F59E0B]' : 'text-[#9CA3AF]'
            }`
          }
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-xs">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
