import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  EVIDENCE_LABEL,
  EVIDENCE_MEANING,
  getWorkBySlug,
  getWorkSlugs,
  type WorkItem,
  type WorkSection,
} from '@/lib/work';
import { getArticles } from '@/lib/writing';
import Blocks from '../../components/Work/Blocks';
import StatusBadge from '../../components/Work/StatusBadge';
import './case.css';

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = getWorkBySlug(params.slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.question,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: {
      type: 'article',
      title: item.title,
      description: item.question,
      url: `/work/${item.slug}`,
    },
  };
}

function Section({
  id,
  step,
  heading,
  section,
}: {
  id: string;
  step: number;
  heading: string;
  section: WorkSection;
}) {
  return (
    <section className="case__section" id={id}>
      <div className="case__sectionhead">
        <span className="case__step">{String(step).padStart(2, '0')}</span>
        <div>
          <h2 className="case__h2">{heading}</h2>
          <p className="case__prompt">{section.prompt}</p>
        </div>
      </div>
      <Blocks blocks={section.blocks} />
    </section>
  );
}

function Findings({ item }: { item: WorkItem }) {
  if (!item.findings?.length) return null;

  return (
    <div className="findings">
      <h3 className="case__h3">Findings, with what qualifies them</h3>
      {item.findings.map((finding) => (
        <article className="finding" key={finding.statement}>
          <p className="finding__statement">{finding.statement}</p>
          <dl className="finding__meta">
            <div>
              <dt>Source</dt>
              <dd>{finding.source}</dd>
            </div>
            {finding.population && (
              <div>
                <dt>Population</dt>
                <dd>{finding.population}</dd>
              </div>
            )}
            {finding.baseline && (
              <div>
                <dt>Baseline</dt>
                <dd>{finding.baseline}</dd>
              </div>
            )}
            {finding.window && (
              <div>
                <dt>Window</dt>
                <dd>{finding.window}</dd>
              </div>
            )}
            {finding.uncertainty && (
              <div>
                <dt>Uncertainty</dt>
                <dd>{finding.uncertainty}</dd>
              </div>
            )}
          </dl>
        </article>
      ))}
    </div>
  );
}

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const item = getWorkBySlug(params.slug);
  if (!item) notFound();

  const related = getArticles().filter((article) => article.relatedWork === item.slug);
  const links = item.links;

  return (
    <article className="case">
      <header className="case__header">
        <div className="wrap">
          <p className="case__back">
            <Link className="arrowlink" href="/work">
              ← All work
            </Link>
          </p>

          <div className="case__top">
            <StatusBadge status={item.status} onDark />
            {item.org && <span className="case__org">{item.org}</span>}
          </div>

          <h1 className="case__title">{item.title}</h1>
          {item.alias && <p className="case__alias">{item.alias}</p>}
          <p className="case__question">{item.question}</p>

          <dl className="casemeta">
            <div>
              <dt>My role</dt>
              <dd>{item.role}</dd>
            </div>
            <div>
              <dt>Data status</dt>
              <dd>{item.dataStatus}</dd>
            </div>
            <div>
              <dt>Evidence type</dt>
              <dd>
                {item.evidenceType.length
                  ? item.evidenceType.map((type) => EVIDENCE_LABEL[type]).join(' · ')
                  : 'None yet — this is a study design.'}
              </dd>
            </div>
            <div>
              <dt>Methods</dt>
              <dd>{item.methods.join(' · ')}</dd>
            </div>
          </dl>

          <div className="case__actions">
            <a className="btn btn--on-dark" href="#study-design">
              Read the study design
            </a>
            {links?.demo && (
              <a
                className="btn btn--on-dark"
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
              </a>
            )}
            {links?.code && (
              <a
                className="btn btn--on-dark"
                href={links.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code
              </a>
            )}
            {links?.evaluation && (
              <a
                className="btn btn--on-dark"
                href={links.evaluation}
                target="_blank"
                rel="noopener noreferrer"
              >
                Evaluation report
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="wrap case__body">
        <Section id="evidence" step={1} heading="Evidence" section={item.sections.evidence} />

        {!!item.evidenceType.length && (
          <div className="case__section case__section--flush">
            <dl className="deflist">
              {item.evidenceType.map((type) => (
                <div className="deflist__row" key={type}>
                  <dt className="deflist__term">{EVIDENCE_LABEL[type]}</dt>
                  <dd className="deflist__detail">{EVIDENCE_MEANING[type]}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <Findings item={item} />

        <Section
          id="study-design"
          step={2}
          heading="Study design"
          section={item.sections.studyDesign}
        />

        <Section
          id="results"
          step={3}
          heading="Results and failures"
          section={item.sections.results}
        />

        <Section
          id="next-decision"
          step={4}
          heading="Next decision"
          section={item.sections.nextDecision}
        />

        <section className="case__section" id="limitations">
          <div className="case__sectionhead">
            <span className="case__step">05</span>
            <div>
              <h2 className="case__h2">Limitations</h2>
              <p className="case__prompt">What this case does not establish.</p>
            </div>
          </div>
          <ul className="bullets">
            {item.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </section>

        {item.sections.appendix && (
          <Section
            id="appendix"
            step={6}
            heading="Appendix"
            section={item.sections.appendix}
          />
        )}

        {!!related.length && (
          <section className="case__section" id="related-writing">
            <h2 className="case__h3">Related writing</h2>
            <ul className="bullets">
              {related.map((article) => (
                <li key={article.slug}>
                  <strong>{article.title}</strong> — {article.argument}{' '}
                  <span className="case__planned">Planned</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="case__footer">
          <p className="small">Last updated {item.updatedAt}.</p>
          <Link className="arrowlink" href="/work">
            All work →
          </Link>
        </footer>
      </div>
    </article>
  );
}
