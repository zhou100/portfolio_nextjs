import type { Metadata } from 'next';
import Link from 'next/link';
import { getWork } from '@/lib/work';
import { getPapers } from '@/lib/writing';
import WorkCard from '../components/Work/WorkCard';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Industry cases, independent builds, and proposed studies — each one labelled with its status and the kind of evidence behind it.',
  alternates: { canonical: '/work' },
};

export default function WorkIndex() {
  const work = getWork();
  const papers = getPapers();

  const industry = work.filter((item) => item.kind === 'industry-case');
  const builds = work.filter(
    (item) => item.kind === 'independent-build' && item.status !== 'proposed',
  );
  const lab = work.filter((item) => item.status === 'proposed');

  return (
    <>
      <header className="pagehead">
        <div className="wrap">
          <p className="eyebrow">Work</p>
          <h1 className="pagehead__title">Decisions. Evidence. Working systems.</h1>
          <p className="lede pagehead__lede">
            Each item opens with the problem, my contribution, and what changed. The label on the
            card says what you are looking at: a case study written from industry work, a working
            prototype, or a study design with nothing built yet.
          </p>
        </div>
      </header>

      <section className="section" id="industry-cases">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Industry cases</p>
              <h2 className="section__title">Measurement work inside a team</h2>
              <p className="section__lede">
                Written from work I did inside a company. Employers and internal products are
                described by category rather than by name, and confidential data and results are
                omitted — what is here is my contribution and the method.
              </p>
            </div>
          </div>

          <div className="stack">
            {industry.map((item) => (
              <WorkCard item={item} key={item.slug} wide />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" id="independent-builds">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Independent builds</p>
              <h2 className="section__title">Products I built and then studied</h2>
              <p className="section__lede">
                Built end to end by me. What varies is how much of each one has been measured rather
                than shipped.
              </p>
            </div>
          </div>

          <div className="grid grid--3">
            {builds.map((item) => (
              <WorkCard item={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" id="in-the-lab">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">In the lab</p>
              <h2 className="section__title">Scoped, not built</h2>
              <p className="section__lede">
                Study designs with stated stop conditions. Nothing here has results, and the pages
                say so at the top rather than in a footnote.
              </p>
            </div>
          </div>

          <div className="grid grid--2">
            {lab.map((item) => (
              <WorkCard item={item} key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" id="earlier-research">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Earlier research</p>
              <h2 className="section__title">Peer-reviewed work</h2>
              <p className="section__lede">
                Forecasting and policy evaluation from my PhD. The recurring question — whether a
                model that fits is a model someone can act on — is the same one I work on now.
              </p>
            </div>
            <Link className="arrowlink" href="/writing#research">
              Full list →
            </Link>
          </div>

          <ul className="papers">
            {papers.map((paper) => (
              <li className="paper" key={paper.href}>
                <span className="paper__year">{paper.year}</span>
                <div>
                  <h3 className="paper__title">
                    <a href={paper.href} target="_blank" rel="noopener noreferrer">
                      {paper.title}
                    </a>
                  </h3>
                  <p className="paper__pub">{paper.publication}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
