import {Animated, StyleSheet, useWindowDimensions} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useAnimation} from '../../../hooks';

export const LoadingScreen = () => {
  const {rotateStyle} = useAnimation();
  const {height, width} = useWindowDimensions();
  return (
    <Layout
      style={{height, width, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.Image
        source={require('../../../assets/loading.png')}
        style={[
          {
            width: 70,
            height: 70,
          },
          rotateStyle,
        ]}
      />
    </Layout>
  );
};
