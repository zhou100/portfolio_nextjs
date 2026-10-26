/* eslint-disable @next/next/no-img-element -- Generated SVGs keep their intrinsic vector dimensions. */
import { architectureOverviews, type ArchitectureOverview } from '@/lib/architecture';
import './architecture.css';

function Components({ overview, prefix }: { overview: ArchitectureOverview; prefix: string }) {
  const nodes = overview.groups.flatMap((group) => group.nodes);
  return (
    <div className="architecture__layers">
      {overview.groups.map((group) => (
        <section className="architecture__layer" key={group.title}>
          <h3>{group.title}</h3>
          <div className="architecture__components">
            {group.nodes.map((node) => {
              const outgoing = overview.edges.filter((edge) => edge.from === node.id || (edge.bidirectional && edge.to === node.id));
              return (
                <div className={`architecture__component architecture__component--${node.kind}`} id={`${prefix}-${node.id}`} key={node.id}>
                  <span className="architecture__kind">{node.kind === 'object' ? 'Object storage' : node.kind}</span>
                  <h4>{node.title}</h4>
                  <p className="architecture__technology">{node.technology}</p>
                  <p>{node.detail}</p>
                  {!!outgoing.length && (
                    <ul className="architecture__connections" aria-label={`Outgoing connections from ${node.title}`}>
                      {outgoing.map((edge) => (
                        <li key={`${edge.to}-${edge.label}`}>
                          <span aria-hidden="true">{edge.bidirectional ? '↔' : edge.control ? '⇢' : '→'} </span>
                          <a href={`#${prefix}-${edge.from === node.id ? edge.to : edge.from}`}>{nodes.find((target) => target.id === (edge.from === node.id ? edge.to : edge.from))?.title}</a>
                          <span>: {edge.label}{edge.control ? ' (control)' : ''}{edge.bidirectional ? ' (two-way)' : ''}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function ArchitectureOverview({ slug }: { slug: string }) {
  const overview = architectureOverviews[slug];
  if (!overview) return null;
  return (
    <section className="case__section architecture" id="architecture" aria-labelledby="architecture-heading">
      <h2 className="case__h2" id="architecture-heading">System architecture</h2>
      <p className="architecture__summary">{overview.summary}</p>
      <figure className="architecture__diagram">
        <img src={`/work/${slug}/architecture.svg`} alt={`${overview.summary} The component and connection details follow the diagram.`} />
        <figcaption>
          Solid arrows: data or API traffic. Dashed arrows: scheduling, authentication or control.{' '}
          <a className="textlink" href={`/work/${slug}/architecture.svg`} target="_blank" rel="noopener">Open full-size SVG ↗</a>
        </figcaption>
      </figure>
      <details className="architecture__text">
        <summary>Components and connections</summary>
        <Components overview={overview} prefix="architecture-detail" />
      </details>
      <div className="architecture__mobile">
        <p className="architecture__key">Arrows name each destination. Control paths are marked explicitly.</p>
        <Components overview={overview} prefix="architecture-mobile" />
        <a className="textlink architecture__full" href={`/work/${slug}/architecture.svg`} target="_blank" rel="noopener">Open full architecture diagram ↗</a>
      </div>
      <p className="architecture__note">{overview.note}</p>
    </section>
  );
}
