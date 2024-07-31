import React from 'react';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Pressable, StyleProp, useColorScheme, ViewStyle} from 'react-native';
import {globalColors, globalStyles} from '../../theme/styles';
import {CustomIcon} from './custom-icon';
import {useUIStore} from '../../../store';

interface Props {
  left?: number;
  right?: number;
  style?: StyleProp<ViewStyle>;
  top?: number;
}

export const OpenDrawerMenu = ({style}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={[
        {
          position: 'absolute',
          top: 30,
          left: 30,
          height: 45,
          width: 45,
          backgroundColor: 'white',
          borderRadius: 50,
          justifyContent: 'center',
          zIndex: 9999,
          alignItems: 'center',
        },
        globalStyles.boxShadow,
      ]}>
      <CustomIcon fill="black" name="menu-2" />
    </Pressable>
  );
};
