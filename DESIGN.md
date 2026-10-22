# Design System - Portfolio

## Product Context
- **What this is:** The personal site of Yujun Zhou, positioned as a senior data scientist who makes product progress measurable.
- **Project type:** Editorial case-study site. The unit of content is a case study that carries a status and an evidence type, not a project card with a stack list.
- **Reading goal:** Position understood in 30 seconds, one case understood in 3 minutes, enough material to interrogate the method in 10.

## Aesthetic Direction
- **Direction:** A typeset paper. Serif text on warm paper, mono labels, a margin column for notes and outcomes, live builds set as numbered figures. The home page keeps one dark hero in the original sans design as its cover; every other surface is paper.
- **Mood:** Calm, exact, and unhurried. It should read like a researcher's notebook that someone bothered to typeset, not a product landing page.
- **Rule:** Nothing decorative competes with the text. No fabricated product screenshots, no stock imagery, no motion that is not a state change. Real screenshots captured from a live, publicly reachable product are allowed in the Selected work showcase.

## Typography
- **Families** (all self-hosted from Fontsource, OFL, in `src/app/fonts/`):
  - **Source Serif 4** (variable weight and optical size) — body, headings, everything below the home hero.
  - **IBM Plex Mono** 400 / 500 — labels: eyebrows, dates, orgs, status, dt terms, figure numbers, nav, action links. Always small and uppercase.
  - **Source Sans 3** — the home hero only (eyebrow, name, claim, intro, buttons, Path, colleague quotes). `.hero` locks the family so the serif body does not leak in.
- **Rationale:** Serif reads as a paper and carries long prose; mono marks what is metadata, so the reader can skip it. Source Serif and Source Sans are a designed pair, which keeps the hero and the body from fighting.
- **Weights:** H1 and H2 are 400 (size carries them); H3 and H4 are 600. Hero name and Path employers stay Source Sans 800.
- **Scale:**
  - Page H1: `3rem` desktop, `2.5rem` tablet, `2.1rem` mobile. Hero name keeps `3.6rem` / `2.8rem` / `2.35rem`.
  - Section headings: `2rem` desktop, `1.8rem` tablet, `1.6rem` mobile.
  - Case section headings: `1.85rem` desktop, `1.55rem` mobile.
  - Body: `1.125rem` (18px) desktop, `1.0625rem` (17px) mobile.
  - Lede: `1.2rem`. Case question and article excerpt: `1.25–1.3rem` italic.
  - Mono label: `0.72–0.78rem`, uppercase, tracking `0.04–0.06em`.

## Color
- **Approach:** Warm paper, near-black ink, one teal accent across the whole site — links, figure numbers, outcome rules, brief labels, the hero's primary button. No second accent.
- **Background (paper):** `#fbf9f4`
- **Surface (screenshot frames):** `#ffffff`
- **Panel:** `#f2efe7`
- **Ink:** `#1d1c1a` (16:1) · **Ink soft (secondary body):** `#3b3934` (11:1)
- **Muted text:** `#67635b` (5.7:1)
- **Accent:** `#147d76` — rules, bullets and the hero button only; at 4.7:1 it is not used for small text.
- **Accent dark (text, links):** `#0f5f5a` (7.1:1)
- **Border:** `#e2ddd2` · **Border strong:** `#cbc4b6`. Section-opening rules use ink.
- **Dark hero:** `#102832`, ink `#f1f5f4`, muted `#9fb3b5`, border `#2a4149`, panel `#16323d`
- **Accent on dark:** `#45b3a8` — the light accent is required on dark; `#147d76` does not clear 4.5:1 there.
- **Status:** live `#0f5f5a`, in progress `#8a5a10`, proposed/archived `#5b5f66`

## Naming Convention
Employers are named: *Facebook AI*, *Instagram Reels*, *Omnicom*. Independent work is
labelled *independent project*. Internal product names, confidential data, and results
are never published — describe the problem, not the internal system. Case slugs describe
the problem, not a product.

## Status Convention
Every work item shows a status as **both a word and a color**. Color alone never carries the meaning.
The label says what the reader is looking at, not how mature the work is.

| Status | Label shown | Means | Never means |
|---|---|---|---|
| `published` | Case study | The case is written and readable | That a business result has been proven |
| `in-progress` | Working prototype | Built and running, quality not yet measured | That measurement is underway right now |
| `proposed` | Study design | Design only, nothing built | That a prototype exists |

Evidence type is shown in the case meta block and defined in `EVIDENCE_MEANING` in
`src/lib/work.ts`. A link (Try the product, Code, an artifact) renders only when the
resource exists and is reachable without private access.

## Content Hierarchy

Avoid unnecessary secondary labels and descriptions. Let the layout do the explaining.
Section titles name their content directly; do not pair them with a second title or instructions for reading the interface. Preserve status, evidence boundaries, dates, target users, source attribution, and meaningful accessibility labels. Methods stay on the case page rather than repeating on every build card.

The reader meets the contribution before the method. This ordering is the point of the
2026-09-08 revision and should not be reverted to a single research-report template.

- **Every case opens with a brief** — Problem / My contribution / What changed (or
  Current result where no outcome is confirmed) — under 100 words, above the fold of
  the body. Everything after it is optional for a scanning reader.
- **Sections are per item, not per template.** `WorkItem.sections` is an ordered array.
  Industry case: Problem → My contribution → Worked example → Method → What to ask me.
  Working prototype: Task → Example → What it taught me → Evaluation → Next.
  Study design: Decision → Example → Design and data → Status → Next.
- **One sentence of data boundary** sits in the case header. Longer qualifications go in
  Limitations. Do not repeat "not re-verified" or "what this licenses me to say" through
  the body — a limitation that does not change how the reader reads the case is cut.
- **Lists compare, they do not read.** Work appears in two shapes only, on the home page
  and `/work` alike: build cards (`Showcase`) for live products, and the case ledger
  (`CaseLedger`) for industry cases and study designs. Role, methods, evidence and the long
  summary live on the case page.
- **Home hero is an introduction, and the only dark surface.** Portrait, name, the one-line
  claim, a short intro, and two calls to action, then the career Path timeline. The Path
  has no intro sentence; each step is employer, role, and a detail of two or three words. Selected work follows directly, so
  the hero does not repeat links into the cases. The owner's four-sentence intro (2026-10-20)
  is the current copy; trim vertical rhythm before body size.
- **The Path timeline** is one horizontal rule with a dot per step (vertical below 760px).
  Steps name the employer. The current step has a filled light-accent dot and a
  "Now" tag beside the name, so color never carries it alone.
- **Selected work is compact, in the ledger layout.** Independent builds with a live public
  product are cards in one row — three columns for three builds, four (`.builds--4`, meta
  terms stacked) for four; two below 1100px or 980px, one below 640px — with the lead real
  screenshot (opens full size), status, title, one-sentence tagline, a Target users
  row (`showcase.audience`; no Role row — "independent" already says it),
  and a split footer — "Try it ↗" in teal, "Read the case". The visible labels are short;
  the full link text is in `aria-label`. Only the first of `showcase.shots` is shown. Data lives in `WorkItem.showcase`; screenshots sit in
  `public/work/<slug>/` as WebP. Case studies follow as a ledger (`CaseLedger`):
  case and org · status | question (italic) | outcome with its own label (What changed /
  Current result) | Read →. The Creative Evidence Lab study design is its last row. It is
  a grid, not a `<table>`, so below 780px each row stacks and the column names repeat in
  the cells instead of scrolling sideways. Item titles are h4 on the home page (under a
  section and a subhead) and h3 on `/work` (where the subhead is the h2): pass `heading`.
- **Market stories are hosted here.** Seven fixed stories live in
  `src/content/market-stories.json` and render at `/writing/market-stories/[slug]`
  (`src/lib/marketStories.ts`). Each states its own price cutoff (`pricesThrough`), never a
  shared date. Every chart has a full-size link; multi-panel charts scroll sideways at their
  source size below 760px rather than shrinking past legibility. Each reads as a short essay,
  not a report: three takeaways, then plain paragraphs in a fixed order (the pattern, the
  chart, how analysts read it, my view as separate arguments with their evidence, what to
  watch). No subheadings, no tables, abbreviations spelled out. Sources sit on one line at
  the end, attributions only — no source excerpts — and link out only to public primary
  filings. They are not `Article`s and never appear in Published.
- **Articles use the same essay shape as market stories.** Three takeaways, then plain
  paragraphs: the pattern, one worked example (a table or answer pairs), the common
  practice, my view as separate arguments each backed by a cited result or computed
  number, and what to check next. No subheadings or bullet lists in the body; sources on
  one line at the end, linking to the paper.
- **Method notes identify their format** in the article header, Writing index and home
  writing list using the existing metadata text style. They distinguish proposed
  analyses from completed findings; section headings may organize the research approach.
- **A writing link exists only where a body exists.** `articleHref()` is the single source
  for that, on the home page, the writing index, and case pages alike.
- **An unlisted article (`listed: false`) still publishes** but stays off the home page,
  the Writing index and case pages; other pieces reach it through their sources line.

## Spacing
- **Density:** Roomy between sections, rules instead of boxes inside them.
- **Sections:** `64px` desktop vertical padding, `48px` for tight sections, `52px` mobile. Consecutive sections are separated by a 1px rule.
- **Rows:** `28px` vertical, separated by a 1px rule. Index rows (writing, papers): `18–20px`.
- **Case sections:** `48px` vertical, separated by a 1px rule.

## Layout
- **Max content width:** `1180px` (`--wrap`). **Prose measure:** `720px` (`--prose`) — body copy, notes, and definition lists are capped at it.
- **Margin column:** `.row` is a main column plus a `280px` margin (`--margin`) with a `56px` gutter. The margin holds outcomes, figure copy and case meta. Below 980px it stacks under the main column.
- **Hero:** Copy left, circular portrait right (280px desktop, 240px tablet); below 640px the portrait (160px) stacks above the copy. Path timeline sits under both, separated by a dark-border rule.
- **Cards only where there is a picture.** Build cards and market-story cards (screenshot or chart on top) use a 1px border-strong frame, no radius, no shadow; hover darkens the border to ink. Everything else — the case ledger, writing, papers — is rows on rules. Groups open with an ink rule and a mono label (`.subhead`); consecutive groups on `/work` and `/writing` (`.section--grouped`) share one gap and no extra rule.
- **Index rows:** date or tickers in a `112px` mono column, title and excerpt, metadata right-aligned. One column below 780px.
- **Page headers** (`/work`, `/writing`, case, article, market story) are paper, not dark: back link, mono meta, serif H1, italic question or excerpt.
- **Actions** below the hero are underlined mono links (`.act`, `.act--primary` in teal), not buttons. `.btn` exists for the hero only.
- **Tables:** always inside `.tablewrap` with `overflow-x: auto`, ink top rule, mono column heads, no fill. The page body must never scroll horizontally.

## Motion
- **Approach:** Minimal-functional. Only 0.18s color, border, and opacity transitions.
- All motion is disabled under `prefers-reduced-motion`.

## Accessibility
- One `<h1>` per page. Sections use real headings in order.
- `:focus-visible` shows a 2px accent outline at 3px offset. A skip link targets `#main`.
- Body text, muted text, and the accent all clear 4.5:1 on their own backgrounds; the light accent is used on dark.
- Real link text ("Read the case", not "Open"). Images carry alt text.
- The current top-level section carries `aria-current="page"` in the nav.
- Section anchors and article headings use `scroll-margin-top: 96px` so the sticky nav does not cover a jumped-to heading.

## Page Order
`/` Hero (portrait + intro, Path timeline, colleague quotes) → Selected work (Independent build cards → Case ledger, Lab study design as its last row) → Writing (up to 4 articles → 4 Market stories, compact index → Published research: year, title, journal) → Contact
`/work` Compact header → Industry cases (ledger) → Independent builds (cards) → In the lab (ledger). Papers live only under Writing.
`/work/[slug]` Header (status, title, question, data boundary, actions) → Brief with case meta in the margin → per-item sections → Limitations → Related writing
`/writing` Compact header → Published (dated index) → Market stories (chart cards: tickers, title, summary, window) → In progress (max 3) → Research (full papers with authors and links)
`/writing/market-stories/[slug]` Header (tickers, title, window) → In short (three takeaways) → Lead paragraphs → Chart → Body paragraphs → Sources line → Price-context note
`/writing/[slug]` Header → In short (three takeaways) → Body (example, then paragraphs; table of contents only if the piece has two or more headings) → Sources line → Related work

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
| 2026-09-08 | No employer or product is named anywhere | The site has to be shareable without inviting an HR or legal conversation. Category descriptions carry the same signal to a reader who knows the space. |
| 2026-09-08 | Every case opens with a 60-second brief | The previous order made a reader work through method before reaching the contribution. Hiring readers stopped before the contribution. |
| 2026-09-08 | Case sections became a per-item ordered array | Seven items were being forced through one research-report template. A study design and an industry case do not have the same reading order. |
| 2026-09-08 | Hero thesis card replaced by a three-row focus index | The card argued a method and was specific to one project. The index sends the reader into the work and buys back the vertical space. |
| 2026-09-08 | Status labels renamed to Case study / Working prototype / Study design | "Published" was read as "result proven". The label now names the artifact type. |
| 2026-09-08 | Share card is a committed PNG, not a generated route | `next/og` under `output: 'export'` emits an extensionless file with no Content-Type, which scrapers reject. |
| 2026-10-01 | Home hero leads with portrait, name, and a short intro; focus index replaced by a Path timeline | A first-time reader wanted to know who this is and how they got here before reading cases. The name returns to the H1 and the claim moves directly under it. |
| 2026-10-01 | Portrait moved right and enlarged to 340px; Path timeline names employers | The small left portrait left the right half of the hero empty. Owner approved naming employers on the timeline only. |
| 2026-10-01 | Employers named across the site; the "described by category" note removed | Owner decision. Supersedes the 2026-09-08 no-names rule. Internal product names and confidential results stay off the site. |
| 2026-10-01 | Removed /about; hero eyebrow is "Data Scientist and AI builder" | The home hero and Path timeline already carry the bio and experience. Research lives at /writing#research. |
| 2026-10-01 | Four testimonials restored, verbatim, in the hero under the Path timeline | Owner asked for them next to the experience. Quotes are never shortened; compactness comes from type size and the shared four-column grid instead. |
| 2026-10-15 | Independent builds grid on `/work` moved from three columns to two | A fourth build left one card alone on a row; two columns hold an even count without changing card design. |
| 2026-10-15 | Selected work leads with an Independent builds showcase with real screenshots | Owner asked to highlight the live products. Three builds a reader can open (El Niño workbench, ChurchMap, Debrief) get screenshots; Narrative Intelligence has no public interface and stays a card. |
| 2026-10-16 | Market stories are hosted copies under `/writing`; the Narrative Atlas showcase and links are removed | Owner decision, superseding the same-day link-out version. The stories stand as writing on this site without pointing to the original project. |
| 2026-10-16 | Narrative Intelligence removed from the site | Owner decision. The case, its public fixture and the links from planned writing are removed; the market stories stay as standalone writing. |
| 2026-10-16 | Independent builds grid on `/work` uses three columns when there are exactly three | Removing Narrative Intelligence left three builds; two columns would strand one card, which the 2026-10-15 change was meant to avoid. |
| 2026-10-16 | Market stories rewritten as essays: three takeaways, plain paragraphs, one sources line | Owner decision. As writing samples, the report format (dated turning points, per-section source lists, tables) read as tool output rather than an argument. |
| 2026-10-16 | Published articles rewritten in the same essay shape | Owner decision. One reading pattern across all writing; each argument now carries outside evidence instead of resting on illustrative examples alone. |
| 2026-10-17 | Hero claim, intro, footer blurb and page ledes rewritten; the positioning line in DESIGN.md and README.md updated to match; 14 unpublished excerpts rewritten | The old copy stacked three-item lists ("experimentation, measurement, and AI evaluation for recommendations, advertising, and AI products"), which was the clearest tell on the site. |
| 2026-10-17 | Prose pass: removed ordinal signposting ("My first point", "Second,", "Third,", "Read down the table") and repeated framing formulas from the essays, the case bodies, the briefs and the market stories; the five-part essay shape, the numbers and the citations are unchanged | Four pieces on different subjects were reading as one template, and the template was the part that felt generated. |
| 2026-10-17 | Tightened hero spacing and intro; kept all four colleague quotes verbatim | Bring Selected work into the first desktop viewport at 1440×900; desktop hero uses 32px / 24px padding and a 280px portrait. |
| 2026-10-17 | Wide case cards show Evidence and Methods; showcases add Role / Methods with bottom-aligned actions and portrait screenshot frames | Improve comparison and fill unused columns while retaining the existing showcase structure. |
| 2026-10-17 | Brief and In short cards overlap the dark header by 28px and 20px | Connect the header to the reading surface. |
| 2026-10-19 | "Why My El Niño Research Mostly Says Don’t Trade" unlisted; reachable only from the twelve-episodes essay's sources line | Owner decision. Two essays on one project shared most of their numbers and took two of the four home-page writing slots. |
| 2026-10-20 | Everything below the home hero redesigned as a typeset paper (direction "A · Paper"): Source Serif 4 body, IBM Plex Mono labels, warm paper `#fbf9f4`, margin column, live builds as numbered figures, rows instead of cards, writing as a dated index, light page headers on every inner page, light footer | Owner chose direction A from three mockups. The card grid read as a generic portfolio; the paper treatment matches the site's argument that the evidence is the product. |
| 2026-10-20 | Home hero and Path keep their original dark, Source Sans design; only the copy changed | Owner decision. The hero works as an introduction; the Path intro sentence ("Each step moved the work closer…") was cut and step details shortened. |
| 2026-10-20 | One teal accent site-wide; the annotation red from the mockup was not adopted | Owner decision. Two accents (teal hero, red body) would split the site in two. |
| 2026-10-20 | Selected work compacted to the ledger layout: three build cards with one screenshot each, case studies as a question → outcome ledger; serif/mono type, teal accent and hero unchanged | Owner decision. The figure rows took about 3,000px at 1440 wide; the section is now about 1,450px. |
| 2026-10-20 | Hero claim "I make product progress measurable." and a four-sentence intro, supplied by the owner; positioning line in DESIGN.md and README.md updated to match | Owner copy. Supersedes the two-to-three-sentence intro rule. |
| 2026-10-20 | Build cards show Target users instead of Role | Owner decision. "Independent" already states the role; who the product is for says more. |
| 2026-10-20 | Compact Published research moved above Selected work on the home page; the contact block no longer links to it | Owner decision. Peer-reviewed work is the quickest credibility signal; titles and journals only, authors stay on `/writing#research`. |
| 2026-10-20 | `/work` and `/writing` compacted the same way as the home page: ledger and build cards on `/work`, dated index and market-story chart cards on `/writing`, compact page headers; the row-with-margin work card was removed | Owner decision. Supersedes the 2026-10-17 wide cards with Evidence and Methods; those stay on the case page. |
| 2026-10-20 | Published research moved again: from above Selected work to the end of the home Writing section, under Market stories; removed from `/work` | Owner decision, superseding the same-day placement. Papers are writing; `/writing#research` has the full list. |
| 2026-10-20 | Narrative Atlas returns as an independent build (Working prototype), placed before Debrief, linking to the public static atlas; no Code link because the repository is private | Owner decision, superseding the 2026-10-16 removal. The case covers the pipeline, the duplicate audit and the evaluation gaps, and does not repeat the market stories. Screenshots are of the stock, narratives and library pages, not the market-story landing page. |

| 2026-10-22 | Removed redundant index introductions, paired section titles, footer labels and bio, build-card method lists, and case section numbers | Owner principle: let hierarchy, spacing, and grouping explain the interface. Status, audience, case methods, evidence boundaries, and substantive content remain. |
