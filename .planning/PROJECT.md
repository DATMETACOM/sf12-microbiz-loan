# [SF12] MicroBiz Loan for Digital Economy Sellers

## What This Is

AI-powered micro loan product (5–50M VND) cho **online sellers, freelancers & gig workers** tại Việt Nam — sử dụng alternative credit scoring dựa trên dữ liệu cash flow từ e-commerce (Shopee, Lazada, TikTok Shop) và e-wallet (MoMo, ZaloPay, VNPay). Trả nợ theo % doanh thu thay vì trả góp cố định, giảm áp lực tài chính cho borrower và giảm NPL risk cho lender.

Đây là **PoC Demo cho Qwen AI Build Day Hackathon**, thuộc **Financial Services Track by Shinhan Future's Lab**. Mục tiêu: thuyết phục ban giám khảo về tính khả thi thương mại và khả năng triển khai ngay tại Shinhan Finance.

## Core Value

**Alternative credit scoring từ e-commerce + e-wallet data → giải ngân micro loan paperless trong phút cho nhóm khách hàng ngoài traditional credit profile** — repayment linh hoạt theo % revenue thay vì fixed installment.

## Challenge Description

| Field | Value |
|-------|-------|
| **Code** | [SF12] MicroBiz Loan for Digital Economy Sellers |
| **Product** | AI-powered micro loan (5–50M VND) for online sellers, freelancers & gig workers |
| **Scoring** | Alternative credit scoring based on e-commerce and e-wallet cash flow data |
| **Repayment** | Structured as % of revenue instead of fixed installment |
| **Stakeholders** | Product, Risk, IT, Legal/Compliance, Sales |
| **Status** | Non-disclosed (from Idea Contest) |

## Key Selling Points

1. **New customer segment** — outside traditional credit profiles (no CIC history needed)
2. **AI alternative scoring** — reduces CIC dependency, uses real transaction data
3. **Flexible repayment** — % of revenue instead of fixed installment → lowers delinquency risk
4. **NPL target <5%** — achievable via revenue-based repayment + AI risk assessment

## Shinhan Finance Products Context

### Vay tín chấp cá nhân
- Lãi suất thấp từ 18%/năm
- Hạn mức vay đến 300 triệu VND
- Tùy chọn thanh toán đến 48 tháng

### Thẻ tín dụng "THE FIRST"
- Rút tiền mặt đến 100% hạn mức thẻ
- Miễn lãi suất lên đến 45 ngày
- Trả góp với ưu đãi 0% lãi suất
- 0.5% điểm thưởng tích lũy không giới hạn

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Alternative credit scoring engine using e-commerce cash flow data (Qwen AI)
- [ ] E-wallet transaction analysis for income verification
- [ ] Loan product: 5–50M VND, revenue-based repayment (% of monthly revenue)
- [ ] Seller onboarding flow — connect e-commerce shop + e-wallet
- [ ] AI-powered loan approval/denial with explainable scoring factors
- [ ] Dynamic repayment calculator (revenue-based vs fixed comparison)
- [ ] Seller dashboard — loan status, repayment schedule, revenue tracking
- [ ] Admin dashboard — portfolio management, NPL monitoring, risk analytics
- [ ] Mock e-commerce & e-wallet data integration
- [ ] Business case & market analysis documentation
- [ ] Pitch deck for judges
- [ ] Technical architecture documentation
- [ ] Demo video & screenshots

### Out of Scope

- Real integration with Shopee/Lazada/TikTok Shop APIs — time constraint hackathon
- Real integration with MoMo/ZaloPay/VNPay APIs — time constraint hackathon
- Full KYC/AML compliance workflow — complexity too high for PoC
- Multi-currency support — không cần cho thị trường VN
- Mobile app native — focus web demo trước
- Legal document generation — out of PoC scope

## Context

- **Hackathon**: Qwen AI Build Day — cần showcase được khả năng của Qwen AI + Alibaba Cloud
- **Challenge code**: [SF12] từ Idea Contest
- **Track**: Financial Services Track by Shinhan Future's Lab
- **Target audience**: Ban giám khảo hackathon, stakeholder Shinhan Finance
- **Business pain point**: Online sellers, freelancers, gig workers không có CIC history hoặc chứng minh thu nhập truyền thống → không tiếp cận được vốn vay. Shinhan Finance muốn mở rộng tệp khách hàng này.
- **NPL target**: <5% via revenue-based repayment + AI scoring
- **Stakeholders**: Product, Risk, IT, Legal/Compliance, Sales
- **Shinhan Finance**: Công ty tài chính 100% vốn Hàn Quốc tại VN, focus vào consumer finance
- **Competition**: MoMo ví trả sau, Shopee SPayLater, FE Credit — nhưng chưa có revenue-based repayment model

## Constraints

- **Timeline**: Hackathon deadline 17 Apr 2026 — PoC cần hoàn thành ASAP
- **Tech**: Must use Qwen AI + Alibaba Cloud services (yêu cầu cuộc thi)
- **Scope**: PoC/Demo quality, không cần production-ready
- **Language**: Vietnamese UI/UX cho end users, English cho technical docs
- **Budget**: Free tier Alibaba Cloud cho hackathon
- **Data**: Mock data cho demo (không dùng dữ liệu thật)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Qwen AI cho alternative credit scoring | Yêu cầu bắt buộc của hackathon + khả năng AI phân tích cash flow pattern | — Pending |
| Revenue-based repayment (% of revenue) | Điểm khác biệt chính vs competitor + giảm NPL risk | — Pending |
| Mock e-commerce & e-wallet data | Time constraint — không thể integrate hệ thống thật trong hackathon | — Pending |
| Web-based demo | Nhanh hơn mobile app, phù hợp cho pitch | — Pending |
| FastAPI backend + React/Vite frontend | Tận dụng stack từ SF11, team đã quen | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-17 — initialized from Idea Contest [SF12]*
