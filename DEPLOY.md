# SF12 MicroBiz Loan - Deployment Guide

## Quick Deploy

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

### Backend (Local/Cloud)

```bash
cd backend
pip install -r requirements.txt
QWEN_API_KEY=your_key_here fastapi dev app/main.py
```

## Environment Variables

### Backend (.env)
```
QWEN_API_KEY=sk-your-qwen-api-key-here
CORS_ORIGINS=http://localhost:5173,https://your-vercel-url.vercel.app
DEMO_REBUILD_SCHEMA_ON_STARTUP=false
DEMO_RESET_ON_STARTUP=false
```

### Frontend (.env.local)
```
VITE_API_URL=https://your-backend-url.com
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| AI Engine | Qwen3-Max via DashScope API |
| Backend | FastAPI + SQLAlchemy + SQLite |
| Frontend | React 19 + Vite + Tailwind CSS |
| Charts | Recharts |

## API Endpoints

### Backend (port 8000)
```
GET  /api/sellers              - List sellers
GET  /api/sellers/{id}         - Seller details
GET  /api/sellers/{id}/cashflow - Cashflow data
POST /api/loans/apply          - Apply for loan
POST /api/loans/score/{id}     - AI credit scoring (Qwen3-Max)
GET  /api/loans/insights/{id}  - Smart business insights
GET  /api/loans/repayment-simulator - Repayment simulation
GET  /api/admin/dashboard      - Portfolio dashboard
GET  /api/admin/portfolio      - Loan portfolio
GET  /api/admin/risk-analytics - Risk analytics
```

### Frontend Routes
```
/           - Landing page
/seller     - Seller dashboard
/seller/:id - Seller detail with Level-Up Map
/scoring    - AI Scoring demo
/admin      - Admin portfolio dashboard
```

## Key Features

1. **AI Scoring** - Qwen3-Max analyzes 6-month cashflow
2. **Smart Insights** - Demand peak detection, stockout warnings
3. **Revenue-Based Repayment** - Pay % of actual revenue
4. **Level-Up Map** - Bronze → Silver → Gold → Platinum → Diamond
5. **Admin Dashboard** - NPL tracking, portfolio risk

## Scoring Factors (6 weighted factors)

| Factor | Weight |
|--------|--------|
| Revenue consistency | 25% |
| Transaction volume trend | 20% |
| Return/refund rate | 15% |
| Platform diversity | 15% |
| Growth trajectory | 15% |
| Account activity | 10% |

## AI Fallback

If Qwen API fails → Rule-based scoring activates automatically with same weights.

## Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
QWEN_API_KEY=your_key fastapi dev app/main.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## Build Frontend

```bash
cd frontend
npm install
npm run build
```

Output: `frontend/dist`

## Notes

- Backend uses SQLite database (auto-created on first run)
- Seed data loaded automatically if `DEMO_RESET_ON_STARTUP=true`
- CORS configured for localhost:5173 and Vercel domains
- API proxy configured in vite.config.ts for dev
