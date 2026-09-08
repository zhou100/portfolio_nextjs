import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const outputDirectory = path.resolve('out');

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const resolved = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(resolved) : [resolved];
  });
}

function routeFor(file) {
  const relative = path.relative(outputDirectory, file).replaceAll(path.sep, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/(?:\/index)?\.html$/, '')}`;
}

function targetFor(pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\//, '');
  const candidates =
    pathname === '/'
      ? [path.join(outputDirectory, 'index.html')]
      : [
          path.join(outputDirectory, relative),
          path.join(outputDirectory, `${relative}.html`),
          path.join(outputDirectory, relative, 'index.html'),
        ];

  return candidates.find((candidate) => existsSync(candidate));
}

if (!existsSync(outputDirectory)) {
  console.error('Static output is missing. Run npm run build before npm run check:links.');
  process.exit(1);
}

const htmlFiles = walk(outputDirectory).filter((file) => file.endsWith('.html'));
const failures = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const sourceRoute = routeFor(file);

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:)/.test(href)) continue;

    const url = new URL(href, `https://static.local${sourceRoute}`);
    const target = targetFor(url.pathname);

    if (!target) {
      failures.push(`${sourceRoute}: ${href} has no exported target`);
      continue;
    }

    if (url.hash && target.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      const targetHtml = readFileSync(target, 'utf8');
      if (!targetHtml.includes(`id="${id}"`)) {
        failures.push(`${sourceRoute}: ${href} has no matching anchor`);
      }
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Checked internal links and anchors across ${htmlFiles.length} exported HTML files.`);
