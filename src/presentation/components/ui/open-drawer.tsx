import React from 'react';
import {FAB} from './floating-action-button';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';

interface Props {
  left?: number;
  right?: number;
  top?: number;
}

export const OpenDrawerMenu = ({top = 20, left, right}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <FAB
      iconName="menu-2-outline"
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
      style={{
        position: 'absolute',
        left: left,
        right: right,
        top: top,
      }}
    />
  );
};
