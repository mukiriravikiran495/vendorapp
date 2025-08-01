// components/Header.tsx

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useOnlineStatus } from '../contexts/OnlineStatusContext';
const { width } = Dimensions.get('window');
type HeaderProps = {
    showBack?: boolean;
    showToggle?: boolean;
    showNotification?: boolean;
};

export default function Header({
    
    showBack = true,
    showToggle = true,
    showNotification = true,
}: HeaderProps) {
    const router = useRouter();
    const { isOnline, setIsOnline } = useOnlineStatus();
    
    return (
        <View style={styles.header}>
            {showBack && (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#0B4ED3" />
                </TouchableOpacity>
            )}

            {showToggle && (
                <View
                    style={[
                        styles.toggleContainer,
                        {
                            backgroundColor: isOnline ? '#e3e4e6' : '#e6e6e6',
                            borderColor: isOnline ? '#4bc373' : '#d6dce4ff',
                            borderWidth: 0.8,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.statusText,
                            {
                                color: isOnline ? '#4bc373' : '#555',
                                fontWeight: '500',
                            },
                        ]}
                    >
                        {isOnline ? 'ON LINE' : 'OFF LINE'}
                    </Text>
                    <Switch
                        value={isOnline}
                        onValueChange={(val) => setIsOnline(val)}
                        trackColor={{ false: '#ccc', true: '#4bc373' }}
                        thumbColor={isOnline ? '#4bc373' : '#e5eae7ff'}
                    />
                </View>
            )}

            {showNotification && (
                <TouchableOpacity onPress={() => { }} style={styles.notificationIcon}>
                    <Ionicons name="notifications-outline" size={24} color="#0B4ED3" />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4bc373',
        paddingHorizontal: 5,
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
});
