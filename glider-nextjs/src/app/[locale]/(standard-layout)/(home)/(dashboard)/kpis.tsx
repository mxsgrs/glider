'use client'

import { useTranslations } from 'next-intl'
import HeadingTwo from '@/components/ui/heading-two'

const kpiData = [
    { title: 'revenue', value: 29749, variation: 93 },
    { title: 'products', value: 44, variation: 44 },
    { title: 'clients', value: 13, variation: 10 },
    { title: 'tickets', value: 9, variation: -178 },
];

export default function Kpis() {
    const t = useTranslations('home')

    return (
        <div className="p-3 md:flex rounded bg-card">
            {kpiData.map((kpi, index) => (
                <div key={index} className="p-3 mspace-y-3 md:flex-1">
                    <HeadingTwo title={t(kpi.title)} padding={0} />
                    <div className="mt-4">
                        <div className="text-4xl font-extrabold">{kpi.value}</div>
                        <div className="text-muted-foreground">{kpi.variation}% {t('thisMonth')}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}