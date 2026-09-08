import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getPublishedSlugs } from '@/lib/writing';
import { getOgImage } from '@/lib/portfolio';
import { getWorkBySlug } from '@/lib/work';
import Blocks from '../../components/Work/Blocks';
import './article.css';

export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/writing/${article.slug}`,
      publishedTime: article.publishedAt,
      images: [getOgImage()],
    },
  };
}

/** Section headings double as the table of contents. Same source, one order. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article?.body) notFound();

  const work = article.relatedWork ? getWorkBySlug(article.relatedWork) : undefined;
  const headings = article.body
    .filter((block): block is { type: 'h'; text: string } => block.type === 'h')
    .map((block) => ({ id: slugify(block.text), text: block.text }));

  return (
    <article className="article-page">
      <header className="article-page__header">
        <div className="wrap">
          <p className="article-page__back">
            <Link className="arrowlink" href="/writing">
              ← All writing
            </Link>
          </p>

          <div className="article-page__meta">
            <span>{article.topic}</span>
            {article.publishedAt && <span>{article.publishedAt}</span>}
            {article.readingTime && <span>{article.readingTime}</span>}
          </div>

          <h1 className="article-page__title">{article.title}</h1>
          <p className="article-page__excerpt">{article.excerpt}</p>
        </div>
      </header>

      <div className="wrap article-page__body">
        {headings.length > 1 && (
          <nav className="toc" aria-label="On this page">
            <p className="toc__label">On this page</p>
            <ol className="toc__list">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="article-page__prose">
          {article.body.map((block, index) =>
            block.type === 'h' ? (
              <div className="block" key={`${block.text}-${index}`} id={slugify(block.text)}>
                <h2 className="article-page__h2">{block.text}</h2>
              </div>
            ) : (
              <Blocks blocks={[block]} key={index} />
            ),
          )}
        </div>

        <footer className="article-page__footer">
          {work && (
            <p className="article-page__related">
              This draws on{' '}
              <Link className="textlink" href={`/work/${work.slug}`}>
                {work.title}
              </Link>
              .
            </p>
          )}
          <div className="article-page__foot">
            <p className="small">
              {article.publishedAt ? `Published ${article.publishedAt}.` : null}
            </p>
            <Link className="arrowlink" href="/writing">
              All writing →
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
