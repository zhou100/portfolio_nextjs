import data from '@/content/market-stories.json';

/**
 * Market stories hosted on this site. Each one follows how the analyst view on a stock or a
 * group of stocks changed, ties each turning point to its sources, and sets the price path
 * against QQQ. Content is a fixed snapshot kept in `src/content/market-stories.json`; each
 * story carries its own price window (`pricesThrough`). Source excerpts are not reproduced,
 * only attributions, with links to public primary filings where they exist.
 */

export interface StorySource {
  name: string;
  /** Only public primary sources (filings, investor relations). */
  href?: string;
}

export interface StoryItem {
  label: string;
  text: string;
  sources: StorySource[];
}

export interface StoryTable {
  title?: string;
  head: string[];
  rows: string[][];
  notes: string[];
}

export interface StorySection {
  heading: string;
  notes?: { text: string; sources?: StorySource[] }[];
  asof?: string;
  items?: StoryItem[];
  tables?: StoryTable[];
}

export interface StoryImage {
  src: string;
  width: number;
  height: number;
}

export interface MarketStory {
  slug: string;
  title: string;
  tickers: string[];
  /** "Jan 12, 2026 – Oct 2, 2026 · Prices: Dec 31, 2025 – Oct 2, 2026" */
  window: string;
  /** One sentence for the index. */
  summary: string;
  /** One line for the index: what would change the view. */
  watch: string;
  thumb: StoryImage;
  chart: StoryImage & { alt: string };
  thesis: string;
  thesisSources: StorySource[];
  chartNote?: string;
  note?: string;
  sections: StorySection[];
}

const stories = data as MarketStory[];

export function getMarketStories(): MarketStory[] {
  return stories;
}

export function getMarketStoryBySlug(slug: string): MarketStory | undefined {
  return stories.find((story) => story.slug === slug);
}

export function marketStoryHref(story: MarketStory): string {
  return `/writing/market-stories/${story.slug}`;
}

/** Last price date in this story's window ("… · Prices: Aug 5, 2026 – Aug 6, 2026"). */
export function pricesThrough(story: MarketStory): string {
  const prices = story.window.split('Prices:')[1];
  if (!prices) throw new Error(`Market story ${story.slug} has no price window`);
  return prices.split('–').pop()!.trim();
}

/** The analysis window alone, for cards. */
export function analysisWindow(story: MarketStory): string {
  return story.window.split(' · ')[0];
}
