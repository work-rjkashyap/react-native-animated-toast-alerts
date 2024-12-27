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
      type: options.type || 'info',
      message: options.message,
      duration: options.duration,
      position: options.position,
      icon: options.icon,
      iconSize: options.iconSize,
      iconColor: options.iconColor,
      customStyle: options.customStyle,
      messageStyle: options.messageStyle,
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
          type={toastConfig.type}
          message={toastConfig.message}
          duration={toastConfig.duration}
          position={toastConfig.position}
          icon={toastConfig.icon}
          iconSize={toastConfig.iconSize}
          iconColor={toastConfig.iconColor}
          customStyle={toastConfig.customStyle}
          messageStyle={toastConfig.messageStyle}
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
