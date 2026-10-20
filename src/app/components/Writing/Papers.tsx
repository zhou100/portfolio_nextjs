import { getPapers } from '@/lib/writing';

/**
 * Peer-reviewed papers as dated rows. Compact (home): year, title, journal.
 * Full (/writing#research): authors, volume, and Paper / Code links as well.
 */
export default function Papers({
  compact = false,
  heading: Heading = 'h3',
}: {
  compact?: boolean;
  /** h3 under a section-level subhead (/writing); h4 under a group subhead (home). */
  heading?: 'h3' | 'h4';
}) {
  const papers = getPapers();

  return (
    <ul className={`papers${compact ? ' papers--compact' : ''}`}>
      {papers.map((paper) => (
        <li className="paper" key={paper.href}>
          <span className="paper__year">{paper.year}</span>
          <div>
            <Heading className="paper__title">
              <a href={paper.href} target="_blank" rel="noopener noreferrer">
                {paper.title}
              </a>
            </Heading>
            {!compact && <p className="paper__authors">{paper.authors}</p>}
            <p className="paper__pub">
              {paper.publication}
              {!compact && paper.details ? `, ${paper.details}` : ''}
            </p>
            {!compact && (
              <div className="outlinks paper__links">
                <a className="outlink" href={paper.href} target="_blank" rel="noopener noreferrer">
                  Paper
                </a>
                {paper.sourceCode && (
                  <a
                    className="outlink"
                    href={paper.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
