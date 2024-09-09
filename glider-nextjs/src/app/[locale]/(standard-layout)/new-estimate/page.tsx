// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";
import { useTranslations } from "next-intl";

const page = 'newEstimate';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
  let path = "new-estimate";
  return await AppMetadata({ params: { locale, page, path } });
}

// Page
import PageHeader from "@/components/ui/page-header";
import EstimateForm from "./estimate-form";

export default function Page() {
  const t = useTranslations('newEstimate');

  return (
    <div className="max-w-screen-2xl mx-auto">
      <PageHeader title={t('newEstimateOnline')} subtitle={t('estimateForBusiness')} />
      <EstimateForm />
    </div>
  );
}