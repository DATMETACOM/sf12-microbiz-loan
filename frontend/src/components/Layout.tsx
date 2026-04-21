import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Store, Bot, BarChart3, Shield, Smartphone, Users } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  const sellerNavItems = [
    { path: "/", label: "Tổng quan", icon: LayoutDashboard },
    { path: "/seller", label: "Sellers", icon: Users },
    { path: "/scoring", label: "AI Scoring", icon: Bot },
  ]

  const adminNavItems = [
    { path: "/admin", label: "Admin", icon: BarChart3 },
  ]

  const renderNavItem = (item: { path: string; label: string; icon: any }) => {
    const Icon = item.icon
    const active = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
          active ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
        }`}
      >
        <Icon className="w-4 h-4" />
        {item.label}
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">MicroBiz Loan</h1>
                <p className="text-xs text-slate-400">[SF12] AI-Powered Micro Lending for Digital Economy Sellers</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 mr-2">Seller:</span>
              {sellerNavItems.map(renderNavItem)}
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 mr-2">Admin:</span>
              {adminNavItems.map(renderNavItem)}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 bg-white mt-12 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-slate-400">
          <span>[SF12] MicroBiz Loan for Digital Economy Sellers</span>
          <span>Powered by Qwen AI + Alibaba Cloud</span>
        </div>
      </footer>
    </div>
  )
}
