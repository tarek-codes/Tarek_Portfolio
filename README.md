# portfolio-dotg

A modern personal portfolio built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4, featuring bilingual UI (English/Bangla), an AI chatbot, and live competitive programming stats.

## Live Site

- Production: [www.sharifdotg.me](https://www.sharifdotg.me)

## Screenshots and Highlights

- Catppuccin token-based theming (light/dark)
- Mobile-first responsive sections with motion
- Floating AI chatbot with streaming responses
- Floating competitive programming stats panel (Codeforces + LeetCode)
- Contact form API integration via Resend

## Tech Stack

- Framework: Next.js 16 (App Router)
- UI: React 19, TypeScript, Tailwind CSS v4
- Animation: Framer Motion
- AI: Vercel AI SDK + OpenRouter
- Email: Resend
- Smooth scroll: Lenis
- Package manager: Bun

## Project Structure

```text
app/
  api/
    chat/route.ts
    contact/route.ts
    projects-stats/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  features/
  providers/
  shared/
  ui/
lib/
  api/
  i18n/
  constants.ts
docs/
public/
```

## Getting Started

### Prerequisites

- Bun `>= 1.3`
- Node.js `>= 20` (recommended for toolchain compatibility)

### Installation

```bash
git clone https://github.com/SharifdotG/portfolio-dotg.git
cd portfolio-dotg
bun install
cp .env.local.example .env.local
```

### Environment Variables

Set these in `.env.local`:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
RESEND_API_KEY=your_resend_api_key

# Optional
RESEND_FROM=Sharif Portfolio <onboarding@resend.dev>
RESEND_TO=sharifmdyousuf007@gmail.com
GITHUB_TOKEN=your_github_token
```

### Run

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `bun run dev` - start local development server
- `bun run build` - create production build
- `bun run start` - run production server
- `bun run lint` - run ESLint

## Localization

The project supports English (`en`) and Bangla (`bn`) with cookie-based locale persistence and dynamic Bangla text translation support.

- Full guide: [docs/localization-bangla.md](docs/localization-bangla.md)

## API and Feature Docs

- Chatbot architecture and usage: [docs/chatbot.md](docs/chatbot.md)
- Floating stats API usage: [docs/floating-stats-api.md](docs/floating-stats-api.md)
- Deployment guide: [DEPLOYMENT.md](DEPLOYMENT.md)

## Core Sections

- Hero
- About
- Experience
- Skills
- Projects
- Achievements
- Contact

## Performance Notes

Recent mobile-focused improvements include:

- Deferred loading of heavy floating overlays (chatbot and stats)
- Simplified high-cost animations on mobile
- Responsive floating stats panel as a mobile-safe bottom sheet
- Lazy stats fetching only when the stats panel is opened

## Customization

Primary content source:

- `lib/constants.ts`

Primary localization source:

- `lib/i18n/translations.ts`

Root shell composition:

- `app/layout.tsx`

Home page composition:

- `app/page.tsx`

## Contributing and Community

- Contributing guide: [CONTRIBUTING.md](CONTRIBUTING.md)
- Code of conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- License: [LICENSE](LICENSE)

## Troubleshooting

- Ensure required env vars are set before using chatbot or contact API.
- If external APIs rate-limit, UI falls back safely for stats where implemented.
- Run lint/build locally before opening a pull request.

## Contact

- GitHub: [@2ManyFaces](https://github.com/2ManyFaces)
- LinkedIn: [tarekalambhuiyan](https://linkedin.com/in/tarekalambhuiyan)
- Email: [tarekalambhuiyan@gmail.com](mailto:tarekalambhuiyan@gmail.com)

## Acknowledgements

- Next.js
- Tailwind CSS
- Framer Motion
- Catppuccin
- OpenRouter
- Resend
