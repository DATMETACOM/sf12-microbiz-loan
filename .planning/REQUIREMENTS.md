# Requirements: [SF11] EWA & Salary-Linked Lending

**Defined:** 2026-04-17
**Core Value:** Xác minh lương real-time từ HRM/Payroll → giải ngân vay paperless trong phút

## v1 Requirements

### AI & Core Engine

- [ ] **AI-01**: System extracts salary data from Vietnamese payslip images using Qwen AI (OCR + structured extraction)
- [ ] **AI-02**: System performs AI-powered credit scoring based on payroll data with explainable output (reason codes, risk factors)
- [ ] **AI-03**: Qwen returns structured JSON output for loan eligibility decisions (approve/reject, amount, rate)
- [ ] **AI-04**: System handles Vietnamese language payslips including accents and financial terminology
- [ ] **AI-05**: Mock HRM/Payroll API returns realistic Vietnamese salary data for demo

### Earned Wage Access (EWA)

- [ ] **EWA-01**: Employee can view current earned wage balance (calculated from pay period progress)
- [ ] **EWA-02**: Employee can request EWA withdrawal up to capped limit (max 50% of earned salary)
- [ ] **EWA-03**: System auto-calculates EWA fees and displays net amount before confirmation
- [ ] **EWA-04**: System processes EWA disbursement and records transaction
- [ ] **EWA-05**: System auto-deducts EWA amount from next payday payroll

### Salary-Linked Loan

- [ ] **LOAN-01**: Employee can apply for salary-linked loan without paper income documents
- [ ] **LOAN-02**: System verifies salary via real-time payroll data (mock HRM) to determine eligibility
- [ ] **LOAN-03**: AI credit scoring engine evaluates loan application with risk assessment
- [ ] **LOAN-04**: System offers Shinhan loan products (up to 300M VND, 18%/year, 48 months) based on eligibility
- [ ] **LOAN-05**: System disburses approved loan amount to employee account
- [ ] **LOAN-06**: System sets up auto-debit repayment from payroll for loan installments
- [ ] **LOAN-07**: Employee can track loan status, outstanding balance, and repayment schedule

### Dashboards

- [ ] **DASH-01**: Employee portal shows earned balance, EWA history, loan status, and application flow
- [ ] **DASH-02**: HR Admin portal manages employee list, views company EWA/loan portfolio, approves/reviews
- [ ] **DASH-03**: Shinhan Admin portal shows overall portfolio metrics, NPL tracking (<2% target), disbursement stats

### Authentication & Authorization

- [ ] **AUTH-01**: Employee can log in with employee ID + password
- [ ] **AUTH-02**: HR Admin can log in with company admin credentials
- [ ] **AUTH-03**: Shinhan Admin can log in with internal admin credentials
- [ ] **AUTH-04**: System enforces role-based access control (Employee, HR Admin, Shinhan Admin)

### Documentation & Pitch

- [ ] **DOC-01**: Business analysis document covering pain points, market size ($7.1B EWA market), user personas, Shinhan product fit
- [ ] **DOC-02**: Pitch deck for hackathon judges covering problem, solution, demo flow, tech innovation, business viability
- [ ] **DOC-03**: Technical architecture documentation with system diagram, API design, data flow

## v2 Requirements

### Advanced Features

- **ADV-01**: Integration with real HRM/Payroll systems (SAP, Oracle, local VN systems)
- **ADV-02**: KYC/AML compliance workflow with eKYC
- **ADV-03**: Multi-currency support for international employees
- **ADV-04**: Push notifications for EWA/loan status updates
- **ADV-05**: Mobile app (React Native)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real HRM integration | Time constraint — mock API sufficient for hackathon PoC |
| Production deployment | PoC quality only — demo on local/Alibaba Cloud ECS |
| KYC/AML full workflow | Complex compliance logic beyond hackathon scope |
| Mobile native app | Web demo sufficient, mobile deferred |
| Multi-company onboarding | Focus on single enterprise partner demo |
| Real payment gateway | Mock disbursement sufficient for demo |
| Regulatory compliance docs | Mention in pitch but don't implement |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| AI-05 | Phase 1 | Pending |
| AI-01 | Phase 2 | Pending |
| AI-02 | Phase 2 | Pending |
| AI-03 | Phase 2 | Pending |
| AI-04 | Phase 2 | Pending |
| EWA-01 | Phase 2 | Pending |
| EWA-02 | Phase 2 | Pending |
| EWA-03 | Phase 2 | Pending |
| EWA-04 | Phase 2 | Pending |
| EWA-05 | Phase 2 | Pending |
| LOAN-01 | Phase 3 | Pending |
| LOAN-02 | Phase 3 | Pending |
| LOAN-03 | Phase 3 | Pending |
| LOAN-04 | Phase 3 | Pending |
| LOAN-05 | Phase 3 | Pending |
| LOAN-06 | Phase 3 | Pending |
| LOAN-07 | Phase 3 | Pending |
| DASH-01 | Phase 3 | Pending |
| DASH-02 | Phase 3 | Pending |
| DASH-03 | Phase 3 | Pending |
| DOC-01 | Phase 4 | Pending |
| DOC-02 | Phase 4 | Pending |
| DOC-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-17*
*Last updated: 2026-04-17 — traceability added during roadmap creation*
