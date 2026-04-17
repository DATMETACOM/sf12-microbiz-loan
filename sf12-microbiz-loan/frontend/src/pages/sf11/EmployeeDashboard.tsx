import { useState } from "react"
import {
  Wallet,
  Calendar,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  Fingerprint,
  FaceID,
  Smartphone,
  ArrowRight,
  Zap
} from "lucide-react"

const mockEmployee = {
  id: "EMP001",
  name: "Nguyễn Văn A",
  department: "Kỹ thuật",
  position: "Senior Developer",
  monthlySalary: 25000000,
  ewaLimit: 7500000, // 30% of salary
  ewaUsed: 2000000,
  daysWorked: 24,
  totalDays: 30,
  bankAccount: "1234567890",
  bankName: "Vietcombank"
}

const ewaHistory = [
  { id: "EWA001", date: "2026-04-15", amount: 1000000, status: "completed", fee: 15000 },
  { id: "EWA002", date: "2026-04-10", amount: 500000, status: "completed", fee: 7500 },
  { id: "EWA003", date: "2026-04-05", amount: 500000, status: "completed", fee: 7500 },
]

const quickStats = [
  {
    label: "Hạn mức EWA còn lại",
    value: `${(mockEmployee.ewaLimit - mockEmployee.ewaUsed / 1000000).toFixed(1)}M`,
    icon: Wallet,
    color: "text-green-600 bg-green-50"
  },
  {
    label: "Đã làm việc",
    value: `${mockEmployee.daysWorked}/${mockEmployee.totalDays} ngày`,
    icon: Calendar,
    color: "text-blue-600 bg-blue-50"
  },
  {
    label: "Lương tháng này",
    value: `${(mockEmployee.monthlySalary / 1000000).toFixed(0)}M`,
    icon: TrendingUp,
    color: "text-purple-600 bg-purple-50"
  },
  {
    label: "Phí EWA tháng này",
    value: `${(ewaHistory.reduce((sum, h) => sum + h.fee, 0) / 1000).toFixed(0)}k`,
    icon: Clock,
    color: "text-orange-600 bg-orange-50"
  }
]

export default function EmployeeDashboard() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [showBiometricAuth, setShowBiometricAuth] = useState(false)
  const [biometricMethod, setBiometricMethod] = useState<"fingerprint" | "faceid" | null>(null)

  const handleWithdraw = () => {
    setShowBiometricAuth(true)
  }

  const handleBiometricSuccess = () => {
    setShowBiometricAuth(false)
    setShowWithdrawModal(false)
    alert("✅ Đã rút thành công! Tiền sẽ vào tài khoản trong vài giây.")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard Nhân Viên</h2>
          <p className="text-sm text-slate-500 mt-1">Chào {mockEmployee.name} — {mockEmployee.department}</p>
        </div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg"
        >
          <Zap className="w-5 h-5" />
          Ứng lương ngay
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
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
            <Calendar className="w-5 h-5 text-blue-600" />
            Thông tin Lương & EWA
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Lương tháng này</span>
              <span className="font-bold text-slate-800">{(mockEmployee.monthlySalary / 1000000).toFixed(0)}M VND</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Hạn mức EWA (30%)</span>
              <span className="font-bold text-green-600">{(mockEmployee.ewaLimit / 1000000).toFixed(1)}M VND</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Đã sử dụng</span>
              <span className="font-bold text-orange-600">{(mockEmployee.ewaUsed / 1000000).toFixed(1)}M VND</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm text-slate-600">Còn lại</span>
              <span className="font-bold text-green-600">{((mockEmployee.ewaLimit - mockEmployee.ewaUsed) / 1000000).toFixed(1)}M VND</span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Đã sử dụng: {((mockEmployee.ewaUsed / mockEmployee.ewaLimit) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-200">
                <div
                  style={{ width: `${(mockEmployee.ewaUsed / mockEmployee.ewaLimit) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-green-500 to-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Thông tin Tài khoản
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Họ tên</p>
              <p className="font-semibold text-slate-800">{mockEmployee.name}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Phòng ban</p>
              <p className="font-semibold text-slate-800">{mockEmployee.department}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">Ngân hàng nhận tiền</p>
              <p className="font-semibold text-slate-800">{mockEmployee.bankName}</p>
              <p className="text-sm text-slate-600 mt-1">****{mockEmployee.bankAccount.slice(-4)}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800">Đã xác thực e-KYC</p>
                <p className="text-xs text-green-700 mt-1">Thông tin khớp 100% với hệ thống HRM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Lịch sử EWA tháng này
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {ewaHistory.map((item) => (
            <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{item.amount.toLocaleString()} VND</p>
                  <p className="text-xs text-slate-500">{item.date} — Phí: {item.fee.toLocaleString()} VND</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Hoàn thành
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">Lưu ý quan trọng</p>
          <p className="text-xs text-blue-700 mt-1">
            Theo Luật Lao động, hạn mức EWA không vượt quá 30% tổng lương tháng. Hệ thống sẽ tự động chặn nếu vượt quá giới hạn này.
          </p>
        </div>
      </div>

      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">Ứng lương EWA</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Số tiền muốn ứng (VND)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="Nhập số tiền..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  max={mockEmployee.ewaLimit - mockEmployee.ewaUsed}
                />
                <p className="text-xs text-slate-500 mt-1">
                  Hạn mức còn lại: {((mockEmployee.ewaLimit - mockEmployee.ewaUsed) / 1000000).toFixed(1)}M VND
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Số tiền rút</span>
                  <span className="font-bold text-slate-800">
                    {withdrawAmount ? parseInt(withdrawAmount).toLocaleString() : "0"} VND
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Phí dịch vụ (1.5%)</span>
                  <span className="font-bold text-orange-600">
                    {withdrawAmount ? (parseInt(withdrawAmount) * 0.015).toLocaleString() : "0"} VND
                  </span>
                </div>
                <div className="border-t border-slate-200 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">Tổng nhận</span>
                  <span className="font-bold text-green-600">
                    {withdrawAmount ? (parseInt(withdrawAmount) * 0.985).toLocaleString() : "0"} VND
                  </span>
                </div>
              </div>

              <button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || parseInt(withdrawAmount) > (mockEmployee.ewaLimit - mockEmployee.ewaUsed)}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Xác thực & Rút tiền
              </button>
            </div>
          </div>
        </div>
      )}

      {showBiometricAuth && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Xác thực bảo mật</h3>
            <p className="text-sm text-slate-600 mb-6">
              Vui lòng xác thực để hoàn tất giao dịch rút {parseInt(withdrawAmount).toLocaleString()} VND
            </p>

            <div className="flex gap-4 justify-center mb-6">
              <button
                onClick={() => { setBiometricMethod("fingerprint"); setTimeout(handleBiometricSuccess, 1500) }}
                className="flex-1 p-4 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <Fingerprint className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-xs font-medium text-slate-700">Vân tay</p>
              </button>
              <button
                onClick={() => { setBiometricMethod("faceid"); setTimeout(handleBiometricSuccess, 1500) }}
                className="flex-1 p-4 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
              >
                <FaceID className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                <p className="text-xs font-medium text-slate-700">Face ID</p>
              </button>
            </div>

            {biometricMethod && (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <div className="animate-spin w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full" />
                <span className="text-sm font-medium">Đang xác thực...</span>
              </div>
            )}

            <button
              onClick={() => { setShowBiometricAuth(false); setBiometricMethod(null) }}
              className="mt-4 text-sm text-slate-500 hover:text-slate-700"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
