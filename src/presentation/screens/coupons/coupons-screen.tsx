import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {globalColors} from '../../theme/styles';
import {FABGoBackButton} from '../../components';
import {useUIStore} from '../../../store';

export const CouponsScreen = () => {
  const colorScheme = useColorScheme();
  const {isDarkMode} = useUIStore();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.backgroundDark,
      }}>
      <FABGoBackButton />

      <Text></Text>
    </View>
  );
};
