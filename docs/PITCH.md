# SF12 - MicroBiz Loan

**SF12** connects digital economy sellers in Vietnam with working capital using AI-powered alternative credit scoring.

## Problem

Online sellers, freelancers, and gig workers are invisible to traditional credit systems. They have no CIC history, no payslips, no tax declarations. When a TikTok Shop seller needs 10M VND to restock before a Mega Sale, banks say "no" because there's no paper trail.

## Solution

SF12 is a "Mini-CFO" for digital economy sellers:

**AI Alternative Credit Scoring** — No CIC needed. Qwen AI analyzes 6 months of e-commerce cash flow (Shopee, Lazada, TikTok Shop) and e-wallet data (MoMo, ZaloPay) to produce a 300-850 credit score with explainable reason codes.

**Revenue-Based Repayment** — Borrowers repay as a % of daily revenue instead of fixed installments. On slow days, the deduction auto-adjusts down to preserve working capital. On Mega Sale days, it increases to help them pay off early.

**Smart Insights** — AI detects demand peaks from historical patterns and alerts sellers: "Your 200-unit stock will run out in 3 days. Trend is +40% this week. Disburse 15M now to capture the surge."

**Credit Gamification** — Transparent level-up progression. Sellers see exactly what to do to unlock higher limits: maintain refund rate <3%, keep API connected, grow revenue 15% month-over-month.

**Admin Risk Dashboard** — Portfolio-level view for Shinhan: real-time NPL tracking, credit score distribution, and anomaly detection.

## Tech Stack

| Layer | Technology |
|-------|------------|
| AI Engine | Qwen Plus via DashScope API |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Credit Engine | AI-first scoring + rule-based fallback (6 weighted factors) |
| Frontend | React 19 + Vite + Tailwind CSS + Recharts |
| Data | 50 sellers, 8 months, 500+ cashflow records |

## Scoring Factors

| Factor | Weight |
|--------|--------|
| Revenue consistency | 25% |
| Transaction volume trend | 20% |
| Return/refund rate | 15% |
| Platform diversity | 15% |
| Growth trajectory | 15% |
| Account activity | 10% |

## Key Features

- **Dual-mode scoring**: Qwen AI first, rule-based fallback with 6 weighted factors
- **Explainable AI**: Every credit decision includes reason codes and weighted factor breakdowns
- **Revenue-based repayment simulator**: Visual comparison of fixed vs dynamic payment plans
- **Animated scoring visualization**: 6-step sequential analysis with progress bars
- **Vietnamese-localized UI**: All labels and platform names in Vietnamese

## Challenges Solved

- **Structured JSON reliability** from LLM — Solved with explicit output format requirements and robust rule-based fallback
- **Scoring factor weighting** — Balanced 6 factors to produce realistic 300-850 scores with iterative calibration
- **Revenue-based repayment math** — Built month-by-month projection showing compounding effect of dynamic deductions
- **Demo data realism** — Multi-stage generator with configurable seeds for believable cash flow patterns

## What We Learned

- AI for credit scoring is viable but needs guardrails — LLMs analyze cash flow patterns effectively, but rule-based fallback is essential for production reliability
- Revenue-based financing aligns incentives — When repayment scales with revenue, borrowers don't get crushed during dry spells, and lenders get paid faster during boom periods
- Explainability beats raw accuracy — A 720 score with reason codes is more actionable than a 720 score with no explanation
- Data quality determines everything — Realistic cash flow patterns (seasonality, growth curves, platform quirks) are essential for meaningful scoring

## NPL Target: <5%

Achieved through conservative scoring, dynamic deduction caps, and real-time portfolio monitoring.
