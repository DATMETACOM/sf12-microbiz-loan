# Technology Stack

**Project:** [SF12] MicroBiz Loan for Digital Economy Sellers
**Researched:** 2026-04-17
**Context:** Qwen AI Build Day Hackathon — PoC demo for Shinhan Finance Vietnam

---

## Recommended Stack

### AI / Qwen Models (Core Requirement)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **qwen-plus** | Qwen3 series | Primary AI — alternative credit scoring, cash flow analysis, structured output | Best balance of quality, speed, cost. 1M token context window. Free tier: 1M tokens for 90 days. | **HIGH** |
| **qwen-turbo** | Latest | Fast-path AI — simple validation, classification | Cheapest/fastest for simple tasks (e.g., "is this cash flow pattern suspicious?") | **HIGH** |
| **Qwen API (OpenAI-compatible)** | DashScope v1 | API endpoint | `https://dashscope.aliyuncs.com/compatible-mode/v1` — use `openai` Python SDK | **HIGH** |

### Backend Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **FastAPI** | 0.136.0+ | REST API backend | Auto Swagger docs, Pydantic v2, native async, CORS built-in | **HIGH** |
| **SQLAlchemy** | 2.x | ORM | Async support, easy migration to PostgreSQL later | **HIGH** |
| **SQLite** | 3.x | Database | Zero-config, perfect for PoC | **HIGH** |

### Frontend

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **React** | 19.x | UI framework | Component-based, 3 dashboards (Seller, Admin, Scoring) | **HIGH** |
| **Vite** | 6.x | Build tool | Instant HMR, fast builds | **HIGH** |
| **Tailwind CSS** | 4.x | Styling | Utility-first, rapid prototyping | **HIGH** |
| **Recharts** | 2.x | Data visualization | Cash flow charts, credit score gauges | **HIGH** |

### Alibaba Cloud Services

| Service | Purpose | Confidence |
|---------|---------|------------|
| **Model Studio (DashScope)** | Qwen AI inference (required) | **HIGH** |
| **ECS** | Host backend + frontend | **HIGH** |
| **OSS** | Store documents (optional for PoC) | **MEDIUM** |

## Qwen AI Use Cases in SF12

| Use Case | Model | Input | Output |
|----------|-------|-------|--------|
| **Alternative Credit Scoring** | qwen-plus | 6 months cash flow + seller profile | Credit score (300-850), risk level, loan limit |
| **Cash Flow Analysis** | qwen-plus | Transaction patterns | Trend analysis, anomaly detection, stability score |
| **Anomaly Detection** | qwen-turbo | Transaction records | Fraud flag, suspicious patterns |
| **Loan Recommendation** | qwen-plus | Score + risk factors | Approve/Review/Reject with reasoning |

## Scoring Model (6 Factors)

| Factor | Weight | Data Source |
|--------|--------|-------------|
| Revenue consistency | 25% | E-commerce monthly revenue |
| Transaction volume trend | 20% | Order count growth |
| Return/refund rate | 15% | Platform return data |
| Platform diversity | 15% | Multi-platform presence |
| Growth trajectory | 15% | Month-over-month growth |
| Account age & activity | 10% | Registration date, activity |

---

*Sources: Same as SF11 STACK.md — verified from Alibaba Cloud docs, April 2026*
