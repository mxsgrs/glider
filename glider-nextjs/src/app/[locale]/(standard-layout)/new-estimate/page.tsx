// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";
import { useTranslations, useLocale } from "next-intl";

const page = 'newEstimate';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
  return await AppMetadata({ params: { locale, page } });
}

// Page
import PageHeader from "@/components/ui/page-header";
import EstimateForm from "./estimate-form";

export default function Page() {
  const t = useTranslations('newEstimate');
  const locale = useLocale();

  return (
    <div className="max-w-screen-2xl mx-auto">
      <PageHeader title={t('newEstimateOnline')} subtitle={t('estimateForBusiness')} />
      <EstimateForm locale={locale} />
    </div>
  );
}