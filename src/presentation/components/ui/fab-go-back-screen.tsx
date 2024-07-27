import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';
import {StyleProp, useColorScheme, ViewStyle} from 'react-native';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {globalColors} from '../../theme/styles';
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
    <TouchableOpacity
      style={[
        {
          zIndex: 999,
          width: 45,
          borderRadius: 500,
          justifyContent: 'center',
          alignItems: 'center',
          top: 30,
          left: 30,
          position: 'absolute',
          height: 45,
          backgroundColor: globalColors.primaryColors.primary,
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
      onPress={() => navigation.goBack()}>
      <CustomIcon white={!isDarkMode} name="arrow-back" />
    </TouchableOpacity>
  );
};
