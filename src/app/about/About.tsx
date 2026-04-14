'use client';

import dynamic from 'next/dynamic';
import { getAbout } from '@/lib/portfolio';
import './About.css';

// Dynamically import MUI icons
const GitHubIcon = dynamic(() => import('@mui/icons-material/GitHub'), { ssr: false });
const LinkedInIcon = dynamic(() => import('@mui/icons-material/LinkedIn'), { ssr: false });
const SchoolIcon = dynamic(() => import('@mui/icons-material/School'), { ssr: false });

const About = () => {
  const {
    name,
    role,
    tagline,
    description,
    profileImage,
    resume,
    social,
    superpowers,
    testimonials,
  } = getAbout();

  return (
    <section className="about" id="home">
      <div className="about__hero">
        <div className="about__portrait-wrap">
          {profileImage && (
            <img
              className="about__portrait"
              src={profileImage}
              alt={`${name} profile`}
              onError={(event) => {
                event.currentTarget.src = 'https://github.com/zhou100.png';
              }}
            />
          )}

          <div className='about__contact'>
            {social?.github && (
              <a
                href={social.github}
                aria-label='github'
                className='about__social-link'
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </a>
            )}

            {social?.linkedin && (
              <a
                href={social.linkedin}
                aria-label='linkedin'
                className='about__social-link'
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </a>
            )}

            {social?.googlescholar && (
              <a
                href={social.googlescholar}
                aria-label='google-scholar'
                className='about__social-link'
                target="_blank"
                rel="noopener noreferrer"
              >
                <SchoolIcon />
              </a>
            )}
          </div>
        </div>

        <div className='about__intro'>
          {name && <p className="eyebrow">Portfolio</p>}
          {name && <h1>{name}</h1>}
          {role && <h2>{role}</h2>}
          {tagline && <p className='about__tagline'>{tagline}</p>}
          {description && <p className='about__desc'>{description}</p>}

          {!!superpowers?.length && (
            <div className="about__superpowers">
              <p>Three working strengths</p>
              <ul>
                {superpowers.map((power) => (
                  <li key={power}>{power}</li>
                ))}
              </ul>
            </div>
          )}

          {resume && (
            <a href={resume} className='btn btn--outline'>
              Resume
            </a>
          )}
        </div>
      </div>

      <div className="profile-grid" id="about">
        {!!testimonials?.length && (
          <article className="profile-card profile-card--wide">
            <div className="profile-card__header">
              <h3>What people say</h3>
            </div>
            <div className="testimonials">
              {testimonials.map((testimonial) => (
                <blockquote key={testimonial.quote}>
                  <p>{testimonial.quote}</p>
                  <cite>{testimonial.role}</cite>
                </blockquote>
              ))}
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default About;
