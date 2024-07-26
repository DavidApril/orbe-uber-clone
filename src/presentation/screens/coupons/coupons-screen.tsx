import React from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {globalColors} from '../../theme/styles';
import {FABGoBackButton} from '../../components';

export const CouponsScreen = () => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colorScheme === 'light'
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
      }}>
      <FABGoBackButton />
    </View>
  );
};
