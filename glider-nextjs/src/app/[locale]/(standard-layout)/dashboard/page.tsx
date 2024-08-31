// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";

const page = 'dashboard';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
  return await AppMetadata({ params: { locale, page } });
}

// Page
import PageHeader from "@/components/ui/page-header"
import Dashboard from "./dashboard"
import { useTranslations } from "next-intl"

export default function Page() {
    const t = useTranslations('home')

    return (
        <div>
            <PageHeader title={`${t('hello')} Robert`} subtitle={t('followUpBusiness')} />
            <Dashboard />
        </div>
    )
}