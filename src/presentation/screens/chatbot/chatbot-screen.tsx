import {Layout} from '@ui-kitten/components';
import React from 'react';
import {HeaderChatBot} from '../../components';
import {globalColors} from '../../theme/styles';
import {ChatBotContainer} from '../../components/chatbot/chat';
import {useUIStore} from '../../../store';

export const ChatBotScreen = () => {
  const {isDarkMode} = useUIStore();
  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.backgroundDark,
      }}>
      <ChatBotContainer></ChatBotContainer>

      <HeaderChatBot />
    </Layout>
  );
};
