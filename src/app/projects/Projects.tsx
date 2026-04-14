'use client';

import dynamic from 'next/dynamic';
import { getProjects } from '@/lib/portfolio';
import './Projects.css';

// Dynamically import MUI icons
const GitHubIcon = dynamic(() => import('@mui/icons-material/GitHub'), { ssr: false });
const ArticleIcon = dynamic(() => import('@mui/icons-material/Article'), { ssr: false });

const Projects = () => {
  const projects = getProjects();
  
  if (!projects.length) return null;

  return (
    <section className="section projects" id="projects">
      <div className="section__heading">
        <p className="eyebrow">Selected work</p>
        <h2 className="section__title">Built, tested, and written for real decisions</h2>
      </div>

      <div className="projects__list">
        {projects.map((project, index) => (
          <div key={index} className="project">
            <div className="project__copy">
              <h3 className="project__title">{project.name}</h3>
              <p className="project__description">{project.description}</p>

              <ul className="project__stack">
                {project.stack.map((item) => (
                  <li key={item} className="project__stack-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="project__links">
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  aria-label="source code"
                  className="link link--icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                  <span>Code</span>
                </a>
              )}

              {project.livePreview && (
                <a
                  href={project.livePreview}
                  aria-label="live preview"
                  className="link link--icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArticleIcon />
                  <span>Open</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
