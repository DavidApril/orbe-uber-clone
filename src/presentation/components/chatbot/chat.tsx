import {Layout} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {globalColors, globalDimensions, globalStyles} from '../../theme/styles';
import {
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
  Text,
} from 'react-native';
import {useChatbotStore, useUIStore} from '../../../store';
import {SendMessage} from './send-message';
import {ReceiveMessage} from './receive-message';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {CustomIcon} from '../ui/custom-icon';
import {ChatbotService} from '../../../services';
import {ChatbotResponse} from '../../../interfaces';

import {ChatIsWritting} from '../ui/chat-writting';

export const ChatBotContainer = () => {
  const {height, width} = useWindowDimensions();
  const {isDarkMode} = useUIStore();

  const [prompt, setPrompt] = useState<string>('');

  const [chat, setChat] = useState<ChatbotResponse>();
  const {chat_history, setNewMessage} = useChatbotStore();

  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);

  const handleSendMessage = async () => {
    setNewMessage({
      role: 'user',
      text: prompt,
    });
    setLoadingAnswer(true);
    const response = await ChatbotService.createChat(prompt);
    if (response) {
      setChat(response);
    } else {
      console.log('error');
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
      style={[
        {
          flexDirection: 'column-reverse',
          bottom: 0,
          paddingBottom: height * 0.13,
          padding: 15,
          position: 'relative',
        },
        globalStyles.boxShadow,
      ]}>
      <View
        style={{
          position: 'absolute',
          height: height * 0.8,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.backgroundAlpha
            : globalColors.neutralColors.backgroundDarkAlpha,
          bottom: 0,
          left: 0,
          right: 0,
          width: width,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          paddingTop: 15,
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
          disabled={loadingAnswer}
          onPress={handleSendMessage}
          style={{
            height: 55,
            width: 55,
            backgroundColor: !loadingAnswer
              ? globalColors.stateColors.success
              : isDarkMode
              ? globalColors.neutralColors.backgroundDarkAlpha
              : globalColors.neutralColors.backgroundDark,
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

      <View style={{flexDirection: 'column', gap: 10}}>
        <ScrollView
          style={{
            gap: 10,
            // backgroundColor: 'black',
            flexDirection: 'column-reverse',
            height: height * 0.6,
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            flex: 1,
            width: '100%',
            left: 0,
            position: 'absolute',
            bottom: 0,
          }}>
          {chat_history?.map((data, index) => {
            if (data.role === 'assistant') {
              return <ReceiveMessage key={index} message={data.text} />;
            } else if (data.role === 'user') {
              return <SendMessage key={index} message={data.text} />;
            }
          })}
          {loadingAnswer && <ChatIsWritting />}
        </ScrollView>
      </View>
    </Layout>
  );
};
