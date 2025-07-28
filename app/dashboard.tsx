import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
    const [isOnline, setIsOnline] = useState(true);
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Top Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/menu')}>
                    <Ionicons name="menu" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.statusToggle}>
                    <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: '#ccc', true: '#ccc' }}
                        thumbColor={isOnline ? '#0C4087' : '#ccc'}
                        style={styles.switch}
                    />
                </View>

                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    statusToggle: {
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
        fontSize: 18,
        color: '#555',
    },
    switch: {
        transform: Platform.OS === 'android' ? [{ scaleX: 0.9 }, { scaleY: 0.9 }] : undefined,
    },
});
