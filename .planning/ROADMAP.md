# Roadmap: [SF11] EWA & Salary-Linked Lending

## Overview

Build a hackathon PoC for Qwen AI Build Day that demonstrates AI-powered salary verification, Earned Wage Access (EWA), and salary-linked lending for Shinhan Finance Vietnam. The journey: scaffold foundation with auth and mock data → build the Qwen AI hero features with EWA flow → complete the loan lifecycle and all three dashboards → polish the demo and deliver a winning pitch. Four phases, each delivering a coherent verifiable capability, with Qwen AI integration as the centerpiece throughout.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation + Data Layer** - Auth, DB, mock HRM, Qwen client, seed data
- [ ] **Phase 2: AI Engine + EWA Flow** - Qwen salary extraction, credit scoring, EWA withdrawal lifecycle
- [ ] **Phase 3: Loan Flow + Dashboards** - Loan application lifecycle, all three portal dashboards
- [ ] **Phase 4: Polish + Docs + Pitch** - Demo script, business analysis, pitch deck, architecture docs

## Phase Details

### Phase 1: Foundation + Data Layer
**Goal**: Developers have a working backend with auth, database, mock HRM data, and a Qwen AI client ready for feature development
**Depends on**: Nothing (first phase)
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AI-05
**Success Criteria** (what must be TRUE):
  1. Employee, HR Admin, and Shinhan Admin can each log in with their respective credentials and see a role-appropriate response
  2. System enforces role-based access control — each role can only access its authorized endpoints
  3. Mock HRM API returns realistic Vietnamese payroll data for any employee query
  4. Qwen AI client successfully connects to DashScope API and returns a test completion
**Plans**: 2 plans

Plans:
- [ ] 01-01: Project scaffolding — FastAPI app, SQLAlchemy models, JWT auth with 3 roles, React + Vite + Tailwind + shadcn/ui shell
- [ ] 01-02: Mock HRM API + Qwen client — payroll data endpoint, Qwen DashScope client wrapper, seed data script

### Phase 2: AI Engine + EWA Flow
**Goal**: Employees can verify salary via AI and access earned wages before payday — the hero Qwen AI feature is live
**Depends on**: Phase 1
**Requirements**: AI-01, AI-02, AI-03, AI-04, EWA-01, EWA-02, EWA-03, EWA-04, EWA-05
**Success Criteria** (what must be TRUE):
  1. User uploads a Vietnamese payslip image and receives structured salary data extracted by Qwen AI
  2. Employee can view current earned wage balance calculated from pay period progress
  3. Employee can request EWA withdrawal up to 50% cap, see fees and net amount, and confirm disbursement
  4. System records EWA disbursement and generates auto-debit instruction for next payroll deduction
  5. AI credit scoring engine produces explainable risk assessment with reason codes and structured JSON output
**Plans**: 3 plans

Plans:
- [ ] 02-01: Qwen AI Engine — salary extraction from payslip images (OCR), credit scoring with explainable reasoning, structured JSON output, Vietnamese language handling
- [ ] 02-02: EWA backend — balance calculation, withdrawal request with 50% cap, fee calculation, disbursement processing, auto-debit instruction
- [ ] 02-03: Employee portal (EWA) — balance view, withdrawal request form, transaction history, Vietnamese UI
**UI hint**: yes

### Phase 3: Loan Flow + Dashboards
**Goal**: Employees can apply for salary-linked loans end-to-end, and all three role-based dashboards display live data
**Depends on**: Phase 2
**Requirements**: LOAN-01, LOAN-02, LOAN-03, LOAN-04, LOAN-05, LOAN-06, LOAN-07, DASH-01, DASH-02, DASH-03
**Success Criteria** (what must be TRUE):
  1. Employee can apply for salary-linked loan, receive AI credit decision with explanation, and see loan offer with EMI repayment schedule
  2. System disburses approved loan and sets up auto-debit repayment from payroll
  3. Employee portal shows complete view: earned balance, EWA history, loan status, and application flow in Vietnamese
  4. HR Admin portal shows employee roster, EWA/loan portfolio summary, and deduction reports
  5. Shinhan Admin portal shows overall portfolio metrics, NPL tracking (<2% target), and disbursement statistics
**Plans**: 3 plans

Plans:
- [ ] 03-01: Loan backend — application lifecycle, salary verification via mock HRM, AI credit scoring integration, offer generation (EMI calculator), disbursement, auto-debit repayment setup, tracking
- [ ] 03-02: Employee portal (Loan) — loan application form, credit decision display with AI explanation, offer + EMI schedule view, loan status tracker
- [ ] 03-03: Admin dashboards — HR Admin portal (employee list, EWA/loan portfolio, deductions) + Shinhan Admin portal (portfolio metrics, NPL, disbursements)
**UI hint**: yes

### Phase 4: Polish + Docs + Pitch
**Goal**: Demo-ready product with compelling hackathon pitch materials — the product wins over judges
**Depends on**: Phase 3
**Requirements**: DOC-01, DOC-02, DOC-03
**Success Criteria** (what must be TRUE):
  1. Business analysis document covers pain points, $7.1B EWA TAM, user personas, and Shinhan product fit with ROI projections
  2. Pitch deck presents a clear problem → solution → demo → tech innovation → business viability narrative for judges
  3. Technical architecture documentation includes system diagram, API design, and Qwen AI data flow
  4. End-to-end demo script walks through complete user stories with zero dead ends across all three roles
**Plans**: 2 plans

Plans:
- [ ] 04-01: Demo polish — end-to-end flow testing, visual polish across all portals, demo script with user story narrative, auto-debit lifecycle showcase
- [ ] 04-02: Documentation suite — business analysis document, pitch deck, technical architecture documentation

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Data Layer | 0/2 | Not started | - |
| 2. AI Engine + EWA Flow | 0/3 | Not started | - |
| 3. Loan Flow + Dashboards | 0/3 | Not started | - |
| 4. Polish + Docs + Pitch | 0/2 | Not started | - |
