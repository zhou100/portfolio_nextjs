/* eslint-disable @next/next/no-img-element -- Generated SVGs preserve vector text and intrinsic dimensions. */
import { architectureOverviews } from '@/lib/architecture';
import './architecture.css';
import DiagramViewport from './DiagramViewport';

/**
 * The system diagram after a build's essay. The caption is the one-sentence summary;
 * the components and connections are read to screen readers, not printed twice.
 */
export default function ArchitectureOverview({ slug }: { slug: string }) {
  const overview = architectureOverviews[slug];
  if (!overview) return null;

  const nodes = overview.groups.flatMap((group) => group.nodes);
  const name = (id: string) => nodes.find((node) => node.id === id)?.title;
  const description = [
    ...nodes.map((node) => `${node.title}: ${node.technology}.`),
    ...overview.edges.map(
      (edge) =>
        `${name(edge.from)} ${edge.bidirectional ? 'exchanges with' : 'to'} ${name(edge.to)}: ${edge.label}.`,
    ),
  ].join(' ');
  const src = `/work/${slug}/architecture.svg`;

  return (
    <figure className="architecture" id="architecture">
      <DiagramViewport start={overview.mobileStart}>
        <img
          src={src}
          alt="System architecture diagram"
          aria-describedby="architecture-description"
        />
      </DiagramViewport>
      <p className="architecture__description" id="architecture-description">
        {description}
      </p>
      <figcaption>
        <span>{overview.summary}</span>
        <a className="arrowlink architecture__open" href={src} target="_blank" rel="noopener">
          Open full-size diagram ↗
        </a>
      </figcaption>
    </figure>
  );
}
