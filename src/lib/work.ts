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

export interface WorkSection {
  id: string;
  heading: string;
  /** The question a reader should be able to answer after this section. */
  prompt: string;
  blocks: Block[];
}

/** The 60-second read at the top of every case. Under 100 words in total. */
export interface WorkBrief {
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
  question: string;
  kind: WorkKind;
  status: WorkStatus;
  featured: boolean;
  role: string;
  /** Two or three words for the card. Not a sentence. */
  roleLabel: string;
  methods: string[];
  /** One sentence. What a reader may and may not check for themselves. */
  dataNote: string;
  evidenceType: EvidenceType[];
  /** One sentence for the card. What I did, in plain terms. */
  contribution: string;
  brief: WorkBrief;
  limitations: string[];
  updatedAt: string;
  links?: WorkLinks;
  showcase?: Showcase;
  /** Ordered by content type: an industry case does not read like a study design. */
  sections: WorkSection[];
}

const items: WorkItem[] = [
  {
    slug: 'recommendation-quality',
    title: 'Recommendation Quality Beyond Engagement',
    org: 'Instagram Reels',
    question:
      'Creator-side engagement was rising. Was the viewing any better?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    role:
      'Measurement, analysis, and influencing the product decision. I did not build the ranking system.',
    roleLabel: 'Data science · Measurement',
    methods: [
      'Metric definition',
      'Experiment design',
      'Guardrail analysis',
      'Segment heterogeneity',
    ],
    dataNote:
      'Internal company work. This public case describes my contribution and the method; confidential definitions, data, and results are omitted.',
    evidenceType: ['reported-experience'],
    contribution:
      'Defined measures of what a viewing session was like, and got them read beside the primary goal.',
    brief: {
      problem:
        'The creator-side engagement goal was going up. That number also goes up when a feed just serves the reliable creator again, so it could not say whether viewers were getting better content.',
      contribution:
        'I defined measures of what the viewing session was like, cut them by segment instead of pooling them, and argued they belonged beside the primary goal.',
      outcomeLabel: 'What changed',
      outcome:
        'The creator metric stopped being read on its own. The viewer-side measures and the segment splits went into the launch read.',
    },
    limitations: [
      'Repeat exposure and viewing efficiency are proxies for experience. They are not satisfaction, and a viewer who is efficiently served mediocre content still had a mediocre session.',
      'This is my account of work done inside a team. Colleagues owned ranking, infrastructure, and shipping.',
      'Effect sizes, denominators, and time windows are not published here, so nothing on this page should be read as a quantified result.',
    ],
    updatedAt: '2026-09-08',
    links: { caseStudy: '/work/recommendation-quality' },
    sections: [
      {
        id: 'problem',
        heading: 'The problem',
        prompt: 'What could the existing numbers not answer?',
        blocks: [
          {
            type: 'p',
            text: 'A short-form feed has two numbers that get confused. One is creator-side engagement: how much reaction the content collects. The other is whether the person scrolling got something worth their time. A ranking change can lift the first by leaning on what already works, showing the reliable creator again or resurfacing a format the viewer has reacted to before, and leave the second exactly where it was.',
          },
          {
            type: 'p',
            text: 'So the open question on a positive result was never "did the metric move." It was whether the metric had moved because the recommendations got better, or because they got more confident about a narrower set of content.',
          },
        ],
      },
      {
        id: 'contribution',
        heading: 'My contribution',
        prompt: 'What did I define, and why those measures?',
        blocks: [
          {
            type: 'p',
            text: 'I took the consumption side: measures of what a viewing session was actually like, written so a launch review could act on them.',
          },
          {
            type: 'deflist',
            items: [
              {
                term: 'Repeat exposure',
                detail:
                  'How often a viewer meets near-duplicate or same-creator content inside a session and across sessions. A cheap way to lift engagement is to show the reliable thing again, and an aggregate engagement number is happy to let that happen.',
              },
              {
                term: 'Viewing efficiency',
                detail:
                  'Time spent watching relative to the effort spent finding something worth watching. Engagement can rise while the search cost rises faster. The exact numerator and denominator are internal; the direction of the idea is what matters here.',
              },
              {
                term: 'Segment reporting',
                detail:
                  'The same measures computed separately for viewer and creator segments rather than pooled. Averages across a heterogeneous population can move in a direction no individual segment experienced.',
              },
            ],
          },
        ],
      },
      {
        id: 'example',
        heading: 'What a read looks like',
        prompt: 'How does a measure turn into an action?',
        blocks: [
          {
            type: 'note',
            text: 'Illustrative example. The structure below is how I organize this kind of read; the specific definitions, thresholds, and results from my work are not published here.',
          },
          {
            type: 'table',
            caption:
              'A metric earns its place on a launch review by naming the action it triggers, not by being available.',
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
            text: 'Each row ends in an action, which is the only reason it earns a place on the page. A guardrail with no threshold and no consequence is a chart, and a chart does not stop a launch.',
          },
        ],
      },
      {
        id: 'method',
        heading: 'Method',
        prompt: 'What makes this kind of comparison credible?',
        blocks: [
          {
            type: 'p',
            text: 'On a surface that changes continuously, an aggregate before-and-after cannot separate “ranking got better” from “ranking got more confident.” The design has to do that work, and these are the conditions I hold it to.',
          },
          {
            type: 'list',
            items: [
              'The experimental unit matches how the surface allocates content, so a viewer does not experience both arms across sessions.',
              'Consumption-side measures and their segments are named before the results are read. Heterogeneity found afterwards is a hypothesis, not a finding.',
              'Guardrails cover the failure the primary goal is structurally unable to see — here, repetition, narrowing supply, and integrity-relevant exposure.',
              'Each guardrail has a defined failure mode, a meaningful threshold, and enough sensitivity to detect harm at the size that would matter. A guardrail that never binds may mean the risk never materialized or the design already prevented it; what makes it decoration is having no threshold and no consequence attached.',
            ],
          },
          {
            type: 'note',
            text: 'Everything on this page is reported experience. The underlying data is internal and nothing here was re-run for this write-up.',
          },
        ],
      },
      {
        id: 'ask-me',
        heading: 'What a technical reader can ask me',
        prompt: 'Where does the detail live?',
        blocks: [
          {
            type: 'list',
            items: [
              'How a repeat-exposure measure gets defined in practice — the dedup key, the session boundary, and what breaks when either is wrong.',
              'How power is computed with repeated observations per viewer.',
              'How to size an evaluation sample so a rare, high-cost failure is actually resolvable, and how to weight back to a population estimate afterwards.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'enterprise-ai-evaluation',
    title: 'AI Agents Orchestration and Evaluation',
    org: 'Omnicom',
    question:
      'An assistant can sound right and still fail the task. What catches that before release?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    role:
      'Defined the evaluation, built the test set and rubric, set the release gate, and drove adoption across the team.',
    roleLabel: 'Data science · AI evaluation',
    methods: [
      'Layered task evaluation',
      'Human rubrics',
      'Failure taxonomy',
      'Regression gates',
      'Cost/latency tradeoffs',
    ],
    dataNote:
      'Internal enterprise work. No client data, prompts, or transcripts are published here; the failure trace below is a reconstruction written for this page.',
    evidenceType: ['reported-experience'],
    contribution:
      'Split one answer-quality score into layers that fail differently, and tied release to a gate rather than a demo.',
    brief: {
      problem:
        'Answer-quality review kept passing systems that still could not finish the task. Reviewers were grading prose, one answer at a time; the product had to deliver a decision.',
      contribution:
        'I defined four layers (retrieval, tool use, unsupported claims, end-to-end success), built the test set and rubric behind them, and set the release gate.',
      outcomeLabel: 'What changed',
      outcome:
        'Release stopped riding on how the demo went. It rode on a frozen test set and a threshold written down before the run.',
    },
    limitations: [
      'The layers have different tasks and different denominators. They do not combine into one accuracy number, and I do not report one.',
      'A frozen test set ages. It measures the failures we already knew to look for, which is why the taxonomy feeds new cases back into it.',
      'Human rubric scores carry annotator disagreement. A mean without an agreement rate overstates precision.',
      'The end-to-end trace in this case is a reconstruction built to show the method. It is not a client incident report.',
    ],
    updatedAt: '2026-09-08',
    links: { caseStudy: '/work/enterprise-ai-evaluation' },
    sections: [
      {
        id: 'problem',
        heading: 'The problem',
        prompt: 'Why did a good review score not predict a working product?',
        blocks: [
          {
            type: 'p',
            text: 'It started with a system that reviewed well answer by answer and still could not finish a task. A reviewer reading one answer at a time grades fluency, sourcing and tone. None of those tells you whether the person who asked could then go and do what they came for.',
          },
          {
            type: 'p',
            text: 'A single answer-quality score also averages across failures that have nothing in common. Retrieval missing a document and a model misreading a document it did retrieve are the same score and completely different repairs.',
          },
        ],
      },
      {
        id: 'contribution',
        heading: 'My contribution',
        prompt: 'What was measured, layer by layer?',
        blocks: [
          {
            type: 'table',
            head: ['Layer', 'What it asks', 'What a good score does not prove'],
            rows: [
              [
                'Retrieval',
                'Did the right source reach the model at all?',
                'That the model then used it.',
              ],
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
            text: 'Each layer has its own denominator. Unsupported-claim rate is per factual sentence; task success is per task. A system can improve sharply on one while the other is flat, and a single blended number hides exactly the tradeoff a release decision turns on.',
          },
          {
            type: 'p',
            text: 'Alongside the layers I built the test set from real task families rather than prompts that happened to demo well, wrote the rubric that defines each score point, and set the release gate as a threshold on a frozen slice, stated before the run together with what meeting it costs in latency and spend.',
          },
        ],
      },
      {
        id: 'example',
        heading: 'One failure, traced end to end',
        prompt: 'What does a layered diagnosis actually look like?',
        blocks: [
          {
            type: 'note',
            text: 'Illustrative reconstruction. This trace is written for this page using a self-authored task. It shows the shape of the diagnosis, not a real client incident.',
          },
          {
            type: 'template',
            lines: [
              {
                label: 'Task',
                text: 'Which of our three campaigns should absorb the next increment of budget, and on what evidence?',
              },
              {
                label: 'Retrieval',
                text: 'Correct. The performance summary for all three campaigns was retrieved and passed to the model.',
              },
              {
                label: 'Tool use',
                text: 'Correct. The spend query ran with the right date range and returned the right rows.',
              },
              {
                label: 'Answer',
                text: 'Fluent, cited, and wrong at the level that matters: it quoted an adjacent passage describing a different campaign period, and recommended the increment on that basis.',
              },
              {
                label: 'Located failure',
                text: 'Not a model-capability failure. The chunk boundary split the campaign label from the numbers beneath it, so a correctly retrieved document supported a confident sentence about the wrong thing.',
              },
              {
                label: 'Repair',
                text: 'Chunking that keeps a label with its table, and a citation constraint that requires the cited span to contain the entity being described.',
              },
            ],
          },
          {
            type: 'p',
            text: 'A trace like this changes how a team argues. "The model is bad at this" becomes a claim you have to locate in a layer — and in my experience most located failures are not model failures.',
          },
        ],
      },
      {
        id: 'method',
        heading: 'Method',
        prompt: 'What keeps the evaluation itself trustworthy?',
        blocks: [
          {
            type: 'list',
            items: [
              'The test set is stratified by task family so no single client or task type dominates the score.',
              'The rubric defines each score point with worked examples at the boundaries. Where reviewers cannot agree, the rubric gets rewritten or the category dropped, rather than averaged over.',
              'A held-out slice stays frozen. Prompt iteration happens on the development slice, or the gate is measuring the tuning rather than the system.',
              'An LLM judge is validated against human labels before its score is allowed to gate anything. Agreement with itself is not correctness, and a judge sharing the generator’s blind spots will certify them.',
              'Quality is quoted with its cost and latency. A configuration that wins on quality and doubles response time is a tradeoff for the product owner, not a win to announce.',
            ],
          },
          {
            type: 'p',
            text: 'There is a tension here that the gate has to absorb. Tightening an evidence requirement raises factuality and also raises refusals, including refusals on tasks the system could have completed. Coverage and factuality trade against each other, so the threshold has to come from the cost of each error type rather than from whatever number looks rigorous.',
          },
        ],
      },
      {
        id: 'ask-me',
        heading: 'What a technical reader can ask me',
        prompt: 'Where does the detail live?',
        blocks: [
          {
            type: 'list',
            items: [
              'The rubric structure, and how boundary cases get adjudicated.',
              'How to validate an LLM judge against human labels, and what to do where they keep disagreeing.',
              'How to derive a regression threshold from the cost of each error type instead of picking a round number.',
            ],
          },
        ],
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
    role: 'Sole author. Research design, data pipeline, tests, weekly monitoring, and the public workbench.',
    roleLabel: 'Independent research',
    methods: [
      'Event study',
      'Pre-registered tests',
      'Point-in-time data',
      'Whole-event holdout',
    ],
    dataNote:
      'Public climate, crop, and spot-price data plus one-shot tests on futures history. Licensed futures prices are not reproduced; the public workbench shows the method and findings only.',
    evidenceType: ['observational'],
    contribution:
      'Built a point-in-time research system that tests an El Niño trade one link at a time, and reported the links that failed.',
    brief: {
      problem:
        'A record El Niño is forming. The popular story says it lifts palm and soybean oil prices. There are twelve comparable events since 1963, and three of those overlap usable US futures data.',
      contribution:
        'I split the story into three testable links, wrote each test down before running it, and built a weekly pipeline that only sees data published before each decision date.',
      outcomeLabel: 'Current result',
      outcome:
        'Palm oil prices tend to rise after the peak. Rainfall does not improve output forecasts, and the effect does not carry to US soybean oil futures. The current call is watch, not trade.',
    },
    limitations: [
      'Twelve events is a small sample, and the futures tests rest on three or four of them. "Supported" means the pre-registered conditions were met, not that the effect is established.',
      'Most historical inputs are today’s revised values, not what was first published. Where the original release is unavailable, a conservative release schedule is assumed and labelled.',
      'The palm oil futures test was not blind: the event years were known before it ran. Subtracting a broad metals index roughly halves the event-year return.',
      'The 2026–27 event is one out-of-sample observation. On its own it cannot confirm or reject the framework.',
    ],
    updatedAt: '2026-10-15',
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
    sections: [
      {
        id: 'problem',
        heading: 'The problem',
        prompt: 'Why is "El Niño is bullish for vegetable oil" not yet a testable claim?',
        blocks: [
          {
            type: 'p',
            text: 'The argument has four steps. Warm water in the Pacific, drought over the growing regions, lower palm oil output, higher prices, and then a jump to US soybean oil futures, the market a US trader can actually use. Each step can fail alone. A strong event does not guarantee dry weather in Malaysia; dry weather reaches output only months later; and palm oil is a substitute for soybean oil, not the same contract.',
          },
          {
            type: 'p',
            text: 'The sample is the other problem. Twelve moderate-or-stronger El Niño events have occurred since 1963. Three overlap the US futures data I could use, four overlap Chinese palm oil futures. A method that turns twelve events into hundreds of observations by counting commodities or months is manufacturing confidence.',
          },
        ],
      },
      {
        id: 'contribution',
        heading: 'My contribution',
        prompt: 'What did I build, and what rules does it follow?',
        blocks: [
          {
            type: 'p',
            text: 'I designed and built the system: data ingestion and archive, the event studies and forecast comparisons, a weekly monitoring report, and the research workbench. The rules mattered more than the models.',
          },
          {
            type: 'deflist',
            items: [
              {
                term: 'One link at a time',
                detail:
                  'The claim is split into three hypotheses: does region rainfall improve palm output forecasts, do palm oil prices rise after the peak, and does climate information add anything to US soybean oil futures. Each can be rejected without dragging the others down.',
              },
              {
                term: 'Point-in-time data',
                detail:
                  'Every value carries the time its source published it and the time I captured it. A model only sees data released before its decision date. A trading rule may use the date an event was detectable, never the peak date that is only known afterwards.',
              },
              {
                term: 'Written down first',
                detail:
                  'Lags, thresholds, and feature sets are committed as code constants and a protocol document before results are pulled. Every specification tried, including the failures, goes into the report appendix.',
              },
              {
                term: 'Hold out whole events',
                detail:
                  'Evaluation leaves out an entire El Niño episode at a time, so information from one event cannot sit on both sides of the split.',
              },
              {
                term: 'A stop rule',
                detail:
                  'Once the 2010–2025 history had been tested several times, I froze it: no new models, no threshold searches. The 2026–27 event is monitored forward and counts as one out-of-sample observation.',
              },
            ],
          },
        ],
      },
      {
        id: 'example',
        heading: 'What the evidence says, link by link',
        prompt: 'Which links held, and which did not?',
        blocks: [
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
            text: 'The rows say something narrower than the popular story. Palm oil prices have tended to rise after strong El Niño peaks. The mechanism I could test, rainfall predicting output, added no forecasting value, and the price effect does not reliably reach US soybean oil.',
          },
          {
            type: 'p',
            text: 'The weekly evidence card follows from that. The Pacific index is above its threshold, but the three Malaysian growing regions are not in drought at the same time, so the output is "watch, do not trade." The system is built to say that often.',
          },
        ],
      },
      {
        id: 'method',
        heading: 'Method',
        prompt: 'How is it built, and kept honest week to week?',
        blocks: [
          {
            type: 'list',
            items: [
              'Sources: NOAA ENSO indices and ocean heat content, CHIRPS rainfall aggregated to three Malaysian regions, Malaysian Palm Oil Board output and stocks, World Bank monthly spot prices, USDA and EIA supply and demand, and exchange futures history.',
              'Every download is archived with its source release time, capture time, and file hash, in an append-only store. Nothing is overwritten.',
              'A scheduled job builds the ENSO weekly report each Tuesday: seven turning-point indicators, a comparison with past strong events, the evidence card, and a forward log that only ever gains rows.',
              'Paid futures data runs under a hard budget of one US dollar a month, reserved before each request. Vendor prices never leave the private repository.',
              'The public workbench is a static site built from committed reports. It recomputes nothing, and the build refuses to publish if futures quotes or trading state slip in.',
            ],
          },
          {
            type: 'note',
            text: 'The repository is private. The workbench is the public view of the same reports, with licensed prices and trading state removed.',
          },
        ],
      },
      {
        id: 'ask-me',
        heading: 'What a technical reader can ask me',
        prompt: 'Where is the method most open to challenge?',
        blocks: [
          {
            type: 'list',
            items: [
              'How release-time rules are enforced in code when a source does not publish its own release history.',
              'Why the event study anchors on the after-the-fact peak, and why no trading rule is allowed to.',
              'How a twelve-event sample changes what a p-value, a holdout, or a "supported" verdict can mean.',
              'Why the research was frozen after the historical tests, and what the 2026–27 event can and cannot settle.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'creative-evidence-lab',
    title: 'Creative Evidence Lab',
    question:
      'Can a creative attribute be tied to performance well enough to justify a test?',
    kind: 'independent-build',
    status: 'proposed',
    featured: false,
    role: 'Proposed sole author: taxonomy, annotation protocol, tagging baselines, error analysis, and experiment design.',
    roleLabel: 'Independent · Study design',
    methods: [
      'Multimodal tagging',
      'Annotator agreement',
      'Predictive evaluation',
      'Experiment design',
    ],
    dataNote:
      'Nothing has been built or measured. No licensed creative assets and no aligned delivery logs are confirmed, and this page is a study design.',
    evidenceType: [],
    contribution:
      'A study design that keeps three claims apart: the tag is right, the tag predicts, and changing the attribute helps.',
    brief: {
      problem:
        'Creative tools slide between three claims: this tag is accurate, it predicts performance, and changing what it describes improves the outcome.',
      contribution:
        'I designed the study that keeps them apart: an annotation protocol, a predictive evaluation with a fair baseline, and an experiment that changes one attribute.',
      outcomeLabel: 'Current result',
      outcome:
        'None yet. This is a design with stop conditions, published so the reasoning can be argued with before anything is built.',
    },
    limitations: [
      'Nothing here has been built or measured. This page is a study design and says so at the top.',
      'Performance figures from my employment belong to that work and are not transferable to this project.',
      'Public ad libraries do not ship CTR, CVR, or ROAS alongside the creative. Stitching public creatives to unrelated click data would produce a join key that means nothing.',
    ],
    updatedAt: '2026-09-08',
    links: { caseStudy: '/work/creative-evidence-lab' },
    sections: [
      {
        id: 'decision',
        heading: 'The decision this has to serve',
        prompt: 'What would someone do differently because of it?',
        blocks: [
          {
            type: 'p',
            text: 'A creative strategist has to decide what the next batch of assets changes first. The useful output is not a score. It is one hypothesis with its evidence attached, the conditions it holds under, and the test that would kill it.',
          },
          {
            type: 'deflist',
            items: [
              {
                term: '1 — Label quality',
                detail:
                  'Can two people apply the definition and agree? Until this holds, everything downstream is measuring annotation noise.',
              },
              {
                term: '2 — Predictive value',
                detail:
                  'Does the label still add information out of sample, over a baseline that already knows the delivery context?',
              },
              {
                term: '3 — Incremental impact',
                detail:
                  'Does changing the attribute move the outcome under a recorded random assignment? Nothing below this line supports the word "lift."',
              },
            ],
          },
          {
            type: 'note',
            text: 'A pattern that clears the first two layers is still a hypothesis. The layers carry different burdens of proof, and they are routinely reported as one.',
          },
        ],
      },
      {
        id: 'example',
        heading: 'One worked example',
        prompt: 'What does a single output look like?',
        blocks: [
          {
            type: 'template',
            lines: [
              {
                label: 'Observed',
                text: 'The first spoken brand mention occurs at 00:06. The visual logo tag still requires review.',
              },
              {
                label: 'Hypothesis',
                text: 'An earlier brand reveal may improve recall for this campaign. Incremental conversion impact is not established.',
              },
              {
                label: 'Recommended test',
                text: 'Compare the current version against an earlier reveal, holding the offer and the CTA fixed.',
              },
              {
                label: 'Decision rule',
                text: 'Ship only if the preregistered primary outcome and the guardrails support the change; otherwise keep the original or collect more evidence.',
              },
            ],
          },
          {
            type: 'note',
            text: 'The timestamps are illustrative. Every line in the product would be tagged as observation, association, hypothesis, or experimental result, so an uncertain suggestion cannot be rendered as a confident recommendation.',
          },
        ],
      },
      {
        id: 'design',
        heading: 'Design and data requirements',
        prompt: 'What gets built, in what order, and on what data?',
        blocks: [
          {
            type: 'p',
            text: 'One creative format first: a single language, fifteen to thirty seconds of video. Not images, long video, landing pages and cross-channel attribution in one version.',
          },
          {
            type: 'table',
            caption:
              'Roughly eight to twelve core tags in a first version. Google’s ABCD framework is a public reference for organizing them, not ground truth and not a claim that each attribute has a general causal effect.',
            head: ['Tag group', 'Example fields', 'Annotation requirement'],
            rows: [
              [
                'Attention',
                'First product appearance, opening shot type, human voice in the first three seconds',
                'Bound to a time range and a frame or transcript reference.',
              ],
              [
                'Branding',
                'First visual logo time, first spoken brand time',
                'Visual and spoken kept separate; absent and not-detected kept separate.',
              ],
              [
                'Connection',
                'People on screen, demo or testimonial form, setting',
                'Observable fields first. Anything like "warmth" needs a human definition and a reliability check.',
              ],
              [
                'Direction',
                'CTA present, on-screen or spoken, specific action, first appearance',
                'An explicit, observable action taxonomy.',
              ],
              [
                'Context',
                'Duration, aspect ratio, language, channel, objective, creative family',
                'Asset properties kept distinct from delivery context.',
              ],
            ],
          },
          {
            type: 'deflist',
            items: [
              {
                term: 'Layer 1 — Is the label trustworthy?',
                detail:
                  'A rubric pilot of thirty to fifty assets, widening to roughly one hundred fifty to two hundred fifty, stratified by language, duration, and creative family. Part of the sample double-annotated, disagreements adjudicated. Report per-tag agreement and prevalence, never one blended score. Then compare OCR/ASR plus rules against a vision-language model on identical assets, with the final holdout isolated by creative family and frozen before testing.',
              },
              {
                term: 'Layer 2 — Do the labels add predictive information?',
                detail:
                  'Only opens once assets and outcomes are genuinely aligned. Name one target — CTR, CVR, and ROAS are different tasks and do not roll up into a creative score. Baseline 0 is a grouped historical rate, Baseline 1 is pre-delivery context only, Model 2 adds tags. Out-of-time holdout, creative families isolated, calibration reported, and a leakage check for future performance leaking into tags or campaign names encoding the outcome.',
              },
              {
                term: 'Layer 3 — Does changing the creative change the outcome?',
                detail:
                  'Two versions of the same asset differing only in the tested attribute, under a mechanism that records random assignment. Estimand: ITT difference in qualified conversion rate per assigned unit within a fixed window. Power computed from the real baseline and a business-defined minimum effect, with the stopping rule fixed in advance.',
              },
            ],
          },
          {
            type: 'p',
            text: 'The data contract is five tables. creative_assets is keyed by asset version. creative_tags by asset, tag, and model or human version. delivery_outcomes by asset, campaign, audience, placement and day. experiment_assignments by unit and experiment. experiment_outcomes by unit over a fixed observation window.',
          },
          {
            type: 'note',
            text: 'Running two ad versions at the same time is not randomization. The platform may move budget and audience toward whichever version is already winning. If only campaign- or geo-level randomization is available, the analysis and the power calculation have to use that cluster. And since exposure itself can be affected by treatment, click-conditioned CVR cannot stand in for the ITT result.',
          },
        ],
      },
      {
        id: 'status',
        heading: 'Current status',
        prompt: 'What exists today?',
        blocks: [
          {
            type: 'p',
            text: 'A design. No assets have been collected, no annotation has been run, and no performance data has been obtained.',
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
            text: 'The route is chosen before any work starts. With usable assets and aligned logs this becomes a tagging-then-performance study. With assets only it becomes a tagging benchmark plus an annotation-efficiency trial, which is still a real result. With neither, it is shelved rather than left stalled on a data cold start.',
          },
        ],
      },
    ],
  },
  {
    slug: 'churchmap',
    title: 'ChurchMap',
    question:
      'What does a first-time visitor need to know, and where does missing data break that?',
    kind: 'independent-build',
    status: 'published',
    featured: false,
    role: 'Sole author. Data pipeline, enrichment, search, and interface.',
    roleLabel: 'Independent builder',
    methods: ['Coverage analysis', 'Crawl freshness', 'Task-success framing'],
    dataNote:
      'Public place data with lazy enrichment. Coverage and freshness vary by city, which is the interesting part of the problem.',
    evidenceType: ['observational'],
    contribution:
      'Built a location-first directory, then reframed the problem from crawl volume to which fields a first visit cannot do without.',
    brief: {
      problem:
        'A directory with thousands of rows still fails a first-time visitor if the four fields the visit depends on are missing.',
      contribution:
        'I built it end to end: geolocation search over Postgres and pgvector, lazy profile enrichment, and freshness and coverage tracking on the crawl.',
      outcomeLabel: 'Current result',
      outcome:
        'A live site, and a reframing: coverage is measured against a required field set for one user situation rather than by row count.',
    },
    limitations: [
      'Coverage is uneven across cities, and search quality follows coverage.',
      'There is no evidence of product-market fit here, and I do not claim any.',
      'Enrichment freshness is monitored, not guaranteed. A crawl that logs no errors can still be quietly stale.',
    ],
    updatedAt: '2026-09-08',
    links: {
      caseStudy: '/work/churchmap',
      demo: 'https://churchmap.vercel.app/',
      code: 'https://github.com/zhou100/church_map',
    },
    showcase: {
      tagline:
        'Search a city and see what each church says about itself, summarised from its own website, before a first Sunday visit.',
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
    sections: [
      {
        id: 'task',
        heading: 'The task',
        prompt: 'What is the actual product problem?',
        blocks: [
          {
            type: 'p',
            text: 'The build is a map first and a directory second: Supabase Postgres with pgvector, profiles enriched lazily when someone first needs one rather than crawled up front, and freshness and coverage tracked on the crawl itself.',
          },
          {
            type: 'p',
            text: 'The framing that took longest to reach: "we need more data" is not a project. A first-time visitor needs a small set of fields — service times, location, whether it is currently active, and how to get there. A directory with ten fields and the wrong four missing fails the task as completely as an empty one.',
          },
        ],
      },
      {
        id: 'observed',
        heading: 'What the data looks like',
        prompt: 'What actually breaks?',
        blocks: [
          {
            type: 'p',
            text: 'Coverage is uneven by city, and the long tail is missing exactly the fields the task depends on. Filling profiles on demand keeps the cost sane and makes coverage a function of traffic rather than of importance.',
          },
          {
            type: 'p',
            text: 'The failure generalizes past this project. A pipeline that reports no errors is not a healthy pipeline. Silent staleness and partial coverage produce clean logs and a broken product.',
          },
        ],
      },
      {
        id: 'evaluation',
        heading: 'How coverage should be measured',
        prompt: 'How would coverage be tied to task success?',
        blocks: [
          {
            type: 'list',
            items: [
              'Pick one city and one user situation — new to the area, looking for a service this weekend.',
              'Define the minimum field set that situation requires, before looking at what the data happens to contain.',
              'Measure coverage of that field set, not row count. A hundred thousand rows missing service times is zero coverage for this task.',
              'Then measure task success: can a person actually pick a place and turn up.',
            ],
          },
        ],
      },
      {
        id: 'next',
        heading: 'Next',
        prompt: 'What happens next?',
        blocks: [
          {
            type: 'list',
            items: [
              'Narrow to one city and one user situation, and seed the minimum fields by hand where the crawl cannot reach.',
              'Report freshness and coverage against that field set as the product health metric.',
              'Expand only after the narrow case actually completes the task.',
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'debrief',
    title: 'Debrief',
    alias: 'Published from the repository brief-voice-memo',
    question:
      'What has to happen between a first voice memo and a user who saves the result and comes back?',
    kind: 'independent-build',
    status: 'published',
    featured: false,
    role: 'Sole author. Voice pipeline, classification, summaries, and interface.',
    roleLabel: 'Independent builder',
    methods: ['Time-to-value analysis', 'Extraction error review', 'Funnel framing'],
    dataNote:
      'Live product with anonymous trial and early users beyond me. Retention and extraction accuracy are not measured yet, so no usage figures appear here.',
    evidenceType: ['observational'],
    contribution:
      'Built a voice-to-review product, then worked out what to measure before adding anything else.',
    brief: {
      problem:
        'A voice app can produce a summary quickly and still not produce anything a user trusts enough to keep. The interesting step is the one between those two.',
      contribution:
        'I built the product end to end — capture, transcription, classification, daily and weekly reviews, open-loop tracking — and defined what to measure first.',
      outcomeLabel: 'Current result',
      outcome:
        'Live, with early users beyond me. The next step is understanding where first-time users find value, where extraction needs correction, and what brings them back.',
    },
    limitations: [
      'There are early external users, but no reliable retention or outcome measurement yet. I do not report user counts, activity, or anything resembling product-market fit.',
      'Task extraction errors are visible on inspection but have not been counted against a labelled set.',
      'The anonymous trial and the signed-in stage can each be measured; connecting them depends on instrumentation and identity rules that are not fully in place, which is a gap in what I currently measure rather than something unmeasurable.',
    ],
    updatedAt: '2026-09-08',
    links: {
      caseStudy: '/work/debrief',
      demo: 'https://time.yujun.net/',
      code: 'https://github.com/zhou100/brief-voice-memo',
    },
    showcase: {
      tagline:
        'Talk through your day for half a minute and get back a summary, key points, and todos. No sign-in needed to try it.',
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
    sections: [
      {
        id: 'task',
        heading: 'The task',
        prompt: 'What does the product do, and what is measurable?',
        blocks: [
          {
            type: 'p',
            text: 'Debrief turns spoken notes into structured reflections and follow-ups: anonymous trial, voice capture, transcription and classification, daily and weekly reviews, open-loop tracking. A user can reach a result without an account, which makes the first-value moment easy to watch and long-run behaviour hard to see.',
          },
          {
            type: 'deflist',
            items: [
              {
                term: 'Time to value',
                detail:
                  'From first recording to a summary the user reads. If this is slow, nothing downstream matters.',
              },
              {
                term: 'Extraction error rate',
                detail:
                  'How often a task or theme is invented, missed, or mis-assigned. Requires a labelled set, which does not exist yet.',
              },
              {
                term: 'Anonymous-to-saved conversion',
                detail:
                  'The step where a user decides the output is worth keeping. This is the honest first metric for the product.',
              },
            ],
          },
        ],
      },
      {
        id: 'observed',
        heading: 'Where it stands',
        prompt: 'What is actually known?',
        blocks: [
          {
            type: 'p',
            text: 'The product is live and has early users beyond me. What I cannot yet say is where first-time users find value, how often extraction needs correcting, or what brings anyone back. None of it is instrumented well enough to report, and I would rather say that than publish a number I would not defend.',
          },
          {
            type: 'p',
            text: 'My own daily use is a design signal: it keeps the product honest about friction. It is not retention evidence and is not reported as such.',
          },
        ],
      },
      {
        id: 'evaluation',
        heading: 'How this should be studied',
        prompt: 'What would make the next decision an informed one?',
        blocks: [
          {
            type: 'list',
            items: [
              'Instrument the funnel to the save action before adding capability.',
              'Hand-label a small set of recordings for extracted tasks, then measure precision and recall against it.',
              'Separate "the transcription was wrong" from "the extraction was wrong" — they have different fixes.',
              'Keep the display name and the repository name explained in one place, so the product, the site, and the README agree.',
            ],
          },
        ],
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
    role: 'Proposed: benchmark construction, blind scoring design, and comparison against a human checklist.',
    roleLabel: 'Independent · Study design',
    methods: ['Blind evaluation', 'Benchmark construction', 'Adjudicated labels'],
    dataNote:
      'A prompt and a set of war stories. Not deployed, and nothing has been benchmarked.',
    evidenceType: [],
    contribution:
      'A prompt that reviews analyses the way a skeptical data scientist would, plus the design for testing whether it works.',
    brief: {
      problem:
        'An AI reviewer that sounds reasonable is easy. One that catches the specific issue that would change a launch decision is the only version worth having.',
      contribution:
        'I wrote the prompt and the war stories behind it, and designed the blind evaluation that would separate useful criticism from confident noise.',
      outcomeLabel: 'Current result',
      outcome:
        'A prompt, not a product. The honest next step is five real users, not a bigger architecture.',
    },
    limitations: [
      'Nothing is deployed. Describing this as an agent platform would be false.',
      'A single author cannot write the gold standard and also score against it. Blind scoring needs someone else.',
      '"Users found it insightful" is a separate record from whether it was correct, and cannot substitute for it.',
    ],
    updatedAt: '2026-09-08',
    links: {
      caseStudy: '/work/analytics-skeptic',
      code: 'https://github.com/zhou100/analytics_skeptic',
    },
    sections: [
      {
        id: 'decision',
        heading: 'The decision this has to serve',
        prompt: 'What exists, and what is the open question?',
        blocks: [
          {
            type: 'p',
            text: 'A prompt and a collection of war stories about analyses that went wrong. The README is plain about it: no deployment, and five real users first. That is where it stands.',
          },
          {
            type: 'p',
            text: 'The question is whether it surfaces the issue that would have changed the decision, and whether it does that more often than a fixed human checklist. Reading well is the easy part.',
          },
        ],
      },
      {
        id: 'evaluation',
        heading: 'What a real evaluation would look like',
        prompt: 'How would it be tested?',
        blocks: [
          {
            type: 'list',
            items: [
              'Thirty to fifty publishable cases covering wrong OEC, drifting denominators, selection bias, guardrail conflicts, and insufficient information.',
              'Isolate development and test by scenario family, so a variant of a known case cannot leak across the split.',
              'Compare three arms: a fixed human checklist, a generic prompt, and the skeptic prompt.',
              'Score blind on recall of the decision-changing issue, rate of unfounded criticism, evidence faithfulness, actionability, and whether the correct decision changed.',
              'Bootstrap by case, and keep the author of the gold standard out of the scoring.',
            ],
          },
        ],
      },
      {
        id: 'next',
        heading: 'Next',
        prompt: 'What happens next?',
        blocks: [
          {
            type: 'p',
            text: 'Finish the five-user trial. If people reuse it and it beats a plain checklist, build the frozen benchmark and the comparison report. If not, it stays a prompt, which is a perfectly good outcome for a prompt.',
          },
        ],
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
  const order = ['el-nino-commodities', 'churchmap', 'debrief'];
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
