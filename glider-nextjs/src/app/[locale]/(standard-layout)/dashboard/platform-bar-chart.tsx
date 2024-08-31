'use client'

import { useTranslations } from 'next-intl'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart'
import HeadingTwo from '@/components/ui/heading-two'
const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
]

export default function PlatformBarChart() {
    const t = useTranslations('home')

    const chartConfig = {
        desktop: {
            label: t('desktop'),
            color: '#a1c2d1',
        },
        mobile: {
            label: t('mobile'),
            color: '#172333',
        },
    } satisfies ChartConfig
    

    return (
        <div>
            <HeadingTwo title={t('platforms')} />
            <ChartContainer config={chartConfig} className="aspect-auto h-[358px] w-full mt-4">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}