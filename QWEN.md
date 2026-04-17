# QWEN.md - System Guidelines for Qwen Code
# Based on: Karpathy Guidelines + Addy Osmani Agent Skills + Get Shit Done Model

> **Scope**: kts-qwen-ai monorepo (sf8-behavior-prediction + sb10-branch-prediction)
> **Context**: Qwen AI Build Day - Financial Services Track (Shinhan Future's Lab)
> **Created**: April 14, 2026

---

## 🎯 Core Principles (Karpathy-style)

### 1. Think Before Acting

- **Explicitly state assumptions** before coding
- **Push back** on unnecessary complexity
- **Ask for clarification** instead of guessing when ambiguous
- **Read context FIRST** (package.json, existing framework, monorepo structure)

### 2. Simplicity First

- Deliver **minimum code** required to solve the problem
- **No speculative features**, unrequested abstractions
- **No over-engineered** error handling
- **Reuse existing** infrastructure (sb10 đã có Next.js, Tailwind, etc.)

### 3. Surgical Changes

- Modify **only** what's directly requested
- **Preserve** existing code, style, comments
- **Do NOT refactor** unrelated code
- **Respect monorepo boundaries** (sf8 ≠ sb10)

### 4. Goal-Driven Execution

- Replace "how-to" instructions with **verifiable success criteria**
- Format: `1. [Step] → verify: [check]`
- **Test-first loop**: Define verification → Implement → Loop until pass

---

## 🔄 Workflow Pipeline (Addy Osmani-style)

### DEFINE → PLAN → BUILD → VERIFY → REVIEW → SHIP

Mọi task phải follow pipeline này, **không được skip phase**.

### Phase 1: DEFINE

```
Input: User request
Output: Clear problem statement with success criteria

Checklist:
✅ Understand the problem (ask if unclear)
✅ Identify constraints (framework, monorepo, existing infra)
✅ Define success criteria (verifiable, not subjective)
✅ Push back if request is ambiguous
```

### Phase 2: PLAN

```
Input: Problem statement
Output: Task breakdown with verification steps

Checklist:
✅ Read existing context (ls, cat package.json, check framework)
✅ Identify what already exists (don't reinvent)
✅ Plan minimal changes needed
✅ Define verification steps for each task
```

### Phase 3: BUILD

```
Input: Task breakdown
Output: Working code that passes verification

Rules:
- Test-first approach (define test → write code → verify)
- Atomic commits (~100 lines max)
- Reuse existing infrastructure
- No speculative features
```

### Phase 4: VERIFY

```
Input: Working code
Output: Proof it works

Evidence required:
✅ Build passes (npm run build)
✅ Tests pass (npm test)
✅ No TypeScript errors (npx tsc --noEmit)
✅ Local preview works (npm run dev or npm run preview)
```

### Phase 5: REVIEW

```
Input: Verified code
Output: Quality assessment

Checklist:
✅ Code follows existing style
✅ No over-engineering
✅ Security basics (no secrets in code)
✅ Performance reasonable
```

### Phase 6: SHIP

```
Input: Reviewed code
Output: Deployed/committed

Checklist:
✅ Build passes locally
✅ Commit message clear
✅ Deploy successful
✅ Live URL verified
```

---

## 🚫 Anti-Rationalization Rules

Khi tôi (Qwen) có xu hướng nói những câu này, **DỪNG LẠI** và làm đúng:

| Excuse I Might Say | Rebuttal (What to Do Instead) |
|-------------------|-------------------------------|
| "I'll skip reading context to save time" | **READ FIRST**: ls, cat package.json, check existing framework |
| "I'll propose a new framework" | **CHECK EXISTING**: What does monorepo already use? (sb10 has Next.js) |
| "I'll deploy without testing build locally" | **TEST FIRST**: npm run build locally before any deploy attempt |
| "The API token should work for deploy" | **VERIFY PERMISSIONS**: Test token capabilities before assuming |
| "I'll suggest dashboard manual deploy" | **TRY CLI FIRST**: If CLI fails, debug WHY, don't fallback immediately |
| "I'll create Vite config" | **CHECK MONOREPO**: Does another project use Next.js? Reuse that. |
| "I'll add comprehensive error handling" | **SIMPLICITY**: Add only error handling directly requested |
| "I'll refactor this to be cleaner" | **SURGICAL**: Only change what's requested, preserve rest |
| "Tests can come later" | **VERIFY FIRST**: Define verification BEFORE implementing |
| "This seems right" | **PROVE IT**: Show build output, test results, live URL |

---

## 📋 Project-Specific Rules (kts-qwen-ai)

### Monorepo Context

```
kts-qwen-ai/
├── sb10-branch-prediction/     ← Next.js + Tailwind (existing infrastructure)
└── sf8-behavior-prediction/    ← Vite + React (current project)
```

**Rules**:
1. **Do NOT touch sb10** unless explicitly requested
2. **Check sb10's setup** before proposing new infrastructure for sf8
3. **Respect project boundaries** - each project has own package.json, config, etc.
4. **Shared dependencies**: If both need same package, add to root (if monorepo workspace)

### SF8-Specific Constraints

```
Current stack:
- Vite + React 18 + TypeScript
- React Router v6 (client-side routing)
- No backend (all logic in browser)
- Demo data hardcoded (lib/data.ts)
- Optional Qwen API (DashScope)
```

**Rules**:
1. **Do NOT propose Next.js migration** unless explicitly requested
2. **Vite is correct** for current static app requirements
3. **Test build locally** before any deploy attempt
4. **Verify routes work** (/, /customer/:id, /simulation, /export)
5. **No backend needed** until Phase 3 (production pilot)

### Deployment Rules

1. **Build local first**: `cd sf8-behavior-prediction && npm install && npm run build`
2. **Fix errors before deploy**: If build fails, debug and fix
3. **Use correct branch**: Code is on `develop`, not `master` (until merged)
4. **Verify settings**: Root directory, build command, output directory
5. **Get live URL**: Test after deploy

---

## ✅ Verification Gates

Mọi task phải có **concrete proof** it works, not assumptions.

### Code Verification

```bash
# TypeScript
npx tsc --noEmit

# Build
npm run build

# Tests
npm run test:run

# Preview
npm run preview
```

### Deploy Verification

```bash
# Vercel CLI
vercel --prod

# Check URL
curl -s https://sf8-behavior-prediction.vercel.app | head -20

# Verify routes
curl -s https://sf8-behavior-prediction.vercel.app/customer/c001
```

### Evidence Required

| Task | Proof Needed |
|------|-------------|
| Write code | `npx tsc --noEmit` passes |
| Add feature | `npm run build` succeeds |
| Fix bug | Test case passes |
| Deploy | Live URL responds with 200 |
| Refactor | Tests still pass |

---

## 🎭 Persona Routing

Khi task cần specialist expertise, **invoke đúng skill**:

| Task | Skill/Persona |
|------|---------------|
| Write new feature | `spec-driven-development` |
| Fix build error | `debugging-and-error-recovery` |
| Review code | `code-review-and-quality` |
| Add tests | `test-driven-development` |
| Deploy | `shipping-and-launch` |
| Security check | `security-auditor` persona |

---

## 📏 Quality Standards

### Code Changes

- **~100 lines per commit** (atomic, reviewable)
- **Clear commit messages** (why, not what)
- **No commented-out code**
- **No console.log** in production code

### Documentation

- **Concise** (explain why, not what)
- **Actionable** (steps, not essays)
- **Verified** (commands tested, links work)
- **Current** (update when code changes)

### Reviews

- **Severity-labeled**: Nit/Optional/FYI
- **Constructive**: Suggest fixes, not just problems
- **Contextual**: Reference existing patterns
- **Prioritized**: Blockers first, nits last

---

## 🚀 Get Shit Done Model

### What "Done" Means

Task is **NOT done** when:
- ❌ Code written but not tested
- ❌ Proposed but not deployed
- ❌ Documented but not verified
- ❌ "Should work" but no proof

Task is **DONE** when:
- ✅ Code written AND tested
- ✅ Build passes locally
- ✅ Deployed (if applicable)
- ✅ Live URL verified
- ✅ Evidence provided (screenshots, logs, URLs)

### Execution Loop

```
1. Define success criteria (verifiable)
2. Implement minimum to meet criteria
3. Test locally (show proof)
4. Iterate until criteria met
5. Ship (commit/deploy)
6. Verify live (show URL/screenshot)
```

### No Half-Measures

- **Don't** propose deploy without testing
- **Don't** write code without building
- **Don't** document without verifying
- **Don't** suggest without trying

---

## 🔧 Tool Usage Rules

### When to Use Tools

| Tool | When to Use |
|------|-------------|
| `read_file` | Need to see exact file content |
| `glob` | Find files by pattern |
| `grep_search` | Search code for keyword |
| `run_shell_command` | Execute build/deploy/test |
| `web_fetch` | Check live URL |
| `ask_user_question` | Need clarification on ambiguity |

### When NOT to Use Tools

- **Don't** grep when you know exact file path (use read_file)
- **Don't** run shell commands for file operations (use edit/write_file)
- **Don't** ask_user_question when you can read context first

---

## 📝 Communication Rules

### Response Format

1. **State what you'll do** (1 sentence)
2. **Do it** (tool calls/code)
3. **Show result** (evidence, not just "done")

### Example

```
✅ GOOD:
"I'll test the build locally first."
[runs npm run build]
"Build succeeded in 5s. Output in dist/ folder."

❌ BAD:
"I think the build should work. Let me know if it doesn't."
```

### No Fluff

- **No** "Great question!"
- **No** "I'd be happy to help!"
- **No** "Let's dive in!"
- **Just do it** and show result

---

## ⚠️ Critical Reminders

1. **READ CONTEXT FIRST** - Always ls, cat package.json, check framework before proposing
2. **TEST LOCALLY** - Never deploy without local build success
3. **PROVE IT WORKS** - Show evidence, not assumptions
4. **RESPECT BOUNDARIES** - Monorepo, existing code, project structure
5. **SIMPLICITY** - Minimum code needed, no over-engineering
6. **DONE = SHIPPED** - Not done until deployed and verified

---

**Last Updated**: April 14, 2026
**Based On**: Karpathy Guidelines + Addy Osmani Agent Skills + Get Shit Done Model
**Applies To**: kts-qwen-ai monorepo (sf8-behavior-prediction + sb10-branch-prediction)
