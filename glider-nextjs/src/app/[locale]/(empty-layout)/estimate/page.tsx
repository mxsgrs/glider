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
    estimateId: 12345,
    userCredentialsId: 67890,
    subjectMatter: 'Car renovation',
    creationDate: new Date(),
    updateDate: new Date(),
    estimateDetail: [
        {
            estimateDetailId: 1,
            estimateId: 12345,
            rawDescription: 'Big wheel',
            quantity: 4,
            unitPrice: 120,
        },
        {
            estimateDetailId: 2,
            estimateId: 12345,
            rawDescription: 'Door',
            quantity: 1,
            unitPrice: 300,
        },
    ],
    estimateCompany: [
        {
            estimateCompanyId: 1,
            estimateId: 12345,
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
            estimateId: 12345,
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