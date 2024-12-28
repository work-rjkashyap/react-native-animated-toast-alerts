import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { Toast } from './Toast';
import { ToastOptions, ToastContextType, ToastProps } from './types';

// Updated default context value to match types
const ToastContext = createContext<ToastContextType>({
  showToast: (_: ToastOptions) => '', // Return empty string as default
  hideToast: (_: string) => {},
  hideAll: () => {},
});

const MAX_TOASTS = 5;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(Omit<ToastProps, 'visible' | 'onHide'> & { id: string })[]>([]);
  const timeoutIds = useRef<Record<string, NodeJS.Timeout>>({});

  const clearTimeout = useCallback((id: string) => {
    if (timeoutIds.current[id]) {
      global.clearTimeout(timeoutIds.current[id]);
      delete timeoutIds.current[id];
    }
  }, []);

  const hideAll = useCallback(() => {
    Object.keys(timeoutIds.current).forEach(clearTimeout);
    setToasts([]);
  }, []);

  const hideToast = useCallback((id: string) => {
    clearTimeout(id);
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

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

    if (options.duration !== 0) {
      const duration = options.duration || 3000;
      timeoutIds.current[id] = setTimeout(() => {
        hideToast(id);
      }, duration);
    }

    return id;  // Explicitly return the id string
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast, hideAll }}>
      <View style={{ flex: 1 }}>
        {children}
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            {...toast}
            visible
            onHide={() => hideToast(toast.id)}
            index={index}
          />
        ))}
      </View>
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
