# Technical architecture diagrams

The four showcased builds have system diagrams after their case briefs, intended
for tech leads and engineering managers. These show actual storage, processing,
API boundaries and clients rather than a linear product journey.

## Editing and generation

- `src/content/architecture.json` is the single source for typed components,
  groups, directional edges and concise architecture notes.
- `src/lib/architecture.ts` provides the TypeScript contract.
- `tools/generate-architecture.cjs` validates IDs and endpoints, then uses pinned
  development-only `@viz-js/viz` / Graphviz to generate the four committed SVGs.
- Run `npm run diagrams` after editing the graph. `npm run diagrams:check` detects
  stale SVGs without writing; the production build includes this check.
- No graph engine, model call or network dependency runs in the browser.

Graphviz uses layered placement, reserved cluster boundaries and labelled edges.
Database/object stores use cylinders with explicit kind labels; files use folders;
frontend tabs and service/process boxes remain distinct. Solid arrows represent
data or API traffic; dashed arrows represent scheduling/authentication/control.
Double-ended arrows represent the request/response or read/write labels shown.

Above 1200px the SVG is visible with a full-size link and an expandable HTML
component/connection equivalent. At 1200px and below, the same graph renders as
stacked layers with readable text and named, keyboard-accessible destination
links. Mobile does not discard any components or connections. Hidden desktop and
mobile copies use distinct IDs. The text equivalent also states two-way/control
semantics, independent of color and decorative arrows.

## Evidence reviewed on 2026-10-26

### El Niño / commodities

- [README](https://github.com/zhou100/commodities/blob/main/README.md): Python
  fetchers, frozen research versus weekly monitoring, committed reports/snapshots,
  static HTML/JS workbench and publication exclusions.
- `src/climcomm/ingest/archive.py`: immutable file versions and append-only JSONL
  manifest with hashes and source/capture times; point-in-time selection.
- [R2 implementation](https://github.com/zhou100/commodities/blob/main/src/climcomm/storage/r2.py),
  reviewed blob `12a360937e1e0b7674de6f4e7b25ba4bf6936bae`: whitelist, content hashes,
  immutable and append-only synchronization. This is not a relational database.

### ChurchMap

- [Overview](https://github.com/zhou100/church_map/blob/main/OVERVIEW.md): website
  capture to R2; LLM fields/confidence/snippets; deterministic tags; Supabase
  Postgres; FastAPI/psycopg; React/Vite/Leaflet.
- [Directory routes](https://github.com/zhou100/church_map/blob/main/backend/routers/churches.py),
  reviewed blob `ad6785590683a8b809eefb9f20275ed93fc1e957`: SQL repository/pool,
  location/name filters and on-demand enrichment. No semantic vector-search claim.
- `backend/enrichment.py` (blob `cfa903ef7b3bd0ab62a169f7bca34e0d94c06aad`)
  writes and commits Places results using the backend's psycopg connection.
  Google Places returns to the Directory API; it does not write Postgres directly.
- `.github/workflows/crawl.yml`: Actions calls the protected backend fetch,
  extract and tag endpoints; scraping does not run on the scheduler runner.

### Narrative Atlas

- Private pipeline README and `web/server.py` (reviewed blob
  `6ef24ceee1d2a5c4583c628b6b95c6c763801f6b`) verify R2 ingestion, Markdown,
  separate ticker/narrative branches, JSON/JSONL artifacts, manifest checks and
  Flask/Jinja rendering. `plans/analysis-refresh.md` covers derived-work refresh.
- Public context: [portfolio case](https://yujun.net/work/narrative-atlas).
  Do not publish private repository links or source editions.
- Price context goes only to the reader, not the lifecycle engine. The static
  delivery node makes no claim that an automated publisher is enabled.

### Debrief

- [API lifecycle](https://github.com/zhou100/brief-voice-memo/blob/main/backend/app/main.py),
  blob `a988c1139c0349841a2db69906204de74274410e`: worker and hourly TTL sweep are
  embedded asyncio tasks. This overrides the stale separate-process worker docstring.
- [Anonymous endpoints](https://github.com/zhou100/brief-voice-memo/blob/main/backend/app/routes/public_demo.py),
  blob `58191a01ca3606085a88b4dfb3e7411fe5282f6f`: Turnstile gate, API presign,
  direct browser PUT to object storage, submit, status polling and account claim.
- `backend/app/routes/v1/claim.py` (blob
  `b20b6a4eebbf360361cf2c70dbbb97a596994c4e`): the frontend exchanges a session
  with Supabase Auth and then POSTs its claim token under the user's JWT. Auth
  does not initiate the claim request to FastAPI.
- [Queue](https://github.com/zhou100/brief-voice-memo/blob/main/backend/app/services/queue.py),
  blob `50cd57c7331664ad6236e585d31bcbdbb4a83c9a`: PostgreSQL jobs and SKIP LOCKED;
  no Redis/Celery broker.
- [Storage](https://github.com/zhou100/brief-voice-memo/blob/main/backend/app/services/storage.py),
  blob `27d17fb7d92029ad0967a61295eb5409a4004233`: production Cloudflare R2 using
  S3-compatible calls; MinIO for local development.
- [Worker](https://github.com/zhou100/brief-voice-memo/blob/main/backend/app/services/worker.py),
  blob `d0cfe47514333cf0f80ef83e4df60ae596c3bfa6`: read audio, Whisper, GPT
  categorization, database writes and authenticated Supabase Realtime notifications.
  The latter and TTL behavior are notes to keep the core graph readable.

Keep diagram scope at components and interfaces. Do not add unverified deployment
automation, model versions, databases, queues or roadmap features.
