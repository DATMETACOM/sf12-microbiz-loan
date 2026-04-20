import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { sellers, cashflows, getScoringFactors, getRiskLabel, getRiskColor, getRiskBg, formatVNDFull, formatVND, platformLabels } from "../../data/mockData"
import { api } from "../../lib/api"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Bot, CheckCircle2, AlertTriangle, Clock, Sparkles, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"

const aiAnalysisSteps = [
  { step: 1, label: "Đang kết nối dữ liệu e-commerce...", icon: "🔗" },
  { step: 2, label: "Đang phân tích xu hướng doanh thu...", icon: "📈" },
  { step: 3, label: "Đang đánh giá khối lượng giao dịch...", icon: "📊" },
  { step: 4, label: "Đang kiểm tra tỷ lệ hoàn hàng...", icon: "📦" },
  { step: 5, label: "Qwen AI đang chấm điểm tín dụng...", icon: "🤖" },
  { step: 6, label: "Đang tạo đề xuất khoản vay...", icon: "💰" },
]

interface ScoringResult {
  score: number
  risk_level: string
  factors: Array<{ code: string; weight: number; impact: string }>
  recommendation: string
  loan_limit: number
  max_tenure_months: number
  reason_codes: string[]
  scoring_breakdown: Record<string, number>
  flow_analysis?: {
    monthly_revenue_trend: string
    revenue_stability_score: number
    growth_potential: string
    risk_factors: string[]
    recommended_loan_limit: number
    recommended_revenue_share_percent: number
    overall_assessment: string
  }
}

function ScoringDemo({ sellerId }: { sellerId: string }) {
  const navigate = useNavigate()
  const seller = sellers.find((s) => s.id === sellerId)
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const cf = cashflows[sellerId] || []
  const factors = getScoringFactors(seller!, cf)
  const avgRevenue = cf.reduce((s, c) => s + c.revenue, 0) / cf.length
  const localScore = Math.round(factors.reduce((s, f) => s + f.score * (f.weight / 100), 0))
  const localFinalScore = 300 + Math.round(localScore * 5.5)
  const localRecommendedLimit = Math.min(50000000, Math.round(avgRevenue * 1.5))
  const localRevenuePercent = localFinalScore >= 700 ? 6 : localFinalScore >= 600 ? 8 : 10

  useEffect(() => {
    if (!isAnalyzing) return
    const interval = setInterval(async () => {
      setCurrentStep((prev) => {
        if (prev >= aiAnalysisSteps.length - 1) {
          clearInterval(interval)
          setTimeout(async () => {
            setIsAnalyzing(false)
            try {
              const result = await api.loans.score(sellerId)
              setScoringResult(result as ScoringResult)
            } catch (err) {
              console.error("Scoring API error:", err)
              setError("Không thể kết nối API. Hiển thị kết quả mock.")
            }
            setShowResult(true)
          }, 800)
          return prev
        }
        return prev + 1
      })
    }, 1200)
    return () => clearInterval(interval)
  }, [isAnalyzing, sellerId])

  const displayScore = scoringResult?.score || localFinalScore
  const displayLimit = scoringResult?.loan_limit || localRecommendedLimit
  const displayRevenuePercent = scoringResult?.flow_analysis?.recommended_revenue_share_percent || localRevenuePercent

  if (!seller) return <div className="text-center py-12 text-slate-500">Không tìm thấy seller</div>

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600">
        <ArrowLeft className="w-4 h-4" /> Quay lại
      </button>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold text-slate-800">{seller.name}</h2>
            <p className="text-slate-500 text-sm">{seller.shop_name} · {platformLabels[seller.platform]}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
            <Bot className="w-4 h-4" /> Qwen AI Scoring Engine
          </div>
        </div>
      </div>

      {isAnalyzing && (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Qwen AI đang phân tích...</h3>
              <p className="text-sm text-slate-500">Model: qwen-plus · Context: 6 tháng cash flow data</p>
            </div>
          </div>
          <div className="space-y-3">
            {aiAnalysisSteps.map((step, i) => (
              <div key={step.step} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-500 ${
                i < currentStep ? "bg-green-50 text-green-700" : i === currentStep ? "bg-blue-100 text-blue-700" : "bg-white text-slate-400"
              }`}>
                {i < currentStep ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : i === currentStep ? <Loader2 className="w-5 h-5 text-blue-500 animate-spin" /> : <Clock className="w-5 h-5" />}
                <span className="text-sm font-medium">{step.icon} {step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showResult && (
        <div className="space-y-6 animate-[fadeIn_0.5s_ease-in]">
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              {error}
            </div>
          )}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-blue-500" /> Kết quả chấm điểm AI</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Credit Score</p>
                <p className={`text-6xl font-bold ${getRiskColor(displayScore)}`}>{displayScore}</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${getRiskBg(displayScore)}`}>
                  Rủi ro: {getRiskLabel(displayScore)}
                </span>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">Hạn mức đề xuất</p>
                <p className="text-4xl font-bold text-green-600">{formatVND(displayLimit)}</p>
                <p className="text-sm text-slate-400 mt-1">VND</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-1">% Doanh thu trả nợ</p>
                <p className="text-4xl font-bold text-purple-600">{displayRevenuePercent}%</p>
                <p className="text-sm text-slate-400 mt-1">doanh thu/tháng</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-4">Phân tích 6 yếu tố</h3>
              <div className="space-y-3">
                {factors.map((f) => (
                  <div key={f.name} className="group">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 font-medium">{f.name} <span className="text-slate-400 font-normal">({f.weight}%)</span></span>
                      <span className={`font-bold ${f.score >= 70 ? "text-green-600" : f.score >= 50 ? "text-yellow-600" : "text-red-600"}`}>{f.score}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full transition-all duration-1000 ${f.score >= 70 ? "bg-green-500" : f.score >= 50 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${f.score}%` }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{f.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">Điểm tổng hợp (có trọng số): {Math.round(weightedScore)}/100 → Credit Score: {finalScore}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-3">Xu hướng doanh thu</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={cf.map((c) => ({ month: c.month.slice(5), revenue: Math.round(c.revenue / 1e6) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} unit="M" />
                    <Tooltip formatter={(v: number) => [`${v}M VND`, "Doanh thu"]} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

<div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-3">So sánh phương thức trả nợ</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={cf.map((c) => ({
                    month: c.month.slice(5),
                    "Trả cố định": Math.round(((displayLimit) * 0.02) / 1e6),
                    "Trả % doanh thu": Math.round((c.revenue * displayRevenuePercent / 100) / 1e6),
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} unit="M" />
                    <Tooltip formatter={(v: number) => [`${v}M VND`]} />
                    <Bar dataKey="Trả cố định" fill="#ef4444" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="Trả % doanh thu" fill="#22c55e" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Đề xuất của Qwen AI</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center gap-2 mb-2"><CheckCircle2 className="w-5 h-5 text-green-600" /><span className="font-semibold text-green-800">Khuyến nghị: {scoringResult?.recommendation?.toUpperCase() || "DUYỆT"}</span></div>
                <p className="text-sm text-green-700">Seller có lịch sử kinh doanh ổn định, doanh thu tăng trưởng tích cực.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800"><span className="font-semibold">Hạn mức:</span> {formatVNDFull(displayLimit)}</p>
                <p className="text-sm text-blue-800"><span className="font-semibold">Thời hạn:</span> {scoringResult?.max_tenure_months || 6} tháng</p>
                <p className="text-sm text-blue-800"><span className="font-semibold">Lãi suất:</span> 18–22%/năm</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-sm text-purple-800"><span className="font-semibold">Trả nợ:</span> {displayRevenuePercent}% doanh thu/tháng</p>
                <p className="text-sm text-purple-800"><span className="font-semibold">TB/tháng:</span> {formatVNDFull(avgRevenue * displayRevenuePercent / 100)}</p>
                <p className="text-sm text-purple-800 mt-1 text-xs">* Linh hoạt theo doanh thu thực tế</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold">Lưu ý rủi ro</p>
              <p>Tỷ lệ hoàn hàng TB: {(cf.reduce((s, c) => s + c.return_rate, 0) / cf.length).toFixed(1)}%. Nên theo dõi chỉ số này định kỳ. {displayScore < 600 ? "Seller có risk level cao — cân nhắc hạn mức thấp hơn." : "Risk level chấp nhận được."}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ScoringPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  if (id) return <ScoringDemo sellerId={id} />

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><Bot className="w-5 h-5 text-white" /></div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">AI Alternative Credit Scoring</h2>
            <p className="text-sm text-slate-500">Powered by Qwen AI (qwen-plus) — không cần CIC history</p>
          </div>
        </div>
        <p className="text-slate-600 text-sm">Chọn seller để xem AI chấm điểm tín dụng theo 6 yếu tố. Hệ thống phân tích 6 tháng cash flow data từ e-commerce & e-wallet.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellers.map((s) => (
          <div key={s.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/scoring/${s.id}`)}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-sm font-bold text-blue-700">{s.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.shop_name}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskBg(s.credit_score)}`}>
                {getRiskLabel(s.credit_score)}
              </span>
              <span className="text-xs text-slate-400">{platformLabels[s.platform]}</span>
              <span className={`text-lg font-bold ${getRiskColor(s.credit_score)}`}>{s.credit_score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
