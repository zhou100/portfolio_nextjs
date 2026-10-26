import { architectureOverviews } from '@/lib/architecture';
import './architecture.css';

export default function ArchitectureOverview({ slug }: { slug: string }) {
  const overview = architectureOverviews[slug];
  if (!overview) return null;

  return (
    <section className="case__section architecture" id="architecture" aria-labelledby="architecture-heading">
      <h2 className="case__h2" id="architecture-heading">How it works</h2>
      <figure aria-describedby="architecture-note">
        <figcaption className="architecture__summary">{overview.summary}</figcaption>
        <ol className="architecture__flow" aria-label="Architecture flow">
          {overview.stages.map((stage, index) => (
            <li className="architecture__stage" key={stage.title}>
              <div className="architecture__node">
                <span className="architecture__number" aria-hidden="true">0{index + 1}</span>
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
              </div>
              {stage.connection && (
                <div className="architecture__connection">
                  <svg viewBox="0 0 48 24" aria-hidden="true" focusable="false">
                    <path d="M2 12H43M35 4l8 8-8 8" />
                  </svg>
                  <span>{stage.connection}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
        <p className="architecture__note" id="architecture-note">{overview.note}</p>
      </figure>
    </section>
  );
}
