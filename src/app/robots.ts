import type { MetadataRoute } from 'next';
import { getSite, shouldIndexSite } from '@/lib/portfolio';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const site = getSite();
  const canIndex = shouldIndexSite();

  return {
    rules: canIndex
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: canIndex ? `${site.url}/sitemap.xml` : undefined,
  };
}
