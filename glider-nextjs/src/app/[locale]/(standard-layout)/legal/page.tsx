// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";
import { useTranslations } from "next-intl";

const page = 'legal';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
    let path = "legal";
    return await AppMetadata({ params: { locale, page, path } });
}

export default function Page() {
    const t = useTranslations(page);

    return (
        <div className="max-w-screen-xl mx-auto">
            <div className="sm:max-w-xl md:max-w-2xl py-16 mx-4">
                <h1 className="text-[1.375rem] font-semibold">{t('mentionLegales')}</h1>
                <div className="mt-12">
                    <section className="mt-8">
                        <h2 className="font-semibold text-[1.1rem]">{t('article1Title')}</h2>
                        <p className="mt-4">
                            {t('article1Content')}
                        </p>
                        <p className="mt-4">
                            {t('article1Contact')}
                        </p>
                    </section>
                    <section className="mt-8">
                        <h2 className="font-semibold text-[1.1rem]">{t('article2Title')}</h2>
                        <p className="mt-4">
                            {t('article2Content')}
                        </p>
                    </section>
                    <section className="mt-8">
                        <h2 className="font-semibold text-[1.1rem]">{t('article3Title')}</h2>
                        <p className="mt-4">
                            {t('article3Content')}
                        </p>
                    </section>
                    <section className="mt-8">
                        <h2 className="font-semibold text-[1.1rem]">{t('article4Title')}</h2>
                        <p className="mt-4">
                            {t('article4Content')}
                        </p>
                    </section>
                    <section className="mt-8">
                        <h2 className="font-semibold text-[1.1rem]">{t('article5Title')}</h2>
                        <p className="mt-4">
                            {t('article5Content')}
                        </p>
                    </section>
                    <section className="mt-8">
                        <h2 className="font-semibold text-[1.1rem]">{t('article6Title')}</h2>
                        <p className="mt-4">
                            {t('article6Content')}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}