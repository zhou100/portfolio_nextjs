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

export interface WorkLinks {
  caseStudy: string;
  demo?: string;
  code?: string;
  /** A file or page a reader can open and check without any private access. */
  artifact?: { href: string; label: string };
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
  /** Ordered by content type: an industry case does not read like a study design. */
  sections: WorkSection[];
}

const items: WorkItem[] = [
  {
    slug: 'recommendation-quality',
    title: 'Recommendation Quality Beyond Engagement',
    org: 'Short-form video platform',
    question:
      'When creator-side engagement improves, how do we confirm that viewers are actually getting better content?',
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
      'Worked on consumption-side measures of viewer experience to inform recommendation-quality decisions, adding a viewer-side read to engagement-focused analysis. The case shows how a launch read can connect each measure to a decision while keeping population estimates, decision-critical slices, and guardrails conceptually distinct.',
    brief: {
      problem:
        'A creator-side engagement goal can move in the right direction without showing whether viewers are getting better content, or the same reliable content more often.',
      contribution:
        'I worked on consumption-side measures of viewer experience and experiment analysis used to inform recommendation-quality decisions beyond engagement alone.',
      outcomeLabel: 'What changed',
      outcome:
        'The work gave launch discussions a viewer-side quality lens alongside engagement. This case maps that contribution to the product decisions it was meant to inform.',
    },
    limitations: [
      'Repeat exposure and viewing efficiency are proxies for experience. They are not satisfaction, and a viewer who is efficiently served mediocre content still had a mediocre session.',
      'This is my account of work done inside a team. Colleagues owned ranking, infrastructure, and shipping.',
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
            text: 'A short-form video feed has two sides that are easy to confuse. Creator-side engagement measures how much reaction the content collects. Viewer-side quality is whether the person scrolling got something worth their time. A ranking change can lift the first by leaning harder on what already works — showing the reliable creator again, resurfacing the format this viewer has reacted to before — without the second improving at all.',
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
            text: 'I worked on the consumption side of the problem: measures that describe what the viewing session was actually like, reported in a form a launch review could act on.',
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
                  'A viewer-side quality measure intended to complement engagement. The internal numerator and denominator are not reconstructed here; the relevant public point is the product question the measure was built to inform.',
              },
              {
                term: 'Segment reporting',
                detail:
                  'Overall estimates and decision-critical slices answer different questions. The illustrative read below shows how to keep those questions separate without claiming a historical segment result.',
              },
            ],
          },
          {
            type: 'p',
            text: 'The integrity side of the work is a related but distinct measurement problem, which is why it is listed apart. Overall performance and performance on high-risk slices answer different questions. A sample sized for a population estimate does not automatically have the resolution to say anything about a rare, high-cost failure, so the evaluation sample has to be built for the decision it serves — with appropriate weighting when the population effect is what you need.',
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
            text: 'The point of writing it this way is that each row ends in an action. A guardrail with no stated threshold and no consequence is a chart, and charts do not stop launches.',
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
            text: 'These are the conditions I hold this work to. On a surface that changes continuously, an aggregate before-and-after cannot separate "ranking got better" from "ranking got more confident," so the design has to do that work.',
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
    title: 'Making Enterprise AI Evaluation Launch-Relevant',
    org: 'Advertising and media group',
    question:
      'How do you stop an assistant that sounds right from failing the task it was built for?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    role:
      'Enterprise AI evaluation, including task quality, unsupported claims, tool use, and launch readiness.',
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
      'Developed evaluation workflows for task quality, unsupported claims, tool use, and launch readiness. The case shows how separating retrieval, grounding, tool use, and end-to-end task success makes release discussions more diagnostic and ties each regression to an actionable failure layer.',
    brief: {
      problem:
        'A polished answer can pass a blended quality review and still fail the task a strategist needs to complete. One score hides where the system broke.',
      contribution:
        'I work on enterprise AI evaluation across four separate layers: retrieval, tool use, unsupported claims, and end-to-end task success.',
      outcomeLabel: 'What changed',
      outcome:
        'The evaluation process gives teams a shared failure taxonomy and a clearer release discussion, with each regression assigned to a layer the team can investigate.',
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
            text: 'A common failure mode is a system that reviews well answer by answer and still cannot complete a task end to end. A reviewer reading one answer at a time is grading fluency, sourcing, and tone. None of those tell you whether the person who asked could then do the thing they came to do.',
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
            text: 'A decision-ready implementation samples the real task families the product is expected to complete, defines rubric boundaries with worked examples, keeps a held-out slice separate from prompt iteration, and states any release threshold together with its latency, spend, and coverage tradeoffs.',
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
            text: 'A trace like this changes how a team argues. "The model is bad at this" becomes a claim that has to be located in a layer, so the proposed repair can address the failure that actually occurred.',
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
            text: 'The tension worth stating plainly: tightening an evidence requirement raises factuality and also raises refusals, including refusals on tasks the system could have completed. Coverage and factuality trade against each other, so the gate has to be derived from the cost of each error type rather than set at whatever number looks rigorous.',
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
    slug: 'narrative-intelligence',
    title: 'Narrative Intelligence: Evaluating Evolving Claims',
    alias: 'Private repository over licensed sources',
    question:
      'How do you turn continuously changing opinions into a record that is traceable, comparable, and honest about uncertainty?',
    kind: 'independent-build',
    status: 'in-progress',
    featured: true,
    role: 'Sole author. Data pipeline, storage, narrative model, product surface, and evaluation design.',
    roleLabel: 'Independent builder',
    methods: [
      'Claim extraction',
      'Narrative clustering',
      'Change detection',
      'Timestamp discipline',
      'Evaluation design',
    ],
    dataNote:
      'The production pipeline runs over licensed sources in a private repository. The self-authored fixture and deterministic baseline linked below are public and reproducible.',
    evidenceType: ['observational', 'synthetic-demo'],
    contribution:
      'Built a pipeline that connects changing claims to their sources and tracks how they evolve. A public self-authored fixture and deterministic baseline now expose the input, expected grouping, actual output, and one concrete error without private-repository or paid-source access.',
    brief: {
      problem:
        'Opinions about a company arrive continuously, restate each other, and occasionally reverse. Reading them as a stream loses the one thing that matters: whether the underlying claim actually changed.',
      contribution:
        'I built the whole system — ingest, claim extraction, narrative clustering, stage and stance tracking, and the evaluation design that will say whether its judgements are any good.',
      outcomeLabel: 'Current result',
      outcome:
        'The private pipeline runs end to end. A public deterministic baseline now makes one clustering task and its errors reproducible; production quality remains unmeasured.',
    },
    limitations: [
      'The public baseline covers six self-authored passages and five binary-labelled pairs. It diagnoses that baseline, not the private pipeline or production quality.',
      'One gold pair is intentionally ambiguous and excluded from the reported precision and recall rather than forced into a binary label.',
      'Price movement is an external outcome. It is not a label for whether a claim was faithfully extracted, and I do not use it as one.',
    ],
    updatedAt: '2026-09-08',
    links: {
      caseStudy: '/work/narrative-intelligence',
      artifact: {
        href: '/work/narrative-intelligence/example',
        label: 'View public example',
      },
    },
    sections: [
      {
        id: 'task',
        heading: 'The task',
        prompt: 'What does the system actually do?',
        blocks: [
          {
            type: 'p',
            text: 'Given a stream of commentary about a company, produce a record of the distinct claims being made, group the ones that are actually the same claim, and detect when a claim changes stage or reverses. The output is meant to answer "what is new?" rather than "what was published?"',
          },
          {
            type: 'p',
            text: 'Built and running: a ticker-to-narrative pipeline with events and stages, stance-flip detection, content-hash caching so unchanged sources are not reprocessed, object-store ingest, and automated narrative ingest.',
          },
          {
            type: 'p',
            text: 'Production quality has not been measured systematically. The public baseline evaluates one narrow clustering task on a six-passage teaching fixture; it makes the evaluation shape concrete without standing in for the private pipeline.',
          },
        ],
      },
      {
        id: 'example',
        heading: 'A public example you can check',
        prompt: 'What does one unit of input and expected output look like?',
        blocks: [
          {
            type: 'p',
            text: 'The public example contains six short passages I wrote by hand, the grouping I believe is correct, and an actual run of a deterministic lexical baseline. It exists so a reader can inspect the inputs, challenge my labels, and reproduce the output without the private repository or a subscription.',
          },
          {
            type: 'table',
            caption:
              'Two of the six fixture passages. Shared vocabulary is the trap: both mention the same company and the same industry, and they are not the same claim.',
            head: ['Passage', 'Claim', 'Same narrative?'],
            rows: [
              [
                'A',
                'The company benefits from data-centre capital spending by AI buyers.',
                'Grouped with the passage restating it in different words.',
              ],
              [
                'B',
                'The company’s consumer graphics inventory has normalized after a glut.',
                'Kept separate. Same company, different mechanism, different time horizon.',
              ],
            ],
          },
          {
            type: 'note',
            text: 'On the five pairs with binary gold labels, the checked-in baseline has precision 1.000, recall 0.500, and F1 0.667. Those numbers describe this fixture and this baseline only; they are not a claim about the private pipeline.',
          },
        ],
      },
      {
        id: 'observed',
        heading: 'What the build has taught me',
        prompt: 'What goes wrong, and how confident am I about it?',
        blocks: [
          {
            type: 'p',
            text: 'The public run makes one failure inspectable: the lexical baseline over-splits two passages that express the same data-centre demand proposition in different language. It correctly keeps the labelled negative pairs apart on this small fixture.',
          },
          {
            type: 'p',
            text: 'The run has one false-negative pair and no false-positive pairs among the five binary labels. It provides no general over-merge estimate, and the ambiguous sixth pair is reported separately rather than counted as right or wrong.',
          },
        ],
      },
      {
        id: 'evaluation',
        heading: 'The evaluation this needs',
        prompt: 'How would the study be run so the result means something?',
        blocks: [
          {
            type: 'table',
            caption: 'The evaluation study this project needs, and the confusion each layer prevents.',
            head: ['Layer', 'Evaluation task', 'What must not be conflated'],
            rows: [
              [
                'Extraction',
                'Are entities, stances, and cited evidence faithful to the source?',
                'A fluent summary is not a correct extraction.',
              ],
              [
                'Clustering',
                'Are same-narrative items merged and different ones kept apart?',
                'Shared vocabulary is not the same proposition.',
              ],
              [
                'Transition',
                'Is a stage change or stance flip supported by new evidence?',
                'An explanation written after the price moved was not a signal at the time.',
              ],
              [
                'Digest',
                'Does an update carry new information and reduce re-reading?',
                'Updating often is not decision value.',
              ],
              [
                'Market alignment',
                'How do timestamped claim changes relate to price changes?',
                'Price is an external outcome, not a label for extraction fidelity.',
              ],
            ],
          },
          {
            type: 'list',
            items: [
              'Start at roughly fifty closely read cases, then widen. This is proposed work, not an existing dataset.',
              'Record published_at, available_at, ingested_at, and evaluated_at separately, freeze the inputs, and only then validate on a forward window. Without the four timestamps there is no way to show the model was not reading the future.',
              'Hold out by narrative family and by source, so a near-duplicate article cannot appear on both sides of the split.',
              'Compare deterministic rules, an LLM, and a hybrid on the same set, and report cost, latency, and error type rather than assuming the model wins.',
              'Let annotators mark a stage as ambiguous. Forcing every passage into a definite stage manufactures agreement that does not exist.',
            ],
          },
          {
            type: 'note',
            text: 'Reposts are used for source diversity and disagreement, never as independent corroboration. A repost is not a second source, and counting it as one would inflate every confidence number in the system.',
          },
        ],
      },
      {
        id: 'next',
        heading: 'Next',
        prompt: 'What happens next, and what would stop it?',
        blocks: [
          {
            type: 'list',
            items: [
              'Run the private extraction and clustering pipeline on the same public fixture, recording the model and prompt version.',
              'Compare that output with the deterministic baseline and publish the versioned pairwise errors, including the failures.',
              'Only then decide whether the product surface should expand or narrow.',
            ],
          },
          {
            type: 'p',
            text: 'Stop condition: if humans cannot agree on stage boundaries at a usable rate, the stage taxonomy is wrong and gets rewritten before any model is tuned against it.',
          },
        ],
      },
    ],
  },
  {
    slug: 'creative-evidence-lab',
    title: 'Creative Evidence Lab',
    question:
      'Can observable creative attributes be connected to performance evidence well enough to produce a change worth testing?',
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
      'Designed a proposed workflow connecting observable creative attributes to performance evidence and a testable production change. The study keeps label quality, predictive value, and incremental impact as three independently testable claims, with a stop condition at each stage rather than implying that accurate tags prove lift.',
    brief: {
      problem:
        'Creative intelligence products slide between three different claims: that a tag is accurate, that it predicts performance, and that changing the thing it describes improves the outcome.',
      contribution:
        'I designed the study that keeps them apart — an annotation protocol, a predictive evaluation with a fair baseline, and an experiment that intervenes on one attribute.',
      outcomeLabel: 'Current result',
      outcome:
        'None. This is a design with stated stop conditions, published so the reasoning can be criticized before any of it is built.',
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
            text: 'A creative strategist has to pick what the next batch of assets changes first. The useful output is not a score; it is one hypothesis with the evidence attached, the conditions it holds under, and the test that would kill it.',
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
            text: 'A pattern that clears the first two layers is still a hypothesis. The point of separating them is that they have different burdens of proof and are routinely reported as one.',
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
            text: 'One creative format first — a single language, fifteen to thirty second video. Not images, long video, landing pages, and cross-channel attribution in the same version.',
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
            text: 'The data contract is five tables: creative_assets by asset version, creative_tags by asset × tag × model or human version, delivery_outcomes by asset × campaign × audience × placement × day, experiment_assignments by unit × experiment, and experiment_outcomes by unit over a fixed observation window.',
          },
          {
            type: 'note',
            text: 'Running two ad versions at the same time is not randomization — the platform may move budget and audience toward whichever is already winning. If only campaign- or geo-level randomization is available, the analysis and the power calculation have to use that cluster. And since exposure itself can be affected by treatment, click-conditioned CVR cannot stand in for the ITT result.',
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
        ],
      },
      {
        id: 'next',
        heading: 'Next',
        prompt: 'What decides whether this study runs?',
        blocks: [
          {
            type: 'p',
            text: 'Route selection comes first: with usable assets and aligned logs this becomes a tagging-then-performance study; with assets only it becomes a tagging benchmark plus an annotation-efficiency trial, which is still a real result; with neither it is shelved rather than stalled on a data cold start.',
          },
        ],
      },
    ],
  },
  {
    slug: 'churchmap',
    title: 'ChurchMap',
    question:
      'What is the minimum a first-time visitor needs to know, and how does missing data break that task?',
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
      'Built a location-first directory over Postgres and vector search, with lazy profile enrichment and crawl freshness tracking. The case reframes coverage from row count to the minimum trustworthy fields a first-time visitor needs, then makes a narrower city-and-task test the next decision.',
    brief: {
      problem:
        'A directory with thousands of rows can still fail a first-time visitor if the four fields that visit depends on are the missing ones.',
      contribution:
        'I built the product end to end — geolocation search over Postgres and pgvector, lazy profile enrichment, and freshness and coverage tracking on the crawl itself.',
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
    sections: [
      {
        id: 'task',
        heading: 'The task',
        prompt: 'What is the actual product problem?',
        blocks: [
          {
            type: 'p',
            text: 'The build is a geolocation-first map with enriched profiles: Supabase Postgres with pgvector, lazy enrichment so a profile is filled in when it is first needed rather than crawled up front, and freshness and coverage tracking on the crawl itself.',
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
            text: 'Coverage is strongly uneven by city, and the long tail is missing exactly the fields the task depends on. Enrichment fills profiles on demand, which keeps cost sane, but it makes coverage a function of traffic rather than of importance.',
          },
          {
            type: 'p',
            text: 'The failure that generalizes past this project: a pipeline reporting no errors is not a healthy pipeline. Silent staleness and partial coverage produce clean logs and a broken product.',
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
      'Built a voice app that turns spoken notes into structured reflections, follow-up actions, and open-loop reviews. Early users exist beyond me; the next step is measuring first-time value, extraction corrections, anonymous-to-saved conversion, and what brings people back without inventing traction numbers.',
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
    sections: [
      {
        id: 'task',
        heading: 'The task',
        prompt: 'What does the product do, and what is measurable?',
        blocks: [
          {
            type: 'p',
            text: 'Debrief turns spoken notes into structured reflections and follow-up actions: anonymous trial, voice capture, transcription and classification, daily and weekly reviews, and open-loop tracking. A user can reach a result without an account, which makes the first-value moment easy to observe and the long-run behaviour harder to see.',
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
            text: 'The product is live and has early users beyond me. What I cannot yet say is where first-time users find value, how often extraction needs correcting, or what brings anyone back — none of that is instrumented well enough to report, and I would rather say so than publish a number I would not defend.',
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
      'Can an AI reviewer find the metric problems that would change a launch decision, rather than just sounding reasonable?',
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
      'Built a prompt that reviews analyses like a skeptical data scientist, then scoped a comparison against a fixed human checklist. The proposed benchmark focuses on whether each reviewer catches the issue that changes the decision, while tracking unfounded criticism, evidence faithfulness, and actionability.',
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
            text: 'A prompt and a collection of war stories about analyses that went wrong. The README states the position plainly: no deployment, and the goal is five real users first. That is where it stands.',
          },
          {
            type: 'p',
            text: 'The question is not whether the output reads well. It is whether it surfaces the issue that would have changed the decision — and whether it does that more often than a fixed human checklist.',
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
            text: 'Finish the five-user trial. If people reuse it and it beats a plain checklist, build the frozen benchmark and the comparison report. If they do not, it stays a prompt — which is a perfectly good outcome for a prompt.',
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

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return items.find((item) => item.slug === slug);
}

export function getWorkSlugs(): string[] {
  return items.map((item) => item.slug);
}
