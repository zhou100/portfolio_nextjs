export type WorkKind = 'industry-case' | 'independent-build' | 'research';
export type WorkStatus = 'proposed' | 'in-progress' | 'published' | 'archived';
export type EvidenceType =
  | 'reported-experience'
  | 'observational'
  | 'offline-benchmark'
  | 'randomized-experiment'
  | 'synthetic-demo';

export const STATUS_LABEL: Record<WorkStatus, string> = {
  proposed: 'Proposed',
  'in-progress': 'In progress',
  published: 'Published',
  archived: 'Archived',
};

export const EVIDENCE_LABEL: Record<EvidenceType, string> = {
  'reported-experience': 'Reported experience',
  observational: 'Observational',
  'offline-benchmark': 'Offline benchmark',
  'randomized-experiment': 'Randomized experiment',
  'synthetic-demo': 'Synthetic demo',
};

/** What each evidence type does and does not license you to claim. */
export const EVIDENCE_MEANING: Record<EvidenceType, string> = {
  'reported-experience':
    'Described from work I did. Underlying data is not public and is not re-verified here.',
  observational:
    'Measured on data that was not randomized. Supports hypotheses, not causal claims.',
  'offline-benchmark':
    'Measured on a frozen held-out set. Says nothing about live product impact.',
  'randomized-experiment': 'Measured under a recorded random assignment.',
  'synthetic-demo':
    'Built on synthetic or self-produced data to demonstrate a pipeline, not a result.',
};

export interface Finding {
  statement: string;
  source: string;
  population?: string;
  window?: string;
  baseline?: string;
  uncertainty?: string;
}

export interface WorkLinks {
  caseStudy: string;
  demo?: string;
  code?: string;
  evaluation?: string;
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'deflist'; items: { term: string; detail: string }[] }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'note'; text: string }
  | { type: 'template'; lines: { label: string; text: string }[] };

export interface WorkSection {
  /** The question a reader should be able to answer after this section. */
  prompt: string;
  blocks: Block[];
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
  methods: string[];
  dataStatus: string;
  evidenceType: EvidenceType[];
  decision: string;
  /** 30–50 words. Used on the landing page and the work index. */
  summary: string;
  findings?: Finding[];
  limitations: string[];
  updatedAt: string;
  links?: WorkLinks;
  sections: {
    evidence: WorkSection;
    studyDesign: WorkSection;
    results: WorkSection;
    nextDecision: WorkSection;
    appendix?: WorkSection;
  };
}

const items: WorkItem[] = [
  {
    slug: 'reels-measurement',
    title: 'Recommendation Quality Beyond Engagement',
    org: 'Meta — Reels & Integrity',
    question:
      'When creator-side metrics improve, how do we confirm that viewers are actually consuming better content?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    role:
      'Measurement, analysis, and influencing the product decision. I did not build the Reels ranking system.',
    methods: [
      'Metric definition',
      'Experiment design',
      'Guardrail analysis',
      'Segment heterogeneity',
    ],
    dataStatus:
      'Internal Meta data. Nothing confidential is reproduced here — this case describes the method and the decision, not the numbers.',
    evidenceType: ['reported-experience'],
    decision:
      'Product goals moved from a creator-side engagement target to a paired objective with a consumption-quality guardrail.',
    summary:
      'Creator-side engagement rose while parts of the viewer experience did not. I defined consumption-side measures, showed where the two diverged by segment, and moved the team to a paired goal with a guardrail.',
    findings: [
      {
        statement:
          'Creator-side engagement gains and viewer consumption quality moved in different directions for identifiable viewer segments.',
        source: 'Internal experiment and observational analysis (reported experience).',
        population: 'Reels viewers and creators in the studied surface.',
        window: 'Not disclosed.',
        baseline: 'The then-current ranking configuration.',
        uncertainty:
          'Effect sizes, denominators, and confidence intervals are withheld pending disclosure review. Treat this as a method case, not a numeric result.',
      },
    ],
    limitations: [
      'My résumé states a creator-engagement improvement of roughly two percent. I do not publish that number here because the relative-vs-absolute basis, time window, experimental unit, and attribution rule need to be stated with it, and the disclosure boundary is not settled.',
      'Repeat-exposure and consumption-efficiency measures are proxies for experience. They are not satisfaction.',
      'This is my account of work done inside a team. Colleagues owned ranking, infrastructure, and shipping.',
    ],
    updatedAt: '2026-09-05',
    links: { caseStudy: '/work/reels-measurement' },
    sections: {
      evidence: {
        prompt: 'What was actually measured, and what does it license me to say?',
        blocks: [
          {
            type: 'p',
            text: 'The team had a creator-side goal that was moving in the right direction. The open question was whether the viewer side had improved with it, or whether the same content was simply being shown more often to the people most likely to react to it.',
          },
          {
            type: 'deflist',
            items: [
              {
                term: 'Repeat exposure',
                detail:
                  'How often a viewer saw near-duplicate or same-creator content within a session and across sessions. A cheap way to lift engagement is to show the reliable thing again.',
              },
              {
                term: 'Consumption efficiency',
                detail:
                  'Watched time relative to time spent scrolling to find something worth watching. Engagement can rise while the search cost rises faster.',
              },
              {
                term: 'Segment split',
                detail:
                  'The same metrics computed separately for heavy and light viewers, and for established and emerging creators. The aggregate hid the disagreement.',
              },
            ],
          },
          {
            type: 'note',
            text: 'Everything in this section is reported experience. The underlying data is internal, and nothing here was re-run or re-verified for this write-up.',
          },
        ],
      },
      studyDesign: {
        prompt: 'Why was this comparison credible?',
        blocks: [
          {
            type: 'p',
            text: 'The design question was which comparison could separate "ranking got better" from "ranking got more confident." Aggregate before/after on a surface that is always changing cannot do that.',
          },
          {
            type: 'list',
            items: [
              'Experimental unit and randomization matched how the surface allocates content, so a viewer could not sit in two arms across sessions.',
              'Consumption-side measures were defined and registered before reading the results, so a null on the primary goal could not be rescued by a metric found afterwards.',
              'Segments were fixed in advance. Heterogeneity found after the fact is a hypothesis, not a finding.',
              'Guardrails covered the failure the creator goal could not see: repetition, narrow supply, and integrity-relevant exposure.',
            ],
          },
          {
            type: 'p',
            text: 'The integrity side of the work mattered for the same reason. An evaluation population drawn from typical traffic under-represents the users a safety metric exists to protect, so the sample has to be built for the risk, not for convenience.',
          },
        ],
      },
      results: {
        prompt: 'What happened, including what did not work?',
        blocks: [
          {
            type: 'p',
            text: 'The headline creator metric improved. The consumption-side picture was not uniform: for some viewer segments the added engagement came with more repetition rather than more useful watching, and the aggregate average concealed it.',
          },
          {
            type: 'p',
            text: 'The uncomfortable part was that the first version of my consumption metric was gameable in the same way as the goal it was meant to check — it rewarded longer watches without asking what the viewer had to scroll past first. Rebuilding it around search cost was the change that made the analysis persuasive.',
          },
          {
            type: 'note',
            text: 'Effect sizes are not published here. See the limitations above for why.',
          },
        ],
      },
      nextDecision: {
        prompt: 'What did the team do differently?',
        blocks: [
          {
            type: 'list',
            items: [
              'The creator-side metric stopped being read on its own and was paired with a consumption-quality guardrail.',
              'Segment reporting became part of the launch read rather than a follow-up analysis.',
              'A launch that improved the primary goal but crossed the repetition guardrail was treated as a hold, not a ship.',
            ],
          },
          {
            type: 'p',
            text: 'The result that would overturn this: a guardrail that never binds. A guardrail that has never once stopped a launch is decoration, and should be either retired or re-specified.',
          },
        ],
      },
      appendix: {
        prompt: 'What can a technical reader ask me about?',
        blocks: [
          {
            type: 'list',
            items: [
              'The exact repeat-exposure definition, including the dedup key and the session boundary.',
              'How power was computed given repeated observations per viewer.',
              'How the integrity evaluation population was sampled, and why typical traffic was the wrong frame.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'enterprise-ai-evaluation',
    title: 'Making Enterprise AI Evaluation Launch-Relevant',
    org: 'Annalect',
    question:
      'How do you stop an assistant that sounds right from failing the marketing task it was built for?',
    kind: 'industry-case',
    status: 'published',
    featured: true,
    role:
      'Defined the evaluation, built the test set and rubric, set the release gate, and drove adoption across the team.',
    methods: [
      'Layered task evaluation',
      'Human rubrics',
      'Failure taxonomy',
      'Regression gates',
      'Cost/latency tradeoffs',
    ],
    dataStatus:
      'Internal Annalect systems and client work. No client data, prompts, or transcripts are published here.',
    evidenceType: ['reported-experience', 'offline-benchmark'],
    decision:
      'Release stopped depending on demo impressions and started depending on a frozen test set with a stated regression gate.',
    summary:
      'Answer quality reviews kept passing systems that failed real marketing tasks. I split evaluation into retrieval, tool use, unsupported claims, and end-to-end success, then tied release to a frozen set and a stated gate.',
    findings: [
      {
        statement:
          'Separating retrieval, tool use, unsupported claims, and end-to-end task success exposed failures that a single answer-quality score had been averaging away.',
        source: 'Internal evaluation program (reported experience).',
        population: 'A representative test set of real marketing tasks.',
        baseline: 'Ad-hoc reviewer judgement of individual answers.',
        uncertainty:
          'Improvements on each layer have different tasks and different denominators. They do not combine into one accuracy figure.',
      },
    ],
    limitations: [
      'My résumé reports separate improvements in task success, factuality, and unsupported claims. Those are different tasks with different denominators — collapsing them into a single "AI accuracy" number would be wrong, so I do not report one.',
      'A frozen test set ages. It measures the failures we already knew to look for.',
      'Human rubric scores carry annotator disagreement. Reporting a mean without the agreement rate overstates precision.',
    ],
    updatedAt: '2026-09-05',
    links: { caseStudy: '/work/enterprise-ai-evaluation' },
    sections: {
      evidence: {
        prompt: 'What was being measured, layer by layer?',
        blocks: [
          {
            type: 'p',
            text: 'The failure mode that started this: a system reviewed well answer-by-answer and still could not complete the task a strategist actually had. Reviewers were grading prose. The product had to deliver a decision.',
          },
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
            text: 'Each layer has its own denominator. Unsupported-claim rate is per factual sentence; task success is per task. A system can improve sharply on one while the other is flat, and reporting a single blended number hides exactly the tradeoff a launch decision turns on.',
          },
        ],
      },
      studyDesign: {
        prompt: 'Why was this evaluation trustworthy?',
        blocks: [
          {
            type: 'list',
            items: [
              'The test set was built from real task families, not from prompts that happened to demo well, and was stratified so no single client or task type dominated.',
              'A written rubric defined each score point, with worked examples for the boundaries. Where two reviewers could not agree, the rubric was rewritten or the category dropped rather than averaged over.',
              'A held-out slice stayed frozen and unexamined. Prompt iteration happened on the development slice only.',
              'The release gate was stated as a threshold on the frozen slice before the run, together with what it would cost to meet it in latency and spend.',
            ],
          },
          {
            type: 'note',
            text: 'An LLM judge was validated against human labels before it was trusted anywhere. Agreement with itself is not correctness, and a judge that shares the generator\'s blind spots will happily certify them.',
          },
        ],
      },
      results: {
        prompt: 'What did a real failure look like, end to end?',
        blocks: [
          {
            type: 'p',
            text: 'The most useful artifact was not the scoreboard. It was one failure traced the whole way: a task that failed end-to-end, where the trace showed retrieval had returned the correct document and the model had summarized a neighbouring passage instead. The fix was in chunk boundaries and citation enforcement, not in the model.',
          },
          {
            type: 'p',
            text: 'That trace changed how the team argued. "The model is bad at this" became a claim you had to locate in a layer, and most of the located failures were not model failures.',
          },
          {
            type: 'p',
            text: 'The negative result worth stating: raising factuality by tightening the evidence requirement made the system refuse more often, and some refusals were on tasks it could have completed. Quality gates trade against coverage, and pretending otherwise produces a system nobody uses.',
          },
        ],
      },
      nextDecision: {
        prompt: 'What does the team do with this now?',
        blocks: [
          {
            type: 'list',
            items: [
              'Changes ship against the frozen slice with the gate stated in advance, not against a reviewer\'s read of a handful of answers.',
              'Every regression is filed into the failure taxonomy, so the test set grows from real defects rather than from imagination.',
              'Quality is quoted with its cost and latency. A configuration that wins on quality and doubles response time is a tradeoff for the product owner, not a win to be announced.',
            ],
          },
          {
            type: 'p',
            text: 'What would overturn it: if refusal-driven coverage loss costs more task value than the factuality gain returns, the gate is set in the wrong place and needs to be re-derived from error cost.',
          },
        ],
      },
      appendix: {
        prompt: 'What can a technical reader ask me about?',
        blocks: [
          {
            type: 'list',
            items: [
              'The rubric structure and how boundary cases were adjudicated.',
              'How the LLM judge was validated, and where it still disagreed with humans.',
              'How the regression threshold was derived from the cost of each error type.',
            ],
          },
        ],
      },
    },
  },
  {
    slug: 'narrative-intelligence',
    title: 'Narrative Intelligence: Evaluating Evolving Claims',
    alias: 'Repository name: narrative_TMTB (private)',
    question:
      'How do you turn continuously changing opinions into a record that is traceable, comparable, and honest about uncertainty?',
    kind: 'independent-build',
    status: 'in-progress',
    featured: true,
    role: 'Sole author. Data pipeline, storage, narrative model, product surface, and evaluation design.',
    methods: [
      'Claim extraction',
      'Narrative clustering',
      'Change detection',
      'Timestamp discipline',
      'Evaluation design',
    ],
    dataStatus:
      'Private repository over licensed and paid sources. A small self-authored public fixture is planned so the method can be checked without repository or subscription access.',
    evidenceType: ['observational'],
    decision:
      'The build works. The next decision is whether the extraction and clustering are good enough to trust before any surface is expanded.',
    summary:
      'A pipeline that tracks how claims about a ticker form, shift, and reverse — with event stages, stance flips, content-hash caching, and automated ingest. The system runs. The open question is whether its judgements are correct.',
    limitations: [
      'The repository is private and sits on paid sources, so it is not currently a self-serve demo for a hiring reader. The public fixture is the fix.',
      'The system runs and produces output. Output quality has not been measured against human labels yet — that study is designed, not done.',
      'Price movement is an external outcome. It is not a label for whether a claim was faithfully extracted, and I do not use it as one.',
    ],
    updatedAt: '2026-09-05',
    links: { caseStudy: '/work/narrative-intelligence' },
    sections: {
      evidence: {
        prompt: 'What exists today, and what is still a plan?',
        blocks: [
          {
            type: 'p',
            text: 'Built and running: a ticker-to-narrative pipeline with events and stages, stance-flip detection, content-hash caching to avoid reprocessing unchanged sources, R2 ingest, and automated narrative ingest.',
          },
          {
            type: 'p',
            text: 'Not yet done: any systematic quality measurement. That is the honest state of this project, and it is the reason it is listed as in progress rather than published.',
          },
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
        ],
      },
      studyDesign: {
        prompt: 'How would the study be run so the result means something?',
        blocks: [
          {
            type: 'list',
            items: [
              'Start at roughly fifty closely read cases, then widen. This is proposed work, not an existing dataset.',
              'Record published_at, available_at, ingested_at, and evaluated_at separately, freeze the inputs, and only then validate on a forward window. Without the four timestamps there is no way to prove the model was not reading the future.',
              'Hold out by narrative family and by source, so a near-duplicate article cannot appear on both sides of the split.',
              'Compare deterministic rules, an LLM, and a hybrid on the same set, and report cost, latency, and error type — rather than assuming the LLM wins.',
              'Allow annotators to mark a stage as ambiguous. Forcing every passage into a definite stage manufactures agreement that does not exist.',
            ],
          },
          {
            type: 'note',
            text: 'KOL data is used for source diversity, independent corroboration, and disagreement. A repost is not an independent source, and counting reposts as evidence would inflate every confidence number in the system.',
          },
        ],
      },
      results: {
        prompt: 'What has the build already taught me?',
        blocks: [
          {
            type: 'p',
            text: 'Two failure classes show up repeatedly on inspection, and both are why the evaluation study is scoped the way it is. Over-merging: two genuinely different theses about the same company collapse into one narrative because they share vocabulary. Retroactive coherence: once a stance flip is detected, the surrounding evidence reads as though it always pointed that way.',
          },
          {
            type: 'p',
            text: 'Neither is quantified yet. Naming them from inspection is not the same as measuring their rate, and I am not going to report an over-merge number I have not computed.',
          },
        ],
      },
      nextDecision: {
        prompt: 'What happens next, and what would stop it?',
        blocks: [
          {
            type: 'list',
            items: [
              'Build the public fixture: self-authored, licence-clean passages covering hold, add, reverse, retract, and duplicated-source cases.',
              'Run the extraction and pairwise-clustering annotation on that fixture and publish the agreement rates, including the ones that look bad.',
              'Only then decide whether the product surface should expand or narrow.',
            ],
          },
          {
            type: 'p',
            text: 'Stop condition: if humans cannot agree on stage boundaries at a usable rate, the stage taxonomy is wrong and gets rewritten before any model is tuned against it.',
          },
        ],
      },
    },
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
    methods: [
      'Multimodal tagging',
      'Annotator agreement',
      'Predictive evaluation',
      'Experiment design',
    ],
    dataStatus:
      'No licensed creative assets and no aligned delivery logs are confirmed. Scoped tagging-first: the first milestone needs assets and annotators, not performance data.',
    evidenceType: [],
    decision:
      'Two hours of data and scoping checks decide whether this runs as a tagging benchmark, a performance study, or not at all.',
    summary:
      'Connect what is observable in an ad creative to performance evidence, then to a testable production change. Proposed, not built: label quality, predictive value, and incremental impact are kept as three separate claims.',
    limitations: [
      'Nothing here has been built or measured. This page is a study design.',
      'Annalect performance figures belong to that work and are not transferable to this project.',
      'Public ad libraries do not ship CTR, CVR, or ROAS alongside the creative. Stitching public creatives to unrelated click data would produce a join key that means nothing.',
    ],
    updatedAt: '2026-09-05',
    links: { caseStudy: '/work/creative-evidence-lab' },
    sections: {
      evidence: {
        prompt: 'Who is this for, and what would they get?',
        blocks: [
          {
            type: 'table',
            head: ['Role', 'Their question', 'What they should receive'],
            rows: [
              [
                'Creative strategist',
                'Which element should the next batch change first?',
                'A change hypothesis with the raw evidence attached and its conditions stated.',
              ],
              [
                'Performance marketer',
                'Which differences are worth investigating at similar budget and audience?',
                'A comparison that shows sample size and uncertainty, not a ranked leaderboard.',
              ],
              [
                'DS / measurement lead',
                'Which of these can be read causally, and how do we test the rest?',
                'Estimand, intervention, assignment unit, power, and guardrails.',
              ],
            ],
          },
          {
            type: 'p',
            text: 'The user flow is deliberately short: pick an asset, inspect its timestamped tags, compare against similar assets where data exists, read one evidenced hypothesis, export an experiment brief.',
          },
          {
            type: 'p',
            text: 'What it must not do is emit a long list of generic advice. Every recommendation carries what to change, what it rests on, what else could explain it, how to test it, and what result would kill it.',
          },
        ],
      },
      studyDesign: {
        prompt: 'What actually gets built, and in what order?',
        blocks: [
          {
            type: 'p',
            text: 'One creative format first — a single language, fifteen to thirty second video. Not images, long video, landing pages, and cross-channel attribution in the same version.',
          },
          {
            type: 'table',
            caption:
              'Roughly eight to twelve core tags in the first version. Google\'s ABCD framework is a reference for organizing them, not ground truth and not a claim that each attribute has a general causal effect.',
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
            type: 'p',
            text: 'The data contract is five tables: creative_assets by asset version, creative_tags by asset × tag × model or human version, delivery_outcomes by asset × campaign × audience × placement × day, experiment_assignments by unit × experiment, and experiment_outcomes by unit over a fixed observation window.',
          },
          {
            type: 'note',
            text: 'Two joins to get wrong here: double-counting conversions after the fan-out, and treating creative-day rows as independent assets. Spend is also not a clean pre-treatment confounder — delivery systems allocate it in response to how the creative performs.',
          },
          {
            type: 'deflist',
            items: [
              {
                term: 'Layer 1 — Is the label trustworthy?',
                detail:
                  'A rubric pilot of thirty to fifty assets, widening to roughly one hundred fifty to two hundred fifty, stratified by language, duration, and creative family. Part of the sample double-annotated, disagreements adjudicated. Report per-tag agreement and prevalence, never one blended score. Then compare OCR/ASR plus rules against a VLM on identical assets, with the final holdout isolated by creative family and frozen before testing.',
              },
              {
                term: 'Layer 2 — Do the labels add predictive information?',
                detail:
                  'Only opens once assets and outcomes are genuinely aligned. Name one target — CTR, CVR, and ROAS are different tasks and do not roll up into a Creative Score. Baseline 0 is a grouped historical rate, Baseline 1 is pre-delivery context only, Model 2 adds tags. Out-of-time holdout, creative families isolated, calibration reported, and a leakage check for future performance leaking into tags or campaign names encoding the outcome.',
              },
              {
                term: 'Layer 3 — Does changing the creative change the outcome?',
                detail:
                  'Two versions of the same asset differing only in the tested attribute, under a mechanism that records random assignment. Estimand: ITT difference in qualified conversion rate per assigned unit within a fixed window. Power computed from the real baseline and a business-defined minimum effect, with the stopping rule fixed in advance.',
              },
            ],
          },
          {
            type: 'note',
            text: 'Running two ad versions at the same time is not randomization — the platform may adapt budget and audience toward the version that is already winning. If only campaign- or geo-level randomization is available, the analysis and the power calculation have to use that cluster. And since exposure itself can be affected by treatment, click-conditioned CVR cannot stand in for the ITT result.',
          },
        ],
      },
      results: {
        prompt: 'What results exist?',
        blocks: [
          {
            type: 'p',
            text: 'None. No assets have been collected, no annotation has been run, and no performance data has been obtained. This page describes what would be measured and how the output would be phrased.',
          },
          {
            type: 'template',
            lines: [
              {
                label: 'Observed',
                text: 'The first spoken brand mention occurs at 00:06. The visual tag still requires review.',
              },
              {
                label: 'Hypothesis',
                text: 'An earlier brand reveal may improve recall for this campaign. Incremental conversion impact is not established.',
              },
              {
                label: 'Recommended test',
                text: 'Compare the current version with an earlier reveal, keeping the offer and CTA fixed.',
              },
              {
                label: 'Decision rule',
                text: 'Ship only if the preregistered primary outcome and guardrails support the change; otherwise retain the original or collect more evidence.',
              },
            ],
          },
          {
            type: 'note',
            text: 'The timestamps above are illustrative. Every line in the product is tagged as observation, association, hypothesis, or experimental result, so an uncertain suggestion cannot be rendered as a confident recommendation.',
          },
        ],
      },
      nextDecision: {
        prompt: 'What decides whether this runs at all?',
        blocks: [
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
            text: 'Route selection first, in about two hours: with usable assets and aligned logs this becomes a tagging-then-performance study; with assets only it becomes a tagging benchmark plus an annotation-efficiency trial, which is still a real result; with neither it is shelved in favour of the Narrative Change Benchmark rather than stalling on a data cold start again.',
          },
        ],
      },
      appendix: {
        prompt: 'Where do the design choices come from?',
        blocks: [
          {
            type: 'list',
            items: [
              'Tag grouping references Google\'s ABCD framework for video creative. It is a reference for organizing observable attributes, not ground truth.',
              'Thresholds are set after the pilot and before the final holdout, derived from the cost of each error type.',
              'Zero errors in a small sample does not mean a zero error rate. Sample size and interval get reported with every accuracy number.',
            ],
          },
        ],
      },
    },
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
    methods: ['Coverage analysis', 'Crawl freshness', 'Task-success framing'],
    dataStatus:
      'Public place data with lazy enrichment. Coverage and freshness vary by city, which is the interesting part of the problem.',
    evidenceType: ['observational'],
    decision:
      'Reframed from "crawl more" to a scope decision: which city, which users, and which fields are actually required for a first visit.',
    summary:
      'Location-first church discovery over Postgres and pgvector, with lazy profile enrichment and crawl freshness and coverage tracking. The real problem was never crawl volume — it was deciding which fields a first visit cannot do without.',
    limitations: [
      'Coverage is uneven across cities, and search quality follows coverage.',
      'There is no evidence of product-market fit here, and I do not claim any.',
      'Enrichment freshness is monitored, not guaranteed. A crawl that logs no errors can still be quietly stale.',
    ],
    updatedAt: '2026-09-05',
    links: {
      caseStudy: '/work/churchmap',
      demo: 'https://churchmap.vercel.app/',
      code: 'https://github.com/zhou100/church_map',
    },
    sections: {
      evidence: {
        prompt: 'What is the actual product problem?',
        blocks: [
          {
            type: 'p',
            text: 'The build is a geolocation-first map with enriched profiles: Supabase Postgres with pgvector, lazy enrichment so a profile is filled in when it is first needed rather than crawled up front, and freshness and coverage tracking on the crawl itself.',
          },
          {
            type: 'p',
            text: 'The framing that took longest to reach: "we need more data" is not a project. A first-time visitor needs a small set of fields — service times, location, whether it is currently active, and how to arrive. A directory with ten fields and the wrong four missing fails the task just as completely as an empty one.',
          },
          {
            type: 'note',
            text: 'The site previously described this as SQLite. It runs on Supabase Postgres with pgvector. Corrected here.',
          },
        ],
      },
      studyDesign: {
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
      results: {
        prompt: 'What does the data look like in practice?',
        blocks: [
          {
            type: 'p',
            text: 'Coverage is strongly uneven by city, and the long tail is missing exactly the fields the task depends on. Enrichment fills profiles on demand, which keeps cost sane, but it means coverage is a function of traffic rather than of importance.',
          },
          {
            type: 'p',
            text: 'The failure that generalizes beyond this project: a pipeline reporting no errors is not a healthy pipeline. Silent staleness and partial coverage produce clean logs and a broken product.',
          },
        ],
      },
      nextDecision: {
        prompt: 'What next?',
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
    },
  },
  {
    slug: 'debrief',
    title: 'Debrief',
    alias: 'Repository name: brief-voice-memo',
    question:
      'What has to happen between a first voice memo and a user who saves the result and comes back?',
    kind: 'independent-build',
    status: 'published',
    featured: false,
    role: 'Sole author. Voice pipeline, classification, summaries, and interface.',
    methods: ['Time-to-value analysis', 'Extraction error review', 'Funnel framing'],
    dataStatus:
      'Live product with anonymous trial. My own usage is not retention evidence and is not reported as such.',
    evidenceType: ['observational'],
    decision:
      'Measure the anonymous-to-saved conversion path rather than adding features to a funnel that has not been read.',
    summary:
      'A voice app that turns quick spoken logs into daily and weekly reviews, tracking open loops over time. The interesting measurement is the path from first recording to a result a user trusts enough to save.',
    limitations: [
      'I use this product myself. That is a design signal, not retention evidence.',
      'Task extraction errors are visible on inspection but have not been counted against a labelled set.',
      'Anonymous trial means the top of the funnel is measurable and the identity-linked part is not.',
    ],
    updatedAt: '2026-09-05',
    links: {
      caseStudy: '/work/debrief',
      demo: 'https://time.yujun.net/',
      code: 'https://github.com/zhou100/brief-voice-memo',
    },
    sections: {
      evidence: {
        prompt: 'What does the product do, and what is measurable?',
        blocks: [
          {
            type: 'p',
            text: 'Anonymous trial, voice capture, transcription and classification, daily and weekly AI reviews, and open-loop tracking. A user can get to a result without an account, which makes the first-value moment measurable and the long-run behaviour harder to see.',
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
      studyDesign: {
        prompt: 'How would this be studied properly?',
        blocks: [
          {
            type: 'list',
            items: [
              'Instrument the funnel to the save action before adding capability.',
              'Hand-label a small set of recordings for extracted tasks, then measure precision and recall against it.',
              'Separate "the transcription was wrong" from "the extraction was wrong" — they have different fixes.',
            ],
          },
        ],
      },
      results: {
        prompt: 'What is known so far?',
        blocks: [
          {
            type: 'p',
            text: 'The product works and I use it. That is the entire evidence base right now, and it is a weak one: a builder using their own tool tells you the tool is usable by its designer, nothing more.',
          },
        ],
      },
      nextDecision: {
        prompt: 'What next?',
        blocks: [
          {
            type: 'list',
            items: [
              'Read the funnel to the save action before building anything new.',
              'Build the labelled extraction set so error claims can be quantified.',
              'Unify the name across the site, the repository, and the product.',
            ],
          },
        ],
      },
    },
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
    methods: ['Blind evaluation', 'Benchmark construction', 'Adjudicated labels'],
    dataStatus:
      'Currently a prompt plus a set of war stories. Not deployed. The agreed next step is five real users, before any evaluation extension.',
    evidenceType: [],
    decision:
      'Validate with five real users first. Without user pull, it stays a prompt and does not become a platform.',
    summary:
      'A prompt that reviews analyses the way a skeptical DS would. It is a prompt and a set of war stories, not a deployed product — and the honest next step is five users, not a bigger architecture.',
    limitations: [
      'Nothing is deployed. Describing this as an agent platform would be false.',
      'A single author cannot write the gold standard and also score it. Blind scoring needs someone else.',
      '"Users found it insightful" is a separate record from whether it was correct, and cannot substitute for it.',
    ],
    updatedAt: '2026-09-05',
    links: {
      caseStudy: '/work/analytics-skeptic',
      code: 'https://github.com/zhou100/analytics_skeptic',
    },
    sections: {
      evidence: {
        prompt: 'What exists?',
        blocks: [
          {
            type: 'p',
            text: 'A prompt and a collection of war stories about analyses that went wrong. The README states the position plainly: no deployment, and the goal is five real users first. That is where it stands.',
          },
        ],
      },
      studyDesign: {
        prompt: 'What would a real evaluation look like?',
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
      results: {
        prompt: 'What results exist?',
        blocks: [
          {
            type: 'p',
            text: 'None. The five-user trial has not been completed, and no benchmark has been built.',
          },
        ],
      },
      nextDecision: {
        prompt: 'What next?',
        blocks: [
          {
            type: 'p',
            text: 'Finish the five-user trial. If people reuse it and it beats a plain checklist, build the frozen benchmark and the comparison report. If they do not, it stays a prompt — which is a perfectly good outcome for a prompt.',
          },
        ],
      },
    },
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
