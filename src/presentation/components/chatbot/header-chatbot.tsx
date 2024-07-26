import {Layout, Text} from '@ui-kitten/components';
import {globalColors} from '../../theme/styles';
import {Image, useColorScheme, View} from 'react-native';
import {useUIStore} from '../../../store';

export const HeaderChatBot = () => {
  const colorScheme = useColorScheme();
  const {isDarkMode} = useUIStore();
  return (
    <Layout
      style={{
        flexDirection: 'row',
        gap: 15,
        marginTop: 15,
        marginHorizontal: 15,
        height: 90,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: !isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.backgroundDark,
      }}>
      <View
        style={{
          margin: 5,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
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
              Chatbot
            </Text>
          </View>
        </View>
      </View>

      <View></View>
    </Layout>
  );
};
