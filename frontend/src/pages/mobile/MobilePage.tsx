import { useState } from "react"
import {
  Thermometer,
  Lightbulb,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wallet,
  Target,
  Zap,
  MessageCircle,
  Phone,
  BarChart3,
  ChevronRight,
  Star,
  Shield,
  Activity,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts"
import { sellers, cashflows, formatVNDFull, formatVND, getRiskColor, getRiskLabel, getRiskBg } from "../../data/mockData"

// ---------- Types ----------
interface SmartInsight {
  id: string
  type: "opportunity" | "warning" | "tip" | "alert"
  title: string
  body: string
  action?: string
  timestamp: string
}

interface LevelMission {
  id: string
  title: string
  description: string
  progress: number // 0-100
  reward: string
  icon: string
}

interface ThermometerData {
  todayRate: number
  normalRate: number
  label: string
  reason: string
  todayRevenue: number
  todayDeduction: number
  todayKept: number
}

// ---------- Mock Data Generators ----------
function getThermometerData(sellerId: string): ThermometerData {
  const seller = sellers.find((s) => s.id === sellerId)!
  const cf = cashflows[sellerId]
  const latestMonth = cf[cf.length - 1]
  const dailyAvg = Math.round(latestMonth.revenue / 25)

  // Simulate dynamic deduction: adjust based on daily performance
  const baseRate = 10 // base revenue %
  const performanceRatio = dailyAvg / (seller.monthly_revenue_avg / 25)
  let adjustedRate: number
  let label: string
  let reason: string

  if (performanceRatio < 0.7) {
    adjustedRate = 6
    label = "Ngày ế ẩm — Giảm trích nợ"
    reason = "AI giảm tỷ lệ trích nợ xuống 6% để giữ vốn lưu động cho shop"
  } else if (performanceRatio > 1.3) {
    adjustedRate = 14
    label = "Mega Sale — Tăng trích nợ"
    reason = "Doanh thu vượt trội, AI tăng trích nợ 14% để tất toán sớm, giảm phí"
  } else {
    adjustedRate = 10
    label = "Bình thường"
    reason = "Tỷ lệ trích nợ ổn định 10% theo hợp đồng"
  }

  const deduction = Math.round(dailyAvg * adjustedRate / 100)
  const kept = dailyAvg - deduction

  return {
    todayRate: adjustedRate,
    normalRate: baseRate,
    label,
    reason,
    todayRevenue: dailyAvg,
    todayDeduction: deduction,
    todayKept: kept,
  }
}

function generateInsights(sellerId: string): SmartInsight[] {
  const seller = sellers.find((s) => s.id === sellerId)!
  const cf = cashflows[sellerId]
  const last3 = cf.slice(-3)
  const trend = last3[last3.length - 1].revenue / last3[0].revenue

  const insights: SmartInsight[] = [
    {
      id: "ins1",
      type: "opportunity",
      title: "🔥 Dự báo nhu cầu tăng mạnh",
      body: `AI phát hiện trend sản phẩm của bạn đang tăng ${((trend - 1) * 100).toFixed(0)}% trong 3 tháng gần đây. Kho có thể hết hàng trong 5 ngày.`,
      action: "Giải ngân tức thì 15M để nhập hàng đón trend",
      timestamp: "2 giờ trước",
    },
    {
      id: "ins2",
      type: "tip",
      title: "💡 Mẹo tối ưu dòng tiền",
      body: `Hôm nay doanh thu thấp (${formatVND(getThermometerData(sellerId).todayRevenue)}). AI đã tự động giảm tỷ lệ trích nợ để bạn giữ vốn nhập hàng.`,
      timestamp: "5 giờ trước",
    },
    {
      id: "ins3",
      type: "warning",
      title: "⚠️ Cảnh báo tỷ lệ hoàn hàng",
      body: `Tỷ lệ hoàn hàng tháng này là ${cf[cf.length - 1].return_rate.toFixed(1)}%, gần ngưỡng 5%. Hãy kiểm tra chất lượng sản phẩm và đóng gói.`,
      action: "Xem chi tiết đơn hàng có vấn đề",
      timestamp: "1 ngày trước",
    },
    {
      id: "ins4",
      type: "alert",
      title: "🎯 Sắp thăng hạng tín dụng!",
      body: `Bạn còn 2 nhiệm vụ nữa để mở khóa hạn mức ${formatVNDFull((seller.loan_limit || 0) + 15000000)}. Duy trì kết nối API và giảm tỷ lệ hoàn hàng dưới 3%.`,
      action: "Xem bản đồ thăng hạng",
      timestamp: "2 ngày trước",
    },
  ]

  return insights
}

function generateMissions(sellerId: string): LevelMission[] {
  const seller = sellers.find((s) => s.id === sellerId)!
  const score = seller.credit_score

  // Determine current level
  let currentLevel: string
  let nextLevel: string
  if (score >= 750) {
    currentLevel = "Bạch Kim"
    nextLevel = "Kim Cương"
  } else if (score >= 650) {
    currentLevel = "Vàng"
    nextLevel = "Bạch Kim"
  } else if (score >= 550) {
    currentLevel = "Bạc"
    nextLevel = "Vàng"
  } else {
    currentLevel = "Đồng"
    nextLevel = "Bạc"
  }

  const missions: LevelMission[] = [
    {
      id: "m1",
      title: "Duy trì tỷ lệ hoàn hàng < 3%",
      description: "Giữ chất lượng đơn hàng tốt để giảm tỷ lệ hoàn",
      progress: score >= 650 ? 100 : Math.round((score / 650) * 100),
      reward: "+50 điểm tín dụng",
      icon: "shield",
    },
    {
      id: "m2",
      title: "Kết nối API liên tục 30 ngày",
      description: "Duy trì liên kết dữ liệu với sàn TMĐT không gián đoạn",
      progress: 80,
      reward: "+30 điểm tín dụng + mở khóa hạn mức cao hơn",
      icon: "activity",
    },
    {
      id: "m3",
      title: "Tăng trưởng doanh thu 15% tháng",
      description: "Mở rộng kinh doanh đều đặn để chứng minh năng lực",
      progress: score >= 600 ? 90 : 60,
      reward: "Lãi suất giảm 1-2%",
      icon: "trending",
    },
    {
      id: "m4",
      title: "Đa dạng hóa nền tảng",
      description: "Mở bán trên 2+ nền tảng để giảm phụ thuộc",
      progress: seller.platform === "shopee" ? 40 : 70,
      reward: "+20 điểm tín dụng + hạn mức +10M",
      icon: "star",
    },
  ]

  return missions
}

// ---------- Sub-Components ----------

function PhoneFrame({ children, sellerName }: { children: React.ReactNode; sellerName: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Phone mockup */}
      <div className="relative w-[380px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border border-slate-700">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="bg-white rounded-[2.2rem] overflow-hidden min-h-[700px] max-h-[700px] overflow-y-auto">
          {/* Status bar */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 pt-8 pb-3">
            <div className="flex items-center justify-between text-white text-xs mb-2">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>●●●</span>
                <span>🔋</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm">
                👤
              </div>
              <div>
                <p className="text-xs text-white/70">Chào buổi sáng,</p>
                <p className="text-sm font-bold">{sellerName}</p>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center">Giao diện Mobile App — Trợ lý thông minh Mini-CFO</p>
    </div>
  )
}

function ThermometerGauge({ data }: { data: ThermometerData }) {
  const percentage = (data.todayRate / 20) * 100 // max rate 20%
  const isLow = data.todayRate < 10
  const isHigh = data.todayRate > 10

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <Thermometer className={`w-4 h-4 ${isLow ? "text-blue-500" : isHigh ? "text-orange-500" : "text-green-500"}`} />
        <span className="text-xs font-semibold text-slate-700">Nhiệt kế dòng tiền</span>
      </div>

      {/* Gauge bar */}
      <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ${
            isLow ? "bg-gradient-to-r from-blue-400 to-blue-500" : isHigh ? "bg-gradient-to-r from-orange-400 to-orange-500" : "bg-gradient-to-r from-green-400 to-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
        {/* Normal rate marker */}
        <div
          className="absolute top-0 h-full w-0.5 bg-slate-400"
          style={{ left: `${(data.normalRate / 20) * 100}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 mb-2">
        <span>0%</span>
        <span className="text-slate-500">Bình thường: {data.normalRate}%</span>
        <span>20%</span>
      </div>

      {/* Today's rate */}
      <div className={`rounded-lg p-2.5 ${isLow ? "bg-blue-50 border border-blue-100" : isHigh ? "bg-orange-50 border border-orange-100" : "bg-green-50 border border-green-100"}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-slate-700">Hôm nay: {data.todayRate}%</span>
          {isLow && <ArrowDownRight className="w-3.5 h-3.5 text-blue-500" />}
          {isHigh && <ArrowUpRight className="w-3.5 h-3.5 text-orange-500" />}
        </div>
        <p className="text-[10px] text-slate-500">{data.reason}</p>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-400">Doanh thu hôm nay</p>
          <p className="text-xs font-bold text-slate-700">{formatVND(data.todayRevenue)}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <p className="text-[10px] text-slate-400">Trích nợ hôm nay</p>
          <p className="text-xs font-bold text-red-600">{formatVND(data.todayDeduction)}</p>
        </div>
        <div className="col-span-2 bg-green-50 rounded-lg p-2 text-center border border-green-100">
          <p className="text-[10px] text-green-600">Giữ lại vốn lưu động</p>
          <p className="text-xs font-bold text-green-700">{formatVND(data.todayKept)}</p>
        </div>
      </div>
    </div>
  )
}

function SmartInsightsCard({ insights }: { insights: SmartInsight[] }) {
  const typeStyles: Record<string, string> = {
    opportunity: "bg-amber-50 border-amber-200",
    warning: "bg-red-50 border-red-200",
    tip: "bg-blue-50 border-blue-200",
    alert: "bg-purple-50 border-purple-200",
  }

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-semibold text-slate-700">Smart Insights — AI Cố vấn</span>
      </div>

      <div className="space-y-2">
        {insights.map((ins) => (
          <div key={ins.id} className={`rounded-lg p-2.5 border ${typeStyles[ins.type]}`}>
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold text-slate-700 leading-tight">{ins.title}</p>
              <span className="text-[9px] text-slate-400 whitespace-nowrap">{ins.timestamp}</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{ins.body}</p>
            {ins.action && (
              <button className="mt-1.5 text-[10px] font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-700">
                {ins.action}
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function LevelUpMap({ missions, currentLevel, nextLevel }: { missions: LevelMission[]; currentLevel: string; nextLevel: string }) {
  const levelColors: Record<string, string> = {
    "Đồng": "from-amber-600 to-amber-700",
    "Bạc": "from-slate-400 to-slate-500",
    "Vàng": "from-yellow-400 to-yellow-500",
    "Bạch Kim": "from-blue-400 to-blue-500",
    "Kim Cương": "from-cyan-400 to-cyan-500",
  }

  const levelOrder = ["Đồng", "Bạc", "Vàng", "Bạch Kim", "Kim Cương"]
  const currentIndex = levelOrder.indexOf(currentLevel)

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-yellow-500" />
        <span className="text-xs font-semibold text-slate-700">Bản đồ Thăng hạng</span>
      </div>

      {/* Current level badge */}
      <div className={`bg-gradient-to-r ${levelColors[currentLevel] || "from-slate-400 to-slate-500"} rounded-lg p-2.5 mb-3 text-white text-center`}>
        <p className="text-[10px] opacity-80">Hạng hiện tại</p>
        <p className="text-sm font-bold">{currentLevel}</p>
        <p className="text-[10px] opacity-80">→ Mục tiêu: {nextLevel}</p>
      </div>

      {/* Level progress bar */}
      <div className="flex items-center gap-1 mb-3">
        {levelOrder.map((level, i) => (
          <div
            key={level}
            className={`flex-1 h-1.5 rounded-full ${
              i <= currentIndex ? "bg-blue-500" : i === currentIndex + 1 ? "bg-slate-300" : "bg-slate-100"
            }`}
          />
        ))}
      </div>

      {/* Missions */}
      <div className="space-y-2">
        {missions.map((m) => (
          <div key={m.id} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              {m.progress >= 100 ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Target className="w-3.5 h-3.5 text-blue-500" />
              )}
              <span className="text-[11px] font-semibold text-slate-700">{m.title}</span>
            </div>
            <p className="text-[9px] text-slate-400 mb-1.5">{m.description}</p>

            {/* Progress bar */}
            <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1">
              <div
                className={`h-full rounded-full transition-all ${m.progress >= 100 ? "bg-green-500" : "bg-blue-500"}`}
                style={{ width: `${Math.min(m.progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-400">{m.progress}% hoàn thành</span>
              <span className="text-[9px] font-semibold text-green-600">{m.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LoanStatusCard({ sellerId }: { sellerId: string }) {
  const seller = sellers.find((s) => s.id === sellerId)!
  const loanLimit = seller.loan_limit || 0
  const score = seller.credit_score

  // Mock loan status
  const outstandingAmount = Math.round(loanLimit * 0.6)
  const remaining = loanLimit - outstandingAmount
  const monthsLeft = 4
  const nextPayment = Math.round(outstandingAmount / monthsLeft)

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-3">
        <Wallet className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-semibold text-slate-700">Khoản vay hiện tại</span>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-3 text-white">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] text-white/70">Hạn mức tín dụng</p>
            <p className="text-lg font-bold">{formatVNDFull(loanLimit)}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getRiskBg(score)}`}>
            {getRiskLabel(score)}
          </span>
        </div>

        <div className="border-t border-white/20 pt-2 mt-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-white/60 text-[10px]">Đang vay</p>
              <p className="font-semibold">{formatVNDFull(outstandingAmount)}</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px]">Khả dụng</p>
              <p className="font-semibold">{formatVNDFull(remaining)}</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px]">Còn lại</p>
              <p className="font-semibold">{monthsLeft} tháng</p>
            </div>
            <div>
              <p className="text-white/60 text-[10px]">Trả ước tính/tháng</p>
              <p className="font-semibold">{formatVNDFull(nextPayment)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RevenueMiniChart({ sellerId }: { sellerId: string }) {
  const cf = cashflows[sellerId]
  const data = cf.map((c) => ({
    month: c.month.slice(5), // "11", "12", etc.
    revenue: c.revenue,
  }))

  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <BarChart3 className="w-4 h-4 text-indigo-500" />
        <span className="text-xs font-semibold text-slate-700">Doanh thu 6 tháng</span>
        <TrendingUp className="w-3.5 h-3.5 text-green-500 ml-auto" />
        <span className="text-[10px] text-green-600 font-semibold">
          +{((cf[cf.length - 1].revenue / cf[0].revenue - 1) * 100).toFixed(0)}%
        </span>
      </div>

      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(value: number) => formatVNDFull(value)}
              contentStyle={{ fontSize: 10, borderRadius: 8 }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function ComplianceFooter() {
  return (
    <div className="px-4 py-3">
      <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
        <div className="flex items-center gap-1.5 mb-1">
          <Shield className="w-3 h-3 text-green-600" />
          <span className="text-[10px] font-semibold text-green-700">Tuân thủ & Bảo mật</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[9px] text-slate-500">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
            <span>Lãi suất &lt; 20%/năm</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
            <span>NĐ 13/2023 compliance</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
            <span>Explicit consent</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
            <span>Data minimization</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AIAdvisorBanner({ sellerId }: { sellerId: string }) {
  const seller = sellers.find((s) => s.id === sellerId)!

  return (
    <div className="px-4 py-3">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-700">Mini-CFO AI Advisor</p>
            <p className="text-[9px] text-indigo-500">Qwen AI • Credit Score: {seller.credit_score}</p>
          </div>
        </div>
        <p className="text-[10px] text-slate-600 leading-relaxed">
          "Chào {seller.name.split(" ").pop()}! AI phân tích dòng tiền của bạn ổn định, tăng trưởng tốt. 
          Hạn mức đề xuất: <strong>{formatVNDFull(seller.loan_limit || 0)}</strong>. 
          Hãy duy trì kết nối API để được nâng hạng."
        </p>
        <div className="flex gap-1.5 mt-2">
          <button className="flex-1 bg-indigo-600 text-white text-[10px] font-medium py-1.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-1">
            <MessageCircle className="w-3 h-3" />
            Hỏi AI
          </button>
          <button className="flex-1 bg-white text-indigo-600 text-[10px] font-medium py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-50 flex items-center justify-center gap-1">
            <Phone className="w-3 h-3" />
            Gọi tư vấn
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- Main Component ----------

export default function MobilePage() {
  const [selectedSellerId, setSelectedSellerId] = useState(sellers[0].id)
  const [activeTab, setActiveTab] = useState<"thermometer" | "insights" | "levelup">("thermometer")

  const seller = sellers.find((s) => s.id === selectedSellerId)!
  const thermoData = getThermometerData(selectedSellerId)
  const insights = generateInsights(selectedSellerId)
  const missions = generateMissions(selectedSellerId)

  // Determine level
  const score = seller.credit_score
  let currentLevel: string
  let nextLevel: string
  if (score >= 750) {
    currentLevel = "Bạch Kim"
    nextLevel = "Kim Cương"
  } else if (score >= 650) {
    currentLevel = "Vàng"
    nextLevel = "Bạch Kim"
  } else if (score >= 550) {
    currentLevel = "Bạc"
    nextLevel = "Vàng"
  } else {
    currentLevel = "Đồng"
    nextLevel = "Bạc"
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Phone className="w-6 h-6 text-indigo-600" />
          Mobile App — Trợ lý Thông minh Mini-CFO
        </h1>
        <p className="text-slate-500 mt-1">
          Giao diện người vay (seller/end-user): Nhiệt kế dòng tiền, Smart Insights, Bản đồ Thăng hạng
        </p>
      </div>

      {/* Seller selector */}
      <div className="mb-6 bg-white rounded-xl p-4 border border-slate-200">
        <label className="text-sm font-semibold text-slate-700 mb-2 block">Chọn Seller để demo:</label>
        <div className="flex flex-wrap gap-2">
          {sellers.slice(0, 8).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSellerId(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedSellerId === s.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s.shop_name}
              <span className={`ml-1.5 ${getRiskColor(s.credit_score)}`}>({s.credit_score})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Phone mockup */}
        <PhoneFrame sellerName={seller.shop_name}>
          {/* Tab navigation inside phone */}
          <div className="flex border-b border-slate-100 px-4">
            {[
              { key: "thermometer" as const, label: "Nhiệt kế", icon: Thermometer },
              { key: "insights" as const, label: "Insights", icon: Lightbulb },
              { key: "levelup" as const, label: "Thăng hạng", icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-2 text-[10px] font-medium flex items-center justify-center gap-1 border-b-2 transition-all ${
                    activeTab === tab.key
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-slate-400"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* AI Advisor (always visible) */}
          <AIAdvisorBanner sellerId={selectedSellerId} />

          {/* Tab content */}
          {activeTab === "thermometer" && (
            <>
              <LoanStatusCard sellerId={selectedSellerId} />
              <ThermometerGauge data={thermoData} />
              <RevenueMiniChart sellerId={selectedSellerId} />
            </>
          )}

          {activeTab === "insights" && (
            <>
              <SmartInsightsCard insights={insights} />
              <ComplianceFooter />
            </>
          )}

          {activeTab === "levelup" && (
            <LevelUpMap missions={missions} currentLevel={currentLevel} nextLevel={nextLevel} />
          )}

          {/* Bottom spacing */}
          <div className="h-4" />
        </PhoneFrame>

        {/* Right: Feature explanation panel */}
        <div className="space-y-6">
          {/* Feature cards */}
          <FeatureCard
            icon={<Thermometer className="w-5 h-5 text-blue-600" />}
            title="1. Nhiệt kế Dòng tiền (Dynamic Deduction)"
            description="AI tự động điều chỉnh tỷ lệ trích nợ hàng ngày dựa trên doanh thu thực tế."
            bullets={[
              activeTab === "thermometer" ? `🔵 Hôm nay: ${thermoData.todayRate}% (${thermoData.label})` : "Chọn seller để xem nhiệt kế thực tế",
              `📊 Doanh thu: ${formatVNDFull(thermoData.todayRevenue)}/ngày`,
              `💰 Trích nợ: ${formatVNDFull(thermoData.todayDeduction)} | Giữ lại: ${formatVNDFull(thermoData.todayKept)}`,
              "🔄 AI giảm tỷ lệ ngày ế, tăng ngày Mega Sale",
            ]}
            isActive={activeTab === "thermometer"}
          />

          <FeatureCard
            icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
            title="2. Smart Insights (Predictive BI)"
            description="AI dự báo nhu cầu, cảnh báo cơ hội kinh doanh và gợi ý giải ngân tức thì."
            bullets={[
              `🔥 ${insights[0].title}`,
              `💡 ${insights[1].title}`,
              `⚠️ ${insights[2].title}`,
              `🎯 ${insights[3].title}`,
            ]}
            isActive={activeTab === "insights"}
          />

          <FeatureCard
            icon={<Trophy className="w-5 h-5 text-yellow-500" />}
            title="3. Bản đồ Thăng hạng (Gamification)"
            description={`Hạng hiện tại: ${currentLevel} → Mục tiêu: ${nextLevel}. Hoàn thành nhiệm vụ để mở khóa hạn mức cao hơn.`}
            bullets={missions.map((m) =>
              m.progress >= 100
                ? `✅ ${m.title} — ${m.reward}`
                : `🔄 ${m.title} (${m.progress}%) — ${m.reward}`
            )}
            isActive={activeTab === "levelup"}
          />

          <FeatureCard
            icon={<Shield className="w-5 h-5 text-green-600" />}
            title="4. Tuân thủ & Pháp lý"
            description="Hard rules enforced: Interest cap, Decree 13/2023, 30-day reconciliation."
            bullets={[
              "🔒 Lãi suất tối đa 20%/năm (Bộ luật Dân sự 2015)",
              "🛡️ Nghị định 13/2023: Explicit consent + Data minimization",
              "📋 30-day reconciliation period — không auto NPL",
              "⏰ Collection circuit breaker: 07:00-21:00 only",
            ]}
            isActive={false}
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  bullets,
  isActive,
}: {
  icon: React.ReactNode
  title: string
  description: string
  bullets: string[]
  isActive: boolean
}) {
  return (
    <div
      className={`bg-white rounded-xl p-5 border transition-all ${
        isActive ? "border-blue-300 shadow-md ring-1 ring-blue-100" : "border-slate-200"
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h3 className="text-base font-bold text-slate-800">{title}</h3>
      </div>
      <p className="text-sm text-slate-500 mb-3">{description}</p>
      <ul className="space-y-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
            <span className="mt-1.5 w-1 h-1 bg-slate-300 rounded-full flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}
