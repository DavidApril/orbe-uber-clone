import {
  Animated,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {useAnimation} from '../../../hooks';
import {globalColors} from '../../theme/styles';

export const LoadingScreen = () => {
  const {rotateStyle} = useAnimation();
  const {height, width} = useWindowDimensions();

  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        height,
        width,
        zIndex: 9999999,
        position: 'absolute',
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          colorScheme === 'light'
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
      }}>
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
    </View>
  );
};
