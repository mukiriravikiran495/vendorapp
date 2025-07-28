import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');



const orders = [
    {
        id: 1,
        status: 'Upcoming',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Madhapur Metro Station, Hyderabad',
        pickupLocation: 'Kukatpally Metro Station, Hyderabad',
        type: '1BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Ravikiran Mukiri',
            phone: '7816035340',
            initials: 'RK',
        },
        amount: 15300,
    },
    {
        id: 2,
        status: 'Ongoing',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Gachibowli, Hyderabad',
        pickupLocation: 'Ameerpet, Hyderabad',
        type: '2BHK',
        paymentStatus: 'Unpaid',
        customer: {
            name: 'Aparna Rao',
            phone: '9876543210',
            initials: 'AR',
        },
        amount: 18900,
    },
    {
        id: 3,
        status: 'Completed',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',
        dropLocation: 'Secunderabad',
        pickupLocation: 'Banjara Hills',
        type: '3BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Karthik Reddy',
            phone: '9988776655',
            initials: 'KR',
        },
        amount: 24200,
    },
    {
        id: 4,
        status: 'Upcoming',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Madhapur Metro Station, Hyderabad',
        pickupLocation: 'Kukatpally Metro Station, Hyderabad',
        type: '1BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Ravikiran Mukiri',
            phone: '7816035340',
            initials: 'RK',
        },
        amount: 15300,
    },
    {
        id: 5,
        status: 'Ongoing',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Gachibowli, Hyderabad',
        pickupLocation: 'Ameerpet, Hyderabad',
        type: '2BHK',
        paymentStatus: 'Unpaid',
        customer: {
            name: 'Aparna Rao',
            phone: '9876543210',
            initials: 'AR',
        },
        amount: 18900,
    },
    {
        id: 6,
        status: 'Completed',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',
        dropLocation: 'Secunderabad',
        pickupLocation: 'Banjara Hills',
        type: '3BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Karthik Reddy',
            phone: '9988776655',
            initials: 'KR',
        },
        amount: 24200,
    },
    {
        id: 7,
        status: 'Ongoing',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Gachibowli, Hyderabad',
        pickupLocation: 'Ameerpet, Hyderabad',
        type: '2BHK',
        paymentStatus: 'Unpaid',
        customer: {
            name: 'Aparna Rao',
            phone: '9876543210',
            initials: 'AR',
        },
        amount: 18900,
    },
    {
        id: 8,
        status: 'Completed',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',
        dropLocation: 'Secunderabad',
        pickupLocation: 'Banjara Hills',
        type: '3BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Karthik Reddy',
            phone: '9988776655',
            initials: 'KR',
        },
        amount: 24200,
    },
    {
        id: 9,
        status: 'Ongoing',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Gachibowli, Hyderabad',
        pickupLocation: 'Ameerpet, Hyderabad',
        type: '2BHK',
        paymentStatus: 'Unpaid',
        customer: {
            name: 'Aparna Rao',
            phone: '9876543210',
            initials: 'AR',
        },
        amount: 18900,
    },
    {
        id: 10,
        status: 'Completed',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',
        dropLocation: 'Secunderabad',
        pickupLocation: 'Banjara Hills',
        type: '3BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Karthik Reddy',
            phone: '9988776655',
            initials: 'KR',
        },
        amount: 24200,
    },
    {
        id: 11,
        status: 'Ongoing',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Gachibowli, Hyderabad',
        pickupLocation: 'Ameerpet, Hyderabad',
        type: '2BHK',
        paymentStatus: 'Unpaid',
        customer: {
            name: 'Aparna Rao',
            phone: '9876543210',
            initials: 'AR',
        },
        amount: 18900,
    },
    {
        id: 12,
        status: 'Completed',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',
        dropLocation: 'Secunderabad',
        pickupLocation: 'Banjara Hills',
        type: '3BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Karthik Reddy',
            phone: '9988776655',
            initials: 'KR',
        },
        amount: 24200,
    },
    {
        id: 13,
        status: 'Ongoing',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Gachibowli, Hyderabad',
        pickupLocation: 'Ameerpet, Hyderabad',
        type: '2BHK',
        paymentStatus: 'Unpaid',
        customer: {
            name: 'Aparna Rao',
            phone: '9876543210',
            initials: 'AR',
        },
        amount: 18900,
    },
    {
        id: 14,
        status: 'Completed',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',
        dropLocation: 'Secunderabad',
        pickupLocation: 'Banjara Hills',
        type: '3BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Karthik Reddy',
            phone: '9988776655',
            initials: 'KR',
        },
        amount: 24200,
    },
    {
        id: 15,
        status: 'Ongoing',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',

        dropLocation: 'Gachibowli, Hyderabad',
        pickupLocation: 'Ameerpet, Hyderabad',
        type: '2BHK',
        paymentStatus: 'Unpaid',
        customer: {
            name: 'Aparna Rao',
            phone: '9876543210',
            initials: 'AR',
        },
        amount: 18900,
    },
    {
        id: 16,
        status: 'Completed',
        pickupdate: 'Jul 20, 2025',
        dropdate: 'Jul 21, 2025',
        dropLocation: 'Secunderabad',
        pickupLocation: 'Banjara Hills',
        type: '3BHK',
        paymentStatus: 'Paid',
        customer: {
            name: 'Karthik Reddy',
            phone: '9988776655',
            initials: 'KR',
        },
        amount: 24200,
    },

];

export default function Bookings() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const tabLabels = ['Upcoming', 'Ongoing', 'Completed'] as const;
  type BookingStatus = typeof tabLabels[number];

  const handleTabPress = (index: number) => {
    setActiveTabIndex(index);
    scrollRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  const filteredOrdersByTab = (status: BookingStatus) =>
    orders.filter((order) => order.status === status);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0C4087" />
        </TouchableOpacity>
        <View style={styles.toggleContainer}>
          <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: '#ccc', true: '#0C4087' }}
            thumbColor="#fff"
          />
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#0C4087" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {tabLabels.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(index)}
            style={styles.tabButton}
          >
            <Text style={[styles.tabText, index === activeTabIndex && styles.activeTabText]}>
              {tab}
            </Text>
            {index === activeTabIndex && <View style={styles.activeTabLine} />}
          </TouchableOpacity>
        ))}
      </View>

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              if (index !== activeTabIndex) {
                setActiveTabIndex(index);
              }
            },
          }
        )}
        showsHorizontalScrollIndicator={false}
      >
        {tabLabels.map((tabLabel, tabIndex) => (
          <ScrollView
            key={tabIndex}
            style={{ width: screenWidth }}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredOrdersByTab(tabLabel).map((order) => (
              <TouchableOpacity key={order.id} activeOpacity={0.9}>
                <View style={styles.card}>
                  <View style={styles.dateRow}>
                    <View style={styles.dateLeft}>
                      <MaterialCommunityIcons name="home-city" size={28} color="#BA1C1C" />
                      <Text style={styles.dateText}>{order.pickupdate}</Text>
                    </View>
                    <Text style={styles.dots}>...</Text>
                    <Text style={styles.dateText}>{order.dropdate}</Text>
                  </View>
                  <View style={styles.locationInfo}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.locationText}>{order.dropLocation}</Text>
                  </View>
                  <View style={styles.locationInfo}>
                    <View style={[styles.bulletPoint, { backgroundColor: 'green' }]} />
                    <Text style={styles.locationText}>{order.pickupLocation}</Text>
                  </View>
                  <View style={styles.statusRow}>
                    <Text style={styles.statusTextBold}>Booking {order.status}</Text>
                    <Text style={styles.statusTextBold}>{order.type}</Text>
                    <Text style={styles.unpaid}>{order.paymentStatus}</Text>
                  </View>
                  <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{order.customer.initials}</Text>
                    </View>
                    <View>
                      <Text style={styles.userName}>{order.customer.name}</Text>
                      <Text style={styles.userPhone}>{order.customer.phone}</Text>
                    </View>
                    <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
                      <Text style={styles.totalLabel}>Total Amount</Text>
                      <Text style={styles.totalAmount}>₹ {order.amount}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
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
    color: '#0C4087',
    fontWeight: '500',
  },
  notificationIcon: {
    paddingLeft: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: '3%',
    width: '94%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0C4087',
    marginRight: 8,
    marginTop: 6,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  statusTextBold: {
    fontSize: 14,
    fontWeight: '600',
  },
  unpaid: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#82afefff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
  },
  userPhone: {
    fontSize: 13,
    color: '#4CAF50',
  },
  totalLabel: {
    fontSize: 12,
    color: '#666',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C4087',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingBottom: 10,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    marginBottom: 4,
  },
  activeTabText: {
    color: '#0C4087',
    fontWeight: 'bold',
  },
  activeTabLine: {
    height: 3,
    width: 30,
    backgroundColor: '#0C4087',
    borderRadius: 2,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    flexShrink: 1,
    minWidth: 80,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#000000',
  },
  dots: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
});
