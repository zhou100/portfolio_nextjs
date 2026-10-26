# Project architecture overviews

The four showcased builds have a curated product/data flow after their case brief.
Content lives in `src/lib/architecture.ts`; the shared React component uses real
HTML text and an ordered list, with decorative SVG arrows. Wide screens read left
to right; screens below 980px read top to bottom without scaling text or panning.
These are introductory flows, not exhaustive deployment diagrams.

Reviewed against project documentation on 2026-10-26:

- El Niño: `zhou100/commodities`, `README.md` — dated archive, frozen historical
  research, separate forward monitoring, committed reports, static workbench,
  publication exclusions. https://github.com/zhou100/commodities/blob/main/README.md
- ChurchMap: `zhou100/church_map`, `OVERVIEW.md` — raw HTML capture, extraction
  and deterministic tags, Supabase Postgres, FastAPI, React/Leaflet.
  https://github.com/zhou100/church_map/blob/main/OVERVIEW.md
- Narrative Atlas: private pipeline README, reviewed alongside its portfolio case — PDF conversion,
  attributed extraction, timelines/clusters, deterministic lifecycle and validated
  reader artifacts. Public overview: https://yujun.net/work/narrative-atlas
  Price context is separate from narrative lifecycle state.
- Debrief: `zhou100/brief-voice-memo`, `README.md` — React recording, FastAPI jobs,
  Whisper, structured summaries, Postgres/object storage and account-based reviews.
  https://github.com/zhou100/brief-voice-memo/blob/main/README.md

Keep model versions, hosting plans, scale claims and optional enrichment outside
these introductory diagrams. Review this file with future pipeline changes.
