import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://glider-logistics.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://glider-logistics.com/en',
          fr: 'https://glider-logistics.com/fr',
        },
      },
    },
    {
      url: 'https://glider-logistics.com/login',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://glider-logistics.com/en/login',
          fr: 'https://glider-logistics.com/fr/login',
        },
      },
    },
  ]
}