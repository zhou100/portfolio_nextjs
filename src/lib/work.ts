export type WorkKind = 'industry-case' | 'independent-build' | 'research';
export type WorkStatus = 'proposed' | 'in-progress' | 'published' | 'archived';
export type EvidenceType =
  | 'reported-experience'
  | 'observational'
  | 'offline-benchmark'
  | 'randomized-experiment'
  | 'synthetic-demo';

/** What the reader is looking at, independent of how mature the underlying work is. */
export const KIND_LABEL: Record<WorkKind, string> = {
  'industry-case': 'Industry case',
  'independent-build': 'Independent build',
  research: 'Research',
};

export const EVIDENCE_LABEL: Record<EvidenceType, string> = {
  'reported-experience': 'Reported experience',
  observational: 'Observational',
  'offline-benchmark': 'Offline benchmark',
  'randomized-experiment': 'Randomized experiment',
  'synthetic-demo': 'Illustrative example',
};

/** What each evidence type does and does not license you to claim. */
export const EVIDENCE_MEANING: Record<EvidenceType, string> = {
  'reported-experience':
    'Described from work I did inside a company. The underlying data is not public and is not reproduced here.',
  observational:
    'Measured on data that was not randomized. Supports hypotheses, not causal claims.',
  'offline-benchmark':
    'Measured on a frozen held-out set. Says nothing about live product impact.',
  'randomized-experiment': 'Measured under a recorded random assignment.',
  'synthetic-demo':
    'Built on self-authored material to show the shape of a method. Not a result.',
};

export interface WorkLinks {
  caseStudy: string;
  demo?: string;
  code?: string;
  /** A file or page a reader can open and check without any private access. */
  artifact?: { href: string; label: string };
}

/** A real screenshot of a live product, captured from the public site. Never a mock-up. */
export interface Shot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Portrait captures (a phone view) are letterboxed instead of cropped. */
  fit?: 'contain';
}

/** Home-page product showcase. Only for builds a reader can open without private access. */
export interface Showcase {
  /** One sentence on what the product does for its user. */
  tagline: string;
  /** Who it is for, in a few words. Shown as "Target users" on the card. */
  audience: string;
  /** First shot is the large one. */
  shots: Shot[];
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'deflist'; items: { term: string; detail: string }[] }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'note'; text: string }
  | { type: 'template'; lines: { label: string; text: string }[] };

/**
 * Outcome shown on the home and /work ledgers. The case page itself is the essay
 * in `body`; it does not repeat this as a form.
 */
export interface WorkBrief {
  /** Short description for the page metadata. */
  problem: string;
  contribution: string;
  /** "What changed" where an outcome is confirmed; "Current result" where it is not. */
  outcomeLabel: string;
  outcome: string;
}

export interface WorkItem {
  slug: string;
  title: string;
  /** Repository or product name when it differs from the display title. */
  alias?: string;
  org?: string;
  /** Italic dek under the title. */
  question: string;
  kind: WorkKind;
  status: WorkStatus;
  featured: boolean;
  evidenceType: EvidenceType[];
  /**
   * One metadata line under the question: context, role, and evidence boundary.
   * Live and code links are appended from `links` when they exist.
   */
  meta: string;
  brief: WorkBrief;
  updatedAt: string;
  links?: WorkLinks;
  showcase?: Showcase;
  /**
   * The essay. Three or four paragraphs, with at most one table between them.
   * Paragraph text may use **bold**, *italic*, and `inline code`.
   */
  body: Block[];
}

const items: WorkItem[] = [
  {
    slug: 'recommendation-quality',
    title: 'Recommendation Quality Beyond Engagement',
    org: 'Instagram Reels',
    question: 'Creator-side engagement was rising. Was the viewing any better?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    evidenceType: ['reported-experience'],
    meta: 'Instagram Reels · Metric Design, Segment-Level Experiment Reads & Launch Governance · Reported experience (internal figures omitted)',
    brief: {
      problem:
        'The creator-side engagement goal was going up. That number also goes up when a feed just serves the reliable creator again, so it could not say whether viewers were getting better content.',
      contribution:
        'I traced part of a session decline to repetitive content, defined measures of what the viewing session was like, read every experiment by segment instead of pooled, and argued the measures belonged beside the primary goal.',
      outcomeLabel: 'What changed',
      outcome:
        'The viewer-side measures became launch-tracking and ranking-guardrail standards across Reels, and segment splits went into every launch read.',
    },
    updatedAt: '2026-11-12',
    links: { caseStudy: '/work/recommendation-quality' },
    body: [
      {
        type: 'p',
        text: 'In a short-form feed, a ranking experiment can look like a clean win while quietly degrading the product. The baseline launch read was the primary goal, pooled across viewers. When a candidate model leans harder on what already works — a reliable creator again, a format the viewer reacted to yesterday — creator-side engagement climbs and the scorecard calls it progress, even if the person scrolling spends more effort finding anything new. Sessions were softening at the same time, and once I traced part of that decline to viewers seeing too much repetitive content, the launch question changed: had a model learned to match viewers with better content, or had it cashed in on a narrower slice of supply?',
      },
      {
        type: 'p',
        text: 'To make that tradeoff visible before a model shipped, I built consumption-side counter-metrics around the failure modes the primary goal rewarded, matched the experimental unit to how the surface allocated content across sessions, and named the segment splits before results were read. **Repeat exposure** tracks how often a viewer meets near-duplicate or same-creator content within a session and across consecutive days; getting the deduplication key and the session boundary right decides whether the measure has enough power under repeated observations per viewer. **Viewing efficiency** is watch time relative to the scrolling effort it took to find something worth watching. Because a positive average dominated by heavy users can hide degradation for light viewers or emerging creators, every read was stratified across fixed viewer and creator tiers rather than pooled.',
      },
      {
        type: 'table',
        caption:
          'Illustrative launch-read structure; specific internal definitions, thresholds, and effect sizes are omitted.',
        head: ['Question the team has', 'What gets measured', 'Reported on', 'What the read triggers'],
        rows: [
          [
            'Did engagement rise because supply narrowed?',
            'Repeat exposure within and across sessions',
            'Heavy and light viewers separately',
            'A rise past the stated threshold holds the launch for review, even on a winning primary metric.',
          ],
          [
            'Is watching getting cheaper or more expensive?',
            'Watch time relative to search effort',
            'Same segments as the primary goal',
            'A primary win with a falling efficiency reading is escalated as a tradeoff, not announced as a win.',
          ],
          [
            'Who is the average hiding?',
            'The primary goal, computed per segment',
            'Segments fixed before the read',
            'Segment disagreement is reported in the launch note rather than filed as a follow-up analysis.',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Those measures became launch-tracking and ranking-guardrail standards across Reels, and the overexposure finding fed a goal realignment among the engineering, product and research leads. I ran launch reviews and half-year roadmap planning for three ranking teams on the same footing: A/B reviews, guardrail tradeoffs and incident investigations. The segment reads also reversed a judgment. A kind of similar-content recommendation that the pooled read treated as overexposure risk turned out, estimated by creator segment, to help creators grow, and it was reframed from a risk into a growth lever. Internal effect sizes stay internal, and the session gains that followed the realignment had several causes, so I do not attribute them to this work alone.',
      },
      {
        type: 'p',
        text: 'Repeat exposure and viewing efficiency remain behavioral proxies rather than direct measures of satisfaction — a viewer efficiently served mediocre content still had a mediocre session — which is why they worked as binding guardrails beside the primary goal rather than a replacement for it. The lesson I keep is that a metric earns its place on a launch review only by naming the action it triggers. A guardrail with no threshold and no consequence is just a chart, and a chart does not stop a launch.',
      },
    ],
  },
  {
    slug: 'offline-evaluation-online-risk',
    title: 'Offline Evaluation That Tracks Online Risk',
    org: 'Facebook AI',
    question: 'A classifier scores better offline. Will the launch catch more of the harm users actually see?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    evidenceType: ['reported-experience'],
    meta: 'Facebook AI · Evaluation Sampling, Metric Definition & Launch Standard · Reported experience (internal figures omitted)',
    brief: {
      problem:
        'Integrity classifiers were judged on labelled sets drawn from review queues. Those sets over-represent what earlier systems already flagged, so an offline gain did not say how much live harm a launch would catch.',
      contribution:
        'I designed an evaluation sample of production traffic with known inclusion weights, so ranking quality and prevalence-weighted error could be read for the population a launch would face.',
      outcomeLabel: 'What changed',
      outcome:
        'Four product and platform teams adopted it as their launch standard. Along the way I caught a partner-team data leak that had affected three model launches.',
    },
    updatedAt: '2026-11-12',
    links: { caseStudy: '/work/offline-evaluation-online-risk' },
    body: [
      {
        type: 'p',
        text: 'Integrity models — fake accounts, child safety, content similarity — are scored offline before they launch, and the usual evaluation set came from labels that already existed: items users reported or earlier models sent to human review. That baseline was convenient and biased in a specific direction. It was rich in the violations previous systems already found and thin in the ordinary traffic where a new model\'s false positives and missed cases actually live. An AUC gain on that set measured ranking within a population no launch would ever face, so a candidate could win offline while barely changing the risk users saw.',
      },
      {
        type: 'p',
        text: 'The fix started by naming the target quantity: harm reaching users on the live surface, and how a model at its launch threshold would change it. I drew the evaluation sample from production traffic, stratified by model score so the rare high-score region had enough labelled cases, and kept each stratum\'s inclusion probability so every labelled item carries a weight back to the population. That separates two questions a single number had blurred. AUC on the reweighted sample says how well the model ranks live traffic, but AUC does not move with prevalence, so it cannot say how much harm is caught. **Prevalence-weighted precision and recall at the launch threshold** carry that question, each with an interval that reflects the stratified design.',
      },
      {
        type: 'table',
        head: ['Question', 'Queue-sampled set (baseline)', 'Stratified production sample'],
        rows: [
          [
            'Who is in the evaluation set?',
            'Items already reported or sent to review',
            'Live traffic, sampled by model score with known weights',
          ],
          [
            'What does AUC describe?',
            'Ranking among items earlier systems surfaced',
            'Ranking across the traffic the launch will score',
          ],
          [
            'How much harm is caught at launch?',
            'Not answerable; the queue sets the prevalence',
            'Weighted precision and recall at the threshold, with intervals',
          ],
          [
            'What can it still miss?',
            'Everything outside the queue',
            'New abuse patterns not yet in the sampled traffic, and reviewer label error',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Four product and platform teams adopted the design as their launch standard, so a model shipped on what it would do to live prevalence rather than on a queue-set AUC. Along the way I caught a data leak in a partner team\'s pipeline that had affected three model launches, led the fix with that team and rebuilt the trust the miss had cost. The design has its own limits: review labels carry error, a representative sample ages as adversaries adapt, and an offline estimate of prevalence is still not an online measurement of harm prevented. What I carry into every evaluation since is to name the population and the quantity before choosing the metric, because a metric computed on a convenient sample answers a question nobody asked.',
      },
    ],
  },
  {
    slug: 'enterprise-ai-evaluation',
    title: 'GenAI Evaluation and Launch Gates',
    org: 'Omnicom',
    question: 'An assistant can sound right and still fail the task. What catches that before release?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    evidenceType: ['reported-experience'],
    meta: 'Omnicom · GenAI Product Measurement, Evaluation Design & Launch Gate · Reported experience (internal data omitted; failure trace reconstructed)',
    brief: {
      problem:
        'Answer-quality review kept passing systems that still could not finish the task. Reviewers were grading prose, one answer at a time; the product had to deliver a decision, and there were too few client accounts for an A/B test to settle it.',
      contribution:
        'I defined the success metrics for agent workflows, split evaluation into four layers with their own denominators, built the pipeline and test set behind them, and set the launch gate.',
      outcomeLabel: 'What changed',
      outcome:
        'Eval-gated launches became the decision standard. A frozen test set and a threshold written down before the run decided what shipped, not how the demo went.',
    },
    updatedAt: '2026-11-12',
    links: { caseStudy: '/work/enterprise-ai-evaluation' },
    body: [
      {
        type: 'p',
        text: 'The gap showed up whenever a promising prototype met a real multi-step workflow. The baseline release process was a demo and spot checks: individual answers looked fluent, well-toned and properly cited, yet users still could not make the budget or campaign decision they came for. Grading one response at a time rewarded plausible prose and missed broken task logic, and a single blended quality score gave engineers nowhere to act — an agent that failed to retrieve the right table and one that retrieved it but misread a column header got the same low score, though one is an indexing bug and the other a reasoning failure. A/B testing could not settle it either. The product served a small number of high-revenue enterprise client teams, too few to power a randomized comparison and too different from one another to pool, so offline evaluation had to carry the launch decision.',
      },
      {
        type: 'p',
        text: 'I defined what success meant for an agent workflow — factual accuracy, tool-use success, answer quality and task completion — and split evaluation into four layers, each with its own denominator: retrieval per question, tool accuracy per call, unsupported claims per factual sentence, and task success per workflow. Keeping them apart matters because a prompt change can halve unsupported claims while cutting task completion through over-refusal, and a blended accuracy number hides exactly the tradeoff a release turns on. I built the pipeline that runs these checks on every candidate and set the launch-blocking thresholds with product and engineering.',
      },
      {
        type: 'table',
        head: ['Layer', 'What it asks', 'What a good score does not prove'],
        rows: [
          ['Retrieval', 'Did the right source reach the model at all?', 'That the model then used it.'],
          [
            'Tool use',
            'Was the right tool called with the right arguments?',
            'That the returned value was interpreted correctly.',
          ],
          [
            'Unsupported claims',
            'Is every factual sentence traceable to retrieved evidence?',
            'That the supported sentences answer the question.',
          ],
          [
            'End-to-end success',
            'Could the user finish the task without repair?',
            'That it generalizes past the test set.',
          ],
        ],
      },
      {
        type: 'p',
        text: 'The gate had to be trustworthy itself. I stratified the test set by task family so no single client dominated the score, wrote rubrics where unresolved annotator disagreement forced a rewrite of the category rather than an average, and locked a held-out slice so iteration happened only on the development set. A model judge gated nothing until it had been calibrated against blind human labels, because a judge that shares the generator\'s blind spots will certify them. Locating failures by layer then changed how the team debugged. In one representative pattern — deciding which of three campaigns should absorb the next increment of budget — retrieval found the right performance summary and the spend tool queried the right dates, yet the assistant recommended the wrong campaign in fluent, cited prose. The chunk boundary had split a campaign label from the numbers beneath it, so a correctly retrieved document supported a confident sentence about an adjacent period. Keeping labels bound to their tables and requiring each cited span to contain the named entity fixed what prompt tuning never would have.',
      },
      {
        type: 'p',
        text: 'Eval-gated launches became the decision standard across product and engineering. Claim-level verification and source-grounded regression tests brought unsupported claims down on the priority set, and tracing answer-quality failures back to retrieval drove a redesign of retrieval and long-term memory. On the product side, funnel analysis of the highest-value marketing workflows showed where users stopped before reaching a tool, which shaped the agent-to-tool contracts that downstream teams then adopted. The internal figures stay internal. The limit is the one the design was built around: a passing offline score is evidence about the test set, not a measured effect on client decisions, and a frozen set ages unless it keeps absorbing new failure modes from production.',
      },
    ],
  },
  {
    slug: 'el-nino-commodities',
    title: 'El Niño and Commodity Futures',
    question:
      'Does a strong El Niño tell a futures trader anything the market has not priced? And how would you test that with twelve events?',
    kind: 'independent-build',
    status: 'published',
    featured: false,
    evidenceType: ['observational'],
    meta: 'Independent Build · Event Study, Point-in-Time Pipeline & Public Workbench · Observational',
    brief: {
      problem:
        'A record El Niño is forming. The popular story says it lifts palm and soybean oil prices. There are twelve comparable events since 1963, and three of those overlap usable US futures data.',
      contribution:
        'I split the story into three testable links, wrote each test down before running it, and built a weekly pipeline that only sees data published before each decision date.',
      outcomeLabel: 'Current result',
      outcome:
        'Palm oil prices tend to rise after the peak. Rainfall does not improve output forecasts, and the effect does not carry to US soybean oil futures. The current call is watch, not trade.',
    },
    updatedAt: '2026-10-28',
    links: {
      caseStudy: '/work/el-nino-commodities',
      artifact: {
        href: 'https://elnino.yujun.net/',
        label: 'Open the research workbench',
      },
    },
    showcase: {
      tagline:
        'Follows one El Niño from ocean heat to palm oil prices, with every test written down before it ran.',
      audience: 'Commodity traders and researchers',
      shots: [
        {
          src: '/work/el-nino-commodities/overview.webp',
          alt: 'Workbench overview: the four-step evidence chain from climate to prices, above the event-year futures results.',
          caption: 'Overview: the evidence chain and the headline tests',
          width: 1440,
          height: 900,
        },
        {
          src: '/work/el-nino-commodities/evidence-chain.webp',
          alt: 'Stacked monthly charts of spot price, ONI sea temperature, regional SPI6 rainfall, palm oil output and stocks for 2025–26.',
          caption: 'One timeline: price, climate, rainfall, supply, stocks',
          width: 1440,
          height: 900,
        },
        {
          src: '/work/el-nino-commodities/palm-map.webp',
          alt: 'Map of Malaysia shaded by mapped oil palm area per grid cell across the Peninsula, Sabah and Sarawak.',
          caption: 'Where the oil palm actually grows',
          width: 1440,
          height: 900,
        },
      ],
    },
    body: [
      {
        type: 'p',
        text: 'When a strong El Niño forms, the popular market story says it reliably lifts palm and soybean oil prices. Turning that story into a testable claim exposes two immediate traps. First, the causal chain has four separate links — warm Pacific water, drought over Southeast Asian growing regions, lower palm oil output months later, and price transmission to the US soybean oil futures a trader can actually access — any of which can fail on its own. Second, only twelve moderate-or-stronger El Niño episodes have occurred since 1963, and just three overlap usable US futures history. A method that turns twelve climate events into hundreds of observations by pooling commodities or months is simply manufacturing confidence.',
      },
      {
        type: 'p',
        text: 'I built an end-to-end research pipeline and weekly monitoring workbench where the rules matter more than the models. The narrative is split into three separate hypotheses — rainfall predicting palm output, spot and futures prices rising after an event, and climate signals improving US soybean oil forecasts — with lags, thresholds, and feature sets committed to code before pulling results. Every ingested series (NOAA ENSO indices, CHIRPS regional rainfall, MPOB output, World Bank spot prices, USDA/EIA balances, and exchange futures) is stored in an append-only archive with its publication timestamp and file hash. While the historical event study anchors on after-the-fact ONI peaks to test whether the physical relationship exists at all, no trading rule is permitted to see a peak date that was only known in hindsight; models see only data released before each decision date, evaluated by holding out whole El Niño episodes at a time. That release-lag rule is not a first-release replay: most historical inputs are today’s revised values, and where a source never published its release history a conservative schedule is assumed and labelled. Only the weekly forward log, archived as it runs, records what was known at the time.',
      },
      {
        type: 'table',
        head: ['Link', 'Test', 'Result', 'Verdict'],
        rows: [
          [
            'Palm oil price after the peak',
            'Monthly spot prices, 12 events, excess over a metals index, 6–12 months after the peak',
            '+16.7 log points on average; positive in 9 of 12 events',
            'Supported, on spot prices anchored to the after-the-fact peak',
          ],
          [
            'The same trade on futures',
            'Chinese palm oil futures, long February to the following January, one pre-registered run',
            '+28.3% average in event years against −3.5% in other years; 4 of 4 event years positive',
            'Supported, weakly: four events, not blind',
          ],
          [
            'Rainfall → output forecast',
            'Add region rainfall to a seasonal baseline forecast of national output',
            'Beat the baseline at 0 of 4 horizons, and 0 of 3 in a revised design',
            'Not supported',
          ],
          [
            'Climate signal → US soybean oil futures',
            'Add ENSO or drought to a fixed futures model, holding out whole events',
            'No improvement, on three futures events',
            'Not supported',
          ],
          [
            'Event-year long on US soybean oil',
            'The same February-to-January design, one pre-registered run',
            '+0.5% average in event years, 2 of 3 positive; dropping one event flips the sign',
            'Uncertain',
          ],
        ],
        caption:
          'Figures as reported by each pre-registered test. Futures results are net of a 3 bps cost per trade.',
      },
      {
        type: 'p',
        text: '**Quality here means reproducible tests, inputs available by the decision date, and predictive value beyond a fixed baseline on held-out events.** A positive historical return alone does not meet that standard. The evidence says something much narrower than the market lore. Palm oil spot prices rose in nine of twelve events (+16.7 log points on average over a metals benchmark), and Chinese palm oil futures rose in all four overlapping events, though that futures run was not blind and excess returns halve against a broad metals index. Meanwhile, adding regional rainfall failed to beat a seasonal output baseline at every horizon, and the price effect did not carry over to US soybean oil futures. Once the 2010–2025 history had been tested, I froze the specification — no new models, no threshold searches — leaving the 2026–27 episode as a single forward out-of-sample observation. Because the Pacific index is currently elevated while the three Malaysian growing regions are not simultaneously in drought, the Tuesday automated report outputs *"watch, do not trade"* — which is what an honest system should say most of the time.',
      },
    ],
  },
  {
    slug: 'creative-evidence-lab',
    title: 'Creative Evidence Lab',
    question: 'Can a creative attribute be tied to performance well enough to justify a test?',
    kind: 'independent-build',
    status: 'proposed',
    featured: false,
    evidenceType: [],
    meta: 'Independent Study Design · Multimodal Tagging, Out-of-Sample Prediction & Clustered RCT Protocol',
    brief: {
      problem:
        'Creative tools slide between three claims: this tag is accurate, it predicts performance, and changing what it describes improves the outcome.',
      contribution:
        'I designed the study that keeps them apart: an annotation protocol, a predictive evaluation with a fair baseline, and an experiment that changes one attribute.',
      outcomeLabel: 'Current result',
      outcome:
        'None yet. This is a design with stop conditions, published so the reasoning can be argued with before anything is built.',
    },
    updatedAt: '2026-10-26',
    links: { caseStudy: '/work/creative-evidence-lab' },
    body: [
      {
        type: 'p',
        text: 'Creative analytics tools routinely slide between three distinct claims: that an attribute tag is accurate, that it predicts ad performance, and that changing what it describes causes a lift. When a creative strategist asks what to change in the next batch of 15-to-30-second video ads, a blended "creative score" is useless; the decision requires a single hypothesis attached to its level of evidence and the test that would falsify it. I wrote this pre-registered three-layer study design and five-table data contract (`creative_assets`, `creative_tags`, `delivery_outcomes`, `experiment_assignments`, and `experiment_outcomes`) to enforce those boundaries before any assets are collected or models trained.',
      },
      {
        type: 'p',
        text: 'Each layer carries a stricter burden of proof and an explicit stop condition. **Layer 1 (Label quality)** tests whether two human annotators can apply an observable taxonomy — eight to twelve core tags organized around Attention, Branding, Connection, Direction, and Context, keeping visual logos separate from spoken mentions and "absent" separate from "not detected" — across a stratified sample of 150 to 250 video assets. If humans cannot agree on a tag, model consensus is just measuring annotation noise and the tag is cut; only after human reliability holds do we benchmark OCR/ASR rules against vision-language models on a holdout isolated by creative family. **Layer 2 (Predictive value)** opens only when delivery logs are aligned to assets, testing whether adding tags (Model 2) beats both the advertiser\'s grouped historical rate (Baseline 0) and pre-delivery context alone (Baseline 1) on an out-of-time, family-isolated split, while auditing for campaign names that secretly leak the outcome. **Layer 3 (Incremental impact)** requires a recorded random assignment between two versions of an ad differing only in the tested attribute — because simply running two ads simultaneously lets platform pacing shift budget toward early winners, and conditioning on clicks biases the treatment effect, the estimand is strictly intent-to-treat (ITT) conversion per assigned cluster.',
      },
      {
        type: 'table',
        head: ['Stage', 'Condition to continue', 'If it fails'],
        rows: [
          [
            'Taxonomy',
            'Humans define and identify the core tags consistently.',
            'Cut or rewrite the tags. Model consensus is not a substitute for reliability.',
          ],
          [
            'Tagging',
            'Agreed accuracy and review cost met on the frozen holdout.',
            'Keep a human or hybrid loop instead of chasing full automation.',
          ],
          [
            'Prediction',
            'Aligned outcomes, a fair baseline, and out-of-sample gain.',
            'Publish the negative result. Do not add performance-prediction language to it.',
          ],
          [
            'Improvement',
            'An identifiable experiment runs and supports the change.',
            'Ship testable hypotheses and claim no uplift.',
          ],
        ],
      },
      {
        type: 'p',
        text: 'Because public ad libraries do not ship CTR, CVR, or ROAS alongside creative files — and stitching public videos to unrelated click logs creates a meaningless join key — the execution path is fixed in advance by data availability. With licensed assets and aligned delivery logs, the full three-layer protocol runs; with assets alone, it narrows to the Layer 1 tagging and annotation-efficiency benchmark; with neither, it stays published as a falsifiable protocol rather than stalling on a data cold start.',
      },
    ],
  },
  {
    slug: 'churchmap',
    title: 'ChurchMap',
    question: 'What does a first-time visitor need to know, and where does missing data break that?',
    kind: 'independent-build',
    status: 'published',
    featured: false,
    evidenceType: ['observational'],
    meta: 'Independent Build · Postgres/pgvector Geolocation Search & Lazy Enrichment · Observational',
    brief: {
      problem:
        'A directory with a hundred thousand rows still fails a first-time visitor if the fields the visit depends on are missing, and a pipeline that logs no errors can still be stalled.',
      contribution:
        'I built it end to end: geolocation search over Postgres and pgvector, profiles extracted from each church’s own website, and coverage and freshness measures that a silent failure cannot pass.',
      outcomeLabel: 'Current result',
      outcome:
        'On 13 November 2026, 6.7% of 134,377 listings linked a website and 74% of those had been read successfully. Website availability, not extraction, limits coverage; field accuracy is not measured yet.',
    },
    updatedAt: '2026-11-12',
    links: {
      caseStudy: '/work/churchmap',
      demo: 'https://churchmap.vercel.app/',
      code: 'https://github.com/zhou100/church_map',
    },
    showcase: {
      tagline:
        'Search a city and see what each church says about itself, summarised from its own website, before a first Sunday visit.',
      audience: 'First-time church visitors',
      shots: [
        {
          src: '/work/churchmap/search-map.webp',
          alt: 'ChurchMap search for Brooklyn, NY: a list of churches with tags from their websites beside a map of pins.',
          caption: 'Location-first search over the directory',
          width: 1440,
          height: 900,
        },
        {
          src: '/work/churchmap/landing.webp',
          alt: 'ChurchMap home page headline, “Know what a Sunday is actually like — before you walk in,” with a city search box.',
          caption: 'Landing page and city search',
          width: 1440,
          height: 900,
        },
        {
          src: '/work/churchmap/church-profile.webp',
          alt: 'A church profile page with a street map, contact links, and a summary drawn from the church’s own website.',
          caption: 'A profile built from the church’s own website',
          width: 1440,
          height: 900,
        },
      ],
    },
    body: [
      {
        type: 'p',
        text: 'It is easy to build a directory with a hundred thousand rows that still fails a first-time visitor on Sunday morning. ChurchMap is a map-first search over Supabase Postgres and `pgvector`, and each church\'s profile is extracted by a language model from the church\'s own website. The first measure of progress was the one a directory invites, row count, and the first health check was the one a pipeline invites, zero logged errors. Both looked fine while the product was failing. In July 2026 the crawl was automatically disabled for eight days and nothing said so, because a stage that never starts never writes an error.',
      },
      {
        type: 'p',
        text: 'I rebuilt the measurement around what a visit needs. Freshness now keys on the last time each stage moved at least one row, so silence reads as stale rather than healthy. Every extraction attempt ends in a named outcome, and only a successful one counts as coverage, because failed attempts are stamped as extracted too. Each profile records the prompt version and model that produced it, so a prompt change shows up as a stale share instead of a silent mix, and the public counts include only churches a visitor can actually find.',
      },
      {
        type: 'table',
        head: ['Measure', 'Count', 'Share', 'Of'],
        rows: [
          ['Listings', '134,377', '—', '—'],
          ['With a website on file', '9,032', '6.7%', 'All listings'],
          ['Website read successfully', '6,714', '74.3%', 'Listings with a website'],
          ['Attempts without a successful extraction', '198', '2.9%', 'All 6,912 attempts'],
          ['Extracted under an older prompt version', '195', '2.8%', 'All 6,912 attempts'],
        ],
        caption:
          'System-reported counts from the public /api/stats endpoint, generated 13 November 2026 at 05:35 UTC, including listings hidden from search; not independently audited. The success share uses successful attempts, not the endpoint’s extracted share, which also counts failures.',
      },
      {
        type: 'p',
        text: '**Quality here means a first-time visitor can plan a visit from complete, accurate, current information**, and the counts show where that breaks. Extraction is not the bottleneck: three in four churches with a website have been read successfully, and fewer than 3% of attempts fail. The constraint is upstream. Only 6.7% of listings link a website at all, so a profile drawn from the church\'s own site cannot reach most of the directory without another source. What these counts do not show is accuracy. No hand-labelled sample yet compares extracted service times, addresses and activity status with the source, and the share of listings with all four fields a visit depends on — service times, location, whether the church is active, and directions — is defined but not yet computed. That four-field share for one city, audited against a sample of sources, is the next measurement.',
      },
    ],
  },
  {
    slug: 'narrative-atlas',
    title: 'Narrative Edge',
    question:
      'How can changes in market narratives become stock recommendations whose subsequent performance can be reviewed?',
    kind: 'independent-build',
    status: 'in-progress',
    featured: false,
    evidenceType: ['observational'],
    meta: 'Independent Build · Narrative Signals, Stock Recommendations & Performance Review · Observational',
    brief: {
      problem:
        'Changes in market narratives can suggest stocks to investigate. The challenge is turning those changes into consistent recommendations and reviewing their subsequent performance without confusing hindsight with a live track record.',
      contribution:
        'I built the research pipeline and rule-based recommendation board: extract dated analyst views, track narrative changes, select stocks, and review their performance against QQQ.',
      outcomeLabel: 'Current result',
      outcome:
        'The public board shows new long and short signals, continuation and watch lists, and retrospective performance against QQQ. The research-date simulation stays separate from the recorded issuance ledger; it does not establish live investment performance. With research through 6 November 2026 the recorded ledger had two closures, both behind QQQ, against a bar of 30 per list.',
    },
    updatedAt: '2026-11-05',
    links: {
      caseStudy: '/work/narrative-atlas',
      demo: 'https://stock.yujun.net/',
    },
    showcase: {
      tagline:
        'Stock recommendations from changing market narratives, with retrospective performance review against QQQ.',
      audience: 'Investors researching narrative-driven stock ideas',
      shots: [
        {
          src: '/work/narrative-atlas/recommendations.png',
          alt: 'Narrative Edge recommendation board: retrospective research-date simulation, new long and short signals, position status, and performance against QQQ.',
          caption: 'Narrative-driven stock ideas and retrospective performance, captured November 5, 2026',
          width: 1440,
          height: 900,
        },
      ],
    },
    body: [
      {
        type: 'p',
        text: 'Narrative Edge recommends stocks from changes in market narratives and lets readers review how those ideas performed against QQQ. I built the pipeline from analyst research notes to the public board: a language model extracts dated bullish and bearish views, then fixed rules select new long or short signals when consensus reverses, continuation ideas supported by bullish narratives, and a separate watch list of stocks whose prices have lagged. Each row connects the idea to its research date, position status, supporting view and subsequent price path.',
      },
      {
        type: 'p',
        text: 'The default board is a **retrospective research-date simulation**, with entry and exit dates, closed positions and returns relative to QQQ. It reviews selected recorded signals, not every historical opportunity or a strategy known at the time. Where publication timestamps are unverified, source-session dates are explicit assumptions. The recorded issuance ledger remains separate, and simulated results do not count toward live validation. That ledger enters at the first final close after both the report date and the day the rules ran, writes each close once, and is the only record that counts: the rules stay in validation until new signals and continuation each have 30 closed recorded positions. With research through 6 November 2026 it had two, one continuation and one watch position, both behind QQQ, and no closed new signals, which is no evidence either way.',
      },
      {
        type: 'p',
        text: 'Building the clustering and lifecycle engine exposed three failure modes that naive rules miss. First, shared baskets are not shared theses: *AI data-center power and cooling* shares 33 tickers with *AI infrastructure capex*, so my initial duplicate audit — which flagged pairs on either label or ticker overlap — fired exclusively on ticker overlap across the July registry while missing six true duplicates with identical raw labels. Second, publication gaps create false cooling: if a source takes a week off, a naive state machine downgrades every narrative, so the stage engine now uses hysteresis and ages silence without letting a gap flip a narrative into cooling or dormant on its own. Third, hindsight biases price windows: stock pages (such as NVDA\'s January–September 2026 GPU demand episode, +22.9% vs. +45.6% for the semiconductor ETF) anchor strictly on source publication dates and explicitly flag when historical detection timestamps were not recorded in real time.',
      },
      {
        type: 'table',
        head: ['Layer', 'Status', 'What must not be conflated'],
        rows: [
          [
            'Duplicate audit',
            '18 hand-labelled pairs, 15 scored and 3 marked ambiguous. Precision and recall 1.00, against 0.20 and 0.14 for the old rule.',
            'A perfect score on a fixture I labelled is a regression test, not a claim that the rules generalize.',
          ],
          [
            'Stage and stance contracts',
            'A frozen set of cases checked against seven written contracts, among them unchanged input, publication gaps, real flips, conflicting claims and repeated commentary. Labels proposed with an AI assistant, not independently adjudicated.',
            'Passing a contract shows a rule is applied, not that the stance was read correctly.',
          ],
          [
            'Extraction fidelity',
            'Not measured.',
            'A fluent summary is not a faithful extraction.',
          ],
          [
            'Price alignment',
            'Descriptive only.',
            'Price is an outcome, not a label for extraction quality.',
          ],
        ],
      },
      {
        type: 'p',
        text: '**Quality here means claims faithfully reflect their sources, distinct theses stay distinct, and narrative changes follow dated evidence.** Around a thousand automated tests enforce stage and stance contracts across every change, and the redesigned duplicate audit now reaches 1.00 precision and recall on the 15-pair scored fixture (up from 0.20 and 0.14). Even so, a perfect score on a small fixture I labelled while building the classifier is a regression test, not proof of generalization, and extraction fidelity against the raw newsletter text has not yet been double-annotated. The immediate next step is scoring a sample of extracted claims with a second human annotator — with a hard stop rule that if two people cannot agree on stance for most sampled claims, the stance schema gets rewritten before any model is tuned against it.',
      },
    ],
  },
  {
    slug: 'debrief',
    title: 'Debrief',
    alias: 'Published from the repository brief-voice-memo',
    question: 'What has to happen between a first voice memo and a user who saves the result and comes back?',
    kind: 'independent-build',
    status: 'published',
    featured: false,
    evidenceType: ['observational'],
    meta: 'Independent Build · Voice Pipeline, Open-Loop Tracking & Funnel Framing · Observational',
    brief: {
      problem:
        'A voice app can produce a summary quickly and still not produce anything a user trusts enough to keep. The interesting step is the one between those two.',
      contribution:
        'I built the product end to end — capture, transcription, classification, daily and weekly reviews, open-loop tracking — and defined what to measure first.',
      outcomeLabel: 'Current result',
      outcome:
        'Live, with early users beyond me. The next step is understanding where first-time users find value, where extraction needs correction, and what brings them back.',
    },
    updatedAt: '2026-10-28',
    links: {
      caseStudy: '/work/debrief',
      demo: 'https://time.yujun.net/',
      code: 'https://github.com/zhou100/brief-voice-memo',
    },
    showcase: {
      tagline:
        'Turn a 30-second spoken note into structured tasks and open-loop reviews — built with an anonymous trial to measure what makes an AI summary trustworthy enough to save.',
      audience: 'People who review their day by voice',
      shots: [
        {
          src: '/work/debrief/home.webp',
          alt: 'Debrief home page: a large record button, example prompts, and an example debrief with summary, key points, and todos.',
          caption: 'Tap to speak, no sign-in required',
          width: 1440,
          height: 900,
        },
        {
          src: '/work/debrief/mobile.webp',
          alt: 'Debrief on a phone-width screen, with the record button and suggested things to say.',
          caption: 'Built for a phone first',
          width: 390,
          height: 844,
          fit: 'contain',
        },
        {
          src: '/work/debrief/example-debrief.webp',
          alt: 'An example debrief card titled “Wednesday afternoon debrief” with a one-line summary and key points.',
          caption: 'What a 28-second entry turns into',
          width: 632,
          height: 400,
        },
      ],
    },
    body: [
      {
        type: 'p',
        text: 'A voice app can transcribe and summarize a spoken note in seconds and still produce nothing a user trusts enough to keep. I built Debrief end to end — voice capture, transcription, classification, daily and weekly reviews, and open-loop task tracking — with an anonymous, no-signup trial so anyone can talk through their day for thirty seconds and immediately see a structured output.',
      },
      {
        type: 'p',
        text: '**Quality here means a user gets a timely summary that preserves what they said and extracts tasks without inventing or omitting them.** Letting users reach the first result without an account makes initial friction easy to observe, and my own daily use keeps the interface honest, but personal dogfooding is a design signal rather than retention evidence. Shipping the voice pipeline came first; instrumenting the funnel comes next. Rather than publish vanity usage counts, the measurement design focuses on three numbers that actually diagnose product quality: **time to value** (latency from recording to a readable summary), **extraction error rate** (separating ASR transcription mistakes from LLM task-extraction hallucinations on a hand-labelled recording set, since the two require completely different fixes), and **anonymous-to-saved conversion** — whether a first-time user chooses to claim an account and keep the result. Conversion is a signal of perceived value, not a direct measure of extraction accuracy. These are planned measurements; this case does not yet report measured latency, extraction accuracy, conversion, or retention.',
      },
    ],
  },
  {
    slug: 'analytics-skeptic',
    title: 'Analytics Skeptic',
    question:
      'Can an AI reviewer find the metric problem that would change a launch decision, instead of just sounding reasonable?',
    kind: 'independent-build',
    status: 'proposed',
    featured: false,
    evidenceType: [],
    meta: 'Independent Study Design · Failure-Mode Prompt, Five-User Trial & Blind Benchmark Protocol',
    brief: {
      problem:
        'An AI reviewer that sounds reasonable is easy. One that catches the specific issue that would change a launch decision is the only version worth having.',
      contribution:
        'I wrote the prompt and the war stories behind it, and designed the blind evaluation that would separate useful criticism from confident noise.',
      outcomeLabel: 'Current result',
      outcome: 'A prompt, not a product. The honest next step is five real users, not a bigger architecture.',
    },
    updatedAt: '2026-10-26',
    links: {
      caseStudy: '/work/analytics-skeptic',
      code: 'https://github.com/zhou100/analytics_skeptic',
    },
    body: [
      {
        type: 'p',
        text: 'Building an AI reviewer that sounds thoughtful on an experiment write-up is easy; building one that catches the specific flaw that should reverse a launch decision is the only version worth having. Right now, Analytics Skeptic is a deliberate prompt grounded in real analytical war stories — wrong overall evaluation criteria (OEC), drifting denominators, selection bias, guardrail conflicts, and underpowered slices — rather than an over-engineered agent platform.',
      },
      {
        type: 'p',
        text: 'Before building any evaluation infrastructure, the immediate gate is a five-user trial with practicing data scientists to see whether they actually reuse it on live docs. Only if it clears that bar does the formal benchmark run: thirty to fifty publishable cases split by scenario family so variants of the same flaw cannot leak between tuning and test, comparing three arms — a fixed human checklist, a generic LLM prompt, and the skeptic prompt. To prevent self-grading bias, scoring is blind and adjudicated by someone other than the gold-standard author, bootstrapping across cases on recall of the decision-changing flaw, rate of unfounded criticism, and actionability — because *"users found it insightful"* is a separate record from whether the critique was right, and cannot substitute for it.',
      },
    ],
  },
];

export function getWork(): WorkItem[] {
  return items;
}

export function getFeaturedWork(): WorkItem[] {
  return items.filter((item) => item.featured);
}

/** Builds a reader can open and try, in home-page order. */
export function getShowcaseWork(): WorkItem[] {
  const order = ['narrative-atlas', 'churchmap', 'el-nino-commodities', 'debrief'];
  return order
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is WorkItem => !!item?.showcase);
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return items.find((item) => item.slug === slug);
}

export function getWorkSlugs(): string[] {
  return items.map((item) => item.slug);
}
