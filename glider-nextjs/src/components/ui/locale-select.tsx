'use client'

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/routing";
import { Locale, usePathname, useRouter } from "@/routing";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function LocaleSelect() {
    const t = useTranslations('locales');
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();

    const changeLocale = (value: string) => {
        const nextLocale = value as Locale;
        router.push(pathname, { locale: nextLocale });
    }

    return (
        <Select defaultValue={locale} onValueChange={changeLocale}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                {routing.locales.map((cur) => (
                    <SelectItem key={cur} value={cur}>
                        {t(cur)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}