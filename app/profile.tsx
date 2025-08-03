import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    Platform,
    SafeAreaView, ScrollView, StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
const { width } = Dimensions.get('window');
const menuItems: { label: string; icon: keyof typeof Ionicons.glyphMap; danger?: boolean; route?: string; }[] = [
    { label: 'Profile Info', icon: 'person-outline', route: '/profileinfo' },
    { label: 'Documents', icon: 'document-text-outline', route: '/documents' },
    { label: 'Shiftyng ID card', icon: 'card-outline', route: '/shiftyngid' },
    { label: 'Language Settings', icon: 'language-outline', route: '/languagesettings' },
    { label: 'Logout', icon: 'log-out-outline', danger: true, route: '/login' },
    { label: 'Delete Account', icon: 'trash-outline', danger: true },
];
export default function profile() {
    const router = useRouter();

    const dispatch = useDispatch();
    const isOnline = useSelector((state: RootState) => state.online.isOnline);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back, Toggle, Notification */}
            <View style={styles.header}>
                {/* Back */}
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/support')} style={styles.supportButton}>
                    <Ionicons name="headset-outline" size={20} color="#000" style={{ marginRight: 6 }} />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.profileSection}>
                    <Ionicons name="person-circle-outline" size={100} color="#0C4087" />
                    <Text style={styles.profileName}>Mukiri Ravi Kiran</Text>
                </View>

                <View style={styles.profileStatsSection}>
                    <View style={styles.profileStatsRow}>
                        <View style={styles.profileStat}>
                            <Text style={styles.statValue}>112</Text>
                            <Text style={styles.statLabel}>Orders</Text>
                        </View>
                        <View style={styles.profileStat}>
                            <Text style={styles.statValue}>11</Text>
                            <Text style={styles.statLabel}>Months</Text>
                        </View>
                        <View style={styles.profileStat}>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.statValue}>--</Text>
                                <Ionicons name="star" size={24} color='green' style={{ marginLeft: 4 }} />
                            </View>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>

                    <View style={styles.statsUnderline} />
                </View>

                <View style={styles.menuList}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => {
                                if (item.label === 'Logout') {
                                    router.push(item.route as any);
                                } else if (item.label === 'Delete Account') {
                                    console.log('Delete Account Pressed');
                                } else if (item.route) {
                                    router.push(item.route as any);
                                }
                            }}
                        >
                            <View style={styles.menuRow}>
                                <View style={styles.menuLeft}>
                                    <Ionicons
                                        name={item.icon}
                                        size={20}
                                        color={item.danger ? '#BA1C1C' : '#0C4087'}
                                        style={styles.menuIcon}
                                    />
                                    <Text
                                        style={[
                                            styles.menuText,
                                            item.danger && { color: '#BA1C1C' }
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#000" />
                            </View>
                        </TouchableOpacity>

                    ))}

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
    }, menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
    },
    scrollContent: {
        paddingBottom: 40, // enough space for scroll
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },

    profileName: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 8,
        color: '#333',
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
    fullWidthDivider: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginTop: 16,
        alignSelf: 'center',
    },
    profileStatsSection: {
        alignItems: 'center',
        marginTop: 16,
    },

    profileStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%', // adjusts the total width of the stat row
    },

    profileStat: {
        alignItems: 'center',
        flex: 1,
    },

    statValue: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },

    statLabel: {
        fontSize: 14,
        color: '#555',
        marginTop: 2,
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    statsUnderline: {
        marginTop: 20,
        height: 1,
        backgroundColor: '#ccc',
        alignSelf: 'stretch',
    },
    menuList: {
        marginTop: 20,
        gap: 12, // spacing between items
        marginBottom: 20,
    },

    menuItem: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#e4e4e4',
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    menuText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    menuRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // ⬅️ ensures left and right sides are spaced out
        alignItems: 'center',
    },

    menuIcon: {
        marginRight: 12,
    },


});
