import { BrowserRouter, Routes, Route } from "react-router-dom"
import SF11Layout from "./components/SF11Layout"
import SF11Landing from "./pages/sf11/Landing"
import EmployeeDashboard from "./pages/sf11/EmployeeDashboard"
import HRDashboard from "./pages/sf11/HRDashboard"
import BankDashboard from "./pages/sf11/BankDashboard"
import AIRiskManagement from "./pages/sf11/AIRiskManagement"
import FinancialWellness from "./pages/sf11/FinancialWellness"
import AIAssistant from "./pages/sf11/AIAssistant"
import ShinhanMobileApp from "./pages/sf11/ShinhanMobileApp"

export default function SF11App() {
  return (
    <BrowserRouter>
      <SF11Layout>
        <Routes>
          <Route path="/" element={<SF11Landing />} />
          <Route path="/shinhan-app" element={<ShinhanMobileApp />} />
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/bank" element={<BankDashboard />} />
          <Route path="/ai-risk" element={<AIRiskManagement />} />
          <Route path="/financial-wellness" element={<FinancialWellness />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
        </Routes>
      </SF11Layout>
    </BrowserRouter>
  )
}
