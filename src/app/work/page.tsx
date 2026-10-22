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
          <h1 className="pagehead__title">Work</h1>
        </div>
      </header>

      <section className="section section--tight section--grouped" id="industry-cases">
        <div className="wrap">
          <div className="subhead">
            <h2 className="subhead__title">Industry cases</h2>
            <p className="subhead__lede">
              The data and results are confidential, so what is here is my contribution and the method.
            </p>
          </div>
          <CaseLedger items={industry} heading="h3" />
        </div>
      </section>

      <section className="section section--tight section--grouped" id="independent-builds">
        <div className="wrap">
          <div className="subhead">
            <h2 className="subhead__title">Independent builds</h2>
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
              Study designs with stated stop conditions. Nothing here has results.
            </p>
          </div>
          <CaseLedger items={lab} heading="h3" />
        </div>
      </section>
    </>
  );
}
