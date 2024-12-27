import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast } from './Toast';
import { ToastOptions, ToastContextType, ToastProps } from './types';

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastConfig, setToastConfig] = useState<Omit<ToastProps, 'visible' | 'onHide'> | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((options: ToastOptions) => {
    setToastConfig({
      message: options.message,
      duration: options.duration,
      position: options.position,
      styles: options.styles,
    });
    setVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toastConfig && (
        <Toast
          visible={visible}
          message={toastConfig.message}
          duration={toastConfig.duration}
          position={toastConfig.position}
          styles={toastConfig.styles}
          onHide={hideToast}
        />
      )}
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
