import Link from 'next/link';
import { getSite, getThesisCard } from '@/lib/portfolio';
import { getFeaturedWork, getWorkBySlug } from '@/lib/work';
import { getFeaturedArticles } from '@/lib/writing';
import WorkCard from './components/Work/WorkCard';
import StatusBadge from './components/Work/StatusBadge';
import './home.css';

export default function Home() {
  const site = getSite();
  const thesis = getThesisCard();
  const featured = getFeaturedWork();
  const articles = getFeaturedArticles();
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

          <aside className="thesis" aria-label={thesis.label}>
            <p className="thesis__label">{thesis.label}</p>
            <h2 className="thesis__title">{thesis.title}</h2>
            <ol className="thesis__list">
              {thesis.layers.map((layer, index) => (
                <li className="thesis__item" key={layer.name}>
                  <span className="thesis__num">{index + 1}</span>
                  <span>
                    <span className="thesis__name">{layer.name}</span>
                    <span className="thesis__q">{layer.question}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="thesis__footnote">{thesis.footnote}</p>
          </aside>
        </div>
      </section>

      <section className="section" id="selected-work">
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

      <section className="section section--tight" id="writing">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Writing</p>
              <h2 className="section__title">Method notes, published when the study is done</h2>
              <p className="section__lede">
                These three are written and in progress, not published yet. Each one is listed with
                the argument it has to support, so it can be judged when it lands.
              </p>
            </div>
            <Link className="arrowlink" href="/writing">
              All writing →
            </Link>
          </div>

          <ul className="articles">
            {articles.map((article) => (
              <li className="article" key={article.slug}>
                <div className="article__meta">
                  <span className="status status--proposed">Planned</span>
                  <span className="card__org">{article.topic}</span>
                </div>
                <h3 className="article__title">{article.title}</h3>
                <p className="article__argument">{article.argument}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {lab && (
        <section className="section section--tight" id="lab">
          <div className="wrap">
            <div className="section__head">
              <div>
                <p className="eyebrow">In the lab</p>
                <h2 className="section__title">What I am scoping next</h2>
              </div>
            </div>

            <article className="lab">
              <div className="lab__copy">
                <div className="card__top">
                  <StatusBadge status={lab.status} />
                </div>
                <h3 className="lab__title">
                  <Link href={`/work/${lab.slug}`}>{lab.title}</Link>
                </h3>
                <p className="lab__question">{lab.question}</p>
                <p className="lab__body">{lab.summary}</p>
                <Link className="arrowlink" href={`/work/${lab.slug}`}>
                  Read the study design →
                </Link>
              </div>
              <dl className="lab__meta">
                <div>
                  <dt>Data status</dt>
                  <dd>{lab.dataStatus}</dd>
                </div>
                <div>
                  <dt>Next decision</dt>
                  <dd>{lab.decision}</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="closer">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="section__title">Happy to go deeper on any of it</h2>
              <p className="section__lede">
                If a case raises a methods question — the sampling, the estimand, the guardrail that
                did or did not bind — that is the conversation I want to have.
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
