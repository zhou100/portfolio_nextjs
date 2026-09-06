# Changelog

## 0.2.0 - 2026-09-05

- Restructure the site around case studies with explicit status and evidence type: add `/work`, statically generated `/work/[slug]`, `/writing`, and a real `/about` page.
- Rewrite positioning to "I measure and improve AI products" with experimentation, measurement, and AI evaluation as the stated specialty.
- Move the content model to `src/lib/work.ts` (`WorkItem`, evidence types, findings with population/baseline/window/uncertainty) and `src/lib/writing.ts`.
- Fix page metadata: the `(metadata)` route group never applied, so every page shipped without a title. Metadata, canonical URLs, and Open Graph tags now live in the root layout, with per-page overrides.
- Correct ChurchMap's stack from SQLite to Supabase Postgres with pgvector, and drop hard-coded citation counts.
- Reduce testimonials from four anonymous quotes to one, with its provenance stated, moved to `/about`.
- Repalette to a warm ground with a dark hero and a single teal accent; raise body type to 18px and cap prose at 720px.
- Replace the mobile nav, remove MUI, Emotion, and the Font Awesome CDN stylesheet in favour of inline SVG.
- Add a skip link, visible focus states, and horizontal scroll containment for wide tables.

## 0.1.1 - 2026-04-14

- Revamp the portfolio visual system, homepage structure, and personal positioning.
- Add the ChurchMap project with a technical description and five focused stack chips.
- Archive legacy deployment, starter asset, Tailwind, and performance baseline files.
- Add an ESLint config so `npm run lint` runs non-interactively.
