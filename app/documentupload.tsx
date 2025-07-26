import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function DocumentUpload() {
  const router = useRouter();

  const [documents, setDocuments] = useState<{
    pan: DocumentPicker.DocumentPickerAsset | null;
    gst: DocumentPicker.DocumentPickerAsset | null;
    license: DocumentPicker.DocumentPickerAsset | null;
  }>({
    pan: null,
    gst: null,
    license: null,
  });

  const pickDocument = async (type: 'pan' | 'gst' | 'license') => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result?.assets && result.assets.length > 0) {
      setDocuments(prev => ({ ...prev, [type]: result.assets[0] }));
    }
  };

  const handlePreview = (uri: string | undefined) => {
    if (uri) Linking.openURL(uri);
  };

  const handleSubmit = () => {
    // alert('Documents submitted!');
    router.push('/dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#0B4ED3" />
      </TouchableOpacity>

      <Text style={styles.title}>Upload Documents</Text>

      {(['pan', 'gst', 'license'] as const).map((type, index) => {
        const file = documents[type];
        return (
          <View key={index} style={styles.uploadSection}>
            <Text style={styles.label}>{type.toUpperCase()} Document</Text>

            <TouchableOpacity
              style={styles.uploadBox}
              onPress={() => pickDocument(type)}
            >
              <Ionicons name="cloud-upload-outline" size={20} color="#0B4ED3" />
              <Text
                style={styles.uploadText}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {file ? file.name : 'Choose File'}
              </Text>
            </TouchableOpacity>

            {file && (
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => pickDocument(type)}
                >
                  <Text style={styles.actionButtonText}>Re-upload</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.previewButton]}
                  onPress={() => handlePreview(file.uri)}
                >
                  <Text style={styles.previewButtonText}>Preview</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B4ED3',
    marginBottom: 30,
    alignSelf: 'center',
  },
  uploadSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f9f9f9',
  },
  uploadText: {
    fontSize: 15,
    color: '#0B4ED3',
    flexShrink: 1,
    maxWidth: '90%',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
  paddingVertical: 8,
  paddingHorizontal: 14,
  backgroundColor: '#fff',
  borderRadius: 6,
  borderWidth: 1,
  borderColor: '#0B4ED3', // blue border
},

actionButtonText: {
  color: '#0B4ED3',        // blue text
  fontSize: 14,
  fontWeight: '600',
},
  previewButton: {
    backgroundColor: '#fff',
    borderColor: '#27ae60',
  },
  previewButtonText:{
    color: '#27ae60',
  },
  submitButton: {
    backgroundColor: '#0B4ED3',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
