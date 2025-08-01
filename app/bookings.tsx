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
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineStatus } from '../redux/slices/onlineSlice';
import { RootState } from '../redux/store';

const { width } = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window');



const orders = [
  {
    id: 'SH001456324',
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
    id: 'SH001456325',
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
    id: 'SH001456326',
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
    id: 'SH001456327',
    status: 'Upcoming',
    pickupdate: 'Jul 20, 2025',
    dropdate: 'Jul 21, 2025',

    dropLocation: 'Madhapur Metro Station, Hyderabad',
    pickupLocation: 'Kukatpally Metro Station, Hyderabad',
    type: '1BHK',
    paymentStatus: 'Unpaid',
    customer: {
      name: 'Ravikiran Mukiri',
      phone: '7816035340',
      initials: 'RK',
    },
    amount: 15300,
  },
  {
    id: 'SH001456328',
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
    id: 'SH001456329',
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
    id: 'SH001456330',
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
    id: 'SH001456331',
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
    id: 'SH001456332',
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
    id: 'SH001456333',
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
    id: 'SH001456334',
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
    id: 'SH001456335',
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
    id: 'SH001456336',
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
    id: 'SH001456337',
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
    id: 'SH001456338',
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
    id: 'SH001456339',
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
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const tabLabels = ['Upcoming', 'Ongoing', 'Completed'] as const;
  type BookingStatus = typeof tabLabels[number];

  const dispatch = useDispatch();
  const isOnline = useSelector((state: RootState) => state.online.isOnline);

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
        <TouchableOpacity onPress={() => { }} style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
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
              <TouchableOpacity key={order.id} activeOpacity={1} onPress={() => router.push(`/bookingdetails`)}>
                <View style={styles.card}>
                  {/* Booking ID */}
                  <Text style={styles.bookingId}>Booking Id: {order.id}</Text>

                  {/* Customer Info */}
                  <View style={styles.customerRow}>
                    <Text style={styles.customerName}>{order.customer.name}</Text>
                    <Text style={styles.customerPhone}> | {order.customer.phone}</Text>
                  </View>

                  {/* Locations */}
                  <View style={styles.row}>
                    <MaterialCommunityIcons name="arrow-up-bold-circle" size={18} color="#4CAF50" />
                    <Text style={styles.locationLabel}>Pickup: </Text>
                    <Text style={styles.locationText}>{order.pickupLocation}</Text>
                  </View>

                  <View style={styles.row}>
                    <MaterialCommunityIcons name="arrow-down-bold-circle" size={18} color="#BA1C1C" />
                    <Text style={styles.locationLabel}>Drop: </Text>
                    <Text style={styles.locationText}>{order.dropLocation}</Text>
                  </View>

                  {/* Dates + Type + Payment */}
                  <View style={styles.detailsRow}>
                    <View>
                      <Text style={styles.dateText}>
                        {order.pickupdate} ➜ {order.dropdate}
                      </Text>
                      <Text style={styles.typeText}>{order.type} Move</Text>
                    </View>
                    <View style={styles.paymentBox}>
                      <Text
                        style={[
                          styles.paymentStatus,
                          { color: order.paymentStatus === 'Paid' ? '#4CAF50' : '#D32F2F' },
                        ]}
                      >
                        {order.paymentStatus}
                      </Text>
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
  // totalAmount: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color: '#0C4087',
  // },
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
    fontSize: 18,
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
  // dateText: {
  //   flexShrink: 1,
  //   minWidth: 80,
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   marginLeft: 8,
  //   color: '#000000',
  // },
  dots: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  // locationText: {
  //   flex: 1,
  //   fontSize: 13,
  //   color: '#333',
  // },
  bookingId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C4087',
    marginBottom: 10,
  },

  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  customerPhone: {
    fontSize: 14,
    color: '#555',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  locationLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
    color: '#333',
  },

  locationText: {
    fontSize: 13,
    color: '#444',
    flexShrink: 1,
    marginLeft: 4,
  },

  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  dateText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },

  typeText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },

  paymentBox: {
    alignItems: 'flex-end',
  },

  paymentStatus: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },

  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },

});
