# Pitch Outline — [SF12] MicroBiz Loan

## 1. Problem (30 seconds)

- Việt Nam có **~200,000 active online sellers** trên Shopee/Lazada/TikTok Shop
- + **~4 triệu gig workers** (Grab, Gojek, freelancer)
- **Hầu hết KHÔNG có CIC history** → không vay được từ ngân hàng/tài chính
- Shinhan Finance đang bỏ lỡ tệp khách hàng khổng lồ này

## 2. Solution (60 seconds)

**MicroBiz Loan** — AI-powered micro lending cho digital economy sellers

- **Alternative Credit Scoring**: Phân tích cash flow từ e-commerce + e-wallet bằng Qwen AI
- **Revenue-Based Repayment**: Trả nợ theo % doanh thu → giảm NPL risk
- **Loan Range**: 5–50M VND, phù hợp nhu cầu vốn lưu động

### How AI Scoring Works
- 6 weighted factors → credit score 300-850
- No CIC dependency → mở rộng tệp khách hàng
- Qwen AI phân tích 6 tháng cash flow data

### How Revenue-Based Repayment Works
- Good month → pay more, Slow month → pay less
- NPL target <5% (vs industry avg 8-12%)

## 3. Demo (120 seconds)

1. **Seller onboarding** → connect shop
2. **AI Scoring** → show real-time credit score calculation
3. **Loan application** → instant approval
4. **Repayment simulation** → revenue-based vs fixed comparison

## 4. Business Case (30 seconds)

- **Market size**: 200K+ sellers × 4M gig workers
- **Revenue model**: Interest rate 18-24%/year + service fee
- **NPL target**: <5% via AI scoring + flexible repayment
- **Differentiator**: Revenue-based repayment, no competitor offers this in VN

## 5. Technical Stack (30 seconds)

- **Qwen AI**: Alternative credit scoring engine
- **Alibaba Cloud**: ECS hosting + OSS storage
- **FastAPI + React**: Modern, fast development
- **Mock data**: Shopee/Lazada/MoMo cash flow patterns

## 6. Ask (15 seconds)

- PoC funding từ Shinhan InnoBoost 2026
- API partnership với Shopee/MoMo
- Pilot program với 100 sellers

---

## Key Messages

1. "Chúng tôi giải quyết vấn đề credit access cho digital economy workers"
2. "AI scoring không cần CIC — dùng cash flow data thật"
3. "Revenue-based repayment giảm NPL risk cho Shinhan Finance"
4. "Demo hoạt động ngay — không chỉ là concept"

## Judge Q&A Prep

**Q: How is this different from Shopee SPayLater?**
A: SPayLater là BNPL (buy now pay later), chỉ dùng trên Shopee. Chúng tôi là micro loan linh hoạt, multi-platform, với revenue-based repayment.

**Q: How do you verify cash flow data?**
A: Phase 1: API integration với Shopee/Lazada/MoMo. Phase 2: Bank statement OCR với Qwen AI.

**Q: What if seller inflates revenue?**
A: AI detects anomalies — cross-platform validation, transaction pattern analysis, return rate analysis.

**Q: How do you ensure <5% NPL?**
A: 3 layers: (1) AI scoring filter high-risk, (2) Revenue-based repayment auto-adjusts, (3) Conservative loan limits.
