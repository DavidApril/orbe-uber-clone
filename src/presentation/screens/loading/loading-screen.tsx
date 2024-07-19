import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';

const LoadingScreen = () => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 360,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    rotateAnimation.start();
  }, [rotateValue]);

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg']
  });

  const rotateStyle = {
    transform: [{ rotate: rotateInterpolation }]
  };

  return (
    <Layout style={styles.container}>
      <Animated.Image
        source={require('../../../assets/loading.png')} 
        style={[styles.image, rotateStyle]}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70, 
    height: 70,
  },
});

export {LoadingScreen};
