# Playwright TypeScript Automation Template

A production-ready Playwright + TypeScript automation framework template,
designed to bootstrap UI test projects quickly with consistent tooling,
clean architecture, and enforced code quality from day one.

---

## 🚀 Tech Stack

- **Playwright** – end-to-end browser automation
- **TypeScript** – type-safe test development
- **ESLint (flat config)** – static code analysis with Playwright awareness
- **Prettier** – opinionated code formatting
- **Husky** – Git hooks for local enforcement
- **lint-staged** – run checks only on staged files
- **Commitlint** – enforce Conventional Commits
- **GitHub Actions** – CI-ready setup

---

## 📁 Project Structure

```
.
├── tests/
│   ├── e2e/            # Full end-to-end test scenarios
│   ├── smoke/          # Lightweight smoke tests
│   └── fixtures/       # Shared test fixtures
├── pages/              # Page Object Models
├── helpers/            # UI helpers and reusable actions
├── utils/              # Generic utilities and helpers
├── managers/           # Managers (e.g. PageObjectManager)
├── data/               # Test data & constants
├── playwright.config.ts
├── eslint.config.mjs
├── .prettierrc
└── package.json
```

---

## 🧹 Code Quality & Tooling

This template enforces quality automatically:

### On every commit:
- Prettier formats staged files
- ESLint fixes safe issues
- Commit messages are validated

Bad code or bad commits **never reach the repository**.

---

## 🧪 Getting Started

### Install dependencies
```bash
npm install
```

### Run tests
```bash
npx playwright test
```

### Open Playwright report
```bash
npx playwright show-report
```

---

## 🔁 Using This Template

This repository is intended to be used as a **GitHub Template**.

When starting a new automation project:
1. Click **Use this template**
2. Create a new repository
3. Start writing tests immediately

No setup boilerplate required.

---

## 🧠 Philosophy

This template focuses on:
- fast project bootstrapping
- consistent developer experience
- clean Git history
- scalable automation architecture

It is intentionally kept **generic**, so it can be adapted
to any UI automation use case.

---

