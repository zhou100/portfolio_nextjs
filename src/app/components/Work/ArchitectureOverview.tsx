/* eslint-disable @next/next/no-img-element -- Generated SVGs preserve vector text and intrinsic dimensions. */
import { architectureOverviews } from '@/lib/architecture';
import './architecture.css';
import DiagramViewport from './DiagramViewport';

export default function ArchitectureOverview({ slug }: { slug: string }) {
  const overview = architectureOverviews[slug];
  if (!overview) return null;
  const nodes = overview.groups.flatMap((group) => group.nodes);
  const name = (id: string) => nodes.find((node) => node.id === id)?.title;
  const description = `${overview.summary} ${nodes.map((node) => `${node.title}: ${node.technology}.`).join(' ')} ${overview.edges.map((edge) => `${name(edge.from)} ${edge.bidirectional ? 'exchanges with' : 'to'} ${name(edge.to)}: ${edge.label}.`).join(' ')}`;
  return (
    <section className="architecture" id="architecture" aria-labelledby="architecture-heading">
      <h2 className="architecture__heading" id="architecture-heading">System architecture</h2>
      <figure className="architecture__diagram">
        <DiagramViewport start={slug === 'debrief' ? 0.46 : slug === 'narrative-atlas' ? 0.41 : 0.18}>
          <img src={`/work/${slug}/architecture.svg`} alt={description} />
        </DiagramViewport>
        <figcaption>
          <span>Solid: data / API &middot; Dashed: {slug === 'narrative-atlas' ? 'control / research input' : 'control'}</span>
          <a href={`/work/${slug}/architecture.svg`} target="_blank" rel="noopener">Open full-size diagram &#8599;</a>
        </figcaption>
      </figure>
    </section>
  );
}
