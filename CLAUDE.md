# Onboarding Sample App

A training exercise app for building an internal tool that helps a CS team onboard customers faster. React/Vite frontend, Express backend, in-memory storage (no database, no auth).

## Quick Start

**Prerequisites:** Node.js, npm, [just](https://github.com/casey/just)

```bash
# Install dependencies (root, server, client)
just install

# Run the app (server + client)
just dev
```

Then open http://localhost:5173.

## Project Management

**Tool:** GitHub Issues
**Repository:** HgGenAIHive/OnboardingSampleApp

## Repository Structure

- `client/` - React 18 + Vite frontend
- `server/` - Express.js backend API, in-memory data
- `tests/e2e/` - Playwright end-to-end tests
- `sample-data/` - Static CSV fixtures for three fictional customers with differing schemas, used to test data mapping (see `sample-data/README.md`)

## Common Commands

```bash
just dev        # Run server + client together
just server     # Run backend only (port 3001)
just client     # Run frontend only (port 5173)
just test       # Run backend unit tests (Node's built-in test runner)
just test-e2e   # Run Playwright e2e tests
just build      # Build the client for production
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/health` | Health check |
| GET | `/api/customers` | List all customers |
| GET | `/api/customers/:id` | Get customer by ID |
| GET | `/api/customers/:id/onboarding` | Get onboarding state |
| GET | `/api/onboarding` | Dashboard view (all states + customer info) |
| GET | `/api/tenants/:customerId` | Get tenant by customer ID |

---

*AI-generated documentation. Update as project evolves.*
