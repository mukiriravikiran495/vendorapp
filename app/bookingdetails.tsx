import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated, Dimensions,
  FlatList,
  Image,
  Modal,
  PanResponder,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_WIDTH = SCREEN_WIDTH - 64;
const THUMB_SIZE = 50;
const { width, height } = Dimensions.get('window');
const electronics = [
  {
    id: 7,
    name: "Television",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
  },
  {
    id: 8,
    name: "Refrigerator",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200&h=200&fit=crop",
  },
  {
    id: 9,
    name: "Washing Machine",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
  },
  {
    id: 10,
    name: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
  },
  {
    id: 11,
    name: "Microwave",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8aa3?w=200&h=200&fit=crop",
  },
  {
    id: 12,
    name: "Air Conditioner",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop",
  },
  {
    id: 1,
    name: "Television",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Refrigerator",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Washing Machine",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Laptop",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Microwave",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8aa3?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Air Conditioner",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop",
  },
];

export default function BookingDetails() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const nudgeAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const textOpacity = translateX.interpolate({
    inputRange: [0, SLIDE_WIDTH / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const bgFill = translateX.interpolate({
    inputRange: [0, SLIDE_WIDTH - THUMB_SIZE],
    outputRange: ['#34dc6f', '#03792c'],
    extrapolate: 'clamp',
  });

  const [confirmed, setConfirmed] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !confirmed,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx >= 0 && gestureState.dx <= SLIDE_WIDTH - THUMB_SIZE) {
          translateX.setValue(gestureState.dx);
          scale.setValue(1.05);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SLIDE_WIDTH - THUMB_SIZE - 20) {
          Animated.parallel([
            Animated.timing(translateX, {
              toValue: SLIDE_WIDTH - THUMB_SIZE,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: false,
            }),
          ]).start(() => {
            setConfirmed(true);
            // Alert.alert('Booking Accepted', `Booking ID: ${booking.id} has been accepted.`);
            // Alert.alert('Booking Accepted', `Booking ID: has been accepted.`);
            setTimeout(() => {
              router.back();
            }, 1); // 1 second delay after confirmation

          });
        } else {
          Animated.parallel([
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (!confirmed) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(nudgeAnim, {
            toValue: 10,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(nudgeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [confirmed]);

  const order = [
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
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <SafeAreaView style={styles.container}>
        {/* Space for status bar */}
        <View style={{ height: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color="#000" />
            <Text style={styles.headerTitle}>Booking Details</Text>
          </TouchableOpacity>
        </View>

        {/* Customer Details */}

        <View style={styles.customerBox}>
          <Text style={styles.sectionTitle}>Customer Details</Text>
          <View style={styles.companyRow}>
            <View style={styles.headerInfo}>
              <Text style={styles.companyName}>Mukiri Ravi kiran</Text>
              <Text style={styles.address}>Hyderabad, Telangana</Text>
              <Text style={styles.rating}>7816035340</Text>
            </View>

            <View style={styles.imageBox}>
              <View style={styles.placeholderImage} />
            </View>
          </View>
        </View>


        {/* Booking Details */}
        <View style={styles.bookingCard}>

          <View style={styles.card}>
            {/* Booking ID */}
            <Text style={styles.bookingId}>Booking Id: SH000163524</Text>

            {/* Customer Info */}
            {/* <View style={styles.customerRow}>
              <Text style={styles.customerName}>Mukiri Ravi kiran</Text>
              <Text style={styles.customerPhone}> | 7816035340</Text>
            </View> */}

            {/* Locations */}
            <View style={styles.row}>
              <MaterialCommunityIcons name="arrow-up-bold-circle" size={18} color="#4CAF50" />
              <Text style={styles.locationLabel}>Pickup: </Text>
              <Text style={styles.locationText}>ECIL, Hyderabad, 523001</Text>
            </View>

            <View style={styles.row}>
              <MaterialCommunityIcons name="arrow-down-bold-circle" size={18} color="#BA1C1C" />
              <Text style={styles.locationLabel}>Drop: </Text>
              <Text style={styles.locationText}>Kukatpally, Hyderabad, 500062</Text>
            </View>

            {/* Dates + Type + Payment */}
            <View style={styles.detailsRow}>
              <View>
                <Text style={styles.dateText}>
                  22 Jul 2025 ➜ 24 Jul 2025
                </Text>
                <Text style={styles.typeText}>ONE BHK Move</Text>
              </View>

            </View>
          </View>


          <>
            {/* Button to open modal */}
            <TouchableOpacity onPress={() => setShowModal(true)} style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>VIEW ITEMS</Text>
            </TouchableOpacity>

            {/* MODAL */}
            <Modal visible={showModal} animationType="slide" transparent={true}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000aa' }}>
                <View style={{ width: '90%', height: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>

                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(false);
                      router.push('/');
                    }}
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    <Text style={{ color: '#ba1c1c', textAlign: 'right', textDecorationLine: 'underline', fontWeight: '500' }}>
                      + Add items
                    </Text>
                  </TouchableOpacity>

                  {/* Constrain FlatList height to avoid overflow */}
                  <View style={{ flex: 1 }}>
                    <FlatList
                      data={electronics}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={2}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingHorizontal: 5,
                        paddingBottom: 20,
                      }}
                      columnWrapperStyle={{
                        justifyContent: 'center',
                        marginBottom: 15,
                      }}
                      renderItem={({ item }) => (
                        <View
                          style={{
                            width: width / 3.8, // slightly reduced to fit inside modal
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            alignItems: 'center',
                            elevation: 2,
                            padding: 5,
                            margin: 5, // use margin instead of marginHorizontal
                          }}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{ width: 80, height: 80, borderRadius: 5 }}
                          />
                          <Text style={{ fontSize: 12, marginVertical: 4 }}>{item.name}</Text>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#ba1c1c',
                              paddingVertical: 5,
                              paddingHorizontal: 10,
                              borderRadius: 5,
                            }}
                          >
                            <Text style={{ color: '#fff', fontSize: 12 }}>ADD</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    />

                  </View>

                  {/* Buttons */}
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                      style={{
                        width: 120,
                        backgroundColor: '#ba1c1c',
                        padding: 12,
                        borderRadius: 5,
                        marginHorizontal: 8,
                      }}
                      onPress={() => setShowModal(false)}
                    >
                      <Text style={{ textAlign: 'center', color: '#fff' }}>Done</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: 120,
                        backgroundColor: '#BA1C1C',
                        padding: 12,
                        borderRadius: 5,
                        marginHorizontal: 8,
                      }}
                      onPress={() => setShowModal(false)}
                    >
                      <Text style={{ textAlign: 'center', color: '#fff' }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        </View>

        {/* Price Breakdown Section */}
        <View style={styles.priceCard}>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Booking Amount</Text>
            <Text style={styles.totalValue}>₹11,200</Text>
          </View>
        </View>

        {/* Booking Progress Timeline */}
        <View
          style={{
            backgroundColor: '#fff',

            borderColor: '#ccc',

            padding: 16,

            top: 8,
          }}
        >
          <View style={styles.timelineContainer}>
            {[
              { label: 'Booking placed on', date: 'Jan 21, 09:26 PM', completed: true },
              { label: 'Pickup Completed', date: 'Jan 21, 09:26 PM', completed: true },
              { label: 'Drop Completed', date: 'Jan 21, 09:26 PM', completed: false },
            ].map((item, index, array) => {
              const animatedHeight = useRef(new Animated.Value(0)).current;

              useEffect(() => {
                if (index !== 0 && array[index - 1].completed) {
                  Animated.timing(animatedHeight, {
                    toValue: 30,
                    duration: 600,
                    useNativeDriver: false,
                  }).start();
                }
              }, []);

              return (
                <View key={index} style={styles.timelineItem}>
                  {/* Animated vertical line */}
                  {index !== 0 && (
                    <Animated.View
                      style={[
                        styles.timelineLine,
                        {
                          height: animatedHeight,
                          backgroundColor: array[index - 1].completed ? '#28a745' : '#ccc',
                        },
                      ]}
                    />
                  )}

                  {/* Dot */}
                  <View
                    style={[
                      styles.timelineDot,
                      {
                        backgroundColor: item.completed ? '#28a745' : '#ccc',
                        borderColor: item.completed ? '#28a745' : '#ccc',
                      },
                    ]}
                  />

                  {/* Text */}
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineLabel}>{item.label}</Text>
                    <Text style={styles.timelineDate}>{item.date}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>



        <View style={styles.AcceptContainer}>
          <LinearGradient
            colors={['#3D7DCA', '#0C4087']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.swipeContainer}
          >
            <Animated.Text style={[styles.swipeText, { opacity: textOpacity }]}>
              {confirmed ? 'Accept Booking' : 'Slide to Pickup Complete'}
            </Animated.Text>

            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.thumb,
                {
                  transform: [
                    { translateX: Animated.add(translateX, nudgeAnim) },
                    { scale }
                  ],
                },
              ]}
            />
          </LinearGradient>

        </View>

      </SafeAreaView>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: height * 0.1, // Ensure there’s space at bottom
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1ff',
  },
  leftHeader: {
    flexDirection: 'column',
    flex: 1,

  },
  companyName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginTop: height * 0.01,
    marginLeft: width * 0.02,
  },
  address: {
    fontSize: width * 0.04,
    color: '#555',
    marginTop: 2,
    marginLeft: width * 0.02,
  },
  rating: {
    fontSize: width * 0.04,
    fontWeight: '500',
    color: 'green',
    marginTop: 4,
    marginLeft: width * 0.02,
  },
  // imageBox: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  // },
  placeholderImage: {
    width: 60,
    height: 60,
    backgroundColor: '#e5d5eaff',
    borderRadius: 8,
  },

  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: '600',
    marginBottom: height * 0.010,

    marginLeft: width * 0.02,
  },

  customerCard: {
    backgroundColor: '#fff',
    margin: width * 0.00,
    // borderRadius: 12,
    padding: width * 0.04,
    marginTop: 7,

  },
  bookingCard: {
    backgroundColor: '#fff',
    margin: width * 0.00,
    // borderRadius: 12,
    padding: width * 0.04,
    marginTop: 5,

  },

  viewBtn: {
    borderWidth: 1,
    borderColor: '#BA1C1C',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 40,

  },
  viewBtnText: {
    color: '#BA1C1C',
    fontWeight: '600',
    fontSize: width * 0.042,
    textAlign: 'center',
  },

  priceCard: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    marginTop: 7,
    marginHorizontal: 0,

  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
    marginLeft: width * 0.02,
    marginRight: width * 0.02,
    marginTop: height * 0.01,

  },

  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: height * 0.01,
  },
  totalLabel: {
    fontSize: width * 0.045,
    fontWeight: '700',
    color: '#000',

  },
  totalValue: {
    fontSize: width * 0.055,
    fontWeight: '900',
    color: 'green',

  },

  header: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8, // space between icon and text
    color: '#000',
    paddingHorizontal: 12,
  },
  companyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerInfo: {
    flex: 1,
  },

  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  customerBox: {
    width: 'auto',
    borderRadius: 10,
    marginTop: height * 0.01,
    backgroundColor: '#fff',
    margin: width * 0.00,
    // borderRadius: 12,
    padding: width * 0.04,

  },

  customerTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    marginBottom: height * 0.015,
    color: '#000',
  },

  timelineContainer: {
    borderRadius: 10,
    padding: 12,
    margin: 12,

  },

  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: 16,
  },

  timelineLine: {
    position: 'absolute',
    width: 2,
    left: 8,
    top: 18,
    zIndex: -1,
  },


  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    marginRight: 12,
    marginTop: 2,
  },

  timelineContent: {
    flex: 1,
  },

  timelineLabel: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#000',
  },

  timelineDate: {
    fontSize: width * 0.035,
    color: '#555',
    marginTop: 2,
  },

  AcceptContainer: {
    margin: 16,
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 1,
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
  },
  swipeContainer: {
    width: '100%',
    height: THUMB_SIZE,
    backgroundColor: '#34dc6f',
    borderRadius: 100,
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  swipeText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#0C4087',
    borderColor: '#ffffff',
    borderWidth: 2,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  successIcon: {
    alignSelf: 'center',
  },
  bookingId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0C4087',
    marginBottom: 10,
  },

  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    marginBottom: 12,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },

});
