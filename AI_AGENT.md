# AI Agent Context — csinorcal.church

## What this project is
A Progressive Web App (PWA) for CSI Nor-Cal Church, providing members with access to news, newsletters, a member directory, calendar events, and contribution info.

## Stack
- Language: TypeScript
- Framework: React 18 + Vite
- Routing: react-router-dom v6
- UI: Tailwind CSS + shadcn/ui (Radix UI primitives) + MUI (icons)
- Forms: react-hook-form + zod
- Data fetching: TanStack Query v5
- Other: date-fns, recharts, next-themes, sonner (toasts), embla-carousel

## Project structure
- `src/pages/` — top-level route components (HomePage, AboutPage, NewsletterPage, etc.)
- `src/components/` — shared UI components and shadcn/ui components (`ui/` subdir)
- `src/data/` — static or mock data files
- `src/hooks/` — custom React hooks
- `src/lib/` — utility functions (e.g. `cn`)
- `public/` — static assets (images, icons)
- `genai/` — AI-generated assets or scripts

## How to run
```bash
pnpm dev       # start dev server
pnpm build     # production build
pnpm preview   # preview production build
pnpm lint      # run ESLint
```

## Key conventions
- shadcn/ui components live in `src/components/ui/` and use `class-variance-authority` + `tailwind-merge`
- Routing is defined in `src/App.tsx` using react-router-dom
- Path alias `@/` maps to `src/`

## Out of scope / don't touch
- <!-- leave blank for user to fill -->

## Status
- **Next step:** Add authentication (Phase 2 / Phase 3)
