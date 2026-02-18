import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.selfhealing.space',
      lastModified: new Date('2026-02-18'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.selfhealing.space/test',
      lastModified: new Date('2026-02-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.selfhealing.space/privacy',
      lastModified: new Date('2026-01-15'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
