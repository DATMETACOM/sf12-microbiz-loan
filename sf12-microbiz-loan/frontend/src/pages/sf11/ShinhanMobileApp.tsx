import { useState } from "react"
import {
  Smartphone,
  Home,
  Wallet,
  CreditCard,
  Users,
  Bell,
  Settings,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  AlertCircle,
  Star,
  Calendar,
  ChevronRight,
  MoreHorizontal,
  QrCode,
  Scan,
  MessageCircle
} from "lucide-react"
import MobileChatbox from "../../components/MobileChatbox"

const mockUserData = {
  name: "Nguyễn Văn A",
  accountNumber: "1234 5678 9012",
  balance: 15420000,
  salary: 25000000,
  nextSalaryDate: "2026-04-30",
  employer: "TechCorp Vietnam",
  employerConnected: true,
  ewaLimit: 7500000,
  ewaUsed: 2000000,
  creditScore: 750
}

const quickActions = [
  { icon: Zap, label: "Rút EWA", color: "from-green-500 to-emerald-600", route: "ewa" },
  { icon: ArrowUpRight, label: "Chuyển tiền", color: "from-blue-500 to-blue-600", route: "transfer" },
  { icon: QrCode, label: "Quét mã", color: "from-purple-500 to-purple-600", route: "qr" },
  { icon: CreditCard, label: "Thanh toán", color: "from-orange-500 to-orange-600", route: "pay" },
]

const recentTransactions = [
  { id: 1, type: "ewa", title: "Rút EWA", amount: -1000000, date: "15/04", icon: Zap, color: "text-green-600" },
  { id: 2, type: "salary", title: "Lương tháng 3", amount: 25000000, date: "31/03", icon: Wallet, color: "text-blue-600" },
  { id: 3, type: "transfer", title: "Chuyển đến Nguyễn Văn B", amount: -500000, date: "28/03", icon: ArrowUpRight, color: "text-red-600" },
  { id: 4, type: "ewa", title: "Rút EWA", amount: -500000, date: "20/03", icon: Zap, color: "text-green-600" },
]

const financialInsights = [
  { type: "info", title: "Lương sắp về", desc: "Bạn sẽ nhận lương vào 30/04", icon: Calendar, color: "text-blue-600 bg-blue-50" },
  { type: "success", title: "EWA sẵn sàng", desc: "Bạn còn 5.5M hạn mức EWA", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  { type: "warning", title: "Tiết kiệm tháng này", desc: "Đã tiết kiệm 2M, tiếp tục nhé!", icon: Star, color: "text-yellow-600 bg-yellow-50" },
]

export default function ShinhanMobileApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [showEWAModal, setShowEWAModal] = useState(false)
  const [showSalaryConnection, setShowSalaryConnection] = useState(false)
  const [isChatboxOpen, setIsChatboxOpen] = useState(false)

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative">
      {/* Status Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 flex justify-between items-center text-white text-xs">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <Smartphone className="w-4 h-4" />
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs opacity-80">Xin chào,</p>
            <h1 className="text-lg font-bold">{mockUserData.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsChatboxOpen(true)}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/10 rounded-full">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4">
          <p className="text-xs opacity-80 mb-1">Số dư khả dụng</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{(mockUserData.balance / 1000000).toFixed(1)}</span>
            <span className="text-sm">triệu VNĐ</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <CreditCard className="w-4 h-4" />
            <span className="text-xs opacity-80">****{mockUserData.accountNumber.slice(-4)}</span>
          </div>
        </div>

        {/* Salary Connection Status */}
        <div className="flex items-center justify-between bg-white/10 backdrop-blur rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs opacity-80">Đã kết nối lương</p>
              <p className="font-semibold text-sm">{mockUserData.employer}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-xs">Đã kích hoạt EWA</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 pb-24">
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                if (action.route === "ewa") setShowEWAModal(true)
              }}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-700">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Financial Insights */}
        <div className="mb-6">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Thông tin tài chính
          </h3>
          <div className="space-y-2">
            {financialInsights.map((insight, i) => (
              <div key={i} className={`p-3 rounded-xl border ${insight.color} flex items-start gap-3`}>
                <div className="p-2 bg-white rounded-lg flex-shrink-0">
                  <insight.icon className={`w-4 h-4 ${insight.color.split(" ")[0]}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-800">{insight.title}</p>
                  <p className="text-xs text-slate-600">{insight.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* EWA Limit Card */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Hạn mức EWA</h4>
                <p className="text-xs text-slate-600">30% lương tháng</p>
              </div>
            </div>
            <button
              onClick={() => setShowEWAModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
            >
              Rút ngay
            </button>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-semibold text-green-700">
                Đã dùng: {((mockUserData.ewaUsed / mockUserData.ewaLimit) * 100).toFixed(0)}%
              </span>
              <span className="text-xs font-semibold text-green-700">
                Còn lại: {((mockUserData.ewaLimit - mockUserData.ewaUsed) / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded-full bg-green-200">
              <div
                style={{ width: `${(mockUserData.ewaUsed / mockUserData.ewaLimit) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
              />
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800">Giao dịch gần đây</h3>
            <button className="text-blue-600 text-sm font-medium">Xem tất cả</button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${txn.color.replace("text-", "bg-").replace("600", "100")}`}>
                  <txn.icon className={`w-5 h-5 ${txn.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-800">{txn.title}</p>
                  <p className="text-xs text-slate-500">{txn.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${txn.amount > 0 ? "text-green-600" : "text-slate-800"}`}>
                    {txn.amount > 0 ? "+" : ""}{(txn.amount / 1000000).toFixed(1)}M
                  </p>
                  {txn.type === "ewa" && (
                    <p className="text-xs text-green-600">Phí: 15k</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-200 px-4 py-2">
        <div className="flex justify-around items-center">
          {[
            { icon: Home, label: "Trang chủ", route: "home" },
            { icon: Wallet, label: "EWA", route: "ewa" },
            { icon: Scan, label: "Quét mã", route: "scan" },
            { icon: Users, label: "Doanh nghiệp", route: "company" },
            { icon: MessageCircle, label: "Chat AI", route: "chat", action: () => setIsChatboxOpen(true) },
          ].map((item) => (
            <button
              key={item.route}
              onClick={() => {
                if (item.action) item.action()
                if (item.route === "ewa") setShowEWAModal(true)
                setActiveTab(item.route)
              }}
              className={`flex flex-col items-center gap-1 py-2 px-2 rounded-lg ${
                activeTab === item.route ? "text-blue-600 bg-blue-50" : "text-slate-400"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* EWA Modal */}
      {showEWAModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Rút EWA</h3>
              <button
                onClick={() => setShowEWAModal(false)}
                className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Số tiền muốn rút (VND)
                </label>
                <input
                  type="number"
                  placeholder="Nhập số tiền..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  max={mockUserData.ewaLimit - mockUserData.ewaUsed}
                />
                <p className="text-xs text-slate-500 mt-2">
                  Hạn mức còn lại: {((mockUserData.ewaLimit - mockUserData.ewaUsed) / 1000000).toFixed(1)}M VND
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Số tiền rút</span>
                  <span className="font-semibold text-slate-800">0 VND</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Phí dịch vụ (1.5%)</span>
                  <span className="font-semibold text-orange-600">0 VND</span>
                </div>
                <div className="border-t border-slate-200 my-2" />
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-slate-700">Tổng nhận</span>
                  <span className="font-bold text-green-600">0 VND</span>
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:opacity-90 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Rút ngay
              </button>

              <p className="text-xs text-center text-slate-500">
                Tiền sẽ vào tài khoản ngay lập tức sau khi xác thực
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Salary Connection Modal */}
      {showSalaryConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Kết nối lương với Shinhan</h3>
              <p className="text-sm text-slate-600">
                Kết nối tài khoản lương để nhận EWA và quản lý tài chính tốt hơn
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-4 border border-slate-200 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-slate-800">TechCorp Vietnam</p>
                  <p className="text-xs text-slate-500">Đã kết nối • Kích hoạt EWA</p>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium">
              Quản lý kết nối
            </button>
            <button
              onClick={() => setShowSalaryConnection(false)}
              className="w-full py-3 text-slate-600 font-medium mt-2"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Mobile Chatbox */}
      <MobileChatbox
        isOpen={isChatboxOpen}
        onClose={() => setIsChatboxOpen(!isChatboxOpen)}
      />
    </div>
  )
}

function User({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
