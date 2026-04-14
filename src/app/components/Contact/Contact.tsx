'use client';

import { getContact } from '@/lib/portfolio';
import './Contact.css';

const Contact = () => {
  const { email } = getContact();
  
  if (!email) return null;

  return (
    <section className="section contact center" id="contact">
      <p className="eyebrow">Contact</p>
      <a href={`mailto:${email}`} className="contact__email">
        {email}
      </a>
    </section>
  );
};

export default Contact;
