import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import AtelierPage from './components/atelier/AtelierPage'
import GalleryPage from './components/gallery/GalleryPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/atelier" element={<AtelierPage />} />
        <Route path="/atelier/:id" element={<AtelierPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<Navigate to="/atelier" replace />} />
      </Route>
    </Routes>
  )
}
