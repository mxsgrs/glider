import { EstimateDetail } from "@/types/estimate";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
import PropTypes from "prop-types";

import { TranslationValues, RichTranslationValues, MarkupTranslationValues, Formats } from "next-intl";
import { ReactElement, ReactNodeArray } from 'react';

type DetailTableProps = {
    data: EstimateDetail[];
    translations: {
        <TargetKey>(key: TargetKey, values?: TranslationValues, formats?: Partial<Formats>): string;
        rich<TargetKey>(key: TargetKey, values?: RichTranslationValues, formats?: Partial<Formats>): string | ReactElement | ReactNodeArray;
        markup<TargetKey>(key: TargetKey, values?: MarkupTranslationValues, formats?: Partial<Formats>): string;
        raw<TargetKey>(key: TargetKey): any;
    };
};

export const DetailTable: React.FC<DetailTableProps> = ({ data, translations }) => {
    const t = translations;

    return (
        <View style={styles.table}>
            <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.col1}>{t('description')}</Text>
                <Text style={styles.col2}>{t('quantity')}</Text>
                <Text style={styles.col3}>{t('unitPrice')}</Text>
                <Text style={styles.col4}>{t('total')}</Text>
            </View>
            {data.map((row) => (
                <View key={row.estimateDetailId} style={styles.row} wrap={false}>
                    <Text style={styles.col1}>{row.rawDescription}</Text>
                    <Text style={styles.col2}>{row.quantity}</Text>
                    <Text style={styles.col3}>{Number(row.unitPrice).toFixed(2)}</Text>
                    <Text style={styles.col4}>{(row.quantity*row.unitPrice).toFixed(2)}</Text>
                </View>
            ))}
        </View>
    );
};

DetailTable.propTypes = {
    data: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
    table: {
        width: '100%',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
    },
    header: {
        borderTop: 'none',
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
    }
})

export default DetailTable