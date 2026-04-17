import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import {
  LayoutDashboard,
  Wallet,
  Users,
  Building2,
  Shield,
  Activity,
  Brain,
  AlertTriangle,
  MessageCircle,
  Smartphone
} from "lucide-react"
import ChatboxSidebar from "./ChatboxSidebar"

const navItems = [
  { path: "/", label: "Tổng quan", icon: LayoutDashboard, role: "all" },
  { path: "/shinhan-app", label: "App Shinhan", icon: Smartphone, role: "all" },
  { path: "/ai-assistant", label: "Trợ lý Thông minh", icon: MessageCircle, role: "all" },
  { path: "/employee", label: "Nhân viên", icon: Users, role: "employee" },
  { path: "/hr", label: "HR & Doanh nghiệp", icon: Building2, role: "hr" },
  { path: "/bank", label: "Ngân hàng & Admin", icon: Shield, role: "bank" },
  { path: "/ai-risk", label: "AI Quản trị rủi ro", icon: Brain, role: "bank" },
  { path: "/financial-wellness", label: "Sức khỏe tài chính", icon: Activity, role: "hr" },
]

export default function SF11Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [isChatboxOpen, setIsChatboxOpen] = useState(false)

  // Determine user role based on current path
  const getUserRole = (): "employee" | "hr" | "bank" => {
    if (location.pathname.startsWith("/hr") || location.pathname.startsWith("/financial-wellness")) return "hr"
    if (location.pathname.startsWith("/bank") || location.pathname.startsWith("/ai-risk")) return "bank"
    return "employee"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 leading-tight">EWA & Salary-Linked Lending</h1>
                <p className="text-xs text-slate-500 font-medium">Trợ lý Tài chính Vô tư — [SF11]</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-xs font-semibold text-green-700 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  NPL Target: &lt;2%
                </span>
              </div>
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto pb-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.path ||
                           (item.path !== "/" && location.pathname.startsWith(item.path))

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                    active
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-slate-500">
          <span>[SF11] Earned Wage Access & Salary-Linked Lending — V2.0 AI Financial Advisor</span>
          <span>Powered by Qwen AI + Alibaba Cloud</span>
        </div>
      </footer>

      <ChatboxSidebar
        isOpen={isChatboxOpen}
        onClose={() => setIsChatboxOpen(!isChatboxOpen)}
        userRole={getUserRole()}
      />
    </div>
  )
}
