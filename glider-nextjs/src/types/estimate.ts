export interface EstimateDetail {
    estimateDetailId: number;
    estimateId: number;
    rawDescription: string;
    quantity: number;
    unitPrice: number;
    creationDate?: Date;
    updateDate?: Date;
}

export interface EstimateCompany {
    estimateCompanyId: number;
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
    estimateId: number;
    estimateRef: string;
    userCredentialsId: number;
    subjectMatter: string;
    creationDate?: Date;
    updateDate?: Date;
    expiracyDate?: Date;
    currency: string;
    taxRate: number;
    conditions: string;
    estimateDetail: EstimateDetail[];
    estimateCompany: EstimateCompany[];
}
