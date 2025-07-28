import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Menu() {
  const router = useRouter();

  const menuItems = [
    { label: 'Dashboard', icon: <Ionicons name="grid" size={20} color="#fff" />, route: '/dashboard', active: true },
    { label: 'My Bookings', icon: <Ionicons name="cube-outline" size={20} color="#2e3a59" />, route: '/bookings' },
    { label: 'Profile', icon: <Feather name="user" size={20} color="#2e3a59" />, route: '/profile' },
    { label: 'Bank Account', icon: <FontAwesome name="bank" size={20} color="#2e3a59" />, route: '/bank' },
    { label: 'FAQ', icon: <Feather name="help-circle" size={20} color="#2e3a59" />, route: '/faq' },
    { label: 'Contact Us', icon: <Feather name="phone" size={20} color="#2e3a59" />, route: '/contact' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Back Icon */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.logo}>Shiftyng vendor</Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, item.active && styles.activeMenuItem]}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={[styles.menuText, item.active && styles.activeMenuText]}>{item.label}</Text>
            <Feather name="chevron-right" size={18} color="#999" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutItem} onPress={() => router.push('/login')}>
          <Feather name="log-out" size={20} color="#c0392b" />
          <Text style={styles.logoutText}>Logout</Text>
          <Feather name="chevron-right" size={18} color="#c0392b" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    minHeight: height,
  },
  backIcon: {
    marginBottom: 20,
    marginTop: 10,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0C4087',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: '#f4f4f4',
  },
  activeMenuItem: {
    backgroundColor: '#0C4087',
  },
  iconContainer: {
    width: 28,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#2e3a59',
  },
  activeMenuText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 7,
    marginTop: 20,
    backgroundColor: '#fff3f3',
    borderWidth: 1,
    borderColor: '#f0dcdc',
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#c0392b',
    fontWeight: '500',
  },
});
