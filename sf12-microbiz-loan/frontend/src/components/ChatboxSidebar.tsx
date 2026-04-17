import { useState, useRef, useEffect } from "react"
import {
  X,
  Send,
  MessageCircle,
  Sparkles,
  Settings,
  Key,
  Loader2,
  ChevronRight,
  Zap
} from "lucide-react"
import { chatWithQwen, mockChatResponse, ChatMessage, getEmployeeSuggestions, getHRSuggestions, getBankSuggestions, getSellerSuggestions, getAdminSuggestions } from "../lib/qwenChat"

interface ChatboxSidebarProps {
  isOpen: boolean
  onClose: () => void
  userRole?: "employee" | "hr" | "bank" | "seller" | "admin"
}

export default function ChatboxSidebar({ isOpen, onClose, userRole = "employee" }: ChatboxSidebarProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [useMock, setUseMock] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem("qwen_api_key")
    const savedUseMock = localStorage.getItem("qwen_use_mock")
    if (savedKey) setApiKey(savedKey)
    if (savedUseMock) setUseMock(savedUseMock === "true")
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Save settings
  const saveSettings = () => {
    localStorage.setItem("qwen_api_key", apiKey)
    localStorage.setItem("qwen_use_mock", useMock.toString())
    setShowSettings(false)
  }

  // Get suggestions based on user role
  const getSuggestions = () => {
    switch (userRole) {
      case "hr": return getHRSuggestions()
      case "bank": return getBankSuggestions()
      case "seller": return getSellerSuggestions()
      case "admin": return getAdminSuggestions()
      default: return getEmployeeSuggestions()
    }
  }

  // Get welcome message based on user role
  const getWelcomeMessage = () => {
    switch (userRole) {
      case "seller":
        return {
          title: "Chào bạn! 👋",
          subtitle: "Tôi là Mini-CFO AI, có thể giúp bạn với:",
          features: ["💰 Quản lý dòng tiền", "📊 Tối ưu vay vốn", "💡 Chiến lược kinh doanh", "🎯 Nâng hạng tín dụng"]
        }
      case "admin":
        return {
          title: "Chào Admin! 👋",
          subtitle: "Tôi có thể giúp bạn quản lý:",
          features: ["📈 Danh mục vay", "🔍 Phân tích rủi ro", "💼 Quản lý seller", "📊 Báo cáo NPL"]
        }
      default:
        return {
          title: "Chào bạn! 👋",
          subtitle: "Tôi là Trợ lý Tài chính AI, có thể giúp bạn với:",
          features: ["💰 Ứng lương EWA", "📊 Quản lý chi tiêu", "💡 Lời khuyên tiết kiệm", "📈 Tư vấn đầu tư"]
        }
    }
  }

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      let response: { message: string; timestamp: string }

      if (useMock || !apiKey) {
        // Use mock response
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate delay
        response = mockChatResponse(userMessage.content)
      } else {
        // Use real Qwen API
        const chatHistory = messages.slice(-10) // Keep last 10 messages for context
        response = await chatWithQwen([...chatHistory, userMessage], apiKey)
      }

      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.message,
        timestamp: response.timestamp
      }])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Xin lỗi, có lỗi xảy ra. Vui lòng kiểm tra API Key hoặc thử lại sau. 🔧",
        timestamp: new Date().toISOString()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  if (!isOpen) {
    // Floating chat button when closed
    return (
      <button
        onClick={onClose}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40 group"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      </button>
    )
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Trợ lý Tài chính AI</h3>
              <p className="text-xs opacity-80">Powered by Qwen AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 space-y-3">
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={useMock}
                  onChange={(e) => setUseMock(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span>Sử dụng Mock Data (Demo)</span>
              </label>
            </div>
            {!useMock && (
              <div>
                <label className="block text-xs mb-1">Qwen API Key</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="flex-1 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    onClick={saveSettings}
                    className="px-3 py-1.5 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-white/90"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">{getWelcomeMessage().title}</h4>
            <p className="text-sm text-slate-600 mb-4">
              {getWelcomeMessage().subtitle}
            </p>
            <ul className="text-sm text-slate-600 space-y-1 text-left inline-block">
              {getWelcomeMessage().features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                  : "bg-white border border-slate-200 text-slate-700 shadow-sm"
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
              {msg.timestamp && (
                <p className={`text-xs mt-1 ${msg.role === "user" ? "text-white/70" : "text-slate-400"}`}>
                  {new Date(msg.timestamp).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 0 && (
        <div className="px-4 py-3 bg-white border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-2">Câu hỏi thường gặp:</p>
          <div className="flex flex-wrap gap-2">
            {getSuggestions().slice(0, 4).map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-4 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        {useMock && (
          <p className="text-xs text-slate-400 mt-2 text-center">
            🤖 Demo Mode — Nhập API Key để sử dụng Qwen AI thật
          </p>
        )}
      </div>
    </div>
  )
}
