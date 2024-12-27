# React Native Animated Toast

A simple, customizable animated toast component for React Native applications.

## Installation

```bash
npm i react-native-animated-toast-alerts
```
## Setup

Wrap your app with ToastProvider:

```tsx
import { ToastProvider } from 'react-native-animated-toast-alerts';

const App = () => (
  <ToastProvider>
    <YourApp />
  </ToastProvider>
);
```

## Usage
Use the toast anywhere in your app:

```tsx
import { useToast } from 'react-native-animated-toast-alerts';

const MyComponent = () => {
  const { showToast } = useToast();

  const handlePress = () => {
    showToast({
      message: "Hello!",
      position: "bottom",
      duration: 3000
    });
  };

  return <Button title="Show Toast" onPress={handlePress} />;
};
```

```tsx
const MyComponent = () => {
  const { showToast } = useToast();

  const handlePress = () => {
    showToast({
      message: "Custom styled toast!",
      position: "bottom",
      styles: {
        container: {
          backgroundColor: '#4CAF50',
          borderRadius: 25,
          paddingVertical: 20,
        },
        text: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
        swipeThreshold: 150, // Custom swipe threshold
      }
    });
  };

  return <Button title="Show Toast" onPress={handlePress} />;
};
```

## License

MIT
