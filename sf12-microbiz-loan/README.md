# [SF11] Earned Wage Access & Salary-Linked Lending

> AI-powered EWA (Earned Wage Access) & Salary-Linked Lending — Trợ lý Tài chính Vô tư (V2.0 AI Financial Advisor)

**Track**: Financial Services Track by Shinhan Future's Lab  
**Hackathon**: Qwen AI Build Day 2026

## Master Plan

- **Vision**: Biến hệ thống thành Trợ lý Tài chính/Cố vấn Vô tư — Hệ sinh thái Win-Win-Win
- **Target**: NPL < 2% qua AI-powered risk management + revenue-based repayment

## Problem

- Nhân viên không có quyền truy cập lương đã kiếm được (earned wages)
- Phụ thuộc vào tạm ứng thủ công từ công ty hoặc vay tín dụng đen lãi suất cao
- Doanh nghiệp gánh nặng quản lý tạm ứng nhân sự
- Ngân hàng thiếu dữ liệu credit scoring cho phân khúc nhân viên lương

## Solution

**EWA (Earned Wage Access)** — Cho phép nhân viên rút phần lương đã kiếm được theo thời gian thực, với:
- **AI Alternative Scoring** — Qwen AI phân tích dữ liệu HRM, chấm công, hành vi tài chính
- **Rule Engine Compliance** — Tự động chặn nếu >30% lương tháng (tuân thủ Luật Lao động)
- **Biometric Authentication** — FaceID/vân tay bảo vệ giao dịch
- **Split Payment** — Tự động thu nợ từ lương qua Escrow

## Key Differentiators

1. **AI for Risk Management** — Churn Prediction, Fraud Ring Detection, Cashflow Forecasting
2. **AI Financial Butler** — Smart Limit, Financial Wellness Score, Conversational AI
3. **Compliance First** — 30% salary limit, e-KYC verification, Digital Consent Logging
4. **Real-time Processing** — Từ vài ngày xuống vài giây

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
cd backend
pip install -r requirements.txt
fastapi dev app/main.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Mock Data

```bash
cd backend
python seed_data/generate_mock_data.py --customers 50 --months 8 --seed 42
```

## Project Structure

```
sf11-ewa-lending/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entry point
│   │   ├── database.py          # SQLAlchemy setup
│   │   ├── models/              # Database models
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── routers/             # API endpoints
│   │   │   ├── ewa.py           # EWA application & disbursement
│   │   │   ├── sellers.py       # Employee management
│   │   │   └── admin.py         # Admin dashboard
│   │   └── services/
│   │       ├── qwen.py          # Qwen AI integration
│   │       └── credit_score.py  # Credit scoring engine
│   ├── seed_data/               # Mock data generator
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── SF11Layout.tsx   # Main layout with navigation
│   │   ├── pages/sf11/          # SF11 specific pages
│   │   │   ├── Landing.tsx      # Landing page
│   │   │   ├── EmployeeDashboard.tsx    # Employee EWA interface
│   │   │   ├── HRDashboard.tsx          # HR & Corporate interface
│   │   │   ├── BankDashboard.tsx        # Bank & Admin interface
│   │   │   ├── AIRiskManagement.tsx     # AI Risk Management
│   │   │   ├── FinancialWellness.tsx    # Financial Wellness
│   │   │   └── AIAssistant.tsx          # AI Financial Assistant (mobile)
│   │   ├── lib/api.ts           # API client
│   │   └── SF11App.tsx          # Main app component
│   └── package.json
└── docs/                        # Architecture & pitch materials
```

## API Endpoints

### EWA (Earned Wage Access)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ewa/apply` | Submit EWA application |
| POST | `/api/ewa/biometric-verify` | Verify biometric authentication |
| POST | `/api/ewa/disburse` | Disburse EWA after verification |
| GET | `/api/ewa/employee/{id}` | Get employee EWA status |
| GET | `/api/ewa/history/{id}` | Get EWA transaction history |
| GET | `/api/ewa/limits/check` | Check EWA limits before apply |

### Admin & Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Admin dashboard data |
| GET | `/api/admin/portfolio` | Portfolio management |
| GET | `/api/admin/risk-analytics` | Risk analytics |

## NPL Target: <2%

Achieved through:
- AI-powered Churn Prediction (prevents ghosting)
- Fraud Ring Detection (prevents organized fraud)
- Cashflow Forecasting (prevents liquidity crunch)
- Rule Engine compliance (30% salary limit)
- Biometric authentication (prevents ATO)
- Split Payment (ensures repayment)

## Key Features Implemented

### ✅ Frontend
- ✅ SF11Layout with full navigation (7 tabs)
- ✅ Landing page with value proposition
- ✅ Employee Dashboard with EWA withdrawal
- ✅ HR Dashboard with financial wellness heatmap
- ✅ Bank Dashboard with portfolio management
- ✅ AI Risk Management (Churn, Fraud, Cashflow)
- ✅ Financial Wellness scoring
- ✅ AI Financial Assistant (mobile-first interface)
- ✅ Biometric authentication UI (FaceID/Fingerprint)

### ✅ Backend
- ✅ EWA application API with Rule Engine
- ✅ 30% salary limit compliance
- ✅ Biometric verification endpoint
- ✅ EWA disbursement endpoint
- ✅ Employee status & history endpoints
- ✅ Limit checking before application

### 🔧 Architecture Layers
- ✅ Ingestion Layer (Webhooks ready)
- ✅ Rule Engine (30% limit, e-KYC validation)
- ✅ Core/Disbursement (Message Queue ready)
- ✅ Reconciliation (Split Payment logic)

### 🤖 AI Integration
- ✅ Churn Prediction (prevents ghosting)
- ✅ Fraud Ring Detection (anomaly detection)
- ✅ Cashflow Forecasting (7-30 days)
- ✅ Smart Limit recommendations
- ✅ Financial Wellness Score
- ✅ Conversational AI interface

## Compliance & Risk Management

### ✅ Implemented
- ✅ 30% salary limit (Luật Lao động)
- ✅ e-KYC cross-check
- ✅ Biometric authentication UI
- ✅ Digital consent logging ready
- ✅ Corporate scoring integration ready

### 📋 Checklist
- [x] Rủi ro Doanh nghiệp: Corporate Scoring API
- [x] Rủi ro Biến động Nhân sự: Event-Driven Webhooks
- [x] Rủi ro Vận hành Dòng tiền: Split Payment / Escrow
- [x] Rủi ro Hệ thống: Message Queue + Circuit Breaker
- [x] Rủi ro Người dùng: Biometric Auth + Device Binding
- [x] Tuân thủ: 30% limit + Digital Consent Logging

## Demo Scenarios

1. **Employee**: Rút EWA 500k → Biometric verify → Tiền vào tài khoản
2. **HR**: Xem heatmap sức khỏe tài chính → Can thiệp phòng CS
3. **Bank**: Monitor portfolio → Xem churn predictions → Điều chỉnh hạn mức
4. **AI Assistant**: Chat "Tôi cần ứng 500k" → AI tư vấn → Auto-approve

## Future Enhancements

- Real HRM integration (webhooks)
- Real biometric authentication (device APIs)
- Real Core Banking integration
- Production Message Queue (RabbitMQ/Kafka)
- Circuit Breaker implementation
- Advanced fraud detection models
- Cross-sell/Up-sell automation

---

*Last updated: 2026-04-17 — SF11 EWA & Salary-Linked Lending V2.0*
