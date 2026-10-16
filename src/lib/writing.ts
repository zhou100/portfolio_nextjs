import type { Block } from './work';

export type WritingTopic = 'Measurement' | 'AI Evaluation' | 'Building';

/**
 * One status drives every surface. `published` requires a `body`; nothing else
 * renders a link, on the home page, the writing index, or a case page.
 */
export type WritingStatus = 'planned' | 'drafting' | 'published';

export const WRITING_STATUS_LABEL: Record<WritingStatus, string> = {
  planned: 'Planned',
  drafting: 'In progress',
  published: 'Published',
};

export interface Article {
  slug: string;
  title: string;
  topic: WritingTopic;
  status: WritingStatus;
  /** Reader-facing summary. Used on cards and at the top of the piece. */
  excerpt: string;
  /** Slug in `work.ts` that supplies the evidence, when there is one. */
  relatedWork?: string;
  publishedAt?: string;
  readingTime?: string;
  /** Three takeaways shown above the body. */
  tldr?: string[];
  /** Required for `published`. A status change without a body is not a publish. */
  body?: Block[];
  /** One line at the end of the piece. */
  sources?: { name: string; href?: string }[];
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
    status: 'published',
    publishedAt: '2026-09-08',
    readingTime: '6 min',
    excerpt:
      'A model can improve on the test set and still be the wrong launch. The overall score measures typical traffic; the decision usually turns on a small slice and on failures the logged data cannot show.',
    relatedWork: 'recommendation-quality',
    tldr: [
      'A model can win on the held-out set and still be the wrong launch. In the example below it wins overall by about two points and loses the slice the product cares about by ten.',
      'The overall number measures typical traffic. Launch decisions usually turn on a small slice, or on failures the logged data cannot show, and the evidence on both is weaker than the headline suggests.',
      'I accept an offline win only with the slices named in advance, the metric’s blind spots stated, and guardrails that have a threshold and a consequence.',
    ],
    body: [
      {
        type: 'p',
        text: 'A launch review I have sat through many times goes like this. The new model scores 83% on the held-out set against 80% for the one in production. The sample is large, the win is clean, and everyone would like to ship. The pattern I keep seeing is that the number answers a different question from the one the launch is deciding. It tells you how the model does on typical traffic. The launch is usually about something narrower: a group of users the product worries about, or a kind of failure the test set was never built to show.',
      },
      {
        type: 'p',
        text: 'Here is the same evaluation split into ordinary traffic and the slice the product actually cares about. The numbers are illustrative, chosen so the arithmetic is easy to check.',
      },
      {
        type: 'table',
        caption: 'Illustrative numbers. The slice weights are population shares, not a modeling choice.',
        head: ['Slice', 'Share of population', 'Incumbent', 'Candidate'],
        rows: [
          ['Ordinary traffic', '95%', '80%', '83%'],
          ['High-risk slice', '5%', '60%', '50%'],
          ['Weighted overall', '100%', '79.0%', '81.35%'],
        ],
      },
      {
        type: 'p',
        text: 'The candidate wins overall, 81.35% to 79.0%, because 95% of the population is ordinary traffic where it gains three points. On the high-risk slice, 5% of the population, it drops from 60% to 50%. Both statements come from the same table. Which one should decide the launch depends on what the evaluation is for, and the overall number cannot tell you that.',
      },
      {
        type: 'p',
        text: 'The common practice is to treat the held-out score as the launch signal, with a few guardrail metrics on the readout. It is a reasonable default. A sample drawn from typical traffic is the right sample for estimating typical performance, and a large sample makes the overall number precise. The trouble is that precision on the average says little about precision where the decision actually turns.',
      },
      {
        type: 'p',
        text: 'My first point is that the sample is built for the average, so it is weakest exactly on the slice that matters. In an evaluation set of 2,000 items, a 5% slice is 100 items. At an accuracy around 55%, the standard error on that slice is about 5 points, so a 95% interval runs roughly 10 points either side, which is wide enough to hide the regression in the table. This is not only a teaching problem. Oakden-Rayner and colleagues called it hidden stratification in medical imaging: models with strong overall scores that failed on clinically important subsets, with performance gaps of more than 20% on some of them. The fix is cheap. Oversample the slice so it supports its own estimate, weight back when you want the population figure, and report both with their intervals.',
      },
      {
        type: 'p',
        text: 'Second, some failures cannot be seen offline however you sample, because the offline metric is built from what the old system showed people. Take a recommendation model scored on whether viewers engage with what it shows. A model that leans harder on creators a viewer already likes will score well, and it may also show the same few creators again and again. Engagement per item goes up while the session gets narrower, and the logged data cannot tell the two apart. Chaney, Stewart and Engelhardt showed in simulation that training and evaluating on data shaped by an existing recommender makes behavior more uniform without making it more useful, and that it biases held-out evaluation. Garcin and colleagues found the same gap in a live news recommender at swissinfo.ch: recommending popular stories looked best offline and did worst online, while methods that ranked lower offline raised click-through by up to 35%. So the readout needs separate measures for what the main metric cannot see, such as repetition, how concentrated the supply becomes, and how much effort a viewer spends before finding something worth watching. They are imperfect proxies, but they fail in a different direction from the main metric, which is what makes them useful.',
      },
      {
        type: 'p',
        text: 'Third, a guardrail only works if it can actually stop something. A guardrail that never blocks a launch is not necessarily useless; the risk may simply not have happened, or the design may already have avoided it. What makes it decoration is having no named failure, no threshold and no consequence for crossing it, or being so noisy that it could never move outside its own interval. Kohavi, Tang and Xu treat guardrail metrics the same way in their book on online experiments: they exist to catch harm the main metric misses, and they need enough statistical power to see harm at a size that would change the decision.',
      },
      {
        type: 'p',
        text: 'What I ask for before anyone reads the results is short. Name the population and the slices, and how they differ from the people the launch affects. Say what the candidate is compared against, and whether the comparison holds anything fixed that the launch will not. Pick one primary metric with its denominator, and say what it cannot see. Give each guardrail a failure mode, a threshold and what crossing it triggers; “escalate for discussion” is a real consequence, “note it” is not. None of this makes an offline win worthless. It turns the win into a claim about a specific population and a specific outcome, which is the only form in which anyone can check it.',
      },
    ],
    sources: [
      { name: 'Oakden-Rayner et al., Hidden Stratification (CHIL 2020)', href: 'https://arxiv.org/abs/1909.12475' },
      { name: 'Chaney, Stewart & Engelhardt, Algorithmic Confounding in Recommendation Systems (RecSys 2018)', href: 'https://arxiv.org/abs/1710.11214' },
      { name: 'Garcin et al., Offline and Online Evaluation of News Recommender Systems at swissinfo.ch (RecSys 2014)', href: 'https://infoscience.epfl.ch/record/210409' },
      { name: 'Kohavi, Tang & Xu, Trustworthy Online Controlled Experiments (2020)' },
    ],
  },
  {
    slug: 'creative-tagging-proving-lift',
    title: 'Creative Tagging Is Easy. Proving Lift Is Harder.',
    topic: 'Measurement',
    status: 'published',
    publishedAt: '2026-09-08',
    readingTime: '6 min',
    excerpt:
      'A correct tag, a tag that predicts performance, and an attribute that causes better results are three different claims. Most creative insight is one of the first two, described in the language of the third.',
    relatedWork: 'creative-evidence-lab',
    tldr: [
      'A creative tool makes three claims that sound like one: the tag is right, the tag predicts performance, and changing the attribute changes the outcome. Each needs its own evidence.',
      'Most creative “insight” is a correct tag or a prediction, described in the language of cause. In Facebook’s own experiments, observational estimates of ad lift were often off by a factor of three.',
      'Only a randomized test of two otherwise identical versions shows an effect, and the platform’s built-in split test is not randomized in the way it looks.',
    ],
    body: [
      {
        type: 'p',
        text: 'Creative intelligence products are good at telling you what is in an ad. Take a fifteen-second video: the logo appears in a corner at 0:02, a voiceover says the brand name at 0:06, and a call to action appears on screen at 0:12 and is spoken at 0:13. A tool will tag all of that, then tell you which tags go with better results, then suggest you move the brand earlier. Those are three different claims stacked on top of each other. The pattern I see is that the evidence gets weaker at each step while the language gets stronger.',
      },
      {
        type: 'table',
        caption: 'The same ad, three claims. Each row needs the evidence in its last column, and none of them supplies the next row’s.',
        head: ['Claim', 'The question', 'What settles it'],
        rows: [
          ['The tag is correct', 'Does the brand really appear at 0:02?', 'Agreement between annotators, per tag, with a sample size'],
          ['The tag predicts performance', 'Do early-reveal ads do better?', 'Beating a baseline that already knows budget, audience and placement, on held-out campaigns'],
          ['The attribute causes the outcome', 'Would moving the reveal earlier help this ad?', 'A randomized test of two versions that differ only in that attribute'],
        ],
      },
      {
        type: 'p',
        text: 'Read down the table and each step asks for more. A correct tag says nothing about performance. A tag that predicts performance says nothing about what would happen if you changed it. The common practice skips between them anyway. A dashboard reports tagging accuracy, then a correlation between tags and return on ad spend, then a recommendation, and the recommendation inherits the confidence of the first number.',
      },
      {
        type: 'p',
        text: 'My first point is that tag accuracy is mostly a definition problem, and it has to be measured tag by tag. Ask two annotators for the first brand appearance in the ad above. One says 0:02, reading the corner logo. The other says 0:06, reasoning that a logo small enough to miss is not an appearance the viewer experiences. Both are being careful; the definition failed. The repairs are unglamorous: record visual and spoken brand presence as separate fields, tie every tag to a time range and a frame or transcript reference, and keep “absent” and “not detected” as different values. Then report accuracy per tag. A blended accuracy of 91% is compatible with a call-to-action tag at 99% and a first-brand-appearance tag at 62%, and the second is the one every downstream analysis is about to use. Sample size matters as much: zero errors on a pilot of thirty assets still leaves a 95% upper bound of about 10% on the error rate.',
      },
      {
        type: 'p',
        text: 'Second, a tag that predicts performance is usually standing in for who made the ad and how it was delivered. Large brands reveal early as house style. They also buy better placements, reach warmer audiences and run stronger offers, and each of those can explain a gap in return on ad spend. This is not a hypothetical worry. Gordon, Zettelmeyer, Bhargava and Chapsky compared observational methods with randomized results across 15 advertising experiments at Facebook, covering 1.6 billion impressions. The observational methods often failed to recover the experimental effect, even with rich data on users, and in half of the studies the estimated lift was off by a factor of about three. So a predictive claim has to beat a ladder of baselines: the advertiser’s historical rate, then a model that knows the delivery context before launch, then that model plus the tags. Only the last step measures what the tags add. Hold out whole creative families and later time periods, or near-copies of the same ad land on both sides of the split, and pick one target, because click-through, conversion rate and return on ad spend have different denominators.',
      },
      {
        type: 'p',
        text: 'Third, only an intervention shows that changing the attribute changes the outcome, and it has to be narrow enough to read. Two versions of the same edit, with the brand mention at 0:06 in one and 0:02 in the other, and the same offer, call to action, length and audio. The trap is the platform’s own split test. Braun and Schwartz showed in the Journal of Marketing that ad platforms deliver each version to a different, optimized mix of users during the test, so the “winner” may simply have reached people more likely to respond. A later study of Meta’s tools found the problem specific to its A/B tests, not to lift tests with a holdout group. If the only real randomization is at the campaign or regional level, that cluster is the unit and the power calculation has to use it. And the outcome should be conversions per assigned unit, not conversion rate among clickers, because the change can alter who clicks in the first place.',
      },
      {
        type: 'p',
        text: 'Before I repeat a creative finding, I ask which of the three claims it is. If it is a tag, do I know its agreement and sample size? If it is a prediction, does it beat a baseline that already knows the delivery context? If it is a causal claim, is there a recorded random assignment behind it? Saying which one you have is not a hedge. It is the content of the finding.',
      },
    ],
    sources: [
      { name: 'Gordon, Zettelmeyer, Bhargava & Chapsky, A Comparison of Approaches to Advertising Measurement (Marketing Science, 2019)', href: 'https://www.kellogg.northwestern.edu/faculty/gordon_b/files/fb_comparison.pdf' },
      { name: 'Braun & Schwartz, Where A/B Testing Goes Wrong (Journal of Marketing, 2025)', href: 'https://papers.ssrn.com/abstract=3896024' },
      { name: 'Divergent delivery in Meta A/B and lift tests (arXiv 2508.21251)', href: 'https://arxiv.org/abs/2508.21251' },
    ],
  },
  {
    slug: 'an-ai-evaluator-needs-an-evaluation',
    title: 'An AI Evaluator Needs an Evaluation',
    topic: 'AI Evaluation',
    status: 'published',
    publishedAt: '2026-09-08',
    readingTime: '6 min',
    excerpt:
      'An LLM judge that gates a release is a measuring instrument. Two deliberately hard answer pairs show why one score cannot hold grounding and task completion, and how blind human ratings and the disagreements decide what the judge may grade alone.',
    relatedWork: 'enterprise-ai-evaluation',
    tldr: [
      'An LLM judge that gates a release is a measuring instrument. Checking that it agrees with itself shows it is consistent, not that it is right.',
      'Judges have known biases. Swapping the order of two answers let one model beat ChatGPT on 66 of 80 questions, and longer answers get rewarded for their length.',
      'Score grounding, task completion and unsupported recommendations separately, compare against blind human ratings, and use the disagreements to decide what the judge may grade alone.',
    ],
    body: [
      {
        type: 'p',
        text: 'More teams now let a language model grade another model’s answers and use that grade to decide what ships. The pattern I see is that the judge gets less scrutiny than the system it is judging. The usual check is that the judge gives the same score on repeated runs. That shows the judge is consistent. A judge that shares the generator’s blind spots will certify them consistently.',
      },
      {
        type: 'p',
        text: 'Here are two answer pairs written to be hard in the way that matters. Decide which answer in each pair is better before reading on.',
      },
      {
        type: 'deflist',
        items: [
          { term: 'Task A', detail: 'Campaign C has the highest return on ad spend of our three campaigns this quarter. Should we move the next budget increment into it?' },
          { term: 'Answer A1', detail: 'Cites the correct figures for all three campaigns, identifies C as highest, and recommends moving the increment into C.' },
          { term: 'Answer A2', detail: 'Cites the same figures, then says the ranking does not answer the question: past return reflects where money was already spent and which audiences were reachable, so the return on new spend in C is unknown. Proposes a holdout test before moving the money.' },
          { term: 'Task B', detail: 'Which of these two product lines should we prioritize in next quarter’s campaign?' },
          { term: 'Answer B1', detail: 'Three sentences. Says the decision needs gross margin per line, which the material does not contain, and asks for it; revenue alone favors line A, and margin could reverse that.' },
          { term: 'Answer B2', detail: 'Six well-organized paragraphs recommending line A, including a margin comparison. The margin figures appear nowhere in the source material.' },
        ],
      },
      {
        type: 'p',
        text: 'In Task A every number in A1 is right, and the recommendation is still wrong, because average return on money already spent does not tell you the return on the next dollar. In Task B, B2 is longer, better organized and more decisive, and it invents its key numbers; B1 is the correct professional response to an underspecified question. A judge that scores grounding will like A1. A judge that is impressed by length and confidence will like B2. Both are the answers a user could not act on.',
      },
      {
        type: 'p',
        text: 'The common defense of LLM judges is that they agree with people about as often as people agree with each other. Zheng and colleagues found GPT-4’s verdicts matched human experts about 85% of the time on MT-Bench when ties were excluded, against 81% agreement between the humans themselves. I take that result seriously. But it is an average over one benchmark, and later work on when to trust a judge found GPT-4 almost never reached 80% agreement with people on a subset of Chatbot Arena. An average agreement figure is exactly the number that hides cases like the two above.',
      },
      {
        type: 'p',
        text: 'My first point is that one quality score cannot hold these answers, because the dimensions move in opposite directions. Score them separately. Grounding asks whether every factual sentence traces to the evidence: both Task A answers pass, and B2 fails. Task completion asks whether the user could act on the answer and get what they came for: A1 and B2 fail. A third check, whether the answer recommends something the evidence does not support, catches A1, which is fully grounded and still draws the wrong inference. There is outside evidence that a blended score drifts toward surface features. When Dubois and colleagues adjusted AlpacaEval’s judge scores for answer length, the benchmark’s rank correlation with Chatbot Arena’s human votes rose from 0.94 to 0.98, which means length had been moving the scores.',
      },
      {
        type: 'p',
        text: 'Second, the procedure matters as much as the rubric, because judges react to things that should not matter. Wang and colleagues found that simply swapping the order of two answers changed the verdict often enough that Vicuna-13B could beat ChatGPT on 66 of 80 questions with ChatGPT as the judge. So I score blind, with no model names in the context; swap the order of answers across items; have humans score on the same rubric before anyone sees the judge’s output, since reading the judge first anchors the people; and report agreement per dimension, never as one blended figure. A judge can track people closely on grounding and barely at all on task completion, which is the case where an average misleads most.',
      },
      {
        type: 'p',
        text: 'Third, the disagreements are the useful output, and their direction tells you what to do. Where the judge is more generous than people, you are looking at the failures it will let through, usually fluent answers that miss the task. Where it is harsher, the rubric is often underspecified, and two people disagreeing on the same item is a reason to rewrite the rubric, not to average them. The end product is a decision about which kinds of errors the judge may grade alone and which go to a person regardless of score. The “Trust or Escalate” work makes the same move formally: the judge abstains and escalates when its confidence is too low to keep agreement with people above a target. A judge that handles the easy, high-volume cases and escalates the rest is worth having. One trusted everywhere because its overall agreement looked good is a release gate with a hole in it.',
      },
      {
        type: 'p',
        text: 'Before I let a judge’s score gate anything, I want to be able to name a failure it is known to miss and say where that failure goes instead; to know the human comparison was collected blind, before the judge’s output was visible; to see agreement per dimension, with the model version, prompt and tie-breaking rule recorded; and, if the judge and the people disagree next quarter, to be able to tell whether the model drifted or the rubric was always ambiguous. The answer pairs here are teaching cases I wrote, and this piece reports no judge scores of my own, because a number I have not computed would undercut the argument. The exercise costs an afternoon and two dozen carefully written items. It tells you which of your quality gates is actually doing the work.',
      },
    ],
    sources: [
      { name: 'Zheng et al., Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (NeurIPS 2023)', href: 'https://arxiv.org/abs/2306.05685' },
      { name: 'Wang et al., Large Language Models are not Fair Evaluators (ACL 2024)', href: 'https://arxiv.org/abs/2305.17926' },
      { name: 'Dubois et al., Length-Controlled AlpacaEval (2024)', href: 'https://arxiv.org/abs/2404.04475' },
      { name: 'Trust or Escalate: LLM Judges with Provable Guarantees for Human Agreement (ICLR 2025)', href: 'https://arxiv.org/abs/2407.18370' },
    ],
  },
  {
    slug: 'over-merging-and-over-splitting',
    title: 'Too Many Narratives: Measuring Over-Merging and Over-Splitting',
    topic: 'AI Evaluation',
    status: 'drafting',
    excerpt:
      'Two claims can mention the same company and still tell different stories. A small set of paired examples shows how to distinguish over-merging from over-splitting, write clearer annotation rules, and evaluate clusters without treating shared vocabulary as shared meaning.',
  },
  {
    slug: 'llm-versus-deterministic-rule',
    title: 'When Should an LLM Replace a Deterministic Rule?',
    topic: 'AI Evaluation',
    status: 'drafting',
    excerpt:
      'A rule can be predictable and brittle; a model can be flexible and inconsistent. Using short claims with negation and stance changes, this piece sets out a comparison of rules, a model, and a hybrid — measuring errors, review effort, cost, and latency.',
  },
  {
    slug: 'no-errors-is-not-healthy',
    title: 'No Errors Is Not the Same as a Healthy Pipeline',
    topic: 'Building',
    status: 'drafting',
    excerpt:
      'Staleness, coverage against a required field set, and progress are the health metrics that catch silent failure. A pipeline with clean logs and no run records is failing quietly.',
    relatedWork: 'churchmap',
  },
  {
    slug: 'narrative-changed-did-evidence-change',
    title: 'A Narrative Changed. Did the Evidence Change?',
    topic: 'AI Evaluation',
    status: 'planned',
    excerpt:
      'A stronger headline is not necessarily new evidence. Comparing reposts, new disclosures, and genuine reversals separates changes in language from changes in the underlying claim.',
  },
  {
    slug: 'model-confident-should-product-be',
    title: 'The Model Is Confident. Should the Product Be?',
    topic: 'AI Evaluation',
    status: 'planned',
    excerpt:
      'Self-reported confidence is not a calibrated probability. Calibration, abstention, and the cost of human review decide what an interface is allowed to assert.',
    relatedWork: 'creative-evidence-lab',
  },
  {
    slug: 'evaluating-ai-memory',
    title: 'Evaluating AI Memory Beyond Retrieval Accuracy',
    topic: 'AI Evaluation',
    status: 'planned',
    excerpt:
      'Stale memories, contradictions, and corrections matter more than retrieval accuracy, and need a small benchmark that includes all three.',
    relatedWork: 'debrief',
  },
  {
    slug: 'dashboard-should-end-in-a-decision',
    title: 'The Dashboard Should End in a Decision',
    topic: 'Building',
    status: 'planned',
    excerpt:
      'Every metric on a surface should name the action it triggers, shown through a before-and-after task-completion test rather than a redesign screenshot.',
  },
  {
    slug: 'cold-start-is-a-scope-decision',
    title: 'Cold Start Is a Product Scope Decision',
    topic: 'Building',
    status: 'planned',
    excerpt:
      'Narrowing the initial user, geography, and required field set makes cold start testable — which is a different and more useful claim than solving it.',
    relatedWork: 'churchmap',
  },
  {
    slug: 'json-files-to-a-database',
    title: 'From JSON Files to a Database: What Actually Forced the Move?',
    topic: 'Building',
    status: 'planned',
    excerpt:
      'Query patterns, update semantics, consistency, and replay requirements force the migration. Volume alone usually does not.',
  },
  {
    slug: 's3-needs-a-table-layer',
    title: 'Why S3 Needs a Table Layer for Transactions',
    topic: 'Building',
    status: 'planned',
    excerpt:
      'Single-row updates, snapshots, and concurrent commits explain the table format better than any scale argument.',
  },
  {
    slug: 'tuesday-boy-is-about-sampling',
    title: 'Why the Tuesday-Boy Puzzle Is Really About Sampling',
    topic: 'Measurement',
    status: 'planned',
    excerpt:
      'The disagreement is about the information-generating process, not the arithmetic. A small simulation makes the two readings concrete.',
  },
  {
    slug: 'testing-a-thesis-without-looking-ahead',
    title: 'Testing a Market Thesis Without Looking Ahead',
    topic: 'Measurement',
    status: 'planned',
    excerpt:
      'Availability time, event confounding, and survivorship decide whether a backtest means anything. A method piece, not a stock list.',
  },
  {
    slug: 'forecasts-to-product-evaluation',
    title: 'From Food-Security Forecasts to AI Product Evaluation',
    topic: 'Measurement',
    status: 'planned',
    excerpt:
      'Generalization, interpretability, and the cost of a wrong decision are the same three problems in both settings.',
  },
  {
    slug: 'where-should-the-next-ad-dollar-go',
    title: 'Where Should the Next Advertising Dollar Go?',
    topic: 'Measurement',
    status: 'planned',
    excerpt:
      'Ranking channels by observed return answers a different question from where the next increment should go. Marginal return, saturation, and a spend-level holdout are what the budget decision actually needs.',
    relatedWork: 'creative-evidence-lab',
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

/** The only articles that ever render a link. `body` is required to qualify. */
export function getPublishedArticles(): Article[] {
  return articles.filter((article) => article.status === 'published' && !!article.body?.length);
}

export function getDraftingArticles(): Article[] {
  return articles.filter((article) => article.status === 'drafting');
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getPublishedSlugs(): string[] {
  return getPublishedArticles().map((article) => article.slug);
}

/** A link exists only for a published piece with a body. Everything else is text. */
export function articleHref(article: Article): string | undefined {
  return article.status === 'published' && article.body?.length
    ? `/writing/${article.slug}`
    : undefined;
}

export function getPapers(): Paper[] {
  return [...papers].sort((a, b) => b.year - a.year);
}
