// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";

const page = 'payments';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
  return await AppMetadata({ params: { locale, page } });
}

// Page
import PageHeader from "@/components/ui/page-header"
import { DataTable } from "./data-table"

export default function Page() {
    return (
        <div>
            <PageHeader title="Payment status" subtitle="Check user payments in real time." />
            <DataTable />
        </div>
    )
}