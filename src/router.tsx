import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import AtelierPage from './components/atelier/AtelierPage'
import GalleryPage from './components/gallery/GalleryPage'

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
])
