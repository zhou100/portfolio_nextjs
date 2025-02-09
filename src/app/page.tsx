'use client';

import About from './about/About'
import Projects from './projects/Projects'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'
import Navbar from './components/Navbar/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <div id="home" className="section">
        <About />
      </div>
      <div id="projects" className="section">
        <Projects />
      </div>
      <Skills />
      <Contact />
    </>
  );
}
