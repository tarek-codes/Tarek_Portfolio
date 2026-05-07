# Contributing Guide

Thanks for your interest in improving this project.

## Development Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Bun package manager

## Prerequisites

- Bun `>= 1.3`
- Node.js `>= 20` (recommended for tooling compatibility)

## Setup

```bash
git clone https://github.com/SharifdotG/portfolio-dotg.git
cd portfolio-dotg
bun install
cp .env.local.example .env.local
```

## Run Locally

```bash
bun run dev
```

## Quality Checks

```bash
bun run lint
bun run build
```

## Branching and Commits

1. Create a topic branch from `master`.
2. Keep commits focused and descriptive.
3. Open a pull request with clear context and screenshots for UI changes.

Example:

```bash
git checkout -b feat/mobile-stats-panel
```

## Pull Request Checklist

- [ ] Code builds successfully
- [ ] Lint passes
- [ ] Mobile layout verified
- [ ] Localization updated when adding UI text
- [ ] Docs updated for behavior/API changes

## Localization Contribution Rules

- Add static UI strings in `lib/i18n/translations.ts` for both `en` and `bn`.
- Avoid hardcoded copy in components.
- For dynamic content in constants, update Bangla mapping via `translateDynamicText` support.

## Animation and Performance Rules

- Prefer transform/opacity animations over expensive filters.
- Keep motion subtle on mobile and respect reduced-motion behavior.
- Avoid introducing continuous animations without pause/disable strategy.

## Security
 
For sensitive issues, contact: [tarekalambhuiyan@gmail.com](mailto:tarekalambhuiyan@gmail.com)
