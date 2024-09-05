import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://glider-logistics.com/new-estimate',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: 'https://glider-logistics.com/en/new-estimate',
          fr: 'https://glider-logistics.com/fr/new-estimate',
        },
      },
    },
    {
      url: 'https://glider-logistics.com/legal',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: .8,
      alternates: {
        languages: {
          en: 'https://glider-logistics.com/en/legal',
          fr: 'https://glider-logistics.com/fr/legal',
        },
      },
    },
    {
      url: 'https://glider-logistics.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: .8,
      alternates: {
        languages: {
          en: 'https://glider-logistics.com/en/privacy-policy',
          fr: 'https://glider-logistics.com/fr/privacy-policy',
        },
      },
    },
  ]
}