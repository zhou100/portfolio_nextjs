import Image from 'next/image';
import Link from 'next/link';
import type { WorkItem } from '@/lib/work';
import StatusBadge from './StatusBadge';

/**
 * A live product on the home page, as one card in a row of three: the lead screenshot,
 * what it does, role and methods, and where to try it. Only the first shot is shown.
 * Renders nothing for an item without a showcase or a public link.
 */
export default function Showcase({
  item,
  heading: Heading = 'h4',
}: {
  item: WorkItem;
  /** h4 under a section and a subhead (home); h3 where the subhead is the h2 (/work). */
  heading?: 'h3' | 'h4';
}) {
  const showcase = item.showcase;
  // Short labels fit half a card; screen readers get the full one.
  const live = item.links?.demo
    ? { href: item.links.demo, label: 'Try it', full: `Try ${item.title}` }
    : item.links?.artifact && {
        href: item.links.artifact.href,
        label: 'Open it',
        full: item.links.artifact.label,
      };
  if (!showcase || !live) return null;

  const [lead] = showcase.shots;

  return (
    <article className="build">
      <a
        className="build__shot"
        href={lead.src}
        target="_blank"
        rel="noopener"
        title="Open full-size screenshot"
      >
        <Image src={lead.src} alt={lead.alt} width={lead.width} height={lead.height} />
      </a>

      <div className="build__body">
        <StatusBadge status={item.status} />
        <Heading className="build__title">
          <Link href={`/work/${item.slug}`}>{item.title}</Link>
        </Heading>
        <p className="build__tagline">{showcase.tagline}</p>
        <dl className="build__meta">
          <div>
            <dt>Target users</dt>
            <dd>{showcase.audience}</dd>
          </div>
          <div>
            <dt>Methods</dt>
            <dd>{item.methods.join(' · ')}</dd>
          </div>
        </dl>
      </div>

      <div className="build__acts">
        <a href={live.href} target="_blank" rel="noopener" aria-label={live.full}>
          {live.label} ↗
        </a>
        <Link href={`/work/${item.slug}`} aria-label={`Read the case: ${item.title}`}>
          Read the case
        </Link>
      </div>
    </article>
  );
}
