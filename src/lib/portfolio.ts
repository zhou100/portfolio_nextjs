export interface Social {
  linkedin?: string;
  github?: string;
  googleScholar?: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface Site {
  name: string;
  /** Square portrait in `public/`, shown in the home hero. */
  profileImage: string;
  brand: string;
  eyebrow: string;
  headline: string;
  intro: string;
  pathIntro: string;
  primaryCta: Cta;
  /** Rendered only when `resume` is a real, downloadable file. */
  resume?: string;
  email: string;
  social: Social;
  url: string;
}

/**
 * One stop on the career path shown under the home hero.
 */
export interface PathStep {
  org: string;
  role: string;
  /** Optional second line: scope or the problem worked on. */
  detail?: string;
  /** Marks where I am now. Exactly one step should set it. */
  current?: boolean;
}

export function getSite(): Site {
  return {
    name: 'Yujun Zhou',
    profileImage: '/profile.jpg',
    brand: 'Yujun Zhou',
    eyebrow: 'Data Scientist and AI builder',
    headline: 'I measure and improve AI products.',
    intro:
      'I’m a data scientist with an economics PhD. I work on experimentation and evaluation for recommendations, advertising, and AI systems — connecting product decisions to evidence, and building the tools to check it when they don’t exist yet.',
    pathIntro:
      'From economics research to product measurement to leading AI evaluation, each move closer to the decision itself',
    primaryCta: { label: 'Explore selected work', href: '/work' },
    // Set this to '/resume.pdf' once the file exists in `public/`. The nav link and
    // the hero's secondary call to action appear automatically when it is set.
    resume: undefined,
    email: 'zhou@yujun.net',
    social: {
      linkedin: 'https://www.linkedin.com/in/yujun-zhou/',
      github: 'https://github.com/zhou100',
      googleScholar: 'https://scholar.google.com/citations?user=1c8nq8EAAAAJ&hl=en',
    },
    url: 'https://yujun.net',
  };
}

/**
 * The shared share-card image. A page that sets its own `openGraph` replaces the
 * parent block, so every one of them has to pass this through.
 * Committed static file — see tools/og-card.html to regenerate it.
 */
export function getOgImage() {
  return {
    url: '/og.png',
    width: 1200,
    height: 630,
    alt: 'Yujun Zhou — experimentation, measurement, and AI evaluation',
  };
}

export function getPath(): PathStep[] {
  return [
    {
      org: 'University of Illinois',
      role: 'PhD, Applied Economics',
      detail: 'Causal inference and forecasting',
    },
    {
      org: 'Facebook AI',
      role: 'Data Scientist',
      detail: 'Fake accounts and integrity measurement',
    },
    {
      org: 'Instagram Reels',
      role: 'Data Scientist',
      detail: 'Recommendation quality',
    },
    {
      org: 'Omnicom',
      role: 'Data Science Manager & Tech Lead',
      detail: 'AI agents orchestration and evaluation',
      current: true,
    },
  ];
}

export interface Testimonial {
  quote: string;
  /** Who said it, by role. Names are available on request. */
  role: string;
}

export function getTestimonials(): Testimonial[] {
  return [
    {
      quote:
        'Consistent excellence in analytics work, with strong influence skills, operational rigor, and a high bar for data-driven decision making.',
      role: 'Former manager, Instagram Relevance Analytics',
    },
    {
      quote:
        'An amazing tech lead and one of the best data scientists I had the chance to work with.',
      role: 'Data science colleague, Facebook AI',
    },
    {
      quote:
        'Always impressed by Yujun’s analytical skills and insights. Any team would be lucky to have him.',
      role: 'Engineering manager, Instagram',
    },
    {
      quote:
        'Played an incredible role supporting the team with strong technical skills and thoughtful partnership.',
      role: 'Machine learning engineer, Facebook AI',
    },
  ];
}
