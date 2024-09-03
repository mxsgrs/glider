export interface EstimateDetail {
    id: number;
    estimateId: number;
    rawDescription: string;
    quantity: number;
    unitPrice: number;
    creationDate?: Date;
    updateDate?: Date;
}

export interface EstimateCompany {
    id: number;
    estimateId: number;
    estimateCompanyParty: 'Issuer' | 'Recipient';
    businessName: string;
    businessAddress: string;
    phone: string;
    email: string;
    taxNumber: string;
    siretNumber: string;
    sirenNumber: string;
    creationDate?: Date;
    updateDate?: Date;
}

export interface Estimate {
    id: number;
    reference: string;
    userCredentialsId: number;
    logo: string;
    subjectMatter: string;
    creationDate?: Date;
    updateDate?: Date;
    expiracyDate?: Date;
    currency: string;
    taxRate: number;
    conditions: string;
    details: EstimateDetail[];
    companies: EstimateCompany[];
}
