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
  brand: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  backgroundLine: string;
  primaryCta: Cta;
  /** Rendered only when `resume` is a real, downloadable file. */
  resume?: string;
  email: string;
  social: Social;
  url: string;
}

export interface ThesisCard {
  label: string;
  title: string;
  layers: { name: string; question: string }[];
  footnote: string;
}

export interface Role {
  org: string;
  title: string;
  focus: string;
  note?: string;
}

export interface Testimonial {
  quote: string;
  role: string;
  attribution: string;
}

export interface AboutContent {
  profileImage: string;
  currentTitle: string;
  paragraphs: string[];
  roles: Role[];
  education: Role[];
  skillGroups: { name: string; items: string[] }[];
  testimonials: Testimonial[];
}

export function getSite(): Site {
  return {
    name: 'Yujun Zhou',
    brand: 'Yujun Zhou',
    eyebrow: 'Yujun Zhou · Senior Data Scientist · Economics PhD',
    headline: 'I measure and improve AI products.',
    subheadline:
      'I use experimentation, causal inference, and evaluation to improve recommendations, advertising, and AI systems. My work spans Meta Reels and Integrity, enterprise AI at Annalect, and independent products I build and study.',
    backgroundLine: 'Meta Reels & Integrity · Annalect · UIUC Applied Economics PhD',
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

export function getThesisCard(): ThesisCard {
  return {
    label: 'How I read evidence',
    title: 'Three layers, kept separate',
    layers: [
      {
        name: 'Label quality',
        question: 'Can two people apply the definition and agree?',
      },
      {
        name: 'Predictive value',
        question: 'Does it still add information out of sample?',
      },
      {
        name: 'Incremental impact',
        question: 'Does changing it move the outcome in an experiment?',
      },
    ],
    footnote:
      'A pattern that clears the first two layers is still a hypothesis. I label it as one.',
  };
}

export function getAbout(): AboutContent {
  return {
    profileImage: '/profile.jpg',
    currentTitle: 'Data Science Manager & Tech Lead, Annalect',
    paragraphs: [
      'I’m a data scientist with a PhD in Applied Economics. At Meta, I worked on recommendation quality and integrity measurement. At Annalect, I work on enterprise AI systems and evaluation. Across these settings, I focus on defining useful outcomes, testing whether the evidence supports a decision, and building the tools needed to improve the product.',
      'The through line is measurement under pressure. Engagement moves for reasons that have nothing to do with a better product. An assistant that reads well can still fail the task it was hired for. Most of my work is deciding which comparison is credible enough to act on, and saying plainly when it isn’t.',
      'I build the systems I need to test my own ideas — evaluation pipelines, data contracts, and small products with real users — because a claim I cannot reproduce is not evidence I can defend.',
    ],
    roles: [
      {
        org: 'Annalect',
        title: 'Data Science Manager & Tech Lead',
        focus:
          'Enterprise AI systems and evaluation: layered task metrics, human rubrics, regression gates, and the quality/cost tradeoffs behind a launch decision.',
      },
      {
        org: 'Meta — Reels & Integrity',
        title: 'Data Scientist',
        focus:
          'Recommendation quality and integrity measurement: defining consumption-side outcomes, running and reading experiments, and shifting product goals when engagement and experience diverged.',
      },
    ],
    education: [
      {
        org: 'University of Illinois Urbana-Champaign',
        title: 'PhD, Applied Economics',
        focus:
          'Causal identification, forecasting, and the gap between a model that fits and a model a decision-maker can use. Published in Applied Economic Perspectives and Policy, World Development, and JAFIO.',
      },
    ],
    skillGroups: [
      {
        name: 'Measurement & inference',
        items: [
          'Experiment design',
          'Causal inference',
          'Metric definition',
          'Sampling & power',
          'Offline–online gap analysis',
        ],
      },
      {
        name: 'AI evaluation',
        items: [
          'Human rubrics & annotator agreement',
          'Failure taxonomies',
          'LLM-as-judge validation',
          'Calibration & abstention',
          'Regression gates',
        ],
      },
      {
        name: 'Building',
        items: ['Python', 'SQL', 'FastAPI', 'React / TypeScript', 'Postgres & pgvector'],
      },
    ],
    testimonials: [
      {
        quote:
          'Consistent excellence in analytics work, with strong influence skills, operational rigor, and a high bar for data-driven decision making.',
        role: 'Former manager, Instagram Relevance Analytics',
        attribution: 'Anonymized here at the source. Named reference available on request.',
      },
    ],
  };
}
