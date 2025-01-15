
# React Native Animated Toast

![TypeScript](https://img.shields.io/badge/TypeScript-90.3%25-blue)
![Java](https://img.shields.io/badge/Java-9.7%25-orange)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![NPM Version](https://img.shields.io/npm/v/react-native-animated-toast-alerts)

A modern, highly customizable animated toast notification library for React Native featuring stacking animations, gesture support, and comprehensive TypeScript compatibility.

<div align="center">
<img src="https://socialify.git.ci/work-rjkashyap/react-native-animated-toast-alerts/image?font=Raleway&forks=1&issues=1&language=1&name=1&owner=1&pulls=1&stargazers=1&theme=Light" alt="react-native-animated-toast-alerts" width="640" height="320" />

<p align="center">
  <a href="#-installation">Installation</a> •
  <a href="#-quick-start">Usage</a> •
  <a href="#-customization">Customization</a> •
  <a href="#-api-reference">API Reference</a>
</p>
</div>

---

## ✨ Features

- 🎨 **Modern Design** - Clean, minimalist interface with smooth animations.
- 🔄 **Animated Stacking** - Beautiful entrance and exit animations with proper stacking.
- 🌓 **Theme Integration** - Seamless dark mode support with customizable themes.
- 📱 **Multiple Positions** - Support for top, bottom, and center positions.
- 👆 **Advanced Gestures** - Intuitive swipe-to-dismiss with natural physics.
- 💅 **Flexible Styling** - Extensive customization options for colors, icons, and animations.
- 🔧 **TypeScript Support** - Comprehensive type definitions for better development.
- ⚡ **Performance Optimized** - Efficient animations using React Native's Animated API.
- 🎁 **Icon Integration** - Seamless support for Lucide icons.

---

## 🚀 Installation

### 1. Install the package and dependencies

```bash
# Using npm
npm install react-native-animated-toast-alerts lucide-react-native react-native-svg

# Using yarn
yarn add react-native-animated-toast-alerts lucide-react-native react-native-svg

# Using pnpm
pnpm add react-native-animated-toast-alerts lucide-react-native react-native-svg
```

### 2. iOS Setup

Run the following command to install the required CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

---

## 🎯 Quick Start

### Wrap your Application with the `ToastProvider`

```typescript
import { ToastProvider } from 'react-native-animated-toast-alerts';

const App = () => {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
};

export default App;
```

### Display a Toast

```typescript
import { useToast } from 'react-native-animated-toast-alerts';
import { Camera } from 'lucide-react-native';

const MyComponent = () => {
  const { showToast } = useToast();

  const handlePress = () => {
    showToast({
      type: 'success',
      message: '✨ Operation completed!',
      position: 'top',
      icon: {
        icon: Camera,
        props: {
          size: 24,
          color: '#16A34A'
        }
      }
    });
  };

  return <Button title="Show Toast" onPress={handlePress} />;
};
```

---

## 🎨 Toast Types

### Predefined Toast Types

```typescript
// ℹ️ Info toast
showToast({
  type: 'info',
  message: 'Updates available',
});

// ✅ Success toast
showToast({
  type: 'success',
  message: 'Changes saved!',
});

// ❌ Error toast
showToast({
  type: 'error',
  message: 'Something went wrong',
});

// ⚠️ Warning toast
showToast({
  type: 'warning',
  message: 'Please review input',
});
```

---

## 💅 Customization

### Styling Options

```typescript
showToast({
  type: 'info',
  message: 'Custom styled toast',
  position: 'center',
  customStyle: {
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },
  messageStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

### Custom Icons

```typescript
import { AlertCircle } from 'lucide-react-native';

showToast({
  type: 'info',
  message: 'Custom icon toast',
  icon: {
    icon: AlertCircle,
    props: {
      size: 24,
      color: '#1D4ED8',
      strokeWidth: 2
    }
  }
});
```

---

## 📚 API Reference

### ToastOptions

```typescript
interface ToastOptions {
  type?: 'info' | 'success' | 'error' | 'warning';
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
  icon?: ToastIcon;
  customStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

type ToastIcon = {
  icon: LucideIcon | React.ComponentType<any>;
  props?: {
    size?: number;
    color?: string;
    [key: string]: any;
  };
};
```

---

## 📱 Platform Specific Features

The library provides optimized experiences for both platforms:

- **iOS**: Native shadows, safe area handling, and smooth animations.
- **Android**: Material Design elevation and touch feedback.
- **Both**: Natural gesture interactions and proper theme integration.

---

## 🔧 Technical Requirements

- React Native >= 0.63.0
- React >= 16.8.0
- TypeScript >= 4.0.0 (for TypeScript users)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests. For major changes, kindly open a discussion first.

---

## 📄 License

MIT © [Rajeshwar Kashyap](https://github.com/work-rjkashyap)

---

<p align="center">
  Made with ❤️ by Rajeshwar Kashyap
</p>
