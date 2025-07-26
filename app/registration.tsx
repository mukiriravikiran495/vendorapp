import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

export default function Register() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [location, setLocation] = useState('');
  const [registrationDate, setRegistrationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleContinue = () => {
    // Add form validation or API logic here
    router.push('/documentupload');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#0B4ED3" />
      </TouchableOpacity>

      <Text style={styles.title}>Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />

      {/* Date Picker Box */}
      <View style={styles.datePickerContainer}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerBox}
          activeOpacity={0.8}
        >
          <Text style={styles.dateText}>
            {registrationDate.toDateString()}
          </Text>
          <Ionicons name="calendar-outline" size={22} color="#0B4ED3" />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={registrationDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setRegistrationDate(selectedDate);
            }}
          />
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        maxLength={10}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0B4ED3',
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  datePickerContainer: {
    marginBottom: 16,
  },
  datePickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#0B4ED3',
    padding: 16,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
