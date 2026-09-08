import Link from 'next/link';
import { KIND_LABEL, type WorkItem } from '@/lib/work';
import StatusBadge from './StatusBadge';

/**
 * Title, one line of contribution, role, entry point. The question and the long
 * summary live on the case page — a card exists to be compared, not read.
 */
export default function WorkCard({ item, wide = false }: { item: WorkItem; wide?: boolean }) {
  return (
    <article className={`card card--link${wide ? ' card--wide' : ''}`}>
      <div>
        <div className="card__top">
          <StatusBadge status={item.status} />
          <span className="card__org">{item.org ?? KIND_LABEL[item.kind]}</span>
        </div>

        <h3 className="card__title">
          <Link href={`/work/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="card__body">{item.contribution}</p>
      </div>

      <div className="card__foot">
        <span className="card__role">{item.roleLabel}</span>
        <Link className="arrowlink" href={`/work/${item.slug}`}>
          Read the case →
        </Link>
      </div>
    </article>
  );
}
