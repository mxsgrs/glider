// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";

const page = 'estimate';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
  return await AppMetadata({ params: { locale, page } });
}

// Page
import PageHeader from "@/components/ui/page-header";
import Pdf from "./pdf";

export default function Page() {
  return (
    <div>
      <PageHeader title="Estimate online" subtitle="Create an estimate for your business." />
      <Pdf />
    </div>
  )
}