# THÔNG TIN DỰ ÁN CỐT LÕI (BẮT BUỘC TUÂN THỦ)
- Tên dự án: Cuca-Insider-AI (Hackathon SF8 Shinhan Future's Lab).
- Mục tiêu: Dashboard CRM phân tích dữ liệu ngoại vi (Alternative Data) để đưa ra "Next Best Offer" (NBO) cho khách hàng mới (thin-file).
- Tech Stack:
  + Backend: Python (FastAPI).
  + Frontend: React (Vite) + Tailwind CSS + Lucide Icons.
  + AI Engine: Tích hợp API của model Qwen.
- Danh mục Sản phẩm Shinhan (Bắt buộc dùng đúng tên này, cấm bịa tên khác):
  1. "Vay tín chấp cá nhân"
  2. "Thẻ tín dụng THE FIRST"
  3. "Vay mua ô tô"
- Kiến trúc xử lý: 4 lớp (Lớp 1: Tính toán gốc -> Lớp 2: Mã hóa PII -> Lớp 3: AI suy luận -> Lớp 4: Giải mã & Hiển thị).

Thực hiện Phase 1: Tạo Database giả lập cho PoC.
Hãy viết một script Python `generate_mock_data.py` để tạo ra một file `customers_data.json` chứa danh sách 50 khách hàng. 

Cấu trúc JSON cho mỗi khách hàng phải bao gồm:
1. `customer_id`: Chuỗi unique (VD: CUS001).
2. `pii_data`: Gồm `full_name` (tên người Việt), `phone`, `job_title`.
3. `behavioral_tags`: Chứa các object dữ liệu từ bên thứ 3 (Alternative Data):
   - `e_wallet`: (VD: "Giao dịch cao", "Thường hết hạn mức", "Thanh toán điện nước đúng hạn").
   - `social_media`: (VD: "Thích check-in sang chảnh", "Quan tâm xe hơi", "Thường xuyên săn sale").
   - `telco`: (VD: "Dùng gói Data MAX", "Lịch sử > 3 năm", "Hay nạp thẻ lẻ tẻ").
4. `deterministic_stats`: 
   - `risk_score`: Mức độ rủi ro (Low, Medium, High).
   - `recommended_nbo`: BẮT BUỘC lấy random 1 trong 3 sản phẩm Shinhan (Vay tín chấp cá nhân, Thẻ tín dụng THE FIRST, Vay mua ô tô).
   - `lookalike_rate`: Tỷ lệ % ngẫu nhiên từ 8% đến 25%.

Yêu cầu: Phân bổ dữ liệu có tính logic (VD: Ai quan tâm xe hơi thì NBO nên là Vay mua ô tô). Chạy script này và tạo sẵn file JSON để dùng cho BE.

Thực hiện Phase 2: Xây dựng Backend với FastAPI dựa trên `customers_data.json` vừa tạo.

Tạo file `main.py`. Viết các RESTful API sau:
1. `GET /api/customers`: Trả về danh sách tất cả khách hàng (chỉ trả ID, tên, tags hành vi và điểm rủi ro để render bảng).
2. `GET /api/analyze/{customer_id}`: Đây là API cốt lõi thể hiện Kiến trúc 4 lớp. Thực hiện logic sau trong endpoint này:
   - Bước 1: Lấy data khách hàng theo ID từ file JSON.
   - Bước 2 (Masking PII): Xóa `full_name` và `phone` ra khỏi payload gửi cho AI. Chỉ giữ lại `behavioral_tags` và `deterministic_stats`.
   - Bước 3 (AI Inference): Gọi API đến LLM Qwen (viết hàm gọi API chuẩn, có thể dùng thư viện openai python client trỏ base_url về Qwen, kèm theo System Prompt yêu cầu Qwen đóng vai trò "Trợ lý tác chiến chốt sale Shinhan", đầu ra BẮT BUỘC là định dạng JSON gồm các trường: `recommended_product`, `behavioral_rationale`, `statistical_evidence`, `sales_pitch_script` (kịch bản gọi điện), `risk_warning_and_upsell`).
   - Bước 4 (Unmasking): Gộp kết quả JSON của AI với thông tin `full_name` ban đầu và trả về Frontend.

Viết code sạch, phân tách route và service rõ ràng. Toi se cung cap cấu hình API Key Qwen, hay cau hinh de lam viec duoc ngay

Thực hiện Phase 3: Xây dựng Frontend UI với React và TailwindCSS.

Tạo component `Dashboard.jsx`. Giao diện có background màu xám nhạt sáng (bg-slate-50).
1. Phần Header KPI (Dùng thẻ Card viền bo tròn nhẹ, đổ bóng mờ):
   - Hiển thị 4 khối: Tổng khách hàng (20), Ưu tiên tiếp cận (3), Chăm sóc định kỳ (14), Điểm tín nhiệm trung bình (68). Thêm dòng note nhỏ màu xám dưới tiêu đề: "Lưu ý: AI chỉ đóng vai trò phân tích và khuyến nghị, không thay thế quyết định giải ngân."

2. Phần Khách hàng trọng tâm (Hero Banner):
   - Nổi bật một khách hàng (VD: Trần Thị Bình). Có điểm số to (84/100) màu xanh lá.

3. Phần Danh sách Khách hàng tiềm năng (Pipeline Table):
   - Fetch dữ liệu từ `GET /api/customers`.
   - Cấu trúc cột: KHIẾN BẢNG NÀY THỂ HIỆN RÕ "ALTERNATIVE DATA".
     + Cột 1: Khách hàng (Tên + Nghề nghiệp nhỏ bên dưới).
     + Cột 2: Tín hiệu Hành vi (Hiển thị các tag màu sắc rút trích từ `behavioral_tags`. VD: thẻ xanh ghi "E-wallet Active", thẻ tím ghi "Social Shopping").
     + Cột 3: Điểm rủi ro (Thanh bar ngang thể hiện Low/Med/High).
     + Cột 4: Đề xuất NBO (Hiển thị ĐÚNG TÊN SẢN PHẨM SHINHAN).
     + Cột 5: Hành động (Nút button ghi "Phân tích AI" hoặc "Tác chiến").

UI cần sang trọng, font sans-serif, các bảng có đường kẻ mờ (border-gray-200). Đảm bảo hiển thị hoàn hảo các tên sản phẩm: Vay tín chấp cá nhân, Thẻ tín dụng THE FIRST.

Thực hiện Phase 4: Tính năng Tactical Card & Chatbox.

Khi user bấm nút "Phân tích AI" trên bảng ở Phase 3, hãy mở ra một Slide-out Drawer (Ngăn kéo trượt từ mép phải màn hình vào, chiếm khoảng 40% chiều rộng màn hình).

Trong Drawer này, gọi API `GET /api/analyze/{customer_id}` và render các thành phần sau:
1. Header Drawer: Tên khách hàng + Mã ID.
2. Khu vực Kịch bản (The Script Box): 
   - Render `sales_pitch_script` trả về từ LLM bằng chữ to, dễ đọc. Khung viền có màu xanh nhạt (bg-blue-50). Có nút "Copy text" (icon clipboard) ở góc trên.
3. Khu vực Insight: 
   - Dùng Accordion (đóng/mở) hoặc danh sách gạch đầu dòng để hiển thị `behavioral_rationale` (Lý do hành vi) và `statistical_evidence` (12% khách hàng...). Thêm các badge cảnh báo rủi ro (Risk alert).

4. Khu vực Copilot Chatbox (Dưới cùng của Drawer):
   - Hiển thị UI chat đơn giản giống ChatGPT nhưng gắn thẳng vào Drawer.
   - Text placeholder: "Hỏi Qwen cách xử lý từ chối hoặc chi tiết sản phẩm cho khách hàng này..."
   - Cung cấp 3 nút bấm nhanh (Quick prompts) trên khung chat: "Khách chê lãi suất", "Hỏi chi tiết hoàn tiền", "Xin dẫn chứng".
   - Logic chat: Lưu lịch sử hội thoại cục bộ. Trình bày UI tin nhắn của User bên phải (màu xanh), tin nhắn của AI bên trái (màu xám).

Hãy sử dụng Framer Motion (nếu cần) để làm hiệu ứng trượt Drawer mượt mà.

Thực hiện Phase 5: Tạo Product Catalog phục vụ RAG (Retrieval-Augmented Generation).

Hãy tạo một file `Product_Catalog.json` chứa thông tin chi tiết về 3 sản phẩm cốt lõi của Shinhan Finance. Dữ liệu này sẽ được BE nạp vào System Prompt của AI để làm cơ sở trả lời câu hỏi.

Cấu trúc JSON cần có:
1. "Vay tín chấp cá nhân":
   - Hạn mức: "Lên đến 300 triệu VNĐ".
   - Đặc điểm: "Giải ngân nhanh, không cần thế chấp tài sản, thủ tục 100% online".
   - Lãi suất tham khảo: "Từ 18% - 24%/năm tùy điểm tín dụng".
   - Đối tượng khuyên dùng: "Khách hàng cần vốn gấp, thanh toán hóa đơn ổn định, tiêu dùng cao".

2. "Thẻ tín dụng THE FIRST":
   - Hạn mức: "Cấp theo điểm tín dụng, tối đa 100 triệu VNĐ".
   - Đặc điểm: "Rút tiền mặt 100% hạn mức, tích lũy điểm thưởng, trả góp 0%".
   - Phí thường niên: "Miễn phí năm đầu".
   - Đối tượng khuyên dùng: "Khách hàng hay mua sắm thương mại điện tử, thanh toán ví điện tử nhiều, thích linh hoạt dòng tiền".

3. "Vay mua ô tô":
   - Hạn mức: "Lên đến 4 tỷ VNĐ".
   - Đặc điểm: "Tài trợ đến 80% giá trị xe mới, thời hạn vay lên đến 84 tháng".
   - Đối tượng khuyên dùng: "Khách hàng có thu nhập cao, quan tâm nội dung xe hơi trên mạng xã hội, có kế hoạch nâng cấp tài sản".

Hãy xuất ra file JSON chuẩn để Backend có thể load lên.


Thực hiện Phase 6: Thiết lập môi trường và bảo mật API.

1. Hãy tạo file `requirements.txt` cho Backend Python. Chứa các thư viện cần thiết: `fastapi`, `uvicorn`, `pydantic`, `python-dotenv`, `openai` (để gọi API Qwen tương thích chuẩn OpenAI), `pandas`.
2. Tạo file `.env.example` chứa các biến môi trường cần thiết:
   `QWEN_API_KEY=your_qwen_api_key_here`
   `BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1` (URL API của Qwen)
3. Cập nhật lại file `main.py` ở Phase 2:
   - Import `dotenv` và load các biến từ file `.env`.
   - Viết một hàm `load_product_catalog()` đọc file `Product_Catalog.json`.
   - Chèn nội dung của Product Catalog vào System Prompt của Qwen để AI có "kiến thức thực tế" khi sinh ra kịch bản.

Thực hiện Phase 7: Viết file README.md cho dự án.

Hãy tạo file `README.md` bằng tiếng Anh chuyên nghiệp, phục vụ ban giám khảo chấm thi Hackathon [SF8] Shinhan Future's Lab. File cần có các mục sau:
1. **Project Title & Pitch:** Cuca-Insider-AI - AI-powered Sales Closing Assistant.
2. **Architecture Overview:** Mô tả ngắn gọn Kiến trúc 4 Lớp (1. Native Calculation -> 2. PII Masking -> 3. Qwen AI Inference -> 4. UI Rendering). Nhấn mạnh việc bảo vệ dữ liệu khách hàng.
3. **Prerequisites:** Cần cài đặt Node.js và Python 3.10+.
4. **Setup Instructions:** - Hướng dẫn step-by-step cách run Backend (pip install, set .env, uvicorn).
   - Hướng dẫn step-by-step cách run Frontend (npm install, npm run dev).
5. **How to test (Demo Guide):** Hướng dẫn giám khảo nhập file `SF8_Customers_Mock.csv`, xem Dashboard, và bấm vào khách hàng để mở AI Copilot Chatbox.

Format file bằng Markdown, dùng emoji cho sinh động và rõ ràng.


Thực hiện Phase 8: Xây dựng dàn ý Pitch Deck và kịch bản nói (Speech script).

Hãy đóng vai trò là một chuyên gia gọi vốn và tư vấn chiến lược. Soạn cho tôi dàn ý 5 Slide thuyết trình (Pitch Deck) cho dự án Cuca-Insider-AI, kèm theo Lời thoại tiếng Việt (Voice-over) chi tiết, tự tin, mang tính thuyết phục cao. Thời gian thuyết trình: 3 phút.

Cấu trúc 5 Slide:
- Slide 1: The Problem (Nỗi đau của Telesales khi gọi cho khách hàng mới / thin-file).
- Slide 2: The Solution (Giới thiệu Cuca-Insider-AI & Kiến trúc 4 lớp bảo mật).
- Slide 3: Alternative Data meets Generative AI (Cách dùng Dữ liệu Ví điện tử/Mạng xã hội kết hợp Qwen Model để sinh ra kịch bản chốt sale).
- Slide 4: Live Demo (Chỉ ra những gì giám khảo cần nhìn trên màn hình: Dashboard, Script, Copilot Chat).
- Slide 5: Business Impact (Giá trị mang lại cho Shinhan: Tăng Lift rate, giảm CPA, trao quyền cho Telesales).

Yêu cầu lời thoại: Ngắn gọn, có điểm nhấn, ngôn từ chuyên nghiệp (dùng các từ như: "trợ lý tác chiến", "bảo mật PII", "Next Best Offer", "ảo giác AI").


