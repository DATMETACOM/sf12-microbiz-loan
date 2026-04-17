import { useState } from "react"
import {
  MessageCircle,
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Phone,
  Send,
  Brain,
  Target,
  Wallet,
  Zap,
  Calendar,
  Lightbulb
} from "lucide-react"

const mockConversation = [
  {
    role: "assistant",
    message: "Chào Nguyễn! Hôm nay em có thể giúp gì cho anh/chị về tài chính? 👋",
    time: "09:30"
  },
  {
    role: "user",
    message: "Tôi muốn ứng lương 500k để mua thuốc",
    time: "09:32"
  },
  {
    role: "assistant",
    message: "Được chứ! Em đã kiểm tra ngày công của anh/chị (24/30 ngày), có thể ứng 500k. \n\n💡 Mẹo nhỏ: Anh/chị chỉ nên rút 1.2 triệu để đảm bảo đủ trả tiền điện/nước vào tuần sau nhé! Tiền sẽ vào tài khoản ngay lập tức sau khi xác thực FaceID.",
    time: "09:32"
  }
]

const aiInsights = [
  {
    icon: AlertCircle,
    title: "Cảnh báo chi tiêu",
    desc: "Chi tiêu tuần này tăng 35% so với TB tháng trước",
    color: "text-red-600 bg-red-50 border-red-200"
  },
  {
    icon: TrendingUp,
    title: "Cơ hội tiết kiệm",
    desc: "Có thể tiết kiệm 800k/tháng nếu giảm order đồ ăn",
    color: "text-green-600 bg-green-50 border-green-200"
  },
  {
    icon: Lightbulb,
    title: "Gợi ý thông minh",
    desc: "Đã hết 3 lần rút EWA tháng này, cân nhắc kỹ trước khi rút tiếp",
    color: "text-blue-600 bg-blue-50 border-blue-200"
  }
]

const financialActions = [
  { label: "Ứng lương ngay", icon: Zap, color: "from-green-500 to-emerald-600", action: "withdraw" },
  { label: "Xem chi tiêu", icon: Wallet, color: "from-blue-500 to-blue-600", action: "spending" },
  { label: "Lịch sử EWA", icon: Calendar, color: "from-purple-500 to-purple-600", action: "history" },
  { label: "Đề xuất vay dài hạn", icon: Target, color: "from-orange-500 to-orange-600", action: "loan" }
]

export default function AIAssistant() {
  const [inputMessage, setInputMessage] = useState("")
  const [messages] = useState(mockConversation)
  const [showMobileView, setShowMobileView] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Brain className="w-6 h-6 text-green-600" />
            Trợ lý Thông minh (AI Financial Assistant)
          </h2>
          <p className="text-sm text-slate-500 mt-1">Cố vấn tài chính vô tư — Hiểu bạn, bảo vệ bạn</p>
        </div>
        <button
          onClick={() => setShowMobileView(!showMobileView)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Phone className="w-4 h-4" />
          {showMobileView ? "Desktop View" : "Mobile View"}
        </button>
      </div>

      {showMobileView ? (
        <div className="flex gap-6">
          <div className="flex-1 max-w-md mx-auto">
            <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Cleo AI</h3>
                      <p className="text-white/80 text-xs">Trợ lý tài chính của bạn</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <div className="w-2 h-2 bg-white/50 rounded-full" />
                    <div className="w-2 h-2 bg-white/50 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-3 bg-slate-50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                          : "bg-white border border-slate-200 text-slate-700"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.role === "user" ? "text-white/70" : "text-slate-400"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                  {["Ứng 500k", "Chi tiêu tuần này", "Tiết kiệm", "Lời khuyên"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInputMessage(suggestion)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs rounded-full whitespace-nowrap transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Nhập câu hỏi của bạn..."
                    className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button className="p-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:opacity-90 transition-opacity">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {financialActions.map((action, i) => (
                <button
                  key={i}
                  className={`flex items-center gap-2 p-3 bg-gradient-to-r ${action.color} text-white rounded-xl text-xs font-medium hover:opacity-90 transition-opacity`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="font-semibold text-slate-800">AI Insights — Phân tích Thông minh</h3>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${insight.color} bg-white`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${insight.color.split(" ")[1]}`}>
                      <insight.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 text-sm">{insight.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{insight.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-bold text-slate-800">Financial Wellness Score</h4>
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-purple-600">78</span>
                <span className="text-sm text-slate-500 mb-1">/100</span>
                <span className="ml-auto px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  +5 so với tháng trước
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Sức khỏe tài chính của bạn khá tốt! Cố gắng giảm chi tiêu không cần thiết để nâng điểm lên 85+ nhé.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 h-[600px] flex flex-col">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Cleo AI — Chat</h3>
                  <p className="text-xs text-slate-500">Trợ lý tài chính thông minh</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-lg rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.role === "user" ? "text-white/70" : "text-slate-400"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhập câu hỏi hoặc yêu cầu..."
                  className="flex-1 px-4 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Gửi
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Tác vụ nhanh
              </h4>
              <div className="space-y-2">
                {financialActions.map((action, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${action.color} text-white text-sm font-medium hover:opacity-90 transition-opacity`}
                  >
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {aiInsights.map((insight, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${insight.color} bg-white`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${insight.color.split(" ")[1]}`}>
                    <insight.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{insight.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{insight.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
