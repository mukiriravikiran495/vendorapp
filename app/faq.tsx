import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function faq() {
    const router = useRouter();
    const [isOnline, setIsOnline] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header with Back, Toggle, Notification */}
            <View style={styles.header}>
                {/* Back */}
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#0B4ED3" />
                </TouchableOpacity>

                {/* Online/Offline Toggle */}
                <View style={styles.toggleContainer}>
                    <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: '#ccc', true: '#0B4ED3' }}
                        thumbColor="#fff"
                    />
                </View>

                {/* Notification */}
                <TouchableOpacity onPress={() => { }} style={styles.notificationIcon}>
                    <Ionicons name="notifications-outline" size={24} color="#0B4ED3" />
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
        backgroundColor: '#e6e6e6',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        height: 32,

    },
    statusText: {
        marginRight: 8,
        fontSize: 16,
        color: '#0B4ED3',
        fontWeight: '500',
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
