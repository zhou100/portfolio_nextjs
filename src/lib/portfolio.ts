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

/**
 * Three clickable rows under the headline. Each one names a domain, states the
 * measurement problem in a line, and goes straight to the case that shows it.
 */
export interface FocusRow {
  label: string;
  line: string;
  href: string;
}

export interface Role {
  org: string;
  title: string;
  /** Employment period, e.g. "2021 — 2024". Rendered only when set. */
  period?: string;
  focus: string;
  /** Separate workstreams inside one role, when they answer different questions. */
  streams?: { name: string; detail: string }[];
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
  namingNote: string;
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
      'I work on experimentation and evaluation for recommendations, advertising, and AI systems. Inside product teams I connect decisions to evidence; on my own I build the tools that test those ideas in practice.',
    backgroundLine:
      'Short-form video recommendations & integrity · Enterprise AI evaluation · Applied Economics PhD',
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

export function getFocusRows(): FocusRow[] {
  return [
    {
      label: 'Recommendations',
      line: 'Measuring viewer experience beyond engagement',
      href: '/work/recommendation-quality',
    },
    {
      label: 'Enterprise AI',
      line: 'Evaluating whether assistants complete real tasks',
      href: '/work/enterprise-ai-evaluation',
    },
    {
      label: 'Independent work',
      line: 'Building a system that tracks evolving claims',
      href: '/work/narrative-intelligence',
    },
  ];
}

export function getAbout(): AboutContent {
  return {
    profileImage: '/profile.jpg',
    currentTitle: 'Data Science Manager & Tech Lead · Advertising and media group',
    namingNote:
      'Employers and internal products are described by category rather than by name. Specifics are on my resume and I am happy to go through them in conversation.',
    paragraphs: [
      'I’m a data scientist with a PhD in Applied Economics. I spent several years on recommendation quality and integrity measurement at a large short-form video platform, and I now lead data science for enterprise AI systems at an advertising and media group. Across both, my job is to define an outcome worth moving, test whether the evidence supports the decision, and build whatever is missing to check it.',
      'The through line is measurement under pressure. Engagement moves for reasons that have nothing to do with a better product. An assistant that reads well can still fail the task it was hired for. Most of my work is deciding which comparison is credible enough to act on, and saying plainly when it isn’t.',
      'I build the systems I need to test my own ideas — evaluation pipelines, data contracts, and small products with real users — because a claim I cannot reproduce is not evidence I can defend.',
    ],
    roles: [
      {
        org: 'Advertising and media group',
        title: 'Data Science Manager & Tech Lead',
        focus:
          'Enterprise AI evaluation: layered task metrics, human rubrics, regression gates, and the quality, cost, and latency tradeoffs behind a release decision.',
      },
      {
        org: 'Short-form video platform',
        title: 'Data Scientist',
        focus:
          'Two measurement problems in one product, which is why they are listed apart — they fail in different ways and need different evaluation populations.',
        streams: [
          {
            name: 'Recommendation quality',
            detail:
              'Defining consumption-side outcomes for a short-form video feed, reading experiments against them, and pairing a creator-side goal with a viewer-experience guardrail.',
          },
          {
            name: 'Integrity measurement',
            detail:
              'Evaluating rare, high-cost failures, where a sample drawn for average performance does not have the resolution the decision requires.',
          },
        ],
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
        role: 'Former manager, recommendation relevance analytics',
        attribution: 'Anonymized here at the source. Named reference available on request.',
      },
    ],
  };
}
