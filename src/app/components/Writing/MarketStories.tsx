import Image from 'next/image';
import Link from 'next/link';
import {
  MARKET_STORIES_AS_OF,
  analysisWindow,
  getMarketStories,
  marketStoryHref,
} from '@/lib/marketStories';

/** Index of the market stories hosted under /writing/market-stories. */
export default function MarketStories({ compact = false }: { compact?: boolean }) {
  const stories = getMarketStories();

  if (compact) {
    return (
      <ul className="storylist">
        {stories.map((story) => (
          <li key={story.slug}>
            <Link className="storyrow" href={marketStoryHref(story)}>
              <span className="storyrow__chart">
                <Image
                  src={story.thumb.src}
                  alt=""
                  width={story.thumb.width}
                  height={story.thumb.height}
                />
              </span>
              <span>
                <span className="storyrow__tickers">{story.tickers.join(' · ')}</span>
                <span className="storyrow__title">{story.title}</span>
              </span>
            </Link>
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
              <Link className="story__chart" href={href} tabIndex={-1} aria-hidden="true">
                <Image
                  src={story.thumb.src}
                  alt=""
                  width={story.thumb.width}
                  height={story.thumb.height}
                />
              </Link>
              <div className="story__meta">
                <span className="card__org">{story.tickers.join(' · ')}</span>
                <span className="card__org">{analysisWindow(story)}</span>
              </div>
              <h3 className="story__title">
                <Link href={href}>{story.title}</Link>
              </h3>
              <p className="story__summary">{story.summary}</p>
              <p className="story__watch">
                <span>What to watch</span> {story.watch}
              </p>
              <Link className="arrowlink story__link" href={href}>
                Read the story →
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="stories__note">
        Prices through {MARKET_STORIES_AS_OF}. Price charts give context; they do not establish
        what caused a return.
      </p>
    </>
  );
}
