# SF12 - MicroBiz Loan

**Live Demo:** https://sf12-microbiz-loan.vercel.app

**SF12** connects digital economy sellers in Vietnam with working capital using AI-powered alternative credit scoring.

## Problem

Online sellers, freelancers, and gig workers are invisible to traditional credit systems. They have no CIC history, no payslips, no tax declarations. When a TikTok Shop seller needs 10M VND to restock before a Mega Sale, banks say "no" because there's no paper trail.

## Solution

SF12 is a "Mini-CFO" for digital economy sellers: AI-powered credit scoring without CIC, revenue-based repayment, and smart business insights.

## Menu Structure

```
┌─────────────────────────────────────────────────────┐
│ Seller:  [Tổng quan] [Sellers] [AI Scoring]  │  [Admin] │
└─────────────────────────────────────────────────────┘
```

---

## Seller Portal

### Features

**AI Alternative Credit Scoring** — No CIC needed. Qwen3-Max analyzes 6 months of e-commerce cash flow (Shopee, Lazada, TikTok Shop) and e-wallet data (MoMo, ZaloPay) to produce a 300-850 credit score with explainable reason codes.

**Smart Insights** — AI detects demand peaks: "Your 200-unit stock will run out in 3 days. Trend is +40% this week. Disburse 15M now to capture the surge."

**Credit Gamification (Level-Up Map)** — Transparent level-up progression:
- 🥉 Bronze (300-449) → 🥈 Silver (450-599) → 🥇 Gold (600-749) → 💎 Platinum (750-849) → 👑 Diamond (850)

Requirements to level up: refund rate <3%, keep API connected, grow revenue 15%/month.

**Revenue-Based Repayment** — Borrowers repay as a % of daily revenue instead of fixed installments.

### Seller Screens

| Route | Description |
|-------|-------------|
| `/` | Landing page + overview |
| `/seller` | Seller list |
| `/seller/:id` | Seller detail + Level-Up Map |
| `/scoring` | AI Scoring demo with animated 6-step analysis |

---

## Admin Portal

### Features

**Portfolio Dashboard** — Real-time NPL tracking, total disbursed, active loans, overdue metrics.

**Risk Analytics** — Credit score distribution, delinquency by segment, risk tier classification.

**NPL Target: <5%** — Achieved through conservative scoring, dynamic deduction caps, and real-time monitoring.

### Admin Screens

| Route | Description |
|-------|-------------|
| `/admin` | Portfolio dashboard + risk analytics |

---

## AI Scoring (Qwen3-Max)

### Scoring Factors (6 weighted factors)

| Factor | Weight |
|--------|--------|
| Revenue consistency | 25% |
| Transaction volume trend | 20% |
| Return/refund rate | 15% |
| Platform diversity | 15% |
| Growth trajectory | 15% |
| Account activity | 10% |

### AI Features

- **Dual-mode scoring**: Qwen3-Max first, rule-based fallback with same 6 weighted factors
- **Explainable AI**: Every credit decision includes reason codes and weighted factor breakdowns
- **Smart Insights**: Demand peak detection, stockout warnings, business improvement tips

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| AI Engine | Qwen3-Max via DashScope API (OpenAI-compatible) |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Frontend | React 19 + Vite + Tailwind CSS + Recharts |
| Data | 50 sellers, 8 months, 500+ cashflow records |

---

## API Endpoints

### Backend: `POST /api/loans/score/{seller_id}`

```json
Request:
{ "seller_id": "SLR0001" }

Response:
{
  "seller_id": "SLR0001",
  "score": 728,
  "risk_level": "low",
  "recommendation": "approve",
  "loan_limit": 125000000,
  "max_tenure_months": 12,
  "factors": [...],
  "reason_codes": [...],
  "scoring_breakdown": {...},
  "flow_analysis": {...}
}
```

### Backend: `GET /api/loans/insights/{seller_id}`

```json
Response:
{
  "demand_peak_alert": true,
  "demand_peak_message": "Your revenue has grown by 63.3%...",
  "stockout_risk": true,
  "stockout_days_estimate": 5,
  "recommended_disbursement": 15000000,
  "surge_percentage": 63.3,
  "business_tips": [...]
}
```

### Full API List

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sellers` | List sellers |
| GET | `/api/sellers/{id}` | Seller details |
| GET | `/api/sellers/{id}/cashflow` | Cashflow data |
| POST | `/api/loans/apply` | Apply for loan |
| POST | `/api/loans/score/{id}` | AI credit scoring |
| GET | `/api/loans/insights/{id}` | Smart business insights |
| GET | `/api/loans/repayment-simulator` | Repayment simulation |
| GET | `/api/admin/dashboard` | Portfolio dashboard |
| GET | `/api/admin/portfolio` | Loan portfolio |
| GET | `/api/admin/risk-analytics` | Risk analytics |

---

## Environment Variables

### Backend (.env)

| Variable | Purpose | Default |
|----------|---------|---------|
| `QWEN_API_KEY` | Qwen3-Max API key (required) | - |
| `CORS_ORIGINS` | Frontend origins | `http://localhost:5173` |
| `DEMO_REBUILD_SCHEMA_ON_STARTUP` | Recreate schema | `false` |
| `DEMO_RESET_ON_STARTUP` | Reload seed data | `false` |

### Qwen API Setup

1. Get API key from [Alibaba Cloud Model Studio](https://www.aliyun.com/product/modelstudio)
2. Model: **qwen3-max**
3. Endpoint: `https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions`

---

## Quick Start

```bash
# Backend
cd backend
pip install -r requirements.txt
export QWEN_API_KEY=your_key_here
fastapi dev app/main.py

# Frontend (另一 terminal)
cd frontend
npm install
npm run dev
```

## Challenges Solved

- **Structured JSON reliability** from LLM — Explicit output format + robust fallback
- **Scoring factor weighting** — Balanced 6 factors for realistic 300-850 scores
- **Revenue-based repayment math** — Month-by-month projection with dynamic deductions
- **Demo data realism** — Multi-stage generator with configurable seeds

## What We Learned

- AI for credit scoring is viable but needs guardrails — LLMs analyze cash flow patterns effectively, but rule-based fallback is essential
- Revenue-based financing aligns incentives — When repayment scales with revenue, borrowers don't get crushed during dry spells
- Explainability beats raw accuracy — A 720 score with reason codes is more actionable than a 720 score with no explanation
