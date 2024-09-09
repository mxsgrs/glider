import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { MetadataParams } from "@/types/metadata-params"

export default async function AppMetadata({ params: { locale, page, path } }: MetadataParams): Promise<Metadata> {
  const tpage = await getTranslations({ locale, namespace: page })
  const twebsite = await getTranslations({ locale, namespace: 'website' })

  const domain = "https://glider-logistics.com";
  const canonical = `${domain}/${locale}/${path}`;
  const languages = ['fr', 'en'].reduce((acc, lang) => {
    acc[lang] = `${domain}/${lang}/${path}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: `${tpage('metadataTitle')}${twebsite('titleComplement')}`,
    description: tpage('metadataDescription'),
    alternates: {
      canonical: canonical,
      languages: languages,
    }
  }
}