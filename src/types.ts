import { ViewStyle, TextStyle } from 'react-native';

export interface ToastStyles {
  container?: ViewStyle;
  text?: TextStyle;
  swipeThreshold?: number;
}

export interface ToastOptions {
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
  styles?: ToastStyles;
}

export interface ToastProps {
  visible: boolean;
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
  onHide?: () => void;
  styles?: ToastStyles;
}

export interface ToastContextType {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}
