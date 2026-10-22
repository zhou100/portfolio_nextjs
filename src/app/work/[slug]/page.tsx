import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  EVIDENCE_LABEL,
  EVIDENCE_MEANING,
  KIND_LABEL,
  getWorkBySlug,
  getWorkSlugs,
  type WorkItem,
} from '@/lib/work';
import { getOgImage } from '@/lib/portfolio';
import { articleHref, getListedArticles } from '@/lib/writing';
import Blocks from '../../components/Work/Blocks';
import StatusBadge from '../../components/Work/StatusBadge';
import './case.css';

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getWorkBySlug(params.slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.brief.problem,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      type: 'article',
      title: item.title,
      description: item.brief.problem,
      url: `/work/${item.slug}`,
      images: [getOgImage()],
    },
  };
}

/** The 60-second read. Everything below it is optional for a scanning reader. */
function Brief({ item }: { item: WorkItem }) {
  return (
    <div className="brief" id="brief">
      <dl className="brief__list">
        <div className="brief__row">
          <dt>Problem</dt>
          <dd>{item.brief.problem}</dd>
        </div>
        <div className="brief__row">
          <dt>My contribution</dt>
          <dd>{item.brief.contribution}</dd>
        </div>
        <div className="brief__row">
          <dt>{item.brief.outcomeLabel}</dt>
          <dd>{item.brief.outcome}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const item = getWorkBySlug(params.slug);
  if (!item) notFound();

  const related = getListedArticles().filter((article) => article.relatedWork === item.slug);
  const links = item.links;

  // Where the reader should land first differs by content type. The brief sits
  // immediately below the header, so it never needs a jump link of its own.
  const primaryAnchor =
    item.status === 'proposed'
      ? { href: '#design', label: 'Read the study design' }
      : { href: '#example', label: 'See a worked example' };
  const showPrimaryAnchor = item.sections.some(
    (section) => `#${section.id}` === primaryAnchor.href,
  );
  const hasActions = showPrimaryAnchor || !!links?.artifact || !!links?.demo || !!links?.code;

  return (
    <article className="case">
      <header className="case__header">
        <div className="wrap">
          <p className="case__back">
            <Link className="arrowlink" href="/work">
              ← All work
            </Link>
          </p>

          <div className="case__top">
            <StatusBadge status={item.status} />
            <span className="label">{item.org ?? KIND_LABEL[item.kind]}</span>
          </div>

          <h1 className="case__title">{item.title}</h1>
          <p className="case__question">{item.question}</p>

          <p className="case__databoundary">{item.dataNote}</p>

          {hasActions && (
            <div className="actions case__actions">
              {showPrimaryAnchor && (
                <a className="act act--primary" href={primaryAnchor.href}>
                  {primaryAnchor.label}
                </a>
              )}
              {links?.artifact && (
                <a
                  className="act"
                  href={links.artifact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {links.artifact.label}
                </a>
              )}
              {links?.demo && (
                <a
                  className="act"
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the product
                </a>
              )}
              {links?.code && (
                <a
                  className="act"
                  href={links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="wrap case__body">
        <div className="row case__lead">
          <Brief item={item} />

          <dl className="side casemeta">
            <div>
              <dt>My role</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt>Methods</dt>
              <dd>{item.methods.join(' · ')}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>
                {item.evidenceType.length
                  ? item.evidenceType.map((type) => EVIDENCE_LABEL[type]).join(' · ')
                  : 'None yet — this is a study design.'}
              </dd>
            </div>
            {item.alias && (
              <div>
                <dt>Also known as</dt>
                <dd>{item.alias}</dd>
              </div>
            )}
          </dl>
        </div>

        {item.sections.map((section) => (
          <section className="case__section" id={section.id} key={section.id}>
            <div className="case__sectionhead">
              <h2 className="case__h2">{section.heading}</h2>
              <p className="case__prompt">{section.prompt}</p>
            </div>
            <Blocks blocks={section.blocks} />
          </section>
        ))}

        <section className="case__section" id="limitations">
          <div className="case__sectionhead">
            <h2 className="case__h2">Limitations</h2>
            <p className="case__prompt">What this case does not establish.</p>
          </div>
          <ul className="bullets">
            {item.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>

          {!!item.evidenceType.length && (
            <dl className="deflist">
              {item.evidenceType.map((type) => (
                <div className="deflist__row" key={type}>
                  <dt className="deflist__term">{EVIDENCE_LABEL[type]}</dt>
                  <dd className="deflist__detail">{EVIDENCE_MEANING[type]}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        {!!related.length && (
          <section className="case__section" id="related-writing">
            <h2 className="case__h3">Related writing</h2>
            <ul className="bullets">
              {related.map((article) => {
                const href = articleHref(article);

                return (
                  <li key={article.slug}>
                    {href ? (
                      <Link className="textlink" href={href}>
                        {article.title}
                      </Link>
                    ) : (
                      <strong>{article.title}</strong>
                    )}{' '}
                    — {article.excerpt}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <footer className="case__footer">
          <p className="small">Last updated {item.updatedAt}.</p>
          <Link className="arrowlink" href="/work">
            All work →
          </Link>
        </footer>
      </div>
    </article>
  );
}
