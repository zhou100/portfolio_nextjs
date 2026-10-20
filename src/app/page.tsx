import Image from 'next/image';
import Link from 'next/link';
import { getPath, getSite, getTestimonials } from '@/lib/portfolio';
import { getFeaturedWork, getShowcaseWork, getWorkBySlug } from '@/lib/work';
import { articleHref, getListedArticles } from '@/lib/writing';
import CareerPath from './components/CareerPath/CareerPath';
import CaseLedger from './components/Work/CaseLedger';
import Showcase from './components/Work/Showcase';
import MarketStories from './components/Writing/MarketStories';
import Papers from './components/Writing/Papers';
import './home.css';

export default function Home() {
  const site = getSite();
  const path = getPath();
  const testimonials = getTestimonials();
  const featured = getFeaturedWork();
  const showcase = getShowcaseWork();
  const showcased = new Set(showcase.map((item) => item.slug));
  const cases = featured.filter((item) => !showcased.has(item.slug));
  const articles = getListedArticles().slice(0, 4);
  const lab = getWorkBySlug('creative-evidence-lab');

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero__intro">
            <div className="hero__copy">
              <p className="hero__eyebrow">{site.eyebrow}</p>
              <h1 className="hero__title">{site.name}</h1>
              <p className="hero__claim">{site.headline}</p>
              <p className="hero__sub">{site.intro}</p>

              <div className="hero__ctas">
                <Link className="btn btn--primary" href={site.primaryCta.href}>
                  {site.primaryCta.label}
                </Link>
                {site.resume ? (
                  <a className="btn btn--on-dark" href={site.resume}>
                    View resume
                  </a>
                ) : (
                  <a className="btn btn--on-dark" href={`mailto:${site.email}`}>
                    Get in touch
                  </a>
                )}
              </div>
            </div>

            <Image
              className="hero__photo"
              src={site.profileImage}
              alt={`${site.name}, portrait`}
              width={400}
              height={400}
              priority
            />
          </div>

          <CareerPath steps={path} />

          {!!testimonials.length && (
            <section className="kudos" aria-labelledby="kudos-label">
              <h2 className="kudos__label" id="kudos-label">
                What colleagues say
              </h2>
              <ul className="kudos__list">
                {testimonials.map((testimonial) => (
                  <li key={testimonial.quote}>
                    <figure className="kudos__item">
                      <blockquote className="kudos__quote">
                        <p>“{testimonial.quote}”</p>
                      </blockquote>
                      <figcaption className="kudos__role">{testimonial.role}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          )}
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

          {!!showcase.length && (
            <>
              <div className="subhead">
                <h3 className="subhead__title">Independent builds</h3>
                <p className="subhead__lede">
                  Products I designed, built and still run. Each one is live; you can try it.
                </p>
              </div>
              <div className={`builds builds--${showcase.length}`}>
                {showcase.map((item) => (
                  <Showcase item={item} key={item.slug} />
                ))}
              </div>
            </>
          )}

          <div className="subhead">
            <h3 className="subhead__title">Case studies</h3>
            <p className="subhead__lede">
              Measurement and evaluation work, with the method and the evidence behind each decision.
            </p>
          </div>
          <CaseLedger items={lab ? [...cases, lab] : cases} />
        </div>
      </section>

      {!!articles.length && (
        <section className="section" id="writing">
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

            <ul className="index">
              {articles.map((article) => {
                const href = articleHref(article);

                return (
                  <li className="index__row" key={article.slug}>
                    <span className="label">{article.publishedAt}</span>
                    <div>
                      <h3 className="index__title">
                        {href ? <Link href={href}>{article.title}</Link> : article.title}
                      </h3>
                      <p className="index__excerpt">{article.excerpt}</p>
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

            <div className="subhead subhead--stories">
              <h3 className="subhead__title">Market stories</h3>
              <p className="subhead__lede">
                Short essays on a stock or a group of them: what moved, what the analysts said, and what I think.{' '}
                <Link className="textlink" href="/writing#market-stories">
                  All stories with summaries
                </Link>
              </p>
            </div>
            <MarketStories compact limit={4} />

            <div className="subhead subhead--split subhead--stories" id="research">
              <h3 className="subhead__title">Published research</h3>
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
            <Papers compact heading="h4" />
          </div>
        </section>
      )}

      <section className="section" id="contact">
        <div className="wrap">
          <div className="closer">
            <p className="eyebrow">Contact</p>
            <h2 className="section__title closer__title">
              Let’s talk about product measurement and AI evaluation.
            </h2>
            <p className="section__lede">
              I’m interested in teams turning experimentation and evaluation into better product
              decisions.
            </p>
            <a className="closer__mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
