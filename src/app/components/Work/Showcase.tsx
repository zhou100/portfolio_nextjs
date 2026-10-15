import Image from 'next/image';
import Link from 'next/link';
import { KIND_LABEL, type WorkItem } from '@/lib/work';
import StatusBadge from './StatusBadge';

/**
 * A live product on the home page: what it does, where to try it, and real screenshots.
 * Renders nothing for an item without a showcase or a public link.
 */
export default function Showcase({ item }: { item: WorkItem }) {
  const showcase = item.showcase;
  const live = item.links?.demo
    ? { href: item.links.demo, label: 'Try the product' }
    : item.links?.artifact;
  if (!showcase || !live) return null;

  const [lead, ...rest] = showcase.shots;

  return (
    <article className="showcase">
      <div className="showcase__copy">
        <div className="card__top">
          <StatusBadge status={item.status} />
          <span className="card__org">{KIND_LABEL[item.kind]}</span>
        </div>
        <h3 className="showcase__title">
          <Link href={`/work/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="showcase__tagline">{showcase.tagline}</p>
        <p className="showcase__contribution">{item.contribution}</p>
        <div className="showcase__actions">
          <a className="btn btn--primary" href={live.href} target="_blank" rel="noopener">
            {live.label} ↗
          </a>
          <Link className="arrowlink" href={`/work/${item.slug}`}>
            Read the case →
          </Link>
        </div>
      </div>

      <div className="showcase__gallery">
        <figure className="shot shot--lead">
          <a href={lead.src} target="_blank" rel="noopener" title="Open full-size screenshot">
            <Image src={lead.src} alt={lead.alt} width={lead.width} height={lead.height} />
          </a>
          <figcaption>{lead.caption}</figcaption>
        </figure>
        {rest.map((shot) => (
          <figure className={`shot${shot.fit ? ` shot--${shot.fit}` : ''}`} key={shot.src}>
            <a href={shot.src} target="_blank" rel="noopener" title="Open full-size screenshot">
              <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
            </a>
            <figcaption>{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </article>
  );
}
