// Metadata
import type { Metadata } from "next"
import AppMetadata from "@/components/ui/app-metadata";
import { LocaleParams } from "@/types/locale-params";

const page = 'estimate';

export async function generateMetadata({ params: { locale } }: LocaleParams): Promise<Metadata> {
  return await AppMetadata({ params: { locale, page } });
}

// Page
import Content from "./content";

export default function Page() {
  return (
    <Content />
  )
}