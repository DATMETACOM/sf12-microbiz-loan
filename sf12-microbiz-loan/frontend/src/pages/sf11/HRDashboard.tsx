import { Building2, Users, TrendingUp, AlertTriangle, Activity, DollarSign, Heart, Shield } from "lucide-react"

const mockCompanyStats = {
  totalEmployees: 250,
  activeEWAUsers: 180,
  monthlyEWAVolume: 450000000, // 450M
  avgEWAperUser: 2500000,
  retentionRate: 94,
  employeeSatisfaction: 8.2
}

const departmentFinancialStress = [
  { department: "Kỹ thuật", employees: 80, stressLevel: "low", color: "bg-green-500" },
  { department: "Sales", employees: 60, stressLevel: "medium", color: "bg-yellow-500" },
  { department: "Marketing", employees: 40, stressLevel: "low", color: "bg-green-500" },
  { department: "Customer Service", employees: 45, stressLevel: "high", color: "bg-red-500" },
  { department: "HR/Admin", employees: 25, stressLevel: "low", color: "bg-green-500" },
]

const employeeSegments = [
  { segment: "Nhóm tiết kiệm", count: 95, description: "Rất ít rút EWA, quản lý tài chính tốt" },
  { segment: "Nhóm cân bằng", count: 70, description: "Rút EWA khi cần, trả nợ đúng hạn" },
  { segment: "Nhóm rủi ro", count: 15, description: "Thường xuyên rút EWA, cần can thiệp" },
]

const recentActivities = [
  { employee: "Nguyễn Văn A", action: "Rút EWA", amount: 1000000, time: "5 phút trước" },
  { employee: "Trần Thị B", action: "Rút EWA", amount: 500000, time: "12 phút trước" },
  { employee: "Lê Văn C", action: "Được tăng hạn mức", amount: 0, time: "30 phút trước" },
  { employee: "Phạm Thị D", action: "Cảnh báo rủi ro", amount: 0, time: "1 giờ trước" },
]

export default function HRDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard HR & Doanh Nghiệp</h2>
          <p className="text-sm text-slate-500 mt-1">Quản lý sức khỏe tài chính nhân sự — Tăng tỷ lệ giữ chân</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium">
            Xuất báo cáo
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium hover:opacity-90">
            Thiết lập chính sách
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {[
          { label: "Tổng nhân viên", value: mockCompanyStats.totalEmployees.toString(), icon: Users, color: "text-blue-600 bg-blue-50" },
          { label: "Dùng EWA", value: mockCompanyStats.activeEWAUsers.toString(), icon: Activity, color: "text-green-600 bg-green-50" },
          { label: "Volume EWA/tháng", value: `${(mockCompanyStats.monthlyEWAVolume / 1e6).toFixed(0)}M`, icon: DollarSign, color: "text-purple-600 bg-purple-50" },
          { label: "Tỷ lệ giữ chân", value: `${mockCompanyStats.retentionRate}%`, icon: Heart, color: "text-pink-600 bg-pink-50" },
          { label: "Độ hài lòng", value: `${mockCompanyStats.employeeSatisfaction}/10`, icon: Shield, color: "text-orange-600 bg-orange-50" },
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

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-600" />
            Heatmap Sức khỏe Tài chính Tập thể
          </h3>
          <div className="space-y-3">
            {departmentFinancialStress.map((dept, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-32 text-sm text-slate-700">{dept.department}</div>
                <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full ${dept.color} rounded-full`}
                    style={{
                      width: dept.stressLevel === "high" ? "80%" : dept.stressLevel === "medium" ? "50%" : "20%"
                    }}
                  />
                </div>
                <div className="w-20 text-right">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    dept.stressLevel === "high" ? "bg-red-100 text-red-700" :
                    dept.stressLevel === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {dept.stressLevel === "high" ? "Cao" : dept.stressLevel === "medium" ? "Trung bình" : "Thấp"}
                  </span>
                </div>
                <div className="w-16 text-right text-sm text-slate-600">{dept.employees} NV</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">
            * Can thiệp kịp thời cho phòng ban có mức độ căng thẳng tài chính cao
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Phân khúc Thông minh Nhân viên
          </h3>
          <div className="space-y-4">
            {employeeSegments.map((segment, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-800">{segment.segment}</h4>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                    {segment.count} người
                  </span>
                </div>
                <p className="text-sm text-slate-600">{segment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Hoạt động Gần đây
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivities.map((activity, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{activity.employee}</p>
                    <p className="text-xs text-slate-500">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount > 0 && (
                    <p className="font-semibold text-green-600">{activity.amount.toLocaleString()} VND</p>
                  )}
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-bold text-slate-800">Lợi ích cho Doanh nghiệp</h4>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Tăng tỷ lệ giữ chân nhân sự
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Giảm áp lực quản lý tạm ứng
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Công cụ đo lường sức khỏe tài chính
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✓</span>
                Chính sách phúc lợi can thiệp kịp thời
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              <h4 className="font-bold text-slate-800">Cảnh báo AI</h4>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg border border-red-200">
                <p className="text-xs text-red-700 font-medium">Phòng CS: 3 nhân viên có dấu hiệu rủi ro cao</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-700 font-medium">Phòng Sales: Tăng 20% rút EWA so với TB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
