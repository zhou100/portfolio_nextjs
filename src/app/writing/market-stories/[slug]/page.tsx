import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOgImage } from '@/lib/portfolio';
import {
  getMarketStories,
  getMarketStoryBySlug,
  marketStoryHref,
  pricesThrough,
  type StorySource,
} from '@/lib/marketStories';
import '../../[slug]/article.css';
import './story.css';

export function generateStaticParams() {
  return getMarketStories().map((story) => ({ slug: story.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const story = getMarketStoryBySlug(params.slug);
  if (!story) return {};

  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: marketStoryHref(story) },
    openGraph: {
      type: 'article',
      title: story.title,
      description: story.summary,
      url: marketStoryHref(story),
      images: [getOgImage()],
    },
  };
}

/** One line at the end. Public primary filings link out; everything else is plain text. */
function Sources({ sources }: { sources: StorySource[] }) {
  if (!sources.length) return null;

  return (
    <p className="story-sources">
      <span>Sources:</span>{' '}
      {sources.map((source, index) => (
        <span key={`${source.name}-${index}`}>
          {index > 0 && ' · '}
          {source.href ? (
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {source.name}
            </a>
          ) : (
            source.name
          )}
        </span>
      ))}
    </p>
  );
}

export default function MarketStoryPage({ params }: { params: { slug: string } }) {
  const story = getMarketStoryBySlug(params.slug);
  if (!story) notFound();

  const all = getMarketStories();
  const position = all.findIndex((item) => item.slug === story.slug);
  const next = all[(position + 1) % all.length];
  // The multi-panel charts (1236px source) carry small axis text and event labels.
  const wideChart = story.chart.width > 1000;

  return (
    <article className="article-page story-page">
      <header className="article-page__header">
        <div className="wrap">
          <p className="article-page__back">
            <Link className="arrowlink" href="/writing#market-stories">
              ← All market stories
            </Link>
          </p>

          <div className="article-page__meta">
            <span>Market story</span>
            <span>{story.tickers.join(' · ')}</span>
          </div>

          <h1 className="article-page__title">{story.title}</h1>
          <p className="story-page__window">Analysis: {story.window}</p>
        </div>
      </header>

      <div className="wrap article-page__body">
        <section className="story-tldr" aria-label="In short">
          <p className="story-tldr__label">In short</p>
          <ul className="bullets">
            {story.tldr.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <div className="article-page__prose story-prose">
          {story.lead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {/* Small multiples are too dense to shrink to a phone: they scroll sideways at a
            readable width instead, and every chart has a full-size link. */}
        <figure className={`story-figure${wideChart ? ' story-figure--wide' : ''}`}>
          <div
            className="story-figure__frame"
            {...(wideChart
              ? { tabIndex: 0, role: 'region', 'aria-label': 'Chart, scrolls sideways' }
              : {})}
          >
            <Image
              src={story.chart.src}
              alt={story.chart.alt}
              width={story.chart.width}
              height={story.chart.height}
              priority
            />
          </div>
          <figcaption>
            <span>{story.chartNote}</span>
            <a
              className="arrowlink story-figure__open"
              href={story.chart.src}
              target="_blank"
              rel="noopener"
            >
              Open full-size chart ↗
            </a>
          </figcaption>
        </figure>

        <div className="article-page__prose story-prose">
          {story.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Sources sources={story.sources} />
        </div>

        <footer className="article-page__footer">
          <p className="article-page__related">
            Prices through {pricesThrough(story)}. Price moves provide context; they do not
            establish what caused a return. Not investment advice.
          </p>
          <div className="article-page__foot">
            <Link className="arrowlink" href={marketStoryHref(next)}>
              Next story: {next.title} →
            </Link>
            <Link className="arrowlink" href="/writing#market-stories">
              All market stories
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
