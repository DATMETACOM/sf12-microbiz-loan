import { useState, useRef, useEffect } from "react"
import {
  X,
  Send,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
  Zap,
  TrendingUp,
  Wallet,
  Target
} from "lucide-react"
import { chatWithQwen, mockChatResponse, ChatMessage, getEmployeeSuggestions } from "../lib/qwenChat"

interface MobileChatboxProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileChatbox({ isOpen, onClose }: MobileChatboxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

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

      // Always use mock for mobile demo
      await new Promise(resolve => setTimeout(resolve, 1000))
      response = mockChatResponse(userMessage.content)

      setMessages(prev => [...prev, {
        role: "assistant",
        content: response.message,
        timestamp: response.timestamp
      }])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau. 🔧",
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
        className="fixed bottom-24 right-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-0 right-4 left-4 bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Trợ lý Tài chính AI</h3>
              <p className="text-xs opacity-80">Powered by Qwen AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-2">Chào bạn! 👋</h4>
                <p className="text-xs text-slate-600">
                  Tôi có thể giúp bạn với EWA, chi tiêu, tiết kiệm...
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 ${
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
                <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="px-4 py-2 bg-white border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                {getEmployeeSuggestions().slice(0, 3).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-full transition-colors flex items-center gap-1"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {messages.length === 0 && (
            <div className="px-4 py-3 bg-white border-t border-slate-100">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Wallet, label: "Rút EWA", color: "bg-green-100 text-green-600" },
                  { icon: TrendingUp, label: "Chi tiêu", color: "bg-blue-100 text-blue-600" },
                  { icon: Target, label: "Tiết kiệm", color: "bg-purple-100 text-purple-600" },
                ].map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(`Hãy giúp tôi về ${action.label.toLowerCase()}`)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg ${action.color}`}
                  >
                    <action.icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Nhập câu hỏi..."
                className="flex-1 px-3 py-2 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
