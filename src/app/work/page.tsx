import type { Metadata } from 'next';
import { getOgImage } from '@/lib/portfolio';
import { getWork } from '@/lib/work';
import CaseLedger from '../components/Work/CaseLedger';
import Showcase from '../components/Work/Showcase';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies from industry work, products I built, and study designs, each labelled with its status and the evidence behind it.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work',
    description: 'Case studies from industry work, products I built, and study designs, each labelled with its status and the evidence behind it.',
    url: '/work',
    images: [getOgImage()],
  },
};

export default function WorkIndex() {
  const work = getWork();

  const industry = work.filter((item) => item.kind === 'industry-case');
  const builds = work.filter(
    (item) => item.kind === 'independent-build' && item.status !== 'proposed',
  );
  const lab = work.filter((item) => item.status === 'proposed');

  return (
    <>
      <header className="pagehead pagehead--compact">
        <div className="wrap">
          <p className="eyebrow">Work</p>
          <h1 className="pagehead__title">The work behind the claims.</h1>
          <p className="lede pagehead__lede">
            Every item opens with the problem, what I did, and what changed. The label on the card tells you what the page is: a case study from industry work, a working prototype, or a design with nothing built yet.
          </p>
        </div>
      </header>

      <section className="section section--tight section--grouped" id="industry-cases">
        <div className="wrap">
          <div className="subhead">
            <h2 className="subhead__title">Industry cases</h2>
            <p className="subhead__lede">
              Written from work I did inside a company. The data and results are confidential, so what is here is my contribution and the method.
            </p>
          </div>
          <CaseLedger items={industry} heading="h3" />
        </div>
      </section>

      <section className="section section--tight section--grouped" id="independent-builds">
        <div className="wrap">
          <div className="subhead">
            <h2 className="subhead__title">Independent builds</h2>
            <p className="subhead__lede">
              Built end to end by me, and measured to different degrees.
            </p>
          </div>
          <div className={`builds builds--${builds.length}`}>
            {builds.map((item) => (
              <Showcase item={item} heading="h3" key={item.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight section--grouped" id="in-the-lab">
        <div className="wrap">
          <div className="subhead">
            <h2 className="subhead__title">In the lab</h2>
            <p className="subhead__lede">
              Study designs with stated stop conditions. Nothing here has results, and the pages
              say so at the top rather than in a footnote.
            </p>
          </div>
          <CaseLedger items={lab} heading="h3" />
        </div>
      </section>
    </>
  );
}
