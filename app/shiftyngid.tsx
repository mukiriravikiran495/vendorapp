import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    Image,
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

export default function faq() {
    const router = useRouter();

    const dispatch = useDispatch();
    const isOnline = useSelector((state: RootState) => state.online.isOnline);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back, Toggle, Notification */}
            <View style={styles.header}>
                {/* Back */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                    <Text style={styles.headerTitle}>ID Card</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/support')} style={styles.supportButton}>
                    <Ionicons name="headset-outline" size={20} color="#000" style={{ marginRight: 6 }} />
                    <Text style={styles.supportText}>Support</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.cardHeader}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={require('../assets/images/profile.jpg')} // Replace with actual user image
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.appName}>Shiftyng</Text>
                    <View style={styles.approvedBadge}>
                        <Ionicons name="checkmark-circle" size={16} color="#fff" />
                        <Text style={styles.approvedText}>Approved</Text>
                    </View>
                </View>

                <View style={styles.cardBody}>
                    <Text style={styles.nameText}>Bala Anusha</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>MOBILE NUMBER</Text>
                        <Text style={styles.value}>+91 7671813023</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>LICENSE NUMBER</Text>
                        <Text style={styles.value}>AP02720110021651</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>LICENSE VALIDITY</Text>
                        <Text style={styles.value}>05/08/2031</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.shareButton}>
                    <Ionicons name="share-social-outline" size={16} color="#000" />
                    <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
            </View>


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
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4bc373',
        paddingHorizontal: 12,
        paddingVertical: 2,
        borderRadius: 24,
        height: 38,

    },
    statusText: {
        marginRight: 8,
        fontSize: width * 0.045,
        color: '#555',
    },
    notificationIcon: {
        paddingLeft: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0B4ED3',
        marginBottom: 10,
    },
    subtext: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
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
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#000',
        paddingHorizontal: 12,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        padding: 20,
        marginBottom: 20,
    },

    cardHeader: {
        backgroundColor: '#0C4087',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignItems: 'center',
        paddingVertical: 20,
    },

    appName: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 8,
    },

    approvedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#4BC373',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    approvedText: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 6,
    },

    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#fff',
    },

    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    cardBody: {
        paddingVertical: 20,
    },

    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },

    infoRow: {
        marginBottom: 10,
    },

    label: {
        fontSize: 12,
        color: '#777',
    },

    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },

    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
    },

    shareText: {
        marginLeft: 6,
        fontWeight: '600',
        color: '#000',
    },

});
