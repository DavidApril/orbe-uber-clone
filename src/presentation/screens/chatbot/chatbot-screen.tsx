import {Layout} from '@ui-kitten/components';
import React, {useEffect, useRef, useState} from 'react';
import {ChatIsWritting, CustomIcon, HeaderChatBot} from '../../components';
import {globalColors, globalDimensions, globalStyles} from '../../theme/styles';
import {useChatbotStore, useUIStore} from '../../../store';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {ChatbotResponse} from '../../../interfaces';
import {ChatbotService} from '../../../services';
import {ReceiveMessage} from '../../components/chatbot/receive-message';
import {SendMessage} from '../../components/chatbot/send-message';

export const ChatBotScreen = () => {
  const {isDarkMode} = useUIStore();
  const {height, width} = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [prompt, setPrompt] = useState<string>('');

  const [chat, setChat] = useState<ChatbotResponse>();
  const {chat_history, setNewMessage, loadingAnswer, setLoadingAnswer} =
    useChatbotStore();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  }, [chat_history, loadingAnswer]);

  const handleSendMessage = async () => {
    setNewMessage({
      role: 'user',
      text: prompt,
    });

    setLoadingAnswer(true);

    const response = await ChatbotService.createChat(prompt);
    if (response) {
      setChat(response);
    }

    setLoadingAnswer(false);
  };

  useEffect(() => {
    chat?.data.forEach(message => {
      if (message.role === 'assistant') {
        setNewMessage({
          role: message.role,
          text: message.content[0].text.value,
        });
      }
    });
  }, [chat]);
  return (
    <Layout
      style={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        backgroundColor: !isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.backgroundDark,
      }}>
      <HeaderChatBot />

      <View style={{flex: 1, width: '100%', justifyContent: 'space-between'}}>
        <ScrollView style={{padding: 30}}>
          {chat_history?.map((data, index) => {
            if (data.role === 'assistant') {
              return <ReceiveMessage key={index} message={data.text} />;
            } else if (data.role === 'user') {
              return <SendMessage key={index} message={data.text} />;
            }
          })}
          {loadingAnswer && <ChatIsWritting />}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'center',
            // width: width - 60,
            padding: 30,
          }}>
          <TextInput
            onChangeText={setPrompt}
            placeholderTextColor={
              !isDarkMode
                ? globalColors.neutralColors.placeholderColor
                : globalColors.neutralColors.placeholderColorDark
            }
            style={{
              flex: 1,
              paddingHorizontal: 20,
              backgroundColor: !isDarkMode
                ? globalColors.neutralColors.textInputBackground
                : globalColors.neutralColors.textInputBackgroundDark,
              borderRadius: globalDimensions.borderRadiusButtom,
            }}
            placeholder="Escribe un mensaje..."
          />

          <TouchableOpacity
            disabled={loadingAnswer || prompt.length === 0}
            onPress={handleSendMessage}
            style={{
              height: 55,
              width: 55,
              backgroundColor:
                !loadingAnswer && prompt.length > 0
                  ? globalColors.primaryColors.primary
                  : isDarkMode
                  ? globalColors.neutralColors.backgroundDarkAlpha
                  : globalColors.neutralColors.borderDark,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomIcon
              white={isDarkMode ? false : true}
              name="paper-plane-outline"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};
