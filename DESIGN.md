# Design System - Portfolio

## Product Context
- **What this is:** The personal site of Yujun Zhou, positioned as a senior data scientist working on experimentation, measurement, and AI evaluation for recommendations, advertising, and AI products.
- **Project type:** Editorial case-study site. The unit of content is a case study that carries a status and an evidence type, not a project card with a stack list.
- **Reading goal:** Position understood in 30 seconds, one case understood in 3 minutes, enough material to interrogate the method in 10.

## Aesthetic Direction
- **Direction:** Editorial, evidence-first. Dark hero over a warm off-white body, with one restrained teal accent.
- **Mood:** Calm, exact, and unhurried. It should read like a researcher's notebook that someone bothered to typeset, not a product landing page.
- **Rule:** Nothing decorative competes with the text. No fabricated product screenshots, no stock imagery, no motion that is not a state change.

## Typography
- **Family:** Source Sans 3 throughout, weights 400 / 600 / 700 / 800.
- **Rationale:** One family keeps a text-dense site coherent. Weight and size carry the hierarchy.
- **Scale:**
  - Hero / page H1: `3.6rem` desktop, `2.8rem` tablet, `2.35rem` mobile.
  - Section headings: `2.1rem` desktop, `1.85rem` tablet, `1.6rem` mobile.
  - Case section headings: `1.85rem` desktop, `1.6rem` mobile.
  - Body: `1.125rem` (18px) desktop, `1.0625rem` (17px) mobile.
  - Lede: `1.2rem`. Card body and case meta: `1rem`.
  - Eyebrow and status: `0.78rem`, uppercase, letterspaced.

## Color
- **Approach:** Warm neutral ground, dark ink, one teal accent used sparingly for links, labels, and the primary button.
- **Background:** `#f6f5f1`
- **Surface (cards):** `#ffffff`
- **Panel (table headers, chips):** `#efece4`
- **Ink:** `#132a35`
- **Muted text:** `#5a6b73`
- **Accent:** `#147d76`
- **Accent dark (small text, links):** `#0f5f5a`
- **Border:** `#ded9cf` · **Border strong:** `#c6bfb2`
- **Dark hero:** `#102832`, ink `#f1f5f4`, muted `#9fb3b5`, border `#2a4149`, panel `#16323d`
- **Accent on dark:** `#45b3a8` — the light accent is required on dark; `#147d76` does not clear 4.5:1 there.
- **Status:** live `#0f5f5a`, in progress `#8a5a10`, proposed/archived `#4a5b64`

## Status Convention
Every work item shows a status as **both a word and a color**. Color alone never carries the meaning.

| Status | Means | Never means |
|---|---|---|
| Published | The case study is written and readable | That a business result has been proven |
| In progress | Built and running, quality not yet measured | That measurement is underway right now |
| Proposed | Study design only, nothing built | That a prototype exists |

Evidence type is shown next to status on the case page and defined in `EVIDENCE_MEANING` in `src/lib/work.ts`. A link (Live demo, Code, Evaluation report) renders only when the resource exists and is reachable.

## Spacing
- **Density:** Roomy between sections, tight inside cards.
- **Sections:** `72px` desktop vertical padding, `48px` for tight sections, `52px` mobile.
- **Cards:** `24px` padding desktop, `20px` mobile.
- **Case sections:** `48px` vertical, separated by a 1px rule.

## Layout
- **Max content width:** `1180px` (`--wrap`). **Prose measure:** `720px` (`--prose`) — body copy, notes, and definition lists are capped at it.
- **Hero:** Copy left, evidence-thesis card right. Single column below 980px, copy first.
- **Cards:** 4px radius, 1px border, no drop shadow at rest. Hover is a border color change plus a 2px lift.
- **Tables:** always inside `.tablewrap` with `overflow-x: auto`. The page body must never scroll horizontally.

## Motion
- **Approach:** Minimal-functional. Only 0.18s color, border, and 2px transform transitions.
- All motion is disabled under `prefers-reduced-motion`.

## Accessibility
- One `<h1>` per page. Sections use real headings in order.
- `:focus-visible` shows a 2px accent outline at 3px offset. A skip link targets `#main`.
- Body text, muted text, and the accent all clear 4.5:1 on their own backgrounds; the light accent is used on dark.
- Real link text ("Read case study", not "Open"). Images carry alt text.

## Page Order
`/` Hero → Selected work → Writing → In the lab → Contact
`/work` Industry cases → Independent builds → In the lab → Earlier research
`/work/[slug]` Header (question, status, role, data, evidence) → Evidence → Study design → Results and failures → Next decision → Limitations → Appendix
`/writing` Writing next → Backlog by topic → Research
`/about` Bio → Experience → Education → Toolkit → Research → Reference

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-14 | Replaced Poppins with Source Sans 3 | The reference direction is crisp, sans-serif, and lightweight. |
| 2026-04-14 | Moved hero to text-left/photo-right | This more closely matches the nanawang.dev hero composition. |
| 2026-04-14 | Shifted cards to 4px radius and lighter shadows | The reference uses flatter, cleaner cards rather than rounded app panels. |
| 2026-09-05 | Repalette to warm ground + dark hero + single teal accent | Positioning shifted from a general portfolio to an evidence-first case-study site; the cool all-blue system read as generic tech. |
| 2026-09-05 | Body type up to 18px, prose capped at 720px | The site is now read, not scanned. Long-form measure matters more than card density. |
| 2026-09-05 | Hero H1 down from 4.7rem to 3.6rem, name demoted to the nav | The headline is the claim, not the name. |
| 2026-09-05 | Status and evidence type became first-class design elements | Honest labelling of what is proven is the site's core argument; it needed a visual system, not prose disclaimers. |
| 2026-09-05 | Dropped shadows on cards at rest | Flat borders suit a text-dense editorial page; shadows added noise at this density. |
| 2026-09-05 | Removed MUI and Font Awesome | Four icons did not justify two icon systems and a render-blocking CDN stylesheet. Inline SVG instead. |
