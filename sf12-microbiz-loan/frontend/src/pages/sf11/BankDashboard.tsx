import { Shield, TrendingUp, AlertTriangle, Activity, DollarSign, Users, Zap, Brain, CheckCircle } from "lucide-react"

const mockBankStats = {
  totalLoans: 1250,
  activeLoans: 980,
  totalDisbursed: 18750000000, // 18.75B
  nplRate: 1.8, // <2% target
  avgCreditScore: 712,
  approvalRate: 92,
  processingTime: 3 // minutes
}

const corporateHealth = [
  { company: "TechCorp Vietnam", score: 85, status: "healthy", limit: 500000000, used: 120000000 },
  { company: "RetailMax Group", score: 72, status: "medium", limit: 300000000, used: 180000000 },
  { company: "ServiceHub Ltd", score: 65, status: "warning", limit: 200000000, used: 150000000 },
  { company: "DigitalFirst Co", score: 90, status: "healthy", limit: 400000000, used: 80000000 },
]

const recentTransactions = [
  { id: "TXN001", company: "TechCorp Vietnam", employee: "Nguyễn Văn A", amount: 2000000, type: "EWA", status: "completed", time: "2 phút trước" },
  { id: "TXN002", company: "RetailMax Group", employee: "Trần Thị B", amount: 1500000, type: "EWA", status: "completed", time: "5 phút trước" },
  { id: "TXN003", company: "ServiceHub Ltd", employee: "Lê Văn C", amount: 3000000, type: "Loan", status: "pending", time: "8 phút trước" },
  { id: "TXN004", company: "DigitalFirst Co", employee: "Phạm Thị D", amount: 1000000, type: "EWA", status: "completed", time: "12 phút trước" },
]

const riskAlerts = [
  { type: "high", message: "ServiceHub Ltd: Chậm thanh toán 3 ngày liên tiếp", company: "ServiceHub Ltd", time: "1 giờ trước" },
  { type: "medium", message: "RetailMax Group: Tăng đột biến rút EWA 50%", company: "RetailMax Group", time: "3 giờ trước" },
  { type: "low", message: "TechCorp Vietnam: 5 nhân viên nghỉ việc đột xuất", company: "TechCorp Vietnam", time: "6 giờ trước" },
]

export default function BankDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Ngân hàng & Admin</h2>
          <p className="text-sm text-slate-500 mt-1">Quản trị portfolio — NPL Target: &lt;2%</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium">
            Báo cáo chi tiết
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-sm font-medium hover:opacity-90">
            Quản trị rủi ro AI
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {[
          { label: "Tổng khoản vay", value: mockBankStats.totalLoans.toString(), icon: Activity, color: "text-blue-600 bg-blue-50" },
          { label: "Đang hoạt động", value: mockBankStats.activeLoans.toString(), icon: Users, color: "text-green-600 bg-green-50" },
          { label: "Tổng giải ngân", value: `${(mockBankStats.totalDisbursed / 1e9).toFixed(1)}B`, icon: DollarSign, color: "text-purple-600 bg-purple-50" },
          { label: "NPL Rate", value: `${mockBankStats.nplRate}%`, icon: AlertTriangle, color: mockBankStats.nplRate > 2 ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50" },
          { label: "Credit Score TB", value: mockBankStats.avgCreditScore.toString(), icon: Shield, color: "text-indigo-600 bg-indigo-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Sức khỏe Tài chính Doanh nghiệp Đối tác
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {corporateHealth.map((company, i) => (
              <div key={i} className="px-6 py-4 hover:bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      company.status === "healthy" ? "bg-green-500" :
                      company.status === "medium" ? "bg-yellow-500" : "bg-red-500"
                    }`} />
                    <h4 className="font-semibold text-slate-800">{company.company}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      company.status === "healthy" ? "bg-green-100 text-green-700" :
                      company.status === "medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      Score: {company.score}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-500">Hạn mức</span>
                      <span className="font-medium text-slate-700">{(company.limit / 1e6).toFixed(0)}M VND</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (company.used / company.limit) > 0.8 ? "bg-red-500" :
                          (company.used / company.limit) > 0.5 ? "bg-yellow-500" : "bg-green-500"
                        }`}
                        style={{ width: `${(company.used / company.limit) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Đã dùng</p>
                    <p className="font-semibold text-slate-700">{(company.used / 1e6).toFixed(1)}M</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h4 className="font-bold text-slate-800">Hiệu quả Portfolio</h4>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500">NPL Rate thực tế</p>
                <p className="text-2xl font-bold text-green-600">{mockBankStats.nplRate}%</p>
                <p className="text-xs text-green-700">Target: &lt;2% ✓</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tỷ lệ duyệt AI</p>
                <p className="text-2xl font-bold text-blue-600">{mockBankStats.approvalRate}%</p>
                <p className="text-xs text-slate-500">Auto-approved by Qwen AI</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-purple-600">{mockBankStats.processingTime} phút</p>
                <p className="text-xs text-slate-500">vs 3-7 ngày truyền thống</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Cảnh báo Rủi ro
            </h4>
            <div className="space-y-2">
              {riskAlerts.map((alert, i) => (
                <div key={i} className={`p-3 rounded-lg border ${
                  alert.type === "high" ? "bg-red-50 border-red-200" :
                  alert.type === "medium" ? "bg-yellow-50 border-yellow-200" :
                  "bg-blue-50 border-blue-200"
                }`}>
                  <p className={`text-xs font-medium ${
                    alert.type === "high" ? "text-red-700" :
                    alert.type === "medium" ? "text-yellow-700" :
                    "text-blue-700"
                  }`}>
                    {alert.message}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Giao dịch Gần đây
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Mã giao dịch</th>
                <th className="px-4 py-3 text-left font-medium">Công ty</th>
                <th className="px-4 py-3 text-left font-medium">Nhân viên</th>
                <th className="px-4 py-3 text-right font-medium">Số tiền</th>
                <th className="px-4 py-3 text-center font-medium">Loại</th>
                <th className="px-4 py-3 text-center font-medium">Trạng thái</th>
                <th className="px-4 py-3 text-right font-medium">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{txn.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{txn.company}</td>
                  <td className="px-4 py-3 text-slate-600">{txn.employee}</td>
                  <td className="px-4 py-3 text-right font-medium">{txn.amount.toLocaleString()} VND</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      txn.type === "EWA" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      txn.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {txn.status === "completed" ? "Hoàn thành" : "Chờ duyệt"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-500">{txn.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Building2({ className }: { className?: string }) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}
