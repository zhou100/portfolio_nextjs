import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticles, getPapers, type WritingTopic } from '@/lib/writing';
import { getWorkBySlug } from '@/lib/work';
import './writing.css';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Method notes on measurement, AI evaluation, and building — each listed with the argument it has to support, plus peer-reviewed research.',
  alternates: { canonical: '/writing' },
};

const topics: WritingTopic[] = ['Measurement', 'AI Evaluation', 'Building'];

export default function WritingIndex() {
  const articles = getArticles();
  const papers = getPapers();
  const next = articles.filter((article) => article.featured);
  const backlog = articles.filter((article) => !article.featured);

  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="eyebrow">Writing</p>
          <h1 className="pagehead__title">One question, one study, one piece.</h1>
          <p className="lede pagehead__lede">
            Nothing here is published yet. Rather than post titles that imply results I do not have,
            each entry states the argument it will need to support and the work it draws on. Pieces
            go up when the underlying study is finished — there is no weekly schedule.
          </p>
        </div>
      </header>

      <section className="section" id="next">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Writing next</p>
              <h2 className="section__title">The first three</h2>
              <p className="section__lede">
                One each for recommendations, advertising measurement, and AI evaluation.
              </p>
            </div>
          </div>

          <div className="grid grid--3">
            {next.map((article) => {
              const work = article.relatedWork ? getWorkBySlug(article.relatedWork) : undefined;

              return (
                <article className="card" key={article.slug}>
                  <div className="card__top">
                    <span className="status status--proposed">Planned</span>
                    <span className="card__org">{article.topic}</span>
                  </div>
                  <h3 className="card__title">{article.title}</h3>
                  <p className="card__body">{article.argument}</p>
                  {work && (
                    <div className="card__foot">
                      <span className="card__role">Draws on</span>
                      <Link className="arrowlink" href={`/work/${work.slug}`}>
                        {work.title} →
                      </Link>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--tight" id="backlog">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Backlog</p>
              <h2 className="section__title">Queued behind the work that supports them</h2>
            </div>
          </div>

          <div className="topics">
            {topics.map((topic) => {
              const inTopic = backlog.filter((article) => article.topic === topic);
              if (!inTopic.length) return null;

              return (
                <section className="topic" key={topic}>
                  <h3 className="topic__name">{topic}</h3>
                  <ul className="topic__list">
                    {inTopic.map((article) => (
                      <li className="topic__item" key={article.slug}>
                        <p className="topic__title">{article.title}</p>
                        <p className="topic__argument">{article.argument}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--tight" id="research">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Research</p>
              <h2 className="section__title">Peer-reviewed publications</h2>
              <p className="section__lede">
                Citation counts are not shown here. They change over time and are counted
                differently by different sources — Google Scholar has the current figures.
              </p>
            </div>
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
