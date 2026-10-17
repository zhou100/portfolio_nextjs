import Link from 'next/link';
import { EVIDENCE_LABEL, KIND_LABEL, type WorkItem } from '@/lib/work';
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

      {wide && (
        <dl className="workcard__meta">
          <div>
            <dt>Evidence</dt>
            <dd>{item.evidenceType.length
              ? item.evidenceType.map((type) => EVIDENCE_LABEL[type]).join(' · ')
              : 'None yet — study design'}</dd>
          </div>
          <div>
            <dt>Methods</dt>
            <dd>{item.methods.join(' · ')}</dd>
          </div>
        </dl>
      )}

      <div className="card__foot">
        <span className="card__role">{item.roleLabel}</span>
        <Link className="arrowlink" href={`/work/${item.slug}`}>
          Read the case →
        </Link>
      </div>
    </article>
  );
}
