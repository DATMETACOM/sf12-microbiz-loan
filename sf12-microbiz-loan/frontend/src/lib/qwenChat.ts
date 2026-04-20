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
 * System prompt for SF12 MicroBiz Loan Mini-CFO Assistant
 */
const MICROBIZ_SYSTEM_PROMPT = `Bạn là Mini-CFO AI (Trợ lý Tài chính Thông minh) cho hệ thống MicroBiz Loan của Shinhan Finance.

VAI TRÒ CỦA BẠN:
1. Cố vấn tài chính chuyên nghiệp cho seller trên nền tảng TMĐT
2. Giúp quản lý dòng tiền, tối ưu vốn vay
3. Phân tích dữ liệu kinh doanh, dự báo nhu cầu
4. Tư vấn chiến lược nâng hạng tín dụng

NGUYÊN TẮC:
- Luôn trung lập, không thúc đẩy vay quá mức
- Tập trung vào lợi ích dài hạn của seller
- Minh bạch về lãi suất, phí, rủi ro
- Tuân thủ quy định pháp lý (Nghị định 13/2023, Bộ luật Dân sự)

NGỮ CÁCH:
- Thân thiện, chuyên nghiệp, hiểu biết về kinh doanh online
- Sử dụng emoji phù hợp
- Giải thích rõ ràng, đưa ra ví dụ cụ thể
- Đề xuất giải pháp thực tế

CHỦ ĐỀ CÓ THỂ HỖ TRỢ:
- Quản lý dòng tiền & vốn vay
- Tối ưu tỷ lệ trích nợ
- Chiến lược nhập hàng
- Nâng hạng tín dụng
- Giảm tỷ lệ hoàn hàng
- Mở rộng kinh doanh

KHI SELLER HỎI VỀ VAY:
- Phân tích khả năng trả nợ
- So sánh các phương án
- Khuyên dùng nếu phù hợp
- Cảnh báo rủi ro nếu cần thiết

Hãy trả lời ngắn gọn, trực tiếp, hữu ích cho seller.`

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

  // Seller-specific responses (SF12)
  if (lowerMessage.includes("hạn mức") || lowerMessage.includes("vay") || lowerMessage.includes("tín dụng")) {
    return {
      message: `**Hạn mức vay của bạn hiện tại: 50 triệu VND** 💰

**Chi tiết:**
- Đang sử dụng: 30 triệu VND
- Còn khả dụng: 20 triệu VND
- Điểm tín dụng: 680/850 (Hạng Vàng) ⭐

**Gợi ý:**
- Duy trì tỷ lệ hoàn hàng dưới 3% để nâng hạng
- Kết nối API liên tục 30 ngày để tăng hạn mức +15M
- Tăng trưởng doanh thu 15% để giảm lãi suất 1-2%

Bạn có muốn tư vấn chi tiết không? 🤔`,
      timestamp: new Date().toISOString()
    }
  }

  if (lowerMessage.includes("điểm tín dụng") || lowerMessage.includes("tăng điểm") || lowerMessage.includes("credit score")) {
    return {
      message: `Để tăng điểm tín dụng từ **680 → 750+ (Bạch Kim)**, bạn nên: 📈

**1. Giảm tỷ lệ hoàn hàng**
- Mục tiêu: Dưới 3% (hiện tại: 3.2%)
- Kiểm tra chất lượng sản phẩm, đóng gói kỹ hơn

**2. Duy trì kết nối API**
- Đã kết nối 20/30 ngày
- Còn 10 ngày để đạt +30 điểm

**3. Tăng trưởng doanh thu**
- Tháng này: +12% (tốt!)
- Cần thêm 3% để đạt +50 điểm

**4. Đa dạng hóa nền tảng**
- Hiện tại: Shopee (100%)
- Thêm TikTok Shop/Lazada để +20 điểm

Tôi sẽ theo dõi và thông báo khi bạn đạt các mục tiêu! 🎯`,
      timestamp: new Date().toISOString()
    }
  }

  if (lowerMessage.includes("doanh thu") || lowerMessage.includes("revenue") || lowerMessage.includes("tháng này")) {
    return {
      message: `**Phân tích doanh thu tháng 4/2026:** 📊

**Tổng quan:**
- Doanh thu: 285 triệu VND (+12% vs tháng 3)
- Trung bình/ngày: 9.5 triệu VND
- Ngày cao nhất: 18.2 triệu (Mega Sale)

**Xu hướng:**
- Tăng trưởng ổn định 3 tháng liên tục
- Category bán chạy: Thời trang nữ (+45%)
- Category cần cải thiện: Phụ kiện (-8%)

**Dự báo:**
- Tháng 5: dự kiến ~310 triệu (+8%)
- Nhu cầu nhập hàng: ~150 triệu

Bạn có muốn tôi phân tích chi tiết theo category không? 📈`,
      timestamp: new Date().toISOString()
    }
  }

  if (lowerMessage.includes("nhập hàng") || lowerMessage.includes("vốn") || lowerMessage.includes("khi nào")) {
    return {
      message: `**Dựa trên dữ liệu của bạn, đây là thời điểm VÀNG để nhập hàng!** ✨

**Tại sao nên vay vốn nhập hàng NGAY:**

1. **Dự báo nhu cầu tăng mạnh**
   - Trend sản phẩm của bạn +45% trong 3 tháng
   - Kho có thể hết hàng trong 5 ngày

2. **Tỷ lệ trích nợ tối ưu**
   - Hôm nay: 10% (bình thường)
   - Doanh thu ổn định, khả năng trả nợ tốt

3. **Lợi ích**
   - Giải ngân tức thì 15-20 triệu
   - Nhập hàng đón trend, tăng doanh thu
   - Trả từ doanh thu tương lai

**Gợi ý:**
- Vay 15-20 triệu để nhập hàng top sellers
- Tỷ lệ trích nợ 10%, giữ 90% vốn lưu động

Bạn muốn tôi tính toán chi tiết không? 💡`,
      timestamp: new Date().toISOString()
    }
  }

  if (lowerMessage.includes("trích nợ") || lowerMessage.includes("tỷ lệ") || lowerMessage.includes("hôm nay")) {
    return {
      message: `**Nhiệt kế dòng tiền hôm nay:** 🌡️

**Tỷ lệ trích nợ: 10% (Bình thường)**
- Doanh thu ước tính: 9.5 triệu VND
- Trích nợ: 950k VND
- Giữ lại: 8.55 triệu VND (90%) ✅

**So với bình thường:**
- Tỷ lệ chuẩn: 10%
- Hôm nay: 10% (không đổi)
- Lý do: Doanh thu ổn định

**Lợi ích:**
- Giữ được 90% vốn lưu động
- Có đủ tiền nhập hàng nhỏ
- Duy trì cash flow tốt

AI sẽ tự động điều chỉnh nếu doanh thu biến động mạnh! 🤖`,
      timestamp: new Date().toISOString()
    }
  }

  if (lowerMessage.includes("hoàn hàng") || lowerMessage.includes("return") || lowerMessage.includes("giảm tỷ lệ")) {
    return {
      message: `**Cải thiện tỷ lệ hoàn hàng từ 3.2% → dưới 3%** 🔄

**Phân tích hiện tại:**
- Tỷ lệ hoàn hàng: 3.2% (gần ngưỡng 3%)
- Nguyên nhân chính: Size không phù hợp (45%), lỗi sản phẩm (30%)
- Ảnh hưởng: -10 điểm tín dụng mỗi tháng

**Giải pháp:**
1. **Cải thiện mô tả sản phẩm**
   - Thêm bảng size chi tiết
   - Video đo thực tế

2. **Kiểm tra chất lượng**
   - Kiểm tra 100% trước khi đóng gói
   - Ghi chú sản phẩm dễ lỗi

3. **Chính sách đổi trả**
   - Đổi trả miễn phí trong 7 ngày
   - Tặng voucher cho khách không đổi trả

**Dự báo:**
- Nếu áp dụng: có thể giảm xuống 2.5% trong 1 tháng
- Lợi ích: +50 điểm tín dụng, mở khóa hạn mức cao hơn

Bạn muốn tôi giúp lập kế hoạch chi tiết không? 📋`,
      timestamp: new Date().toISOString()
    }
  }

  // EWA related (SF11)
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

  // Salary related (SF11)
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
    message: `Xin chào! Tôi là Mini-CFO AI, trợ lý tài chính thông minh của bạn 🤖

Tôi có thể giúp bạn với:
- 💰 Quản lý hạn mức vay & dòng tiền
- 📊 Phân tích doanh thu & chi phí
- 💡 Chiến lược nhập hàng & kinh doanh
- 🎯 Nâng hạng tín dụng & giảm rủi ro
- 📈 Tối ưu tỷ lệ trích nợ

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
