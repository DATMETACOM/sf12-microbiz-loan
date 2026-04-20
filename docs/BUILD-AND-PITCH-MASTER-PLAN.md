# [SF12] Build + Pitch Master Plan

## 1. Mục tiêu tài liệu

Tài liệu này là nguồn tham chiếu duy nhất cho:
- Đội kỹ thuật triển khai PoC end-to-end.
- Đội pitching kể đúng câu chuyện sản phẩm, rủi ro, pháp lý, vận hành.
- Ban tổ chức/judge nhìn thấy rõ tính khả thi thật, không chỉ concept.

## 2. North Star cho PoC

- Sản phẩm: Micro loan 5-50M VND cho seller/freelancer/gig worker.
- Mô hình trả nợ: Revenue-Based Financing (trả theo % doanh thu thực tế).
- Kết quả cần chứng minh trước giám khảo:
- Duyệt nhanh tự động bằng dữ liệu thay thế.
- Thu nợ tự động theo dòng tiền thực nhận.
- Có lớp bảo vệ rủi ro và kiểm soát pháp lý ngay trong hệ thống.
- Có giải thích quyết định AI (reason codes + audit log).

## 3. Phạm vi PoC (In/Out)

In-Scope:
- Onboarding + consent + liên kết nguồn dữ liệu mock API.
- AI/Rule scoring + đề xuất hạn mức + tỷ lệ trích thu.
- Giải ngân vào VA mô phỏng.
- Auto-collection + idempotency key.
- Middle-office ledger + EOD posting mô phỏng.
- Dashboard vận hành cho Admin + màn hình Seller.
- Khung legal controls (cap 20%, minimization, contact window).

Out-of-Scope cho PoC:
- Kết nối production thật với Shopee/TikTok/MoMo.
- Hạch toán thật vào Core Banking thật.
- Mô hình ML production training pipeline.

## 4. Kiến trúc logic cần có trong PoC

Luồng 5 bước:
1. Onboarding & Consent: eKYC mock, ký hợp đồng mock, cấp VA.
2. Data Ingestion & Scoring: lấy dữ liệu GMV/return rate/velocity, trả score + reason codes.
3. Disbursement: giải ngân vào VA.
4. Auto-Collection: khi có inflow vào VA, hệ thống trích % về quỹ.
5. Dynamic CRM: chấm lại health score, gợi ý upsell vòng sau.

Lớp kỹ thuật bắt buộc:
- Payment API có `Idempotency-Key`.
- Middle-office sub-ledger ghi nhận giao dịch nhỏ lẻ.
- EOD batch posting gộp bút toán cuối ngày.
- Audit trail cho scoring và repayment actions.

## 5. Kiến trúc dữ liệu tối thiểu

Entity chính:
- `sellers`
- `cash_flows`
- `loan_applications`
- `loans`
- `virtual_accounts`
- `collections`
- `ledger_entries`
- `eod_batches`
- `consents`
- `scoring_reason_codes`
- `audit_logs`
- `risk_alerts`

Nguyên tắc dữ liệu:
- Data minimization: không lưu PII người mua hàng, chỉ token + số tổng hợp.
- Pseudonymization: định danh buyer dạng hash/token.
- TTL cho dữ liệu nhạy cảm PoC (nếu cần demo compliance).

## 6. API contract tối thiểu cho demo

Nhóm Seller:
- `POST /api/sellers/onboard`
- `GET /api/sellers`
- `GET /api/sellers/{seller_id}`
- `GET /api/sellers/{seller_id}/cashflow`

Nhóm Scoring:
- `POST /api/scoring/run/{seller_id}`
- `GET /api/scoring/{seller_id}/latest`

Nhóm Loan:
- `POST /api/loans/apply`
- `POST /api/loans/{loan_id}/disburse`
- `GET /api/loans/{loan_id}`
- `GET /api/loans`

Nhóm Collection + Ledger:
- `POST /api/collections/inflow` (bắt buộc header `Idempotency-Key`)
- `GET /api/collections/{loan_id}`
- `POST /api/ledger/eod-close`
- `GET /api/ledger/eod-batches`

Nhóm Risk + Compliance:
- `GET /api/risk/alerts`
- `GET /api/compliance/cap-status/{loan_id}`
- `GET /api/compliance/consents/{seller_id}`

Nhóm Admin Dashboard:
- `GET /api/admin/dashboard`
- `GET /api/admin/portfolio`
- `GET /api/admin/risk-analytics`

## 7. Pitch narrative (khung kể chuyện 5 phút)

Hook:
- “Micro-SME bán online đang có doanh thu thật mỗi ngày nhưng bị từ chối vay vì thiếu hồ sơ truyền thống.”

What we built:
- “SF12 chấm điểm bằng dòng tiền số, giải ngân nhanh, và thu nợ linh hoạt theo % doanh thu.”

Why safer:
- “Thu nợ tại nguồn + idempotency + ledger + cảnh báo gian lận + legal guardrails.”

Evidence live demo:
- Seller được duyệt trong vài phút.
- Hệ thống tự trích đúng tỷ lệ khi dòng tiền vào VA.
- Có reason code giải thích vì sao duyệt/không duyệt.
- Có cap cơ chế dừng trích thu đúng ngưỡng.

Business close:
- Mở tệp khách hàng mới.
- Giảm áp lực trả nợ, kỳ vọng NPL thấp hơn.
- Có đường lên production qua API partnership.

## 8. Bộ Q&A phòng thủ cho judge

Q1. Khác gì BNPL?
- Đây là khoản vay vốn lưu động, đa kênh, trả theo doanh thu, không gắn 1 giỏ hàng cụ thể.

Q2. Làm sao chống trừ tiền 2 lần?
- Payment API bắt buộc `Idempotency-Key`, cùng key chỉ ghi nhận một giao dịch.

Q3. AI có black-box không?
- Mọi quyết định scoring xuất `reason_codes` + `audit_logs` có timestamp và trọng số.

Q4. Vượt trần pháp lý thì sao?
- Cap mechanism tự động dừng thu khi tổng thu quy đổi chạm ngưỡng thiết kế.

Q5. Nếu seller né nền tảng?
- Risk engine tạo alert nếu traffic ổn nhưng GMV vào VA giảm bất thường.

## 9. Kế hoạch triển khai theo phase (xử lý hết)

### Phase 0 - Baseline & Demo Contract
Mục tiêu:
- Khóa scope PoC, thống nhất use-case demo, đóng băng API contract.

Đầu ra code:
- Tạo file `.env.example`, seed data chuẩn, route map.

Đầu ra pitch:
- 1 slide “Problem -> Solution -> Proof”.

Tiêu chí pass:
- Team thống nhất demo script, metrics, và assumptions.

### Phase 1 - Backend Foundation (bắt buộc)
Mục tiêu:
- API chạy thật, không còn hardcode rỗng.

Đầu ra code:
- Mount toàn bộ routers vào FastAPI.
- CRUD cơ bản Seller/Loan/Cashflow.
- Seed data nạp được vào DB.

Đầu ra pitch:
- Có dữ liệu thật để dashboard kể chuyện.

Tiêu chí pass:
- FE gọi API thật thấy dữ liệu nhất quán.

### Phase 2 - Scoring + XAI
Mục tiêu:
- Có điểm tín dụng, recommendation, reason codes.

Đầu ra code:
- Scoring service trả score + factors + reason_codes + recommendation.
- Lưu `scoring_reason_codes` và `audit_logs`.

Đầu ra pitch:
- Slide “AI minh bạch: vì sao hệ thống duyệt”.

Tiêu chí pass:
- 1 seller cho ra kết quả duyệt + lý do rõ ràng.

### Phase 3 - Disbursement + Virtual Account
Mục tiêu:
- Mô phỏng giải ngân vào VA.

Đầu ra code:
- Sinh VA theo seller.
- API disburse cập nhật trạng thái khoản vay.

Đầu ra pitch:
- Demo “approved -> disbursed” trong 1 luồng.

Tiêu chí pass:
- Loan status đi đúng vòng đời.

### Phase 4 - Auto-Collection + Idempotency
Mục tiêu:
- Trích thu tự động theo % doanh thu.

Đầu ra code:
- Endpoint inflow có `Idempotency-Key`.
- Tính toán trích thu, cập nhật dư nợ.

Đầu ra pitch:
- Demo gửi trùng request không bị trừ 2 lần.

Tiêu chí pass:
- Cùng key trả cùng transaction result.

### Phase 5 - Middle-Office Ledger + EOD Batch
Mục tiêu:
- Chịu được nhiều giao dịch nhỏ lẻ mà không đẩy thẳng vào core.

Đầu ra code:
- Ghi `ledger_entries` cho mỗi sự kiện collection.
- Job `eod-close` gộp và tạo batch posting.

Đầu ra pitch:
- Slide “Scalable with Core Banking safe integration”.

Tiêu chí pass:
- Báo cáo EOD khớp tổng collection trong ngày.

### Phase 6 - Risk Shield
Mục tiêu:
- Có lớp cảnh báo rủi ro hoạt động.

Đầu ra code:
- Rule-based fraud/anomaly/stacking detector (PoC).
- API trả `risk_alerts`.

Đầu ra pitch:
- Dashboard cảnh báo đỏ + mô tả hành vi nghi vấn.

Tiêu chí pass:
- Ít nhất 2 case cảnh báo được kích hoạt bằng dữ liệu demo.

### Phase 7 - Legal/Compliance Guardrails
Mục tiêu:
- Thể hiện “compliance-by-design”.

Đầu ra code:
- Consent records.
- Cap mechanism dừng trích thu theo ngưỡng thiết kế.
- Rule giờ nhắc nợ 07:00-21:00.
- Kỳ đối soát tối thiểu 30 ngày trong hợp đồng/logic phân loại.

Đầu ra pitch:
- Slide pháp lý: điều gì đã được nhúng vào hệ thống.

Tiêu chí pass:
- Có endpoint và màn hình hiển thị trạng thái compliance.

### Phase 8 - Frontend Integration & Story UI
Mục tiêu:
- FE bỏ mock local, dùng toàn bộ API thật.

Đầu ra code:
- Seller Dashboard, Scoring, Admin, Pipeline Monitor.
- Compliance panel, Risk panel, Repayment simulator.

Đầu ra pitch:
- Demo UI liền mạch từ onboarding tới collection.

Tiêu chí pass:
- Không còn import mock data trong pages chính.

### Phase 9 - Pitch Pack & Demo Rehearsal
Mục tiêu:
- Chốt bài thi thành gói sẵn sàng trình bày.

Đầu ra code:
- Demo seed script ổn định, 1-click runbook.

Đầu ra pitch:
- Slide deck 8-10 slide.
- Script nói 5 phút + Q&A 3 phút.

Tiêu chí pass:
- Chạy rehearsal 3 lần liên tiếp không vỡ luồng.

## 10. Checklist thực thi tổng

- [ ] Phase 0 hoàn thành.
- [ ] Phase 1 hoàn thành.
- [ ] Phase 2 hoàn thành.
- [ ] Phase 3 hoàn thành.
- [ ] Phase 4 hoàn thành.
- [ ] Phase 5 hoàn thành.
- [ ] Phase 6 hoàn thành.
- [ ] Phase 7 hoàn thành.
- [ ] Phase 8 hoàn thành.
- [ ] Phase 9 hoàn thành.

## 11. Definition of Done cho toàn bộ PoC

- Demo được full flow 5 bước, có dữ liệu nhất quán từ BE lên FE.
- Có idempotency, ledger, EOD batch và audit log hoạt động.
- Có reason code cho scoring và cảnh báo risk hoạt động.
- Có legal controls thể hiện được bằng API + UI.
- Có pitch deck + script + Q&A bám đúng những gì hệ thống thật đang làm.

## 12. Cách dùng tài liệu này mỗi ngày

Buổi sáng:
- Chọn đúng 1 phase đang làm.
- Chốt acceptance criteria trong phase đó.

Trong ngày:
- Commit theo milestone nhỏ bám checklist phase.

Cuối ngày:
- Demo nội bộ phase vừa làm.
- Cập nhật checklist ở Mục 10.

## 13. Trạng thái thực thi hiện tại (cập nhật thủ công)

Ngày baseline: `2026-04-17`

Trạng thái:
- [x] Master plan đã tạo.
- [ ] Bắt đầu Phase 0.
- [ ] Hoàn tất Phase 0.
- [ ] Hoàn tất toàn bộ Phase 1 -> Phase 9.

Nhịp thực thi đề xuất:
1. Hoàn tất Phase 0 + Phase 1 trước.
2. Chốt demo kỹ thuật chạy được end-to-end tối thiểu.
3. Mới mở rộng Risk/Legal/Pitch pack theo Phase 2 -> 9.
