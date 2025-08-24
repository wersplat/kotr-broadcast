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

## Supabase
This app uses a real Supabase client.

- Set environment variables in your shell or Pages project:
  - `NEXT_PUBLIC_SUPABASE_URL` (e.g. `https://qwpxsufrgigpjcxtnery.supabase.co`)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase project settings)
- The app is currently hardcoded to tournament `0880ac2b-6d8d-4849-a22e-c1c32132e6c3` via `src/lib/config.ts`.
- Data loaders in `src/lib/data.ts` query tournament views when available and fall back to mock JSON when env vars are not set or queries fail.
- An optional `rpc('list_tables')` is attempted for schema introspection.

## Typed routes
`next.config.mjs` sets `experimental.typedRoutes = true`.

## Tailwind
- Config in `tailwind.config.ts` with `content = ['./src/**/*.{ts,tsx}']`
- Global styles imported in `src/app/layout.tsx` from `src/styles/globals.css`