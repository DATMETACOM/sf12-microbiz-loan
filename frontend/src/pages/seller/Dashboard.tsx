import { useParams, useNavigate } from "react-router-dom"
import { sellers, cashflows, getScoringFactors, formatVND, formatVNDFull, typeLabels, platformLabels, getRiskLabel, getRiskColor, getRiskBg, LEVELS, getLevelByScore, getLevelProgress, LEVEL_REQUIREMENTS } from "../../data/mockData"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts"
import { ArrowLeft, TrendingUp, TrendingDown, Activity, ShoppingBag, ArrowRight, Bot, Star, Zap, Trophy, ChevronRight } from "lucide-react"

function SellerDetail({ id }: { id: string }) {
  const navigate = useNavigate()
  const seller = sellers.find((s) => s.id === id)
  if (!seller) return <div className="text-center py-12 text-slate-500">Không tìm thấy seller</div>

  const cf = cashflows[seller.id] || []
  const factors = getScoringFactors(seller, cf)
  const avgRevenue = cf.reduce((s, c) => s + c.revenue, 0) / cf.length
  const lastMonth = cf[cf.length - 1]
  const firstMonth = cf[0]
  const growth = lastMonth ? ((lastMonth.revenue / firstMonth.revenue - 1) * 100).toFixed(1) : "0"
  const avgReturn = cf.reduce((s, c) => s + c.return_rate, 0) / cf.length

  const fixedPayment = (seller.loan_limit || 30000000) * 0.02
  const revenuePayment = avgRevenue * 0.08

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/seller")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
      </button>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{seller.name}</h2>
            <p className="text-slate-500">{seller.shop_name} · {typeLabels[seller.seller_type]} · {platformLabels[seller.platform]}</p>
          </div>
          <div className="text-center">
            <p className={`text-4xl font-bold ${getRiskColor(seller.credit_score)}`}>{seller.credit_score}</p>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskBg(seller.credit_score)}`}>
              Rủi ro: {getRiskLabel(seller.credit_score)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Doanh thu TB/tháng", value: formatVNDFull(avgRevenue), icon: TrendingUp, color: "text-green-600 bg-green-50" },
          { label: "Tăng trưởng 6T", value: `${growth}%`, icon: parseFloat(growth) > 0 ? TrendingUp : TrendingDown, color: parseFloat(growth) > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50" },
          { label: "Giao dịch TB/tháng", value: Math.round(cf.reduce((s, c) => s + c.transactions, 0) / cf.length).toString(), icon: Activity, color: "text-blue-600 bg-blue-50" },
          { label: "Hạn mức vay", value: formatVNDFull(seller.loan_limit || 0), icon: ShoppingBag, color: "text-purple-600 bg-purple-50" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center mb-2`}><card.icon className="w-4 h-4" /></div>
            <p className="text-xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 mb-4">Xu hướng doanh thu 6 tháng</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={cf.map((c) => ({ month: c.month.slice(5), revenue: Math.round(c.revenue / 1e6), transactions: c.transactions }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} unit="M" />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number, name: string) => [name === "revenue" ? `${v}M VND` : v, name === "revenue" ? "Doanh thu" : "Giao dịch"]} />
            <Legend formatter={(v) => (v === "revenue" ? "Doanh thu (M VND)" : "Số giao dịch")} />
            <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Chi tiết chấm điểm AI (6 yếu tố)</h3>
          <div className="space-y-3">
            {factors.map((f) => (
              <div key={f.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">{f.name} <span className="text-slate-400">({f.weight}%)</span></span>
                  <span className="font-medium text-slate-800">{f.score}/{f.maxScore}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${f.score}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">So sánh: Trả nợ theo % Doanh thu vs Trả góp cố định</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cf.map((c, i) => ({
              month: c.month.slice(5),
              "Trả cố định (2%/tháng)": Math.round(fixedPayment / 1e6),
              "Trả theo doanh thu (8%)": Math.round((c.revenue * 0.08) / 1e6),
            }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="M" />
              <Tooltip formatter={(v: number) => [`${v}M VND`]} />
              <Bar dataKey="Trả cố định (2%/tháng)" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Trả theo doanh thu (8%)" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm text-green-800">
            Trả theo % doanh thu → tháng chậm trả ít hơn, tháng tốt trả nhiều hơn. Giảm NPL risk.
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">Xem AI chấm điểm tín dụng chi tiết</h3>
          <p className="text-sm text-slate-500">Powered by Qwen AI — phân tích cash flow real-time</p>
        </div>
        <button onClick={() => navigate(`/scoring/${seller.id}`)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Bot className="w-4 h-4" /> AI Scoring Demo <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Level-Up Map</h3>
              <p className="text-sm text-slate-500">Theo dõi tiến độ lên rank cao hơn</p>
            </div>
          </div>
          {(() => {
            const level = getLevelByScore(seller.credit_score)
            const { progress, next } = getLevelProgress(seller.credit_score)
            return (
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-4 py-2 ${level.bgColor} border ${level.borderColor} rounded-full`}>
                  <Star className={`w-4 h-4 ${level.color}`} />
                  <span className={`font-bold ${level.color}`}>{level.name}</span>
                </div>
                {next && (
                  <p className="text-xs text-slate-500 mt-1">{progress}% đến {next.name}</p>
                )}
              </div>
            )
          })()}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {LEVELS.map((lvl, idx) => {
            const isActive = seller.credit_score >= lvl.minScore
            const isCurrent = seller.credit_score >= lvl.minScore && seller.credit_score <= lvl.maxScore
            return (
              <div key={lvl.name} className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                isCurrent ? `${lvl.bgColor} border-${lvl.color.split("-")[1]}-400 shadow-md scale-105` : isActive ? `${lvl.bgColor} border-${lvl.color.split("-")[1]}-200` : "bg-slate-50 border-slate-200"
              }`}>
                <span className={`text-2xl mb-1 ${isActive ? "" : "opacity-30"}`}>
                  {idx === 0 ? "🥉" : idx === 1 ? "🥈" : idx === 2 ? "🥇" : idx === 3 ? "💎" : "👑"}
                </span>
                <span className={`text-xs font-bold ${isActive ? lvl.color : "text-slate-400"}`}>{lvl.name}</span>
                <span className={`text-xs ${isActive ? "text-slate-600" : "text-slate-400"}`}>{lvl.minScore}+</span>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-600" /> Yêu cầu lên cấp kế tiếp
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{LEVEL_REQUIREMENTS.refundRate.label}</span>
                <span className="font-medium text-green-600">{LEVEL_REQUIREMENTS.refundRate.next}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{LEVEL_REQUIREMENTS.apiConnected.label}</span>
                <span className="font-medium text-green-600">{LEVEL_REQUIREMENTS.apiConnected.next}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">{LEVEL_REQUIREMENTS.revenueGrowth.label}</span>
                <span className="font-medium text-green-600">{LEVEL_REQUIREMENTS.revenueGrowth.next}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" /> Đặc quyền hiện tại
            </h4>
            {(() => {
              const level = getLevelByScore(seller.credit_score)
              return (
                <ul className="space-y-1">
                  {level.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <ChevronRight className="w-3 h-3 text-green-500" /> {b}
                    </li>
                  ))}
                </ul>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SellerPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  if (id) return <SellerDetail id={id} />

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Danh sách Sellers ({sellers.length})</h2>
      <div className="grid gap-4">
        {sellers.map((s) => {
          const cf = cashflows[s.id] || []
          const growth = cf.length >= 2 ? ((cf[cf.length - 1].revenue / cf[0].revenue - 1) * 100).toFixed(1) : "0"
          return (
            <div key={s.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer flex items-center justify-between" onClick={() => navigate(`/seller/${s.id}`)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-lg font-bold text-blue-700">{s.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-slate-800">{s.name}</p>
                  <p className="text-sm text-slate-500">{s.shop_name} · {typeLabels[s.seller_type]} · <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">{platformLabels[s.platform]}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm text-slate-500">Doanh thu/tháng</p>
                  <p className="font-semibold text-slate-800">{formatVNDFull(s.monthly_revenue_avg)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Tăng trưởng</p>
                  <p className={`font-semibold ${parseFloat(growth) > 0 ? "text-green-600" : "text-red-600"}`}>{growth}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500">Credit Score</p>
                  <p className={`text-2xl font-bold ${getRiskColor(s.credit_score)}`}>{s.credit_score}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
