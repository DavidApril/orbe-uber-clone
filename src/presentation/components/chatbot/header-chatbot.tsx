import {Layout, Text} from '@ui-kitten/components';
import {globalColors} from '../../theme/styles';
import {Image, useColorScheme, View} from 'react-native';
import {useUIStore} from '../../../store';
import { OpenDrawerMenu } from '../ui/open-drawer';

export const HeaderChatBot = ({writing}: any) => {
  const colorScheme = useColorScheme();
  const {isDarkMode} = useUIStore();

  return (
    <Layout
      style={{
        flexDirection: 'row',
        zIndex: 99,
        gap: 15,
        paddingHorizontal: 20,
        height: '10%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: isDarkMode 
        ? globalColors.neutralColors.backgroundDarkAlpha 
        : globalColors.neutralColors.backgroundAlpha,
      }}>
      <OpenDrawerMenu />
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
            paddingLeft: 70
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
              {writing}
            </Text>
          </View>
        </View>
      </View>

      <View></View>
    </Layout>
  );
};
