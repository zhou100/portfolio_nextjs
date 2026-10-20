import Image from 'next/image';
import Link from 'next/link';
import {
  analysisWindow,
  getMarketStories,
  marketStoryHref,
  pricesThrough,
} from '@/lib/marketStories';

/** A long ticker list would wrap down the narrow date column; name three and count the rest. */
function shortTickers(tickers: string[]): string {
  return tickers.length > 3
    ? `${tickers.slice(0, 3).join(' · ')} +${tickers.length - 3}`
    : tickers.join(' · ');
}

/** Index of the market stories hosted under /writing/market-stories. */
export default function MarketStories({ compact = false, limit }: { compact?: boolean; limit?: number }) {
  const stories = getMarketStories().slice(0, limit);

  if (compact) {
    return (
      <ul className="index">
        {stories.map((story) => (
          <li className="index__row" key={story.slug}>
            <span className="label">{shortTickers(story.tickers)}</span>
            <h4 className="index__title">
              <Link href={marketStoryHref(story)}>{story.title}</Link>
            </h4>
            <span className="label index__meta">Prices to {pricesThrough(story)}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="storycards">
        {stories.map((story) => {
          const href = marketStoryHref(story);

          return (
            <li className="storycard" key={story.slug}>
              <Link className="storycard__chart" href={href} tabIndex={-1} aria-hidden="true">
                <Image
                  src={story.thumb.src}
                  alt=""
                  width={story.thumb.width}
                  height={story.thumb.height}
                />
              </Link>
              <div className="storycard__body">
                <span className="label">{shortTickers(story.tickers)}</span>
                <h3 className="storycard__title">
                  <Link href={href}>{story.title}</Link>
                </h3>
                <p className="storycard__summary">{story.summary}</p>
                <span className="label storycard__window">{analysisWindow(story)}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="stories__note">
        Each story is a fixed snapshot with its own price window. Price charts give context; they
        do not establish what caused a return.
      </p>
    </>
  );
}
