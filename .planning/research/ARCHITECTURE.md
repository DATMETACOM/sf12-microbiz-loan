# Architecture Patterns

**Domain:** Earned Wage Access (EWA) & Salary-Linked Lending Platform
**Researched:** 2025-04-17
**Confidence:** HIGH (domain knowledge + verified Qwen API docs)

## Recommended Architecture

**Pattern:** Modular monolith with service-oriented internal boundaries. For a hackathon PoC, a monolithic backend with clear module boundaries is the fastest path to a working demo while preserving the mental model of a production microservice architecture.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Web Frontend (React/Next.js)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────────┐  │
│  │  Employee     │  │  HR Admin    │  │  Shinhan Finance Admin    │  │
│  │  Portal       │  │  Dashboard   │  │  Dashboard               │  │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬──────────────┘  │
└─────────┼─────────────────┼───────────────────────┼─────────────────┘
          │                 │                       │
          ▼                 ▼                       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        API Gateway / BFF Layer                      │
│              (Auth, routing, rate limiting, request validation)      │
└────┬────────────┬──────────────┬──────────────┬────────────────────┘
     │            │              │              │
     ▼            ▼              ▼              ▼
┌─────────┐ ┌──────────┐ ┌───────────┐ ┌────────────────┐
│  Auth   │ │  EWA     │ │  Loan     │ │  Payroll       │
│  Module │ │  Module  │ │  Module   │ │  Integration   │
│         │ │          │ │           │ │  Module        │
└────┬────┘ └────┬─────┘ └─────┬─────┘ └──────┬─────────┘
     │           │             │               │
     │           │             ▼               │
     │           │      ┌─────────────┐        │
     │           │      │  AI Engine  │◄───────┘
     │           │      │  (Qwen)     │
     │           │      └─────────────┘
     │           │             │
     ▼           ▼             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Data Layer                                   │
│  ┌──────────┐  ┌───────────┐  ┌───────────────┐  ┌──────────────┐  │
│  │ Users &  │  │ EWA &     │  │ Loan          │  │ Payroll      │  │
│  │ Auth DB  │  │ Txn DB    │  │ Portfolio DB  │  │ Snapshot DB  │  │
│  └──────────┘  └───────────┘  └───────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
          │                                    │
          ▼                                    ▼
┌──────────────────┐              ┌─────────────────────────────┐
│  Alibaba Cloud   │              │  Mock HRM/Payroll System    │
│  (Model Studio)  │              │  (simulates enterprise HRM) │
│  - Qwen AI APIs  │              │                             │
└──────────────────┘              └─────────────────────────────┘
```

### Component Boundaries

| Component | Responsibility | Communicates With | Key Data |
|-----------|---------------|-------------------|----------|
| **Employee Portal** | Employee-facing UI: view balance, request EWA, apply for loan, track status | API Gateway → EWA/Loan modules | Employee profile, EWA balance, loan applications |
| **HR Admin Dashboard** | Enterprise HR manages employee roster, configures EWA parameters, views usage | API Gateway → Auth/Payroll/EWA modules | Employee list, EWA policy config, usage analytics |
| **Shinhan Admin Dashboard** | Finance admin manages loan portfolio, approves/reviews, views risk analytics | API Gateway → Loan/AI modules | Portfolio metrics, risk scores, disbursement queue |
| **API Gateway / BFF** | Authentication, authorization, request routing, rate limiting | All downstream modules | JWT tokens, user context |
| **Auth Module** | User management, login, role-based access (Employee/HR Admin/Shinhan Admin) | User DB, API Gateway | Users, roles, sessions |
| **EWA Module** | Calculate earned wages, process withdrawal requests, track balances, manage disbursements | Payroll Module (salary data), AI Engine (validation), Data Layer | EWA transactions, balances, withdrawal history |
| **Loan Module** | Loan application lifecycle: application → verification → credit scoring → approval → disbursement → repayment | Payroll Module (salary verification), AI Engine (credit scoring), Data Layer | Loan applications, disbursements, repayment schedules |
| **Payroll Integration Module** | Connect to HRM/Payroll systems, retrieve salary data, verify employment, sync payroll snapshots | Mock HRM (external), EWA Module, Loan Module, AI Engine | Payroll records, employment status, salary history |
| **AI Engine (Qwen)** | OCR for salary documents, credit scoring, data extraction/validation, NLP for chat/query | All modules via internal API | Extracted data, credit scores, validation results |
| **Data Layer** | Persistence for all modules, transaction management | All modules | All business data |

### Data Flow

#### Flow 1: EWA (Earned Wage Access) — Primary Flow

```
Employee                    System                          External
   │                          │                               │
   │  1. Login                │                               │
   │ ──────────────────────►  │                               │
   │                          │                               │
   │  2. View EWA Balance     │                               │
   │ ──────────────────────►  │                               │
   │                          ├── 3. Fetch payroll data ─────►│ Mock HRM
   │                          │◄── 4. Return salary info ─────│
   │                          │                               │
   │  5. Display balance      │                               │
   │ ◄──────────────────────  │                               │
   │  (earned_this_period     │                               │
   │   - already_withdrawn)   │                               │
   │                          │                               │
   │  6. Request EWA          │                               │
   │  (amount, bank_account)  │                               │
   │ ──────────────────────►  │                               │
   │                          ├── 7. Verify payroll ─────────►│ Mock HRM
   │                          │◄── 8. Confirmed earnings ─────│
   │                          │                               │
   │                          ├── 9. AI validation (Qwen VL)  │
   │                          │   (verify payslip data        │
   │                          │    matches HRM data)          │
   │                          │                               │
   │                          ├── 10. Create transaction      │
   │                          │    (status: approved)         │
   │                          │                               │
   │  11. Confirmation        │                               │
   │ ◄──────────────────────  │                               │
   │  (txn_id, amount,        │                               │
   │   disbursement ETA)      │                               │
   │                          │                               │
   │                          ├── 12. Auto-debit instruction  │
   │                          │    (on next payday) ─────────►│ Mock HRM
```

**Key data objects in EWA flow:**

```typescript
interface EWABalance {
  employeeId: string;
  payPeriod: { start: Date; end: Date };
  grossEarnings: number;         // Total earned this period
  alreadyAccessed: number;       // Previously withdrawn
  availableBalance: number;      // grossEarnings - alreadyAccessed - fees
  maxAccessPercent: number;      // e.g. 50% of earned wages
  feePerWithdrawal: number;      // Flat fee per EWA transaction
}

interface EWARequest {
  id: string;
  employeeId: string;
  amount: number;
  bankAccount: string;
  status: 'pending' | 'verified' | 'approved' | 'disbursed' | 'repaid';
  payrollSnapshotId: string;     // Link to verified payroll data
  aiValidationResult?: AIValidationResult;
  createdAt: Date;
  disbursedAt?: Date;
}
```

#### Flow 2: Salary-Linked Loan — Primary Flow

```
Employee                    System                          External
   │                          │                               │
   │  1. Apply for loan       │                               │
   │  (desired_amount,        │                               │
   │   purpose, tenure)       │                               │
   │ ──────────────────────►  │                               │
   │                          ├── 2. Fetch salary history ──►│ Mock HRM
   │                          │◄── 3. Salary records ─────────│
   │                          │                               │
   │                          ├── 4. Upload payslip (optional)│
   │                          │   OR auto-verify from HRM     │
   │                          │                               │
   │                          ├── 5. AI OCR extraction ──────►│ Qwen VL
   │                          │   (extract salary data from   │ (qwen3.5-plus)
   │                          │    payslip image)             │
   │                          │◄── 6. Structured salary data  │
   │                          │                               │
   │                          ├── 7. Cross-validate           │
   │                          │   (HRM data vs OCR data)      │
   │                          │                               │
   │                          ├── 8. AI Credit Scoring ──────►│ Qwen
   │                          │   (analyze salary patterns,   │ (qwen3.5-plus)
   │                          │    employment stability,       │
   │                          │    repayment capacity)         │
   │                          │◄── 9. Credit score + terms    │
   │                          │                               │
   │                          ├── 10. Determine eligibility   │
   │                          │    & loan terms               │
   │                          │    (amount, rate, tenure)      │
   │                          │                               │
   │  11. Loan offer          │                               │
   │ ◄──────────────────────  │                               │
   │  (approved_amount,       │                               │
   │   interest_rate, EMI,    │                               │
   │   auto_debit_schedule)   │                               │
   │                          │                               │
   │  12. Accept loan         │                               │
   │ ──────────────────────►  │                               │
   │                          ├── 13. Disburse to bank        │
   │                          │                               │
   │  14. Disbursement        │                               │
   │     confirmation         │                               │
   │ ◄──────────────────────  │                               │
   │                          ├── 15. Schedule auto-debit ───►│ Mock HRM
   │                          │    from next payroll cycle    │
```

**Key data objects in Loan flow:**

```typescript
interface LoanApplication {
  id: string;
  employeeId: string;
  enterpriseId: string;
  requestedAmount: number;
  approvedAmount?: number;
  purpose: string;
  tenureMonths: number;
  status: 'submitted' | 'verifying' | 'scoring' | 'offered' | 'accepted' 
         | 'disbursed' | 'repaying' | 'completed' | 'rejected';
  salaryVerification: SalaryVerification;
  creditScore?: AICreditScore;
  loanTerms?: LoanTerms;
}

interface SalaryVerification {
  hrmData: {
    monthlySalary: number;
    employmentMonths: number;
    employmentStatus: 'active' | 'probation' | 'terminated';
    company: string;
    position: string;
  };
  ocrData?: {
    extractedFromPayslip: boolean;
    extractedFields: Record<string, string | number>;
    confidenceScore: number;
  };
  crossValidationPassed: boolean;
}

interface AICreditScore {
  score: number;                    // 0-1000
  riskCategory: 'low' | 'medium' | 'high';
  factors: {
    salaryStability: number;        // Weight: 30%
    employmentTenure: number;       // Weight: 25%
    incomeToLoanRatio: number;      // Weight: 25%
    autoDebitCapacity: number;      // Weight: 20%
  };
  reasoning: string;                // AI explanation
  maxRecommendedAmount: number;
  recommendedRate: number;
}

interface LoanTerms {
  principal: number;
  annualInterestRate: number;       // From 18%/year (Shinhan context)
  tenureMonths: number;
  emi: number;                      // Monthly installment
  totalRepayment: number;
  autoDebitDay: number;             // Day of month for payroll deduction
  disbursementAccount: string;
}
```

## Patterns to Follow

### Pattern 1: AI-Powered Document Extraction Gateway
**What:** All salary/payslip documents pass through a unified AI extraction pipeline using Qwen VL before being cross-validated against HRM data.
**When:** Any flow that requires salary verification (EWA verification, loan application).
**Why:** Demonstrates Qwen AI value prop clearly for hackathon judges; provides structured data from unstructured documents.

```typescript
// AI Extraction Service
class SalaryExtractionService {
  private qwenClient: OpenAI;
  
  async extractFromPayslip(imageUrl: string): Promise<ExtractedSalaryData> {
    const completion = await this.qwenClient.chat.completions.create({
      model: "qwen3.5-plus",  // Supports image input natively
      messages: [{
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imageUrl } },
          { type: "text", text: `Extract salary information from this Vietnamese payslip.
Return JSON with: employeeName, employeeId, companyName, payPeriod, 
grossSalary, netSalary, deductions, bankAccount.
Respond ONLY with valid JSON.` }
        ]
      }],
      response_format: { type: "json_object" }
    });
    return JSON.parse(completion.choices[0].message.content);
  }
}
```

### Pattern 2: AI Credit Scoring Engine
**What:** Use Qwen LLM to analyze salary patterns and generate credit scores with explainable reasoning.
**When:** Loan application flow — after salary verification, before loan offer.
**Why:** Core differentiator; showcases AI decision-making for lending risk assessment.

```typescript
class CreditScoringService {
  private qwenClient: OpenAI;
  
  async score(salaryHistory: SalaryRecord[], loanRequest: LoanApplication): Promise<AICreditScore> {
    const prompt = `You are a credit risk analyst for Shinhan Finance Vietnam.
    
Given this salary history and loan request, analyze creditworthiness:

Salary History (last 6 months):
${JSON.stringify(salaryHistory)}

Loan Request:
- Amount: ${loanRequest.requestedAmount} VND
- Tenure: ${loanRequest.tenureMonths} months
- Purpose: ${loanRequest.purpose}

Score the applicant on:
1. Salary stability (0-100): consistency of income
2. Employment tenure (0-100): length of employment
3. Income-to-loan ratio (0-100): can they afford the EMI?
4. Auto-debit capacity (0-100): does net salary support deduction?

Return a JSON credit assessment with score, risk category, factors, 
max recommended amount, and recommended annual interest rate.
Target NPL: <2%. Shinhan lending rate: from 18%/year.`;

    const completion = await this.qwenClient.chat.completions.create({
      model: "qwen3.5-plus",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1,  // Low temperature for consistent scoring
    });
    return JSON.parse(completion.choices[0].message.content);
  }
}
```

### Pattern 3: Multi-Tenant Role-Based Access
**What:** Three distinct user roles with different data access levels — Employee, HR Admin, Shinhan Admin.
**When:** All API endpoints — authentication and authorization layer.
**Why:** Security boundary enforcement; Shinhan admin sees portfolio view, HR sees their enterprise, employee sees only own data.

```typescript
// Role hierarchy
type UserRole = 'employee' | 'hr_admin' | 'shinhan_admin';

interface AuthContext {
  userId: string;
  role: UserRole;
  enterpriseId?: string;    // For employee and HR admin
  employeeId?: string;      // For employee
}

// Data scope per role:
// Employee: own data only (WHERE employeeId = currentUser)
// HR Admin: all employees in their enterprise (WHERE enterpriseId = myEnterprise)
// Shinhan Admin: all data across all enterprises (no filter)
```

### Pattern 4: Payroll-Snapshot Verification
**What:** Capture a point-in-time snapshot of payroll data for each EWA/loan transaction, rather than live queries.
**When:** EWA balance check, loan application — any flow that needs verified salary data.
**Why:** Audit trail; protects against data changes between verification and disbursement.

```typescript
interface PayrollSnapshot {
  id: string;
  employeeId: string;
  capturedAt: Date;
  source: 'hrm_api' | 'ocr_payslip';
  data: {
    monthlySalary: number;
    periodStart: Date;
    periodEnd: Date;
    daysWorked: number;
    grossEarnings: number;
    deductions: number;
    netPay: number;
  };
  verificationStatus: 'pending' | 'ai_verified' | 'cross_validated';
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Direct HRM Calls in Every Request
**What:** Calling the mock HRM system synchronously on every balance check or transaction.
**Why bad:** Slow response times; tight coupling; HRM downtime = platform downtime.
**Instead:** Cache payroll snapshots with periodic sync. Use webhooks or scheduled pulls, not real-time queries. For PoC, refresh on login or every 15 minutes.

### Anti-Pattern 2: Storing Raw AI Responses Without Parsing
**What:** Saving Qwen's raw text output directly to the database.
**Why bad:** Unstructured data is useless for queries, reporting, or cross-validation.
**Instead:** Use `response_format: { type: "json_object" }` to force structured output. Validate the JSON schema before persisting. Store both raw (audit) and parsed (business) versions.

### Anti-Pattern 3: Single Monolithic Dashboard
**What:** One dashboard for all three user types with role-based visibility toggles.
**Why bad:** Different UX paradigms, different workflows, different data density. Employee needs mobile-friendly simplicity; Shinhan admin needs dense analytics.
**Instead:** Three separate view layers (pages/routes) sharing a common design system but with distinct layouts. Even in a monolith, separate the frontend routes clearly.

### Anti-Pattern 4: Skipping Cross-Validation
**What:** Trusting either HRM data or OCR data alone without cross-checking.
**Why bad:** HRM data could be stale; OCR could hallucinate. Either source alone is unreliable.
**Instead:** Always cross-validate OCR extraction against HRM data. Flag discrepancies for manual review (or lower confidence score automatically).

## Qwen AI Integration Architecture

### Models to Use

| Purpose | Model | Why | Confidence |
|---------|-------|-----|------------|
| **OCR / Payslip extraction** | `qwen3.5-plus` | Native image input + text + JSON output. 1M token context. Supports Vietnamese (33 languages). | HIGH — verified from official docs |
| **Credit scoring** | `qwen3.5-plus` | Structured reasoning, JSON output, low-temperature for consistency. Thinking mode for complex analysis. | HIGH — standard LLM use case |
| **General chat/NLP** | `qwen3.5-flash` | Fast, cheap for simple tasks like employment verification queries | HIGH — verified from official docs |
| **Document parsing** | `qwen3.5-plus` | Can parse documents to HTML/Markdown with position info | HIGH — verified from official docs |

### API Integration

```typescript
// Single Qwen client factory — use OpenAI-compatible API
import OpenAI from "openai";

const qwenClient = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
  // Use Beijing region for Vietnam-located demo:
  // baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
});

// Three distinct AI operations:
// 1. OCR Extraction — image → structured JSON
// 2. Credit Scoring — salary data → risk assessment JSON
// 3. Data Validation — cross-check two data sources → confidence score
```

### Key Qwen API Features Used

1. **Structured Output** (`response_format: { type: "json_object" }`) — Forces JSON responses for OCR and credit scoring
2. **Image Input** (native in qwen3.5-plus) — Payslip image → structured salary data extraction
3. **Low Temperature** (0.1-0.3) — Consistent credit scoring decisions
4. **Streaming** — Real-time AI explanation display in dashboard
5. **Thinking Mode** (`enable_thinking: true`) — Complex credit analysis with reasoning chain visible to admin

### Alibaba Cloud Services Map

```
Alibaba Cloud Account
├── Model Studio (Bailian)
│   ├── qwen3.5-plus      — OCR + Credit Scoring + NLP
│   └── qwen3.5-flash     — Fast simple queries
├── ECS / Function Compute — Backend hosting (or Vercel for PoC)
├── OSS                    — Payslip image storage
└── ApsaraDB RDS          — PostgreSQL database (or SQLite for PoC)
```

## Scalability Considerations

| Concern | At 100 users (PoC) | At 10K users (Production) | At 1M users (Scale) |
|---------|--------------|--------------|-------------|
| **Qwen API calls** | Sequential, no caching | Batch scoring, response caching for similar profiles | Pre-scored tiers, async scoring queue |
| **Database** | SQLite / in-memory | PostgreSQL on RDS | Sharded PostgreSQL + read replicas |
| **Payroll sync** | On-demand mock | Scheduled sync per enterprise (hourly) | Event-driven webhooks from HRM |
| **Authentication** | JWT with simple secret | JWT + refresh tokens + Redis sessions | OAuth2 + RBAC + enterprise SSO |
| **Frontend** | Next.js on Vercel free tier | CDN + edge rendering | Multi-region deployment |

## Suggested Build Order

Based on component dependencies and hackathon priorities:

```
Phase 1: Foundation (build first — everything depends on this)
├── Data models & mock data (employees, payroll, enterprises)
├── Auth module (3 roles, JWT)
├── Mock HRM/Payroll API (returns realistic Vietnamese salary data)
└── Qwen AI client setup (API key, base configuration)

Phase 2: EWA Flow (simpler flow — validates architecture)
├── Payroll snapshot service
├── EWA balance calculation
├── EWA withdrawal request flow
├── AI validation (Qwen VL OCR on payslip)
└── Employee portal (EWA views)

Phase 3: Loan Flow (more complex — builds on Phase 2 patterns)
├── AI credit scoring engine (Qwen)
├── Loan application lifecycle
├── Salary verification with cross-validation
├── Loan offer generation & acceptance
└── Employee portal (loan views)

Phase 4: Admin Dashboards
├── HR Admin dashboard (employee roster, EWA usage, policy config)
├── Shinhan Admin dashboard (portfolio, risk analytics, approval queue)
└── Analytics & reporting

Phase 5: Polish & Demo
├── End-to-end demo script
├── Visual polish
├── Pitch deck
└── Architecture documentation
```

**Build order rationale:**
- **Phase 1 first:** Every other phase needs data models, auth, and the Qwen client.
- **Phase 2 before Phase 3:** EWA is simpler (single verification step) — validates the payroll + AI integration pattern before the more complex loan flow.
- **Phase 4 after core flows:** Dashboards are presentation-only; building them before the core flows means stubbing data.
- **Phase 5 last:** Polish only matters after the product works end-to-end.

## Sources

- Alibaba Cloud Model Studio — Qwen API Reference (OpenAI Chat): https://www.alibabacloud.com/help/en/model-studio/qwen-api-via-openai-chat-completions — HIGH confidence
- Alibaba Cloud Model Studio — Image and Video Understanding: https://www.alibabacloud.com/help/en/model-studio/vision — HIGH confidence
- Alibaba Cloud Model Studio — Model List: https://www.alibabacloud.com/help/en/model-studio/getting-started/models — HIGH confidence
- PROJECT.md context for Shinhan Finance product details — HIGH confidence
- EWA/Salary-Linked Lending architecture patterns — MEDIUM confidence (domain expertise, not specific product docs)
