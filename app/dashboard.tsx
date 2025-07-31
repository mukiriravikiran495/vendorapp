import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView from 'react-native-maps';

const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#000000' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'on' }] },
    { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#D3D3D3' }] },
    { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },
    { featureType: 'transit', stylers: [{ visibility: 'on' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#a3ccff' }] },
];

const { width } = Dimensions.get('window');

type EarningsCardProps = {
    title: string;
    amount: string;
    subtitle: string;
    color: string;
};

const EarningsCard = ({ title, amount, subtitle, color }: EarningsCardProps) => (
    <View style={[styles.card, { borderColor: color + "30" }]}>
        <View style={styles.earningsheader}>
            <Text style={styles.title}>{title}</Text>
            <View style={[styles.dot, { backgroundColor: color + "20" }]} />
        </View>
        <Text style={[styles.amount, { color }]}>{amount}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
);

export default function Home() {
    const [isOnline, setIsOnline] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [region, setRegion] = useState<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    } | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchLocation = async () => {
            if (isOnline) {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.warn('Permission to access location was denied');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            }
        };

        fetchLocation();
    }, [isOnline]);

    return (

        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/menu')}>
                    <Ionicons name="menu" size={28} color="#0C4087" />
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
                        { color: isOnline ? '#4bc373' : '#555', fontWeight: 500, }
                    ]}>
                        {isOnline ? 'ON LINE' : 'OFF LINE'}
                    </Text>
                    <Switch
                        value={isOnline}
                        onValueChange={setIsOnline}
                        trackColor={{ false: '#ccc', true: '#4bc373' }}
                        thumbColor={isOnline ? '#4bc373' : '#e5eae7ff'}
                    />
                </View>
                <TouchableOpacity style={styles.notificationIcon}>
                    <Ionicons name="notifications-outline" size={28} color="#0C4087" />
                </TouchableOpacity>
            </View>

            {/* Dropdown + Map Container */}
            <View style={styles.mapContainer}>
                {/* Dropdown Button */}
                <View style={styles.earningsContainer}>
                    {/* <TouchableOpacity
                        style={styles.earningsHeader}
                        onPress={() => setDropdownVisible(!dropdownVisible)}>
                        <Text style={styles.earningsText}>Today’s Earnings</Text>
                        <Text style={styles.earningsAmount}>₹27,800</Text>
                        <Ionicons
                            name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
                            size={20}
                            color="#000"
                            style={{ marginLeft: 8 }}
                        />
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        style={styles.earningsHeader}
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.earningsText}>Today’s Earnings</Text>
                        <Text style={styles.earningsAmount}>₹27,800</Text>
                        <Ionicons
                            name={dropdownVisible ? 'chevron-up' : 'chevron-down'}
                            size={20}
                            color="#000"
                            style={{ marginLeft: 8 }}
                        />
                        <View style={styles.innerShadow} pointerEvents="none" />
                    </TouchableOpacity>

                    {/* Dropdown Cards (absolute position over map) */}
                    {/* {dropdownVisible && (
                        <View style={styles.dropdownOverlay}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.scrollContainer}
                            >
                                <EarningsCard title="My Earnings" amount="₹1,24,500" subtitle="+12% from last month" color="#0C4087" />
                                <EarningsCard title="My Balance" amount="₹-354" subtitle="Recharge your Wallet" color="#BA1C1C" />
                                <EarningsCard title="Today Earnings" amount="₹27,800" subtitle="January 2024" color="#0C4087" />
                            </ScrollView>
                        </View>
                    )} */}
                    {dropdownVisible && (
                        <View style={styles.dropdownOverlay}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.dropdownScrollContainer}
                            >
                                <EarningsCard
                                    title="My Earnings"
                                    amount="₹1,24,500"
                                    subtitle="+12% from last month"
                                    color="#0C4087"
                                />
                                <EarningsCard
                                    title="My Balance"
                                    amount="₹-354"
                                    subtitle="Recharge your Wallet"
                                    color="#BA1C1C"
                                />
                                <EarningsCard
                                    title="Today Earnings"
                                    amount="₹27,800"
                                    subtitle="January 2024"
                                    color="#0C4087"
                                />
                            </ScrollView>
                        </View>
                    )}


                </View>

                {/* Map or Image */}
                {!isOnline ? (
                    <Image source={require('../assets/images/online.png')} style={styles.centeredImage} resizeMode="contain" />
                ) : (
                    region && (
                        <MapView
                            style={styles.map}
                            region={region}
                            customMapStyle={mapStyle}
                            showsUserLocation
                            showsMyLocationButton
                        />
                    )

                )}
            </View>
            <View style={styles.recentOrdersContainer}>
                <Text style={styles.recentOrdersTitle}>Recent Orders</Text>

                {/* Example order cards */}
                {[1, 2, 3].map((item) => (
                    <View key={item} style={styles.orderCard}>
                        <Text style={styles.orderTitle}>Order #{item}</Text>
                        <Text style={styles.orderDetail}>Pickup: Banjara Hills</Text>
                        <Text style={styles.orderDetail}>Drop: Jubilee Hills</Text>
                        <Text style={styles.orderDetail}>Amount: ₹1500</Text>
                    </View>
                ))}
            </View>


            {/* Extra space after last order */}
            <View style={{ height: 100 }} />
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#fff',
        flex: 1,
    },
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
    notificationIcon: { paddingLeft: 10 },
    earningsContainer: {
        // zIndex: 2,
        backgroundColor: '#e6f0ff',
    },

    earningsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: 60,
       backgroundColor: '#e6f0ff',
        
        position: 'relative',
        overflow: 'hidden', // important for inner shadow
    },

    innerShadow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },

    earningsText: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#0C4087', // optional: blue text
        flex: 1,
    },

    earningsAmount: {
        fontSize: width * 0.050,
        fontWeight: '900',
        color: 'green',
    },


    dropdownOverlay: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 8,
    },

    dropdownScrollContainer: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 8,
    },

    scrollContainer: {
        paddingHorizontal: 20,
        gap: 12,
        flexDirection: 'row', // 👈 ensure items are laid out in a row
    },
    mapContainer: {
        height: 400, // fixed height
        position: 'relative',

        zIndex: 1,
    },
    map: {
        height: '100%',
        width: '100%',
    },
    centeredImage: {
        width: width * 0.8,
        height: width * 0.8,
        backgroundColor: '#eee',
        justifyContent: 'center',
    },
    card: {
        width: width * 0.6,
        padding: 16,
        marginRight: 12,
        borderRadius: 16,
        borderWidth: 1,
        backgroundColor: "#fff",
        height: 150,
        justifyContent: "space-between",
    },
    earningsheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    title: {
        fontSize: width * 0.045,
        fontWeight: "600",
        color: "#333",
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
    amount: {
        fontSize: width * 0.06,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: width * 0.04,
        color: "#666",
    },
    recentOrdersContainer: {
        padding: 16,
        backgroundColor: '#fff',
        flexGrow: 1,
    },

    recentOrdersTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#0C4087',
    },

    orderCard: {
        backgroundColor: '#f2f2f2',
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    orderTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },

    orderDetail: {
        fontSize: 14,
        color: '#333',
    },

});
