import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  View,
  PanResponder,
} from 'react-native';
import { ToastProps, ToastType } from './types';
import { AlertCircle, CheckCircle, Info, XCircle, LucideIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 50; // Amount of pixels to swipe before dismissing

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  position = 'top',
  icon,
  customStyle,
  messageStyle,
  onHide,
  index,
  visible,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const swipeX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only handle horizontal swipes
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        swipeX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
          // Swipe to dismiss
          Animated.timing(swipeX, {
            toValue: gestureState.dx > 0 ? width : -width,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onHide();
          });
        } else {
          // Return to original position
          Animated.spring(swipeX, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const hideWithAnimation = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getToastStyle = (type: ToastType) => {
    const styles = {
      info: { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
      success: { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
      error: { bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' },
      warning: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
    };
    return styles[type];
  };

  const renderIcon = () => {
    const colors = getToastStyle(type);

    if (icon) {
      const IconComponent = icon.icon;
      return (
        <IconComponent
          size={icon.props?.size || 20}
          color={icon.props?.color || colors.text}
          {...icon.props}
        />
      );
    }

    const DefaultIcons: Record<ToastType, LucideIcon> = {
      info: Info,
      success: CheckCircle,
      error: XCircle,
      warning: AlertCircle,
    };

    const DefaultIcon = DefaultIcons[type];
    return <DefaultIcon size={20} color={colors.text} />;
  };

  const colors = getToastStyle(type);
  const offset = index * 80;

  // Calculate rotation based on swipe
  const rotate = swipeX.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['10deg', '0deg', '-10deg'],
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          transform: [
            { translateX: swipeX },
            { translateY: Animated.add(translateY, new Animated.Value(offset)) },
            { scale },
            { rotate },
          ],
          opacity,
          [position]: Platform.OS === 'ios' ? 50 : 20,
        },
        customStyle,
      ]}
    >
      <View style={styles.icon}>{renderIcon()}</View>
      <Text style={[styles.message, { color: colors.text }, messageStyle]}>
        {message}
      </Text>
      <TouchableOpacity onPress={hideWithAnimation} style={styles.closeButton}>
        <XCircle size={18} color={colors.text} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width - 32,
    alignSelf: 'center',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1000,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
});
