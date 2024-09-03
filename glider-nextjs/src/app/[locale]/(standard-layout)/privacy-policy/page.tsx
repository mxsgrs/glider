// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";
import { useTranslations } from "next-intl";

const page = 'privacyPolicy';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
  return await AppMetadata({ params: { locale, page } });
}

// Page
export default function Page() {
    const t = useTranslations(page);

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="sm:max-w-xl md:max-w-2xl py-16 mx-4">
                <h1 className="text-xl font-semibold">{t('privacyPolicy')}</h1>
                <div className="mt-12">
                    <section className="mt-8">
                        <p>
                            {t('content')}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}