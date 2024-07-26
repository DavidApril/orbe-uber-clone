import {Layout} from '@ui-kitten/components';
import React from 'react';
import {ScrollView, useColorScheme, useWindowDimensions} from 'react-native';
import {HeaderChatBot} from '../../components';
import {globalColors} from '../../theme/styles';
import {ChatBotContainer} from '../../components/chatbot/chat';

export const ChatBotScreen = () => {
  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();
  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        backgroundColor:
          colorScheme === 'light'
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
      }}>
      <ChatBotContainer></ChatBotContainer>

      <HeaderChatBot />
    </Layout>
  );
};
