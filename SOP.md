# SOP (Standard Operating Procedure) - kts-qwen-ai Development

> **Applies to**: All AI agents working on kts-qwen-ai monorepo
> **Based on**: Get Shit Done Model + Agent Skills Best Practices

---

## 🎯 Golden Rules

### Rule 1: Context Before Action

```bash
# BEFORE proposing ANY solution:
ls -la                          # Check structure
cat package.json                # Check dependencies/framework
cat vite.config.ts              # Or next.config.js, etc.
ls lib/                         # What already exists?
```

**Never skip this step.**

---

### Rule 2: Build Local First

```bash
# BEFORE attempting deploy:
cd sf8-behavior-prediction
npm install
npm run build

# Verify:
ls dist/                        # Check output
npm run preview                 # Test locally
```

**No deploy without local build success.**

---

### Rule 3: Test Before Commit

```bash
# BEFORE committing:
npx tsc --noEmit                # TypeScript check
npm run test:run                # Run tests
npm run build                   # Build check

# Only commit if ALL pass
```

**No broken commits.**

---

### Rule 4: Deploy Only When Ready

```bash
# Prerequisites:
✅ Local build succeeds
✅ Tests pass
✅ TypeScript clean
✅ Preview works locally
✅ Correct branch (develop, not master)
✅ Settings configured (root dir, build cmd, output)

# Then deploy
vercel --prod                   # Or trigger via dashboard
```

---

### Rule 5: Verify After Deploy

```bash
# AFTER deploy:
✅ Get live URL
✅ Test main route (/)
✅ Test key routes (/customer/c001, /simulation, /export)
✅ Check console for errors
✅ Share URL with stakeholder
```

---

## 📋 Task Workflows

### Workflow A: Add New Feature

```
1. DEFINE
   - What problem are we solving?
   - What does success look like? (verifiable)
   - Any constraints? (framework, existing patterns)

2. PLAN
   - Read existing code (context)
   - Identify where to add
   - Minimal changes needed
   - Define verification steps

3. BUILD
   - Write code (surgical, minimal)
   - Follow existing style
   - No speculative features

4. VERIFY
   - npx tsc --noEmit
   - npm run build
   - npm run test:run
   - npm run preview (manual test)

5. SHIP
   - git add <files>
   - git commit -m "clear message"
   - git push
   - Verify deploy successful
```

---

### Workflow B: Fix Build Error

```
1. READ ERROR
   - Paste full error log
   - Identify root cause (not symptoms)

2. READ CONTEXT
   - cat package.json (dependencies)
   - cat config file (vite.config.ts, etc.)
   - Check imports in failing file

3. DIAGNOSE
   - What's missing? (package, config, type)
   - What's misconfigured? (path, plugin, option)
   - What's conflicting? (version, type mismatch)

4. FIX (Surgically)
   - Add missing package
   - Fix config
   - Correct type/import
   - ONLY change what's needed

5. VERIFY
   - npm run build (must succeed)
   - npx tsc --noEmit (no errors)
   - npm run preview (works locally)
```

---

### Workflow C: Deploy to Vercel

```
1. PRE-DEPLOY CHECK
   ✅ Local build: npm run build → success
   ✅ TypeScript: npx tsc --noEmit → clean
   ✅ Tests: npm run test:run → pass
   ✅ Preview: npm run preview → works
   ✅ Branch: git branch → on correct branch
   ✅ Pushed: git status → nothing to commit

2. CONFIGURATION CHECK
   ✅ Vercel project linked
   ✅ Root directory set correctly
   ✅ Build command correct
   ✅ Output directory correct
   ✅ Environment variables set (if needed)

3. DEPLOY
   vercel --prod --token <token>

4. POST-DEPLOY VERIFY
   ✅ Get live URL
   ✅ Test main route
   ✅ Test key routes
   ✅ Check for errors
   ✅ Share URL
```

---

### Workflow D: Code Review

```
1. READ CHANGES
   - git diff HEAD~1
   - Understand what changed and why

2. CHECK QUALITY
   - Follows existing style?
   - No over-engineering?
   - Clear variable/function names?
   - No commented-out code?

3. CHECK SAFETY
   - No secrets in code?
   - Input validation present?
   - Error handling appropriate?

4. CHECK PERFORMANCE
   - Any obvious bottlenecks?
   - Unnecessary dependencies?
   - Bundle size impact?

5. FEEDBACK (Severity-labeled)
   - [Blocker] Must fix before merge
   - [Optional] Suggest improvement
   - [Nit] Minor style issue
   - [FYI] Observation only
```

---

## 🚫 Anti-Patterns (Never Do These)

### ❌ Bad Pattern 1: Propose Without Reading Context

```
❌ BAD: "Let's use Vite for this project"
   (Without checking if monorepo already uses Next.js)

✅ GOOD: "I see sb10 uses Next.js. Should sf8 use the same,
   or is Vite intentional for this static app?"
```

---

### ❌ Bad Pattern 2: Deploy Without Testing

```
❌ BAD: "Let's deploy and see if it works"
   (No local build test first)

✅ GOOD: "Local build succeeded. Tests passed.
   Now deploying to Vercel..."
```

---

### ❌ Bad Pattern 3: Fix Without Understanding

```
❌ BAD: "I'll add @ts-ignore to fix this"
   (Suppressing error without understanding cause)

✅ GOOD: "TypeScript error because X is missing.
   I'll add the type definition properly."
```

---

### ❌ Bad Pattern 4: Over-Engineer

```
❌ BAD: "I'll add a full auth system with JWT, refresh tokens,
   rate limiting, audit logs, etc."
   (When user just asked for a demo login)

✅ GOOD: "I'll add a simple demo login.
   Full auth system can be Phase 2."
```

---

### ❌ Bad Pattern 5: Half-Measures

```
❌ BAD: "I wrote the code but didn't test it.
   Can you verify?"

✅ GOOD: "Code written, tested locally (tests pass),
   build succeeds. Ready for review."
```

---

## ✅ Quality Gates

### Gate 1: Code Complete

```
Required evidence:
✅ npx tsc --noEmit → 0 errors
✅ npm run build → success
✅ npm run test:run → all pass
```

---

### Gate 2: Ready for Review

```
Required evidence:
✅ Gate 1 passed
✅ Code follows existing style
✅ No secrets in code
✅ Commit message clear
✅ PR/commit includes what/why
```

---

### Gate 3: Ready for Deploy

```
Required evidence:
✅ Gate 2 passed
✅ npm run preview → works locally
✅ Routes tested (/, /customer/:id, /simulation, /export)
✅ Environment variables set (if needed)
✅ Vercel settings correct (root dir, build cmd, output)
```

---

### Gate 4: Deployed

```
Required evidence:
✅ Gate 3 passed
✅ Live URL responds with 200
✅ Main route (/) works
✅ Key routes work
✅ No console errors
✅ Stakeholder notified with URL
```

---

## 📊 Metrics of Success

### What "Done" Looks Like

| Task | Done When |
|------|-----------|
| Write feature | Build passes + tests pass + preview works |
| Fix bug | Root cause identified + fix verified + no regression |
| Deploy | Live URL works + routes tested + shared with stakeholder |
| Refactor | Tests still pass + no behavior change + reviewed |
| Document | Commands tested + links verified + current with code |

---

### What "Not Done" Looks Like

| Task | Not Done When |
|------|---------------|
| Write feature | Code written but build fails |
| Fix bug | Error suppressed but root cause unknown |
| Deploy | Deploy attempted but URL not verified |
| Refactor | Code changed but tests broken |
| Document | Written but commands/links not tested |

---

## 🔧 Tools & Commands Quick Reference

### Essential Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview                # Preview production build

# Quality
npx tsc --noEmit              # TypeScript check
npm run test:run              # Run tests once
npm run test:coverage         # Run with coverage

# Git
git status                     # Check state
git add <files>               # Stage files
git commit -m "message"       # Commit
git push                      # Push to remote

# Deploy
vercel --prod                 # Deploy to Vercel
vercel ls                     # List deployments
```

### Quick Checks

```bash
# Is build working?
npm run build && echo "✅ Build OK" || echo "❌ Build FAIL"

# Are types OK?
npx tsc --noEmit && echo "✅ Types OK" || echo "❌ Types FAIL"

# Are tests passing?
npm run test:run && echo "✅ Tests OK" || echo "❌ Tests FAIL"

# Is deploy working?
curl -s -o /dev/null -w "%{http_code}" https://sf8-behavior-prediction.vercel.app
```

---

## 📞 Escalation

### When to Ask User for Help

1. **Ambiguous request** - Can't determine what's needed
2. **Blocked by permissions** - Token, API access, etc.
3. **Architecture decision** - Framework, pattern, approach choice
4. **Scope clarification** - What's in/out of scope
5. **Priority conflict** - Multiple things need attention

### When NOT to Ask

1. **Can read context** - ls, cat, grep first
2. **Can test locally** - Try before asking
3. **Can debug error** - Read error log, identify root cause
4. **Can follow existing pattern** - Check sb10 for reference
5. **Can verify independently** - Test routes, build, etc.

---

**Last Updated**: April 14, 2026
**Applies To**: All AI agents working on kts-qwen-ai
**Review Cadence**: Update when workflow changes or new patterns emerge
