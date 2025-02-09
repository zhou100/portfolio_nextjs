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

export const header: Header = {
  homepage: 'https://zhou100.github.io/',
  title: 'YZ',
}

export const about: About = {
  name: 'Yujun Zhou',
  role: 'Data Scientist',
  description:
    'An economist turned tech professional, I have worked on recommendation systems at Instagram and integrity at Facebook. Now at Annalect, I focus on applying LLMs to marketing challenges while pursuing generative AI side projects.',
  social: {
    linkedin: 'https://www.linkedin.com/in/yujun-zhou/',
    github: 'https://github.com/zhou100',
    googlescholar: 'https://scholar.google.com/citations?user=1c8nq8EAAAAJ&hl=en',
  },
}

export const projects: Project[] = [
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
]

export const skills: string[] = [
  'Python',
  'SQL',
  'Machine Learning',
  'Gen AI',
  'Data Analysis',
  'Data Visualization',
  'Causal Inference',
]

export const contact: Contact = {
  email: 'zhouyujun001@gmail.com',
}