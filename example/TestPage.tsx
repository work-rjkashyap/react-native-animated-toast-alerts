import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  ScrollView,
} from 'react-native';
import { useToast, ToastPosition } from 'react-native-animated-toast-alerts';

const TestPage = () => {
  const showToast = useToast();
  const isDarkMode = useColorScheme() === 'dark';
  const [position, setPosition] = useState<ToastPosition>('top');

  const containerStyle = [
    styles.contentContainer,
    isDarkMode && styles.darkContentContainer,
  ];

  return (
    <ScrollView contentContainerStyle={containerStyle}>
      <Text style={[styles.header, isDarkMode && styles.darkText]}>
        Toast Alerts Demo
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Position</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, position === 'top' && styles.activeButton]}
            onPress={() => setPosition('top')}
          >
            <Text style={styles.buttonText}>Top</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              position === 'bottom' && styles.activeButton,
            ]}
            onPress={() => setPosition('bottom')}
          >
            <Text style={styles.buttonText}>Bottom</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Toasts</Text>
        <TouchableOpacity
          style={[styles.actionButton, styles.infoButton]}
          onPress={() =>
            showToast({
              type: 'info',
              message: 'This is an information message',
              position,
            })
          }
        >
          <Text style={styles.actionButtonText}>Show Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.successButton]}
          onPress={() =>
            showToast({
              type: 'success',
              message: 'Action completed successfully!',
              position,
            })
          }
        >
          <Text style={styles.actionButtonText}>Show Success</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.warningButton]}
          onPress={() =>
            showToast({
              type: 'warning',
              message: 'Please proceed with caution',
              position,
            })
          }
        >
          <Text style={styles.actionButtonText}>Show Warning</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.errorButton]}
          onPress={() =>
            showToast({
              type: 'error',
              message: 'An error occurred. Try again.',
              position,
            })
          }
        >
          <Text style={styles.actionButtonText}>Show Error</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Options</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            showToast({
              message: 'Custom duration (5s)',
              duration: 5000,
              position,
            })
          }
        >
          <Text style={styles.actionButtonText}>Long Duration (5s)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            showToast({
              message:
                'This is a very long message that might wrap to multiple lines to test how the toast handles longer content properly.',
              type: 'info',
              position,
            })
          }
        >
          <Text style={styles.actionButtonText}>Long Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  darkContentContainer: {
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
  },
  darkText: {
    color: '#FFF',
  },
  section: {
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    minWidth: 100,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontWeight: '600',
    color: '#333',
  },
  actionButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#333',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoButton: {
    backgroundColor: '#2196F3',
  },
  successButton: {
    backgroundColor: '#4CAF50',
  },
  warningButton: {
    backgroundColor: '#FF9800',
  },
  errorButton: {
    backgroundColor: '#F44336',
  },
});

export default TestPage;
