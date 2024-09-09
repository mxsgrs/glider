import { useTranslations } from 'next-intl';
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ['latin']
});

export default function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    const t = useTranslations('footer');

    return (
        <footer className="bg-primary text-white">
            <div className="max-w-screen-2xl px-4 py-16 space-y-8 lg:space-y-16 mx-auto">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className={`text-[2.625rem] md:text-5xl lg:text-6xl ${bebasNeue.className}`}>Glider</div>
                        <p className="mt-2 max-w-xs text-gray-400">
                            {t('description')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div>
                            <p className="font-medium">{t('legal')}</p>
                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="/legal" className="text-gray-400 transition hover:opacity-75">{t('legalNotices')}</a>
                                </li>
                                <li>
                                    <a href="/privacy-policy" className="text-gray-400 transition hover:opacity-75">{t('privacyPolicy')}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-500">&copy; {year}. Orion Applications. {t('allRightsReserved')}.</p>
            </div>
        </footer>
    )
}