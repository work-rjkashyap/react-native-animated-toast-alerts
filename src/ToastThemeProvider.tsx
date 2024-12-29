import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import {  defaultTheme } from './theme';
import { ToastTheme } from './types';

interface ToastThemeContextType {
  theme: ToastTheme;
  colorScheme: 'light' | 'dark';
}

const ToastThemeContext = createContext<ToastThemeContextType>({
  theme: defaultTheme,
  colorScheme: 'light',
});

export interface ToastThemeProviderProps {
  children: React.ReactNode;
  theme?: ToastTheme;
}

export const ToastThemeProvider: React.FC<ToastThemeProviderProps> = ({
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

export const useToastTheme = () => {
  const context = useContext(ToastThemeContext);
  if (!context) {
    throw new Error('useToastTheme must be used within a ToastThemeProvider');
  }
  return context;
};
