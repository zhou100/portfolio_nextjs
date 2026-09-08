import output from '../../public/fixtures/narrative-baseline-output-v1.json';
import fixture from '../../public/fixtures/narrative-evaluation-fixture-v1.json';
import { afterEach, describe, expect, it } from 'vitest';
import { getAbout, getSite, shouldIndexSite } from './portfolio';
import { articleHref, getArticles, getPublishedArticles } from './writing';
import { getFeaturedWork, getWork, getWorkBySlug, type Block } from './work';

function blockText(block: Block): string[] {
  switch (block.type) {
    case 'p':
    case 'h':
    case 'note':
      return [block.text];
    case 'list':
      return block.items;
    case 'deflist':
      return block.items.flatMap((item) => [item.term, item.detail]);
    case 'table':
      return [...block.head, ...block.rows.flat(), block.caption ?? ''];
    case 'template':
      return block.lines.flatMap((line) => [line.label, line.text]);
  }
}

describe('portfolio content contracts', () => {
  it('keeps work and article slugs unique', () => {
    const workSlugs = getWork().map((item) => item.slug);
    const articleSlugs = getArticles().map((article) => article.slug);

    expect(new Set(workSlugs).size).toBe(workSlugs.length);
    expect(new Set(articleSlugs).size).toBe(articleSlugs.length);
  });

  it('publishes only articles with full readable bodies', () => {
    expect(getPublishedArticles()).toHaveLength(3);

    getPublishedArticles().forEach((article) => {
      const body = article.body!.flatMap(blockText).join(' ');
      expect(body.trim().split(/\s+/).length, article.slug).toBeGreaterThanOrEqual(700);
      expect(articleHref(article)).toBe(`/writing/${article.slug}`);
    });

    getArticles()
      .filter((article) => article.status !== 'published')
      .forEach((article) => expect(articleHref(article)).toBeUndefined());
  });

  it('keeps every work-card contribution within the editorial target', () => {
    getWork().forEach((item) => {
      const wordCount = item.contribution.trim().split(/\s+/).length;
      expect(wordCount, item.slug).toBeGreaterThanOrEqual(35);
      expect(wordCount, item.slug).toBeLessThanOrEqual(55);
    });
  });

  it('keeps every featured 60-second brief under 100 words', () => {
    getFeaturedWork().forEach((item) => {
      const wordCount = [item.brief.problem, item.brief.contribution, item.brief.outcome]
        .join(' ')
        .trim()
        .split(/\s+/).length;

      expect(wordCount, item.slug).toBeLessThanOrEqual(100);
      expect(item.links?.caseStudy).toBe(`/work/${item.slug}`);
    });
  });

  it('orders each representative case around its content type', () => {
    expect(getWorkBySlug('recommendation-quality')!.sections.map(({ id }) => id)).toEqual([
      'problem',
      'contribution',
      'example',
      'method',
      'ask-me',
    ]);
    expect(getWorkBySlug('narrative-intelligence')!.sections.map(({ id }) => id)).toEqual([
      'task',
      'example',
      'observed',
      'evaluation',
      'next',
    ]);
    expect(getWorkBySlug('creative-evidence-lab')!.sections.map(({ id }) => id)).toEqual([
      'decision',
      'example',
      'design',
      'status',
      'next',
    ]);
  });

  it('keeps high-risk claims inside explicit public boundaries', () => {
    const recommendation = getWorkBySlug('recommendation-quality')!;
    const enterprise = getWorkBySlug('enterprise-ai-evaluation')!;
    const debrief = getWorkBySlug('debrief')!;

    expect(recommendation.evidenceType).toContain('reported-experience');
    expect(recommendation.dataNote).toMatch(/confidential definitions, data, and results/i);
    expect(enterprise.evidenceType).toContain('reported-experience');
    expect(enterprise.dataNote).toMatch(/reconstruction written for this page/i);
    expect(debrief.brief.outcome).toMatch(/early users beyond me/i);
    expect(debrief.dataNote).toMatch(/retention.*not measured/i);
  });

  it('labels teaching examples at the point of use', () => {
    const workCopy = JSON.stringify(getWork());

    expect(workCopy).toContain('Illustrative example');
    expect(workCopy).toContain('Illustrative reconstruction');
    expect(workCopy).toContain('six short passages I wrote by hand');
  });

  it('does not publish named employers or unsupported historical claims', () => {
    const publicCopy = JSON.stringify({
      site: getSite(),
      about: getAbout(),
      work: getWork(),
      articles: getArticles(),
    });
    const namedEmployers = [/\bMeta\b/i, /\bInstagram\b/i, /\bReels\b/i, /\bFacebook\b/i, /\bAnnalect\b/i];
    const unsupportedClaims = [
      'drove adoption across the team',
      'release stopped depending on demo impressions',
      'the failure mode that started this',
      'nothing here was re-run for this write-up',
      '2% measurable increase',
    ];

    namedEmployers.forEach((name) => expect(publicCopy).not.toMatch(name));
    unsupportedClaims.forEach((claim) => expect(publicCopy.toLowerCase()).not.toContain(claim));
  });

  it('keeps the verified chronology separate by role', () => {
    expect(getAbout().roles.map((role) => role.period)).toEqual([
      'July 2023 – present',
      'April 2022 – June 2023',
      'July 2020 – March 2022',
    ]);
    expect(getAbout().education[0].period).toBe('Completed May 2020');
  });
});

describe('narrative evaluation artifact', () => {
  it('keeps the checked-in baseline scoped to the public six-passage fixture', () => {
    expect(fixture.passages).toHaveLength(6);
    expect(output.pairwiseEvaluation).toEqual({
      evaluatedPairs: 5,
      ambiguousPairsExcluded: 1,
      truePositives: 1,
      falsePositives: 0,
      falseNegatives: 1,
      trueNegatives: 3,
      precision: 1,
      recall: 0.5,
      f1: 0.667,
    });
    expect(output.errors).toHaveLength(1);
    expect(output.errors[0]).toMatchObject({
      type: 'over-split',
      passageIds: ['p1', 'p2'],
    });
  });
});

describe('deployment metadata boundaries', () => {
  const originalEnvironment = {
    NO_INDEX: process.env.NO_INDEX,
    VERCEL_ENV: process.env.VERCEL_ENV,
    CF_PAGES_BRANCH: process.env.CF_PAGES_BRANCH,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };

  afterEach(() => {
    for (const [key, value] of Object.entries(originalEnvironment)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  it('blocks indexing for explicit, Vercel, and Cloudflare previews', () => {
    process.env.NO_INDEX = 'true';
    expect(shouldIndexSite()).toBe(false);

    process.env.NO_INDEX = 'false';
    process.env.VERCEL_ENV = 'preview';
    expect(shouldIndexSite()).toBe(false);

    delete process.env.VERCEL_ENV;
    process.env.CF_PAGES_BRANCH = 'feature/portfolio-review';
    expect(shouldIndexSite()).toBe(false);

    process.env.CF_PAGES_BRANCH = 'main';
    expect(shouldIndexSite()).toBe(true);
  });

  it('normalizes the configured canonical origin', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://portfolio.example/';
    expect(getSite().url).toBe('https://portfolio.example');
  });
});
