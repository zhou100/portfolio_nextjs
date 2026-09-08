import type { MetadataRoute } from 'next';
import { getSite } from '@/lib/portfolio';
import { getWork } from '@/lib/work';
import { getPublishedArticles } from '@/lib/writing';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = getSite();
  const staticRoutes = ['/', '/work', '/writing', '/about'];

  return [
    ...staticRoutes.map((route) => ({
      url: `${url}${route === '/' ? '' : route}`,
      lastModified: '2026-09-08',
    })),
    ...getWork().map((item) => ({
      url: `${url}/work/${item.slug}`,
      lastModified: item.updatedAt,
    })),
    {
      url: `${url}/work/narrative-intelligence/example`,
      lastModified: '2026-09-08',
    },
    ...getPublishedArticles().map((article) => ({
      url: `${url}/writing/${article.slug}`,
      lastModified: article.publishedAt ?? '2026-09-08',
    })),
  ];
}
