# Architecture — [SF12] MicroBiz Loan

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Seller   │  │  Admin   │  │  AI Scoring          │  │
│  │Dashboard  │  │Dashboard │  │  Visualization       │  │
│  └─────┬────┘  └─────┬────┘  └──────────┬───────────┘  │
│        └──────────────┼──────────────────┘              │
│                       │ REST API                         │
└───────────────────────┼─────────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────────┐
│                Backend (FastAPI)                         │
│                       │                                  │
│  ┌──────────┐  ┌──────┴──────┐  ┌──────────────────┐   │
│  │ Routers   │  │  Services   │  │  Qwen AI Engine  │   │
│  │ /loans    │←→│ credit_score│←→│  (DashScope API) │   │
│  │ /sellers  │  │ repayment   │  │  qwen-plus model │   │
│  │ /admin    │  └──────┬──────┘  └──────────────────┘   │
│  └──────┬────┘         │                                  │
│         │        ┌─────┴──────┐                          │
│         │        │  SQLite DB  │                          │
│         │        │  (ORM:      │                          │
│         │        │ SQLAlchemy) │                          │
│         │        └────────────┘                          │
└─────────┼────────────────────────────────────────────────┘
          │
    ┌─────┴──────┐
    │ Mock Data   │
    │ E-commerce  │
    │ E-wallet    │
    └────────────┘
```

## AI Credit Scoring Flow

```
Seller applies for loan
        │
        ▼
Fetch cash flow data (e-commerce + e-wallet)
        │
        ▼
┌─────────────────────────────────┐
│     Qwen AI Scoring Engine      │
│                                 │
│  Input: 6 months cash flow      │
│  + seller profile data          │
│                                 │
│  Scoring Factors (weighted):    │
│  1. Revenue consistency  (25%)  │
│  2. Transaction volume   (20%)  │
│  3. Return/refund rate   (15%)  │
│  4. Platform diversity   (15%)  │
│  5. Growth trajectory    (15%)  │
│  6. Account age/activity  (10%) │
│                                 │
│  Output:                        │
│  - Credit score (300-850)       │
│  - Risk level                   │
│  - Loan limit recommendation    │
│  - Revenue share %              │
└─────────────────────────────────┘
        │
        ▼
Loan decision: Approve / Review / Reject
        │
        ▼
Revenue-based repayment schedule generated
```

## Revenue-Based Repayment Model

```
Traditional Loan:
  Monthly payment = FIXED amount
  → High risk if seller has bad month

Revenue-Based Loan:
  Monthly payment = Revenue × Share%
  → Auto-adjusts to seller's income
  
  Example:
  Loan: 20M VND, Revenue share: 8%
  
  Good month (30M revenue):  Pay 2.4M
  Average month (20M revenue): Pay 1.6M
  Slow month (10M revenue):  Pay 0.8M
  
  → Lower delinquency, happier customers
```

## Data Sources (Mock for PoC)

| Source | Data | Purpose |
|--------|------|---------|
| Shopee | Monthly revenue, orders, return rate | Revenue consistency scoring |
| Lazada | Monthly revenue, orders, growth rate | Cross-platform validation |
| TikTok Shop | Live stream revenue, order volume | Growth potential |
| MoMo | Wallet balance, transaction count | Cash flow verification |
| ZaloPay | Payment volume, merchant activity | Income stability |
| VNPay | QR payment data, transaction patterns | Business activity |
