# SF12 - MicroBiz Loan

> AI-powered micro lending platform cho digital economy sellers Việt Nam

## Tính năng chính

- **AI Alternative Credit Scoring** - Không cần CIC, dùng Qwen AI phân tích cashflow patterns
- **Revenue-Based Repayment** - Thanh toán theo % doanh thu, giảm NPL risk (target <5%)
- **Admin Dashboard** - Portfolio monitoring, NPL tracking, risk analytics

## Tech Stack

| Layer | Technology |
|-------|-----------|
| AI Engine | Qwen Plus via DashScope API |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Frontend | React 19 + Vite + Tailwind CSS |

## Quick Start

```bash
# Backend
cd sf12-microbiz-loan/backend
pip install -r requirements.txt
fastapi dev app/main.py

# Frontend (另一 terminal)
cd sf12-microbiz-loan/frontend
npm install
npm run dev
```

## API Endpoints

### Sellers
- `GET /api/sellers` - Danh sách sellers
- `GET /api/sellers/{id}` - Chi tiết seller
- `GET /api/sellers/{id}/cashflow` - Cashflow data

### Loans
- `POST /api/loans/apply` - Nộp đơn vay
- `POST /api/loans/score/{seller_id}` - AI scoring
- `GET /api/loans/repayment-simulator` - Mô phỏng thanh toán

### Admin
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/portfolio` - Portfolio metrics
- `GET /api/admin/risk-analytics` - Risk analytics

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DASHSCOPE_API_KEY` | Qwen API key |
| `CORS_ORIGINS` | Frontend origins |
| `DEMO_REBUILD_SCHEMA_ON_STARTUP` | Recreate schema (`true/false`) |
| `DEMO_RESET_ON_STARTUP` | Reload seed data (`true/false`) |

## Screens

- `/` - Landing page
- `/seller` - Seller dashboard
- `/scoring` - AI scoring demo
- `/mobile` - Mobile seller experience
- `/admin` - Portfolio & risk dashboard
