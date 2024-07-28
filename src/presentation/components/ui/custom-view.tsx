import React, {PropsWithChildren} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useUIStore} from '../../../store';
import {globalColors} from '../../theme/styles';

export const CView = ({
  children,
  style,
}: PropsWithChildren & {style?: StyleProp<ViewStyle>}) => {
  const {isDarkMode} = useUIStore();

  return (
    <View
      style={[
        style,
        {
          backgroundColor: isDarkMode
            ? globalColors.neutralColors.backgroundDark
            : globalColors.neutralColors.background,
        },
      ]}>
      {children}
    </View>
  );
};
