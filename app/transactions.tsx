import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Dimensions,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineStatus } from '../redux/slices/onlineSlice';
import { RootState } from '../redux/store';

const { width } = Dimensions.get('window');

export default function Transactions() {
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

                <View style={[
                    styles.toggleContainer,
                    {
                        backgroundColor: isOnline ? '#e3e4e6' : '#e6e6e6',
                        borderColor: isOnline ? '#4bc373' : '#d6dce4ff',
                        borderWidth: 0.8,
                    }
                ]}>
                    <Text style={[
                        styles.statusText,
                        { color: isOnline ? '#4bc373' : '#555', fontWeight: '500' }
                    ]}>
                        {isOnline ? 'ON LINE' : 'OFF LINE'}
                    </Text>

                    <Switch
                        value={isOnline}
                        onValueChange={(value) => {
                            dispatch(setOnlineStatus(value)); // ✅ fixed
                        }}
                        trackColor={{ false: '#ccc', true: '#4bc373' }}
                        thumbColor={isOnline ? '#4bc373' : '#e5eae7ff'}
                    />
                </View>


                {/* Notification */}
                <TouchableOpacity onPress={() => { }} style={styles.notificationIcon}>
                    <Ionicons name="notifications-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <Text style={styles.heading}>My FAQ</Text>
                <Text style={styles.subtext}>You currently have no bookings.</Text>
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
});
