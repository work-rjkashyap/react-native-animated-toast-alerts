import React, { useEffect, useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { ToastStyles } from './types';

const { width } = Dimensions.get('window');

interface ToastProps {
  visible: boolean;
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
  onHide?: () => void;
  styles?: ToastStyles;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  duration = 3000,
  position = 'bottom',
  onHide,
  styles = {},
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const swipeAnim = useRef(new Animated.Value(0)).current;
  const swipeThreshold = styles.swipeThreshold || width * 0.3;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        swipeAnim.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > swipeThreshold) {
          Animated.timing(swipeAnim, {
            toValue: gestureState.dx > 0 ? width : -width,
            duration: 200,
            useNativeDriver: true,
          }).start(onHide);
        } else {
          Animated.spring(swipeAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(onHide);
  };

  const defaultContainerStyle: ViewStyle = {
    position: 'absolute',
    [position]: 50,
    left: 20,
    right: 20,
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  };

  const defaultTextStyle: TextStyle = {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  };

  return visible ? (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        defaultContainerStyle,
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            { translateY },
            { translateX: swipeAnim },
          ],
        },
      ]}
    >
      <Text style={[defaultTextStyle, styles.text]}>{message}</Text>
    </Animated.View>
  ) : null;
};
