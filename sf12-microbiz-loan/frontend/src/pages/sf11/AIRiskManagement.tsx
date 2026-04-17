import { Brain, Shield, AlertTriangle, TrendingUp, Activity, Zap, Target, Clock, Users, CheckCircle, XCircle } from "lucide-react"

const churnPredictions = [
  { employee: "Nguyễn Văn A", department: "Customer Service", probability: 85, factors: ["Thay đổi giờ chấm công", "Tăng app mở đêm"], action: "Giảm hạn mức EWA xuống 0%" },
  { employee: "Trần Thị B", department: "Sales", probability: 72, factors: ["Từ chối tăng ca", "Tăng rút EWA"], action: "Giảm hạn mức EWA xuống 20%" },
  { employee: "Lê Văn C", department: "Kỹ thuật", probability: 65, factors: ["Giảm productivity"], action: "Giảm hạn mức EWA xuống 30%" },
  { employee: "Phạm Thị D", department: "Marketing", probability: 58, factors: ["Thất thường check-in"], action: "Theo dõi thêm 7 ngày" },
]

const fraudAlerts = [
  { id: "FRD001", type: "high", description: "5 nhân viên có IP chấm công trùng khớp, rút EWA cùng lúc", company: "ServiceHub Ltd", employees: 5, status: "blocked" },
  { id: "FRD002", type: "medium", description: "Nhóm 3 nhân viên rút EWA theo pattern bất thường", company: "RetailMax Group", employees: 3, status: "monitoring" },
]

const cashflowForecast = [
  { period: "Tuần này", demand: 250000000, available: 500000000, status: "safe" },
  { period: "Tuần sau", demand: 320000000, available: 450000000, status: "safe" },
  { period: "2 tuần tới", demand: 450000000, available: 400000000, status: "warning" },
  { period: "3 tuần tới", demand: 380000000, available: 350000000, status: "critical" },
]

const aiMetrics = {
  totalPredictions: 1250,
  accuratePredictions: 1120,
  accuracyRate: 89.6,
  preventedLoss: 850000000, // 850M
  avgProcessingTime: 0.5 // seconds
}

export default function AIRiskManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            AI Quản trị Rủi ro (AI for Risk Management)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Churn Prediction • Fraud Ring Detection • Cashflow Forecasting
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium">
            Cấu hình AI Model
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-sm font-medium hover:opacity-90">
            Xem Logs
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Tổng dự đoán", value: aiMetrics.totalPredictions.toString(), icon: Brain, color: "text-purple-600 bg-purple-50" },
          { label: "Độ chính xác", value: `${aiMetrics.accuracyRate}%`, icon: Target, color: "text-green-600 bg-green-50" },
          { label: "Ngăn chặn tổn thất", value: `${(aiMetrics.preventedLoss / 1e6).toFixed(0)}M`, icon: Shield, color: "text-blue-600 bg-blue-50" },
          { label: "Thời gian xử lý", value: `${aiMetrics.avgProcessingTime}s`, icon: Zap, color: "text-orange-600 bg-orange-50" },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${metric.color} flex items-center justify-center mb-2`}>
              <metric.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
            <p className="text-xs text-slate-500">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-600" />
              Churn Prediction — Ngăn chặn "Ghosting"
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {churnPredictions.map((pred, i) => (
              <div key={i} className="px-6 py-4 hover:bg-slate-50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-800">{pred.employee}</h4>
                    <p className="text-xs text-slate-500">{pred.department}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      pred.probability >= 80 ? "bg-red-100 text-red-700" :
                      pred.probability >= 70 ? "bg-orange-100 text-orange-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {pred.probability}% rủi ro
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-slate-500 mb-1">Yếu tố:</p>
                  <div className="flex flex-wrap gap-1">
                    {pred.factors.map((factor, j) => (
                      <span key={j} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-200">
                  <Shield className="w-4 h-4 text-red-600" />
                  <p className="text-xs text-red-700 font-medium">{pred.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Fraud Ring Detection
            </h3>
            <div className="space-y-3">
              {fraudAlerts.map((alert, i) => (
                <div key={i} className={`p-4 rounded-lg border ${
                  alert.type === "high" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {alert.status === "blocked" ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : (
                        <Activity className="w-5 h-5 text-yellow-600" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-800">{alert.company}</p>
                        <p className="text-xs text-slate-500">{alert.employees} nhân viên liên quan</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      alert.status === "blocked" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {alert.status === "blocked" ? "Đã khóa" : "Đang theo dõi"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-purple-600" />
              <h4 className="font-bold text-slate-800">AI Model Performance</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Độ chính xác</span>
                <span className="font-bold text-purple-600">{aiMetrics.accuracyRate}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: `${aiMetrics.accuracyRate}%` }} />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-slate-600">Tổng dự đoán đúng</span>
                <span className="font-bold text-slate-800">{aiMetrics.accuratePredictions}/{aiMetrics.totalPredictions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Cashflow Forecasting — Dự báo Thanh khoản
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Kỳ hạn</th>
                <th className="px-4 py-3 text-right font-medium">Nhu cầu vốn</th>
                <th className="px-4 py-3 text-right font-medium">Có sẵn</th>
                <th className="px-4 py-3 text-center font-medium">Trạng thái</th>
                <th className="px-4 py-3 text-left font-medium">Khuyến nghị</th>
              </tr>
            </thead>
            <tbody>
              {cashflowForecast.map((forecast, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{forecast.period}</td>
                  <td className="px-4 py-3 text-right font-semibold">{(forecast.demand / 1e6).toFixed(0)}M VND</td>
                  <td className="px-4 py-3 text-right">{(forecast.available / 1e6).toFixed(0)}M VND</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      forecast.status === "safe" ? "bg-green-100 text-green-700" :
                      forecast.status === "warning" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {forecast.status === "safe" ? "An toàn" : forecast.status === "warning" ? "Cảnh báo" : "Nguy cấp"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {forecast.status === "safe" && (
                      <span className="text-green-600 text-xs">Duy trì hiện tại</span>
                    )}
                    {forecast.status === "warning" && (
                      <span className="text-yellow-600 text-xs">Cần bơm thêm {((forecast.demand - forecast.available) / 1e6).toFixed(0)}M VND</span>
                    )}
                    {forecast.status === "critical" && (
                      <span className="text-red-600 text-xs font-medium">⚠️ Cấp bách: Cần {((forecast.demand - forecast.available) / 1e6).toFixed(0)}M VND ngay</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
