import data from '@/content/architecture.json';

export type ArchitectureNode = {
  id: string;
  title: string;
  technology: string;
  detail: string;
  kind: 'service' | 'process' | 'database' | 'object' | 'files' | 'frontend' | 'external';
};
export type ArchitectureOverview = {
  summary: string;
  /** Horizontal position (0–1) the phone viewport opens on, near the entry components. */
  mobileStart: number;
  groups: { title: string; nodes: ArchitectureNode[] }[];
  edges: { from: string; to: string; label: string; control: boolean; bidirectional?: boolean }[];
};

export const architectureOverviews = data as Record<string, ArchitectureOverview>;
