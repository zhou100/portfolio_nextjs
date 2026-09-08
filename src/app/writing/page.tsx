import type { Metadata } from 'next';
import Link from 'next/link';
import {
  articleHref,
  getDraftingArticles,
  getPapers,
  getPublishedArticles,
} from '@/lib/writing';
import { getSite } from '@/lib/portfolio';
import { getWorkBySlug } from '@/lib/work';
import './writing.css';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Practical notes on evaluating AI systems, measuring product outcomes, and learning from things I build — plus peer-reviewed research.',
  alternates: { canonical: '/writing' },
};

export default function WritingIndex() {
  const site = getSite();
  const published = getPublishedArticles();
  // At most three. A list of promises is not a body of work.
  const next = getDraftingArticles().slice(0, 3);
  const papers = getPapers();

  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="eyebrow">Writing</p>
          <h1 className="pagehead__title">Notes on measurement and AI evaluation.</h1>
          <p className="lede pagehead__lede">
            Practical notes on evaluating AI systems, measuring product outcomes, and learning from
            things I build. Each piece supports one claim, with the examples worked through rather
            than asserted.
          </p>
        </div>
      </header>

      {!!published.length && (
        <section className="section" id="published">
          <div className="wrap">
            <ul className="postlist">
              {published.map((article) => {
                const href = articleHref(article);
                const work = article.relatedWork ? getWorkBySlug(article.relatedWork) : undefined;

                return (
                  <li className="post" key={article.slug}>
                    <div className="post__meta">
                      <span className="card__org">{article.topic}</span>
                      {article.publishedAt && (
                        <span className="card__org">{article.publishedAt}</span>
                      )}
                      {article.readingTime && (
                        <span className="card__org">{article.readingTime}</span>
                      )}
                    </div>
                    <h2 className="post__title">
                      {href ? <Link href={href}>{article.title}</Link> : article.title}
                    </h2>
                    <p className="post__excerpt">{article.excerpt}</p>
                    <div className="post__foot">
                      {href && (
                        <Link className="arrowlink" href={href}>
                          Read article →
                        </Link>
                      )}
                      {work && (
                        <Link className="textlink post__related" href={`/work/${work.slug}`}>
                          Draws on {work.title}
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {!!next.length && (
        <section className="section section--tight" id="next">
          <div className="wrap">
            <div className="section__head">
              <div>
                <p className="eyebrow">In progress</p>
                <h2 className="section__title">What I am writing next</h2>
                <p className="section__lede">
                  Listed with the claim each one has to support. They go up when the example work is
                  done, not on a schedule.
                </p>
              </div>
            </div>

            <ul className="queue">
              {next.map((article) => (
                <li className="queue__item" key={article.slug}>
                  <span className="card__org">{article.topic}</span>
                  <p className="queue__title">{article.title}</p>
                  <p className="queue__excerpt">{article.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section section--tight" id="research">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Research</p>
              <h2 className="section__title">Peer-reviewed publications</h2>
            </div>
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

          <ul className="papers">
            {papers.map((paper) => (
              <li className="paper" key={paper.href}>
                <span className="paper__year">{paper.year}</span>
                <div>
                  <h3 className="paper__title">
                    <a href={paper.href} target="_blank" rel="noopener noreferrer">
                      {paper.title}
                    </a>
                  </h3>
                  <p className="paper__authors">{paper.authors}</p>
                  <p className="paper__pub">
                    {paper.publication}
                    {paper.details ? `, ${paper.details}` : ''}
                  </p>
                  <div className="outlinks paper__links">
                    <a
                      className="outlink"
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Paper
                    </a>
                    {paper.sourceCode && (
                      <a
                        className="outlink"
                        href={paper.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
