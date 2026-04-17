# Feature Landscape

**Domain:** Earned Wage Access (EWA) & Salary-Linked Lending
**Researched:** 2025-04-17
**Confidence:** HIGH (global EWA features), MEDIUM (Vietnam-specific market)

## Table Stakes

Features users expect. Missing = product feels incomplete or untrustworthy.

### Employee-Facing (Core)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Earned wage balance display** | Users must see how much they've earned this cycle before requesting anything. Without this, EWA is blind trust. | Low | Pull from HRM/payroll data. Show gross earned, deductions, net available for withdrawal. |
| **EWA withdrawal request** | Core value proposition — employee requests early access to earned wages. | Med | Must enforce max withdrawal limits (typically 50-80% of earned but unpaid wages). Cap per-cycle to prevent zero-payday scenario. |
| **Instant/near-instant disbursement** | EWA promises speed. If funds don't arrive quickly, users revert to alternatives (payday loans, borrowing from friends). | Med | For PoC: mock disbursement flow. For production: bank transfer (Vietnam: Napas 24/7 instant transfer). |
| **Salary-linked loan application** | Second core product — unsecured personal loan (Shinhan: up to 300M VND, 48 months, from 18%/year). Must feel seamless after EWA establishes the salary link. | Med | Pre-populate from verified salary data. Show calculated monthly payment (EMI calculator). |
| **Loan EMI calculator** | Users need to understand repayment before committing. Standard on every lending product. | Low | Sliders for amount + tenure → show monthly payment, total interest, total repayment. Shinhan uses declining balance interest. |
| **Transaction history** | Users need to track withdrawals, loans, repayments. Basic trust feature. | Low | List view with status, amounts, dates. Filter by EWA vs Loan. |
| **Repayment schedule** | For loans: clear amortization table showing due dates, principal/interest split, outstanding balance. | Low | Monthly installments via auto-debit from payroll. Show next payment date and amount prominently. |
| **Vietnamese language UI** | Target users are Vietnamese employees. English-only = unusable for most. | Low | All employee-facing screens must be in Vietnamese. Admin/technical docs can stay English. |
| **Mobile-responsive web** | Vietnamese users are mobile-first (smartphone penetration >70%). Desktop-only = excludes majority of target users. | Low | Responsive web is sufficient for PoC. Native mobile app is explicitly out of scope. |

### HR Admin-Facing (Enterprise)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Employee enrollment/management** | HR must be able to register employees, manage who has access. | Med | Bulk upload from HRM. View active/enrolled employees. |
| **Payroll deduction management** | Core mechanism — HR must see what to deduct from each employee's payroll each cycle. | Med | Auto-generated deduction report per pay period. Line items: EWA advances, loan installments. Must integrate into payroll run. |
| **Company dashboard / overview** | HR needs to see program utilization, active users, total disbursements, outstanding balances. | Med | Summary cards + charts. Filter by department, date range. |
| **Employee lookup** | HR needs to look up individual employee status: balance, withdrawals, loan status, deduction history. | Low | Search by name or employee ID. Show employee detail page. |

### Shinhan Admin-Facing (Finance)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Portfolio overview dashboard** | Risk and operations teams need real-time visibility into the portfolio: total disbursed, outstanding, NPL rate, collection rate. | Med | KPI cards, trend charts, portfolio aging. |
| **Enterprise partner management** | Shinhan manages relationships with employer companies. Must onboard and manage multiple enterprises. | Med | CRUD for enterprise partners. View per-enterprise metrics. |
| **Loan approval workflow** | Not all loans auto-approve. Must have ability to review, approve/reject, or set auto-approval rules based on credit scoring. | Med | For PoC: show auto-approval based on AI credit score. Include manual override capability. |
| **Collection / repayment tracking** | Track auto-debit success/failure rates. Flag late payments. Show aging buckets. | Med | Auto-debit is the key innovation — must show its effectiveness vs traditional lending. |

## Differentiators

Features that set product apart. Not expected by default, but create competitive advantage and are critical for hackathon demo impact.

### AI-Powered (Hackathon Core)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **AI salary data extraction from HRM** | Instead of manual payslip uploads, Qwen AI extracts salary data directly from HRM/payroll screenshots or API data. Eliminates the #1 bottleneck in lending: income verification. | High | **This is the hero feature for hackathon demo.** Show Qwen processing a payslip/HRM export and extracting: gross salary, deductions, net pay, employer name, period. |
| **AI credit scoring from salary data** | Traditional credit scoring uses credit bureau data (which many Vietnamese workers lack). Salary-linked scoring uses: employment stability, income trajectory, salary consistency, employer quality. Enables lending to thin-file customers. | High | Show a "credit score" derived from payroll patterns. Factors: months employed, salary trend (stable/growing), deduction ratio, employer tier. |
| **AI-powered risk assessment explanation** | Not just a score — explain WHY the score is what it is. "Your score is 720 because: employed 24+ months at Tier 1 company, salary grew 15% YoY, consistent deductions." Transparency builds trust. | Med | Qwen generates natural-language risk assessment. Differentiator for judges — shows "AI thinking." |

### Product Innovation

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Auto-debit from payroll (salary link)** | The "salary link" from Harvard research — automatic repayment via payroll deduction reduces NPL to <2% vs 5-10% for traditional unsecured lending. This is the core business case differentiator. | Med | For PoC: demonstrate the flow — loan disbursement → auto-deduction appears on payroll report → repayment confirmed. Must show <2% NPL projection in business case. |
| **Real-time payroll verification** | Traditional lending needs 3-7 days for income verification. Real-time from HRM = instant. TAT reduction from days to minutes. | Med | For PoC: mock the HRM API call. Show "verifying salary data..." → instant result vs. "upload payslip and wait 3-5 days." |
| **EWA → Loan upsell flow** | Users who use EWA demonstrate need and repayment behavior. Transition them to salary-linked loan with pre-filled data and preferential terms. Reduces customer acquisition cost. | Med | After 2-3 EWA withdrawals, show "eligible for salary-linked loan up to X VND" with one-tap apply. |
| **Paperless onboarding** | Zero paper documents. Everything digital — identity verification, salary verification, loan agreement, e-signature. Aligns with Shinhan's iShinhan app direction. | Med | For PoC: show the flow. Mock e-KYC, auto-filled loan agreement, digital signature. |
| **Employer risk tiering** | Not all employers equal. Categorize partner companies by: size, industry, employee turnover rate, financial stability. Use employer tier as a factor in credit scoring and loan pricing. | Low | For PoC: assign mock employer tiers (Gold/Silver/Bronze). Show how tier affects loan terms. |

### Demo Impact (Hackathon-Specific)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **End-to-end demo flow** | Judges need to see the complete journey: enterprise onboarding → employee EWA request → salary verification → loan application → auto-debit repayment. One seamless narrative. | Med | Script the demo. Pre-seed data. rehearse transitions. This is more important than any individual feature. |
| **Business case / ROI visualization** | Judges are business people. Show: NPL reduction projection, TAT improvement, customer acquisition cost reduction, revenue potential. Numbers tell the story. | Low | Dashboard with charts showing: traditional lending vs salary-linked lending comparison. <2% NPL vs 5-10% industry average. |
| **Qwen AI showcase moments** | The hackathon requires showcasing Qwen AI + Alibaba Cloud. Need visible "wow" moments where AI does something impressive on screen. | Med | (1) Salary data extraction from document image. (2) Credit score generation with explanation. (3) Maybe: chatbot for employee financial Q&A. |

## Anti-Features

Features to explicitly NOT build. Building them wastes time or creates problems.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Real HRM/Payroll integration** | Out of scope for hackathon. Real integrations (SAP, Oracle, local VN HRM systems) take months. Each employer uses different system. | Mock HRM API with realistic Vietnamese payroll data. Show the integration architecture but don't build real connectors. |
| **Full KYC/AML compliance workflow** | Complete KYC requires: ID verification (Vietnam CCCD), face matching, address verification, sanctions screening, PEP check. Way too complex for hackathon. | Show a simplified e-KYC flow: mock CCCD scan → mock face verification → pass/fail. Don't implement real biometric matching or database checks. |
| **Payment gateway integration** | Real payment processing requires: banking partnerships, PCI-DSS compliance, Napas/BankNet integration, settlement reconciliation. Months of work. | Mock all payment flows. Show "disbursement successful" with fake transaction IDs. Demonstrate the business logic, not the plumbing. |
| **Credit bureau integration** | Vietnam's credit bureau (CIC) integration is regulated and slow. Many target customers are thin-file anyway (that's the point of salary-linked scoring). | Use AI-generated credit scoring from payroll data instead. This IS the differentiator. |
| **Mobile native app** | iOS/Android apps need: app store approval, device testing, push notifications, biometric auth. Unnecessary for PoC demo. | Mobile-responsive web app. Works on any device. Faster to build. Easier to demo on laptop. |
| **Multi-currency support** | Vietnam is single-currency (VND). No need for FX, multi-currency wallets, cross-border transfers. | VND only. All amounts in VND. Format with Vietnamese conventions (e.g., "300.000.000 ₫"). |
| **Complex notification system** | Push notifications, SMS, email — each requires integration with third-party services (FCM, Twilio, SendGrid). Low ROI for PoC. | In-app notifications only. Show notification badge/bell icon. For production roadmap, note multi-channel notifications. |
| **Gamification / rewards / points** | Interesting for engagement but not core value. Distracts from the EWA/lending narrative during demo. | Skip entirely. Focus on core financial flows. If time permits, show "financial wellness score" as a simple metric. |
| **Admin role-based access control (RBAC)** | Full RBAC with roles, permissions, audit logs is important for production but invisible in demo. | Single admin user for each dashboard type. Mention RBAC in architecture docs as production requirement. |
| **Real-time chat / support system** | Customer support chat, ticketing, FAQ bot — not the story being told. | Static FAQ page. Focus engineering time on AI salary verification demo. |

## Feature Dependencies

```
HRM/Payroll Data Mock
  ├──→ Earned Wage Balance Display
  │      └──→ EWA Withdrawal Request
  │             └──→ Auto-Debit Deduction (Payroll Deduction Report)
  │
  ├──→ AI Salary Data Extraction (Qwen)
  │      └──→ AI Credit Scoring
  │             └──→ Loan Approval Decision
  │                    └──→ Loan Disbursement
  │                           └──→ Auto-Debit Repayment Schedule
  │
  └──→ Employer Risk Tiering
         └──→ AI Credit Scoring (as input factor)

Employee Enrollment (HR Admin)
  └──→ All Employee-Facing Features (user must exist)

Enterprise Onboarding (Shinhan Admin)
  └──→ HR Admin Access
         └──→ Employee Enrollment
```

**Critical path:** HRM Data Mock → AI Salary Extraction → Credit Score → Loan Flow

**Parallel tracks:**
- Track A: EWA flow (balance → request → deduction)
- Track B: Loan flow (verification → scoring → approval → disbursement → repayment)
- Track C: Dashboards (employee, HR admin, Shinhan admin) — can be built in parallel

## MVP Recommendation (Hackathon PoC)

Prioritize in this order:

### Must-Have (Demo will fail without these)
1. **AI salary data extraction** — Hero feature. Qwen processes payslip/HRM data.
2. **EWA request flow** — Employee sees balance, requests withdrawal, gets confirmation.
3. **Salary-linked loan application** — Employee applies, sees AI credit score, gets approved/disbursed.
4. **Auto-debit demonstration** — Show payroll deduction report with EWA + loan repayments.
5. **Vietnamese UI** — Employee-facing screens in Vietnamese.

### Should-Have (Demo significantly stronger with these)
6. **HR admin dashboard** — Show enterprise partner view: employees, deductions, utilization.
7. **Shinhan admin portfolio dashboard** — Show NPL <2%, portfolio health, business metrics.
8. **Loan EMI calculator** — Interactive calculator for loan terms.
9. **Business case / ROI page** — Charts comparing salary-linked vs traditional lending.

### Nice-to-Have (If time permits)
10. **EWA → Loan upsell prompt** — After EWA usage, show loan eligibility.
11. **AI credit score explanation** — Natural language breakdown of score factors.
12. **End-to-end flow animation** — Guided walkthrough of the complete journey.

### Defer (Post-hackathon)
- **Real payment integration** — Mock is fine for PoC.
- **KYC/AML workflow** — Simplified mock only.
- **Notification system** — In-app only.
- **Mobile native** — Responsive web is sufficient.

## Competitor Feature Comparison

Features present in major EWA/lending platforms globally:

| Feature | Payactiv (US) | Wagestream/Stream (UK) | Refyne (India) | Our PoC |
|---------|---------------|----------------------|----------------|---------|
| EWA withdrawal | ✅ | ✅ | ✅ (Salary On-Demand) | ✅ |
| Instant disbursement | ✅ (bank/card/cash) | ✅ | ✅ | ✅ (mock) |
| Salary-linked loan | ❌ (EWA only) | ✅ (Workplace Loans) | ✅ (credit products) | ✅ |
| AI salary verification | ❌ | ❌ | ❌ | ✅ (Qwen — differentiator) |
| AI credit scoring | ❌ | ❌ | Partial | ✅ (Qwen — differentiator) |
| Auto-debit from payroll | ✅ | ✅ | ✅ | ✅ |
| Financial coaching/education | ✅ | ✅ (Coach product) | ✅ (MoneyGuru) | ❌ (defer) |
| Budgeting tools | Partial | ✅ (Budget product) | ❌ | ❌ (defer) |
| Savings features | ✅ | ✅ (Workplace Savings) | ❌ | ❌ (defer) |
| Multi-language | English only | English only | ✅ (11 Indian languages) | ✅ (Vietnamese) |
| Employer dashboard | ✅ | ✅ | ✅ | ✅ |
| Mobile app native | ✅ | ✅ | ✅ | ❌ (responsive web) |
| EMI calculator | N/A (not lending) | ✅ | ✅ | ✅ |

**Key insight:** No major EWA platform currently uses AI for salary data extraction or credit scoring. This is our genuine differentiator — Qwen AI automating what is today a manual, slow process.

## Sources

- **EWA market overview:** Wikipedia — Earned wage access (retrieved 2025-04-17) — MEDIUM confidence for feature analysis
- **Market sizing & trends:** Fortune Business Insights, EWA Market Report 2026-2034 — HIGH confidence for market data
- **Payactiv features:** payactiv.com/earned-wage-access (retrieved 2025-04-17) — HIGH confidence
- **Wagestream/Stream features:** stream.co (retrieved 2025-04-17) — HIGH confidence
- **Refyne features:** refyne.co.in (retrieved 2025-04-17) — HIGH confidence
- **Salary link research:** Harvard Kennedy School, "The Power of the Salary Link" (2018) — HIGH confidence for business case
- **Shinhan Finance products:** shinhanfinance.com.vn (retrieved 2025-04-17) — HIGH confidence for product parameters
- **Vietnam market specifics:** Training data + general knowledge — LOW confidence, needs local validation
