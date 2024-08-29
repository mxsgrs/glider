import PageHeader from "@/components/ui/page-header"
import Dashboard from "./(dashboard)/dashboard"
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  const thome = await getTranslations({ locale, namespace: 'home' });
  const twebsite = await getTranslations({ locale, namespace: 'website' });

  return {
    title: `${thome('metadataTitle')}${twebsite('titleComplement')}`,
    description: thome('metadataDescription')
  };
}

export default function Page() {
    return (
        <div>
            <PageHeader title="Hello Robert" subtitle="Following up your business." />
            <Dashboard />
        </div>
    )
}