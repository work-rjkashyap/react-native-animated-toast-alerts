// types.ts
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ToastType = 'info' | 'success' | 'error' | 'warning';
export type ToastPosition = 'top' | 'bottom';

export interface ToastOptions {
  type?: ToastType;
  message: string;
  duration?: number;
  position?: ToastPosition;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  customStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export interface ToastProps extends ToastOptions {
  visible: boolean;
  onHide: () => void;
  index: number;
  id: string;
}

export interface ToastContextType {
  showToast: (options: ToastOptions) => void;
  hideToast: (id?: string) => void;
}
