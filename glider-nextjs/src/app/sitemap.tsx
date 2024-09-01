import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://glider-logistics.com/estimate',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://glider-logistics.com/en/estimate',
          fr: 'https://glider-logistics.com/fr/estimate',
        },
      },
    },
  ]
}