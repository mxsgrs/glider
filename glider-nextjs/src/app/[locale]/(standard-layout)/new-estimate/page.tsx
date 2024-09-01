// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";

const page = 'newEstimate';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
  return await AppMetadata({ params: { locale, page } });
}

// Page
import PageHeader from "@/components/ui/page-header";
import EstimateForm from "./estimate-form";

export default function Page() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <PageHeader title="Estimate online" subtitle="Create an estimate for your business." />
      <EstimateForm />
    </div>
  )
}