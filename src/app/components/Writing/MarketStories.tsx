import Image from 'next/image';
import {
  MARKET_STORIES_AS_OF,
  MARKET_STORIES_URL,
  getMarketStories,
  marketStoryHref,
} from '@/lib/writing';

/**
 * Market stories from Narrative Atlas. The stories live and update on that site, so every
 * entry links out; the chart is a dated snapshot of the live story card.
 */
export default function MarketStories({ compact = false }: { compact?: boolean }) {
  const stories = getMarketStories();

  if (compact) {
    return (
      <ul className="storylist">
        {stories.map((story) => (
          <li key={story.slug}>
            <a
              className="storyrow"
              href={marketStoryHref(story)}
              target="_blank"
              rel="noopener"
            >
              <span className="storyrow__chart">
                <Image
                  src={story.chart.src}
                  alt=""
                  width={story.chart.width}
                  height={story.chart.height}
                />
              </span>
              <span>
                <span className="storyrow__tickers">{story.tickers.join(' · ')}</span>
                <span className="storyrow__title">{story.title} ↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="stories">
        {stories.map((story) => {
          const href = marketStoryHref(story);

          return (
            <li className="story" key={story.slug}>
              <a className="story__chart" href={href} target="_blank" rel="noopener">
                <Image
                  src={story.chart.src}
                  alt={story.chart.alt}
                  width={story.chart.width}
                  height={story.chart.height}
                />
              </a>
              <div className="story__meta">
                <span className="card__org">{story.tickers.join(' · ')}</span>
                <span className="card__org">{story.window}</span>
              </div>
              <h3 className="story__title">
                <a href={href} target="_blank" rel="noopener">
                  {story.title}
                </a>
              </h3>
              <p className="story__summary">{story.summary}</p>
              <p className="story__watch">
                <span>What to watch</span> {story.watch}
              </p>
              <a className="arrowlink story__link" href={href} target="_blank" rel="noopener">
                Read the story ↗
              </a>
            </li>
          );
        })}
      </ul>
      <p className="stories__note">
        Summaries and chart snapshots taken {MARKET_STORIES_AS_OF}. The live stories on{' '}
        <a className="textlink" href={MARKET_STORIES_URL} target="_blank" rel="noopener">
          Narrative Atlas
        </a>{' '}
        update as new research arrives. Price charts give context; they do not establish what
        caused a return.
      </p>
    </>
  );
}
