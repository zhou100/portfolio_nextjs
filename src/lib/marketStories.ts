import data from '@/content/market-stories.json';

/**
 * Market stories hosted on this site. Each one is a short essay on how the view on a stock or
 * a group of stocks changed: three takeaways, the pattern, the price chart against QQQ, how
 * analysts read it, my view with its evidence, and what to watch. Content is a fixed snapshot
 * kept in `src/content/market-stories.json`; each story carries its own price window
 * (`pricesThrough`). Sources are listed once, on one line at the end, with links only to
 * public primary filings.
 */

export interface StorySource {
  name: string;
  /** Only public primary sources (filings, investor relations). */
  href?: string;
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
  /** What the chart plots, for the caption. */
  chartNote: string;
  /** Three takeaways, shown first. */
  tldr: string[];
  /** Paragraphs before the chart: the pattern. */
  lead: string[];
  /** Paragraphs after the chart: how it moved, how analysts read it, my view, what to watch. */
  body: string[];
  sources: StorySource[];
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
