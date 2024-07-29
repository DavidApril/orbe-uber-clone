import {Layout} from '@ui-kitten/components';
import {useEffect, useRef, useState} from 'react';
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

export const ChatBotContainer = ({writingTrue, writingFalse}: any) => {
  const {height, width} = useWindowDimensions();
  const {isDarkMode} = useUIStore();
  const scrollViewRef = useRef<ScrollView>(null);

  const [prompt, setPrompt] = useState<string>('');

  const [chat, setChat] = useState<ChatbotResponse>();
  const {chat_history, setNewMessage} = useChatbotStore();

  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chat_history, loadingAnswer]);

  if (loadingAnswer) {
    writingTrue()
  } else {
    writingFalse()
  }

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
          height: height * 0.88,
          flexDirection: 'column',
          paddingHorizontal: 30,
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: isDarkMode 
          ? globalColors.neutralColors.backgroundDarkAlpha 
          : globalColors.neutralColors.backgroundAlpha
        },
        globalStyles.boxShadow,
      ]}>
      <View
        style={{
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.backgroundAlpha
            : globalColors.neutralColors.backgroundDarkAlpha,
          width: width,
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      />

      <View style={{ height: '85%', position: 'absolute', left: 30, top: 10, justifyContent: 'center' }}>
        <ScrollView
          ref={scrollViewRef}
          style={{
            gap: 10,
            // backgroundColor: 'black',
            flexDirection: 'column',
            width: '100%',
          }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
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


      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: 30,
          bottom: 50,
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
            backgroundColor: !loadingAnswer && prompt.length > 0
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
    </Layout>
  );
};
