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

## Quick Start (Dev Container — recommended for the workshop)

> **Two ways to get started:** use the Dev Container below (nothing to install but Docker + VS Code), or develop directly on your machine with a single `just setup` — see [Quick Start (without a Dev Container)](#quick-start-without-a-dev-container).

This repo ships a preconfigured [Dev Container](https://containers.dev/) so every participant gets an identical, ready-to-run environment (Node 20, all dependencies, Playwright browsers) with **no local setup** beyond Docker + VS Code.

### One-time prerequisites (Windows & Mac)

1. **Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)** and make sure it is **running** (whale icon in the tray/menu bar).
   - **Windows:** Docker Desktop uses the WSL 2 backend. If prompted during install, accept the WSL 2 installation and reboot. No other config is needed.
   - **Mac:** Works on both Apple Silicon (M1/M2/M3) and Intel — Docker Desktop picks the right image automatically.
2. **Install [VS Code](https://code.visualstudio.com/)**.
3. **Install the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)** (`ms-vscode-remote.remote-containers`).

### Open the app in the Dev Container

1. Clone the repo and open the folder in VS Code:
   - **Windows (PowerShell):**
     ```powershell
     git clone https://github.com/HgGenAIHive/OnboardingSampleApp.git
     cd OnboardingSampleApp
     code .
     ```
   - **Mac (Terminal):**
     ```bash
     git clone https://github.com/HgGenAIHive/OnboardingSampleApp.git
     cd OnboardingSampleApp
     code .
     ```
     > On Mac, if the `code` command isn't found, open VS Code and run **Shell Command: Install 'code' command in PATH** from the Command Palette (`Cmd+Shift+P`).
2. When VS Code shows the **"Reopen in Container"** popup (bottom-right), click it. If you miss it, open the Command Palette (**Windows:** `Ctrl+Shift+P` / **Mac:** `Cmd+Shift+P`) and run **Dev Containers: Reopen in Container**.
3. The first build takes a few minutes (it pulls the image, installs all dependencies, and installs the Playwright browser). Subsequent opens are fast.
4. Once the container is ready, open a terminal in VS Code (**Windows:** `` Ctrl+` `` / **Mac:** `` Ctrl+` ``) and run:
   ```bash
   npm start
   ```
5. VS Code automatically **forwards ports 5173 and 3001** from the container to your machine and offers to open the browser. Open **http://localhost:5173** on your host (Windows or Mac) — it just works, no manual port mapping required.

You can also press **F5** inside the container to launch with the debugger attached (see `.vscode/launch.json`).

> **Tip:** Everything (deps, tests, git) runs *inside* the container, so your Windows/Mac machine stays clean. To stop, close the VS Code window or run **Dev Containers: Reopen Folder Locally**.

---

## Quick Start (without a Dev Container)

### Option 1: `just setup` (recommended)

One command installs every dependency (root, server, client) and the Playwright Chromium browser used by the e2e tests.

**Prerequisites**

1. **[Node.js](https://nodejs.org/) 20.19+ or 22.12+** (includes npm; any current LTS works). `just setup` checks the version and stops with a clear message if it is unsupported.
2. **[just](https://just.systems/man/en/packages.html)**, the command runner:
   - **Mac:** `brew install just`
   - **Windows:** `winget install --id Casey.Just --exact` (or `scoop install just`)
   - **Linux:** your package manager (e.g. `sudo apt install just` on Ubuntu 24.04+), or `cargo install just`

**Set up and run**

```bash
git clone https://github.com/HgGenAIHive/OnboardingSampleApp.git
cd OnboardingSampleApp

just setup   # install all dependencies + Playwright Chromium
just start   # run server (3001) and client (5173)
```

Then open **http://localhost:5173** in your browser.

> **Linux:** `just setup` runs `playwright install --with-deps`, which installs Chromium's system libraries and may prompt for your `sudo` password.

Run `just` with no arguments to list every recipe.

### Option 2: npm only

If you'd rather not install `just`:

```bash
# Install all dependencies (root, server, client)
npm run install:all

# Install the Playwright browser (needed for e2e tests only)
npx playwright install chromium

# Start the app (runs both server and client)
npm start
```

Then open **http://localhost:5173** in your browser.

### Other Commands

| just | npm | Description |
|------|-----|-------------|
| `just setup` | `npm run install:all` | Install all dependencies (`just` also installs Playwright Chromium) |
| `just start` | `npm start` | Run full app (server + client) |
| `just server` | `npm run server` | Run backend only (port 3001) |
| `just client` | `npm run client` | Run frontend only (port 5173) |
| `just test` | `npm test` | Run unit and e2e tests |
| `just test-unit` | `npm run test:unit` | Run unit tests |
| `just test-e2e` | `npm run test:e2e` | Run Playwright e2e tests |

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
- ✅ Unit tests: `just test-unit` / `npm run test:unit`
- ✅ E2E tests: `just test-e2e` / `npm run test:e2e`

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

---

## Sample Data

The `sample-data/` directory contains test data from three fictional accounting customers, each using different data schemas and formats. This data is designed to test the application's ability to map varying schemas and data values to a target system.

See [sample-data/README.md](sample-data/README.md) for detailed documentation of the schema differences between customers.

### Sample Data Overview

| Customer | Schema Style | Date Format |
|----------|--------------|-------------|
| ABC Accounting | Title Case columns | MM/DD/YYYY |
| XYZ Financial Services | camelCase columns | YYYY-MM-DD |
| Premier Bookkeeping | snake_case columns | DD-MM-YYYY |

Each customer folder contains:
- Clients (10-12 records)
- Contacts (15-20 records)
- Chart of Accounts (35-40 entries)
- Transactions (25 records)
