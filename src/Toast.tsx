import React, { useEffect, useRef, useMemo } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  View,
  PanResponder,
  Easing,
} from 'react-native';
import { ToastProps, ToastType } from './types';
import { AlertCircle, CheckCircle, Info, XCircle, LucideIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = 50;

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

  // Track whether the toast is being dismissed
  const isDismissing = useRef(false);

  const panResponder = useMemo(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        // Add resistance to the swipe as it moves further
        const dx = gestureState.dx;
        const resistance = 0.5;
        const resistedDx = dx > 0
          ? Math.min(width, dx * resistance)
          : Math.max(-width, dx * resistance);
        swipeX.setValue(resistedDx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (isDismissing.current) return;

        const velocity = gestureState.vx;
        const shouldDismiss =
          Math.abs(gestureState.dx) > SWIPE_THRESHOLD ||
          Math.abs(velocity) > 0.5;

        if (shouldDismiss) {
          isDismissing.current = true;
          const toValue = gestureState.dx > 0 ? width : -width;

          Animated.sequence([
            // First, complete the swipe with spring animation
            Animated.spring(swipeX, {
              toValue,
              useNativeDriver: true,
              velocity: velocity * 2,
              tension: 40,
              friction: 7,
            }),
            // Then fade out
            Animated.timing(opacity, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
              easing: Easing.out(Easing.ease),
            })
          ]).start(() => {
            onHide();
          });
        } else {
          // Return to center with spring animation
          Animated.spring(swipeX, {
            toValue: 0,
            useNativeDriver: true,
            velocity: velocity,
            tension: 50,
            friction: 7,
          }).start();
        }
      },
    }), []);

  useEffect(() => {
    if (visible) {
      isDismissing.current = false;
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 7,
        }),
      ]).start();
    }
  }, [visible]);

  const hideWithAnimation = () => {
    if (isDismissing.current) return;
    isDismissing.current = true;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 0.8,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
    ]).start(() => {
      onHide();
    });
  };

  // Calculate rotation based on swipe with damping
  const rotate = swipeX.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['4deg', '0deg', '-4deg'],
    extrapolate: 'clamp',
  });

  // Calculate scale reduction as toast is swiped
  const swipeScale = swipeX.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [0.9, 1, 0.9],
    extrapolate: 'clamp',
  });

  const getToastStyle = (type: ToastType) => ({
 info: {
  bg: '#2563EB', // Blue
  text: '#FFFFFF', // White
  border: '#1E40AF', // Dark Blue
  shadow: 'rgba(37, 99, 235, 0.5)' // Blue Shadow
},
success: {
  bg: '#16A34A', // Green
  text: '#FFFFFF', // White
  border: '#15803D', // Dark Green
  shadow: 'rgba(22, 163, 74, 0.5)' // Green Shadow
},
error: {
  bg: '#DC2626', // Red
  text: '#FFFFFF', // White
  border: '#991B1B', // Dark Red
  shadow: 'rgba(220, 38, 38, 0.5)' // Red Shadow
},
warning: {
  bg: '#F59E0B', // Amber
  text: '#FFFFFF', // White
  border: '#B45309', // Dark Amber
  shadow: 'rgba(245, 158, 11, 0.5)' // Amber Shadow
}

  }[type]);

  const renderIcon = () => {
    if (icon) {
      const IconComponent = icon.icon;
      return (
        <IconComponent
          size={icon.props?.size || 20}
          color={icon.props?.color || getToastStyle(type).text}
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
    return <DefaultIcon size={20} color={getToastStyle(type).text} />;
  };

  const offset = index * 70;
  const colors = getToastStyle(type);



  const animatedStyle = {
    transform: [
      { translateX: swipeX },
      { translateY: Animated.add(translateY, new Animated.Value(offset)) },
      { scale },
      { rotate },
    ],
    opacity,
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          [position]: Platform.OS === 'ios' ? 50 : 20,
        },
        {
          transform: [
            { translateX: swipeX },
            { translateY: Animated.add(translateY, new Animated.Value(offset)) },
            { scale: Animated.multiply(scale, swipeScale) },
            { rotate },
          ],
          opacity,
        },
        customStyle,
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>{renderIcon()}</View>
        <Text
          style={[
            styles.message,
            { color: colors.text },
            messageStyle
          ]}
          numberOfLines={2}
        >
          {message}
        </Text>

      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width - 32,
    alignSelf: 'center',
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  closeButton: {
    marginLeft: 12,
    padding: 4,
  },
});
