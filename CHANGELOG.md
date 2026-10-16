# Changelog

## Unreleased - 2026-10-15

### Home

- Selected work now opens with an Independent builds showcase: El Niño and Commodity
  Futures, ChurchMap, and Debrief, each with a tagline, a "try it" link, and three real
  screenshots captured from the live product. Case cards follow under "Case studies".

### Writing

- New Market stories section on `/writing` (after Published) and a compact list in the home
  Writing section, plus a page per story at `/writing/market-stories/<slug>`: seven stories
  with tickers, thesis, price chart, how the view changed, the case on each side, what to
  watch, and a look back. Each story states its own price cutoff; every chart has a full-size
  link, and multi-panel charts scroll sideways on phones. Source attributions only.
- Market stories rewritten as essays. Each opens with three takeaways, then runs as plain
  paragraphs: the pattern, what the chart shows, how analysts read it, my view as separate
  arguments with their evidence, and what to watch. Subheadings, tables and per-section
  source lists are gone; sources are one line at the end.

### Links

- The El Niño research workbench moved to https://elnino.yujun.net/.

### Removed

- The Narrative Intelligence case, its public evaluation fixture
  (`public/fixtures/narrative-evaluation-fixture-v1.json`), and the links to it from planned
  writing.

### Build

- Self-host Source Sans 3 (Fontsource variable woff2, OFL-1.1) with `next/font/local`. Google
  Fonts now serves extensionless font URLs that crash the Next 14.1 Google font loader on
  Cloudflare Pages; the build no longer needs network access for fonts.

## Unreleased - 2026-10-01

### Home

- Hero leads with name, a short intro, and a large portrait on the right.
- Replace the focus index with a Path timeline: University of Illinois → Facebook AI →
  Instagram Reels → Omnicom.

### Naming

- Name employers across the site (Facebook AI, Instagram Reels, Omnicom) and remove the
  "described by category" notes on About and Work. Supersedes the 0.3.0 naming rule.
- Split the About experience into separate Instagram Reels and Facebook AI roles, and move
  the integrity paragraph out of the Reels recommendation-quality case.

### Structure

- Remove the About page and its nav and footer links; the home hero and Path timeline
  carry the bio and experience. Research stays at `/writing#research`.
- Hero eyebrow is now "Data Scientist and AI builder".
- Show all four testimonials verbatim in the hero under the Path timeline (manager, data
  science colleague, engineering manager, ML engineer), restored from before 0.3.0.
- Retitle the Omnicom case "AI Agents Orchestration and Evaluation" (slug unchanged).

## 0.3.0 - 2026-09-08

### Naming

- Remove every employer and internal product name from the site. Work is described by
  category — "short-form video platform", "advertising and media group", "independent
  project" — across copy, card labels, slugs, and metadata. Recorded as a standing
  constraint in `DESIGN.md`.
- Rename the first industry case slug to `/work/recommendation-quality`; the previous
  slug named a product.

### Accuracy

- Remove first-person claims that could not be supported from available material:
  metric pre-registration, fixed-in-advance segments, a self-attributed metric failure
  and rebuild, and named segment-level results. The method they described is kept, now
  written as the conditions the work is held to.
- Remove the resume-derived percentage and the paragraph explaining why it was withheld.
  The page no longer both withholds a number and states it.
- Replace "a guardrail that has never once stopped a launch is decoration" with the
  falsifiable version: a guardrail needs a defined failure mode, a threshold, a
  consequence, and enough sensitivity to bind.
- Replace "typical traffic under-represents the users a safety metric protects" with the
  accurate statement that overall and high-risk-slice performance answer different
  questions, and the sample should support the decision.
- Label the enterprise failure trace as an illustrative reconstruction and drop the
  `offline-benchmark` evidence tag, which had no public artifact behind it.
- Correct Debrief: it has early users beyond me, with no retention or extraction accuracy
  measured yet. Drop "my own usage is the entire evidence base" and the claim that the
  identity-linked funnel is not measurable.
- Drop the unevidenced claim about what most creative-intelligence products report.

### Reading order

- Add a 60-second brief to every case — Problem, My contribution, What changed (or
  Current result) — above the fold of the case body.
- Replace the fixed five-section case template with a per-item ordered `sections` array,
  so an industry case, a working prototype, and a study design each read in their own
  order.
- Compress work cards to title, one contribution sentence, role, and link.
- Replace the hero thesis card with a three-row index straight into the work, and tighten
  the hero so the first case title lands inside a 900px-tall desktop window.
- Compress the home-page lab section to a single strip; the schedule and stop conditions
  stay on the study-design page.
- Rename status labels to Case study / Working prototype / Study design.

### Writing

- Publish the first three articles with full bodies: "When a Better Offline Metric Is the
  Wrong Launch Signal", "Creative Tagging Is Easy. Proving Lift Is Harder.", and "An AI
  Evaluator Needs an Evaluation".
- Add `/writing/[slug]` with a generated table of contents.
- Drive every writing surface from one `status`, with `articleHref()` returning a link
  only for a published piece that has a body. Removes the home page claiming articles
  were "written and in progress" while the data said planned.
- Reorder `/writing` to published, then at most three in progress, then research. Replace
  the citation-count explanation with a Google Scholar link.

### Evidence a reader can check

- Add `public/fixtures/narrative-evaluation-fixture-v1.json`: six self-authored passages
  with gold narrative groupings and pairwise labels, linked from the Narrative case. It
  contains inputs and labels only — no model output and no scores, because the annotation
  has not been run.
- Add an illustrative metric-to-action table to the recommendation-quality case and an
  end-to-end failure trace to the enterprise case, both explicitly labelled.

### Other

- Add a committed Open Graph share image at `public/og.png`, rendered from
  `tools/og-card.html`, and reference it from every page. `next/og` under
  `output: 'export'` emits an extensionless file with no Content-Type.
- Add `aria-current="page"` to the nav and `scroll-margin-top` to section anchors.
- Split the two workstreams in the About experience entry and add an optional role period
  field (unset — real dates still needed).

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
