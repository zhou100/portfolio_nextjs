import Link from 'next/link';
import { getSite } from '@/lib/portfolio';
import './Footer.css';

export default function Footer() {
  const { name, email, social, resume } = getSite();

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div className="footer__col">
          <p className="footer__name">{name}</p>
          <p className="footer__blurb">
            Senior data scientist working on experimentation, measurement, and AI evaluation for
            recommendations, advertising, and AI products.
          </p>
        </div>

        <div className="footer__col">
          <p className="footer__label">Site</p>
          <ul className="footer__links">
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li>
              <Link href="/writing">Writing</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            {resume && (
              <li>
                <a href={resume}>Resume</a>
              </li>
            )}
          </ul>
        </div>

        <div className="footer__col">
          <p className="footer__label">Elsewhere</p>
          <ul className="footer__links">
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            {social.linkedin && (
              <li>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            )}
            {social.github && (
              <li>
                <a href={social.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            )}
            {social.googleScholar && (
              <li>
                <a href={social.googleScholar} target="_blank" rel="noopener noreferrer">
                  Google Scholar
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
