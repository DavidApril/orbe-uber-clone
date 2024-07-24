

import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native';

export const useAnimation = () => {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return {

    fadeAnim

  }
}
