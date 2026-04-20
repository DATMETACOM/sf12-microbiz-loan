import { Heart, TrendingUp, TrendingDown, Target, Activity, Lightbulb, Users, Award, Calendar, DollarSign } from "lucide-react"

const wellnessMetrics = {
  overallScore: 78,
  monthOverMonth: 5,
  topPerformers: 15,
  atRiskEmployees: 8,
  avgSavingsRate: 12,
  avgDebtToIncome: 28
}

const departmentWellness = [
  { department: "Kỹ thuật", employees: 80, avgScore: 82, trend: "up", change: 3 },
  { department: "Sales", employees: 60, avgScore: 75, trend: "down", change: -2 },
  { department: "Marketing", employees: 40, avgScore: 79, trend: "up", change: 4 },
  { department: "Customer Service", employees: 45, avgScore: 68, trend: "down", change: -5 },
  { department: "HR/Admin", employees: 25, avgScore: 85, trend: "up", change: 2 },
]

const wellnessCategories = [
  { category: "Quản lý chi tiêu", score: 85, trend: "up", icon: DollarSign },
  { category: "Tiết kiệm", score: 72, trend: "up", icon: Target },
  { category: "Quản lý nợ", score: 80, trend: "stable", icon: TrendingDown },
  { category: "Đầu tư", score: 65, trend: "down", icon: TrendingUp },
  { category: "Mục tiêu tài chính", score: 88, trend: "up", icon: Award },
]

const topEmployees = [
  { rank: 1, name: "Nguyễn Văn A", department: "HR/Admin", score: 95, improvement: 8 },
  { rank: 2, name: "Trần Thị B", department: "Kỹ thuật", score: 92, improvement: 5 },
  { rank: 3, name: "Lê Văn C", department: "Marketing", score: 90, improvement: 7 },
  { rank: 4, name: "Phạm Thị D", department: "Kỹ thuật", score: 88, improvement: 4 },
  { rank: 5, name: "Hoàng Văn E", department: "HR/Admin", score: 87, improvement: 6 },
]

const recommendations = [
  {
    priority: "high",
    title: "Tổ chức workshop quản lý tài chính",
    description: "Phòng CS có điểm thấp nhất, cần training urgent",
    target: "Customer Service",
    impact: "Dự kiến nâng 10 điểm trong 1 tháng"
  },
  {
    priority: "medium",
    title: "Khởi động chương trình tiết kiệm",
    description: "Tạo game hóa tiết kiệm cho toàn công ty",
    target: "All departments",
    impact: "Dự kiến tăng 15% tỷ lệ tiết kiệm"
  },
  {
    priority: "low",
    title: "Cung cấp tài liệu đầu tư cơ bản",
    description: "Giáo dục tài chính cho nhân viên muốn đầu tư",
    target: "High performers",
    impact: "Tăng điểm đầu tư lên 75+"
  }
]

export default function FinancialWellness() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-600" />
            Sức khỏe Tài chính Tập thể
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Đo lường & Cải thiện sức khỏe tài chính nhân sự — Tăng sự hài lòng & giữ chân
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium">
            Xuất báo cáo
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg text-sm font-medium hover:opacity-90">
            Tạo chiến dịch
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-12 h-12 opacity-80" />
            <div className="text-right">
              <p className="text-sm opacity-80">Điểm tổng thể</p>
              <p className="text-4xl font-bold">{wellnessMetrics.overallScore}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg p-3">
            <TrendingUp className="w-5 h-5" />
            <div>
              <p className="text-sm opacity-80">So với tháng trước</p>
              <p className="font-bold">+{wellnessMetrics.monthOverMonth} điểm</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-green-600" />
              <p className="text-xs text-slate-500">Top performers</p>
            </div>
            <p className="text-2xl font-bold text-slate-800">{wellnessMetrics.topPerformers}</p>
            <p className="text-xs text-slate-500">Nhân viên xuất sắc</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-red-600" />
              <p className="text-xs text-slate-500">At-risk</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{wellnessMetrics.atRiskEmployees}</p>
            <p className="text-xs text-slate-500">Cần can thiệp</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <p className="text-xs text-slate-500">Tỷ lệ tiết kiệm TB</p>
            </div>
            <p className="text-2xl font-bold text-slate-800">{wellnessMetrics.avgSavingsRate}%</p>
            <p className="text-xs text-slate-500">Của thu nhập</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-purple-600" />
              <p className="text-xs text-slate-500">Debt/Income TB</p>
            </div>
            <p className="text-2xl font-bold text-slate-800">{wellnessMetrics.avgDebtToIncome}%</p>
            <p className="text-xs text-slate-500">Khá tốt</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            Khuyến nghị AI
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div key={i} className={`p-3 rounded-lg border ${
                rec.priority === "high" ? "bg-red-50 border-red-200" :
                rec.priority === "medium" ? "bg-yellow-50 border-yellow-200" :
                "bg-blue-50 border-blue-200"
              }`}>
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-sm text-slate-800">{rec.title}</h4>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    rec.priority === "high" ? "bg-red-100 text-red-700" :
                    rec.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {rec.priority === "high" ? "Cao" : rec.priority === "medium" ? "Trung bình" : "Thấp"}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">{rec.description}</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Target:</span>
                  <span className="font-medium text-slate-700">{rec.target}</span>
                </div>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <span className="text-slate-500">Impact:</span>
                  <span className="font-medium text-green-700">{rec.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Sức khỏe Tài chính theo Phòng ban
          </h3>
          <div className="space-y-3">
            {departmentWellness.map((dept, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-32 text-sm text-slate-700">{dept.department}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full ${dept.avgScore >= 80 ? "bg-green-500" : dept.avgScore >= 70 ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${dept.avgScore}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-800 text-sm w-10">{dept.avgScore}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {dept.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-600" />
                    ) : dept.trend === "down" ? (
                      <TrendingDown className="w-3 h-3 text-red-600" />
                    ) : (
                      <Activity className="w-3 h-3 text-slate-400" />
                    )}
                    <span className={`text-xs ${dept.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {dept.change >= 0 ? "+" : ""}{dept.change} điểm
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Top 5 Nhân viên Xuất sắc
          </h3>
          <div className="space-y-3">
            {topEmployees.map((emp, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  emp.rank === 1 ? "bg-yellow-500" :
                  emp.rank === 2 ? "bg-slate-400" :
                  emp.rank === 3 ? "bg-orange-400" :
                  "bg-slate-300"
                }`}>
                  {emp.rank}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{emp.name}</p>
                  <p className="text-xs text-slate-500">{emp.department}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{emp.score} điểm</p>
                  <p className="text-xs text-green-600">+{emp.improvement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Phân loại Sức khỏe Tài chính
        </h3>
        <div className="grid md:grid-cols-5 gap-4">
          {wellnessCategories.map((category, i) => (
            <div key={i} className="text-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                category.score >= 80 ? "bg-green-100" :
                category.score >= 70 ? "bg-yellow-100" :
                "bg-red-100"
              }`}>
                <category.icon className={`w-6 h-6 ${
                  category.score >= 80 ? "text-green-600" :
                  category.score >= 70 ? "text-yellow-600" :
                  "text-red-600"
                }`} />
              </div>
              <p className="text-sm font-medium text-slate-700 mb-1">{category.category}</p>
              <p className={`text-2xl font-bold ${
                category.score >= 80 ? "text-green-600" :
                category.score >= 70 ? "text-yellow-600" :
                "text-red-600"
              }`}>
                {category.score}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                {category.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : category.trend === "down" ? (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                ) : (
                  <Activity className="w-3 h-3 text-slate-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
