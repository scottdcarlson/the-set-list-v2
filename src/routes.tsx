import { createBrowserRouter, Navigate } from 'react-router'
import { AppShell } from './components/layout/AppShell'

function EventsPage() {
  return (
    <div className='p-4 text-text-primary'>
      <h1 className='text-2xl font-bold'>EventsPage</h1>
    </div>
  )
}

function EventDetailPage() {
  return (
    <div className='p-4 text-text-primary'>
      <h1 className='text-2xl font-bold'>EventDetailPage</h1>
    </div>
  )
}

function SearchPage() {
  return (
    <div className='p-4 text-text-primary'>
      <h1 className='text-2xl font-bold'>SearchPage</h1>
    </div>
  )
}

function FavoritesPage() {
  return (
    <div className='p-4 text-text-primary'>
      <h1 className='text-2xl font-bold'>FavoritesPage</h1>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to='/events' replace />,
      },
      {
        path: 'events',
        element: <EventsPage />,
      },
      {
        path: 'event/:slug',
        element: <EventDetailPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
    ],
  },
])
