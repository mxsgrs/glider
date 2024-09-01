"use client";

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { Estimate } from '@/types/estimate';

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
    top: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
        padding: 10,
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
        marginBottom: 10,
    },
    tableRow: {
        margin: 'auto',
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
                        <Text style={styles.header}>Estimate #{estimate.estimateId}</Text>
                        <Text>Subject Matter: {estimate.subjectMatter}</Text>
                        <Text>Created On: {estimate.creationDate?.toLocaleDateString()}</Text>
                        <Text>Updated On: {estimate.updateDate?.toLocaleDateString()}</Text>
                    </View>
                </View>
                <View style={styles.companies}>
                    {estimate.estimateCompany.map((company) => (
                        <View key={company.estimateCompanyId} style={styles.company}>
                            <Text style={styles.header}>{company.estimateCompanyParty}</Text>
                            <Text>{company.businessName}</Text>
                            <Text>{company.businessAddress}</Text>
                            <Text>{company.phone}</Text>
                            <Text>{company.email}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Details</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCol}>Description</Text>
                            <Text style={styles.tableCol}>Quantity</Text>
                            <Text style={styles.tableCol}>Unit Price</Text>
                            <Text style={styles.tableCol}>Total</Text>
                        </View>
                        {estimate.estimateDetail.map((detail) => (
                            <View key={detail.estimateDetailId} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{detail.rawDescription}</Text>
                                <Text style={styles.tableCell}>{detail.quantity}</Text>
                                <Text style={styles.tableCell}>{detail.unitPrice.toFixed(2)}</Text>
                                <Text style={styles.tableCell}>
                                    {(detail.quantity * detail.unitPrice).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
