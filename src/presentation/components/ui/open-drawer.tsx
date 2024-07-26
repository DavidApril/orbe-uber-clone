import React from 'react';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {StyleProp, useColorScheme, ViewStyle} from 'react-native';
import {globalColors} from '../../theme/styles';
import {CustomIcon} from './custom-icon';

interface Props {
  left?: number;
  right?: number;
  style?: StyleProp<ViewStyle>;
  top?: number;
}

export const OpenDrawerMenu = ({style}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={[
        {
          zIndex: 99999999999999,
          position: 'absolute',
          borderRadius: 100,
          height: 45,
          width: 45,
          top: 30,
          left: 30,
          justifyContent: 'center',
          backgroundColor:
            colorScheme === 'light' ? globalColors.primaryColors.primary : '',
          alignItems: 'center',
          shadowOpacity: 0.3,
          shadowOffset: {
            height: 0.27,
            width: 4.5,
          },
          elevation: 5,
        },
        ,
        style,
      ]}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
      <CustomIcon
        white={colorScheme === 'light' ? true : false}
        name="menu-2-outline"
      />
    </TouchableOpacity>
  );
};
