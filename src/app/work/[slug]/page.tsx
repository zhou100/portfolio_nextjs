import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWorkBySlug, getWorkSlugs, type WorkItem } from '@/lib/work';
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

function hostOf(href: string): string {
  try {
    return new URL(href).host;
  } catch {
    return href;
  }
}

/** One line: status, context, role, evidence boundary, and any public link. */
function CaseMeta({ item }: { item: WorkItem }) {
  const live = item.links?.demo ?? item.links?.artifact?.href;
  const code = item.links?.code;
  const codeLabel = item.alias?.toLowerCase().includes('brief-voice-memo')
    ? 'brief-voice-memo'
    : 'Code';

  return (
    <p className="case__meta">
      <StatusBadge status={item.status} />
      <span className="case__metasep" aria-hidden="true">
        ·
      </span>
      <span className="case__metatext">{item.meta}</span>
      {live && (
        <>
          <span className="case__metasep" aria-hidden="true">
            ·
          </span>
          <a className="case__metalink" href={live} target="_blank" rel="noopener noreferrer">
            {`Live at ${hostOf(live)}`}
          </a>
        </>
      )}
      {code && (
        <>
          <span className="case__metasep" aria-hidden="true">
            ·
          </span>
          <a className="case__metalink" href={code} target="_blank" rel="noopener noreferrer">
            {codeLabel}
          </a>
        </>
      )}
    </p>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const item = getWorkBySlug(params.slug);
  if (!item) notFound();

  const related = getListedArticles().filter((article) => article.relatedWork === item.slug);

  return (
    <article className="case">
      <header className="case__header">
        <div className="wrap">
          <p className="case__back">
            <Link className="arrowlink" href="/work">
              ← All work
            </Link>
          </p>

          <h1 className="case__title">{item.title}</h1>
          <p className="case__question">{item.question}</p>
          <CaseMeta item={item} />
        </div>
      </header>

      <div className="wrap case__body">
        <div className="case__prose">
          <Blocks blocks={item.body} rich />
        </div>

        {!!related.length && (
          <p className="case__related">
            <span>Related</span>{' '}
            {related.map((article, index) => {
              const href = articleHref(article);

              return (
                <span key={article.slug}>
                  {index > 0 && ' · '}
                  {href ? (
                    <Link className="textlink" href={href}>
                      {article.title}
                    </Link>
                  ) : (
                    article.title
                  )}
                </span>
              );
            })}
          </p>
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
