import { Link } from 'react-router-dom'

const navItems = [
  { path: '/seller', label: 'Seller', icon: '🏪' },
  { path: '/scoring', label: 'AI Scoring', icon: '🤖' },
  { path: '/admin', label: 'Admin', icon: '📊' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-blue-600">SF12</span>
          <span className="text-sm text-gray-500">MicroBiz Loan</span>
        </div>
        <div className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="px-3 py-1.5 rounded-md text-sm hover:bg-gray-100 transition-colors"
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  )
}
