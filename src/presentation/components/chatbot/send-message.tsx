import React from 'react';
import {Text, View} from 'react-native';
import {globalColors} from '../../theme/styles';
import {useUIStore} from '../../../store';

interface Props {
  message: string;
}

export const SendMessage = ({message}: Props) => {
  const {isDarkMode} = useUIStore();

  return (
    <View
      style={{
        backgroundColor: !isDarkMode
          ? globalColors.neutralColors.messageChatBackground
          : globalColors.neutralColors.messageChatBackgroundDark,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        padding: 20,
        marginBottom: 10,
        
      }}>
      <Text
        style={{
          fontSize: 16,
          color: globalColors.grayScale.white,
        }}>
        {message}
      </Text>
    </View>
  );
};
