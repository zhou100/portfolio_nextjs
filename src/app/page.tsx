import Link from 'next/link';
import { getFocusRows, getSite } from '@/lib/portfolio';
import { getFeaturedWork, getWorkBySlug } from '@/lib/work';
import { articleHref, getPublishedArticles } from '@/lib/writing';
import WorkCard from './components/Work/WorkCard';
import './home.css';

export default function Home() {
  const site = getSite();
  const focus = getFocusRows();
  const featured = getFeaturedWork();
  const articles = getPublishedArticles();
  const lab = getWorkBySlug('creative-evidence-lab');

  return (
    <>
      <section className="hero">
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="hero__eyebrow">{site.eyebrow}</p>
            <h1 className="hero__title">{site.headline}</h1>
            <p className="hero__sub">{site.subheadline}</p>

            <div className="hero__ctas">
              <Link className="btn btn--primary" href={site.primaryCta.href}>
                {site.primaryCta.label}
              </Link>
              {site.resume ? (
                <a className="btn btn--on-dark" href={site.resume}>
                  View resume
                </a>
              ) : (
                <Link className="btn btn--on-dark" href="/about">
                  How I work
                </Link>
              )}
            </div>

            <p className="hero__background">{site.backgroundLine}</p>
          </div>

          <nav className="focus" aria-label="Where the work is">
            <ul className="focus__list">
              {focus.map((row) => (
                <li className="focus__item" key={row.href}>
                  <Link className="focus__link" href={row.href}>
                    <span className="focus__label">{row.label}</span>
                    <span className="focus__line">{row.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="section section--lead" id="selected-work">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="section__title">Decisions, and the evidence behind them</h2>
            </div>
            <Link className="arrowlink" href="/work">
              All work →
            </Link>
          </div>

          <div className="grid grid--3">
            {featured.map((item) => (
              <WorkCard item={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      {!!articles.length && (
        <section className="section section--tight" id="writing">
          <div className="wrap">
            <div className="section__head">
              <div>
                <p className="eyebrow">Writing</p>
                <h2 className="section__title">Notes on measurement and AI evaluation</h2>
              </div>
              <Link className="arrowlink" href="/writing">
                All writing →
              </Link>
            </div>

            <ul className="articles">
              {articles.map((article) => {
                const href = articleHref(article);

                return (
                  <li className="article" key={article.slug}>
                    <div className="article__meta">
                      <span className="card__org">{article.topic}</span>
                      {article.readingTime && (
                        <span className="card__org">{article.readingTime}</span>
                      )}
                    </div>
                    <h3 className="article__title">
                      {href ? <Link href={href}>{article.title}</Link> : article.title}
                    </h3>
                    <p className="article__argument">{article.excerpt}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {lab && (
        <section className="section section--tight" id="lab">
          <div className="wrap">
            <article className="labstrip">
              <div>
                <p className="eyebrow">Creative Evidence Lab · Study design</p>
                <h2 className="labstrip__title">
                  <Link href={`/work/${lab.slug}`}>{lab.question}</Link>
                </h2>
                <p className="labstrip__body">
                  A proposed workflow connecting observable creative attributes, performance
                  hypotheses, and an experiment brief — with label quality, predictive value, and
                  incremental impact kept as three separate claims.
                </p>
              </div>
              <Link className="arrowlink" href={`/work/${lab.slug}`}>
                Read the study design →
              </Link>
            </article>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="closer">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="section__title">
                Let’s talk about product measurement and AI evaluation.
              </h2>
              <p className="section__lede">
                I’m interested in teams turning experimentation and evaluation into better product
                decisions.
              </p>
            </div>
            <div className="closer__actions">
              <a className="btn btn--primary" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <Link className="btn btn--ghost" href="/about">
                Background and research
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
