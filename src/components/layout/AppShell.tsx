import { Outlet } from 'react-router'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className='min-h-screen bg-primary flex flex-col'>
      <main className='flex-1 pb-16 overflow-y-auto'>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
