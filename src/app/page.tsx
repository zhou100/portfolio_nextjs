'use client';

import About from './about/About'
import Projects from './projects/Projects'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'
import Navbar from './components/Navbar/Navbar'
import { getWriting } from '@/lib/portfolio'

export default function Home() {
  const writing = getWriting();

  return (
    <>
      <Navbar />
      <About />
      <Skills />
      <Projects />
      <section className="section writing" id="writing">
        <div className="section__heading">
          <p className="eyebrow">Writing</p>
          <h2 className="section__title">Research and published work</h2>
        </div>

        <div className="writing__list">
          {writing.map((item) => (
            <article
              key={item.href}
              className="writing__item"
            >
              {item.year && <span>{item.year}</span>}
              <h3>{item.title}</h3>
              <p>{item.publication}{item.details ? ` ${item.details}` : ''}</p>

              {typeof item.citations === 'number' && (
                <p className="writing__citations">{item.citations} citations</p>
              )}

              <div className="writing__links">
                {item.sourceCode && (
                  <a href={item.sourceCode} target="_blank" rel="noopener noreferrer">
                    Code
                  </a>
                )}
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  Open
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Contact />
    </>
  );
}
