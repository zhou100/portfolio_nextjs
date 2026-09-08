'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getSite } from '@/lib/portfolio';
import './Navbar.css';

const links = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { brand, resume, email } = getSite();

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link href="/" className="nav__brand" onClick={close}>
          {brand}
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav__toggle-label">{open ? 'Close' : 'Menu'}</span>
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
            {open ? (
              <path
                d="M4 4l12 12M16 4L4 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5h16M2 10h16M2 15h16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>

        <nav id="nav-menu" className={`nav__menu${open ? ' nav__menu--open' : ''}`}>
          <ul className="nav__list">
            {links.map((link) => {
              const current = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav__link${current ? ' nav__link--current' : ''}`}
                    aria-current={current ? 'page' : undefined}
                    onClick={close}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {resume && (
              <li>
                <a className="nav__link" href={resume} onClick={close}>
                  Resume
                </a>
              </li>
            )}

            <li>
              <a className="nav__link nav__link--cta" href={`mailto:${email}`} onClick={close}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
