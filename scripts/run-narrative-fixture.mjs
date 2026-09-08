import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const fixturePath = resolve('public/fixtures/narrative-evaluation-fixture-v1.json');
const outputPath = resolve('public/fixtures/narrative-baseline-output-v1.json');
const threshold = 0.15;

const stopwords = new Set([
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'because',
  'for',
  'from',
  'has',
  'have',
  'in',
  'is',
  'it',
  'its',
  'may',
  'more',
  'no',
  'not',
  'of',
  'on',
  'that',
  'the',
  'this',
  'to',
  'with',
]);

function tokens(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(/\s+/)
      .filter((token) => token && !stopwords.has(token)),
  );
}

function similarity(left, right) {
  const intersection = [...left].filter((token) => right.has(token)).length;
  const union = new Set([...left, ...right]).size;
  return union === 0 ? 0 : intersection / union;
}

function rounded(value) {
  return Number(value.toFixed(3));
}

function clusterPassages(passages) {
  const clusters = [];

  for (const passage of passages) {
    const passageTokens = tokens(passage.text);
    const target = clusters.find((cluster) =>
      cluster.passages.some(
        (member) => similarity(passageTokens, tokens(member.text)) >= threshold,
      ),
    );

    if (target) target.passages.push(passage);
    else clusters.push({ passages: [passage] });
  }

  return clusters.map((cluster, index) => ({
    id: `baseline-${index + 1}`,
    passageIds: cluster.passages.map((passage) => passage.id),
  }));
}

function buildOutput(fixture) {
  const predictedClusters = clusterPassages(fixture.passages);
  const clusterByPassage = new Map(
    predictedClusters.flatMap((cluster) =>
      cluster.passageIds.map((passageId) => [passageId, cluster.id]),
    ),
  );
  const passageById = new Map(fixture.passages.map((passage) => [passage.id, passage]));
  const evaluatedPairs = fixture.gold_pairs
    .filter((pair) => typeof pair.same_narrative === 'boolean')
    .map((pair) => {
      const score = similarity(
        tokens(passageById.get(pair.a).text),
        tokens(passageById.get(pair.b).text),
      );
      return {
        passageIds: [pair.a, pair.b],
        goldSameNarrative: pair.same_narrative,
        predictedSameNarrative: clusterByPassage.get(pair.a) === clusterByPassage.get(pair.b),
        tokenJaccard: rounded(score),
      };
    });
  const ambiguousPairs = fixture.gold_pairs
    .filter((pair) => pair.same_narrative === 'ambiguous')
    .map((pair) => ({
      passageIds: [pair.a, pair.b],
      goldLabel: 'ambiguous',
      predictedSameNarrative: clusterByPassage.get(pair.a) === clusterByPassage.get(pair.b),
      tokenJaccard: rounded(
        similarity(
          tokens(passageById.get(pair.a).text),
          tokens(passageById.get(pair.b).text),
        ),
      ),
      handling: 'Excluded from binary precision and recall.',
    }));

  const truePositives = evaluatedPairs.filter(
    (pair) => pair.goldSameNarrative && pair.predictedSameNarrative,
  ).length;
  const falsePositives = evaluatedPairs.filter(
    (pair) => !pair.goldSameNarrative && pair.predictedSameNarrative,
  ).length;
  const falseNegatives = evaluatedPairs.filter(
    (pair) => pair.goldSameNarrative && !pair.predictedSameNarrative,
  ).length;
  const trueNegatives = evaluatedPairs.filter(
    (pair) => !pair.goldSameNarrative && !pair.predictedSameNarrative,
  ).length;
  const precision = truePositives / (truePositives + falsePositives);
  const recall = truePositives / (truePositives + falseNegatives);
  const f1 = (2 * precision * recall) / (precision + recall);

  return {
    schemaVersion: 1,
    fixture: 'narrative-evaluation-fixture-v1.json',
    generatedBy: 'node scripts/run-narrative-fixture.mjs',
    baseline: {
      name: 'Single-link clustering over lowercase token Jaccard similarity',
      threshold,
      note: 'This deliberately simple baseline is deterministic and has no learned parameters.',
    },
    predictedClusters,
    pairwiseEvaluation: {
      evaluatedPairs: evaluatedPairs.length,
      ambiguousPairsExcluded: ambiguousPairs.length,
      truePositives,
      falsePositives,
      falseNegatives,
      trueNegatives,
      precision: rounded(precision),
      recall: rounded(recall),
      f1: rounded(f1),
    },
    evaluatedPairs,
    ambiguousPairs,
    errors: evaluatedPairs
      .filter((pair) => pair.goldSameNarrative !== pair.predictedSameNarrative)
      .map((pair) => ({
        type: pair.predictedSameNarrative ? 'over-merge' : 'over-split',
        passageIds: pair.passageIds,
        tokenJaccard: pair.tokenJaccard,
        explanation: pair.predictedSameNarrative
          ? 'The lexical baseline grouped propositions that the gold labels keep separate.'
          : 'The lexical baseline separated the same proposition because the passages use different surface wording.',
      })),
    boundary:
      'These metrics describe five binary-labelled pairs in one six-passage self-authored fixture and this deterministic baseline only. They do not estimate private-pipeline or production quality.',
  };
}

const fixture = JSON.parse(readFileSync(fixturePath, 'utf8'));
const output = `${JSON.stringify(buildOutput(fixture), null, 2)}\n`;

if (process.argv.includes('--check')) {
  const checkedIn = readFileSync(outputPath, 'utf8');
  if (checkedIn !== output) {
    console.error('Narrative baseline output is stale. Run npm run example:narrative.');
    process.exitCode = 1;
  } else {
    console.log('Narrative baseline output matches the public fixture.');
  }
} else {
  writeFileSync(outputPath, output);
  console.log(`Wrote ${outputPath}`);
}
