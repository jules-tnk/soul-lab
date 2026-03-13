import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import AtelierPage from './components/atelier/AtelierPage'
import GalleryPage from './components/gallery/GalleryPage'

const base = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/atelier', element: <AtelierPage /> },
      { path: '/atelier/:id', element: <AtelierPage /> },
      { path: '/gallery', element: <GalleryPage /> },
      { path: '*', element: <Navigate to="/atelier" replace /> },
    ],
  },
], { basename: base })
