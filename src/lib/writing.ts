export type WritingTopic = 'Measurement' | 'AI Evaluation' | 'Building';
export type WritingStatus = 'planned' | 'drafting' | 'published';

export interface Article {
  slug: string;
  title: string;
  topic: WritingTopic;
  status: WritingStatus;
  featured: boolean;
  /** The claim the piece has to support. Not a teaser. */
  argument: string;
  /** Slug in `work.ts` that supplies the evidence, when there is one. */
  relatedWork?: string;
  href?: string;
  publishedAt?: string;
}

export interface Paper {
  title: string;
  authors: string;
  publication: string;
  details?: string;
  year: number;
  href: string;
  sourceCode?: string;
}

const articles: Article[] = [
  {
    slug: 'offline-metric-wrong-launch-signal',
    title: 'When a Better Offline Metric Is the Wrong Launch Signal',
    topic: 'Measurement',
    status: 'planned',
    featured: true,
    argument:
      'An evaluation population drawn from typical traffic under-represents the users a quality or safety metric exists to protect, so a model can win offline and lose exactly where it matters.',
    relatedWork: 'reels-measurement',
  },
  {
    slug: 'creative-tagging-proving-lift',
    title: 'Creative Tagging Is Easy. Proving Lift Is Harder.',
    topic: 'Measurement',
    status: 'planned',
    featured: true,
    argument:
      'Label quality, predictive value, and incremental impact are three separate claims with three separate burdens of proof. Most creative-intelligence products quietly report the first and sell the third.',
    relatedWork: 'creative-evidence-lab',
  },
  {
    slug: 'llm-versus-deterministic-rule',
    title: 'When Should an LLM Replace a Deterministic Rule?',
    topic: 'AI Evaluation',
    status: 'planned',
    featured: true,
    argument:
      'Compared on one test set with cost and latency reported, the answer is often "neither alone." Written as a study design first, with results added when the comparison is run.',
    relatedWork: 'narrative-intelligence',
  },
  {
    slug: 'over-merging-and-over-splitting',
    title: 'Too Many Narratives: Measuring Over-Merging and Over-Splitting',
    topic: 'AI Evaluation',
    status: 'planned',
    featured: false,
    argument:
      'Clustering quality for claims needs a pairwise annotation protocol and named error classes, because shared vocabulary is not a shared proposition.',
    relatedWork: 'narrative-intelligence',
  },
  {
    slug: 'narrative-changed-did-evidence-change',
    title: 'A Narrative Changed. Did the Evidence Change?',
    topic: 'AI Evaluation',
    status: 'planned',
    featured: false,
    argument:
      'Claim fidelity and market reaction must be evaluated separately, with timestamped evidence tracing, or the model gets credit for hindsight.',
    relatedWork: 'narrative-intelligence',
  },
  {
    slug: 'an-ai-evaluator-needs-an-evaluation',
    title: 'An AI Evaluator Needs an Evaluation',
    topic: 'AI Evaluation',
    status: 'planned',
    featured: false,
    argument:
      'A judge validated only against its own consistency certifies the blind spots it shares with the generator. Blind scoring and disagreement analysis are the minimum.',
    relatedWork: 'enterprise-ai-evaluation',
  },
  {
    slug: 'model-confident-should-product-be',
    title: 'The Model Is Confident. Should the Product Be?',
    topic: 'AI Evaluation',
    status: 'planned',
    featured: false,
    argument:
      'Self-reported confidence is not a calibrated probability. Calibration, abstention, and human review cost decide what the interface is allowed to assert.',
    relatedWork: 'creative-evidence-lab',
  },
  {
    slug: 'evaluating-ai-memory',
    title: 'Evaluating AI Memory Beyond Retrieval Accuracy',
    topic: 'AI Evaluation',
    status: 'planned',
    featured: false,
    argument:
      'Stale memories, contradictions, and corrections matter more than retrieval accuracy. Needs a small benchmark that includes all three.',
    relatedWork: 'debrief',
  },
  {
    slug: 'dashboard-should-end-in-a-decision',
    title: 'The Dashboard Should End in a Decision',
    topic: 'Building',
    status: 'planned',
    featured: false,
    argument:
      'Every metric on a surface should name the action it triggers. Shown through a before/after task-completion test, not a redesign screenshot.',
    relatedWork: 'narrative-intelligence',
  },
  {
    slug: 'cold-start-is-a-scope-decision',
    title: 'Cold Start Is a Product Scope Decision',
    topic: 'Building',
    status: 'planned',
    featured: false,
    argument:
      'Cold start is solved by narrowing the city, the user, and the required field set — not by crawling more.',
    relatedWork: 'churchmap',
  },
  {
    slug: 'no-errors-is-not-healthy',
    title: 'No Errors Is Not the Same as a Healthy Pipeline',
    topic: 'Building',
    status: 'planned',
    featured: false,
    argument:
      'Staleness, coverage, and progress are the real health metrics. A pipeline with clean logs and no run records is failing silently.',
    relatedWork: 'churchmap',
  },
  {
    slug: 'json-files-to-a-database',
    title: 'From JSON Files to a Database: What Actually Forced the Move?',
    topic: 'Building',
    status: 'planned',
    featured: false,
    argument:
      'Query patterns, update semantics, consistency, and replay requirements force the migration. Volume alone usually does not.',
    relatedWork: 'narrative-intelligence',
  },
  {
    slug: 's3-needs-a-table-layer',
    title: 'Why S3 Needs a Table Layer for Transactions',
    topic: 'Building',
    status: 'planned',
    featured: false,
    argument:
      'Single-row updates, snapshots, and concurrent commits explain the table format better than any scale argument. To be checked against current Iceberg and Delta documentation before publishing.',
  },
  {
    slug: 'tuesday-boy-is-about-sampling',
    title: 'Why the Tuesday-Boy Puzzle Is Really About Sampling',
    topic: 'Measurement',
    status: 'planned',
    featured: false,
    argument:
      'The disagreement is about the information-generating process, not the arithmetic. A small simulation makes the two readings concrete.',
  },
  {
    slug: 'testing-a-thesis-without-looking-ahead',
    title: 'Testing a Market Thesis Without Looking Ahead',
    topic: 'Measurement',
    status: 'planned',
    featured: false,
    argument:
      'Availability time, event confounding, and survivorship decide whether a backtest means anything. A method piece, not a stock list.',
    relatedWork: 'narrative-intelligence',
  },
  {
    slug: 'forecasts-to-product-evaluation',
    title: 'From Food-Security Forecasts to AI Product Evaluation',
    topic: 'Measurement',
    status: 'planned',
    featured: false,
    argument:
      'Generalization, interpretability, and the cost of a wrong decision are the same three problems in both settings.',
  },
];

const papers: Paper[] = [
  {
    title: 'Machine learning for food security: Principles for transparency and usability',
    authors: 'Y Zhou, E Lentz, H Michelson, C Kim, K Baylis',
    publication: 'Applied Economic Perspectives and Policy',
    details: '44 (2), 893–910',
    year: 2022,
    href: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/aepp.13214',
    sourceCode: 'https://github.com/zhou100/FoodSecurityPrediction',
  },
  {
    title: 'A data-driven approach improves food insecurity crisis prediction',
    authors: 'EC Lentz, H Michelson, K Baylis, Y Zhou',
    publication: 'World Development',
    details: '122, 399–409',
    year: 2019,
    href: 'https://www.sciencedirect.com/science/article/abs/pii/S0305750X19301603',
    sourceCode: 'https://github.com/zhou100/WD-Early-Warning-Food-Insecurity',
  },
  {
    title: 'Effects of stockholding policy on maize prices: Evidence from Zambia',
    authors: 'Y Zhou, K Baylis',
    publication: 'Journal of Agricultural & Food Industrial Organization',
    details: '18 (1), 20190057',
    year: 2020,
    href: 'https://www.degruyter.com/document/doi/10.1515/jafio-2019-0057/html',
    sourceCode: 'https://github.com/zhou100/JAFIO-FRA-Zambia',
  },
];

export function getArticles(): Article[] {
  return articles;
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((article) => article.featured);
}

export function getPapers(): Paper[] {
  return [...papers].sort((a, b) => b.year - a.year);
}
