"use client";

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Estimate } from '@/types/estimate';
import ReportTable from './detail-table';

interface EstimatePdfProps {
    estimate: Estimate;
}

export const EstimatePdf: React.FC<EstimatePdfProps> = ({ estimate }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.top}>
                    <Image src="/images/urban-home.jpg" style={styles.logo} />
                    <View style={styles.section}>
                        <Text style={styles.pageTitle}>Estimate #{estimate.estimateId}</Text>
                        <View style={styles.estimateMetadatas}>
                            <Text style={styles.estimateMetadata}>Subject Matter: {estimate.subjectMatter}</Text>
                            <Text style={styles.estimateMetadata}>Date of issue: {estimate.creationDate?.toLocaleDateString()}</Text>
                            <Text style={styles.estimateMetadata}>Expiry date: {estimate.creationDate?.toLocaleDateString()}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.companies}>
                    {estimate.estimateCompany.map((company) => (
                        <View key={company.estimateCompanyId} style={styles.company}>
                            <Text style={styles.header}>{company.estimateCompanyParty}</Text>
                            <Text style={styles.companyDetail}>{company.businessName}</Text>
                            <Text style={styles.companyDetail}>{company.businessAddress}</Text>
                            <Text style={styles.companyDetail}>{company.phone}</Text>
                            <Text style={styles.companyDetail}>{company.email}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Details</Text>
                    <ReportTable data={estimate.estimateDetail} />
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
    estimateMetadatas: {
        marginTop: 10,
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
    logo: {
        width: 120,
        height: 120,
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
    pageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
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
