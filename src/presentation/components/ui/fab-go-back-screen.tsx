import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';
import {Pressable, StyleProp, ViewStyle} from 'react-native';
import {globalStyles} from '../../theme/styles';
import {CustomIcon} from './custom-icon';
import {useUIStore} from '../../../store';

interface Props {
  fill?: string;
  style?: StyleProp<ViewStyle>;
}

export const FABGoBackButton = ({fill, style}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {isDarkMode} = useUIStore();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={[
        {
          position: 'absolute',
          top: 30,
          right: 30,
          height: 45,
          width: 45,
          backgroundColor: 'white',
          borderRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
        },
        globalStyles.boxShadow,
      ]}>
      <CustomIcon fill="black" name="undo" />
    </Pressable>
  );
};
