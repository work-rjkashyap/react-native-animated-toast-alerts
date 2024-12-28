import { ViewStyle, TextStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export type ToastType = 'info' | 'success' | 'error' | 'warning';

export type ToastPosition = 'top' | 'bottom';

export interface ToastIconProps {
  icon: LucideIcon;
  props?: {
    size?: number;
    color?: string;
    [key: string]: any;
  };
}

export interface ToastOptions {
  type?: ToastType;
  message: string;
  duration?: number;
  position?: ToastPosition;
  icon?: ToastIconProps;
  customStyle?: ViewStyle;
  messageStyle?: TextStyle;
}

export interface ToastProps extends ToastOptions {
  visible: boolean;
  onHide: () => void;
  index: number;
}

export interface ToastContextType {
  showToast: (options: ToastOptions) => string;
  hideToast: (id: string) => void;
  hideAll: () => void;  // Added this line to fix the error
}
