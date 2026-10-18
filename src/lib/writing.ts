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
    "slug": "more-draws-same-evidence",
    "title": "Drawing Conclusions from a Small History of El Niño Events",
    "topic": "Measurement",
    "status": "published",
    "publishedAt": "2026-10-17",
    "readingTime": "11 min",
    "excerpt": "Defining the target, checking historical coverage, and testing how much a conclusion depends on a few events.",
    "relatedWork": "el-nino-commodities",
    "tldr": [
      "A small event history can describe what happened. Applying its average to other episodes requires explicit assumptions about comparability and coverage.",
      "Show which episodes each commodity retains, then test dependence on individual events and reasonable research choices. An interval answers only part of the question.",
      "Prediction needs information available at the decision date and evaluation through time. The coverage and sensitivity checks described here remain work to complete."
    ],
    "body": [
      {
        "type": "p",
        "text": "My original El Niño study reported twelve eligible moderate-or-stronger episodes since 1963. That was the largest event count, not the count behind every result: after missing returns were removed, the palm kernel oil interval used six episodes and the US natural gas interval used eight. Those are counts reported in the earlier project, not a newly audited event inventory. They need to be checked against frozen data and inclusion rules before they become the denominator of a revised empirical claim."
      },
      {
        "type": "p",
        "text": "With a history this small, three questions easily collapse into one. What happened during the observed episodes? Does their average describe a broader class of comparable events? Will it help with the next one? Each asks more of the evidence. Before choosing an uncertainty calculation, I need to decide which question the history can support."
      },
      {
        "type": "note",
        "text": "This revision explains how I would assess that evidence. It does not report a completed reanalysis: the event coverage audit, individual-event returns and sensitivity calculations are not presented here. Palm kernel oil is the running example because its reported six observations expose the coverage problem, not because it had the strongest result. Palm oil is a different series; its results cannot fill the gaps."
      },
      {
        "type": "h",
        "text": "Define the Claim Before Choosing the Method"
      },
      {
        "type": "p",
        "text": "Suppose the target is the mean palm kernel oil return across every eligible historical episode with an observed price window. Once the event list and return calculation are fixed, that mean describes a finite collection. If I have observed the whole collection, there is no random sampling of episodes from it. A bootstrap interval is not automatically the sampling error of that historical mean. Measurement problems and missing events still matter, but they are different sources of uncertainty."
      },
      {
        "type": "table",
        "caption": "Four claims that require different evidence.",
        "head": [
          "Claim",
          "What would support it"
        ],
        "rows": [
          [
            "Historical description",
            "A complete episode inventory, explicit missingness and reproducible returns for fixed dates."
          ],
          [
            "Association beyond that history",
            "A defined target population, comparable events, a defensible benchmark and assumptions about dependence."
          ],
          [
            "Prediction of the next episode",
            "Information available at the decision date, frozen rules and evaluation through time."
          ],
          [
            "Causal effect of ENSO",
            "A separate identification design for the outcome under the climate shock versus a defensible counterfactual."
          ]
        ]
      },
      {
        "type": "p",
        "text": "Inference beyond the observed history introduces a larger population or a model of how episodes and returns arise. Independence, stability across decades and comparability to the next event then become substantive assumptions. My primary goal would be a historical description and a carefully bounded association. A prediction or causal explanation needs additional evidence of its own."
      },
      {
        "type": "h",
        "text": "Show the Episodes Behind the Average"
      },
      {
        "type": "p",
        "text": "The first research output should be an episode ledger. Each row would identify the start and end of an episode, its classification, the index and threshold used, the duration rule, the data version and the research cutoff. Confirmation dates and final intensity belong in separate columns. A process spanning two calendar years does not become two independent climate repetitions."
      },
      {
        "type": "p",
        "text": "For palm kernel oil, the same row would record the exact price-series identifier, currency, unit, return dates, window length and availability. Missing episodes would stay visible with an exclusion reason. Shared price months across windows would be flagged. A spot-price change and a tradable futures return also need separate labels; the latter requires contract, roll and cost conventions."
      },
      {
        "type": "p",
        "text": "NOAA’s historical ONI page defines warm episodes using thresholds sustained over overlapping seasons and warns that recent values can be revised. It now distinguishes that historical series from RONI, used for official monitoring and prediction. Keeping a frozen legacy ONI definition can be reasonable, but changing indices silently would change the study’s event population. The current NOAA table does not independently verify the project’s count of twelve. The source is NOAA’s historical ONI record, linked below."
      },
      {
        "type": "p",
        "text": "A coverage figure would put episodes in chronological rows and commodities or key windows in columns, with available and missing returns marked. The downloadable ledger would explain each cell. Until those records are reconstructed, the six palm kernel oil observations identify a limitation in the earlier report; they do not establish which kinds of episodes are missing."
      },
      {
        "type": "h",
        "text": "Representative of Which Events?"
      },
      {
        "type": "p",
        "text": "There are three collections to compare: all eligible historical episodes, the episodes retained for palm kernel oil, and the events to which I want to apply the result. Future moderate-or-stronger events are one target. Events resembling a particular formation season, intensity and producing-region exposure are another. A sample can overlap one target better than the other."
      },
      {
        "type": "p",
        "text": "I would start with a few comparisons that have substantive meaning: season, intensity, era and regional exposure. Are missing returns concentrated early in the price record? Does the current situation lie outside the observed range? These questions are more useful here than fitting a high-dimensional matching model to six observations. Failure to detect a difference in such a small sample would not establish representativeness."
      },
      {
        "type": "p",
        "text": "Cross-commodity comparisons need the same care. Palm kernel oil and natural gas may differ partly because they retain different episodes. I would show each available-sample result alongside the result on the episodes shared by that particular comparison, reporting the coverage lost. Taking the intersection of every commodity could discard most of the history without resolving the underlying selection problem."
      },
      {
        "type": "p",
        "text": "Similarity weights would require a stated target and a report of how concentrated the weights become. If nearly all weight lands on one episode, that dependence is part of the conclusion. Weighting cannot supply historical support where no comparable episode exists. Extending the record can help, but only if changes in price definitions, data quality and market structure are examined alongside the extra events."
      },
      {
        "type": "h",
        "text": "Separate the Climate Story from the Return Calculation"
      },
      {
        "type": "p",
        "text": "A positive average return during an El Niño window first says that prices rose. It does not establish how unusual that rise was. I would fix the primary return definition, then compare it with a small set of justified references, such as returns over comparable calendar seasons or explicitly defined non-event windows. Each reference needs its own coverage, overlap and contamination checks. A benchmark is a diagnostic comparison; calling it a counterfactual would require more justification."
      },
      {
        "type": "p",
        "text": "For the palm kernel oil example, a proposed mechanism would have to connect ENSO conditions, weather in producing regions, production and inventories, and prices. Each link needs independent observations and support for its timing and direction. The mechanism is a reason to investigate this commodity, not a result established by the event average. Evidence about palm oil cannot simply substitute for measurements of palm kernel oil."
      },
      {
        "type": "p",
        "text": "Even a verified production response would leave a financial question: how much had prices already anticipated? Background conditions measured before the shock and variables transmitting its effects also play different roles. Controlling for every production and inventory measure could remove part of the pathway being studied rather than isolate its total causal effect."
      },
      {
        "type": "p",
        "text": "A pre-event window or mechanism-unrelated outcome can probe a particular alternative explanation. Neither is a universal placebo. Prices may move before a formal climate announcement because information arrives earlier. Arbitrarily shuffling historical event labels likewise requires an exchangeability argument; ENSO was not randomly assigned. Such checks can expose weaknesses without proving causality when they pass."
      },
      {
        "type": "h",
        "text": "Test What the Conclusion Depends On"
      },
      {
        "type": "p",
        "text": "The main analysis would separate dependence on particular episodes from dependence on research choices. First, show every observed return, the full-sample mean and the mean after dropping each episode in turn. For palm kernel oil’s reported six observations, each deletion removes a substantial part of the available history. I would track changes in direction, magnitude and practical interpretation, rather than only whether an interval crosses zero."
      },
      {
        "type": "p",
        "text": "An extreme episode should remain unless a verified data error or an eligibility rule justifies its exclusion. Extremes may be central to the phenomenon. If one episode supplies most of the average, the reader should see that fact. A median can describe a typical episode alongside the mean, but changing the target to the median does not repair an unstable estimate of the average."
      },
      {
        "type": "p",
        "text": "Second, I would freeze a limited set of reasonable alternatives covering event thresholds, return windows, starting era, benchmark and return convention. Every estimate would show its actual event count. Alternatives that change the population or quantity of interest would be grouped separately. Otherwise a change in the question could be mistaken for instability in one answer."
      },
      {
        "type": "p",
        "text": "Simonsohn, Simmons and Nelson’s specification-curve framework motivates making justified, statistically valid and non-redundant choices visible. Here a compact matrix could show which decisions move the result. Counting positive specifications as votes would be misleading: closely related windows reuse much of the same information. Displaying a sensitivity curve alone also does not supply the framework’s joint statistical inference."
      },
      {
        "type": "p",
        "text": "The search across commodities and windows belongs in the report. Choosing a main specification after seeing historical results makes it exploratory; freezing that choice now cannot make the original exercise preregistered. It can establish rules for this revision and future evaluation. The eventual finding might be a stable direction with a window-sensitive magnitude, or a pattern driven by one episode. I cannot choose between those descriptions before computing the checks."
      },
      {
        "type": "h",
        "text": "Use Inference to Express the Remaining Uncertainty"
      },
      {
        "type": "p",
        "text": "After defining a broader inferential target, I would compare a few understandable estimates. A t interval offers a transparent reference for a mean; its exact finite-sample justification assumes independent normal observations. Skewness, heavy tails, dependence and changing event distributions need assessment. Replacing the bootstrap with a t interval does not settle those questions."
      },
      {
        "type": "p",
        "text": "An event-level bootstrap can approximate a sampling distribution under assumptions connecting the empirical distribution to the target population. Hesterberg explains why ordinary percentile intervals can have poor small-sample coverage and distinguishes sampling error from simulation error. These are reasons to assess a particular interval, not to reject every resampling method. Resampling must also preserve the dependence relevant to the estimand."
      },
      {
        "type": "note",
        "text": "The old calculation used B = 5,000 resamples and the 5th and 95th percentiles for a nominal 90% interval. B controls Monte Carlo precision; n counts retained episode returns. Increasing B stabilizes the calculation without adding episodes. Nominal 90% is not verified 90% coverage. The code’s minimum of three observations was a computational guard, not a general threshold for reliable inference."
      },
      {
        "type": "p",
        "text": "A simple Bayesian model could make external information and structural assumptions explicit, provided prior sensitivity is shown. Precision supplied by those assumptions is not additional climate history. Permutation or randomization tests need a design or exchangeability conditions supporting their reference distribution; historical event labels do not provide that automatically."
      },
      {
        "type": "p",
        "text": "A mean interval, a next-event prediction interval, the fraction of bootstrap means above zero and a Bayesian posterior probability are different objects. Agreement among methods is useful evidence about method sensitivity, but those methods still share the same observations. None automatically incorporates measurement error, research selection or the risk of applying older episodes to a changed market."
      },
      {
        "type": "h",
        "text": "Build Evidence for the Next Episode"
      },
      {
        "type": "p",
        "text": "Prediction starts with a decision date. What event classification, prices and climate releases were available then? Final peak intensity can organize a retrospective description, but it cannot automatically serve as an early-event signal. NOAA’s diagnostic discussion archive provides releases back to 2001; it is a starting point for reconstructing information, not proof that the project possesses every historical information set since 1963."
      },
      {
        "type": "p",
        "text": "A validation ledger would record each training cutoff, signal time, available data, frozen rule, prediction and eventual outcome. Fitting, preprocessing and model selection must happen within the training information. Cawley and Talbot show how selection itself can bias performance evaluation. Training on later episodes to predict earlier ones also differs from an application that can only use the past."
      },
      {
        "type": "p",
        "text": "The deletion exercise above is an influence diagnostic. Evaluating a complete algorithm requires repeating its selection and fitting within each training fold. Even a chronological reconstruction remains retrospective when the full history has already influenced the research design. Setting aside familiar episodes afterwards cannot restore an unseen test. Future rules can be frozen and evaluated as genuinely new episodes arrive, with their small count reported honestly."
      },
      {
        "type": "p",
        "text": "There are other ways to learn while waiting. A longer comparable record can add episodes. Continuous ENSO and weather observations can inform timing and response shapes under additional modeling assumptions. Regional, commodity and monthly observations can illuminate exposure and mechanisms, though they share climate shocks. Independent measurements can verify prices or output without creating another ENSO repetition. External studies can constrain a model if their applicability is defended. These additions supply different kinds of information and reduce different uncertainties."
      },
      {
        "type": "h",
        "text": "State the Conclusion at the Strength the Evidence Supports"
      },
      {
        "type": "p",
        "text": "For palm kernel oil, the present evidence boundary is specific: the earlier report gave an interval based on six observed episode returns, while the revised coverage and sensitivity audit remains unfinished. That does not establish a representative sample, a stable effect size or a usable forecast. It also does not establish that ENSO has no relationship with returns."
      },
      {
        "type": "p",
        "text": "A completed report should name the episodes, exact price series, windows and benchmark; show the full returns and deletion results; and identify which reasonable choices change the interpretation. Its coverage assessment should distinguish directly observed situations from sparsely supported ones and extrapolation. The three central figures would be coverage, individual returns with deletion means, and specification sensitivity. They should contain computed results, not illustrative numbers dressed as findings."
      },
      {
        "type": "p",
        "text": "If the direction survives those checks but the magnitude does not, I would report a directional clue with an uncertain scale. If one episode drives the result, I would describe that episode’s contribution. If materially different outcomes remain compatible with the evidence, the conclusion is insufficient discrimination, not proof of no effect. A predictive claim would additionally name its decision time, test episodes, benchmark and costs."
      },
      {
        "type": "p",
        "text": "I would lower confidence if the ledger reveals selective coverage, a defensible window reverses the pattern, or future observations repeatedly contradict a frozen prediction. Small histories can support conditional judgments. The responsibility is to make the conditions and weak points visible, and to say what new evidence would change the judgment."
      }
    ],
    "sources": [
      {
        "name": "Earlier project report, as described in the original version of this essay: twelve eligible episodes, six retained for palm kernel oil and eight for US natural gas. Counts have not been re-audited in this revision."
      },
      {
        "name": "NOAA CPC, historical ONI episodes: definitions, revisions and the distinction from RONI",
        "href": "https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso/oni/v5/"
      },
      {
        "name": "NOAA CPC, ENSO Diagnostic Discussion Archive (directory begins in 2001)",
        "href": "https://www.cpc.ncep.noaa.gov/products/expert_assessment/ENSO_DD_archive.php"
      },
      {
        "name": "Simonsohn, Simmons & Nelson, Specification Curve Analysis (Nature Human Behaviour, 2020)",
        "href": "https://faculty.wharton.upenn.edu/wp-content/uploads/2016/11/33-Simonsohn-Simmons-Nelson-2020.pdf"
      },
      {
        "name": "Hesterberg, What Teachers Should Know About the Bootstrap (2015)",
        "href": "https://arxiv.org/html/1411.5279v1"
      },
      {
        "name": "Cawley & Talbot, On Over-fitting in Model Selection and Subsequent Selection Bias in Performance Evaluation (JMLR, 2010)",
        "href": "https://jmlr.org/papers/v11/cawley10a.html"
      },
      {
        "name": "Public El Niño research workbench",
        "href": "https://elnino.yujun.net/"
      }
    ]
  },
  {
    slug: 'el-nino-watch-not-trade',
    title: 'Why My El Niño Research Mostly Says Don’t Trade',
    topic: 'Measurement',
    status: 'published',
    publishedAt: '2026-10-16',
    readingTime: '5 min',
    excerpt:
      'A record El Niño, a trade everyone knows, and a research system that keeps answering “watch.” Split into three testable links, the story mostly fails, and the failures are the useful part.',
    relatedWork: 'el-nino-commodities',
    tldr: [
      'The Pacific index sat near +2.2 in early October 2026, a record for the time of year. The weekly evidence card still says watch, not trade.',
      'Taken apart into three testable links, the trade story mostly fails: palm oil rose after past peaks, rainfall did not improve output forecasts, and the effect did not reliably carry into US soybean oil futures.',
      'Twelve events in sixty years. The peak date is only visible afterwards, so it cannot be traded, and “not supported” is a result worth reporting.',
    ],
    body: [
      {
        type: 'p',
        text: 'A scheduled job rebuilds my El Niño evidence card every Tuesday. On 13 October 2026 it came back the way most of them do: watch, do not trade. The Pacific index stood near +2.2, higher for the time of year than any event in the record. In the latest complete month of rainfall data, Sarawak was in drought; Peninsular Malaysia and Sabah were not.',
      },
      {
        type: 'p',
        text: 'The trade that goes with a number like that is old and easy to say. A strong El Niño dries out Southeast Asia; oil palm yields fall some months later; palm oil gets expensive; and the soybean oil futures a US trader can actually buy follow it up. I built a research system to test that sentence link by link, because a sentence like that is usually several claims standing in a row, and only some of them are true.',
      },
      {
        type: 'table',
        caption: 'Results from the project’s pre-registered reports. The first row is lined up on the peak date, which is known only afterwards.',
        head: ['Link', 'Result', 'Verdict'],
        rows: [
          ['Palm oil price after the peak', '+16.7 log points above a metals index, 6–12 months after the peak; positive in 9 of 12 events', 'Supported, on spot prices lined up on the after-the-fact peak'],
          ['The same trade on palm oil futures', '+28.3% average in event years against −3.5% in other years; 4 of 4 event years positive', 'Supported, weakly: four events, and not blind'],
          ['Rainfall → output forecast', 'Beat a seasonal baseline at 0 of 4 forecast horizons', 'Not supported'],
          ['Climate signal → US soybean oil futures', 'No improvement, on three futures events', 'Not supported'],
          ['Event-year long on US soybean oil', '+0.5% average, 2 of 3 events positive; dropping one event flips the sign', 'Uncertain'],
        ],
      },
      {
        type: 'p',
        text: 'Palm oil prices did rise after strong peaks. The average was +16.7 log points against a metals index six to twelve months later, and the sign was positive in 9 of the 12 events. On palm oil futures the event years averaged +28.3% against −3.5% in other years. The mechanism is where the story loses its footing. Rainfall in the three growing regions beat a plain seasonal forecast at none of four horizons. And the US soybean oil contract that started the exercise moved +0.5% on average in event years, a number that turns negative if you drop one of the three events.',
      },
      {
        type: 'p',
        text: 'It is tempting to treat the chain as one physical fact, but the agronomy is looser than that. A study of 4,785 Malaysian estates from 2015 to 2023 tied lower yields to El Niño and La Niña extremes anywhere in the 23 months before harvest, not at a fixed lag. A signal that can arrive at any point across two years is hard to put on a calendar.',
      },
      {
        type: 'p',
        text: 'That is why the chain has to be split. A strong link will otherwise vouch for a weak one. I tested three questions that could each be rejected on their own: does rainfall in the three Malaysian growing regions improve a forecast of palm output, do palm oil prices rise after a strong peak, and does climate information add anything to US soybean oil futures. The price link held while the weather link failed. So the price rise cannot be credited to the drought mechanism I could measure, and rainfall maps turn out to be the wrong thing to watch for this trade. Had I tested the story as one claim, the price result would have carried the rest of it.',
      },
      {
        type: 'p',
        text: 'The sample is the second problem. Twelve moderate-or-stronger El Niño events have occurred since 1963. Three overlap the US soybean oil futures data I could use, and four overlap Chinese palm oil futures. It is easy to make that look larger. Test twenty-two commodities and you have 264 commodity-events; use monthly returns and you have thousands of rows. None of it creates new El Niño events. The commodities move together and the months inside one event are not independent, so a significance test that treats them as independent is measuring the number of rows, not the amount of knowledge. Every evaluation therefore holds out a whole event, and every result is printed as “k of n events” beside the average. Four out of four is encouraging. It is also four.',
      },
      {
        type: 'p',
        text: 'Then there is the date everyone lines events up on, which nobody could have traded. Studies of El Niño align events on the peak, but the peak is only visible after it has passed. In a replay that used only the data available in each month, the rule that confirms a peak, a half-degree fall from the high, fired two to three months after the real peak, and entering on that confirmation did clearly worse on the same events than a simple calendar rule. The system keeps two dates for that reason. The peak may describe history; a trading rule may only use the date an event was detectable, with execution after that information was published. Every input carries both its publication time and the time I captured it. The price result in the first row is anchored on the peak, which makes it a description of history rather than a rule anyone could have followed. The futures result needs its own caveats said out loud: I knew which years were event years before it ran, and subtracting a broad metals index roughly halves the event-year return, which says part of it was a general commodity rally.',
      },
      {
        type: 'p',
        text: 'With a sample that small, there is one more way to fool yourself: search. Lags, thresholds and feature sets were committed as code and a protocol document before results were pulled. Every specification I tried, including the failures, went into the report appendix. The 2010–2025 history was frozen after several rounds. The two later futures tests were registered in advance and run once each.',
      },
      {
        type: 'p',
        text: 'What I am watching now is narrow. The evidence card asks for the ocean signal and drought in the growing regions together. The ocean signal is there. Only one of the three regions is dry, so the card says watch. The next scheduled check comes in early January, when final rainfall for September through November is published, and what that check is allowed to change was written down in October, before anyone knows the answer. The 2026–27 event will make the count thirteen. It will not settle the question, and the system is arranged so that nobody, including me, gets to pretend otherwise. The habits carry over to product experiments: split a feature-to-revenue story into its links, count independent units rather than rows, never let an evaluation use information the decision could not have had, and decide when to stop before you start. A system that often says “watch” is reporting how often the evidence is actually there.',
      },
    ],
    sources: [
      { name: 'Project reports: event study; Sprints 4b, 5, 10 and 13; weekly report of Oct 13, 2026' },
      {
        name: 'Kamil et al., Nonlinear Impacts of Climate Anomalies on Oil Palm Productivity (Heliyon, 2024)',
        href: 'https://doi.org/10.1016/j.heliyon.2024.e35798',
      },
      { name: 'Public research workbench (licensed prices and trading state removed)', href: 'https://elnino.yujun.net/' },
    ],
  },
  {
    slug: 'offline-metric-wrong-launch-signal',
    title: 'When a Better Offline Metric Is the Wrong Launch Signal',
    topic: 'Measurement',
    status: 'published',
    publishedAt: '2026-09-08',
    readingTime: '6 min',
    excerpt:
      'A model can beat the incumbent on the test set and still be the wrong model to ship. The overall score describes typical traffic; the launch usually turns on a thin slice, or on a failure the logs were never built to show.',
    relatedWork: 'recommendation-quality',
    tldr: [
      'A candidate wins the held-out set by about two points and loses the slice the product cares about by ten.',
      'An overall score is an estimate about typical traffic. Launch decisions turn on small slices and on failures the logged data cannot show, and the evidence on both is thinner than the headline.',
      'Three things have to be true before an offline win counts: slices named in advance, the metric’s blind spots written down, and guardrails with a threshold and a consequence.',
    ],
    body: [
      {
        type: 'p',
        text: 'The review goes like this. The new model scores 81.35% on the held-out set, the one in production 79.0%. The sample is large, the win is clean, and the room would like to ship. Before I read the score I ask what the sample was drawn from. The number answers a question about typical traffic. The launch is usually deciding something narrower: a group of users the product worries about, or a kind of failure the test set was never built to show.',
      },
      {
        type: 'p',
        text: 'Split those two scores by slice and the disagreement becomes arithmetic.',
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
        text: 'The candidate wins overall, 81.35% to 79.0%, because 95% of the population is ordinary traffic and it gains three points there. On the high-risk slice, 5% of the population, it drops from 60% to 50%. Both sentences come from the same table. Which one decides the launch depends on what the evaluation is for, and the overall number cannot tell you that.',
      },
      {
        type: 'p',
        text: 'Treating the held-out score as the launch signal, with a few guardrails on the readout, is a reasonable default. A sample drawn from typical traffic is the right sample for typical performance, and a large sample makes the average precise. Precision on the average says very little about precision where the decision turns.',
      },
      {
        type: 'p',
        text: 'The sample is built for the average, so it is weakest exactly where the decision is. In an evaluation set of 2,000 items, a 5% slice holds 100. At an accuracy near 55%, the standard error on that slice is about five points; a 95% interval runs roughly ten points either side, wide enough to hide the regression in the table. This is not only a teaching problem. Oakden-Rayner and colleagues named it hidden stratification in medical imaging: models with strong overall scores that failed on clinically important subsets, with gaps above 20% on some of them. The repair is cheap. Oversample the slice so it supports its own estimate, weight back for the population figure, and report both with their intervals.',
      },
      {
        type: 'p',
        text: 'Some failures cannot be seen offline however you sample, because the offline metric is built from what the old system showed people. A recommendation model scored on engagement will happily lean on creators a viewer already likes. That scores well, and it may show the same few creators all night. Engagement per item rises while the session narrows, and the logs cannot tell the two apart. Chaney, Stewart and Engelhardt showed in simulation that training and evaluating on data shaped by an existing recommender makes behavior more uniform without making it more useful, and that it biases the held-out estimate. Garcin and colleagues found the gap live at swissinfo.ch: popular-story recommendations looked best offline and did worst online, while methods that ranked lower offline lifted click-through by up to 35%. The readout therefore needs separate measures for what the main metric cannot see, such as repetition, concentration of supply, and how much scrolling a viewer does before finding something worth watching. They are proxies. They fail in a different direction from the main metric, which is the only reason to keep them.',
      },
      {
        type: 'p',
        text: 'A guardrail only works if it can stop something. One that never blocks a launch is not automatically useless; the risk may not have happened, or the design may already have avoided it. What makes it decoration is having no named failure, no threshold and no consequence, or being so noisy that it could never leave its own interval. Kohavi, Tang and Xu make the same point in their book on online experiments: guardrails exist to catch harm the main metric misses, and they need the power to see harm at a size that would change the decision.',
      },
      {
        type: 'p',
        text: 'Before anyone reads the results I ask for four things. Name the population and the slices, and say how they differ from the people the launch affects. Say what the candidate is compared against, and whether the comparison holds fixed something the launch will not. Pick one primary metric with its denominator, and say what it cannot see. Give every guardrail a failure mode, a threshold, and what crossing it triggers. “Escalate for discussion” is a consequence. “Note it” is not. None of this makes an offline win worthless. It makes the win a claim about a specific population and a specific outcome, which is the only form anyone can check.',
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
    title: 'A Tag Is Not a Lift',
    topic: 'Measurement',
    status: 'published',
    publishedAt: '2026-09-08',
    readingTime: '6 min',
    excerpt:
      'A correct tag, a tag that predicts performance, and an attribute that causes better results are three different claims. Most creative insight is one of the first two, described in the language of the third.',
    relatedWork: 'creative-evidence-lab',
    tldr: [
      'A creative tool makes three claims that sound like one: the tag is right, the tag predicts performance, and changing the attribute changes the outcome.',
      'Most creative “insight” is a correct tag or a prediction wearing the language of cause. In Facebook’s own experiments, observational estimates of ad lift were often off by a factor of three.',
      'Only a randomized test of two otherwise identical versions shows an effect, and the platform’s split test is not as random as it looks.',
    ],
    body: [
      {
        type: 'p',
        text: 'Here is a fifteen-second ad. The logo appears in a corner at 0:02. A voiceover says the brand name at 0:06. A call to action appears on screen at 0:12 and is spoken at 0:13. A creative tool will tag all of it, tell you which tags go with better results, and suggest you move the brand earlier. That is three claims stacked on one another, and the evidence thins as you climb.',
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
        text: 'Each row asks for more than the one above it. A correct tag says nothing about performance. A tag that predicts performance says nothing about what would happen if you changed it. Dashboards step between them anyway: tagging accuracy, then a correlation with return on ad spend, then a recommendation that inherits the confidence of the first number.',
      },
      {
        type: 'p',
        text: 'Tag accuracy is mostly a definition problem, and it has to be measured one tag at a time. Ask two annotators for the first brand appearance in the ad above. One says 0:02, reading the corner logo. The other says 0:06, on the grounds that a logo too small to notice is not an appearance the viewer experiences. Both are being careful. The definition failed, not the people. The repairs are unglamorous: record visual and spoken brand presence as separate fields, tie every tag to a time range and a frame or transcript reference, and keep “absent” and “not detected” as different values. Then report accuracy per tag. A blended accuracy of 91% is compatible with a call-to-action tag at 99% and a first-brand-appearance tag at 62%, and the second is the one every downstream analysis is about to use. Sample size matters as much. Zero errors on a pilot of thirty assets still leaves a 95% upper bound of about 10% on the error rate.',
      },
      {
        type: 'p',
        text: 'A tag that predicts performance is usually standing in for who made the ad and how it was delivered. Large brands reveal early as house style. They also buy better placements, reach warmer audiences and run stronger offers, and any of those can explain a return-on-ad-spend gap. Gordon, Zettelmeyer, Bhargava and Chapsky compared observational estimates with randomized results across 15 advertising experiments at Facebook, covering 1.6 billion impressions. The observational methods often failed to recover the experimental effect even with rich data on users, and in half the studies the estimate was off by a factor of about three. A predictive claim therefore has to beat a ladder of baselines: the advertiser’s historical rate, then a model that knows the delivery context before launch, then that model plus the tags. Only the last step measures what the tags add. Hold out whole creative families and later time periods, or near-copies of the same ad land on both sides of the split. Pick one target, because click-through, conversion rate and return on ad spend have different denominators.',
      },
      {
        type: 'p',
        text: 'Only an intervention shows that changing the attribute changes the outcome, and it has to be narrow enough to read. Two versions of the same edit, brand at 0:06 in one and 0:02 in the other, with the same offer, call to action, length and audio. The trap is the platform’s own split test. Braun and Schwartz showed in the Journal of Marketing that ad platforms deliver each version to a differently optimized mix of users during the test, so the “winner” may simply have reached people more likely to respond. A later study found the problem in Meta’s A/B tests specifically, not in lift tests with a holdout group. If the only real randomization sits at campaign or regional level, that cluster is the unit and the power calculation has to use it. The outcome should be conversions per assigned unit, not conversion rate among clickers, since the change can alter who clicks in the first place.',
      },
      {
        type: 'p',
        text: 'Before I repeat a creative finding, I ask which of the three claims it is. A tag: do I know its agreement, and on how many assets? A prediction: does it beat a baseline that already knows the delivery context? A causal claim: is there a recorded random assignment behind it? Saying which one you have is not a hedge. It is the content of the finding.',
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
      'An LLM judge that gates a release is a measuring instrument. Agreeing with itself shows consistency, not correctness.',
      'Judges have known biases. Swapping the order of two answers let one model beat ChatGPT on 66 of 80 questions, and longer answers get rewarded for their length.',
      'Score grounding, task completion and unsupported recommendations separately, compare against blind human ratings, and let the disagreements decide what the judge may grade alone.',
    ],
    body: [
      {
        type: 'p',
        text: 'More teams let a language model grade another model’s answers and use the grade to decide what ships. The judge gets less scrutiny than the system it judges. The standard check is that it gives the same score on repeated runs. That shows the judge is consistent. A judge with the generator’s blind spots will be consistent about them.',
      },
      {
        type: 'p',
        text: 'Two answer pairs, both written to be hard in the way that matters. Decide which answer in each pair is better before reading on.',
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
        text: 'In Task A every number is right and the recommendation is still wrong, because return on money already spent says nothing about the return on the next dollar. In Task B, B2 is longer, better organized, more decisive, and it invents its key numbers; B1 is the correct answer to an underspecified question. A judge that scores grounding likes A1. A judge impressed by length and confidence likes B2. Neither answer is one a user could act on.',
      },
      {
        type: 'p',
        text: 'The usual defense is that judges agree with people about as often as people agree with each other. Zheng and colleagues found GPT-4 matched human experts about 85% of the time on MT-Bench with ties excluded, against 81% agreement between the humans. I take that result seriously. It is also an average over one benchmark, and later work on when to trust a judge found GPT-4 almost never reaching 80% agreement with people on a subset of Chatbot Arena. An average is exactly the number that hides the two cases above.',
      },
      {
        type: 'p',
        text: 'One score cannot hold these answers, because the dimensions move in opposite directions. Grounding asks whether every factual sentence traces to the evidence. Both Task A answers pass; B2 fails. Task completion asks whether the user could act on the answer and get what they came for. A1 and B2 fail. A third check, whether the answer recommends something the evidence does not support, catches A1, which is fully grounded and still draws the wrong inference. There is outside evidence that a blended score drifts toward surface features. When Dubois and colleagues controlled AlpacaEval’s judge scores for answer length, the benchmark’s rank correlation with Chatbot Arena’s human votes rose from 0.94 to 0.98, which means length had been moving the scores.',
      },
      {
        type: 'p',
        text: 'Procedure matters as much as the rubric, because judges react to things that should not matter. Wang and colleagues found that simply swapping the order of two answers changed verdicts often enough for Vicuna-13B to beat ChatGPT on 66 of 80 questions with ChatGPT as the judge. So I score blind, with no model names in the context; swap the order of answers across items; have humans score on the same rubric before anyone sees the judge’s output, since reading the judge first anchors the people; and report agreement per dimension, never as one blended figure. A judge can track people closely on grounding and barely at all on task completion, which is the case where an average misleads most.',
      },
      {
        type: 'p',
        text: 'The disagreements are the useful output, and their direction tells you what to fix. Where the judge is more generous than people, you are looking at the failures it will let through, usually fluent answers that miss the task. Where it is harsher, the rubric is often underspecified, and two people disagreeing on one item is a reason to rewrite the rubric, not to average them. What you end up with is a decision about which errors the judge may grade alone and which go to a person regardless of score. The “Trust or Escalate” work does the same thing formally: the judge abstains and escalates when its confidence is too low to hold agreement with people above a target. A judge that handles the easy, high-volume cases and escalates the rest is worth having. One trusted everywhere because its overall agreement looked good is a release gate with a hole in it.',
      },
      {
        type: 'p',
        text: 'Before a judge’s score gates anything, I want to name a failure it is known to miss and say where that failure goes instead. I want to know the human comparison was collected blind, before the judge’s output was visible. I want agreement per dimension, with the model version, prompt and tie-breaking rule recorded. And if the judge and the people disagree next quarter, I want to be able to say whether the model drifted or the rubric was ambiguous all along. The answer pairs above are teaching cases I wrote; this piece reports no judge scores of my own, because a number I had not computed would undercut the argument. The exercise costs an afternoon and two dozen carefully written items, and it tells you which of your quality gates is doing the work.',
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
      'Two claims can name the same company and still be telling different stories. A set of paired examples shows how to tell over-merging from over-splitting, and how to write an annotation rule that does not confuse shared vocabulary with shared meaning.',
  },
  {
    slug: 'llm-versus-deterministic-rule',
    title: 'When Should an LLM Replace a Deterministic Rule?',
    topic: 'AI Evaluation',
    status: 'drafting',
    excerpt:
      'A rule is predictable and brittle. A model is flexible and inconsistent. The comparison uses short claims full of negation and stance shifts, and counts what each approach costs in errors, review time, money and latency.',
  },
  {
    slug: 'no-errors-is-not-healthy',
    title: 'No Errors Is Not the Same as a Healthy Pipeline',
    topic: 'Building',
    status: 'drafting',
    excerpt:
      'Clean logs prove nothing. A pipeline can report no errors while its data goes stale and its coverage quietly retreats, which is why the health check has to be staleness and coverage, not the absence of exceptions.',
    relatedWork: 'churchmap',
  },
  {
    slug: 'narrative-changed-did-evidence-change',
    title: 'A Narrative Changed. Did the Evidence Change?',
    topic: 'AI Evaluation',
    status: 'planned',
    excerpt:
      'A stronger headline is not new evidence. The piece separates a louder repost from a new disclosure and from a genuine reversal, because new disclosures and genuine reversals can change the evidence, while a louder repost may not.',
  },
  {
    slug: 'model-confident-should-product-be',
    title: 'The Model Is Confident. Should the Product Be?',
    topic: 'AI Evaluation',
    status: 'planned',
    excerpt:
      'Self-reported confidence is not a calibrated probability. What an interface is allowed to assert depends on how well the score is calibrated and what a human review costs.',
    relatedWork: 'creative-evidence-lab',
  },
  {
    slug: 'evaluating-ai-memory',
    title: 'Evaluating AI Memory Beyond Retrieval Accuracy',
    topic: 'AI Evaluation',
    status: 'planned',
    excerpt:
      'Stale memories, contradictions and corrections break an assistant more often than a missed retrieval does, and a small benchmark can cover all three.',
    relatedWork: 'debrief',
  },
  {
    slug: 'dashboard-should-end-in-a-decision',
    title: 'The Dashboard Should End in a Decision',
    topic: 'Building',
    status: 'planned',
    excerpt:
      'A metric that names no action is decoration. The test is whether the person using the surface finishes the task faster, not whether the redesign looks better.',
  },
  {
    slug: 'cold-start-is-a-scope-decision',
    title: 'Cold Start Is a Product Scope Decision',
    topic: 'Building',
    status: 'planned',
    excerpt:
      'Cold start is usually a scoping problem. Narrow the first user and the fields a visit requires, and it becomes something you can test rather than something you have to solve.',
    relatedWork: 'churchmap',
  },
  {
    slug: 'json-files-to-a-database',
    title: 'From JSON Files to a Database: What Actually Forced the Move?',
    topic: 'Building',
    status: 'planned',
    excerpt:
      'Volume rarely forces a move off JSON files. Query patterns do, and so do update semantics, consistency and replay.',
  },
  {
    slug: 's3-needs-a-table-layer',
    title: 'Why S3 Needs a Table Layer for Transactions',
    topic: 'Building',
    status: 'planned',
    excerpt:
      'The case for a table format is transactions, not scale. Single-row updates, snapshots and concurrent commits are what S3 cannot do on its own.',
  },
  {
    slug: 'tuesday-boy-is-about-sampling',
    title: 'Why the Tuesday-Boy Puzzle Is Really About Sampling',
    topic: 'Measurement',
    status: 'planned',
    excerpt:
      'The Tuesday-boy puzzle is an argument about how the information was generated, not about arithmetic. A small simulation makes both readings concrete.',
  },
  {
    slug: 'testing-a-thesis-without-looking-ahead',
    title: 'Testing a Market Thesis Without Looking Ahead',
    topic: 'Measurement',
    status: 'planned',
    excerpt:
      'A backtest is only as good as its availability times. Confounding and survivorship decide whether the result means anything; this is a method piece, not a stock list.',
  },
  {
    slug: 'forecasts-to-product-evaluation',
    title: 'From Food-Security Forecasts to AI Product Evaluation',
    topic: 'Measurement',
    status: 'planned',
    excerpt:
      'A forecast that fails to generalize costs a program. A model that fails to generalize costs a launch. The piece maps one problem onto the other.',
  },
  {
    slug: 'where-should-the-next-ad-dollar-go',
    title: 'Where Should the Next Advertising Dollar Go?',
    topic: 'Measurement',
    status: 'planned',
    excerpt:
      'Ranking channels by observed return answers a different question from where the next dollar should go. The budget decision needs marginal return and saturation, tested at the spend level.',
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
