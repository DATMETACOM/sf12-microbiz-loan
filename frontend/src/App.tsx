import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Landing from "./pages/Landing"
import SellerPage from "./pages/seller/Dashboard"
import ScoringPage from "./pages/scoring/ScoringPage"
import AdminDashboard from "./pages/admin/Dashboard"
import MobilePage from "./pages/mobile/MobilePage"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/seller" element={<SellerPage />} />
          <Route path="/seller/:id" element={<SellerPage />} />
          <Route path="/scoring" element={<ScoringPage />} />
          <Route path="/scoring/:id" element={<ScoringPage />} />
          <Route path="/mobile" element={<MobilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
