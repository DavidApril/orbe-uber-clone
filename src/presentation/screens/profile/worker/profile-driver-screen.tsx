import {useAuthStore, useDriverStore} from '../../../../store';
import {StorageService} from '../../../../services';
import {globalColors, globalDimensions} from '../../../theme/styles';
import {
  Image,
  ScrollView,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {LoadingScreen} from '../../loading/loading-screen';
import {OpenDrawerMenu, StatusButton} from '../../../components';
import {parseDate} from '../../../../utils';
import {DRIVER} from '../../../../interfaces';

export const ProfileDriverScreen = () => {
  const {userByUid, role} = useAuthStore();
  const {height, width} = useWindowDimensions();
  const colorSchema = useColorScheme();
  const {driverServiceIsActive} = useDriverStore();

  if (!userByUid) {
    return <LoadingScreen />;
  }

  const image_url = StorageService.getPhotoByFilename(
    role === DRIVER ? userByUid?.driver!.photo : userByUid.delivery!.imageUrl,
  );

  return (
    <ScrollView
      style={{flex: 1, height, backgroundColor: 'red', position: 'relative'}}>
      <View
        style={{
          backgroundColor:
            colorSchema === 'light'
              ? globalColors.neutralColors.background
              : globalColors.neutralColors.backgroundDark,
          flex: 1,
          paddingHorizontal: 50,
          paddingTop: 130,
          height,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <OpenDrawerMenu />
        <View
          style={{
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              height: 200,
              width: 200,
              borderWidth: 10,
              borderColor:
                colorSchema === 'light'
                  ? globalColors.neutralColors.border
                  : globalColors.stateColors.success,
              backgroundColor: 'white',
              borderRadius: 100,
              overflow: 'hidden',
            }}>
            <Image
              style={{height: 200, width: 200}}
              source={{uri: image_url}}
            />
          </View>

          <View style={{justifyContent: 'center', marginVertical: 10}}>
            <Text style={{textAlign: 'center'}}>
              {role === DRIVER
                ? userByUid.driver?.phone
                : userByUid.delivery?.phone}
            </Text>
            <Text
              style={{
                fontSize: 38,
                textAlign: 'center',
                color:
                  colorSchema === 'light'
                    ? globalColors.fontColor.textColorHeader
                    : globalColors.fontColor.textColorHeaderDark,
              }}>
              {role === DRIVER
                ? userByUid.driver?.name
                : userByUid.delivery?.name}
            </Text>
          </View>

          <View style={{flexDirection: 'row', gap: 20}}>
            <StatusButton isActive={driverServiceIsActive} />

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
                  color:
                    colorSchema === 'light'
                      ? globalColors.fontColor.textColor
                      : globalColors.fontColor.textColorDark,
                }}>
                {userByUid?.driver?.created_date &&
                  parseDate(userByUid?.driver?.created_date)}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // width: width * 0.4,
                borderRadius: globalDimensions.borderRadiusButtom,
                backgroundColor:
                  colorSchema === 'light'
                    ? globalColors.neutralColors.backgroundAlpha
                    : globalColors.neutralColors.backgroundDarkAlpha,
                flex: 1,
              }}>
              <Text>
                <Text style={{fontSize: 40, fontWeight: 'bold'}}>32</Text>{' '}
                viajes
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginVertical: 20,
                justifyContent: 'center',
                padding: 30,
                width: width * 0.4,
                borderRadius: globalDimensions.borderRadiusButtom,
                backgroundColor:
                  colorSchema === 'light'
                    ? globalColors.neutralColors.backgroundAlpha
                    : globalColors.neutralColors.backgroundDarkAlpha,
              }}>
              <Text>Balance</Text>
              <Text>
                <Text
                  numberOfLines={0}
                  style={{fontSize: 28, fontWeight: 'bold'}}>
                  {/* {currencyFormat(5000)} */}
                  834.000
                </Text>{' '}
                cop
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
