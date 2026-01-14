import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  View,
  PanResponder,
} from 'react-native';
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  LucideIcon,
} from 'lucide-react-native';
import {useToastTheme} from './ToastContext';
import {ToastProps, ToastType} from './types';

const {width} = Dimensions.get('window');
const TOAST_HEIGHT = 55;
const SWIPE_THRESHOLD = 50;
const MAX_VISIBLE_TOASTS = 3;
const OFFSET_PER_TOAST = 4;

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
  const {theme, colorScheme} = useToastTheme();
  const translateY = useRef(
    new Animated.Value(position === 'bottom' ? TOAST_HEIGHT : -TOAST_HEIGHT),
  ).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.95)).current;
  const swipeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const isWithinViewLimit = index < MAX_VISIBLE_TOASTS;
      const offset = index * OFFSET_PER_TOAST;
      const direction = position === 'bottom' ? -1 : 1;

      Animated.parallel([
        Animated.spring(translateY, {
          toValue: isWithinViewLimit
            ? offset * direction
            : position === 'bottom'
              ? TOAST_HEIGHT
              : -TOAST_HEIGHT,
          useNativeDriver: true,
          tension: 70,
          friction: 12,
          velocity: 1,
        }),
        Animated.timing(opacity, {
          toValue: isWithinViewLimit ? 1 - index * 0.15 : 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: isWithinViewLimit ? 1 - index * 0.02 : 0.95,
          useNativeDriver: true,
          tension: 100,
          friction: 10,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: position === 'bottom' ? TOAST_HEIGHT : -TOAST_HEIGHT,
          useNativeDriver: true,
          tension: 100,
          friction: 10,
        }),
      ]).start();
    }
  }, [visible, index, position, opacity, scale, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        swipeX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
          Animated.spring(swipeX, {
            toValue: gestureState.dx > 0 ? width : -width,
            useNativeDriver: true,
            tension: 40,
            friction: 8,
            velocity: 1,
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
    }),
  ).current;

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
    transform: [{translateX: swipeX}, {translateY}, {scale}],
    opacity,
    zIndex: 1000 - index,
  };

  const getPositionStyle = () => {
    const basePosition: any = {
      position: 'absolute',
      left: 16,
      right: 16,
    };

    if (position === 'bottom') {
      basePosition.bottom = Platform.OS === 'ios' ? 48 : 24;
    } else {
      basePosition.top = Platform.OS === 'ios' ? 48 : 24;
    }

    return basePosition;
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        getPositionStyle(),
        animatedStyle,
        {backgroundColor: colors.background, borderColor: colors.border},
        customStyle,
      ]}>
      <View style={styles.contentWrapper}>
        <View style={styles.iconContainer}>{renderIcon()}</View>
        <Text
          style={[styles.message, {color: colors.text}, messageStyle]}
          numberOfLines={2}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    alignSelf: 'center',
    minHeight: TOAST_HEIGHT,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: TOAST_HEIGHT,
  },
  iconContainer: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
});
