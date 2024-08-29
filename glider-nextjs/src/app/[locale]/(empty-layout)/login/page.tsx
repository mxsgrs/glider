import Content from './content';
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

interface Params {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  const tlogin = await getTranslations({ locale, namespace: 'login' });
  const twebsite = await getTranslations({ locale, namespace: 'website' });

  return {
    title: `${tlogin('metadataTitle')}${twebsite('titleComplement')}`,
    description: tlogin('metadataDescription')
  };
}


export default function Page() {
  return (
    <Content />
  );
}