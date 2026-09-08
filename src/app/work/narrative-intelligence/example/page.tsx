import type { Metadata } from 'next';
import Link from 'next/link';
import fixture from '../../../../../public/fixtures/narrative-evaluation-fixture-v1.json';
import output from '../../../../../public/fixtures/narrative-baseline-output-v1.json';
import { getOgImage } from '@/lib/portfolio';
import './example.css';

export const metadata: Metadata = {
  title: 'Narrative clustering example',
  description:
    'A self-authored narrative-clustering fixture with gold groups, deterministic baseline output, and pairwise error analysis.',
  alternates: { canonical: '/work/narrative-intelligence/example' },
  openGraph: {
    type: 'article',
    title: 'Narrative clustering example · Yujun Zhou',
    description:
      'A self-authored narrative-clustering fixture with gold groups, deterministic baseline output, and pairwise error analysis.',
    url: '/work/narrative-intelligence/example',
    images: [getOgImage()],
  },
};

export default function NarrativeExample() {
  return (
    <article className="example">
      <header className="pagehead">
        <div className="wrap">
          <p className="example__back">
            <Link className="arrowlink" href="/work/narrative-intelligence">
              ← Narrative Intelligence case
            </Link>
          </p>
          <p className="eyebrow">Public evaluation artifact</p>
          <h1 className="pagehead__title">Narrative clustering, with the error left in</h1>
          <p className="lede pagehead__lede">
            Six self-authored passages, gold pair labels, and an actual deterministic baseline run.
            This is an inspectable task, not a production-quality claim.
          </p>
        </div>
      </header>

      <div className="wrap example__body">
        <nav className="example__toc" aria-label="On this page">
          <a href="#task">Task</a>
          <a href="#input">Input</a>
          <a href="#output">Output</a>
          <a href="#errors">Error analysis</a>
          <a href="#reproduce">Reproduce</a>
        </nav>

        <section className="example__section" id="task">
          <p className="eyebrow">01 · Task</p>
          <h2>Group the proposition, preserve the change</h2>
          <p>{fixture.annotation_task}</p>
          <p className="note">{fixture.subject.note}</p>
        </section>

        <section className="example__section" id="input">
          <p className="eyebrow">02 · Input</p>
          <h2>Six timestamped passages</h2>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Source</th>
                  <th scope="col">Passage</th>
                </tr>
              </thead>
              <tbody>
                {fixture.passages.map((passage) => (
                  <tr key={passage.id}>
                    <th scope="row">{passage.id}</th>
                    <td>{passage.source_type}</td>
                    <td>{passage.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="tablecaption">
            The company and every passage are fictional and self-authored. The fixture includes a
            repost, a supply update, and one deliberately ambiguous pair.
          </p>
        </section>

        <section className="example__section" id="output">
          <p className="eyebrow">03 · Output</p>
          <h2>Gold groups versus the lexical baseline</h2>
          <div className="example__comparison">
            <div className="example__panel">
              <h3>Gold grouping</h3>
              <ul>
                {fixture.gold_narratives.map((narrative) => (
                  <li key={narrative.id}>
                    <strong>{narrative.id}</strong>
                    <span>{narrative.passages.join(', ')}</span>
                    <p>{narrative.label}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="example__panel">
              <h3>Baseline grouping</h3>
              <ul>
                {output.predictedClusters.map((cluster) => (
                  <li key={cluster.id}>
                    <strong>{cluster.id}</strong>
                    <span>{cluster.passageIds.join(', ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="example__metrics">
            <div>
              <dt>Pairwise precision</dt>
              <dd>{output.pairwiseEvaluation.precision.toFixed(3)}</dd>
            </div>
            <div>
              <dt>Pairwise recall</dt>
              <dd>{output.pairwiseEvaluation.recall.toFixed(3)}</dd>
            </div>
            <div>
              <dt>Pairwise F1</dt>
              <dd>{output.pairwiseEvaluation.f1.toFixed(3)}</dd>
            </div>
          </dl>
          <p className="note">{output.boundary}</p>
        </section>

        <section className="example__section" id="errors">
          <p className="eyebrow">04 · Error analysis</p>
          <h2>The baseline over-splits one paraphrase</h2>
          <ul className="example__errors">
            {output.errors.map((error) => (
              <li key={error.passageIds.join('|')}>
                <span>{error.type}</span>
                <strong>{error.passageIds.join(' ↔ ')}</strong>
                <p>{error.explanation}</p>
              </li>
            ))}
          </ul>
          <p>
            The baseline groups the near-verbatim repost with its source but misses the independently
            worded paraphrase. It gets all three labelled negative pairs right. The p3/p6 pair stays
            outside the binary score because the gold label is ambiguous, not because the baseline
            earned a pass.
          </p>
        </section>

        <section className="example__section" id="reproduce">
          <p className="eyebrow">05 · Reproduce</p>
          <h2>Re-run the checked-in baseline</h2>
          <p>
            From the repository root, regenerate the output with{' '}
            <code>npm run example:narrative</code> or verify that it is current with{' '}
            <code>npm run check:narrative-example</code>.
          </p>
          <div className="outlinks example__links">
            <a className="outlink" href="/fixtures/narrative-evaluation-fixture-v1.json">
              Fixture JSON
            </a>
            <a className="outlink" href="/fixtures/narrative-baseline-output-v1.json">
              Baseline output JSON
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
