# Agentic Elephant Carpaccio 🐘

> **A hands-on training exercise exploring AI-assisted development through thin vertical slices**

## The Scenario

We've built a great product and Sales have beaten all expectations—signing customers far beyond our expectations. We now have a backlog of customers waiting to be onboarded.

To get the product to market fast, we deferred tooling and self-service onboarding. The product needs **a LOT of complex setup** to work 🤦‍♂️. Now the CS team is overloaded and can't keep up.

**We only get paid once customers are provisioned and fully set up successfully.**

### Your Mission

Build an internal tool that helps CS clear the onboarding queue faster.

**What's the smallest thing you can give them NOW?**

---

## Quick Start

```bash
# Install all dependencies (root, server, client)
npm run install:all

# Start the app (runs both server and client)
npm start
```

Then open **http://localhost:5173** in your browser.

### Other Commands

| Command | Description |
|---------|-------------|
| `npm start` | Run full app (server + client) |
| `npm run server` | Run backend only (port 3001) |
| `npm run client` | Run frontend only (port 5173) |
| `npm run test:unit` | Run unit tests |
| `npm run test:e2e` | Run Playwright e2e tests |

### VSCode/Cursor/Windsurf

Press **F5** to launch the app with debugging enabled. See `.vscode/launch.json` for available configurations.

---

## Session Structure (60 minutes)

### Introduction & Framing

- This is **NOT** a coding competition
- You (probably) will **NOT finish the app** — that's intentional
- Success = *earliest usable value*, not completeness
- Huge Success = earliest usable value + fastest expansion in completeness
- **AI writes ALL code** — you decide what matters

**Elephant Carpaccio principles:**
- Thin slices
- Working software over completeness
- Tool MUST work at every iteration
- Always deliver something demonstrably more useful at each iteration

### Build Time (5 × 8-minute sprints)

**Rules:**
- Start from this base repo (fork for tools like Devin)
- Use any mix of AI & traditional tools
- Follow any methodology: TDD, manual testing, let users test in prod
- You own operations after sprint 1 — any regression reports from CS (facilitator) MUST be addressed over features
- The clock never stops: plan, implement, and demo within each sprint

### Demos & Reflection

Demo **whatever you reached**, no matter how small.

**Reflection questions:**
- What was your *first* valuable slice?
- Where did AI accelerate you most?
- Where did it *not* help?
- What did you *not* build that you normally would?
- How did your workflow differ from your company's accepted norms?
- How comfortable are you that the company keeps using this tool so it can pay you?
- What would your next slice be with 10 more minutes?

---

## What's in This Repo

### Running Skeleton App
- ✅ App boots with single command
- ✅ Single page loads with "Onboarding Dashboard" heading

### Navigation Scaffold
- ✅ Dashboard (shows onboarding queue)
- ✅ Customer Info (placeholder)
- ✅ Data Mapping (placeholder)
- ✅ Tenant Setup (placeholder)
- ✅ Import (placeholder)

### Example Domain Models

```javascript
Customer {
  id, name, industry, region, contactEmail, createdAt
}

Tenant {
  id, customerId, status, plan, createdAt
}

OnboardingStep {
  id, name, status, order
}
```

### Seed Data
- 1 example customer: **Acme Corporation**
- 1 example onboarding state at 0% progress

### Progress Indicator
- ✅ Static checklist showing all steps as pending
- ✅ Progress bar at 0%

### Test Structure
- ✅ Unit tests: `npm run test:unit`
- ✅ E2E tests: `npm run test:e2e`

---

## Tech Stack

Intentionally boring and fast:

- **Frontend:** React 18 + Vite
- **Backend:** Express.js
- **Storage:** In-memory only (no database)
- **Auth:** None
- **Styling:** Minimal CSS

---

## The Onboarding Process

> The full workflow involves:
>
> 1. **Collecting customer information** — validate and normalize data
> 2. **Data mapping** — map customer needs to platform configuration
> 3. **Tenant provisioning** — create and configure customer tenant
> 4. **Data import** — import customer data into the platform
>
> The process is complex, but customers want value **as early as possible**.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/customers` | List all customers |
| GET | `/api/customers/:id` | Get customer by ID |
| GET | `/api/customers/:id/onboarding` | Get onboarding state |
| GET | `/api/onboarding` | Dashboard view (all states + customer info) |
| GET | `/api/tenants/:customerId` | Get tenant by customer ID |

---

## License

MIT — use freely for training and educational purposes.