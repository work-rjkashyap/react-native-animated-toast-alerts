/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {
  ToastProvider,
  ToastThemeProvider,
} from 'react-native-animated-toast-alerts';
import TestPage from './TestPage';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ToastThemeProvider>
      <ToastProvider>
        <SafeAreaView
          style={[styles.container, isDarkMode && styles.darkContainer]}
        >
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={isDarkMode ? '#000' : '#FFF'}
          />
          <TestPage />
        </SafeAreaView>
      </ToastProvider>
    </ToastThemeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
});
export default App;
