import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';

interface SelectedFile {
  uri: string;
  name: string;
  size: number;
  type: 'image' | 'pdf';
  mimeType: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const MAX_FILES = 5;

export default function PaperUploadScreen() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [college, setCollege] = useState('Your College'); // Pre-filled from profile
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showSemesterPicker, setShowSemesterPicker] = useState(false);

  // Generate years array (2020-2024)
  const years = Array.from({ length: 5 }, (_, i) => (2020 + i).toString());
  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());

  // Request camera permissions
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'Please enable camera access in Settings to take photos.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => ImagePicker.launchCameraAsync() },
        ]
      );
      return false;
    }
    return true;
  };

  // Handle camera capture
  const handleTakePhoto = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setError(null);

      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await handleFileSelection(result.assets[0].uri, result.assets[0].fileName || 'photo.jpg', 'image');
      }
    } catch (err) {
      setError('Failed to open camera. Please try again.');
      console.error('Camera error:', err);
    }
  };

  // Handle file picker
  const handleChooseFile = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setError(null);

      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/png'],
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled && result.assets) {
        for (const asset of result.assets) {
          if (selectedFiles.length >= MAX_FILES) {
            setError(`Maximum ${MAX_FILES} files allowed`);
            break;
          }

          const fileType = asset.mimeType?.includes('pdf') ? 'pdf' : 'image';
          await handleFileSelection(asset.uri, asset.name, fileType, asset.size);
        }
      }
    } catch (err) {
      setError('Failed to open file picker. Please try again.');
      console.error('File picker error:', err);
    }
  };

  // Handle file selection and validation
  const handleFileSelection = async (
    uri: string,
    fileName: string,
    type: 'image' | 'pdf',
    fileSize?: number
  ) => {
    try {
      // Get file size if not provided
      let size = fileSize || 0;
      if (!fileSize) {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (fileInfo.exists && 'size' in fileInfo) {
          size = fileInfo.size;
        }
      }

      // Validate file size
      if (size > MAX_FILE_SIZE) {
        setError(`File "${fileName}" exceeds 10MB limit. Please choose a smaller file.`);
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const mimeType = type === 'pdf' ? 'application/pdf' : `image/${fileName.split('.').pop()?.toLowerCase()}`;

      if (!validTypes.some((t) => mimeType.includes(t.split('/')[1]))) {
        setError('Please upload PDF, JPG, or PNG files only.');
        return;
      }

      const newFile: SelectedFile = {
        uri,
        name: fileName,
        size,
        type,
        mimeType: mimeType,
      };

      setSelectedFiles((prev) => [...prev, newFile]);
    } catch (err) {
      setError('Failed to process file. Please try again.');
      console.error('File processing error:', err);
    }
  };

  // Remove file from selection
  const handleRemoveFile = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // Validate form
  const isFormValid = () => {
    return (
      selectedFiles.length > 0 &&
      subject.trim().length > 0 &&
      year.length > 0 &&
      semester.length > 0 &&
      !uploading
    );
  };

  // Handle upload
  const handleUpload = async () => {
    if (!isFormValid()) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setUploading(true);
      setProgress(0);
      setError(null);

      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 5000));

      clearInterval(interval);
      setProgress(100);
      setSuccess(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push(`/papers/analysis/${Date.now()}` as any);
      }, 2000);
    } catch (err) {
      setError('Upload failed. Please try again.');
      setUploading(false);
      setProgress(0);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.error('Upload error:', err);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <Text style={styles.title}>Upload Question Paper</Text>
        <Text style={styles.subtitle}>Upload your exam papers for AI analysis</Text>

        {/* Error Banner */}
        {error && (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={20} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons name="close" size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
        )}

        {/* Success State */}
        {success ? (
          <View style={styles.successCard}>
            <Ionicons name="checkmark-circle" size={64} color="#10B981" />
            <Text style={styles.successText}>Upload successful!</Text>
            <Text style={styles.successSubtext}>Analyzing your paper...</Text>
          </View>
        ) : (
          <>
            {/* Upload Methods */}
            {selectedFiles.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="cloud-upload-outline" size={80} color="#9CA3AF" />
                <Text style={styles.emptyStateText}>Upload your question paper to get started</Text>
                <Text style={styles.emptyStateSubtext}>Supports PDF, JPG, PNG (Max 10MB per file)</Text>
              </View>
            ) : null}

            <View style={styles.uploadButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleTakePhoto}
                disabled={uploading || selectedFiles.length >= MAX_FILES}
              >
                <Ionicons name="camera" size={24} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleChooseFile}
                disabled={uploading || selectedFiles.length >= MAX_FILES}
              >
                <Ionicons name="document-text" size={24} color="#6366F1" />
                <Text style={styles.secondaryButtonText}>
                  Choose from Files {selectedFiles.length > 0 && `(${selectedFiles.length}/${MAX_FILES})`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* File Previews */}
            {selectedFiles.length > 0 && (
              <View style={styles.filesContainer}>
                <Text style={styles.sectionTitle}>Selected Files</Text>
                {selectedFiles.map((file, index) => (
                  <View key={index} style={styles.fileCard}>
                    <View style={styles.filePreview}>
                      {file.type === 'image' ? (
                        <Image source={{ uri: file.uri }} style={styles.fileThumbnail} contentFit="cover" />
                      ) : (
                        <View style={styles.pdfIconContainer}>
                          <Ionicons name="document" size={32} color="#6366F1" />
                        </View>
                      )}
                      <View style={styles.fileInfo}>
                        <Text style={styles.fileName} numberOfLines={1}>
                          {file.name}
                        </Text>
                        <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveFile(index)}
                      disabled={uploading}
                    >
                      <Ionicons name="close-circle" size={24} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Metadata Form */}
            {selectedFiles.length > 0 && (
              <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Paper Details</Text>

                {/* Subject */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Subject *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Data Structures"
                    placeholderTextColor="#9CA3AF"
                    value={subject}
                    onChangeText={setSubject}
                    editable={!uploading}
                  />
                </View>

                {/* Year and Semester Row */}
                <View style={styles.row}>
                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Year *</Text>
                    <TouchableOpacity
                      style={styles.pickerContainer}
                      onPress={() => setShowYearPicker(true)}
                      disabled={uploading}
                    >
                      <Text style={[styles.pickerText, !year && styles.pickerPlaceholder]}>
                        {year || 'Select Year'}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Semester *</Text>
                    <TouchableOpacity
                      style={styles.pickerContainer}
                      onPress={() => setShowSemesterPicker(true)}
                      disabled={uploading}
                    >
                      <Text style={[styles.pickerText, !semester && styles.pickerPlaceholder]}>
                        {semester || 'Select Semester'}
                      </Text>
                      <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* College (Read-only) */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>College</Text>
                  <View style={styles.readOnlyInput}>
                    <Text style={styles.readOnlyText}>{college}</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Upload Button */}
            {selectedFiles.length > 0 && (
              <View style={styles.uploadSection}>
                <TouchableOpacity
                  onPress={handleUpload}
                  disabled={!isFormValid()}
                  activeOpacity={0.8}
                >
                  {uploading ? (
                    <View style={styles.uploadButtonLoading}>
                      <ActivityIndicator color="#FFFFFF" />
                    </View>
                  ) : (
                    <LinearGradient
                      colors={isFormValid() ? ['#6366F1', '#8B5CF6'] : ['#9CA3AF', '#9CA3AF']}
                      style={[styles.uploadButton, !isFormValid() && styles.uploadButtonDisabled]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Ionicons name="cloud-upload" size={24} color="#FFFFFF" />
                      <Text style={styles.uploadButtonText}>Upload & Analyze</Text>
                    </LinearGradient>
                  )}
                </TouchableOpacity>

                {/* Progress Bar */}
                {uploading && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>Uploading... {progress}%</Text>
                  </View>
                )}
              </View>
            )}
          </>
        )}

        {/* Year Picker Modal */}
        <Modal visible={showYearPicker} transparent animationType="slide" onRequestClose={() => setShowYearPicker(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Year</Text>
                <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                  <Ionicons name="close" size={24} color="#111827" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {years.map((y) => (
                  <TouchableOpacity
                    key={y}
                    style={[styles.modalOption, year === y && styles.modalOptionSelected]}
                    onPress={() => {
                      setYear(y);
                      setShowYearPicker(false);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    <Text style={[styles.modalOptionText, year === y && styles.modalOptionTextSelected]}>{y}</Text>
                    {year === y && <Ionicons name="checkmark" size={20} color="#6366F1" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Semester Picker Modal */}
        <Modal
          visible={showSemesterPicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowSemesterPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Semester</Text>
                <TouchableOpacity onPress={() => setShowSemesterPicker(false)}>
                  <Ionicons name="close" size={24} color="#111827" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScrollView}>
                {semesters.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.modalOption, semester === s && styles.modalOptionSelected]}
                    onPress={() => {
                      setSemester(s);
                      setShowSemesterPicker(false);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    <Text style={[styles.modalOptionText, semester === s && styles.modalOptionTextSelected]}>
                      {s}
                    </Text>
                    {semester === s && <Ionicons name="checkmark" size={20} color="#6366F1" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 14,
    color: '#EF4444',
  },
  successCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  successText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#10B981',
    marginTop: 16,
  },
  successSubtext: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  uploadButtons: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6366F1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  filesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  filePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  fileThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  pdfIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  removeButton: {
    padding: 4,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  pickerText: {
    fontSize: 16,
    color: '#111827',
  },
  pickerPlaceholder: {
    color: '#9CA3AF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionSelected: {
    backgroundColor: '#EEF2FF',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#111827',
  },
  modalOptionTextSelected: {
    color: '#6366F1',
    fontWeight: '600',
  },
  readOnlyInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
  },
  readOnlyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  uploadButtonDisabled: {
    opacity: 0.5,
  },
  uploadButtonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#6366F1',
    marginBottom: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
  },
});
