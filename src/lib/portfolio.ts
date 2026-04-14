interface Header {
  homepage?: string;
  title?: string;
}

interface Social {
  linkedin?: string;
  github?: string;
  googlescholar?: string;
}

interface About {
  name?: string;
  role?: string;
  tagline?: string;
  description?: string;
  profileImage?: string;
  resume?: string;
  social?: Social;
  superpowers?: string[];
  testimonials?: Testimonial[];
}

interface Project {
  name: string;
  description: string;
  stack: string[];
  sourceCode?: string;
  livePreview?: string;
}

interface Testimonial {
  quote: string;
  role: string;
}

interface Writing {
  title: string;
  authors?: string;
  publication: string;
  details?: string;
  href: string;
  citations?: number;
  year?: number;
  sourceCode?: string;
}

interface Contact {
  email?: string;
}

export function getHeader(): Header {
  return {
    homepage: 'https://zhou100.github.io/',
    title: 'YZ',
  };
}

export function getAbout(): About {
  return {
    name: 'Yujun Zhou',
    role: 'Data scientist and AI product builder',
    profileImage: '/profile.jpg',
    description:
      'Economist by training, product thinker by practice. I bridge technology, data, and business, using data science and generative AI to reason, prototype, and build. Formerly at Meta learning how technology works at scale, now applying that perspective at Annalect and beyond.',
    superpowers: [
      'Economic thinking for causal, incentive-aware analysis',
      'Data thought leadership that shapes product and strategy decisions',
      'End-to-end data product building across modeling, backend, and UX',
    ],
    testimonials: [
      {
        quote:
          'Consistent excellence in analytics work, with strong influence skills, operational rigor, and a high bar for data-driven decision making.',
        role: 'Former manager, Instagram Relevance Analytics',
      },
      {
        quote:
          'An amazing tech lead and one of the best data scientists I had the chance to work with.',
        role: 'Data science colleague',
      },
      {
        quote:
          'Always impressed by Yujun’s analytical skills and insights. Any team would be lucky to have him.',
        role: 'Engineering manager',
      },
      {
        quote:
          'Played an incredible role supporting the team with strong technical skills and thoughtful partnership.',
        role: 'Machine learning engineer',
      },
    ],
    social: {
      linkedin: 'https://www.linkedin.com/in/yujun-zhou/',
      github: 'https://github.com/zhou100',
      googlescholar: 'https://scholar.google.com/citations?user=1c8nq8EAAAAJ&hl=en',
    },
  };
}

export function getProjects(): Project[] {
  return [
    {
      name: 'Debrief',
      description:
        'A FastAPI and React voice app for turning quick voice logs into a useful record of the day and week. It transcribes and classifies captures, surfaces daily and weekly AI reviews, tracks open loops, and helps users recover thoughts, tasks, recurring themes, and patterns over time.',
      stack: [
        'React',
        'FastAPI',
        'TypeScript',
        'PostgreSQL',
        'OpenAI',
      ],
      livePreview: 'https://time.yujun.net/',
    },
    {
      name: 'ChurchMap',
      description:
        'A technical church discovery app that combines first-visit geolocation with a Leaflet/OpenStreetMap interface to make nearby church search automatic and easy. It enriches church profiles by extracting Google Places review, photo, rating, hours, and contact data, then uses computed tags and review signals to make the results more useful than a plain directory.',
      stack: [
        'React',
        'Leaflet',
        'FastAPI',
        'SQLite',
        'Google Places API',
      ],
      livePreview: 'https://churchmap.vercel.app/',
    },
  ];
}

export function getWriting(): Writing[] {
  return [
    {
      title: 'Machine learning for food security: Principles for transparency and usability',
      authors: 'Y Zhou, E Lentz, H Michelson, C Kim, K Baylis',
      publication: 'Applied Economic Perspectives and Policy',
      details: '44 (2), 893-910',
      citations: 54,
      year: 2022,
      href: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/aepp.13214',
      sourceCode: 'https://github.com/zhou100/FoodSecurityPrediction',
    },
    {
      title: 'A data-driven approach improves food insecurity crisis prediction',
      authors: 'EC Lentz, H Michelson, K Baylis, Y Zhou',
      publication: 'World Development',
      details: '122, 399-409',
      citations: 138,
      year: 2019,
      href: 'https://www.sciencedirect.com/science/article/abs/pii/S0305750X19301603',
      sourceCode: 'https://github.com/zhou100/WD-Early-Warning-Food-Insecurity',
    },
    {
      title: 'Effects of stockholding policy on maize prices: Evidence from Zambia',
      authors: 'Y Zhou, K Baylis',
      publication: 'Journal of Agricultural & Food Industrial Organization',
      details: '18 (1), 20190057',
      citations: 3,
      year: 2020,
      href: 'https://www.degruyter.com/document/doi/10.1515/jafio-2019-0057/html',
      sourceCode: 'https://github.com/zhou100/JAFIO-FRA-Zambia',
    },
  ];
}

export function getSkills(): string[] {
  return [
    'Python',
    'SQL',
    'Machine Learning',
    'Gen AI',
    'Data Analysis',
    'Data Visualization',
    'Causal Inference',
  ];
}

export function getContact(): Contact {
  return {
    email: 'zhou@yujun.net',
  };
}
