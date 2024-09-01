'use client'

import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import HeadingTwo from '@/components/ui/heading-two'

const chartData = [
    { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 190, fill: 'var(--color-other)' },
]

const chartConfig = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
        color: '#a1c2d1',
    },
    safari: {
        label: 'Safari',
        color: '#172333',
    },
    firefox: {
        label: 'Firefox',
        color: '#73abd0',
    },
    edge: {
        label: 'Edge',
        color: '#c9d2e1',
    },
    other: {
        label: 'Other',
        color: '#4e5d72',
    },
} satisfies ChartConfig

export function BrowserPieChart() {
    const t = useTranslations('dashboard')

    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <div>
            <HeadingTwo title={t('browsers')} />
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[335px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="visitors"
                        nameKey="browser"
                        innerRadius="40%"
                        strokeWidth={5}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="fill-foreground text-3xl font-bold"
                                            >
                                                {totalVisitors.toLocaleString()}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className="fill-muted-foreground"
                                            >
                                                {t('visitors')}
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    )
}