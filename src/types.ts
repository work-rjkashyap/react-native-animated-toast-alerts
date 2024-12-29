import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

export type ToastType = 'info' | 'success' | 'error' | 'warning';
export type ToastPosition = 'top' | 'bottom';

export type ToastIcon = {
  icon: LucideIcon | React.ComponentType<any>;
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
  hideToast: () => void;
}

export interface ToastThemeColors {
  info: {
    background: string;
    text: string;
    border: string;
    icon: string;
  };
  success: {
    background: string;
    text: string;
    border: string;
    icon: string;
  };
  error: {
    background: string;
    text: string;
    border: string;
    icon: string;
  };
  warning: {
    background: string;
    text: string;
    border: string;
    icon: string;
  };
}

export interface ToastTheme {
  light: ToastThemeColors;
  dark: ToastThemeColors;
}
