import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // Public routes we WANT Google to index and rank
      allow: ['/', '/hall-of-fame', '/privacy', '/terms', '/login'],
      // Secure routes we MUST hide from search engines
      disallow: ['/dashboard/', '/admin/', '/api/'],
    },
    // Points Google directly to your map
    sitemap: 'https://developersfund.cosmolix.co.in/sitemap.xml',
  };
}