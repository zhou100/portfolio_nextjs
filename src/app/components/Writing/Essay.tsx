/** Pieces shared by essays: articles and market stories. */

export interface EssaySource {
  name: string;
  href?: string;
}

/** Three takeaways above the body. */
export function InShort({ points }: { points?: string[] }) {
  if (!points?.length) return null;

  return (
    <section className="essay-tldr" aria-label="In short">
      <p className="essay-tldr__label">In short</p>
      <ul className="bullets">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

/** One line at the end. Only sources with an `href` link; site paths open in place. */
export function SourcesLine({ sources }: { sources?: EssaySource[] }) {
  if (!sources?.length) return null;

  return (
    <p className="essay-sources">
      <span>Sources:</span>{' '}
      {sources.map((source, index) => (
        <span key={`${source.name}-${index}`}>
          {index > 0 && ' · '}
          {source.href?.startsWith('/') ? (
            <a href={source.href}>{source.name}</a>
          ) : source.href ? (
            <a href={source.href} target="_blank" rel="noopener noreferrer">
              {source.name}
            </a>
          ) : (
            source.name
          )}
        </span>
      ))}
    </p>
  );
}
