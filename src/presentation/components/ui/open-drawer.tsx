import React from 'react';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Pressable, StyleProp, useColorScheme, ViewStyle} from 'react-native';
import {globalColors} from '../../theme/styles';
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
  const {isDarkMode} = useUIStore();
  return (
    <Pressable
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{
        height: 45,
        zIndex: 999,
        width: 45,
        borderRadius: 500,
        backgroundColor: isDarkMode
        ? globalColors.neutralColors.backgroundDarkAlpha
        : globalColors.neutralColors.backgroundAlpha,
        justifyContent: 'center',
        position: 'absolute',
        alignItems: 'center',
        top: 20,
        left: 20,
        borderWidth: 1,
        borderColor: globalColors.primaryColors.primary
      }}>
      <CustomIcon fill={globalColors.primaryColors.primary} name="menu-2" />
    </Pressable>
  );
};
