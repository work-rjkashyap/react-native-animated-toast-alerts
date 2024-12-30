import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {ToastProvider, useToast} from 'react-native-animated-toast-alerts';
import {
  Camera,
  Bell,
  Smartphone,
  Mail,
  Settings,
  AlertTriangle,
} from 'lucide-react-native';

const ToastDemo = () => {
  const {showToast} = useToast();
  const isDarkMode = useColorScheme() === 'dark';

  const showBasicToasts = () => {
    showToast({
      type: 'info',
      message: 'This is an information message',
      duration: 3000,
    });
  };

  const showSuccessToast = () => {
    showToast({
      type: 'success',
      message: 'Operation completed successfully!',
      duration: 3000,
    });
  };

  const showErrorToast = () => {
    showToast({
      type: 'error',
      message: 'An error occurred while processing your request',
      duration: 3000,
    });
  };

  const showWarningToast = () => {
    showToast({
      type: 'warning',
      message: 'Please review your information before proceeding',
      duration: 3000,
    });
  };

  const showCustomIconToast = () => {
    showToast({
      type: 'info',
      message: 'New photo captured!',
      duration: 3000,
      icon: {
        icon: Camera,
        props: {
          size: 24,
          color: '#3B82F6',
        },
      },
    });
  };

  const showBottomToast = () => {
    showToast({
      type: 'success',
      message: 'Notification will appear at the bottom',
      duration: 3000,
      position: 'bottom',
    });
  };

  const showLongDurationToast = () => {
    showToast({
      type: 'info',
      message: 'This toast will stay for 6 seconds',
      duration: 6000,
    });
  };

  const showCustomStyleToast = () => {
    showToast({
      type: 'info',
      message: 'Custom styled toast notification',
      duration: 3000,
      customStyle: {
        borderRadius: 20,
        borderWidth: 2,
      },
      messageStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    });
  };

  const showCenterToast = () => {
    showToast({
      type: 'success',
      message: 'Notification will appear at the center',
      duration: 3000,
      position: 'bottom',
    });
  };

  const ToastButton = ({title, onPress, icon: Icon}) => (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6'},
      ]}
      onPress={onPress}>
      {Icon && <Icon size={20} color={isDarkMode ? '#E5E7EB' : '#374151'} />}
      <Text
        style={[
          styles.buttonText,
          {color: isDarkMode ? '#E5E7EB' : '#374151'},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {color: isDarkMode ? '#E5E7EB' : '#1F2937'},
          ]}>
          Basic Toasts
        </Text>
        <ToastButton
          title="Show Info Toast"
          onPress={showBasicToasts}
          icon={Bell}
        />
        <ToastButton
          title="Show Success Toast"
          onPress={showSuccessToast}
          icon={Smartphone}
        />
        <ToastButton
          title="Show Error Toast"
          onPress={showErrorToast}
          icon={AlertTriangle}
        />
        <ToastButton
          title="Show Warning Toast"
          onPress={showWarningToast}
          icon={Settings}
        />
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {color: isDarkMode ? '#E5E7EB' : '#1F2937'},
          ]}>
          Custom Toasts
        </Text>
        <ToastButton
          title="Custom Icon Toast"
          onPress={showCustomIconToast}
          icon={Camera}
        />
        <ToastButton
          title="Bottom Position Toast"
          onPress={showBottomToast}
          icon={Mail}
        />

        <ToastButton
          title="Center Position Toast"
          onPress={showCenterToast}
          icon={Mail}
        />

        <ToastButton
          title="Long Duration Toast"
          onPress={showLongDurationToast}
          icon={Bell}
        />
        <ToastButton
          title="Custom Style Toast"
          onPress={showCustomStyleToast}
          icon={Settings}
        />
      </View>
    </ScrollView>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: isDarkMode ? '#111827' : '#FFFFFF'},
      ]}>
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});

export default App;
