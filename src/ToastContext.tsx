import React, {createContext, useContext, useCallback, useState} from 'react';
import {useColorScheme} from 'react-native';
import {
  ToastContextType,
  ToastTheme,
  ToastProps,
  ToastOptions,
  ToastFunction,
} from './types';
import {defaultTheme} from './theme';
import {Toast} from './Toast';

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
});
const MAX_TOASTS = 5;

export const ToastThemeContext = createContext<{
  theme: ToastTheme;
  colorScheme: 'light' | 'dark';
}>({
  theme: defaultTheme,
  colorScheme: 'light',
});

export const ToastThemeProvider: React.FC<{
  children: React.ReactNode;
  theme?: ToastTheme;
}> = ({children, theme = defaultTheme}) => {
  const colorScheme = useColorScheme() || 'light';

  return (
    <ToastThemeContext.Provider value={{theme, colorScheme}}>
      {children}
    </ToastThemeContext.Provider>
  );
};

export const ToastProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<
    (Omit<ToastProps, 'visible' | 'onHide' | 'index'> & {id: string})[]
  >([]);
  const [queue, setQueue] = useState<
    (Omit<ToastProps, 'visible' | 'onHide' | 'index'> & {id: string})[]
  >([]);

  // Use a ref to track toasts for synchronous access in showToast
  // ensuring we don't have stale closures or dependency cycles
  const toastsRef = React.useRef(toasts);
  React.useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  const hideToast = useCallback((id?: string) => {
    setToasts(prev => (id ? prev.filter(t => t.id !== id) : prev.slice(1)));
  }, []);

  // Process queue whenever toasts or queue changes
  React.useEffect(() => {
    if (toasts.length < MAX_TOASTS && queue.length > 0) {
      const nextToast = queue[0];
      setQueue(prev => prev.slice(1));
      setToasts(prev => [nextToast, ...prev]);

      if (nextToast.duration && nextToast.duration > 0) {
        setTimeout(() => {
          hideToast(nextToast.id);
        }, nextToast.duration);
      }
    }
  }, [toasts.length, queue, hideToast]);

  const showToast = useCallback(
    (options: ToastOptions) => {
      const id = Date.now().toString();
      const newToast = {
        id,
        type: options.type || 'info',
        message: options.message,
        position: options.position || 'top',
        icon: options.icon,
        customStyle: options.customStyle,
        messageStyle: options.messageStyle,
        duration: options.duration,
      };

      if (toastsRef.current.length >= MAX_TOASTS) {
        setQueue(prev => [...prev, newToast]);
      } else {
        setToasts(prev => [newToast, ...prev]);
        if (options.duration !== undefined && options.duration > 0) {
          setTimeout(() => {
            hideToast(id);
          }, options.duration);
        }
      }
    },
    [hideToast],
  );

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
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
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastFunction => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const toastFunc = context.showToast as unknown as ToastFunction;
  toastFunc.hide = context.hideToast;
  return toastFunc;
};

export const useToastTheme = () => {
  const context = useContext(ToastThemeContext);
  if (!context) {
    throw new Error('useToastTheme must be used within a ToastThemeProvider');
  }
  return context;
};
