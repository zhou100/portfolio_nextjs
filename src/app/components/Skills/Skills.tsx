'use client';

import { getSkills } from '@/lib/portfolio';
import './Skills.css';

const Skills = () => {
  const skills = getSkills();
  
  if (!skills.length) return null;

  return (
    <section className="section skills" id="skills">
      <h2 className="section__title">Skills</h2>
      <ul className="skills__list">
        {skills.map((skill, index) => (
          <li key={index} className="skills__list-item btn btn--plain">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;