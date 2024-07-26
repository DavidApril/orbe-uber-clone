import {
  DrawerContentComponentProps,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Button, Layout} from '@ui-kitten/components';
import {useAuthStore} from '../../../store';
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
import {globalColors} from '../../theme/styles';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {logout, userByUid, role} = useAuthStore();
  const {height} = useWindowDimensions();
  const [modal, setModal] = useState<boolean>(false);
  const colorScheme = useColorScheme();

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
        backgroundColor:
          colorScheme === 'light'
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
        height,
        padding: 20,
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
              color:
                colorScheme === 'light'
                  ? globalColors.fontColor.textColorHeader
                  : globalColors.fontColor.textColorHeaderDark,
            }}>
            {userByUid?.cliente.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color:
                colorScheme === 'light'
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
              gap: 10,
            }}>
            <Text style={{fontSize: 18}}>Esta seguro de cerrar sesion?</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: '#00c1f1',
                  borderColor: '#00c1f1',
                }}
                onPress={() => setModal(false)}>
                <Text style={{color: 'white'}}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={{
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#00c1f1',
                }}
                onPress={() => {
                  logout(), setModal(false);
                }}>
                <Text style={{color: '#00c1f1'}}>Cerrar sesion</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
