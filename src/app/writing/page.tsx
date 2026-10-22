import type { Metadata } from 'next';
import Link from 'next/link';
import {
  articleHref,
  getDraftingArticles,
  getListedArticles,
} from '@/lib/writing';
import { getOgImage, getSite } from '@/lib/portfolio';
import { getWorkBySlug } from '@/lib/work';
import MarketStories from '../components/Writing/MarketStories';
import Papers from '../components/Writing/Papers';
import './writing.css';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on evaluating AI systems and measuring product outcomes, plus peer-reviewed research.',
  alternates: { canonical: '/writing' },
  openGraph: {
    title: 'Writing',
    description: 'Notes on evaluating AI systems and measuring product outcomes, plus peer-reviewed research.',
    url: '/writing',
    images: [getOgImage()],
  },
};

export default function WritingIndex() {
  const site = getSite();
  const published = getListedArticles();
  // At most three. A list of promises is not a body of work.
  const next = getDraftingArticles().slice(0, 3);

  return (
    <>
      <header className="pagehead pagehead--compact">
        <div className="wrap">
          <h1 className="pagehead__title">Writing</h1>
        </div>
      </header>

      {!!published.length && (
        <section className="section section--tight section--grouped" id="published">
          <div className="wrap">
            <div className="subhead">
              <h2 className="subhead__title">Published</h2>
            </div>
            <ul className="index">
              {published.map((article) => {
                const href = articleHref(article);
                const work = article.relatedWork ? getWorkBySlug(article.relatedWork) : undefined;

                return (
                  <li className="index__row" key={article.slug}>
                    <span className="label">{article.publishedAt}</span>
                    <div>
                      <h3 className="index__title">
                        {href ? <Link href={href}>{article.title}</Link> : article.title}
                      </h3>
                      <p className="index__excerpt">
                        {article.excerpt}
                        {work && (
                          <>
                            {' '}
                            <Link className="textlink" href={`/work/${work.slug}`}>
                              Draws on {work.title}
                            </Link>
                          </>
                        )}
                      </p>
                    </div>
                    <span className="label index__meta">
                      {[article.topic, article.format, article.readingTime]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <section className="section section--tight section--grouped" id="market-stories">
        <div className="wrap">
          <div className="subhead">
            <h2 className="subhead__title">Market stories</h2>
          </div>
          <MarketStories />
        </div>
      </section>

      {!!next.length && (
        <section className="section section--tight section--grouped" id="next">
          <div className="wrap">
            <div className="subhead">
              <h2 className="subhead__title">In progress</h2>
            </div>
            <ul className="index">
              {next.map((article) => (
                <li className="index__row index__row--two" key={article.slug}>
                  <span className="label">{article.topic}</span>
                  <div>
                    <h3 className="index__title">{article.title}</h3>
                    <p className="index__excerpt">{article.excerpt}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section section--tight section--grouped" id="research">
        <div className="wrap">
          <div className="subhead subhead--split">
            <h2 className="subhead__title">Research</h2>
            {site.social.googleScholar && (
              <a
                className="arrowlink"
                href={site.social.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Scholar →
              </a>
            )}
          </div>
          <Papers />
        </div>
      </section>
    </>
  );
}
