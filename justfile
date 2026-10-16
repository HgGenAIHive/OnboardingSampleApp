# Task runner for local development. Run `just` to list recipes.

set windows-shell := ["powershell.exe", "-NoLogo", "-NoProfile", "-Command"]

min_node_major := "20"

# List available recipes
default:
    @just --list

# Install everything needed for local development (Node deps + Playwright browser)
setup: check-node
    npm ci
    npm ci --prefix server
    npm ci --prefix client
    npx playwright install {{ if os() == "linux" { "--with-deps " } else { "" } }}chromium
    @echo "Setup complete. Run 'just start' and open http://localhost:5173"

# Fail fast if Node.js or npm is missing or too old
check-node:
    @node -e "const v = process.versions.node; if (Number(v.split('.')[0]) < {{ min_node_major }}) { console.error('Node.js {{ min_node_major }}+ is required, found ' + v + '. Install it from https://nodejs.org/'); process.exit(1); } console.log('Node.js ' + v + ' OK');"
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
