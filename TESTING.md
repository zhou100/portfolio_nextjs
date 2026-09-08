# Testing

The site uses Vitest and Testing Library for content contracts and shared component behavior. Run the same checks used in CI with:

```bash
npm test
npm run check:narrative-example
npm run lint
npm run build
npm run check:links
```

`npm run test:watch` starts Vitest in watch mode. The Narrative check reruns the deterministic public fixture and fails when the checked-in output is stale. The link check runs after a production build and verifies every exported internal link and anchor.

Tests live beside the source they cover:

- `src/lib/content.test.ts` protects publishability, slug uniqueness, card and brief length, case order, public-claim boundaries, chronology, deployment metadata, and the fixture result.
- `src/app/components/Work/WorkCard.test.tsx` protects the compact, decision-first work card.

Keep assertions focused on public behavior and evidence boundaries. Do not snapshot whole pages or encode confidential result claims in fixtures.
