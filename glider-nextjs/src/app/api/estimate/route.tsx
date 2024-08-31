import { NextResponse } from "next/server"
import { renderToStream } from '@react-pdf/renderer';
import EstimatePdf from "./estimate-pdf";
import { Estimate } from "@/types/estimate";

const sampleEstimate: Estimate = {
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
      phone: '123-456-7890',
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
      phone: '123-456-7890',
      email: 'contact@samplecompany.com',
      taxNumber: 'TAX123456',
      siretNumber: 'SIRET123456',
      sirenNumber: 'SIREN123456',
    },
  ],
};

export async function GET() {
    const estimate = await renderToStream(<EstimatePdf estimate={sampleEstimate} />)

    return new NextResponse(estimate as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=estimate.pdf',
      },
    });
}