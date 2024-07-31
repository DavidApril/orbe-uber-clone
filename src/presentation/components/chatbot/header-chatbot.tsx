import {Layout, Text} from '@ui-kitten/components';
import {globalColors} from '../../theme/styles';
import {Image, useColorScheme, View} from 'react-native';
import {useChatbotStore, useUIStore} from '../../../store';

export const HeaderChatBot = () => {
  const colorScheme = useColorScheme();
  const {isDarkMode} = useUIStore();
  const {loadingAnswer} = useChatbotStore();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 15,
        paddingVertical: 15,

        alignItems: 'center',
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDarkAlpha
          : globalColors.neutralColors.backgroundAlpha,
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            // justifyContent: 'center',
            paddingLeft: 110,
            alignItems: 'center',
            flex: 1,
            gap: 5,
          }}>
          <Image
            style={{
              height: 68,
              width: 68,
            }}
            source={require('../../../assets/logo_orbe.png')}
          />
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color:
                  colorScheme === 'dark'
                    ? globalColors.fontColor.textColorHeaderDark
                    : globalColors.fontColor.textColorHeader,
              }}>
              Orbe
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                color:
                  colorScheme === 'dark'
                    ? globalColors.fontColor.textColorDark
                    : globalColors.fontColor.textColor,
              }}>
              {loadingAnswer ? 'Escribiendo...' : 'chatbot'}
            </Text>
          </View>
        </View>
      </View>

      <View></View>
    </View>
  );
};
