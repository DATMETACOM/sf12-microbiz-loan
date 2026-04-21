# SF12 - MicroBiz Loan

**Live Demo:** https://sf12-microbiz-loan.vercel.app

**SF12** connects digital economy sellers in Vietnam with working capital using AI-powered alternative credit scoring.

## Problem

Online sellers, freelancers, and gig workers are invisible to traditional credit systems. They have no CIC history, no payslips, no tax declarations. When a TikTok Shop seller needs 10M VND to restock before a Mega Sale, banks say "no" because there's no paper trail.

## Solution

SF12 is a "Mini-CFO" for digital economy sellers:

**AI Alternative Credit Scoring** — No CIC needed. Qwen AI analyzes 6 months of e-commerce cash flow (Shopee, Lazada, TikTok Shop) and e-wallet data (MoMo, ZaloPay) to produce a 300-850 credit score with explainable reason codes.

**Revenue-Based Repayment** — Borrowers repay as a % of daily revenue instead of fixed installments. On slow days, the deduction auto-adjusts down. On Mega Sale days, it increases to help them pay off early.

**Smart Insights** — AI detects demand peaks: "Your 200-unit stock will run out in 3 days. Trend is +40% this week. Disburse 15M now to capture the surge."

**Credit Gamification** — Transparent level-up progression. Sellers see exactly what to unlock higher limits: maintain refund rate <3%, keep API connected, grow revenue 15% month-over-month.

**Admin Risk Dashboard** — Portfolio-level view: real-time NPL tracking, credit score distribution, and anomaly detection.

## Scoring Factors

| Factor | Weight |
|--------|--------|
| Revenue consistency | 25% |
| Transaction volume trend | 20% |
| Return/refund rate | 15% |
| Platform diversity | 15% |
| Growth trajectory | 15% |
| Account activity | 10% |

## Tech Stack

| Layer | Technology |
|-------|------------|
| AI Engine | Qwen3-Max via DashScope API |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Credit Engine | AI-first scoring + rule-based fallback (6 weighted factors) |
| Frontend | React 19 + Vite + Tailwind CSS + Recharts |
| Data | 50 sellers, 8 months, 500+ cashflow records |

## Key Features

- **Dual-mode scoring**: Qwen AI first, rule-based fallback with 6 weighted factors
- **Explainable AI**: Every credit decision includes reason codes and weighted factor breakdowns
- **Revenue-based repayment simulator**: Visual comparison of fixed vs dynamic payment plans
- **Animated scoring visualization**: 6-step sequential analysis with progress bars
- **Vietnamese-localized UI**: All labels and platform names in Vietnamese

## Challenges Solved

- **Structured JSON reliability** from LLM — Explicit output format requirements + robust fallback
- **Scoring factor weighting** — Balanced 6 factors to produce realistic 300-850 scores
- **Revenue-based repayment math** — Month-by-month projection showing dynamic deduction effects
- **Demo data realism** — Multi-stage generator with configurable seeds

## What We Learned

- AI for credit scoring is viable but needs guardrails — LLMs analyze cash flow patterns effectively, but rule-based fallback is essential for production reliability
- Revenue-based financing aligns incentives — When repayment scales with revenue, borrowers don't get crushed during dry spells, and lenders get paid faster during boom periods
- Explainability beats raw accuracy — A 720 score with reason codes is more actionable than a 720 score with no explanation
- Data quality determines everything — Realistic cash flow patterns are essential for meaningful scoring

## NPL Target: <5%

Achieved through conservative scoring, dynamic deduction caps, and real-time portfolio monitoring.

## Quick Start

```bash
# Backend
cd backend
pip install -r requirements.txt
fastapi dev app/main.py

# Frontend (另一 terminal)
cd frontend
npm install
npm run dev
```

## API Endpoints

### Sellers
- `GET /api/sellers` - List sellers
- `GET /api/sellers/{id}` - Seller details
- `GET /api/sellers/{id}/cashflow` - Cashflow data

### Loans
- `POST /api/loans/apply` - Apply for loan
- `POST /api/loans/score/{seller_id}` - AI scoring
- `GET /api/loans/repayment-simulator` - Repayment simulation

### Admin
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/portfolio` - Portfolio metrics
- `GET /api/admin/risk-analytics` - Risk analytics

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `QWEN_API_KEY` | Qwen API key |
| `CORS_ORIGINS` | Frontend origins |
| `DEMO_REBUILD_SCHEMA_ON_STARTUP` | Recreate schema (`true/false`) |
| `DEMO_RESET_ON_STARTUP` | Reload seed data (`true/false`) |

## Screens

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/seller` | Seller dashboard |
| `/scoring` | AI scoring demo |
| `/mobile` | Mobile seller experience |
| `/admin` | Portfolio & risk dashboard |
