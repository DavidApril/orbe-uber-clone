import React, {PropsWithChildren} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';
import {useUIStore} from '../../../store';
import {fontColor} from '../../theme/styles';

export const CText = ({
  style,
  children,
}: PropsWithChildren & {style?: StyleProp<TextStyle>}) => {
  const {isDarkMode} = useUIStore();
  return (
    <Text
      style={[
        style,
        {
          color: isDarkMode ? fontColor.textColorDark : fontColor.textColor,
        },
      ]}>
      {children}
    </Text>
  );
};
