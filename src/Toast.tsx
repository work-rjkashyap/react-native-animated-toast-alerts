// Toast.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { X } from 'lucide-react-native';
import { ToastProps, TOAST_TYPES } from './types';
import { TOAST_ICONS } from './icons';

export const Toast: React.FC<ToastProps> = ({
  visible,
  type = 'info',
  message,
  icon,
  duration = 3000,
  position = 'top',
  onHide,
  customStyle = {},
  iconSize = 24,
  iconColor,
}) => {
  const translateY = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      showToast();
    }
  }, [visible]);

  const showToast = () => {
    Animated.sequence([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.spring(translateY, {
        toValue: -100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  const toastStyle = TOAST_TYPES[type];
  const IconComponent = type !== 'custom' ? TOAST_ICONS[type] : null;
  const finalIconColor = iconColor || toastStyle.iconColor;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          backgroundColor: toastStyle.backgroundColor,
          ...(position === 'bottom' && { bottom: 0 }),
        },
        customStyle,
      ]}
    >
      {/* Icon Section */}
      <View style={styles.iconContainer}>
        {icon ? (
          // Custom icon if provided
          typeof icon === 'function' ? (
            React.createElement(icon, {
              size: iconSize,
              color: finalIconColor,
            })
          ) : (
            icon
          )
        ) : (
          // Default icon based on type
          IconComponent && (
            <IconComponent
              size={iconSize}
              color={finalIconColor}
            />
          )
        )}
      </View>

      {/* Message */}
      <Text style={[styles.message, { color: toastStyle.textColor }]}>
        {message}
      </Text>

      {/* Close Button */}
      <TouchableOpacity onPress={onHide} style={styles.closeButton}>
        <X
          size={18}
          color={toastStyle.textColor}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 16,
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
});
