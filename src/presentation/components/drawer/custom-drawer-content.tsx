import {
  DrawerContentComponentProps,
  DrawerItemList,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {Button} from '@ui-kitten/components';
import {useAuthStore, useUIStore} from '../../../store';
import {
  Image,
  Modal,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useState} from 'react';
import {StorageService} from '../../../services';
import {CLIENT, DELIVERY, DRIVER, RootStackParams} from '../../../interfaces';
import {fontColor, globalColors, globalDimensions} from '../../theme/styles';
import {useNavigation} from '@react-navigation/native';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParams>>();

  const {logout, userByUid, role} = useAuthStore();
  const {height} = useWindowDimensions();
  const [modal, setModal] = useState<boolean>(false);
  const {isDarkMode} = useUIStore();

  let image_url: string = '';

  if (userByUid) {
    if (role === CLIENT) {
      image_url = StorageService.getPhotoFromCache(userByUid!.cliente!.photo);
    } else if (role === DRIVER) {
      image_url = StorageService.getPhotoFromCache(userByUid!.driver!.photo);
    } else if (role === DELIVERY) {
      image_url = StorageService.getPhotoFromCache(userByUid!.delivery!.imageUrl);
    }
  }

  console.log("df",{image_url})

  return (
    <View
      style={{
        backgroundColor: !isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.backgroundDark,
        height,
        padding: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          height: 100,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <Image
          style={{height: 80, width: 80, borderRadius: 100}}
          source={{uri: image_url}}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              color: !isDarkMode
                ? globalColors.fontColor.textColorHeader
                : globalColors.fontColor.textColorHeaderDark,
            }}>
            {userByUid !== null &&
              (role === DRIVER
                ? userByUid.driver!.name
                : role === DELIVERY
                ? userByUid.delivery!.name
                : role === CLIENT && userByUid.cliente!.name)}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: !isDarkMode
                ? globalColors.fontColor.textColor
                : globalColors.fontColor.textColorDark,
            }}>
            {userByUid?.email}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          height: '75%',
          paddingVertical: 20,
        }}>
        <View>
          <DrawerItemList {...props} />
        </View>

        <Button
          onPress={() => setModal(true)}
          status="danger"
          appearance="ghost">
          Cerrar sesión
        </Button>
      </View>
      <Modal
        visible={modal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setModal(false);
        }}>
        <Pressable
          style={{
            backgroundColor: '#0007',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setModal(false);
          }}>
          <View
            style={{
              width: '90%',
              borderRadius: 20,
              height: 150,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 50,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: isDarkMode
                  ? fontColor.textColorHeaderDark
                  : fontColor.textColorHeaderDark,
              }}>
              Esta seguro de cerrar sesion?
            </Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: globalDimensions.borderRadiusButtom,
                  paddingHorizontal: 20,
                }}
                onPress={() => setModal(false)}>
                <Text style={{color: 'white'}}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: globalDimensions.borderRadiusButtom,
                  paddingHorizontal: 20,
                  backgroundColor: globalColors.stateColors.error,
                }}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'LoginScreen'}],
                  });
                  logout(), setModal(false);
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Cerrar sesion
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
