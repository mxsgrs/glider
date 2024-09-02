import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Estimate } from "@/types/estimate";

import { TranslationValues, RichTranslationValues, MarkupTranslationValues, Formats } from "next-intl";
import { ReactElement, ReactNodeArray } from 'react';

type DetailTableProps = {
    estimate: Estimate;
    translations: {
        <TargetKey>(key: TargetKey, values?: TranslationValues, formats?: Partial<Formats>): string;
        rich<TargetKey>(key: TargetKey, values?: RichTranslationValues, formats?: Partial<Formats>): string | ReactElement | ReactNodeArray;
        markup<TargetKey>(key: TargetKey, values?: MarkupTranslationValues, formats?: Partial<Formats>): string;
        raw<TargetKey>(key: TargetKey): any;
    };
};

export const DetailTable: React.FC<DetailTableProps> = ({ estimate, translations }) => {
    const t = translations;

    var currencySymbol = "€";
    switch (estimate.currency) {
        case "EUR":
            currencySymbol = "€"
            break;

        case "USD":
            currencySymbol = "$"
            break;
    }

    const totalBeforeTax = estimate.estimateDetail.reduce((result, current) => {
        return result + (current.quantity * current.unitPrice);
    }, 0)

    const totalAfterTax = totalBeforeTax * (1 + estimate.taxRate / 100);

    return (
        <div>
            <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.header]}>
                    <Text style={styles.col1}>{t('description')}</Text>
                    <Text style={styles.col2}>{t('quantity')}</Text>
                    <Text style={styles.col3}>{t('unitPrice')}</Text>
                    <Text style={styles.col4}>{t('amount')}</Text>
                </View>
                {estimate.estimateDetail.map((row) => (
                    <View key={row.estimateDetailId} style={styles.row} wrap={false}>
                        <Text style={styles.col1}>{row.rawDescription}</Text>
                        <Text style={styles.col2}>{row.quantity}</Text>
                        <Text style={styles.col3}>{Number(row.unitPrice).toFixed(2)}{currencySymbol}</Text>
                        <Text style={styles.col4}>{(row.quantity * row.unitPrice).toFixed(2)}{currencySymbol}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.payment}>
                <View style={styles.conditions}>
                    <Text style={[styles.title, styles.bold]}>{t('conditions')}</Text>
                    <Text style={styles.textArea}>{estimate.conditions}</Text>
                </View>
                <View style={styles.totalTable}>
                    <View style={[styles.row, styles.noTop]} wrap={false}>
                        <Text style={[styles.col5, styles.bold]}>{t('total')}</Text>
                        <Text style={styles.col6}>{totalBeforeTax}{currencySymbol}</Text>
                    </View>
                    <View style={styles.row} wrap={false}>
                        <Text style={[styles.col5, styles.bold]}>{t('taxes')}</Text>
                        <Text style={styles.col6}>{`${Number(estimate.taxRate).toFixed(2)}%`}</Text>
                    </View>
                    <View style={[styles.row, styles.total]} wrap={false}>
                        <Text style={[styles.col5, styles.bold]}>{t('total')}</Text>
                        <Text style={[styles.col6, styles.bold]}>{totalAfterTax}{currencySymbol}</Text>
                    </View>
                </View>
            </View>
        </div>
    );
};

const styles = StyleSheet.create({
    table: {
        width: '100%'
    },
    payment: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
        marginTop: 20,
    },
    conditions: {
        color: '#707070',
        flexBasis: '64.5%',
        border: '1px solid #EEE',
        padding: 10,
        marginTop: 10
    },
    textArea: {
        lineHeight: 1.8,
        marginTop: 5
    },
    totalTable: {
        flexBasis: '35.5%'
    },
    total: { },
    header: {
        backgroundColor: '#EEE',
        borderTop: 'none',
    },
    noTop: {
        borderTop: 'none',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        padding: 8,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bold: {
        fontWeight: 'bold',
    },
    col1: {
        width: '55%',
    },
    col2: {
        width: '15%',
    },
    col3: {
        width: '15%',
    },
    col4: {
        width: '15%',
    },
    col5: {
        width: '50%',
    },
    col6: {
        width: '50%',
    }
})

export default DetailTable