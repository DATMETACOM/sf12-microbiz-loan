import { Link } from "react-router-dom"
import {
  Wallet,
  Building2,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Brain,
  CheckCircle,
  ArrowRight
} from "lucide-react"

export default function SF11Landing() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Trợ lý Tài chính Vô tư (AI Financial Advisor)
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Biến hệ thống thành trợ lý AI thấu hiểu tài chính — Hệ sinh thái Win-Win-Win cho Ngân hàng, Doanh nghiệp và Người lao động
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Building2,
            title: "Ngân hàng & Tổ chức Tài chính",
            desc: "Nguồn thu ổn định, an toàn với NPL <2%. Chuyển đổi khách hàng ngắn hạn sang gắn bó dài hạn",
            color: "from-blue-500 to-blue-600",
            bg: "bg-blue-50",
            link: "/bank"
          },
          {
            icon: Users,
            title: "Doanh nghiệp & HR",
            desc: "Tăng tỷ lệ giữ chân nhân sự, giảm áp lực quản lý tạm ứng. Công cụ đo lường sức khỏe tài chính tập thể",
            color: "from-green-500 to-green-600",
            bg: "bg-green-50",
            link: "/hr"
          },
          {
            icon: Wallet,
            title: "Người lao động (Employee)",
            desc: "Trải nghiệm 'tiền của chính mình' tức thì, an toàn. Được cố vấn dòng tiền cá nhân hợp lý",
            color: "from-purple-500 to-purple-600",
            bg: "bg-purple-50",
            link: "/employee"
          }
        ].map((benefit, i) => (
          <Link
            key={i}
            to={benefit.link}
            className="group relative bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-xl`} />
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-md`}>
              <benefit.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{benefit.desc}</p>
            <div className="flex items-center text-sm font-medium text-blue-600">
              Xem chi tiết <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-3">Checklist Ưu điểm Cốt lõi</h3>
            <ul className="space-y-3">
              {[
                "Dữ liệu & Thẩm định: Bỏ qua giấy tờ thủ công, dùng Real-time API từ HRM",
                "Tối ưu Chi phí: CAC tiệm cận 0 nhờ B2B2C, giảm chi phí Sales & Thẩm định",
                "Thời gian giải ngân: Từ vài ngày xuống vài giây",
                "Quản trị Nợ xấu: NPL < 2% nhờ kiểm soát dòng tiền tại nguồn",
                "Trải nghiệm khách hàng: Seamless, 'tiền của chính mình'"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <Brain className="w-24 h-24 opacity-20" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Kiến trúc Hệ thống 4 Tầng
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: "Tầng Ingestion",
              desc: "Webhooks nhận tín hiệu chấm công, nghỉ việc, kỷ luật từ HRM theo thời gian thực",
              icon: Clock,
              color: "text-blue-600 bg-blue-50"
            },
            {
              title: "Tầng Rule Engine",
              desc: "Chặn giải ngân nếu e-KYC sai lệch, khóa trần EWA < 30% tổng lương tháng",
              icon: Shield,
              color: "text-green-600 bg-green-50"
            },
            {
              title: "Tầng Core/Disbursement",
              desc: "Message Queue xử lý hàng đợi, Circuit Breaker ngắt kết nối API lỗi",
              icon: Wallet,
              color: "text-purple-600 bg-purple-50"
            },
            {
              title: "Tầng Reconciliation",
              desc: "Split Payment tại Escrow, tự động cấn trừ gốc+phí trước khi trả lương",
              icon: TrendingUp,
              color: "text-orange-600 bg-orange-50"
            }
          ].map((layer, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
              <div className={`w-12 h-12 rounded-lg ${layer.color} flex items-center justify-center flex-shrink-0`}>
                <layer.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">{layer.title}</h4>
                <p className="text-sm text-slate-600">{layer.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          AI Brain — Động cơ Phân tích Rủi ro & Cố vấn Tài chính
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-slate-800 mb-2">Quản trị Rủi ro</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Churn Prediction (Ghosting)</li>
              <li>• Fraud Ring Detection</li>
              <li>• Cashflow Forecasting</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-slate-800 mb-2">Trợ lý Tài chính</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Smart Limit (Hạn mức thông minh)</li>
              <li>• Financial Wellness Score</li>
              <li>• Conversational AI</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-slate-800 mb-2">Dashboard Quản lý</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Heatmap Tài chính Tập thể</li>
              <li>• Smart Segmentation</li>
              <li>• Cross-sell/Up-sell</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
