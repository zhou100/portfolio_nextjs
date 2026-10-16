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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Attributions only. Public primary filings link out; everything else is plain text. */
function Sources({ sources, label = 'Sources' }: { sources?: StorySource[]; label?: string }) {
  if (!sources?.length) return null;

  return (
    <p className="story-sources">
      <span>{label}:</span>{' '}
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
          <p className="article-page__excerpt">{story.thesis}</p>
          <p className="story-page__window">Analysis: {story.window}</p>
        </div>
      </header>

      <div className="wrap article-page__body">
        <Sources sources={story.thesisSources} label="Thesis sources" />

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
            {story.chartNote && <span>{story.chartNote}</span>}
            {story.note && <span>{story.note}</span>}
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

        {story.sections.length > 1 && (
          <nav className="toc" aria-label="On this page">
            <p className="toc__label">On this page</p>
            <ol className="toc__list">
              {story.sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${slugify(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="article-page__prose">
          {story.sections.map((section) => (
            <section className="story-section" key={section.heading}>
              <h2 className="article-page__h2" id={slugify(section.heading)}>
                {section.heading}
              </h2>
              {section.notes?.map((note) => (
                <div key={note.text}>
                  {note.sources ? (
                    <Sources sources={note.sources} label={note.text.replace(/:$/, '')} />
                  ) : (
                    <p className="story-note">{note.text}</p>
                  )}
                </div>
              ))}
              {section.asof && <p className="story-note">{section.asof}</p>}

              {section.items?.map((item) =>
                item.label.includes(' · ') ? (
                  <div className="story-item" key={item.label}>
                    <h3 className="story-item__title">{item.label}</h3>
                    <p>{item.text}</p>
                    <Sources sources={item.sources} />
                  </div>
                ) : (
                  <div className="story-item" key={item.label}>
                    <p>
                      {item.label && <strong>{item.label}:</strong>} {item.text}
                    </p>
                    <Sources sources={item.sources} />
                  </div>
                ),
              )}

              {section.tables?.map((table) => (
                <div className="story-table" key={table.title ?? table.head.join('|')}>
                  {table.title && <h3 className="story-item__title">{table.title}</h3>}
                  <div className="tablewrap">
                    <table>
                      <thead>
                        <tr>
                          {table.head.map((cell) => (
                            <th key={cell} scope="col">
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row) => (
                          <tr key={row.join('|')}>
                            {row.map((cell, index) =>
                              index === 0 ? (
                                <th key={`${index}-${cell}`} scope="row">
                                  {cell}
                                </th>
                              ) : (
                                <td key={`${index}-${cell}`}>{cell}</td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {!!table.notes.length && (
                    <ul className="story-table__notes">
                      {table.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          ))}
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
