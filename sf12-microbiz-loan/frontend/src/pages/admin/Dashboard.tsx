import { sellers, loans, formatVNDFull, getRiskColor, getRiskBg, getRiskLabel } from "../../data/mockData"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { BarChart3, TrendingUp, AlertTriangle, Users, Shield, Activity } from "lucide-react"

export default function AdminDashboard() {
  const totalLoans = loans.length
  const activeLoans = loans.filter((l) => l.status === "active").length
  const totalDisbursed = loans.reduce((s, l) => s + l.amount, 0)
  const overdueLoans = loans.filter((l) => l.status === "overdue").length
  const nplRate = totalLoans > 0 ? ((overdueLoans / totalLoans) * 100).toFixed(1) : "0"
  const avgScore = Math.round(sellers.reduce((s, x) => s + x.credit_score, 0) / sellers.length)

  const statusData = [
    { name: "Đang hoạt động", value: activeLoans, color: "#22c55e" },
    { name: "Đã tất toán", value: loans.filter((l) => l.status === "repaid").length, color: "#3b82f6" },
    { name: "Chờ duyệt", value: loans.filter((l) => l.status === "pending").length, color: "#eab308" },
    { name: "Quá hạn", value: overdueLoans, color: "#ef4444" },
  ]

  const scoreDistribution = [
    { range: "750+", count: sellers.filter((s) => s.credit_score >= 750).length, color: "#22c55e" },
    { range: "650-749", count: sellers.filter((s) => s.credit_score >= 650 && s.credit_score < 750).length, color: "#3b82f6" },
    { range: "550-649", count: sellers.filter((s) => s.credit_score >= 550 && s.credit_score < 650).length, color: "#eab308" },
    { range: "<550", count: sellers.filter((s) => s.credit_score < 550).length, color: "#ef4444" },
  ]

  const revenueByPlatform = [
    { platform: "Shopee", revenue: Math.round(sellers.filter((s) => s.platform === "shopee").reduce((s, x) => s + x.monthly_revenue_avg, 0) / 1e6) },
    { platform: "Lazada", revenue: Math.round(sellers.filter((s) => s.platform === "lazada").reduce((s, x) => s + x.monthly_revenue_avg, 0) / 1e6) },
    { platform: "TikTok Shop", revenue: Math.round(sellers.filter((s) => s.platform === "tiktok_shop").reduce((s, x) => s + x.monthly_revenue_avg, 0) / 1e6) },
    { platform: "MoMo", revenue: Math.round(sellers.filter((s) => s.platform === "momo").reduce((s, x) => s + x.monthly_revenue_avg, 0) / 1e6) },
    { platform: "ZaloPay", revenue: Math.round(sellers.filter((s) => s.platform === "zalopay").reduce((s, x) => s + x.monthly_revenue_avg, 0) / 1e6) },
  ].filter((d) => d.revenue > 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Bảng điều khiển quản trị — Shinhan Finance</h2>
        <span className="text-sm text-slate-400">Cập nhật: Tháng 4/2026</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Tổng khoản vay", value: totalLoans.toString(), icon: BarChart3, color: "text-blue-600 bg-blue-50" },
          { label: "Đang hoạt động", value: activeLoans.toString(), icon: Activity, color: "text-green-600 bg-green-50" },
          { label: "Tổng giải ngân", value: formatVNDFull(totalDisbursed), icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
          { label: "NPL Rate", value: `${nplRate}%`, icon: AlertTriangle, color: `${parseFloat(nplRate) > 5 ? "text-red-600 bg-red-50" : "text-green-600 bg-green-50"}` },
          { label: "Credit Score TB", value: avgScore.toString(), icon: Shield, color: "text-indigo-600 bg-indigo-50" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center mb-2`}><card.icon className="w-4 h-4" /></div>
            <p className="text-xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Trạng thái khoản vay</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={statusData.filter((d) => d.value > 0)} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Phân bổ Credit Score</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => [v, "Sellers"]} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {scoreDistribution.map((d) => <Cell key={d.range} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Doanh thu theo nền tảng</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueByPlatform} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} unit="M" />
              <YAxis dataKey="platform" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip formatter={(v: number) => [`${v}M VND`, "Doanh thu TB"]} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Danh sách khoản vay ({loans.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Mã khoản vay</th>
                <th className="px-4 py-2.5 text-left font-medium">Seller</th>
                <th className="px-4 py-2.5 text-left font-medium">Shop</th>
                <th className="px-4 py-2.5 text-right font-medium">Số tiền</th>
                <th className="px-4 py-2.5 text-center font-medium">Lãi suất</th>
                <th className="px-4 py-2.5 text-center font-medium">% Doanh thu</th>
                <th className="px-4 py-2.5 text-center font-medium">AI Score</th>
                <th className="px-4 py-2.5 text-center font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((l) => {
                const statusMap: Record<string, { label: string; cls: string }> = {
                  active: { label: "Đang hoạt động", cls: "bg-green-100 text-green-700" },
                  repaid: { label: "Đã tất toán", cls: "bg-blue-100 text-blue-700" },
                  pending: { label: "Chờ duyệt", cls: "bg-yellow-100 text-yellow-700" },
                  overdue: { label: "Quá hạn", cls: "bg-red-100 text-red-700" },
                }
                const st = statusMap[l.status] || { label: l.status, cls: "bg-slate-100 text-slate-600" }
                return (
                  <tr key={l.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-2.5 font-mono text-xs text-slate-600">{l.id}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{l.seller_name}</td>
                    <td className="px-4 py-2.5 text-slate-600">{l.shop_name}</td>
                    <td className="px-4 py-2.5 text-right font-medium">{formatVNDFull(l.amount)}</td>
                    <td className="px-4 py-2.5 text-center">{l.interest_rate.toFixed(1)}%/năm</td>
                    <td className="px-4 py-2.5 text-center font-medium text-purple-600">{l.revenue_percent.toFixed(1)}%</td>
                    <td className="px-4 py-2.5 text-center"><span className={`font-bold ${getRiskColor(l.ai_score)}`}>{l.ai_score}</span></td>
                    <td className="px-4 py-2.5 text-center"><span className={`px-2 py-0.5 rounded text-xs font-medium ${st.cls}`}>{st.label}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <h3 className="font-semibold text-slate-800 mb-3">Hiệu quả portfolio</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div><p className="text-sm text-slate-500">NPL Rate thực tế</p><p className="text-2xl font-bold text-green-600">{nplRate}%</p><p className="text-xs text-green-700">Target: &lt;5% ✓</p></div>
          <div><p className="text-sm text-slate-500">Tỷ lệ duyệt AI</p><p className="text-2xl font-bold text-blue-600">92%</p><p className="text-xs text-slate-500">Auto-approved by Qwen AI</p></div>
          <div><p className="text-sm text-slate-500">Avg. Processing Time</p><p className="text-2xl font-bold text-purple-600">3 phút</p><p className="text-xs text-slate-500">vs 3-7 ngày truyền thống</p></div>
          <div><p className="text-sm text-slate-500">Customer Segment mới</p><p className="text-2xl font-bold text-orange-600">{sellers.filter((s) => s.credit_score < 600).length}/{sellers.length}</p><p className="text-xs text-slate-500">Không có CIC history</p></div>
        </div>
      </div>
    </div>
  )
}
