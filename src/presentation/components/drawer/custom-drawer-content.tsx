import {
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Button, Layout} from '@ui-kitten/components';
import {useAuthStore, useUIStore} from '../../../store';
import {
  Image,
  Modal,
  Pressable,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {useState} from 'react';
import {StorageService} from '../../../services';
import {CLIENT, DRIVER} from '../../../interfaces';
import {fontColor, globalColors, globalDimensions} from '../../theme/styles';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {logout, userByUid, role} = useAuthStore();
  const {height} = useWindowDimensions();
  const [modal, setModal] = useState<boolean>(false);
  const {isDarkMode} = useUIStore();

  let image_url: string = '';

  if (userByUid) {
    if (role === CLIENT) {
      image_url = StorageService.getPhotoByFilename(userByUid?.cliente.photo);
    } else if (role === DRIVER) {
      // @ts-ignore
      image_url = StorageService.getPhotoByFilename(userByUid!.driver.photo);
    }
  }

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
            {/* @ts-ignore */}
            {role === CLIENT ? userByUid?.cliente.name : userByUid?.driver.name}
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
