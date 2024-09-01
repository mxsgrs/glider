import { EstimateDetail } from '@/types/estimate';
import { StyleSheet, Text, View } from '@react-pdf/renderer'
import PropTypes from 'prop-types'

type DetailTableProps = {
    data: EstimateDetail[];
};

export const DetailTable: React.FC<DetailTableProps> = ({ data }) => {
    return (
        <View style={styles.table}>
            <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.col1}>Description</Text>
                <Text style={styles.col2}>Quantity</Text>
                <Text style={styles.col3}>Unit Price</Text>
                <Text style={styles.col4}>Total</Text>
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