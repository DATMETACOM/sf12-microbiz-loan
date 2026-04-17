import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SellerDashboard from './pages/seller/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'
import ScoringPage from './pages/scoring/ScoringPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/seller" replace />} />
        <Route path="/seller/*" element={<SellerDashboard />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/scoring/*" element={<ScoringPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
