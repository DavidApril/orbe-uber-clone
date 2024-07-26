import {Layout} from '@ui-kitten/components';
import React, {PropsWithChildren} from 'react';
import {globalColors, globalDimensions, globalStyles} from '../../theme/styles';
import {
  ScrollView,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
  Text,
} from 'react-native';

export const ChatBotContainer = ({children}: PropsWithChildren) => {
  const {height} = useWindowDimensions();
  const colorScheme = useColorScheme();

  return (
    <Layout
      style={[
        {
          height: height * 0.85,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flexDirection: 'column-reverse',
          paddingBottom: height * 0.13,
          padding: 15,
          backgroundColor:
            colorScheme === 'light'
              ? globalColors.neutralColors.backgroundAlpha
              : globalColors.neutralColors.backgroundDarkAlpha,
        },
        globalStyles.boxShadow,
      ]}>
      <View>
        <TextInput
          placeholderTextColor={
            colorScheme === 'light'
              ? globalColors.neutralColors.placeholderColor
              : globalColors.neutralColors.placeholderColorDark
          }
          style={{
            paddingHorizontal: 20,
            backgroundColor:
              colorScheme === 'light'
                ? globalColors.neutralColors.textInputBackground
                : globalColors.neutralColors.textInputBackgroundDark,
            borderRadius: globalDimensions.borderRadiusButtom,
          }}
          placeholder="Escribe un mensaje..."
        />
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={{flexDirection: 'column', gap: 10}}>
          <View
            style={{
              backgroundColor:
                colorScheme === 'light'
                  ? globalColors.neutralColors.messageChatBackground
                  : globalColors.neutralColors.messageChatBackgroundDark,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              borderBottomLeftRadius: 40,
              padding: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: globalColors.grayScale.white,
              }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates labore ipsum, ducimus veritatis, itaque eius nemo
              sapiente commodi repellat odit vitae necessitatibus culpa
              doloribus.
            </Text>
          </View>
          <View
            style={{
              backgroundColor:
                colorScheme === 'light'
                  ? globalColors.neutralColors.messageReceptChatBackground
                  : globalColors.neutralColors.messageReceptChatBackgroundDark,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              borderBottomRightRadius: 40,
              padding: 20,
            }}>
            <Text style={{fontSize: 16, color: globalColors.grayScale.white}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates labore ipsum, ducimus veritatis, itaque eius nemo
              sapiente commodi repellat odit vitae necessitatibus culpa
              doloribus.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};
