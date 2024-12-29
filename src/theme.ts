import { ToastTheme } from './types';

export const defaultTheme: ToastTheme = {
  light: {
    info: {
      background: '#EFF6FF',
      text: '#1E40AF',
      border: '#BFDBFE',
      icon: '#3B82F6'
    },
    success: {
      background: '#F0FDF4',
      text: '#166534',
      border: '#BBF7D0',
      icon: '#22C55E'
    },
    error: {
      background: '#FEF2F2',
      text: '#991B1B',
      border: '#FECACA',
      icon: '#EF4444'
    },
    warning: {
      background: '#FFFBEB',
      text: '#9A3412',
      border: '#FED7AA',
      icon: '#F59E0B'
    }
  },
  dark: {
    info: {
      background: '#1E3A8A',
      text: '#FFFFFF',
      border: '#1E40AF',
      icon: '#60A5FA'
    },
    success: {
      background: '#166534',
      text: '#FFFFFF',
      border: '#15803D',
      icon: '#4ADE80'
    },
    error: {
      background: '#991B1B',
      text: '#FFFFFF',
      border: '#B91C1C',
      icon: '#FCA5A5'
    },
    warning: {
      background: '#9A3412',
      text: '#FFFFFF',
      border: '#C2410C',
      icon: '#FBBF24'
    }
  }
};
