# kotr-broadcast

Next.js (App Router) site for broadcast commentary. Targets Cloudflare Pages via `@cloudflare/next-on-pages`. Uses TypeScript and TailwindCSS.

## Stack
- Next.js App Router, TypeScript, ESLint
- TailwindCSS 4
- Cloudflare Pages + `@cloudflare/next-on-pages` + `wrangler`
- Utilities: `zod`, `date-fns`, `clsx`

## Project structure
- `src/app` routes:
  - `/` overview dashboard
  - `/leaders`
  - `/notables`
  - `/players`, `/players/[id]`
  - `/teams`, `/teams/[id]`
  - `/recaps`
  - `/matches/[id]`
- `src/components`: UI components (StatCard, LeaderboardTable, RecapCard, PageHeader, TeamChip)
- `src/lib`: `types.ts`, `data.ts` (mock loaders), `supabase.ts` (stub)
- `src/data`: mock JSONs used by the loaders
- `src/styles/globals.css`: Tailwind globals with dark theme

## Development
```
pnpm install
pnpm dev
```
App runs on http://localhost:3000.

## Build
```
pnpm build
```

## Cloudflare Pages output
```
pnpm cf:build
```
This generates `.vercel/output` suitable for Cloudflare Pages. Preview locally:
```
pnpm cf:preview
```
Deploy to Cloudflare Pages (project must exist):
```
pnpm cf:deploy
```

`wrangler.toml` sets `pages_build_output_dir = ".vercel/output"`.

## Supabase wiring (later)
- Replace `src/lib/supabase.ts` with a real client:
  - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Swap mock loaders in `src/lib/data.ts` for Supabase queries (or views)
- Keep the interfaces in `src/lib/types.ts` consistent with your views.

## Typed routes
`next.config.mjs` sets `experimental.typedRoutes = true`.

## Tailwind
- Config in `tailwind.config.ts` with `content = ['./src/**/*.{ts,tsx}']`
- Global styles imported in `src/app/layout.tsx` from `src/styles/globals.css`