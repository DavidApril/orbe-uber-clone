import {Layout, Text} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';
import {globalColors, globalStyles} from '../../theme/styles';
import {Image, Pressable, useColorScheme, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';

export const HeaderChatBot = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Layout
      style={{
        flexDirection: 'row',
        gap: 15,
        padding: 10,
        height: 90,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:
          colorScheme === 'light'
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
      }}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={[
          globalStyles.FABBackButton,
          {
            borderColor:
              colorScheme === 'dark'
                ? globalColors.neutralColors.borderDark
                : globalColors.neutralColors.border,
            backgroundColor:
              colorScheme === 'dark'
                ? globalColors.neutralColors.backgroundDark
                : globalColors.neutralColors.background,
          },
        ]}>
        <CustomIcon
          fill={
            colorScheme === 'dark'
              ? globalColors.grayScale.white
              : globalColors.grayScale.black
          }
          name="arrow-back"
        />
      </Pressable>
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
