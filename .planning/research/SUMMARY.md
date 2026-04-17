# Project Research Summary

**Project:** [SF11] Earned Wage Access & Salary-Linked Lending PoC
**Domain:** Fintech — EWA & salary-linked consumer lending (Shinhan Finance Vietnam)
**Researched:** 2026-04-17
**Confidence:** HIGH

## Executive Summary

This is a hackathon PoC for Shinhan Finance Vietnam, building an Earned Wage Access (EWA) and salary-linked lending platform powered by Qwen AI on Alibaba Cloud. The product has two distinct offerings — EWA (early access to earned wages, not a loan) and salary-linked unsecured lending (vay tín chấp, up to 300M VND) — both repaid via automatic payroll deduction. The critical differentiator is Qwen AI automating salary data extraction from HRM/payslip documents and generating explainable credit scores for thin-file Vietnamese workers who lack traditional credit bureau data.

The recommended approach is a **modular monolith** backend (FastAPI/Python) with a **React SPA** frontend (Vite + Tailwind + shadcn/ui), using **SQLite** for persistence and **Qwen models** (qwen-plus for complex tasks, qwen-turbo for simple ones) via the OpenAI-compatible DashScope API. Everything HRM/payroll-related should be **hard-mocked** — the mock boundary is sacred. The build should follow a strict dependency chain: foundation → EWA flow (simpler, validates patterns) → loan flow (more complex, reuses patterns) → admin dashboards → polish & demo.

The key risks are: (1) conflating EWA and loan as the same product — they have fundamentally different regulatory and UX profiles; (2) using Qwen LLM for numerical credit scoring instead of its genuine strength in document understanding and data extraction; (3) spending too much time on HRM integration at the expense of polish; and (4) failing to demonstrate the auto-debit repayment mechanism that underpins the entire NPL <2% business case. The hackathon is won on **polished demo flow** and **compelling business pitch**, not feature count.

## Key Findings

### Recommended Stack

The stack prioritizes hackathon speed, Qwen AI integration quality, and demo impressiveness. Python backend (FastAPI) pairs natively with the `openai` SDK for Qwen's OpenAI-compatible API. React + shadcn/ui delivers professional-looking multi-role dashboards fast. SQLite eliminates database setup entirely.

**Core technologies:**
- **qwen-plus** (via DashScope OpenAI-compatible API): Primary AI for salary extraction, credit scoring reasoning, structured JSON output — 1M token context, best quality/cost balance for hackathon
- **FastAPI** (Python 3.12+): REST API backend with auto-generated Swagger UI — critical for interactive demo; Pydantic v2 models map directly to Qwen's structured output
- **React 19 + Vite 6 + Tailwind 4 + shadcn/ui**: Frontend — component-based architecture suits three distinct dashboards; shadcn/ui gives instant professional look
- **SQLite + SQLAlchemy 2.x**: Zero-config persistence; SQLAlchemy abstraction allows trivial PostgreSQL migration later
- **Alibaba Cloud ECS + OSS + Model Studio**: Hosting, document storage, AI inference — satisfies hackathon requirement to showcase Alibaba Cloud ecosystem

### Expected Features

The feature set is split across three user roles: Employee (mobile-first, Vietnamese UI), HR Admin (enterprise dashboard), and Shinhan Admin (portfolio/risk dashboard). The hero feature for hackathon judges is AI-powered salary data extraction from payslip documents.

**Must have (table stakes):**
- AI salary data extraction from payslips/HRM — Qwen processes Vietnamese payslip and returns structured salary data (hero feature)
- EWA withdrawal flow — employee views earned balance, requests withdrawal, sees confirmation with auto-debit deduction
- Salary-linked loan application — employee applies, sees AI credit score with explanation, receives loan offer
- Auto-debit demonstration — show payroll deduction report with EWA advances + loan installments (the NPL <2% argument)
- Vietnamese language UI — all employee-facing screens in Vietnamese; VND formatting, DD/MM/YYYY dates, family-name-first

**Should have (competitive):**
- HR admin dashboard — enterprise partner view: employee roster, utilization, deduction reports
- Shinhan admin portfolio dashboard — NPL metrics, portfolio health, business KPIs
- AI credit score explanation — natural language breakdown of scoring factors (shows "AI thinking" to judges)
- Loan EMI calculator — interactive sliders for amount + tenure → monthly payment
- Business case / ROI visualization — charts comparing salary-linked vs traditional lending

**Defer (post-hackathon):**
- Real HRM/Payroll integration, real payment gateway, KYC/AML workflow
- Mobile native app, multi-currency, notification system, gamification
- Full RBAC, real-time chat support, budgeting tools

### Architecture Approach

A **modular monolith** with service-oriented internal boundaries — fastest path to working demo while preserving mental model of production microservices. The backend is a single FastAPI application with clear module boundaries (Auth, EWA, Loan, Payroll, AI Engine) communicating through internal service calls. Three distinct frontend route groups serve three user roles with shared component library.

**Major components:**
1. **AI Engine (Qwen)**: Central AI service — OCR salary extraction from payslip images, credit scoring with explainable reasoning, data cross-validation between HRM and OCR sources
2. **EWA Module**: Calculate earned wage balances, process withdrawal requests, enforce caps (max 50% of earned wages), track disbursements and auto-debit instructions
3. **Loan Module**: Full loan lifecycle — application → salary verification → AI credit scoring → offer generation → disbursement → amortization schedule → auto-debit repayment tracking
4. **Payroll Integration Module**: Mock HRM API returning realistic Vietnamese payroll data; payroll snapshot service for point-in-time verification audit trail
5. **Three Frontend Portals**: Employee (mobile-first, Vietnamese), HR Admin (enterprise management), Shinhan Admin (portfolio/risk analytics)

### Critical Pitfalls

1. **EWA ≠ Loan** — These are fundamentally different products (EWA is not credit per CFPB; loan is regulated lending). Architect two distinct flows from day one. Never show a credit score on an EWA screen.
2. **Qwen for documents, not numerical scoring** — Use Qwen's strength in document understanding (extracting salary data from Vietnamese payslips) and explanation generation, not for crunching credit score math. Use rules-based logic for the actual score number; Qwen explains the reasoning.
3. **Mock HRM boundary is sacred** — Hard rule: HRM integration gets max 10% of effort. Build a trivial CRUD mock. Every hour spent on "real-looking HRM" is stolen from polish and demo prep.
4. **Show auto-debit actually working** — The entire NPL <2% business case rests on payroll deduction. Demo must show the full lifecycle: salary processed → auto-debit triggered → repayment confirmed. Include failure scenarios.
5. **Polish over breadth** — 3 flawless end-to-end flows beat 10 half-working features. Ruthlessly prioritize: (1) EWA flow, (2) Loan + AI scoring flow, (3) Employer dashboard. Each flow must have zero dead ends.

## Implications for Roadmap

Based on combined research, the following phase structure is recommended:

### Phase 1: Foundation & Data Layer
**Rationale:** Every downstream phase depends on data models, auth, mock HRM, and the Qwen AI client. Building this first eliminates blocking dependencies.
**Delivers:** SQLAlchemy models (employees, enterprises, payroll snapshots, EWA transactions, loan applications), JWT auth with 3 roles, mock HRM API with realistic Vietnamese payroll data, Qwen API client wrapper, seed data script
**Addresses:** Mock HRM data, auth system, AI client setup
**Avoids:** Pitfall #4 (HRM scope creep) — enforce mock boundary from phase 1

### Phase 2: EWA Flow (Employee Portal)
**Rationale:** EWA is the simpler of the two core flows (single verification step, no underwriting). Validates the payroll + AI integration pattern before the more complex loan flow. Employee portal is the primary demo surface.
**Delivers:** EWA balance calculation, withdrawal request flow, AI payslip validation (Qwen VL), auto-debit instruction generation, employee portal with Vietnamese UI (balance view, request form, transaction history)
**Addresses:** EWA withdrawal, earned wage balance display, Vietnamese UI, auto-debit instruction
**Uses:** Qwen-plus (OCR payslip extraction), FastAPI, React + shadcn/ui, Tailwind
**Avoids:** Pitfall #5 (debt spiral) — implement hard caps and remaining balance display from the start; Pitfall #10 (Vietnamese afterthought) — Vietnamese-first UI from sprint 1

### Phase 3: Loan Flow with AI Credit Scoring
**Rationale:** Builds on payroll verification patterns from Phase 2. Loan flow is the more complex product (full underwriting lifecycle) and showcases Qwen AI's value proposition most strongly to judges.
**Delivers:** Loan application lifecycle, AI salary data extraction with cross-validation (HRM vs OCR), AI credit scoring engine with explainable reasoning, loan offer generation (EMI calculation, interest rates), repayment schedule with auto-debit, loan views in employee portal
**Addresses:** Salary-linked loan application, AI credit scoring, loan EMI calculator, AI risk assessment explanation
**Uses:** Qwen-plus (credit scoring, data validation, explanation generation), Pydantic (structured output validation)
**Avoids:** Pitfall #3 (synthetic data perfection) — include edge cases and model confidence levels; Pitfall #9 (LLM misapplication) — Qwen for document understanding + explanation, rules for score calculation

### Phase 4: Admin Dashboards
**Rationale:** Dashboards are presentation-only and should be built after core flows exist so they display real data, not stubs. HR admin is the "real customer" for enterprise acquisition; Shinhan admin showcases portfolio health.
**Delivers:** HR admin dashboard (employee roster, EWA usage, deduction reports, policy config), Shinhan admin dashboard (portfolio metrics, NPL tracking, loan approval queue, enterprise partner management), business case visualization
**Addresses:** HR admin dashboard, Shinhan admin portfolio overview, loan approval workflow, collection tracking, employer risk tiering
**Uses:** React charts (recharts or similar), shared component library from Phase 2
**Avoids:** Pitfall #8 (enterprise onboarding friction) — design employer flow as polished experience

### Phase 5: Polish, Demo Script & Pitch
**Rationale:** The hackathon is won on pitch and demo quality, not feature count. This phase ensures every flow works end-to-end with zero dead ends and the demo tells a compelling narrative.
**Delivers:** End-to-end demo script with user story narrative, visual polish across all portals, pitch deck with business case (NPL <2%, TAT reduction, TAM), auto-debit lifecycle demonstration, Alibaba Cloud services showcase in architecture docs
**Addresses:** Demo flow, business case / ROI visualization, Qwen AI showcase moments
**Avoids:** Pitfall #12 (no narrative) — script demo as user story; Pitfall #15 (too much, too little polish); Pitfall #16 (technical demo instead of business pitch)

### Phase Ordering Rationale

- **Phase 1 first** because all other phases need data models, auth, mock HRM, and the Qwen client — these are hard dependencies
- **Phase 2 before Phase 3** because EWA is architecturally simpler (verify → disburse) and validates the payroll + AI integration pattern before the more complex loan lifecycle (verify → score → approve → disburse → repay)
- **Phase 4 after core flows** because dashboards need real data to display; building them earlier means stubbing everything
- **Phase 5 last** because polish only matters after the product works end-to-end; demo script must cover working features
- **Feature dependency chain**: HRM Data Mock → AI Extraction → Credit Score → Loan Flow; EWA Balance → EWA Request → Auto-Debit

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3 (Loan Flow):** Qwen structured output reliability for financial data, Vietnamese payslip format variations, credit scoring factor weighting — needs prompt engineering research
- **Phase 2 (EWA):** Qwen VL image input for Vietnamese payslip OCR — verify quality with actual payslip samples
- **Phase 5 (Demo/Pitch):** Vietnam SBV regulatory sandbox specifics, Shinhan Finance product parameters alignment — needs business research

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Well-documented FastAPI + SQLAlchemy + JWT patterns, standard React + Vite setup
- **Phase 4 (Dashboards):** Standard CRUD dashboards with charts, well-established patterns

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | **HIGH** | All technologies verified against official docs (Qwen API, FastAPI PyPI, Alibaba Cloud). OpenAI-compatible API endpoint confirmed. |
| Features | **HIGH** | EWA/lending features well-documented globally (Payactiv, Wagestream, Refyne). Competitor analysis comprehensive. Vietnam-specific features MEDIUM confidence. |
| Architecture | **HIGH** | Modular monolith is standard for PoC. Component boundaries clear. Qwen integration patterns verified from official Alibaba Cloud docs. |
| Pitfalls | **HIGH** | Domain-specific pitfalls well-researched (Harvard salary-link paper, CFPB advisory, Wikipedia EWA controversies). Vietnam regulatory MEDIUM confidence. |

**Overall confidence:** HIGH

### Gaps to Address

- **Qwen Vietnamese financial language quality:** Not verified — need to test Qwen's Vietnamese output for financial terminology during Phase 2/3 planning. May need prompt engineering for accurate financial Vietnamese.
- **Vietnamese payslip format:** No real payslip samples analyzed — mock data must be realistic. Research actual Vietnamese payslip layout (table structure, field names) during Phase 2 planning.
- **Vietnam SBV regulatory sandbox specifics:** General framework referenced but specific EWA classification under Vietnam law is unclear. Pitch should acknowledge this as a gray zone requiring regulatory engagement.
- **Credit scoring factor weights:** Recommended weights (salary stability 30%, tenure 25%, income-to-loan 25%, auto-debit capacity 20%) are reasonable but unvalidated — should be framed as configurable parameters, not fixed decisions.

## Sources

### Primary (HIGH confidence)
- Alibaba Cloud Model Studio — Qwen API Reference: https://www.alibabacloud.com/help/en/model-studio/qwen-api-via-openai-chat-completions
- Alibaba Cloud — Qwen Model List & Pricing: https://www.alibabacloud.com/help/en/model-studio/getting-started/models
- FastAPI PyPI (v0.136.0, April 2026): https://pypi.org/project/fastapi/
- Harvard Kennedy School AWP #88 — "The Power of the Salary Link" (Baker & Kumar, 2018)
- Shinhan Finance Vietnam product specifications (shinhanfinance.com.vn)
- PROJECT.md — project requirements and constraints

### Secondary (MEDIUM confidence)
- Payactiv, Wagestream/Stream, Refyne — competitor feature analysis
- Fortune Business Insights — EWA Market Report 2026-2034 (market sizing)
- Wikipedia — Earned Wage Access (regulatory classification, controversies)
- Vietnam State Bank (sbv.gov.vn) — regulatory sandbox framework

### Tertiary (LOW confidence)
- Vietnam-specific salary bands and payroll practices — training data, needs local validation
- Vietnam SBV specific EWA regulation — gray zone, no explicit regulation exists
- CFPB Advisory Opinion 2025 — US-specific, used as directional reference only

---
*Research completed: 2026-04-17*
*Ready for roadmap: yes*
