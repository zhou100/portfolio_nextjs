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
  description?: string;
  resume?: string;
  social?: Social;
}

interface Project {
  name: string;
  description: string;
  stack: string[];
  sourceCode?: string;
  livePreview?: string;
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
    role: 'Data Scientist',
    description:
      'Economist by training, product thinker by practice. I use data science and generative AI as tools to reason, prototype, and build. Formerly at Meta to learn how tech works at scale — now applying that knowledge at Annalect and beyond.',
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
      name: 'VoiceTrack',
      description:
        'A voice-enabled productivity app that transcribes and organizes audio notes into tasks, ideas, and time logs using AI for effortless time and content management.',
      stack: ['React', 'FastAPI', 'TypeScript', 'Python'],
      livePreview: 'https://time-logger.replit.app/',
    },
    {
      name: 'Machine learning for food security',
      description:
        'explores the use of machine learning to predict food insecurity in sub-Saharan Africa, emphasizing the importance of transparency and usability for policy-makers by highlighting modeling choices that balance accuracy and recall.',
      stack: ['Machine Learning', 'Python', 'R'],
      sourceCode: 'https://github.com/zhou100/FoodSecurityPrediction',
      livePreview: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/aepp.13214',
    },
    {
      name: 'A data-driven approach improves food insecurity crisis prediction',
      description:
        ' presents a transparent and data-driven model that significantly improves the prediction of food insecurity crises in Malawi compared to existing global methods..',
      stack: ['Machine Learning', 'Python', 'R'],
      sourceCode: 'https://github.com/zhou100/WD-Early-Warning-Food-Insecurity',
      livePreview: 'https://www.sciencedirect.com/science/article/abs/pii/S0305750X19301603',
    },
    {
      name: 'Effects of Stockholding Policy on Maize Prices',
      description:
        'examines the effects of public stockholding policies by the Zambian Food Reserve Agency on maize prices, finding that purchases increase prices for producers while sales reduce prices for consumers within a cropping year, but have limited impact on inter-annual price volatility.',
      stack: ['Causal Inference', 'Data Analysis', 'R'],
      sourceCode: 'https://github.com/zhou100/JAFIO-FRA-Zambia',
      livePreview: 'https://www.degruyter.com/document/doi/10.1515/jafio-2019-0057/html',
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
    email: 'yz@holyhub.ai',
  };
}