import Link from 'next/link';
import type { WorkItem } from '@/lib/work';
import StatusBadge from './StatusBadge';

export default function WorkCard({ item, wide = false }: { item: WorkItem; wide?: boolean }) {
  return (
    <article className={`card card--link${wide ? ' card--wide' : ''}`}>
      <div>
        <div className="card__top">
          <StatusBadge status={item.status} />
          {item.org && <span className="card__org">{item.org}</span>}
        </div>

        <h3 className="card__title">
          <Link href={`/work/${item.slug}`}>{item.title}</Link>
        </h3>
        <p className="card__question">{item.question}</p>
        <p className="card__body">{item.summary}</p>
      </div>

      {wide && (
        <dl className="workcard__meta">
          <div>
            <dt>My role</dt>
            <dd>{item.role}</dd>
          </div>
          <div>
            <dt>Data</dt>
            <dd>{item.dataStatus}</dd>
          </div>
        </dl>
      )}

      <div className="card__foot">
        {!wide && <span className="card__role">{item.role}</span>}
        <Link className="arrowlink" href={`/work/${item.slug}`}>
          Read case study →
        </Link>
      </div>
    </article>
  );
}
