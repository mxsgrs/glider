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
import SaveEstimate from "./save-estimate";

import { Estimate } from '@/types/estimate';

const estimate: Estimate = {
  estimateId: 349792,
  userCredentialsId: 67890,
  subjectMatter: 'Car renovation',
  creationDate: new Date(),
  updateDate: new Date(),
  estimateDetail: [
    {
      estimateDetailId: 1,
      estimateId: 101,
      rawDescription: "Install new electrical wiring",
      quantity: 100,
      unitPrice: 25.5,
      creationDate: new Date("2023-01-15"),
      updateDate: new Date("2023-01-20"),
    },
    {
      estimateDetailId: 2,
      estimateId: 102,
      rawDescription: "Plumbing work for kitchen sink",
      quantity: 50,
      unitPrice: 30.0,
      creationDate: new Date("2023-02-01"),
    },
    {
      estimateDetailId: 3,
      estimateId: 103,
      rawDescription: "Painting interior walls",
      quantity: 200,
      unitPrice: 10.0,
      creationDate: new Date("2023-03-05"),
      updateDate: new Date("2023-03-10"),
    },
    {
      estimateDetailId: 4,
      estimateId: 104,
      rawDescription: "Floor tiling",
      quantity: 150,
      unitPrice: 12.5,
      creationDate: new Date("2023-04-10"),
      updateDate: new Date("2023-04-12"),
    },
    {
      estimateDetailId: 5,
      estimateId: 105,
      rawDescription: "Roofing repair",
      quantity: 75,
      unitPrice: 50.0,
      creationDate: new Date("2023-05-01"),
    },
  ],
  estimateCompany: [
    {
      estimateCompanyId: 1,
      estimateId: 349792,
      estimateCompanyParty: 'Issuer',
      businessName: 'Sample Company',
      businessAddress: '123 Sample St',
      phone: '+33 7 83 92 04 94',
      email: 'contact@samplecompany.com',
      taxNumber: 'TAX123456',
      siretNumber: 'SIRET123456',
      sirenNumber: 'SIREN123456',
    },
    {
      estimateCompanyId: 2,
      estimateId: 349792,
      estimateCompanyParty: 'Recipient',
      businessName: 'Sample Company',
      businessAddress: '123 Sample St',
      phone: '+33 7 09 92 18 94',
      email: 'contact@samplecompany.com',
      taxNumber: 'TAX123456',
      siretNumber: 'SIRET123456',
      sirenNumber: 'SIREN123456',
    },
  ],
};

export default function Page() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <PageHeader title="Estimate online" subtitle="Create an estimate for your business." />
      <SaveEstimate estimate={estimate} />
    </div>
  )
}