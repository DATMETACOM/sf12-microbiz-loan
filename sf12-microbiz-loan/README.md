# [SF12] MicroBiz Loan for Digital Economy Sellers

> AI-powered micro loan product (5–50M VND) for online sellers, freelancers & gig workers

**Track**: Financial Services Track by Shinhan Future's Lab  
**Hackathon**: Qwen AI Build Day 2026

## Master Plan (Code + Pitch)

- Single source of truth: [docs/BUILD-AND-PITCH-MASTER-PLAN.md](docs/BUILD-AND-PITCH-MASTER-PLAN.md)
- Dung tai lieu nay de di theo phase tu Phase 0 den Phase 9.
- Moi phase co: muc tieu, dau ra code, dau ra pitch, tieu chi pass.

## Problem

- Online sellers, freelancers, gig workers **không có CIC history** hoặc chứng minh thu nhập truyền thống
- Không tiếp cận được vốn vay từ tổ chức tài chính chính quy
- Shinhan Finance muốn mở rộng tệp khách hàng mới nhưng thiếu credit data

## Solution

**Alternative credit scoring** dựa trên:
- E-commerce cash flow (Shopee, Lazada, TikTok Shop)
- E-wallet transaction data (MoMo, ZaloPay, VNPay)

**Revenue-based repayment** — trả nợ theo % doanh thu thay vì fixed installment

## Key Differentiators

1. **AI Alternative Scoring** — không cần CIC, dùng Qwen AI phân tích cash flow patterns
2. **Revenue-Based Repayment** — giảm áp lực tài chính, giảm NPL risk (target <5%)
3. **New Customer Segment** — mở rộng thị trường cho digital economy workers

## Tech Stack

| Layer | Technology |
|-------|-----------|
| AI Engine | Qwen Plus (via DashScope API) |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Frontend | React 19 + Vite + Tailwind CSS |
| Cloud | Alibaba Cloud ECS + OSS |

## Quick Start

### Backend

```bash
cd sf12-microbiz-loan/backend
pip install -r requirements.txt
fastapi dev app/main.py
```

### Frontend

```bash
cd sf12-microbiz-loan/frontend
npm install
npm run dev
```

### Mock Data

```bash
cd sf12-microbiz-loan/backend
python seed_data/generate_mock_data.py --customers 50 --months 8 --seed 42
```

Dataset se duoc tao vao:
- `seed_data/sellers.json`
- `seed_data/cashflows.json`
- `seed_data/loans.json`
- `seed_data/repayments.json`

De force reset va nap lai seed data khi backend startup:

```bash
$env:DEMO_REBUILD_SCHEMA_ON_STARTUP="true"
$env:DEMO_RESET_ON_STARTUP="true"
fastapi dev app/main.py
```

## Project Structure

```
sf12-microbiz-loan/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── database.py          # SQLAlchemy setup
│   │   ├── models/              # Database models
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── routers/             # API endpoints
│   │   │   ├── loans.py         # Loan application & scoring
│   │   │   ├── sellers.py       # Seller management
│   │   │   └── admin.py         # Admin dashboard
│   │   └── services/
│   │       ├── qwen.py          # Qwen AI integration
│   │       └── credit_score.py  # Credit scoring engine
│   ├── seed_data/               # Mock data generator
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/Layout.tsx
│   │   ├── pages/
│   │   │   ├── seller/          # Seller dashboard
│   │   │   ├── admin/           # Admin dashboard
│   │   │   └── scoring/         # AI scoring visualization
│   │   ├── lib/api.ts           # API client
│   │   └── App.tsx
│   └── package.json
└── docs/                        # Architecture & pitch materials
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sellers` | List all sellers |
| GET | `/api/sellers/{id}` | Get seller details |
| GET | `/api/sellers/{id}/cashflow` | Get seller cash flow data |
| POST | `/api/loans/apply` | Submit loan application |
| POST | `/api/loans/score/{seller_id}` | Run AI credit scoring |
| GET | `/api/loans/repayment-simulator` | Simulate revenue-based repayment |
| GET | `/api/admin/dashboard` | Admin dashboard data |
| GET | `/api/admin/risk-analytics` | Risk analytics |

## NPL Target: <5%

Achieved through:
- AI-powered scoring with 6 weighted factors
- Revenue-based repayment (flexible, not fixed)
- Conservative loan limits based on cash flow analysis
- Real-time monitoring via admin dashboard
