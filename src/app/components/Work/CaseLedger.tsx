import Link from 'next/link';
import { KIND_LABEL, type WorkItem } from '@/lib/work';
import StatusBadge from './StatusBadge';

/**
 * Case studies as one ledger (home, /work): case, question, outcome, link.
 * A grid rather than a <table> so each row stacks on a phone instead of scrolling
 * sideways; the column names repeat inside the cells there.
 */
export default function CaseLedger({
  items,
  heading: Heading = 'h4',
}: {
  items: WorkItem[];
  /** h4 under a section and a subhead (home); h3 where the subhead is the h2 (/work). */
  heading?: 'h3' | 'h4';
}) {
  return (
    <div className="ledger">
      <div className="ledger__head" aria-hidden="true">
        <span>Case</span>
        <span>Question</span>
        <span>Outcome</span>
        <span />
      </div>
      <ul>
        {items.map((item) => (
          <li className="ledger__row" key={item.slug}>
            <div>
              <Heading className="ledger__title">
                <Link href={`/work/${item.slug}`}>{item.title}</Link>
              </Heading>
              <div className="ledger__by">
                <span className="label">{item.org ?? KIND_LABEL[item.kind]}</span>
                <StatusBadge status={item.status} />
              </div>
            </div>
            <p className="ledger__question">
              <span className="ledger__cell-label">Question</span>
              {item.question}
            </p>
            <p className="ledger__outcome">
              <span className="ledger__cell-label ledger__cell-label--always">
                {item.brief.outcomeLabel}
              </span>
              {item.brief.outcome}
            </p>
            <Link
              className="arrowlink ledger__go"
              href={`/work/${item.slug}`}
              aria-label={`Read the case: ${item.title}`}
            >
              Read →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
