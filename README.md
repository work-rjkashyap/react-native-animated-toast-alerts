# React Native Animated Toast

![TypeScript](https://img.shields.io/badge/TypeScript-90.3%25-blue)
![Java](https://img.shields.io/badge/Java-9.7%25-orange)

A modern, highly customizable animated toast notification library for React Native applications with smooth animations, gesture support, and TypeScript compatibility.

## Features

- 🎨 **Fully Customizable** - Customize colors, styles, positions, and animations
- 🎯 **Multiple Toast Types** - Built-in support for info, success, error, and warning toasts
- 💫 **Smooth Animations** - Beautiful entrance and exit animations
- 👆 **Gesture Support** - Swipe-to-dismiss functionality
- 🔧 **TypeScript Support** - Full TypeScript support with type definitions
- 📱 **Cross-Platform** - Works on both iOS and Android
- 🎁 **Icon Support** - Integration with Lucide icons
- ⚡ **Performance Optimized** - Uses React Native's Animated API for smooth performance

## Installation

### 1. Install the main package

```bash
npm install react-native-animated-toast-alerts
# or
yarn add react-native-animated-toast-alerts
```

### 2. Install required dependencies

The library requires the following peer dependencies:

```bash
# Install Lucide React Native for icons
npm install lucide-react-native
# or
yarn add lucide-react-native

# Install React Native SVG (required by Lucide React Native)
npm install react-native-svg
# or
yarn add react-native-svg
```

### 3. iOS Setup (Pod Install)

For iOS, you need to install the pods:

```bash
cd ios && pod install && cd ..
```

## Setup

Wrap your application with the `ToastProvider`:

```tsx
import { ToastProvider } from 'react-native-animated-toast-alerts';

const App = () => (
  <ToastProvider>
    <YourApp />
  </ToastProvider>
);

export default App;
```

## Basic Usage

```tsx
import { useToast } from 'react-native-animated-toast-alerts';
import { Info } from 'lucide-react-native'; // Import icons from Lucide

const MyComponent = () => {
  const { showToast } = useToast();

  const handlePress = () => {
    showToast({
      message: "Hello World!",
      type: "success",
      position: "top",
      duration: 3000,
      icon: {
        icon: Info,
        props: {
          size: 24,
          color: "#1D4ED8"
        }
      }
    });
  };

  return <Button title="Show Toast" onPress={handlePress} />;
};
```

## API Reference

### Toast Options

```typescript
interface ToastOptions {
  type?: 'info' | 'success' | 'error' | 'warning';
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
  icon?: {
    icon: LucideIcon | React.ComponentType<any>;
    props?: {
      size?: number;
      color?: string;
      [key: string]: any;
    };
  };
  customStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
}
```

### Built-in Icons

The library uses Lucide React Native icons. Here are some commonly used icons for different toast types:

```tsx
import {
  AlertCircle,  // for warning
  CheckCircle,  // for success
  Info,         // for info
  XCircle      // for error
} from 'lucide-react-native';

// Usage example
showToast({
  message: "Success!",
  type: "success",
  icon: {
    icon: CheckCircle,
    props: {
      size: 24,
      color: "#15803D"
    }
  }
});
```

### Style Customization

```tsx
showToast({
  message: "Custom styled toast!",
  type: "success",
  position: "bottom",
  customStyle: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 20,
  },
  messageStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
```

### Built-in Toast Types

The library comes with four pre-defined toast types:
- `info` - Blue theme
- `success` - Green theme
- `error` - Red theme
- `warning` - Yellow theme

### Gesture Support

The toast notifications support swipe-to-dismiss functionality with a threshold of 50 pixels. Users can swipe left or right to dismiss the toast.

## Advanced Usage

### Custom Icons

```tsx
import { AlertCircle } from 'lucide-react-native';

showToast({
  message: "Custom icon toast",
  type: "info",
  icon: {
    icon: AlertCircle,
    props: {
      size: 24,
      color: "#1D4ED8",
      strokeWidth: 2
    }
  }
});
```

### Multiple Toasts

The library handles multiple toasts automatically, stacking them in the order they were created.

```tsx
const showMultipleToasts = () => {
  showToast({ message: "First Toast", type: "info" });
  showToast({ message: "Second Toast", type: "success" });
  showToast({ message: "Third Toast", type: "warning" });
};
```

## Performance Considerations

- Uses React Native's Animated API for optimal performance
- Implements proper cleanup of animations and timeouts
- Efficiently handles multiple toast notifications
- Optimized SVG rendering through react-native-svg

## Troubleshooting

### Common Issues

1. If icons are not displaying:
   - Ensure `react-native-svg` is properly installed and linked
   - For iOS, run `pod install` in the iOS directory
   - For Android, rebuild the project

2. If animations are not smooth:
   - Ensure you're using the latest version of react-native
   - Try enabling hermes engine for better performance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[work-rjkashyap](https://github.com/work-rjkashyap)

---

Made with ❤️ for the React Native community.
