// types.ts
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export type ToastType = 'info' | 'success' | 'error' | 'warning';
export type ToastPosition = 'top' | 'bottom';

// Custom type for icon props
export type ToastIcon = {
  icon: LucideIcon | React.ComponentType<any>;  // Updated type definition
  props?: {
    size?: number;
    color?: string;
    [key: string]: any;
  };
};

export interface ToastOptions {
  type?: ToastType;
  message: string;
  duration?: number;
  position?: ToastPosition;
  icon?: ToastIcon;
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
