import React, { createContext, useContext, useCallback, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ToastContextType, ToastTheme, ToastProps, ToastOptions } from './types';
import { defaultTheme } from './theme';
import { Toast } from './Toast';

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
});
const MAX_TOASTS = 5;

export const ToastThemeContext = createContext<{ theme: ToastTheme; colorScheme: 'light' | 'dark' }>({
  theme: defaultTheme,
  colorScheme: 'light',
});

export const ToastThemeProvider: React.FC<{ children: React.ReactNode; theme?: ToastTheme }> = ({
  children,
  theme = defaultTheme,
}) => {
  const colorScheme = useColorScheme() || 'light';

  return (
    <ToastThemeContext.Provider value={{ theme, colorScheme }}>
      {children}
    </ToastThemeContext.Provider>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(Omit<ToastProps, 'visible' | 'onHide'> & { id: string })[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Date.now().toString();

    setToasts(prev => {
      const updatedToasts = [
        {
          id,
          type: options.type || 'info',
          message: options.message,
          position: options.position || 'top',
          icon: options.icon,
          customStyle: options.customStyle,
          messageStyle: options.messageStyle,
        } as Omit<ToastProps, 'visible' | 'onHide'> & { id: string },
        ...prev,
      ].slice(0, MAX_TOASTS);

      // Clear timeouts for removed toasts
      prev.slice(MAX_TOASTS).forEach(toast => clearTimeout(toast.id));

      return updatedToasts;
    });

    if (options.duration !== undefined && options.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, options.duration);
    }
  }, []);

  const hideToast = useCallback(() => {
    setToasts((prev) => prev.slice(1));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          {...toast}
          visible
          onHide={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          index={index}
        />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const useToastTheme = () => {
  const context = useContext(ToastThemeContext);
  if (!context) {
    throw new Error('useToastTheme must be used within a ToastThemeProvider');
  }
  return context;
};
