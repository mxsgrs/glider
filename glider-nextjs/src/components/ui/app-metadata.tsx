import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { MetadataParams } from "@/types/metadata-params"

export default async function AppMetadata({ params: { locale, page } }: MetadataParams): Promise<Metadata> {
  const tpage = await getTranslations({ locale, namespace: page })
  const twebsite = await getTranslations({ locale, namespace: 'website' })

  return {
    title: `${tpage('metadataTitle')}${twebsite('titleComplement')}`,
    description: tpage('metadataDescription')
  }
}