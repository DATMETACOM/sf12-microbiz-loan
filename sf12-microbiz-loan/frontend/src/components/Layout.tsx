import { Link, useLocation } from "react-router-dom"
import { BarChart3, Store, Bot, LayoutDashboard, Shield, Smartphone } from "lucide-react"

const navItems = [
  { path: "/", label: "Tổng quan", icon: LayoutDashboard },
  { path: "/seller", label: "Seller", icon: Store },
  { path: "/scoring", label: "AI Chấm điểm", icon: Bot },
  { path: "/mobile", label: "Mobile", icon: Smartphone },
  { path: "/admin", label: "Quản trị", icon: BarChart3 },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">MicroBiz Loan</h1>
              <p className="text-xs text-slate-400">Shinhan Finance x Qwen AI</p>
            </div>
          </div>
          <nav className="flex gap-1">
            {navItems.map((item) => {
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
            })}
          </nav>
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
