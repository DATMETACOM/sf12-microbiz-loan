# Domain Pitfalls: EWA & Salary-Linked Lending

**Domain:** Earned Wage Access (EWA) & Salary-Linked Consumer Lending
**Context:** PoC for Shinhan Finance Vietnam — Qwen AI Build Day Hackathon
**Researched:** 2026-04-17

---

## Critical Pitfalls

Mistakes that cause rewrites, demo failures, or loss of credibility with judges.

### Pitfall 1: The "Salary Link Breaks" — Employee Departure Mid-Cycle

**What goes wrong:** EWA advances are backed by hours already worked, but the repayment mechanism relies on payroll deduction. When an employee resigns or is terminated between advance and payday, the employer has no payroll to deduct from. The provider is left with an unsecured receivable.

**Why it happens:** Teams model EWA as a simple "earned balance → disburse" flow without accounting for the _repayment settlement risk window_. The Harvard Kennedy School paper "The Power of the Salary Link" (AWP #88, Baker & Kumar, 2018) specifically identifies this as the core risk differential between employer-integrated vs. direct-to-consumer models.

**Consequences:** In a PoC demo, if a judge asks "what happens when someone quits after taking EWA?" and you can't answer, credibility collapses. In production, this creates NPLs that blow past the <2% target.

**Prevention:**
- Build a "separation handler" in the demo flow that shows what happens when employment terminates
- Implement a holdback ratio (e.g., only allow access to 50% of earned wages, not 80-90%)
- Show employer agreement that includes clawback provisions for final paycheck

**Warning signs (detect early):**
- Your EWA flow has no "employment status check" before disbursement
- No cap on % of earned wages accessible per cycle
- No concept of a "risk buffer" in the demo calculations

**Phase that should address:** Core EWA flow implementation phase

---

### Pitfall 2: Treating EWA and Salary-Linked Loan as the Same Product

**What goes wrong:** EWA (accessing already-earned wages) and salary-linked lending (new credit based on salary verification) have fundamentally different regulatory, risk, and UX profiles. Teams build one engine and try to serve both, resulting in neither working well.

**Why it happens:** The challenge description asks for both, so teams assume they're variants of the same thing. They're not:
- **EWA** = not a loan (per CFPB 2025 advisory opinion, employer-integrated EWA is not credit under TILA). No interest, no underwriting, just early access.
- **Salary-Linked Loan** = IS a loan (vay tín chấp). Requires full underwriting, interest calculation, repayment schedule, regulatory compliance.

**Consequences:**
- Confused demo that can't clearly articulate what product it's showing
- Incorrect regulatory positioning — if EWA looks like a loan, judges will question regulatory compliance
- AI credit scoring applied to EWA where it's unnecessary (and creepily invasive)

**Prevention:**
- Architect two distinct product flows from day one
- EWA flow: verify hours worked → calculate available balance → disburse (no credit scoring needed)
- Loan flow: verify salary → AI credit scoring → loan offer → disburse → repayment schedule
- In the demo, clearly label and separate the two experiences

**Warning signs:**
- Single "credit score" displayed for both EWA and loan products
- Interest rates shown on EWA withdrawals
- Same approval flow for both products

**Phase that should address:** Architecture/design phase (must be decided before implementation)

---

### Pitfall 3: AI Credit Scoring Model Built on Synthetic Data — Demo Lies

**What goes wrong:** For the hackathon, you must use mock data. But if the AI credit scoring demo is _too perfect_ (every borderline case correctly classified, no false positives/negatives), judges will recognize it as fake. Worse, if the model architecture couldn't actually work with real data, the demo proves nothing.

**Why it happens:** Teams generate clean mock data, train a model on it, and get 99% accuracy. They don't realize this demonstrates the _opposite_ of what they intend — it shows they don't understand real-world credit scoring challenges.

**Consequences:**
- Judges (especially from Shinhan Finance Risk team) will immediately spot the issue
- The "AI-powered" differentiator becomes a liability instead of a strength
- Undermines the core pitch that Qwen AI adds genuine value

**Prevention:**
- Generate mock data with _intentional imperfections_: missing fields, salary inconsistencies, employment gaps, outliers
- Show the model's reasoning/explainability, not just scores — Qwen should explain WHY it approved/declined
- Display model confidence levels and edge cases
- Include a "what would improve this score?" feature (credit scoring explainability)
- Use Qwen for _unstructured data extraction_ from HRM (parsing payslips, contracts) — this is where LLMs genuinely shine vs. traditional scoring

**Warning signs:**
- Model accuracy >95% on mock data
- No explanation of why scores are what they are
- No edge cases or borderline decisions in the demo
- Qwen used only for scoring when it should be used for document understanding

**Phase that should address:** AI/credit scoring implementation phase

---

### Pitfall 4: HRM/Payroll Integration Scope Creep

**What goes wrong:** Teams spend 60%+ of hackathon time trying to build a "real-looking" HRM integration (API endpoints, webhooks, data sync) instead of focusing on the core value proposition.

**Why it happens:** PROJECT.md explicitly says "mock HRM/Payroll integration" is in scope, but engineers can't resist building something "more real." Every HRM system is different — there is no standard payroll API in Vietnam.

**Consequences:**
- Core demo features (EWA flow, loan approval, dashboard) are underdeveloped
- Judges see a technically impressive but incomplete product
- No time for polish, pitch deck, or business case

**Prevention:**
- **HARD RULE:** Mock everything behind HRM. Build a simple admin panel to inject payroll data.
- Spend the saved time on: (a) polished demo flow, (b) compelling business case, (c) Qwen AI showcase
- The mock HRM should look realistic but be trivially simple — a CRUD API for employee payroll records
- If anyone on the team proposes "let's also support [real HRM system]," decline immediately

**Warning signs:**
- More files/code for HRM mock than for EWA + loan flows combined
- Discussions about OAuth, webhook reliability, idempotency
- Anyone researching Tanca, MISA, or Fastwork360 API documentation

**Phase that should address:** Architecture phase (enforce mock boundary)

---

### Pitfall 5: Debt Spiral — "Zero Funds on Payday" Scenario

**What goes wrong:** Wikipedia's EWA article specifically calls this out: "Others encourage frequent use, including daily withdrawals and no limits on usage, to maximize fees. This can lead to employees receiving no funds on payday." If your demo doesn't prevent this, it looks exploitative.

**Why it happens:** Teams implement EWA as unlimited access to earned wages without consumer protection guardrails.

**Consequences:**
- Ethical red flag for judges — especially at a Shinhan Finance event
- Regulatory concern — Vietnam's SBV takes consumer protection seriously
- Undermines the pitch that this product _helps_ workers vs. payday lending

**Prevention:**
- Implement hard caps: max 50% of earned wages per cycle, max N withdrawals per month
- Show a "remaining take-home pay" prominently in the employee dashboard
- Include a "cooling off" period between EWA requests
- Display the total fees paid YTD so employees see the cost
- In the demo, show a case where the system _denies_ an EWA request to protect the employee

**Warning signs:**
- No limit on EWA frequency or amount in the system
- No display of remaining payday balance
- Dashboard doesn't show cumulative EWA usage
- No denied-request flow in the demo

**Phase that should address:** Employee dashboard + EWA flow implementation

---

### Pitfall 6: No Auto-Debit Narrative — The NPL <2% Promise Falls Apart

**What goes wrong:** The PROJECT.md promises NPL <2% "via auto-debit from payroll." But if the demo doesn't _show_ how auto-debit works and what happens when it fails, judges will dismiss the claim as wishful thinking.

**Why it happens:** Auto-debit is treated as an implementation detail rather than a core product feature. It's the _entire reason_ salary-linked lending has lower NPL — show it.

**Consequences:**
- The NPL <2% claim looks unsubstantiated
- Judges ask "how do you handle missed payments?" and you have no answer
- Misses the opportunity to differentiate from traditional lending

**Prevention:**
- Show the full repayment lifecycle in the demo: salary processed → auto-debit triggered → loan payment made → remaining salary disbursed
- Handle failure scenarios: insufficient salary after deductions, employer missed payroll, employee on leave without pay
- Display a "payment priority waterfall" — show that loan repayment happens before employee receives funds
- Include an employer dashboard showing deduction instructions for each employee

**Warning signs:**
- No repayment flow in the demo
- Loan disbursement without showing how repayment will happen
- No employer-side deduction schedule
- No delinquency/missed-payment handling

**Phase that should address:** Loan repayment + employer dashboard phase

---

## Moderate Pitfalls

### Pitfall 7: Vietnam Regulatory Blind Spot

**What goes wrong:** Vietnam's State Bank (SBV) has no explicit EWA regulation. The product exists in a gray zone between "salary advance" (permitted under labor law) and "consumer lending" (heavily regulated under Circular 43/2016/TT-NHNN and related directives). If you don't acknowledge this, judges will think you haven't done your homework.

**Prevention:**
- In the pitch, explicitly acknowledge the regulatory landscape
- Position EWA as an _employer benefit_ (not a financial product) for the Vietnam market
- Position salary-linked loans as a product under Shinhan Finance's existing consumer lending license — the innovation is the _verification method_, not the product itself
- Reference Vietnam's Regulatory Sandbox mechanism (SBV launched this framework) as the pathway to market

**Phase that should address:** Business case / pitch deck phase

---

### Pitfall 8: Enterprise Onboarding Friction — Too Many Parties

**What goes wrong:** Salary-linked lending requires: (1) enterprise employer agreement, (2) employee enrollment, (3) HRM data access, (4) payroll deduction setup, (5) bank account verification. Teams build for the employee experience and ignore that the _employer_ is the real customer to acquire.

**Prevention:**
- Design the employer onboarding flow FIRST — if companies don't sign up, no employees can use it
- Show a clear ROI case for employers (reduced turnover, employee satisfaction, zero cost to employer)
- The HR admin dashboard should be the most polished part of the demo
- Keep employee enrollment to ≤3 steps (scan QR → verify identity → see balance)

**Phase that should address:** Employer dashboard phase

---

### Pitfall 9: Qwen AI Misapplication — Using LLM for Wrong Task

**What goes wrong:** Teams use Qwen (an LLM) for numerical credit scoring — something traditional ML models do better, faster, and more reliably. LLMs hallucinate numbers, struggle with consistent mathematical reasoning, and are not designed for credit decisioning.

**Prevention:**
- Use Qwen for what LLMs genuinely excel at:
  - **Document understanding**: Extract salary data from unstructured HRM exports, payslip PDFs, labor contracts in Vietnamese
  - **Data validation**: Cross-reference extracted data for consistency (does reported salary match payroll records?)
  - **Explanation generation**: Translate credit decisions into human-readable Vietnamese explanations
  - **Anomaly detection**: Flag unusual patterns in salary data (sudden drops, inconsistent overtime)
- Use traditional scoring logic (rules + simple models) for the actual credit score number
- Show Qwen's value in the _data pipeline_, not just the scoring endpoint

**Phase that should address:** AI integration architecture phase

---

### Pitfall 10: Vietnamese Language UX — An Afterthought

**What goes wrong:** PROJECT.md requires Vietnamese UI for end users. But teams build in English first and "translate later," resulting in broken layouts, untranslated error messages, and AI responses in English.

**Prevention:**
- Design all UI text in Vietnamese from the start
- Test Qwen's Vietnamese language output quality early — it may need prompt engineering for financial Vietnamese
- Pay special attention to: number formatting (VND with no decimals), date formatting (DD/MM/YYYY), name order (family name first)
- Error messages, confirmation dialogs, and edge case UI must all be Vietnamese

**Phase that should address:** All UI phases — enforce Vietnamese-first from sprint 1

---

### Pitfall 11: Mock Data That Doesn't Reflect Vietnam

**What goes wrong:** Demo data shows employees earning $3,000/month with American names, or Vietnamese names but unrealistic salary figures. This instantly breaks immersion for Vietnam-based judges.

**Prevention:**
- Use realistic Vietnamese salary ranges:
  - Factory worker: 5-12M VND/month (~$200-500)
  - Office worker: 12-25M VND/month (~$500-1,000)
  - Manager: 25-50M VND/month (~$1,000-2,000)
- EWA amounts should be proportional (500K-5M VND per request)
- Loan amounts should align with Shinhan products (10-300M VND)
- Include Vietnamese names, company names, and realistic enterprise types (garment factory, tech company, F&B chain)
- Include both Ho Chi Minh City and Hanoi-based employers

**Phase that should address:** Mock data generation phase (before any demo)

---

## Minor Pitfalls

### Pitfall 12: Demo Flow Doesn't Tell a Story

**What goes wrong:** The demo shows screens without narrative. Judges see a CRUD app, not a compelling product. The hackathon is won on _pitch_, not code.

**Prevention:** Design the demo as a narrative: "Meet Nguyen — factory worker at [Company]. It's the 15th, her child needs school fees, but payday is the 30th. Watch her access earned wages in 2 minutes..." vs. "Here's our CRUD dashboard."

**Phase that should address:** Demo preparation / pitch deck phase

---

### Pitfall 13: Ignoring THE FIRST Card Integration

**What goes wrong:** PROJECT.md mentions Shinhan's "THE FIRST" credit card. Teams focus only on EWA + loan and miss the opportunity to show how salary verification enables instant credit card issuance — a third product that's easy to demo and highly relevant.

**Prevention:** If time permits, show a quick flow where verified salary data pre-fills a credit card application with instant approval. Low effort, high impact for Shinhan judges.

**Phase that should address:** Final polish / bonus feature phase

---

### Pitfall 14: Alibaba Cloud Showcase Insufficient

**What goes wrong:** The hackathon requires using Alibaba Cloud services, but teams only use a single service (e.g., just hosting) without demonstrating the cloud ecosystem.

**Prevention:** Map multiple Alibaba Cloud services to the architecture:
- **OSS** — store payslip documents, contracts
- **Function Compute** — serverless loan processing
- **RDS / PolarDB** — salary and loan data storage
- **Qwen API (Model Studio / DashScope)** — AI document extraction and credit scoring
- **RAM / STS** — enterprise data access control
- Call this out explicitly in the pitch

**Phase that should address:** Architecture documentation phase

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation | Confidence |
|-------------|---------------|------------|------------|
| Architecture | EWA vs. Loan conflation (#2) | Enforce two distinct product flows from design | HIGH |
| HRM Mock | Scope creep (#4) | Hard mock boundary, no real integration | HIGH |
| AI/Credit Scoring | Synthetic data perfection (#3) | Intentional data imperfections, show reasoning | HIGH |
| EWA Flow | Debt spiral (#5) | Hard caps, remaining balance display | HIGH |
| Employee Dashboard | Vietnamese UX (#10) | Vietnamese-first from sprint 1 | HIGH |
| Loan Repayment | No auto-debit demo (#6) | Full repayment lifecycle in demo | HIGH |
| Employer Dashboard | Onboarding friction (#8) | Design employer flow first | MEDIUM |
| Mock Data | Unrealistic data (#11) | Research Vietnamese salary bands | HIGH |
| Business Case | Regulatory blind spot (#7) | Acknowledge gray zone, reference SBV sandbox | MEDIUM |
| Pitch/Demo | No narrative (#12) | Script demo as user story, not feature tour | HIGH |
| AI Integration | LLM misapplication (#9) | Qwen for document understanding, not numeric scoring | HIGH |
| Final Polish | Missing card product (#13) | Quick THE FIRST card flow if time permits | LOW |
| Architecture | Alibaba Cloud showcase (#14) | Map multiple services to architecture explicitly | MEDIUM |

---

## Hackathon-Specific Meta-Pitfalls

### Pitfall 15: Building Too Much, Polishing Too Little

**What goes wrong:** The most common hackathon failure mode: 15 features at 60% polish vs. 5 features at 95% polish. Judges remember the polished demo, not the feature count.

**Prevention:**
- Ruthlessly prioritize: (1) EWA flow, (2) Loan flow with AI scoring, (3) Employer dashboard, (4) Employee dashboard, (5) Business case deck
- Each flow must work end-to-end with no dead ends, error states, or "coming soon" placeholders
- A single perfect EWA flow beats 5 half-working features

### Pitfall 16: Technical Demo Instead of Business Pitch

**What goes wrong:** Teams show code, architecture diagrams, and API calls. Judges (including Shinhan Finance business stakeholders) want to see _business impact_, not tech stack.

**Prevention:**
- Lead with: "This reduces TAT from 7 days to 2 minutes" and "This cuts NPL to <2%"
- Show: total addressable market (Vietnam has 50M+ workers, most without payslip access)
- Prove: salary-link is the strongest repayment signal available — stronger than traditional credit bureau
- Demo the _user experience_, not the technical architecture

---

## Sources

- Wikipedia: Earned Wage Access (accessed 2026-04-17) — regulatory classification, controversies, debt spiral risk
- Harvard Kennedy School, M-RCBG AWP #88: "The Power of the Salary Link" (Baker & Kumar, 2018) — salary deduction risk, employer-integrated model
- Vietnam State Bank (SBV) portal (sbv.gov.vn, accessed 2026-04-17) — regulatory sandbox mechanism, consumer lending framework
- CFPB Advisory Opinion (2025): EWA classification as non-credit for employer-integrated products
- Project context: PROJECT.md requirements, Shinhan Finance product specifications
- Confidence levels reflect domain expertise + verified sources; Vietnam-specific regulatory details are MEDIUM confidence (SBV regulations are complex and frequently updated)

---

## Summary: Top 5 Pitfalls to Actively Prevent

1. **EWA ≠ Loan** — separate flows, separate logic, separate demo sections
2. **AI for documents, not scores** — Qwen extracts/validates salary data; traditional logic scores
3. **Mock HRM boundary** — never let HRM integration consume more than 10% of effort
4. **Show auto-debit working** — this is the entire NPL <2% argument
5. **Polish over breadth** — 3 perfect flows beat 10 broken ones
