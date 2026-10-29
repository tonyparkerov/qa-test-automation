# qa-test-automation

Playwright + TypeScript E2E tests (Page Object Model) for a small todo app. The app under test (`src/`) was provided as part of a QA automation take-home task; the test framework in `tests/` is my work.

A small "Todo list" app built with React + TypeScript (Vite) and a preconfigured Playwright setup.
There is no backend — all data is kept in browser memory and is reset when the page is reloaded.

## Requirements

- Node.js 18+ (20 or newer recommended)
- npm

## Installation

```bash
npm install
npx playwright install chromium
```

## Running the app

```bash
npm run dev
```

The app will be available at http://localhost:5173.

### Login credentials

| Field    | Value              |
| -------- | ------------------ |
| Email    | `test@example.com` |
| Password | `password123`      |

## Features

- `/` — login page: email, password and a "Log in" button. An error message is shown for invalid credentials.
- `/todos` — todo list (available only after logging in): add a task, delete a task, "Log out" button.

## Tests

Tests live in the `tests/` folder. Playwright starts the dev server itself (see `webServer` in `playwright.config.ts`),
so there is no need to run `npm run dev` separately.

```bash
npx playwright test            # run all tests (or npm test)
npx playwright test --ui       # interactive UI mode
npx playwright test --headed   # with a visible browser
npx playwright show-report     # open the HTML report of the last run
```

## Build

```bash
npm run build
```
