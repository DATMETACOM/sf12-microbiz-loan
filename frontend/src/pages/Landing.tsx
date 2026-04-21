import { useNavigate } from "react-router-dom"
import { sellers, formatVND, typeLabels } from "../data/mockData"
import { Store, TrendingUp, Shield, Bot, ArrowRight, BarChart3, CheckCircle2 } from "lucide-react"

export default function Landing() {
  const navigate = useNavigate()
  const avgScore = Math.round(sellers.reduce((s, x) => s + x.credit_score, 0) / sellers.length)
  const totalRevenue = sellers.reduce((s, x) => s + x.monthly_revenue_avg, 0)

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium">[SF12]</span>
            <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium">Shinhan Finance x Qwen AI</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">MicroBiz Loan cho Digital Economy Sellers</h1>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl">
            AI-powered micro loan (5–50M VND) cho online sellers, freelancers & gig workers.
            Chấm điểm tín dụng thay thế dựa trên dữ liệu cash flow e-commerce & e-wallet.
            Trả nợ theo % doanh thu thay vì trả góp cố định.
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate("/scoring")} className="px-5 py-2.5 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Bot className="w-4 h-4" /> AI Scoring
            </button>
            <button onClick={() => navigate("/seller")} className="px-5 py-2.5 bg-white/15 text-white rounded-lg font-medium hover:bg-white/25 transition-colors flex items-center gap-2">
              <Store className="w-4 h-4" /> Seller Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Store, label: "Sellers đã đăng ký", value: sellers.length.toString(), color: "text-blue-600 bg-blue-50" },
          { icon: TrendingUp, label: "Doanh thu TB/tháng", value: formatVND(totalRevenue / sellers.length) + " VND", color: "text-green-600 bg-green-50" },
          { icon: Shield, label: "Credit Score TB", value: avgScore.toString(), color: "text-purple-600 bg-purple-50" },
          { icon: BarChart3, label: "NPL Target", value: "< 5%", color: "text-orange-600 bg-orange-50" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className={`w-9 h-9 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            <p className="text-sm text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-blue-50 flex items-center justify-center"><Bot className="w-4 h-4 text-blue-600" /></div>
            AI Alternative Scoring
          </h3>
          <p className="text-sm text-slate-500 mb-4">Không cần CIC history. Qwen AI phân tích cash flow từ Shopee, Lazada, TikTok Shop, MoMo, ZaloPay.</p>
          <ul className="space-y-2">
            {["6 yếu tố chấm điểm có trọng số", "Phân tích 6 tháng cash flow", "Real-time scoring với Qwen AI"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-green-500" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-green-50 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-green-600" /></div>
            Trả nợ theo % Doanh thu
          </h3>
          <p className="text-sm text-slate-500 mb-4">Thay vì trả góp cố định → trả theo % doanh thu thực tế. Giảm áp lực tài chính, giảm NPL.</p>
          <ul className="space-y-2">
            {["Tháng tốt → trả nhiều, Tháng chậm → trả ít", "Giảm delinquency risk tự nhiên", "Khác biệt vs Shopee SPayLater, MoMo"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-green-500" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-purple-50 flex items-center justify-center"><Shield className="w-4 h-4 text-purple-600" /></div>
            Tệp khách hàng mới
          </h3>
          <p className="text-sm text-slate-500 mb-4">200K+ sellers trên Shopee/Lazada, 4M+ gig workers — không có CIC history, không tiếp cận được vốn vay.</p>
          <ul className="space-y-2">
            {["Không cần chứng minh thu nhập truyền thống", "NPL target <5% qua AI + flexible repayment", "Mở rộng thị trường cho Shinhan Finance"].map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-green-500" />{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Sellers Demo ({sellers.length})</h3>
          <button onClick={() => navigate("/seller")} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
            Xem tất cả <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Seller</th>
                <th className="px-4 py-2 text-left font-medium">Loại</th>
                <th className="px-4 py-2 text-left font-medium">Nền tảng</th>
                <th className="px-4 py-2 text-right font-medium">Doanh thu/tháng</th>
                <th className="px-4 py-2 text-center font-medium">Credit Score</th>
                <th className="px-4 py-2 text-right font-medium">Hạn mức</th>
              </tr>
            </thead>
            <tbody>
              {sellers.slice(0, 6).map((s) => (
                <tr key={s.id} className="border-t border-slate-50 hover:bg-slate-50/50 cursor-pointer" onClick={() => navigate(`/seller/${s.id}`)}>
                  <td className="px-4 py-2.5"><span className="font-medium text-slate-800">{s.name}</span><br /><span className="text-slate-400 text-xs">{s.shop_name}</span></td>
                  <td className="px-4 py-2.5 text-slate-600">{typeLabels[s.seller_type]}</td>
                  <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium">{s.platform}</span></td>
                  <td className="px-4 py-2.5 text-right font-medium text-slate-800">{formatVND(s.monthly_revenue_avg)} VND</td>
                  <td className="px-4 py-2.5 text-center"><span className={`font-bold ${s.credit_score >= 700 ? "text-green-600" : s.credit_score >= 600 ? "text-blue-600" : s.credit_score >= 500 ? "text-yellow-600" : "text-red-600"}`}>{s.credit_score}</span></td>
                  <td className="px-4 py-2.5 text-right font-medium text-slate-800">{formatVND(s.loan_limit || 0)} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
