import {
  useWindowDimensions,
  useColorScheme,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import {ClientService, StorageService} from '../../../services';
import {useAuthStore, useCouponStore, useUIStore} from '../../../store';
import {parseDate} from '../../../utils';
import {
  CustomIcon,
  FABGoBackButton,
  OpenDrawerMenu,
  StatusButton,
} from '../../components';
import {globalColors, globalDimensions} from '../../theme/styles';
import {LoadingScreen} from '../loading/loading-screen';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';

export const ProfileClientScreen = () => {
  const {userByUid} = useAuthStore();
  const {addPoints, points} = useCouponStore();
  const {height, width} = useWindowDimensions();
  const {isDarkMode} = useUIStore();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (userByUid) {
      ClientService.getClientByUid(userByUid?.uid_firebase).then(user =>
        addPoints(user.points),
      );
    }
  }, [isFocused]);

  if (!userByUid) {
    return <LoadingScreen />;
  }

  return (
    <>
      <OpenDrawerMenu />
      <FABGoBackButton />
      <ScrollView
        style={{flex: 1, height, backgroundColor: 'red', position: 'relative'}}>
        <View
          style={{
            backgroundColor: !isDarkMode
              ? globalColors.neutralColors.background
              : globalColors.neutralColors.backgroundDark,
            flex: 1,
            paddingHorizontal: 50,
            paddingTop: 130,
            height,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'column',
              gap: 10,
              alignItems: 'center',
              flex: 1,
            }}>
            <View
              style={{
                height: 240,
                width: 240,
                backgroundColor: 'white',
                borderRadius: 100,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {userByUid.cliente.photo !== '' ? (
                <Image
                  style={{height: 240, width: 240}}
                  source={{
                    uri: StorageService.getPhotoByFilename(
                      userByUid.cliente.photo,
                    ),
                  }}
                />
              ) : (
                <View style={{transform: [{scale: 3}]}}>
                  <CustomIcon
                    fill={isDarkMode ? 'black' : 'white'}
                    name="person"
                  />
                </View>
              )}
            </View>

            <View style={{justifyContent: 'center', marginVertical: 10}}>
              <Text style={{textAlign: 'center'}}>
                {userByUid.cliente!.phone}
              </Text>
              <Text
                style={{
                  fontSize: 38,
                  textAlign: 'center',
                  color: !isDarkMode
                    ? globalColors.fontColor.textColorHeader
                    : globalColors.fontColor.textColorHeaderDark,
                }}>
                {userByUid.cliente!.name}
              </Text>
            </View>

            <View style={{flexDirection: 'row', gap: 20}}>
              <StatusButton isActive />

              <View
                style={{
                  height: '100%',
                  width: 1,
                  backgroundColor: globalColors.grayScale.gray,
                  borderRadius: 50,
                }}
              />

              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    color: !isDarkMode
                      ? globalColors.fontColor.textColor
                      : globalColors.fontColor.textColorDark,
                  }}>
                  {userByUid.cliente?.created_date &&
                    parseDate(userByUid.cliente?.created_date)}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', gap: 10}}>
              <View
                style={{
                  flex: 1,
                  marginVertical: 20,
                  justifyContent: 'center',
                  padding: 30,
                  width: width * 0.4,
                  borderRadius: globalDimensions.borderRadiusButtom,
                  backgroundColor: !isDarkMode
                    ? globalColors.neutralColors.backgroundAlpha
                    : globalColors.neutralColors.backgroundDarkAlpha,
                }}>
                <Text>Puntos</Text>
                <Text style={{fontSize: 28, fontWeight: 'bold'}}>
                  {points.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
