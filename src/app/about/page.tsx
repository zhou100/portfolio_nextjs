import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAbout, getSite } from '@/lib/portfolio';
import { getPapers } from '@/lib/writing';
import './about.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Background, roles, research, and the toolkit behind the work — with the current title as it appears on my resume.',
  alternates: { canonical: '/about' },
};

export default function About() {
  const site = getSite();
  const about = getAbout();
  const papers = getPapers();

  return (
    <>
      <header className="pagehead">
        <div className="wrap about__head">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="pagehead__title">{site.name}</h1>
            <p className="about__title">{about.currentTitle}</p>
            <p className="about__naming">{about.namingNote}</p>
            <div className="about__bio prose">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="about__actions">
              {site.resume && (
                <a className="btn btn--primary" href={site.resume}>
                  View resume
                </a>
              )}
              <a className="btn btn--ghost" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>

          <figure className="about__figure">
            <Image
              src={about.profileImage}
              alt={`${site.name}, portrait`}
              width={360}
              height={360}
              priority
            />
          </figure>
        </div>
      </header>

      <section className="section" id="experience">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Experience</p>
              <h2 className="section__title">Where the work happened</h2>
            </div>
            <Link className="arrowlink" href="/work">
              Read the cases →
            </Link>
          </div>

          <ul className="roles">
            {about.roles.map((role) => (
              <li className="role" key={role.org}>
                <div>
                  <h3 className="role__org">{role.org}</h3>
                  <p className="role__title">{role.title}</p>
                  {role.period && <p className="role__period">{role.period}</p>}
                </div>
                <div>
                  <p className="role__focus">{role.focus}</p>
                  {role.streams && (
                    <dl className="deflist role__streams">
                      {role.streams.map((stream) => (
                        <div className="deflist__row" key={stream.name}>
                          <dt className="deflist__term">{stream.name}</dt>
                          <dd className="deflist__detail">{stream.detail}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight" id="education">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Education</p>
              <h2 className="section__title">Training</h2>
            </div>
          </div>

          <ul className="roles">
            {about.education.map((entry) => (
              <li className="role" key={entry.org}>
                <div>
                  <h3 className="role__org">{entry.org}</h3>
                  <p className="role__title">{entry.title}</p>
                  {entry.period && <p className="role__period">{entry.period}</p>}
                </div>
                <p className="role__focus">{entry.focus}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--tight" id="toolkit">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Toolkit</p>
              <h2 className="section__title">What I reach for</h2>
            </div>
          </div>

          <div className="grid grid--3">
            {about.skillGroups.map((group) => (
              <div className="skills" key={group.name}>
                <h3 className="skills__name">{group.name}</h3>
                <ul className="chips">
                  {group.items.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" id="research">
        <div className="wrap">
          <div className="section__head">
            <div>
              <p className="eyebrow">Research</p>
              <h2 className="section__title">Published work</h2>
            </div>
            <Link className="arrowlink" href="/writing#research">
              Details and code →
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

      {!!about.testimonials.length && (
        <section className="section section--tight" id="reference">
          <div className="wrap">
            <div className="section__head">
              <div>
                <p className="eyebrow">Reference</p>
                <h2 className="section__title">From a former manager</h2>
              </div>
            </div>

            {about.testimonials.map((testimonial) => (
              <figure className="quote" key={testimonial.quote}>
                <blockquote>
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="quote__role">{testimonial.role}</span>
                  <span className="quote__note">{testimonial.attribution}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
