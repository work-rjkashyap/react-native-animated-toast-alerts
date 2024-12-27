
import React, { createContext, useContext, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Toast } from './Toast';
import { ToastOptions, ToastContextType, ToastProps } from './types';

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(Omit<ToastProps, 'visible' | 'onHide'> & { id: string })[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Date.now().toString();

    setToasts((prev) => [
      ...prev,
      {
        id,
        type: options.type || 'info',
        message: options.message,
        duration: options.duration || 3000,
        position: options.position || 'top',
        icon: options.icon,
        iconSize: options.iconSize,
        iconColor: options.iconColor,
        customStyle: options.customStyle,
        messageStyle: options.messageStyle,
      } as Omit<ToastProps, 'visible' | 'onHide'> & { id: string },
    ]);

    if (options.duration !== undefined && options.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, options.duration);
    }
  }, []);

  const hideToast = useCallback((id?: string) => {
    if (id) {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    } else {
      setToasts((prev) => prev.slice(1));
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
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
