# Yujun Zhou Portfolio

The personal site of Yujun Zhou — a senior data scientist working on experimentation, measurement, and AI evaluation for recommendations, advertising, and AI products. Built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), and plain CSS. No UI framework, no CMS.

## What the site is organized around

The unit of content is a **case study**, not a project card. Every work item carries:

- a **status** rendered as what the reader is looking at — Case study / Working prototype / Study design — never as a claim that a business result was proven;
- an **evidence type** (`reported-experience`, `observational`, `offline-benchmark`, `randomized-experiment`, `synthetic-demo`) paired with a concise data boundary and decision-relevant limitations;
- a **brief** — Problem, My contribution, What changed (or Current result) — under 100 words, read before anything else;
- explicit **limitations**, and a one-sentence data boundary.

Sections are ordered per item rather than forced into one template: an industry case runs Problem → My contribution → Worked example → Method, while a study design runs Decision → Example → Design → Status → Next. Demo, code, and artifact links render only when the resource actually exists.

### Naming

Employers and internal products are described by category — "short-form video platform", "advertising and media group" — not by name. This is deliberate and applies to every surface, including case slugs and article copy. Specifics belong on the resume and in conversation.

## Routes

| Route | Purpose |
|---|---|
| `/` | Positioning, three featured cases, writing, what's being scoped |
| `/work` | Industry cases, independent builds, in the lab, earlier research |
| `/work/[slug]` | Case study, statically generated per item |
| `/work/narrative-intelligence/example` | Public fixture, deterministic output, metrics, and error analysis |
| `/writing` | Published articles, at most three in progress, plus peer-reviewed research |
| `/writing/[slug]` | Article body, statically generated per published piece |
| `/about` | Bio, experience, education, toolkit, research, one reference |

## Content model

All content is data, not JSX. Editing the site means editing three files:

- `src/lib/portfolio.ts` — site copy, hero, social links, about page content
- `src/lib/work.ts` — the `WorkItem` type and every case study
- `src/lib/writing.ts` — articles (including their bodies) and published papers

A single `status` drives every writing surface. `published` requires a `body`; `articleHref()` returns a link only for those, so flipping the enum alone cannot put an empty title on the home page.

## Adding a resume

The resume link is off until the file exists. To turn it on:

1. Put the PDF at `public/resume.pdf`.
2. Set `resume: '/resume.pdf'` in `getSite()` in `src/lib/portfolio.ts`.

The nav link, the hero's secondary call to action, the About button, and the footer link all appear automatically. Leaving it unset is deliberate — a dead resume link is worse than none.

## Getting started

```bash
npm ci
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
npm test
npm run check:narrative-example
npm run check:links  # run after build
```

Stop `npm run dev` before running `npm run build` so the `.next/` cache does not mix dev and build output. See `TESTING.md` for the complete local and CI sequence.

## Project structure

- `src/app/` — routes, layout, and page-level CSS
- `src/app/components/` — Navbar, Footer, and the shared work components (`WorkCard`, `StatusBadge`, `Blocks`)
- `src/lib/` — all site content
- `public/profile.jpg` — portrait
- `public/og.png` — share card, rendered from `tools/og-card.html` (see `tools/README.md`)
- `public/fixtures/` — public, self-authored evaluation inputs and checked-in baseline output
- `scripts/` — reproducible fixture runner and exported-link checker
- `docs/public-claim-ledger.md` — evidence boundaries for public copy
- `DESIGN.md` — tokens, type scale, status conventions, page order. **Read it before any visual change.**
- `archive/legacy-2026-04-14/` — old generated output, starter assets, unused config

## Deployment

Static export (`output: 'export'` in `next.config.js`). Deployable to Vercel or any static host. Every route is prerendered, including each case study and published article, so a direct link or refresh works. Set `NEXT_PUBLIC_SITE_URL` to the production origin. Set `NO_INDEX=true` for previews; Vercel previews and non-main Cloudflare branches are also detected automatically.

## License

For personal and demonstration purposes.
