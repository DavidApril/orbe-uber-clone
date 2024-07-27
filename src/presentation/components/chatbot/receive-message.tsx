import React from 'react';
import {Text, View} from 'react-native';
import {globalColors} from '../../theme/styles';
import {useUIStore} from '../../../store';
import {useAnimation} from '../../../hooks';

export const ReceiveMessage = ({message}: {message: string}) => {
  const {isDarkMode} = useUIStore();
  const {fadeAnim} = useAnimation();
  return (
    <View
      style={{
        backgroundColor: !isDarkMode
          ? globalColors.neutralColors.messageReceptChatBackground
          : globalColors.neutralColors.messageReceptChatBackgroundDark,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        padding: 20,
        marginBottom: 10,
        // opacity: fadeAnim,
      }}>
      <Text style={{fontSize: 16, color: globalColors.grayScale.white}}>
        {message}
      </Text>
    </View>
  );
};
