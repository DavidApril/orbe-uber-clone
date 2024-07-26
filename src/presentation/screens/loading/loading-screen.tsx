import {Animated, useWindowDimensions, View} from 'react-native';
import {useAnimation} from '../../../hooks';
import {globalColors} from '../../theme/styles';
import {useUIStore} from '../../../store';

export const LoadingScreen = () => {
  const {rotateStyle} = useAnimation();
  const {height, width} = useWindowDimensions();
  const {isDarkMode} = useUIStore();
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
        backgroundColor: isDarkMode
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
