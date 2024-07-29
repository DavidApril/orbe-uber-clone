import {Layout} from '@ui-kitten/components';
import React, { useState } from 'react';
import {HeaderChatBot} from '../../components';
import {globalColors} from '../../theme/styles';
import {ChatBotContainer} from '../../components/chatbot/chat';
import {useUIStore} from '../../../store';

export const ChatBotScreen = () => {
  const {isDarkMode} = useUIStore();
  const [isWriting, setIsWriting] = useState<string>('Chatbox')
  return (
    <Layout
      style={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: !isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.backgroundDark,
      }}>
      <HeaderChatBot writing={isWriting} />
      <ChatBotContainer writingTrue={() => setIsWriting('Escribiendo...')} writingFalse={() => setIsWriting('Chatbox')} />
    </Layout>
  );
};
