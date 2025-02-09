'use client';

import { useState } from 'react';
import { getHeader } from '@/lib/portfolio';
import './Navbar.css';

const Navbar = () => {
  const [showNavList, setShowNavList] = useState(false);
  const header = getHeader();

  const toggleNavList = () => setShowNavList(!showNavList);

  return (
    <nav className="center nav">
      <ul
        style={{ display: showNavList ? 'flex' : undefined }}
        className="nav__list"
      >
        <li className="nav__list-item">
          <a
            href="#home"
            onClick={toggleNavList}
            className="link link--nav"
          >
            Home
          </a>
        </li>

        <li className="nav__list-item">
          <a
            href="#projects"
            onClick={toggleNavList}
            className="link link--nav"
          >
            Projects
          </a>
        </li>

        <li className="nav__list-item">
          <a
            href="#skills"
            onClick={toggleNavList}
            className="link link--nav"
          >
            Skills
          </a>
        </li>

        <li className="nav__list-item">
          <a
            href="#contact"
            onClick={toggleNavList}
            className="link link--nav"
          >
            Contact
          </a>
        </li>
      </ul>

      <button
        type="button"
        onClick={toggleNavList}
        className="btn btn--icon nav__hamburger"
        aria-label="toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
    </nav>
  );
};

export default Navbar;