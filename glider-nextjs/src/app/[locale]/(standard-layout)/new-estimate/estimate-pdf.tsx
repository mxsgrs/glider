"use client";

import React from "react";
import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { Estimate } from "@/types/estimate";
import ReportTable from "./detail-table";
import { TranslationValues, RichTranslationValues, MarkupTranslationValues, Formats } from "next-intl";
import { ReactElement, ReactNodeArray } from 'react';

interface EstimatePdfProps {
    estimate: Estimate;
    translations: {
        <TargetKey>(key: TargetKey, values?: TranslationValues, formats?: Partial<Formats>): string;
        rich<TargetKey>(key: TargetKey, values?: RichTranslationValues, formats?: Partial<Formats>): string | ReactElement | ReactNodeArray;
        markup<TargetKey>(key: TargetKey, values?: MarkupTranslationValues, formats?: Partial<Formats>): string;
        raw<TargetKey>(key: TargetKey): any;
    };
}

export const EstimatePdf: React.FC<EstimatePdfProps> = ({ estimate, translations }) => {
    const t = translations;

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.top}>
                    <Image src={estimate.logo} style={styles.logo} />
                    <View style={styles.section}>
                        <Text style={styles.pageTitle}>{t('estimate')}</Text>
                        <View style={styles.estimateMetadatas}>
                            <Text style={styles.estimateMetadata}>{t('estimateReference')}: {estimate.estimateRef}</Text>
                            <Text style={styles.estimateMetadata}>{t('subjectMatter')}: {estimate.subjectMatter}</Text>
                            <Text style={styles.estimateMetadata}>{t('dateOfIssue')}: {estimate.creationDate?.toLocaleDateString()}</Text>
                            <Text style={styles.estimateMetadata}>{t('expiracyDate')}: {estimate.expiracyDate?.toLocaleDateString()}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.companies}>
                    {estimate.estimateCompany.map((company) => (
                        <View key={company.estimateCompanyId} style={styles.company}>
                            <Text style={styles.header}>{t(company.estimateCompanyParty.toLowerCase())}</Text>
                            <Text style={styles.companyDetail}>{company.businessName}</Text>
                            <Text style={styles.companyDetail}>{company.businessAddress}</Text>
                            <Text style={styles.companyDetail}>{company.phone}</Text>
                            <Text style={styles.companyDetail}>{company.email}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.section}>
                    <ReportTable estimate={estimate} translations={t} />
                </View>
            </Page>
        </Document>
    );
};

Font.register({
    family: 'Open Sans',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
    ]
});

const styles = StyleSheet.create({
    page: {
        fontSize: 10,
        fontFamily: 'Open Sans',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        objectFit: 'scale-down'
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    estimateMetadatas: {
        marginTop: 0,
    },
    estimateMetadata: {
        marginTop: 5,
    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        padding: 10,
        margin: 10,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    companies: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
    },
    company: {
        width: '50%',
        padding: 10,
    },
    companyDetail: {
        marginTop: 5,
    },
    header: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    table: {
        display: 'flex',
        width: '100%',
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1,
        borderCollapse: 'collapse',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCol: {
        width: 'auto',
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1,
        padding: 5,
        textAlign: 'center',
    },
    tableCell: {
        margin: 'auto',
        marginBottom: 5,
        fontSize: 12,
    },
});
