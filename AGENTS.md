# Portfolio working agreement

This is the shared repository instruction source. `CLAUDE.md` imports it.
Follow the active host's precedence and the user's authorized task; this file
does not grant permission to publish, change access or run external operations.

## Project facts and routing

- Outcome: help a reader understand Yujun Zhou's contribution and inspect the
  evidence and limits of each case study or article.
- Active implementation: Next.js App Router in `src/app/`; content in
  `src/lib/portfolio.ts`, `src/lib/work.ts`, `src/lib/writing.ts` and
  `src/content/market-stories.json` through `src/lib/marketStories.ts`.
- Generated output: `out/` and `.next/`; architecture SVGs come from
  `tools/generate-architecture.cjs` (`npm run diagrams`). `public/og.png`
  comes from `tools/og-card.html`; read [tools/README.md](tools/README.md).
  `archive/legacy-2026-04-14/` is historical, not the active implementation.
- Setup and commands: [README.md](README.md), `package.json`, `next.config.js`.
  Static export is configured; preserve direct-link/prerender behavior.
- Product/design authority: [DESIGN.md](DESIGN.md), including the dated decision
  log and explicit supersessions. Check current content/types before changing a contract.
- Operations: the current user's task supplies publication scope; a local build
  is not deployment evidence. Keep private project data and secrets off the site.

Read the relevant content producer, consuming route/components and DESIGN.md
before content-model or UI work. Do not load unrelated project documents for
small edits. Missing optional tooling is not a blocker when existing tools suffice.

## Design and content boundaries

Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that does not match DESIGN.md.
Preserve the existing typography, colors, accessibility, and substantive content.
Avoid unnecessary secondary labels and descriptions. Let the layout do the explaining.

- Keep employer naming and confidentiality rules in DESIGN.md: internal product
  names, confidential data and results are not public case-study material.
- Preserve evidence types and their meaning in `src/lib/work.ts`. Distinguish
  reported experience, observation, offline benchmark, experiment and synthetic
  demonstration; publication or a live demo does not prove measured quality.
- Use `articleHref()` and the existing status/body rules for article links.
  Preserve `listed: false` semantics. Link only to actual resources; private
  code, missing resumes and unpublished bodies must not produce dead public links.
- For claims, numbers and charts, retain the source, population/unit, window,
  denominator, calculation and cutoff. Preserve each market story's own price
  cutoff and attribution. Do not turn retrospective association into a causal
  or predictive claim, or a proposed analysis into completed findings.
- For newly calculated results, define the target quantity and metric source
  before choosing a method; check sample coverage, independent units, alternative
  explanations and uncertainty as relevant. Retain negative/inconclusive findings
  and a reproducible derivation. Copy edits do not authorize new research.
- Change generated assets through their producer unless direct repair is requested;
  preserve substantive content, provenance and accessibility. A screenshot must
  represent the actual public product, not invented product behavior.

## Work and verification

For a substantive task, state the intended behavior, affected boundary, plausible
failure and smallest useful check. Preserve unrelated work; avoid new frameworks
or dependencies without a demonstrated need. Derive important expected results
from the approved rule or independent example, not from the implementation under
test. Do not weaken a check or relabel evidence to make a candidate pass.

- Documentation-only: verify claims, links and `git diff --check`; no build needed.
- Copy/content: inspect affected text, actual links and rendering; check the
  evidence boundary. Do not rerun unrelated journeys.
- UI/routes/content-model changes: inspect affected desktop/mobile and keyboard
  behavior, empty/error states where applicable, and direct links. Use the
  relevant scripts in `package.json`; `npm run build` includes `diagrams:check`.
  Stop a running dev server before building, as README requires, to avoid mixed
  `.next/` output. Do not invent a test script that the repository does not have.
- Diagram changes: regenerate from the source, inspect readability and use
  `npm run diagrams:check`. Do not hand-edit generated SVGs to hide stale sources.
- Authorized publication: verify the exact revision and affected live journey;
  retain the existing rollback path. A build pass only establishes a local build.

For a material correction, keep the smallest useful evidence in the diff, test or
handoff: failure, source, correction, check and remaining limit. Add a durable
rule only when needed and validated; retire superseded rules rather than stacking
them. Report what changed, actual checks/outcomes, skips and uncertainty. Do not
claim improved speed or quality without a defined comparison.

## Current product contracts

- Keep Next.js static export (`output: 'export'` and unoptimized images) and
  prerendered direct links. Active case pages are under `src/app/work/[slug]`;
  `src/lib/work.ts` owns case data and evidence meanings, not duplicate route copy.
- DESIGN.md owns the paper treatment: Source Serif 4 body, IBM Plex Mono metadata,
  Source Sans 3 in the dark home hero, warm paper and teal accent. Historical
  decisions can be superseded; follow the current specification and explicit log.
- Case pages remain essays with one metadata line, three or four paragraphs and
  at most one table; independent builds end with their generated architecture
  figure. Public status badges stay omitted while internal status drives grouping.
- Market stories retain individual `pricesThrough` cutoffs and public primary
  filing attribution. A hosted story is not a published Article. Existing article
  body/status/listing contracts apply across home, writing and case links.
- Delayed UI results/restored state must match current inputs when relevant.
  Preserve filtering/ordering/truncation contracts across content surfaces; do not
  infer site-wide absence from a selected list. This static site needs no new
  asynchronous machinery solely to implement a general working principle.
