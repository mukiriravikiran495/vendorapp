import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { width } = Dimensions.get('window');

export default function rechargewallet() {
    const router = useRouter();
    const dispatch = useDispatch();
    const isOnline = useSelector((state: RootState) => state.online.isOnline);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>Wallet</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('/support')} style={styles.supportButton}>
                    <Ionicons name="headset-outline" size={20} color="#000" style={{ marginRight: 6 }} />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Wallet Balance Card */}
                <TouchableOpacity style={styles.walletCard} onPress={() => router.push('/recharge')}>
                    <View style={styles.cardInner}>
                        <Text style={styles.balanceText}>₹-342.9</Text>
                        <Text style={styles.balanceSubText}>Your balance is low. Please recharge</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={[styles.cardBottom, styles.cardInner]}>
                        <Text style={styles.cardActionText}>Recharge</Text>
                        <Ionicons name="arrow-forward" size={20} color="#000" />
                    </View>
                </TouchableOpacity>

                {/* Refer and Earn Card */}
                <TouchableOpacity style={styles.referCard} onPress={() => router.push('/refer')}>
                    <View style={styles.referRow}>
                        <Image source={require('../assets/images/refer.png')} style={styles.referIcon} resizeMode="contain" />
                        <View>
                            <Text style={styles.referTitle}>Refer and Earn</Text>
                            <Text style={styles.referSubTitle}>upto ₹1400</Text>
                        </View>
                    </View>
                    <Ionicons name="arrow-forward" size={20} color="#000" />
                </TouchableOpacity>

                {/* Transaction History Section */}
                <View style={{ marginTop: 20 }}>
                    <View style={styles.historyHeader}>
                        <Text style={styles.historyTitle}>Transaction History</Text>
                        <TouchableOpacity style={styles.filterButton}>
                            <Text style={styles.filterText}>Filter</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Placeholder tab bar */}
                    <View style={styles.tabBar}>
                        <Text style={styles.activeTab}>All Transactions</Text>
                    </View>

                    {/* You can add FlatList here for actual transaction items */}
                </View>
            </ScrollView>
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
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
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
    walletCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        paddingVertical: 20, // Only vertical padding
        marginBottom: 16,
        elevation: 3,
    },
    referCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 20,

        // Shadow for Android
        elevation: 3,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        backgroundColor: '#fff', // Required for iOS shadow to show
    },
    balanceText: {
        color: '#BA1C1C',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    balanceSubText: {
        color: '#BA1C1C',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
    },
    cardBottom: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardActionText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
    },

    referRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    referIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ddd',
        marginRight: 12,
    },
    referTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
    },
    referSubTitle: {
        fontSize: 14,
        color: '#000',
        fontWeight: '500',
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    filterButton: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 8,
    },
    filterText: {
        color: '#000',
        fontSize: 13,
    },
    tabBar: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    activeTab: {
        fontSize: 16,
        paddingVertical: 6,
        fontWeight: '300',
        borderBottomWidth: 2,
        borderColor: '#000',
        alignSelf: 'flex-start',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 16,
        width: '100%',
    },
    cardInner: {
        paddingHorizontal: 20, // for content only
    },
});
