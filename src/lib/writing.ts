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
  /** Required for `published`. A status change without a body is not a publish. */
  body?: Block[];
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
    readingTime: '5 min',
    excerpt:
      'A model can improve on the test set and still fail the launch decision. Two examples — recommendation quality and rare high-cost failures — show how the evaluation population, the metric, and the guardrails decide what an offline win actually means.',
    relatedWork: 'recommendation-quality',
    body: [
      {
        type: 'p',
        text: 'Here is a readout that arrives on a launch review most weeks. The new model scores 83% against 80% for the incumbent on the held-out set. It is a clean win, the sample is large, and everyone in the room would like to ship it.',
      },
      {
        type: 'p',
        text: 'Then someone splits the same evaluation set into the ordinary slice and the slice the product actually worries about.',
      },
      {
        type: 'table',
        caption:
          'Illustrative numbers, chosen so the arithmetic is easy to check. The slice weights are the population shares, not a modelling choice.',
        head: ['Slice', 'Share of population', 'Incumbent', 'Candidate'],
        rows: [
          ['Ordinary traffic', '95%', '80%', '83%'],
          ['High-risk slice', '5%', '60%', '50%'],
          ['Weighted overall', '100%', '79.0%', '81.35%'],
        ],
      },
      {
        type: 'p',
        text: 'The candidate wins overall by more than two points and loses the high-risk slice by ten. Both statements are true, computed from the same table. Which one is the launch signal depends on a question the accuracy number cannot answer: what is this evaluation supposed to decide?',
      },
      { type: 'h', text: 'Overall performance and slice performance answer different questions' },
      {
        type: 'p',
        text: 'A sample drawn from typical traffic is the right sample for estimating typical performance. That is not a flaw, it is the design working. What it cannot do is say much about a slice that makes up 5% of the population — at that share, most of the sample is spent on the case you already understand, and the interval on the slice estimate is wide enough to hide a real regression.',
      },
      {
        type: 'p',
        text: 'The mistake is not sampling from typical traffic. The mistake is reading one number as though it answered both questions. If the decision depends on the rare slice, then the slice needs enough sample to support an estimate, which usually means oversampling it and weighting back when you want the population figure. Reporting the weighted overall alongside the unweighted slice estimates, each with its interval, costs one extra row and removes the ambiguity entirely.',
      },
      {
        type: 'note',
        text: 'A point estimate without a sample size is not a result. Two of the four numbers in the table above would move meaningfully on a resample of the 5% slice, and nothing in this article tells you which two.',
      },
      { type: 'h', text: 'The metric can be gameable in a direction the test set cannot see' },
      {
        type: 'p',
        text: 'The second failure is subtler, because it survives every sampling fix. Consider a recommendation model evaluated on whether the viewer engages with what it shows. A model that leans harder on the creators a viewer has already reacted to will score well on that metric. It is genuinely better at predicting engagement.',
      },
      {
        type: 'p',
        text: 'It may also be showing the same three creators repeatedly. Engagement per item goes up. The session gets narrower. Offline, those two outcomes are indistinguishable, because the offline metric is built from historical interactions with a catalogue the model is now choosing differently from.',
      },
      {
        type: 'p',
        text: 'The fix is not a better offline metric. It is knowing which product failure the offline metric is structurally unable to see, and putting that failure on the launch readout as a separate measurement — repetition, supply concentration, the effort a viewer spends before finding something worth watching. These are proxies for experience, and imperfect ones. Their value is that they fail in a different direction from the primary metric, so when both move the right way you have learned something the primary metric alone could not tell you.',
      },
      { type: 'h', text: 'A guardrail needs a threshold and a consequence' },
      {
        type: 'p',
        text: 'It is tempting to conclude that a guardrail which never stops a launch is decoration. That inference does not hold. A guardrail may never bind because the risk did not materialize, or because the design that produced the candidate already avoided it. Neither is evidence the guardrail is useless.',
      },
      {
        type: 'p',
        text: 'What does make a guardrail decoration is being unfalsifiable: no defined failure mode, no stated threshold, and no consequence attached to crossing it. Those three are checkable before the launch, and they are what separates a guardrail from a chart. A guardrail also needs enough sensitivity to detect harm at a size that would actually change the decision — a metric too noisy to move outside its own interval will never bind no matter what happens.',
      },
      { type: 'h', text: 'What a launch readout has to state' },
      {
        type: 'p',
        text: 'The version of this I would defend in a review is short. Four fields, stated before the results are read:',
      },
      {
        type: 'list',
        items: [
          'Population — who this was evaluated on, and how that differs from who the decision affects. Name the slices before you look.',
          'Comparison — what the candidate is being compared against, and whether the comparison holds anything constant that the launch will not.',
          'Primary metric — one, with its denominator, plus what it structurally cannot see.',
          'Guardrails — each with a failure mode, a threshold, and what crossing it triggers. "Escalate for discussion" is a legitimate consequence; "note it" is not.',
        ],
      },
      {
        type: 'p',
        text: 'None of this makes an offline win worthless. It makes the win a claim about a specific population and a specific outcome, which is the only form in which it can be checked. The launch decision is a different question, and it stays a different question no matter how clean the test-set number is.',
      },
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
      'Finding a logo in a video, predicting which ad performs well, and proving that an earlier brand reveal improves outcomes are three different tasks with three different burdens of proof. This piece follows one creative change through all three.',
    relatedWork: 'creative-evidence-lab',
    body: [
      {
        type: 'p',
        text: 'Take a fifteen-second video ad. The logo appears at 00:02 in the corner of the frame. A voiceover says the brand name at 00:06. A call to action appears on screen at 00:12 and is spoken at 00:13.',
      },
      {
        type: 'p',
        text: 'A creative intelligence product will tell you three things about this ad, and they sound like one thing. They are not. Accurate tags, predictive tags, and tags whose underlying attribute causes the outcome are separate claims, and each needs its own evaluation.',
      },
      { type: 'h', text: 'Claim one: the tag is correct' },
      {
        type: 'p',
        text: 'Ask two annotators for "first brand appearance" on the ad above. One says 00:02, reading the corner logo. The other says 00:06, reasoning that a logo small enough to miss is not an appearance in any sense the viewer experiences. Both are being careful. The definition is what failed.',
      },
      {
        type: 'p',
        text: 'This is the cheapest failure to fix and the one most often skipped, because the model produces a number either way. The repairs are unglamorous: split visual and spoken brand presence into separate fields; require every tag to be bound to a time range and a frame or transcript reference; keep "absent" and "not detected" as different values, because a pipeline that cannot see the logo and an ad that has no logo are different facts about the world.',
      },
      {
        type: 'p',
        text: 'Then measure per tag, not in aggregate. A blended tagging accuracy of 91% is compatible with a CTA-presence tag at 99% and a first-brand-appearance tag at 62%, and the second one is the tag every downstream analysis is about to use.',
      },
      {
        type: 'note',
        text: 'Zero errors on a pilot of thirty assets is not a zero error rate. Report the sample size and the interval next to every accuracy figure, or the number is decoration.',
      },
      { type: 'h', text: 'Claim two: the tag predicts performance' },
      {
        type: 'p',
        text: 'Suppose the labels are now trustworthy, and the data shows that ads with a brand reveal before 00:03 have higher ROAS than ads that reveal later. This is a real pattern in the data. It is also close to uninterpretable on its own.',
      },
      {
        type: 'p',
        text: 'Large brands with big budgets reveal early — it is house style, and they have the recognition to make it work. They also buy better placements, target warmer audiences, and run against higher-converting offers. Every one of those is a plausible explanation for the ROAS gap, and the tag is partly a proxy for "this is a large advertiser."',
      },
      {
        type: 'p',
        text: 'A predictive evaluation that means anything has to answer: better than what? The honest baseline ladder is three rungs.',
      },
      {
        type: 'table',
        head: ['Model', 'What it knows', 'What it establishes'],
        rows: [
          [
            'Baseline 0',
            'The grouped historical rate for this advertiser and objective',
            'The floor. A tag model that loses to this has added nothing.',
          ],
          [
            'Baseline 1',
            'Pre-delivery context: budget, audience, placement, objective, format',
            'How much of the pattern is delivery context wearing a creative costume.',
          ],
          [
            'Model 2',
            'Baseline 1 plus the creative tags',
            'The incremental information in the tags, and only that.',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Hold out by creative family and out of time, or near-duplicate assets from the same campaign land on both sides of the split and the score measures memorization. Check for leakage in both directions: performance data that leaked into a tag, and campaign names that encode the outcome. And pick one target — CTR, CVR, and ROAS are different tasks with different denominators, and they do not roll up into a creative score.',
      },
      {
        type: 'p',
        text: 'Suppose Model 2 beats Baseline 1 out of sample. You have shown the tags carry information the delivery context does not. You have not shown that changing the creative changes anything.',
      },
      { type: 'h', text: 'Claim three: changing the attribute changes the outcome' },
      {
        type: 'p',
        text: 'Only an intervention gets you here, and the intervention has to be narrow enough to interpret. Two versions of the same asset, differing in the tested attribute and nothing else.',
      },
      {
        type: 'template',
        lines: [
          {
            label: 'Observation',
            text: 'In this account, ads with a spoken brand mention before 00:03 show higher ROAS than ads that mention it later. Confounded with budget, audience, and offer.',
          },
          {
            label: 'Hypothesis',
            text: 'Moving the spoken brand mention earlier improves conversion rate for this campaign. Not established.',
          },
          {
            label: 'Intervention',
            text: 'Version A: brand mention at 00:06, unchanged. Version B: identical edit with the brand mention at 00:02. Same offer, same CTA, same length, same audio bed.',
          },
          {
            label: 'Metric',
            text: 'ITT difference in qualified conversion rate per assigned unit, in a fixed window. Guardrails on completion rate and cost per qualified action.',
          },
          {
            label: 'Decision rule',
            text: 'Ship B only if the preregistered primary outcome clears the minimum effect and no guardrail is crossed. Otherwise keep A.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Two traps at this stage. Running both versions simultaneously in one campaign is not randomization — the delivery system reallocates budget toward whichever version is already winning, so exposure is a function of the outcome. If the only randomization available is campaign or geo level, then that cluster is the unit, and the power calculation has to use it. Second, click-conditioned conversion rate cannot stand in for the ITT result, because treatment can change who clicks in the first place.',
      },
      { type: 'h', text: 'The check' },
      {
        type: 'p',
        text: 'Before repeating any creative finding, ask which of the three claims it actually is:',
      },
      {
        type: 'list',
        items: [
          'Is this a label, and do I know its per-tag agreement and sample size?',
          'Is this a prediction, and does it beat a baseline that already knows the delivery context?',
          'Is this a causal claim, and is there a recorded random assignment behind it?',
        ],
      },
      {
        type: 'p',
        text: 'Most creative insight lives at rung one or two and gets described in the language of rung three. Accurate tags do not establish incremental lift. Each claim needs its own evaluation, and saying which one you have is not a hedge — it is the entire content of the finding.',
      },
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
      'An evaluator can reward a polished answer that misses the task. Two deliberately difficult answer pairs show how to test a judge for grounding and task completion, compare it against human ratings, and learn from the disagreements before its score gates a release.',
    relatedWork: 'enterprise-ai-evaluation',
    body: [
      {
        type: 'p',
        text: 'If an LLM judge is going to gate a release, it is a measurement instrument, and measurement instruments get validated before they are trusted. The usual validation — checking that the judge agrees with itself across runs — establishes reliability, not correctness. A judge that shares the generator’s blind spots will certify them consistently.',
      },
      {
        type: 'p',
        text: 'Here are two answer pairs written to be hard in the specific way that matters. Read them and decide which answer in each pair is better before reading on.',
      },
      { type: 'h', text: 'Task A: the confident recommendation' },
      {
        type: 'deflist',
        items: [
          {
            term: 'Question',
            detail:
              'Campaign C has the highest ROAS of our three campaigns this quarter. Should we move the next budget increment into it?',
          },
          {
            term: 'Answer 1',
            detail:
              'Cites the correct ROAS figures for all three campaigns, correctly identifies C as highest, and recommends moving the increment into C to capture the higher return.',
          },
          {
            term: 'Answer 2',
            detail:
              'Cites the same correct figures, then says the ranking does not answer the question: observed ROAS reflects where spend has already been allocated and which audiences were reachable, so the marginal return on new spend in C is not established. Proposes a spend-level holdout or an incrementality test before shifting the increment.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Answer 1 is factually grounded and every number is right. It is also the wrong recommendation, because average ROAS on delivered spend does not identify the marginal return on new spend. A judge scoring grounding will rate Answer 1 highly. A judge scoring whether the user can act correctly on the answer will not.',
      },
      { type: 'h', text: 'Task B: the fluent fabrication' },
      {
        type: 'deflist',
        items: [
          {
            term: 'Question',
            detail: 'Which of these two product lines should we prioritize in next quarter’s campaign?',
          },
          {
            term: 'Answer 1',
            detail:
              'Three sentences. States that the decision needs gross margin per line, which is not in the provided material, and asks for it. Notes that revenue alone would favour line A and that margin could reverse the ranking.',
          },
          {
            term: 'Answer 2',
            detail:
              'Six well-organized paragraphs with a clear recommendation for line A, including a margin comparison. The margin figures do not appear anywhere in the source material.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Answer 2 is longer, better structured, more decisive, and contains invented numbers. Answer 1 is the correct professional response to an underspecified question. Judges — and human reviewers reading quickly — reliably prefer Answer 2 unless the rubric forces the check.',
      },
      { type: 'h', text: 'One score cannot hold this' },
      {
        type: 'p',
        text: 'Both pairs fail under a single "answer quality" score for the same reason: the dimensions move in opposite directions. Split them.',
      },
      {
        type: 'table',
        caption:
          'Scored independently, on the same answer. Collapsing them into a mean is what lets a polished, unusable answer pass.',
        head: ['Dimension', 'What it asks', 'Task A', 'Task B'],
        rows: [
          [
            'Grounding',
            'Is every factual sentence traceable to the provided evidence?',
            'Both answers pass.',
            'Answer 1 passes, Answer 2 fails on the invented margins.',
          ],
          [
            'Task completion',
            'Could the user act correctly on this and get the outcome they came for?',
            'Answer 1 fails, Answer 2 passes.',
            'Answer 1 passes, Answer 2 fails.',
          ],
          [
            'Unsupported recommendation',
            'Does it advise an action the evidence does not support?',
            'Answer 1 fails.',
            'Answer 2 fails.',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Note what the third dimension catches that the first two do not. Answer 1 in Task A is fully grounded and still recommends an action the evidence cannot support. Grounding is about sentences; the recommendation is about the inference drawn from them, and a system can be perfect at the first while failing at the second.',
      },
      { type: 'h', text: 'How to run the comparison' },
      {
        type: 'p',
        text: 'The protocol matters as much as the rubric, because most of the ways this goes wrong are procedural:',
      },
      {
        type: 'list',
        items: [
          'Score blind. Reviewers should not know which system produced an answer, and neither should the judge — a model name in the context is a prior.',
          'Swap presentation order across items. Position effects are large enough to move a pairwise result on their own.',
          'Have humans score first, on the same rubric, before anyone sees the judge’s output. Reading the judge first anchors the human labels and destroys the comparison.',
          'Report per-dimension agreement, never a single blended agreement figure. A judge can track humans closely on grounding and barely at all on task completion, which is exactly the case where a mean is most misleading.',
          'Keep the disagreements. They are the output of this exercise, not the noise in it.',
        ],
      },
      { type: 'h', text: 'What the disagreements tell you' },
      {
        type: 'p',
        text: 'Disagreement is diagnostic, and the direction matters. Where the judge is more generous than humans, you are looking at the failure class the judge will let through — typically fluent answers that miss the task, which is precisely the release risk. Where the judge is harsher, you often find a rubric that is underspecified rather than a model that is wrong; two humans disagreeing on the same item is a signal to rewrite the rubric or drop the category, not to average them.',
      },
      {
        type: 'p',
        text: 'That triage is the useful product of a judge evaluation: a decision about which error types the judge is allowed to adjudicate alone, and which ones route to a person regardless of score. A judge that handles the high-volume, low-ambiguity cases and escalates the rest is worth having. A judge trusted uniformly because its overall agreement number looked good is a release gate with a hole in it.',
      },
      { type: 'h', text: 'The check' },
      {
        type: 'p',
        text: 'Before letting a judge score gate anything:',
      },
      {
        type: 'list',
        items: [
          'Can I name a failure the judge is known to miss, and say what happens to it instead?',
          'Was the human comparison collected blind, before the judge output was visible?',
          'Is agreement reported per dimension, with the model version, prompt, and adjudication rule recorded alongside it?',
          'If the judge and the humans disagree next quarter, do I know whether the model drifted or the rubric was always ambiguous?',
        ],
      },
      {
        type: 'p',
        text: 'The answer pairs above are self-authored teaching cases, and this article deliberately reports no judge scores: I have not run this comparison as a published study, and a number I have not computed would undercut the entire argument. What the exercise costs is an afternoon and two dozen carefully written items. What it buys is knowing which of your quality gates is actually load-bearing.',
      },
    ],
  },
  {
    slug: 'over-merging-and-over-splitting',
    title: 'Too Many Narratives: Measuring Over-Merging and Over-Splitting',
    topic: 'AI Evaluation',
    status: 'drafting',
    excerpt:
      'Two claims can mention the same company and still tell different stories. A small set of paired examples shows how to distinguish over-merging from over-splitting, write clearer annotation rules, and evaluate clusters without treating shared vocabulary as shared meaning.',
    relatedWork: 'narrative-intelligence',
  },
  {
    slug: 'llm-versus-deterministic-rule',
    title: 'When Should an LLM Replace a Deterministic Rule?',
    topic: 'AI Evaluation',
    status: 'drafting',
    excerpt:
      'A rule can be predictable and brittle; a model can be flexible and inconsistent. Using short claims with negation and stance changes, this piece sets out a comparison of rules, a model, and a hybrid — measuring errors, review effort, cost, and latency.',
    relatedWork: 'narrative-intelligence',
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
    relatedWork: 'narrative-intelligence',
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
    relatedWork: 'narrative-intelligence',
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
    relatedWork: 'narrative-intelligence',
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
    relatedWork: 'narrative-intelligence',
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
