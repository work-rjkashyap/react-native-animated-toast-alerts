import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  View,
  PanResponder,
} from 'react-native';
import { AlertCircle, CheckCircle, Info, XCircle, LucideIcon } from 'lucide-react-native';
import { useToastTheme } from './ToastContext';
import { ToastProps, ToastType } from './types';

const { width } = Dimensions.get('window');
const TOAST_HEIGHT = 64;
const SWIPE_THRESHOLD = 50;
const MAX_VISIBLE_TOASTS = 3;
const STACK_OFFSET = 12;

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
  const { theme, colorScheme } = useToastTheme();
  const translateY = useRef(new Animated.Value(position === 'bottom' ? TOAST_HEIGHT : -TOAST_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const swipeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const isWithinViewLimit = index < MAX_VISIBLE_TOASTS;
      const stackPosition = position === 'bottom' ? -index * STACK_OFFSET : index * STACK_OFFSET;

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: isWithinViewLimit ? stackPosition : (position === 'bottom' ? TOAST_HEIGHT : -TOAST_HEIGHT),
          useNativeDriver: true,
          tension: 50,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: isWithinViewLimit ? 1 - (index * 0.15) : 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: isWithinViewLimit ? 1 - (index * 0.03) : 0.9,
          useNativeDriver: true,
          tension: 50,
          friction: 10,
        }),
      ]).start();
    }
  }, [visible, index, position]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        swipeX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
          Animated.timing(swipeX, {
            toValue: gestureState.dx > 0 ? width : -width,
            duration: 200,
            useNativeDriver: true,
          }).start(onHide);
        } else {
          Animated.spring(swipeX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 40,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  const getPositionStyle = () => {
    const baseOffset = Platform.OS === 'ios' ? 64 : 32;
    return {
      [position]: baseOffset,
    };
  };

  const colors = theme[colorScheme][type];

  const renderIcon = () => {
    if (icon) {
      const IconComponent = icon.icon;
      return (
        <IconComponent
          size={icon.props?.size || 18}
          color={icon.props?.color || colors.icon}
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
    return <DefaultIcon size={18} color={colors.icon} strokeWidth={2} />;
  };

  const animatedStyle = {
    transform: [
      { translateX: swipeX },
      { translateY },
      { scale },
    ],
    opacity,
    zIndex: 1000 - index,
    ...getPositionStyle(),
    backgroundColor: colors.background,
    borderColor: colors.border,
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        animatedStyle,
        customStyle,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.contentWrapper}>
          <View style={styles.iconContainer}>
            {renderIcon()}
          </View>
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
    minHeight: TOAST_HEIGHT,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  content: {
    flex: 1,
    minHeight: TOAST_HEIGHT,
    justifyContent: 'center',
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    marginRight: 12,
    alignSelf: 'center',
  },
  message: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
});
