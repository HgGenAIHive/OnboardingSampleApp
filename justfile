# Onboarding Sample App
#
# Common commands:
#   just install    - Install dependencies (root, server, client)
#   just dev        - Run server + client together
#   just test       - Run backend unit tests
#   just test-e2e   - Run Playwright e2e tests
#   just build      - Build the client for production
#
# See 'just --list' for all available commands

# Show available commands
default:
    @just --list

# Install dependencies (root, server, client)
install:
    npm run install:all

# Run server + client together
dev:
    npm start

# Run backend only (port 3001)
server:
    npm run server

# Run frontend only (port 5173)
client:
    npm run client

# Run backend unit tests (optionally specify a path/glob within server/src)
test PATH="src/**/*.test.js":
    cd server && node --test {{PATH}}

# Alias for test
test-unit PATH="src/**/*.test.js":
    @just test {{PATH}}

# Run Playwright e2e tests
test-e2e:
    npx playwright test

# Run unit + e2e tests
test-full: test test-e2e

# Build the client for production
build:
    cd client && npm run build

# Install pre-commit hooks
pre-commit-install:
    pre-commit install --install-hooks
    pre-commit install --hook-type commit-msg

# Run pre-commit on all files
pre-commit-run:
    pre-commit run --all-files

# Update pre-commit hooks to latest versions
pre-commit-update:
    pre-commit autoupdate
