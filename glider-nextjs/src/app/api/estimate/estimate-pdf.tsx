import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Estimate } from '@/types/estimate';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 14,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #ddd',
  },
  header: {
    marginBottom: 10,
    fontWeight: 'bold',
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
    width: '25%',
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

const EstimatePdf: React.FC<EstimatePdfProps> = ({ estimate }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Estimate #{estimate.estimateId}</Text>
          <Text>Subject Matter: {estimate.subjectMatter}</Text>
          <Text>Created On: {estimate.creationDate?.toLocaleDateString()}</Text>
          <Text>Updated On: {estimate.updateDate?.toLocaleDateString()}</Text>
        </View>
        <View style={styles.section}>
          {estimate.estimateCompany.map((company) => (
            <View key={company.estimateCompanyId} style={styles.section}>
              <Text style={styles.header}>{company.estimateCompanyParty}</Text>
              <Text>Business Name: {company.businessName}</Text>
              <Text>Address: {company.businessAddress}</Text>
              <Text>Phone: {company.phone}</Text>
              <Text>Email: {company.email}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Estimate Details</Text>
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

export default EstimatePdf;
