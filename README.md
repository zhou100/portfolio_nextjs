# Yujun Zhou Portfolio

The personal site of Yujun Zhou — a senior data scientist working on experimentation, measurement, and AI evaluation for recommendations, advertising, and AI products. Built with [Next.js](https://nextjs.org), [TypeScript](https://www.typescriptlang.org/), and plain CSS. No UI framework, no CMS.

## What the site is organized around

The unit of content is a **case study**, not a project card. Every work item carries:

- a **status** (`published` / `in-progress` / `proposed` / `archived`) — `published` means the case study is written, never that a business result was proven;
- an **evidence type** (`reported-experience`, `observational`, `offline-benchmark`, `randomized-experiment`, `synthetic-demo`) — each with a stated meaning of what it does and does not license;
- explicit **limitations**, and a **next decision**.

Case studies follow a fixed reading order: Evidence → Study design → Results and failures → Next decision → Limitations → Appendix. Demo, code, and evaluation links render only when the resource actually exists.

## Routes

| Route | Purpose |
|---|---|
| `/` | Positioning, three featured cases, writing, what's being scoped |
| `/work` | Industry cases, independent builds, in the lab, earlier research |
| `/work/[slug]` | Case study, statically generated per item |
| `/writing` | Planned pieces with the argument each must support, plus peer-reviewed research |
| `/about` | Bio, experience, education, toolkit, research, one reference |

## Content model

All content is data, not JSX. Editing the site means editing three files:

- `src/lib/portfolio.ts` — site copy, hero, social links, about page content
- `src/lib/work.ts` — the `WorkItem` type and every case study
- `src/lib/writing.ts` — planned articles and published papers

## Adding a resume

The resume link is off until the file exists. To turn it on:

1. Put the PDF at `public/resume.pdf`.
2. Set `resume: '/resume.pdf'` in `getSite()` in `src/lib/portfolio.ts`.

The nav link, the hero's secondary call to action, the About button, and the footer link all appear automatically. Leaving it unset is deliberate — a dead resume link is worse than none.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
```

Stop `npm run dev` before running `npm run build` so the `.next/` cache does not mix dev and build output.

## Project structure

- `src/app/` — routes, layout, and page-level CSS
- `src/app/components/` — Navbar, Footer, and the shared work components (`WorkCard`, `StatusBadge`, `Blocks`)
- `src/lib/` — all site content
- `public/profile.jpg` — portrait
- `DESIGN.md` — tokens, type scale, status conventions, page order. **Read it before any visual change.**
- `archive/legacy-2026-04-14/` — old generated output, starter assets, unused config

## Deployment

Static export (`output: 'export'` in `next.config.js`). Deployable to Vercel or any static host. Every route is prerendered, including each case study, so a direct link or refresh works.

## License

For personal and demonstration purposes.
