# GAP Analysis: Hive vs kts-qwen-ai

> **Date**: April 14, 2026
> **Reference**: https://github.com/aden-hive/hive
> **Target**: kts-qwen-ai (sf8-behavior-prediction)

---

## 🔍 So sánh tổng quan

| Tiêu chí | Hive (Reference) | kts-qwen-ai (Current) | Gap |
|----------|------------------|-----------------------|-----|
| **Type** | Multi-agent runtime harness | Hackathon PoC (SF8 + SB10) | ✅ Different purpose |
| **Language** | Python 91.8%, TypeScript 5% | TypeScript 100% | ⚠️ Different stack |
| **Core Engine** | Queen Bee + Worker Bees | Deterministic scoring + Qwen (optional) | 🔴 Missing agent orchestration |
| **LLM Integration** | LiteLLM router (multi-provider) | Qwen API only (optional, not core) | 🔴 Not using Qwen as core |
| **Tool Protocol** | MCP (Model Context Protocol) | None | 🔴 Missing MCP |
| **Observability** | WebSocket streaming, live dashboard | None | 🔴 Missing |
| **Crash Recovery** | Checkpoint-based | None | ⚠️ Not needed for PoC |
| **Human-in-loop** | Intervention nodes | None | ⚠️ Not needed for PoC |
| **Agent Instructions** | AGENTS.md, CLAUDE.md, .cursorrules | QWEN.md, SOP.md (new) | ✅ Created |
| **Code Quality** | ruff, pre-commit hooks, Makefile | vitest, TypeScript | ✅ Adequate |
| **Quickstart** | quickstart.sh/.ps1 (one-command setup) | Manual npm install | 🔴 Missing setup script |
| **MCP Config** | .mcp.json (tool registry) | None | 🔴 Missing |
| **Examples** | examples/ directory with templates | None (demo data hardcoded) | 🔴 Missing examples |
| **Docs** | docs/ with architecture, API refs | DEPLOYMENT.md, USER-GUIDE.md | ⚠️ Different scope |
| **CLI** | hive/hive.ps1 entry points | None | 🔴 Missing CLI |
| **Makefile** | make lint, make check, make format | npm scripts only | ⚠️ Adequate |
| **Security** | Encrypted credential store | .env only | ⚠️ Adequate for PoC |
| **Browser Automation** | Browser-Use integration | None | ❌ Not needed |
| **Docker** | .dockerignore | None | ⚠️ Not needed yet |
| **CI/CD** | .github/ workflows | None (Vercel auto-deploy) | ⚠️ Adequate |

---

## 🔴 GAPS CRITICAL (Must Fix for Production)

### 1. **Qwen API không phải là core scoring engine**

**Hive có**: LiteLLM router → Gọi bất kỳ LLM nào → Queen Bee generates agent graph

**kts-qwen-ai hiện tại**: 
```typescript
// lib/scoring.ts
// Deterministic scoring với hardcoded weights
// Qwen API chỉ dùng cho explanation (optional)
```

**Phải làm**: 
- Dùng Qwen API làm **core scoring engine**
- Gửi alternative data → Qwen phân tích → Trả về scores + reasoning
- Hoặc: Hybrid (Qwen optimize weights, deterministic compute)

---

### 2. **Không có MCP (Model Context Protocol) integration**

**Hive có**: 
- `.mcp.json` config
- MCP server/tool registry
- Tools cho CRM, APIs, databases

**kts-qwen-ai hiện tại**: 
- Không có MCP
- Data hardcoded trong lib/data.ts
- Không có tool registry

**Phải làm**:
- Tạo MCP config cho Qwen
- Register tools: `score_customer`, `recommend_product`, `simulate_whatif`
- Enable Qwen gọi tools để phân tích data

---

### 3. **Không có observability/monitoring**

**Hive có**:
- WebSocket streaming
- Live execution dashboard
- Cost tracking, token usage
- Decision logs

**kts-qwen-ai hiện tại**:
- Không có monitoring
- Không có cost tracking
- Không có decision logs

**Phải làm** (cho Phase 3):
- Add logging for Qwen API calls
- Track token usage/cost
- Save scoring decisions to Supabase
- Build analytics dashboard

---

### 4. **Không có quickstart/setup script**

**Hive có**:
```bash
./quickstart.sh  # One-command setup
```

**kts-qwen-ai hiện tại**:
```bash
npm install      # Manual
npm run dev      # Manual
```

**Phải làm**:
```bash
# quickstart.sh
#!/bin/bash
npm install
cp .env.example .env
npm run build
echo "Ready! Run: npm run dev"
```

---

### 5. **Không có CLI entry point**

**Hive có**:
```bash
hive "Score this customer"  # Natural language command
```

**kts-qwen-ai hiện tại**:
- Không có CLI
- Chỉ có web UI

**Phải làm** (cho Phase 2-3):
```bash
sf8 score --file customers.csv
sf8 simulate --customer c001 --variable partner_channel --value high
sf8 export --format pdf --output report.pdf
```

---

### 6. **Không có examples/ directory**

**Hive có**:
```
examples/
├── basic_agent.py
├── multi_agent_workflow.py
└── tool_usage_example.py
```

**kts-qwen-ai hiện tại**:
- Không có examples
- Demo data hardcoded

**Phải làm**:
```
examples/
├── score-single-customer.json
├── score-batch-csv.json
├── what-if-simulation.json
└── product-recommendation.json
```

---

### 7. **Không có data pipeline (CSV/API → Score)**

**Hive có**:
- Tool registry → Connect to CRM, APIs, databases
- Agent graph → Process data through multiple nodes

**kts-qwen-ai hiện tại**:
- Data hardcoded trong lib/data.ts
- Không có CSV import
- Không có API endpoint để nhận data

**Phải làm**:
```
Input (CSV/API)
  ↓
Parse & Validate
  ↓
Transform to scoring format
  ↓
Qwen API → Analyze & Score
  ↓
Save results (JSON/Supabase)
  ↓
Frontend displays
```

---

### 8. **Không có human-in-the-loop**

**Hive có**:
- Intervention nodes
- Configurable timeouts/escalation
- Queen Bee monitors worker progress

**kts-qwen-ai hiện tại**:
- Fully automated scoring
- Không có human review step
- Không có escalation path

**Phải làm** (cho Phase 3):
```
Score computed
  ↓
If confidence < threshold → Flag for human review
  ↓
Human reviews & approves/adjusts
  ↓
Final score saved
```

---

## ⚠️ GAPS MODERATE (Should Fix)

### 9. **Không có pre-commit hooks**

**Hive có**:
```yaml
# .pre-commit-config.yaml
- ruff check
- ruff format
- type checking
```

**kts-qwen-ai hiện tại**:
- Không có pre-commit hooks
- Chỉ có npm scripts

**Phải làm**:
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test:run"
    }
  }
}
```

---

### 10. **Không có Makefile**

**Hive có**:
```makefile
make lint      # Auto-fix
make check     # Verify without modifying
make format    # Apply formatting
```

**kts-qwen-ai hiện tại**:
```json
// package.json scripts
{
  "test": "vitest",
  "build": "tsc && vite build"
}
```

**Phải làm** (optional):
```makefile
.PHONY: lint test build deploy

lint:
	npx tsc --noEmit
	npm run test:run

test:
	npm run test:run

build:
	npm run build

deploy:
	vercel --prod
```

---

### 11. **Không có encrypted credential store**

**Hive có**:
```
~/.hive/credentials  # Encrypted
```

**kts-qwen-ai hiện tại**:
```
.env  # Plain text
```

**Phải làm** (cho production):
- Use OS keychain
- Or encrypt .env file
- Or use Vercel env vars (already doing this)

---

## ✅ GAPS ACCEPTABLE (Not Needed for PoC)

| Gap | Why Not Needed |
|-----|----------------|
| **Crash Recovery** | PoC runs in browser, no long-running processes |
| **Browser Automation** | Not doing web tasks |
| **Docker** | Vercel deployment doesn't need it |
| **Multi-agent orchestration** | Single scoring engine, not multi-agent |
| **Parallel execution** | Scoring is fast, no need for parallelism |
| **Dynamic graph generation** | Fixed scoring pipeline, not dynamic |

---

## 📋 Priority Action Plan

### 🔴 CRITICAL (Do NOW - Phase 1-2)

| # | Task | Priority | Effort |
|---|------|----------|--------|
| 1 | **Dùng Qwen API làm core scoring** (không chỉ explanation) | P0 | 4 giờ |
| 2 | **Xây data pipeline**: CSV → Parse → Score → Output | P0 | 3 giờ |
| 3 | **Fix mockup** → Real data flow (load từ file/API) | P0 | 2 giờ |
| 4 | **Thêm MCP config** cho Qwen tool usage | P1 | 2 giờ |
| 5 | **Tạo quickstart.sh** (one-command setup) | P1 | 30 phút |

---

### ⚠️ IMPORTANT (Do LATER - Phase 3)

| # | Task | Priority | Effort |
|---|------|----------|--------|
| 6 | Build CLI entry point (`sf8 score --file ...`) | P1 | 2 giờ |
| 7 | Add examples/ directory | P2 | 1 giờ |
| 8 | Add observability (logging, cost tracking) | P1 | 3 giờ |
| 9 | Add human-in-the-loop (confidence threshold) | P2 | 2 giờ |
| 10 | Add pre-commit hooks | P2 | 30 phút |

---

### ✅ NICE TO HAVE (Future)

| # | Task | Priority | Effort |
|---|------|----------|--------|
| 11 | Add Makefile | P3 | 30 phút |
| 12 | Add encrypted credential store | P3 | 1 giờ |
| 13 | Add Docker support | P3 | 1 giờ |
| 14 | Add CI/CD workflows | P3 | 1 giờ |

---

## 🎯 Tóm lại: kts-qwen-ai còn thiếu gì so với Hive?

### Core Architecture Gaps:
1. **Qwen không phải core engine** → Phải sửa
2. **Không có MCP** → Phải thêm
3. **Không có data pipeline** → Phải xây
4. **Không có observability** → Phải track

### Workflow Gaps:
5. **Không có quickstart script** → Phải tạo
6. **Không có CLI** → Nên có
7. **Không có examples** → Nên có
8. **Không có human-in-loop** → Nên có cho production

### Quality Gaps:
9. **Không có pre-commit hooks** → Nên thêm
10. **Không có Makefile** → Optional

---

**Kết luận**: kts-qwen-ai đang là **PoC mockup** với hardcoded data và deterministic scoring. Để đạt production-ready như Hive, cần:
1. **Qwen API làm core** (không phải optional)
2. **Data pipeline** (CSV/API → Score → Output)
3. **MCP integration** (tool registry)
4. **Observability** (logging, monitoring)

Bạn muốn tôi bắt đầu với gap nào trước? 🎯
