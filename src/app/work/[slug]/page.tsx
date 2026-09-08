import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  EVIDENCE_LABEL,
  KIND_LABEL,
  getWorkBySlug,
  getWorkSlugs,
  type WorkItem,
} from '@/lib/work';
import { getOgImage } from '@/lib/portfolio';
import { articleHref, getPublishedArticles } from '@/lib/writing';
import Blocks from '../../components/Work/Blocks';
import StatusBadge from '../../components/Work/StatusBadge';
import './case.css';

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
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

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();

  const related = getPublishedArticles().filter((article) => article.relatedWork === item.slug);
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
            <StatusBadge status={item.status} onDark />
            <span className="case__org">{item.org ?? KIND_LABEL[item.kind]}</span>
          </div>

          <h1 className="case__title">{item.title}</h1>
          <p className="case__question">{item.question}</p>

          <p className="case__databoundary">{item.dataNote}</p>

          {hasActions && (
            <div className="case__actions">
              {showPrimaryAnchor && (
                <a className="btn btn--on-dark" href={primaryAnchor.href}>
                  {primaryAnchor.label}
                </a>
              )}
              {links?.artifact && (
                <Link className="btn btn--on-dark" href={links.artifact.href}>
                  {links.artifact.label}
                </Link>
              )}
              {links?.demo && (
                <a
                  className="btn btn--on-dark"
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the product
                </a>
              )}
              {links?.code && (
                <a
                  className="btn btn--on-dark"
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
        <Brief item={item} />

        <dl className="casemeta">
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

        {item.sections.map((section, index) => (
          <section className="case__section" id={section.id} key={section.id}>
            <div className="case__sectionhead">
              <span className="case__step">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="case__h2">{section.heading}</h2>
                <p className="case__prompt">{section.prompt}</p>
              </div>
            </div>
            <Blocks blocks={section.blocks} />
          </section>
        ))}

        <section className="case__section" id="limitations">
          <div className="case__sectionhead">
            <span className="case__step">{String(item.sections.length + 1).padStart(2, '0')}</span>
            <div>
              <h2 className="case__h2">Limitations</h2>
              <p className="case__prompt">What this case does not establish.</p>
            </div>
          </div>
          <ul className="bullets">
            {item.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>

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
