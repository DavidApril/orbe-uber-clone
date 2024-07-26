import {Button, CheckBox, Input, Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../../../store';
import {StorageService, UserService} from '../../../../services';
import {useEffect, useMemo, useRef, useState} from 'react';
import {globalColors} from '../../../theme/styles';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {CustomIcon, FABGoBackButton} from '../../../components';
import {Image} from 'react-native';
import {RootStackParams} from '../../../../interfaces';
import {LoadingScreen} from '../../loading/loading-screen';
import {NavigationProp, useNavigation} from '@react-navigation/native';

export const ProfileClientScreen = () => {
  const {user, userByUid} = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  if (!user) {
    navigation.goBack();
  }

  if (!userByUid) {
    return <LoadingScreen />;
  }

  const image_url = StorageService.getPhotoByFilename(userByUid!.cliente.photo);

  console.log(StorageService.getPhotoByFilename(userByUid?.cliente.photo));

  return (
    <ScrollView>
      <FABGoBackButton fill="white" style={{top: 10, left: 10}} />
      <Layout
        style={{
          flex: 1,
        }}>
        <Layout
          style={{
            margin: 30,
            gap: 10,
            flexDirection: 'column',
          }}>
          <Layout
            style={{
              height: 100,
              flexDirection: 'row',
              gap: 10,
              paddingHorizontal: 20,
              alignItems: 'center',
            }}>
            <Layout
              style={{
                height: 80,
                width: 80,
                backgroundColor: 'white',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 50,
                overflow: 'hidden',
              }}>
              {userByUid && userByUid.cliente.photo.length > 0 ? (
                <Image
                  style={{height: '100%', width: '100%'}}
                  source={{
                    uri: image_url,
                  }}
                />
              ) : (
                <CustomIcon fill="black" name="person" />
              )}
            </Layout>

            <Layout style={{backgroundColor: 'transparent'}}>
              <Text style={{}}>Hola,</Text>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                {userByUid?.cliente.name}
              </Text>
            </Layout>
          </Layout>
          <Layout
            style={{
              height: 120,
              borderRadius: 30,
              padding: 20,
              backgroundColor: 'black',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Layout style={{backgroundColor: 'transparent'}}>
              <Text style={{color: 'white'}}>Balance</Text>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 40}}>
                1.234$
              </Text>
            </Layout>
          </Layout>

          <Layout
            style={{
              height: 120,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
            }}>
            <Layout
              style={{
                backgroundColor: 'black',
                borderRadius: 30,
                height: 120,
                padding: 20,
                flex: 1,
              }}>
              <Text style={{color: 'white'}}>Rating</Text>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 40}}>
                4.8
              </Text>
            </Layout>

            <Layout
              style={{
                backgroundColor: '#edece8',
                borderRadius: 30,
                padding: 20,
                flex: 1,
                height: 120,
              }}>
              <Text style={{color: 'black'}}>Hoy</Text>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 40}}>
                26 <Text style={{color: 'black'}}>Viajes</Text>
              </Text>
            </Layout>
          </Layout>
          {/* <Button onPress={() => navigation.goBack()} appearance="ghost">Volver</Button> */}
        </Layout>
      </Layout>
    </ScrollView>
  );
};
