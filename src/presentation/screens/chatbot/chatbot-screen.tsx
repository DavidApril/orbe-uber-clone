import {Layout} from '@ui-kitten/components';
import React from 'react';
import {useColorScheme, useWindowDimensions} from 'react-native';
import {HeaderChatBot} from '../../components';
import {globalColors} from '../../theme/styles';

export const ChatBotScreen = () => {
  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();
  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        backgroundColor: globalColors.neutralColors.background
      }}>
      <Layout
        style={{
          height: height * 0.85,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderWidth: 2,
          borderColor:
            colorScheme === 'light'
              ? globalColors.neutralColors.border
              : globalColors.neutralColors.borderDark,

          backgroundColor:
            colorScheme === 'dark'
              ? globalColors.secondaryColors.secondary
              : globalColors.neutralColors.background,
        }}></Layout>

      <HeaderChatBot />
    </Layout>
  );
};
