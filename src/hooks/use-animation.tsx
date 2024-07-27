import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const useAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 360,
        duration: 2000,
        useNativeDriver: true,
      }),
    );

    rotateAnimation.start();
  }, [rotateValue]);

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const rotateStyle = {
    transform: [{rotate: rotateInterpolation}],
  };

  return {
    fadeAnim,
    rotateStyle,
  };
};
