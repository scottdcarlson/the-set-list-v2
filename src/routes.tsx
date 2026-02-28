import { createBrowserRouter, Navigate } from 'react-router'
import { AppShell } from './components/layout/AppShell'
import { EventDetailPage } from './pages/EventDetailPage'
import { EventsPage } from './pages/EventsPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { SearchPage } from './pages/SearchPage'

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
