import { ViewStyle, TextStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'custom';
export type ToastPosition = 'top' | 'bottom';

export interface ToastStyles {
  container?: ViewStyle;
  text?: TextStyle;
  swipeThreshold?: number;
}

export interface ToastOptions {
  type?: ToastType;
  message: string;
  duration?: number;
  position?: ToastPosition;
  icon?: LucideIcon | React.ReactNode;
  iconSize?: number;
  iconColor?: string;
  customStyle?: ViewStyle;
  messageStyle?: TextStyle;
}

export interface ToastProps {
  visible: boolean;
  type?: ToastType;
  message: string;
  icon?: LucideIcon | React.ReactNode;
  duration?: number;
  position?: ToastPosition;
  onHide?: () => void;
  customStyle?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  messageStyle?: TextStyle;
}

export interface ToastContextType {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}

export interface ToastStyleProps {
  backgroundColor: string;
  textColor: string;
  iconColor: string;
}

export const TOAST_TYPES: Record<ToastType, ToastStyleProps> = {
  success: {
    backgroundColor: '#4CAF50',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF'
  },
  error: {
    backgroundColor: '#F44336',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF'
  },
  warning: {
    backgroundColor: '#FFC107',
    textColor: '#000000',
    iconColor: '#000000'
  },
  info: {
    backgroundColor: '#2196F3',
    textColor: '#FFFFFF',
    iconColor: '#FFFFFF'
  },
  custom: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    iconColor: '#000000'
  }
};
