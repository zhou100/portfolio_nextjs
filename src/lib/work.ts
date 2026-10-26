export type WorkKind = 'industry-case' | 'independent-build' | 'research';
export type WorkStatus = 'proposed' | 'in-progress' | 'published' | 'archived';
export type EvidenceType =
  | 'reported-experience'
  | 'observational'
  | 'offline-benchmark'
  | 'randomized-experiment'
  | 'synthetic-demo';

export const STATUS_LABEL: Record<WorkStatus, string> = {
  proposed: 'Study design',
  'in-progress': 'Working prototype',
  published: 'Case study',
  archived: 'Archived',
};

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
    meta: 'Instagram Reels · Measurement, Experiment Design & Launch Gate · Reported experience (internal figures omitted)',
    brief: {
      problem:
        'The creator-side engagement goal was going up. That number also goes up when a feed just serves the reliable creator again, so it could not say whether viewers were getting better content.',
      contribution:
        'I defined measures of what the viewing session was like, cut them by segment instead of pooling them, and argued they belonged beside the primary goal.',
      outcomeLabel: 'What changed',
      outcome:
        'The creator metric stopped being read on its own. The viewer-side measures and the segment splits went into the launch read.',
    },
    updatedAt: '2026-10-26',
    links: { caseStudy: '/work/recommendation-quality' },
    body: [
      {
        type: 'p',
        text: 'In a short-form feed, a ranking experiment can look like a clean win while quietly degrading the product. When a candidate model leans harder on what already works — showing a reliable creator again or recycling a format the viewer reacted to yesterday — creator-side engagement climbs. On an aggregate scorecard, that reads as progress even if the person scrolling spent more effort finding anything new. Whenever an experiment moved our primary goal, the real question at launch review was never whether the metric moved; it was whether the model had learned to match viewers with better content, or simply cashed in on a narrower slice of supply.',
      },
      {
        type: 'p',
        text: 'To make that tradeoff visible before a model shipped, I built consumption-side counter-metrics around the failure modes the primary goal rewarded, matched the experimental unit to how the surface allocated content across sessions, and named the segment splits before results were read. The first measure tracked **repeat exposure** — how often a viewer encountered near-duplicate or same-creator content within a session and across consecutive days, where getting the deduplication key and session boundary right determines whether the signal has enough statistical power under repeated observations per viewer. The second measured **viewing efficiency** — watch time relative to the scrolling effort required to find something worth watching. Because a positive population average dominated by heavy users can easily hide degradation for light viewers or emerging creators, every read was stratified across fixed viewer and creator tiers rather than pooled.',
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
        text: 'Putting those measures and segment splits into the standard launch read changed how the team argued about shipping. A metric only earns its place on a launch review by naming the action it triggers; a guardrail with no threshold and no consequence is just a chart, and a chart does not stop a launch. Even so, repeat exposure and viewing efficiency remain behavioral proxies rather than direct measures of satisfaction — a viewer efficiently served mediocre content still had a mediocre session — which is why they functioned as binding guardrails alongside the primary goal rather than a replacement for it.',
      },
    ],
  },
  {
    slug: 'enterprise-ai-evaluation',
    title: 'AI Agents Orchestration and Evaluation',
    org: 'Omnicom',
    question: 'An assistant can sound right and still fail the task. What catches that before release?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    evidenceType: ['reported-experience'],
    meta: 'Omnicom · Evaluation Design, Test Set & Release Gate · Reported experience (internal data omitted; failure trace reconstructed)',
    brief: {
      problem:
        'Answer-quality review kept passing systems that still could not finish the task. Reviewers were grading prose, one answer at a time; the product had to deliver a decision.',
      contribution:
        'I defined four layers (retrieval, tool use, unsupported claims, end-to-end success), built the test set and rubric behind them, and set the release gate.',
      outcomeLabel: 'What changed',
      outcome:
        'Release stopped riding on how the demo went. It rode on a frozen test set and a threshold written down before the run.',
    },
    updatedAt: '2026-10-26',
    links: { caseStudy: '/work/enterprise-ai-evaluation' },
    body: [
      {
        type: 'p',
        text: 'The gap showed up whenever a promising prototype met a real multi-step workflow. In spot checks, individual answers looked fluent, well-toned, and properly cited — yet users still could not make the budget or campaign decision they came for. Grading one response at a time rewarded plausible prose while missing broken task logic. Worse, a single blended quality score gave engineers nowhere to act: an agent that failed to retrieve the right table and an agent that retrieved the table but misread its column header received the same low score, even though one is an indexing bug and the other is a reasoning failure. Without separating the layers, every release argument collapsed into "the model isn\'t smart enough yet."',
      },
      {
        type: 'p',
        text: 'To replace demo-driven shipping with a real release gate, I split evaluation into four layers — retrieval, tool use, unsupported claims, and end-to-end task completion — each with its own denominator. Unsupported claims are counted per factual sentence, tool accuracy per call, and task success per workflow, because a prompt change can cut hallucinations in half while tanking task completion through over-refusal. Blending them into a single accuracy number hides the exact tradeoff a release decision turns on.',
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
        text: 'Locating failures by layer immediately changed how the team debugged. In one representative pattern — deciding which of three campaigns should absorb the next increment of budget — retrieval pulled the right performance summary and the spend tool queried the exact date range, yet the assistant recommended the wrong campaign in fluent, cited prose. Tracing the layers showed this was not a model-capability failure at all: the chunk boundary had split a campaign label from the numbers beneath it, so a correctly retrieved document supported a confident sentence about an adjacent period. Keeping labels bound to their tables and requiring cited spans to contain the named entity fixed a bug that prompt tuning never would have touched.',
      },
      {
        type: 'p',
        text: 'Keeping the gate itself trustworthy required the same discipline. I stratified the test set by task family so no single client dominated the score, wrote boundary-tested rubrics where unresolved annotator disagreements forced a rewrite of the category rather than an average, and locked a held-out slice so iteration happened only on the development set. Any LLM judge had to be calibrated against blind human labels before gating a run, because a judge sharing the generator\'s blind spots will consistently certify them. Every candidate configuration was quoted alongside its latency and spend, and thresholds were derived from the cost of each error type — recognizing that a frozen test set still ages and must continuously absorb new failure modes from production.',
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
    updatedAt: '2026-10-26',
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
        text: 'I built an end-to-end research pipeline and weekly monitoring workbench where the rules matter more than the models. The narrative is split into three separate hypotheses — rainfall predicting palm output, spot and futures prices rising after an event, and climate signals improving US soybean oil forecasts — with lags, thresholds, and feature sets committed to code before pulling results. Every ingested series (NOAA ENSO indices, CHIRPS regional rainfall, MPOB output, World Bank spot prices, USDA/EIA balances, and exchange futures) is stored in an append-only archive with its publication timestamp and file hash. While the historical event study anchors on after-the-fact ONI peaks to test whether the physical relationship exists at all, no trading rule is permitted to see a peak date that was only known in hindsight; models see only data released before each decision date, evaluated by holding out whole El Niño episodes at a time.',
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
        text: 'The evidence says something much narrower than the market lore. Palm oil spot prices rose in nine of twelve events (+16.7 log points on average over a metals benchmark), and Chinese palm oil futures rose in all four overlapping events, though that futures run was not blind and excess returns halve against a broad metals index. Meanwhile, adding regional rainfall failed to beat a seasonal output baseline at every horizon, and the price effect did not carry over to US soybean oil futures. Once the 2010–2025 history had been tested, I froze the specification — no new models, no threshold searches — leaving the 2026–27 episode as a single forward out-of-sample observation. Because the Pacific index is currently elevated while the three Malaysian growing regions are not simultaneously in drought, the Tuesday automated report outputs *"watch, do not trade"* — which is what an honest system should say most of the time.',
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
        'A directory with thousands of rows still fails a first-time visitor if the four fields the visit depends on are missing.',
      contribution:
        'I built it end to end: geolocation search over Postgres and pgvector, lazy profile enrichment, and freshness and coverage tracking on the crawl.',
      outcomeLabel: 'Current result',
      outcome:
        'A live site, and a reframing: coverage is measured against a required field set for one user situation rather than by row count.',
    },
    updatedAt: '2026-10-26',
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
        text: 'It is easy to build a directory with tens of thousands of rows that still fails a first-time visitor on Sunday morning. ChurchMap started as a map-first search product over Supabase Postgres and `pgvector`, using on-demand profile enrichment when a user views a listing rather than crawling everything up front. While lazy enrichment kept crawling costs sane, it also made data freshness a function of traffic rather than importance — leaving long-tail listings missing the exact details a visitor relies on.',
      },
      {
        type: 'p',
        text: 'That failure forced a reframing that generalizes well beyond this project: *"we need more data"* is not a product goal, and a pipeline that logs zero errors is not a healthy pipeline. Silent staleness and partial field coverage produce clean logs and a broken user experience. A person new to a city looking for a weekend service needs four specific fields — service times, physical location, whether the church is currently active, and directions. A hundred thousand rows with ten metadata columns but missing service times represents zero coverage for the task that matters.',
      },
      {
        type: 'p',
        text: 'Instead of chasing national row counts or claiming product-market fit where none exists, I rebuilt the health metric around task-success coverage for one city and one user situation at a time: defining the minimum required field set before inspecting the database, seeding missing fields by hand where automated crawls fall short, and tracking field-level freshness so expansion only happens after a narrow geography can reliably complete a visit.',
      },
    ],
  },
  {
    slug: 'narrative-atlas',
    title: 'Narrative Atlas',
    question:
      'When analysts keep restating a view, how do you tell a real change in the story from the same story told again?',
    kind: 'independent-build',
    status: 'in-progress',
    featured: false,
    evidenceType: ['observational'],
    meta: 'Independent Build · Claim Extraction, Hysteresis Clustering & Golden-Set Audit · Observational',
    brief: {
      problem:
        'Analyst commentary arrives every day, repeats itself, and now and then reverses. Read as a stream, it is hard to see whether a view changed or was only restated, and easy to read the story backwards from the price.',
      contribution:
        'I built it end to end: ingest, claim and narrative extraction, clustering with an audit for duplicates, a stage engine one edition cannot flip, price episodes dated against the evidence, and a public static atlas.',
      outcomeLabel: 'Current result',
      outcome:
        'Live, with more than 220 editions since June 2025 grouped into 45 narratives across five sectors. The duplicate audit is scored on a small hand-labelled set; extraction fidelity is not measured yet.',
    },
    updatedAt: '2026-10-26',
    links: {
      caseStudy: '/work/narrative-atlas',
      demo: 'https://narrative-atlas-static.pages.dev/',
    },
    showcase: {
      tagline:
        'Follow how analyst narratives about a stock form, strengthen and reverse, with every change dated to its source.',
      audience: 'Investors tracking analyst views',
      shots: [
        {
          src: '/work/narrative-atlas/stock-episode.webp',
          alt: 'Narrative Atlas page for NVDA: price, research window, and a price and evidence episode chart comparing NVDA with a semiconductor ETF.',
          caption: 'One stock: a proposition, its dated evidence, and the price',
          width: 1440,
          height: 900,
        },
        {
          src: '/work/narrative-atlas/narratives.webp',
          alt: 'Narrative Atlas narratives index: 45 narratives across 5 sectors, each with tickers, evidence state and last source date.',
          caption: 'Forty-five narratives, nested by sector',
          width: 1440,
          height: 900,
        },
        {
          src: '/work/narrative-atlas/library.webp',
          alt: 'Narrative Atlas library: research editions by date with the tickers each one covers and a link to the extracted evidence.',
          caption: 'Every edition, with the tickers it covers',
          width: 1440,
          height: 900,
        },
      ],
    },
    body: [
      {
        type: 'p',
        text: 'Daily market commentary repeats itself for weeks and then quietly reverses. Read as a stream, it is hard to tell whether an analyst thesis actually changed or was merely restated louder, and even easier to read the story backwards once a stock has moved. I built Narrative Atlas to turn over 220 editions of a paid daily markets newsletter (since June 2025) into a structured, point-in-time record: each edition is parsed twice — once for ticker-level propositions and once for broader theses — clustering them into 45 live narratives across five sectors and aligning every dated claim against the stock\'s price path and sector benchmark.',
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
        text: 'Around a thousand automated tests enforce stage and stance contracts across every change, and the redesigned duplicate audit now reaches 1.00 precision and recall on the 15-pair scored fixture (up from 0.20 and 0.14). Even so, a perfect score on a small fixture I labelled while building the classifier is a regression test, not proof of generalization, and extraction fidelity against the raw newsletter text has not yet been double-annotated. The immediate next step is scoring a sample of extracted claims with a second human annotator — with a hard stop rule that if two people cannot agree on stance for most sampled claims, the stance schema gets rewritten before any model is tuned against it.',
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
    updatedAt: '2026-10-26',
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
        text: 'Letting users reach the first result without an account makes initial friction easy to observe, and my own daily use keeps the interface honest, but personal dogfooding is a design signal rather than retention evidence. Shipping the voice pipeline came first; instrumenting the funnel comes next. Rather than publish vanity usage counts, the measurement design focuses on three numbers that actually diagnose product quality: **time to value** (latency from recording to a readable summary), **extraction error rate** (separating ASR transcription mistakes from LLM task-extraction hallucinations on a hand-labelled recording set, since the two require completely different fixes), and **anonymous-to-saved conversion** — the exact moment a first-time user decides the extracted tasks are accurate enough to claim an account and keep.',
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
  const order = ['el-nino-commodities', 'churchmap', 'narrative-atlas', 'debrief'];
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
