import React from 'react';
import {FAB} from './floating-action-button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  fill?: string;
  style?: StyleProp<ViewStyle>;
}

export const FABGoBackButton = ({fill, style}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <FAB
      style={style}
      iconName="arrow-back"
      fill={fill}
      onPress={() => navigation.goBack()}
    />
  );
};
