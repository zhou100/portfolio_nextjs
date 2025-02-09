'use client';

import dynamic from 'next/dynamic';
import { about } from '@/lib/portfolio';
import './About.css';

// Dynamically import MUI icons
const GitHubIcon = dynamic(() => import('@mui/icons-material/GitHub'), { ssr: false });
const LinkedInIcon = dynamic(() => import('@mui/icons-material/LinkedIn'), { ssr: false });
const SchoolIcon = dynamic(() => import('@mui/icons-material/School'), { ssr: false });

const About = () => {
  const { name, role, description, resume, social } = about;

  return (
    <div className='about center'>
      {name && (
        <h1>
          Hi, I am <span className='about__name'>{name}.</span>
        </h1>
      )}

      {role && <h2 className='about__role'>A {role}.</h2>}
      <p className='about__desc'>{description && description}</p>

      <div className='about__contact center'>
        {resume && (
          <a href={resume}>
            <span className='btn btn--outline'>
              Resume
            </span>
          </a>
        )}

        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                aria-label='github'
                className='link link--icon'
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                aria-label='linkedin'
                className='link link--icon'
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
            )}

            {social.googlescholar && (
              <a
                href={social.googlescholar}
                aria-label='google-scholar'
                className='link link--icon'
                target="_blank"
                rel="noopener noreferrer"
              >
                <SchoolIcon />
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default About;