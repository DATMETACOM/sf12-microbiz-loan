import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { sellers, getCashflowsBySellerId, formatVND, getRiskLabel, getPlatformLabel, getSellerTypeLabel } from "../../data/mockData"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ArrowLeft, TrendingUp, TrendingDown, Bot, ArrowRight, Loader2, AlertCircle } from "lucide-react"

function SellerDetail({ id }: { id: string }) {
  const navigate = useNavigate()
  const seller = sellers.find((s) => s.id === id)
  const cashflowData = getCashflowsBySellerId(id)

  const [aiResult, setAiResult] = useState<any>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  if (!seller) return <div className="text-center py-12 text-slate-500">Không tìm thấy seller</div>

  const avgRevenue = cashflowData.reduce((s, c) => s + c.revenue, 0) / cashflowData.length
  const latestCF = cashflowData[cashflowData.length - 1]
  const firstCF = cashflowData[0]
  const growth = firstCF && latestCF ? ((latestCF.revenue / firstCF.revenue - 1) * 100).toFixed(1) : "0"

  const handleAIAnalysis = async () => {
    setAiLoading(true)
    setAiError(null)
    setAiResult(null)

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seller_id: seller.id,
          seller_data: seller,
          cashflow_data: cashflowData,
          mode: 'all'
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get AI analysis')
      }

      const result = await response.json()
      setAiResult(result)
    } catch (err: any) {
      setAiError(err.message)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/seller")} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
      </button>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{seller.name}</h2>
            <p className="text-slate-500">
              {seller.shop_name} · {getSellerTypeLabel(seller.seller_type)} · {getPlatformLabel(seller.platform)}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-4xl font-bold ${seller.credit_score >= 700 ? 'text-green-600' : seller.credit_score >= 600 ? 'text-yellow-600' : 'text-red-600'}`}>
              {seller.credit_score}
            </p>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              seller.risk_segment === 'low' ? 'bg-green-50 text-green-700' :
              seller.risk_segment === 'medium' ? 'bg-yellow-50 text-yellow-700' :
              seller.risk_segment === 'high' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
            }`}>
              Rủi ro: {getRiskLabel(seller.risk_segment)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Doanh thu TB/tháng", value: formatVND(avgRevenue), icon: TrendingUp, color: "text-green-600 bg-green-50" },
          { label: "Tăng trưởng 6T", value: `${growth}%`, icon: parseFloat(growth) > 0 ? TrendingUp : TrendingDown, color: parseFloat(growth) > 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50" },
          { label: "Giao dịch TB/tháng", value: Math.round(cashflowData.reduce((s, c) => s + c.transactions, 0) / cashflowData.length).toString(), icon: TrendingUp, color: "text-blue-600 bg-blue-50" },
          { label: "Hạn mức vay", value: formatVND(seller.loan_limit), icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className={`w-8 h-8 rounded-lg ${card.color} flex items-center justify-center mb-2`}><card.icon className="w-4 h-4" /></div>
            <p className="text-xl font-bold text-slate-800">{card.value}</p>
            <p className="text-xs text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      {cashflowData.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Xu hướng doanh thu {cashflowData.length} tháng</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={cashflowData.map((c) => ({ month: c.month.slice(5), revenue: Math.round(c.revenue / 1e6), transactions: c.transactions }))}>
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
      )}

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-800">Phân tích AI với Qwen</h3>
          <p className="text-sm text-slate-500">Powered by Qwen3-Max — scoring & insights</p>
        </div>
        <button
          onClick={handleAIAnalysis}
          disabled={aiLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
          {aiLoading ? "Đang phân tích..." : "AI Analysis"}
        </button>
      </div>

      {aiError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p>{aiError}</p>
        </div>
      )}

      {aiResult && !aiResult.error && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 space-y-6">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            Kết quả phân tích AI
          </h3>

          {aiResult.credit_score && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-blue-700">{aiResult.credit_score}</p>
                <p className="text-sm text-slate-600">Credit Score</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center">
                <p className={`text-lg font-bold ${aiResult.risk_level === 'low' ? 'text-green-700' : aiResult.risk_level === 'high' ? 'text-red-700' : 'text-yellow-700'}`}>
                  {aiResult.risk_level?.toUpperCase()}
                </p>
                <p className="text-sm text-slate-600">Risk Level</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
                <p className="text-lg font-bold text-purple-700">{formatVND(aiResult.recommended_loan_limit || seller.loan_limit)}</p>
                <p className="text-sm text-slate-600">Recommended Limit</p>
              </div>
            </div>
          )}

          {aiResult.scoring_breakdown && (
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Scoring Breakdown</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(aiResult.scoring_breakdown).map(([key, value]: [string, any]) => (
                  <div key={key} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="font-medium text-slate-800">{typeof value === 'number' ? value : value.score || 'N/A'}</span>
                    </div>
                    {typeof value === 'object' && value.score !== undefined && (
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${value.score}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {aiResult.recommendation && (
            <div className={`p-4 rounded-lg ${
              aiResult.recommendation === 'approve' ? 'bg-green-50 border border-green-200 text-green-700' :
              aiResult.recommendation === 'review' ? 'bg-yellow-50 border border-yellow-200 text-yellow-700' :
              'bg-red-50 border border-red-200 text-red-700'
            }`}>
              <p className="font-medium">Recommendation: {aiResult.recommendation.toUpperCase()}</p>
            </div>
          )}

          {aiResult.business_tips && aiResult.business_tips.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Business Tips</h4>
              <ul className="space-y-2">
                {aiResult.business_tips.map((tip: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-blue-500">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {aiResult.risk_alerts && aiResult.risk_alerts.length > 0 && (
            <div>
              <h4 className="font-medium text-slate-700 mb-3">Risk Alerts</h4>
              <ul className="space-y-2">
                {aiResult.risk_alerts.map((alert: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mt-0.5" /> {alert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
        <h3 className="font-semibold text-slate-800 mb-2">Thông tin khác</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-slate-500">Platform:</span> <span className="font-medium">{getPlatformLabel(seller.platform)}</span></div>
          <div><span className="text-slate-500">DSR Ratio:</span> <span className="font-medium">{(seller.dsr_ratio * 100).toFixed(1)}%</span></div>
          <div><span className="text-slate-500">Loan Cycles:</span> <span className="font-medium">{seller.loan_cycle_count}</span></div>
          <div><span className="text-slate-500">Fraud Score:</span> <span className={`font-medium ${seller.fraud_score > 40 ? 'text-red-600' : 'text-slate-800'}`}>{seller.fraud_score.toFixed(1)}</span></div>
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
          const cf = getCashflowsBySellerId(s.id)
          const growth = cf.length >= 2 ? ((cf[cf.length - 1].revenue / cf[0].revenue - 1) * 100).toFixed(1) : "0"
          return (
            <div key={s.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer flex items-center justify-between" onClick={() => navigate(`/seller/${s.id}`)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-lg font-bold text-blue-700">{s.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-slate-800">{s.name}</p>
                  <p className="text-sm text-slate-500">{s.shop_name} · {getSellerTypeLabel(s.seller_type)} · <span className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">{getPlatformLabel(s.platform)}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-sm text-slate-500">Doanh thu/tháng</p>
                  <p className="font-semibold text-slate-800">{formatVND(s.monthly_revenue_avg)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Tăng trưởng</p>
                  <p className={`font-semibold ${parseFloat(growth) > 0 ? "text-green-600" : "text-red-600"}`}>{growth}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-500">Credit Score</p>
                  <p className={`text-2xl font-bold ${s.credit_score >= 700 ? 'text-green-600' : s.credit_score >= 600 ? 'text-yellow-600' : 'text-red-600'}`}>{s.credit_score}</p>
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