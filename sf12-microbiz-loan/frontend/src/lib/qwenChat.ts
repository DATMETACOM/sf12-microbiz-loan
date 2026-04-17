// Qwen Chat API Client for SF11 EWA

export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string
}

export interface ChatResponse {
  message: string
  timestamp: string
}

// Qwen API endpoint for DashScope INTL
const QWEN_API_URL = "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text-generation/generation"

/**
 * System prompt for SF11 EWA Financial Assistant
 */
const EWA_SYSTEM_PROMPT = `Bạn là Trợ lý Tài chính Vô tư (Impartial AI Financial Advisor) cho hệ thống EWA & Salary-Linked Lending của Shinhan Finance.

VAI TRÒ CỦA BẠN:
1. Cố vấn tài chính khách quan, thấu hiểu
2. Giúp nhân viên quản lý dòng tiền cá nhân
3. Tư vấn về EWA, tiết kiệm, đầu tư cơ bản
4. Phân tích sức khỏe tài chính cá nhân

NGUYÊN TẮC:
- Luôn trung lập, không thúc đẩy vay nợ quá mức
- Ưu tiên lợi ích dài hạn của user
- Minh bạch về phí và rủi ro
- Tôn trọng Luật Lao động (EWA ≤ 30% lương)

NGỮ CÁCH:
- Thân thiện, gần gũi, chuyên nghiệp
- Sử dụng emoji phù hợp
- Giải thích rõ ràng, dễ hiểu
- Đưa ra ví dụ cụ thể

CHỦ ĐỀ CÓ THỂ HỖ TRỢ:
- EWA & ứng lương
- Quản lý chi tiêu
- Tiết kiệm
- Đầu tư cơ bản
- Tài chính cá nhân
- Sức khỏe tài chính

KHI USER HỎI VỀ VAY:
- Giải thích rõ rủi ro
- So sánh các lựa chọn
- Khuyên dùng nếu cần thiết
- Cảnh báo nếu quá mức

Hãy trả lời ngắn gọn, trực tiếp, hữu ích cho user.`

/**
 * Call Qwen API for chat
 */
export async function chatWithQwen(
  messages: ChatMessage[],
  apiKey: string
): Promise<ChatResponse> {
  if (!apiKey) {
    throw new Error("API Key is required")
  }

  try {
    const response = await fetch(QWEN_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen-plus",
        input: {
          messages: [
            {
              role: "system",
              content: EWA_SYSTEM_PROMPT
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ]
        },
        parameters: {
          result_format: "message",
          max_tokens: 1000,
          temperature: 0.7
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Qwen API error:", response.status, errorData)
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.output?.choices?.[0]?.message?.content || ""

    if (!content) {
      throw new Error("Empty response from Qwen API")
    }

    return {
      message: content,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error("Qwen API call failed:", error)
    throw error
  }
}

/**
 * Mock chat response for demo (when API key is not provided)
 */
export function mockChatResponse(userMessage: string): ChatResponse {
  const lowerMessage = userMessage.toLowerCase()

  // EWA related
  if (lowerMessage.includes("ứng") || lowerMessage.includes("ewa") || lowerMessage.includes("rút")) {
    return {
      message: `Để ứng EWA, bạn có thể rút tối đa 30% lương tháng theo Luật Lao động.

💡 **Lưu ý quan trọng:**
- Phí dịch vụ: 1.5% số tiền rút
- Tiền vào tài khoản ngay lập tức
- Tự động trừ từ lương tháng sau

Bạn muốn ứng bao nhiêu? Hãy kiểm tra hạn mức còn lại trước nhé! 💰`,
      timestamp: new Date().toISOString()
    }
  }

  // Salary related
  if (lowerMessage.includes("lương") || lowerMessage.includes("salary")) {
    return {
      message: `Lương tháng này của bạn sẽ về vào **30/04/2026** 📅

**Thông tin lương:**
- Tổng lương: 25 triệu VND
- Hạn mức EWA: 7.5 triệu VND (30%)
- Đã sử dụng: 2 triệu VND
- Còn lại: 5.5 triệu VND

Bạn có câu hỏi gì về lương không? 🤔`,
      timestamp: new Date().toISOString()
    }
  }

  // Savings related
  if (lowerMessage.includes("tiết kiệm") || lowerMessage.includes("save")) {
    return {
      message: `Tuyệt vời! Tiết kiệm là bước đầu tiên để đạt tự do tài chính 🎯

**Gợi ý tiết kiệm cho bạn:**
1. **Quy tắc 50/30/20:** 50% nhu cầu thiết yếu, 30% mong muốn, 20% tiết kiệm
2. **Tiết kiệm tự động:** Thiết lập chuyển khoản tự động mỗi khi nhận lương
3. **Quỹ khẩn cấp:** Tích lũy 3-6 tháng chi tiêu

Bạn muốn tôi giúp lập kế hoạch tiết kiệm chi tiết không? 💡`,
      timestamp: new Date().toISOString()
    }
  }

  // Spending related
  if (lowerMessage.includes("chi tiêu") || lowerMessage.includes("tiền") || lowerMessage.includes("spend")) {
    return {
      message: `Dựa trên dữ liệu của bạn, tôi có một số quan sát:

**Phân tích chi tiêu:**
- Chi tiêu tuần này tăng 35% so với TB
- Có thể tiết kiệm ~800k/tháng nếu giảm order đồ ăn
- EWA chiếm 8% thu nhập (tốt!)

**Gợi ý:**
1. Theo dõi chi tiêu hàng ngày
2. Đặt ngân sách cho từng category
3. Sử dụng EWA khi thực sự cần thiết

Bạn muốn tôi phân tích chi tiêu chi tiết không? 📊`,
      timestamp: new Date().toISOString()
    }
  }

  // Default response
  return {
    message: `Xin chào! Tôi là Trợ lý Tài chính của bạn 🤖

Tôi có thể giúp bạn với:
- 💰 Ứng lương EWA
- 📊 Quản lý chi tiêu
- 💡 Lời khuyên tiết kiệm
- 📈 Tư vấn đầu tư cơ bản
- 🎯 Cải thiện sức khỏe tài chính

Bạn cần giúp gì hôm nay? 😊`,
    timestamp: new Date().toISOString()
  }
}

/**
 * Get suggested questions for employee chat
 */
export function getEmployeeSuggestions(): string[] {
  return [
    "Tôi cần ứng 500k mua thuốc",
    "Chi tiêu tuần này của tôi thế nào?",
    "Làm sao để tiết kiệm hiệu quả?",
    "Hạn mức EWA của tôi còn bao nhiêu?",
    "Lương tháng này什么时候到?"
  ]
}

/**
 * Get suggested questions for HR chat
 */
export function getHRSuggestions(): string[] {
  return [
    "Sức khỏe tài chính nhân viên tháng này?",
    "Nhân viên nào cần can thiệp gấp?",
    "Làm sao để giảm tỷ lệ nghỉ việc?",
    "Chiến lược phúc lợi tài chính hiệu quả?"
  ]
}

/**
 * Get suggested questions for Bank chat
 */
export function getBankSuggestions(): string[] {
  return [
    "NPL rate hiện tại là bao nhiêu?",
    "Doanh nghiệp nào có rủi ro cao?",
    "Dự báo thanh khoản 7 ngày tới?",
    "Chiến lược giảm nợ xấu hiệu quả?"
  ]
}

/**
 * Get suggested questions for Seller chat (SF12 MicroBiz Loan)
 */
export function getSellerSuggestions(): string[] {
  return [
    "Hạn mức vay của tôi hiện tại là bao nhiêu?",
    "Làm sao để tăng điểm tín dụng?",
    "Doanh thu tháng này thế nào?",
    "Khi nào nên vay vốn nhập hàng?",
    "Tỷ lệ trích nợ hôm nay là bao nhiêu?",
    "Làm sao để giảm tỷ lệ hoàn hàng?"
  ]
}

/**
 * Get suggested questions for Admin chat (SF12 MicroBiz Loan)
 */
export function getAdminSuggestions(): string[] {
  return [
    "Tổng quan danh mục vay hiện tại?",
    "Seller nào có rủi ro cao nhất?",
    "Dự báo NPL rate tháng tới?",
    "Chiến lược mở rộng thị trường?"
  ]
}
