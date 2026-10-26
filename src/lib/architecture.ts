export type ArchitectureOverview = {
  summary: string;
  stages: { title: string; detail: string; connection?: string }[];
  note: string;
};

/** Curated product flows, not deployment topologies. Source notes: docs/architecture-overviews.md. */
export const architectureOverviews: Record<string, ArchitectureOverview> = {
  'el-nino-commodities': {
    summary: 'From climate and crop data to a research workbench with an auditable evidence trail.',
    stages: [
      { title: 'Source data', detail: 'Climate, rainfall, crop supply and prices', connection: 'Archive' },
      { title: 'Dated archive', detail: 'Keep source release and capture times', connection: 'Test & monitor' },
      { title: 'Research & monitoring', detail: 'Frozen historical tests; separate weekly updates', connection: 'Export reports' },
      { title: 'Research workbench', detail: 'Static views of committed evidence and reports' },
    ],
    note: 'Publication checks keep raw files and vendor futures quotes out of the site. A result can be “watch, don’t trade.”',
  },
  churchmap: {
    summary: 'From church websites to searchable profiles that help someone plan a first visit.',
    stages: [
      { title: 'Church websites', detail: 'Roster and captured website pages', connection: 'Extract & tag' },
      { title: 'Structured profiles', detail: 'AI extraction, source snippets and rule-based tags', connection: 'Store' },
      { title: 'Directory & API', detail: 'Postgres records served through FastAPI', connection: 'Search & browse' },
      { title: 'Map & church pages', detail: 'React and Leaflet show local options and details' },
    ],
    note: 'Profiles describe what a church says about itself. Website coverage and freshness remain separate from verified visit quality.',
  },
  'narrative-atlas': {
    summary: 'From dated research documents to traceable company views and evolving market narratives.',
    stages: [
      { title: 'Research documents', detail: 'Archived PDFs converted to Markdown', connection: 'Extract claims' },
      { title: 'Attributed evidence', detail: 'AI extracts tickers, narratives and source references', connection: 'Build timelines' },
      { title: 'Narrative history', detail: 'Clusters and rule-based lifecycle updates', connection: 'Validate artifacts' },
      { title: 'Atlas reader', detail: 'Company pages, narratives and source library' },
    ],
    note: 'Price context is displayed alongside the evidence; it does not drive narrative lifecycle states. Extraction accuracy remains unmeasured.',
  },
  debrief: {
    summary: 'From a spoken note to a structured debrief, then daily and weekly reflection.',
    stages: [
      { title: 'Voice capture', detail: 'Record in the React app; try without signing in', connection: 'Submit audio' },
      { title: 'Transcription', detail: 'FastAPI jobs send audio to Whisper', connection: 'Structure text' },
      { title: 'Summary & todos', detail: 'A language model extracts key points and categories', connection: 'Review & save' },
      { title: 'Personal reviews', detail: 'Saved entries feed daily and weekly reviews' },
    ],
    note: 'Postgres stores entries and job state; object storage holds audio. Signing in connects the trial result to an account.',
  },
};
