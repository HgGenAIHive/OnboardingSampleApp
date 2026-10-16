# Task runner for local development. Run `just` to list recipes.

# cmd.exe resolves npm/npx to their .cmd shims, avoiding PowerShell execution-policy blocks on npm.ps1
set windows-shell := ["cmd.exe", "/c"]

# List available recipes
default:
    @just --list

# Install everything needed for local development (Node deps + Playwright browser)
setup: check-node
    npm ci
    npm ci --prefix server
    npm ci --prefix client
    npx playwright install {{ if os() == "linux" { "--with-deps " } else { "" } }}chromium
    @echo Setup complete. Next: just start, then open http://localhost:5173

# Fail fast if Node.js or npm is missing or too old
check-node:
    @node scripts/check-node.js
    @npm --version

# Run the full app (server on :3001, client on :5173)
start:
    npm start

# Run the backend only (port 3001)
server:
    npm run server

# Run the frontend only (port 5173)
client:
    npm run client

# Run unit and e2e tests
test:
    npm test

# Run unit tests
test-unit:
    npm run test:unit

# Run Playwright e2e tests
test-e2e:
    npm run test:e2e
