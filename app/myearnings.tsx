import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
const { width } = Dimensions.get('window');


const orders = [
    {
        name: 'Mukiri Ravi kiran',
        type: 'ONE BHK',
        shiftDate: '22 Jul 2025 10:43:00',
        dropDate: '24 Jul 2025 11:43:00',
        amount: '17,400',
        status: 'Completed',
    },
    {
        name: 'Bala Anusha',
        type: 'ONE BHK',
        shiftDate: '22 Jul 2025 10:43:00',
        dropDate: '24 Jul 2025 11:43:00',
        amount: '12,400',
        status: 'Completed',
    },
    {
        name: 'Mukiri Ravi kiran',
        type: 'ONE BHK',
        shiftDate: '22 Jul 2025 10:43:00',
        dropDate: '24 Jul 2025 11:43:00',
        amount: 1640,
        status: 'Cancelled',
    },
    {
        name: 'Mukiri Ravi kiran',
        type: 'ONE BHK',
        shiftDate: '22 Jul 2025 10:43:00',
        dropDate: '24 Jul 2025 11:43:00',
        amount: 17400,
        status: 'Cancelled',
    },
    {
        name: 'Mukiri Ravi kiran',
        type: 'ONE BHK',
        shiftDate: '22 Jul 2025 10:43:00',
        dropDate: '24 Jul 2025 11:43:00',
        amount: 17400,
        status: 'Missed',
    },
    // add more orders if needed
];

export default function myearnings() {
    const router = useRouter();

    const dispatch = useDispatch();
    const isOnline = useSelector((state: RootState) => state.online.isOnline);
    const [selectedFilter, setSelectedFilter] = useState('Completed');
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>My Earnings</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/support')} style={styles.supportButton}>
                    <Ionicons name="headset-outline" size={20} color="#000" style={{ marginRight: 6 }} />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Today Earnings</Text>
                <Text style={styles.negativeAmount}>₹-342.9</Text>
            </View>

            <View style={styles.dateSelector}>
                <TouchableOpacity style={styles.arrowButton}>
                    <Ionicons name="chevron-back" size={20} color="#000" />
                </TouchableOpacity>
                {['Fri 1', 'Sat 2', 'Sun 3'].map((d, i) => (
                    <View key={i} style={styles.dateBox}>
                        <Text style={styles.dateText}>{d}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.arrowButton}>
                    <Ionicons name="chevron-forward" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={styles.statsValue}>4</Text>
                    <Text style={styles.statsLabel}>Completed Orders</Text>
                </View>
                <View style={styles.statsBoxTwo}>
                    <Text style={styles.statsValue}>₹13,400</Text>
                    <Text style={styles.statsLabel}>Order Earnings</Text>
                </View>
            </View>

            <Text style={styles.historyTitle}>Order History</Text>
            <View style={styles.historyFilters}>
                {['Completed', 'Cancelled', 'Missed'].map((label, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => setSelectedFilter(label)}
                        style={[
                            styles.filterButton,
                            selectedFilter === label && styles.activeFilterButton
                        ]}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === label && styles.activeFilterText
                            ]}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {orders
                .filter(order => order.status === selectedFilter)
                .map((order, idx) => (
                    <View key={idx} style={styles.orderCard}>
                        <View style={styles.orderLeft}>
                            <View style={styles.orderCircle} />
                            <View>
                                <Text style={styles.orderName}>{order.name}</Text>
                                
                                <Text style={styles.orderDate}>{order.type}</Text>
                                
                            </View>
                        </View>
                        <Text style={styles.orderAmount}>₹{order.amount}</Text>
                    </View>
                ))}



        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
        elevation: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#000',
        paddingHorizontal: 12,
    },
    supportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    supportText: {
        fontSize: 15,
        color: '#000',
        fontWeight: '500',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: '#fff',

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 2,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    negativeAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#BA1C1C',
    },

    dateSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        elevation: 2,
    },
    arrowButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    dateBox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: '#eaeaea',
        marginHorizontal: 4,
    },
    dateText: {
        fontSize: 14,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        padding: 12,
        gap: 12, // optional spacing between the two boxes
    },

    statsBox: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
    statsBoxTwo: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    },
    statsValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0C4087',
    },
    statsLabel: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    historyFilters: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 10, // reduce spacing between buttons
    },
    filterButton: {
        paddingHorizontal: 10, // reduced from 16
        paddingVertical: 6,    // reduced from 10
        backgroundColor: '#f5f5f5',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    filterText: {
        fontSize: 13,           // slightly smaller text
        fontWeight: '500',
    },
    activeFilterButton: {
        backgroundColor: '#E6EEF8',
        borderColor: '#0C4087',
    },

    activeFilterText: {
        color: '#0C4087',
        fontWeight: '600',
    },

    orderCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
        backgroundColor: '#fff',
        elevation: 1,
    },

    orderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flex: 1,
    },

    orderCircle: {
        width: 28,
        height: 28,
        backgroundColor: '#f9caca',
        borderRadius: 12,
    },

    orderName: {
        fontWeight: 'bold',
        fontSize: 15,
    },

    orderType: {
        position: 'absolute',
        right: 0,
        top: 0,
        fontSize: 12,
        fontWeight: '600',
        color: '#555',
    },

    orderDate: {
        fontSize: 13,
        color: '#333',
    },

    orderAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },

});
