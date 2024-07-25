import {Button, CheckBox, Input, Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../../../store';
import {StorageService, UserService} from '../../../../services';
import {useEffect, useMemo, useRef, useState} from 'react';
import {globalColors} from '../../../theme/styles';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import {CustomIcon, FABGoBackButton} from '../../../components';
import {Image} from 'react-native';
import {ClientResponseByUid} from '../../../../interfaces';
import {LoadingScreen} from '../../loading/loading-screen';

export const ProfileClientScreen = () => {
  const {user} = useAuthStore();

  const [userByUid, setUserByUid] = useState<ClientResponseByUid | undefined>();

  const getClientByUID = async () => {
    const clientByUID = await UserService.getClientByUid(user!.uid);
    setUserByUid(clientByUID);
  };

  if (!userByUid) {
    return <LoadingScreen />;
  }

  const image_url = StorageService.getPhotoByFilename(userByUid!.cliente.photo);

  console.log(StorageService.getPhotoByFilename(userByUid?.cliente.photo));

  useEffect(() => {
    getClientByUID();
  }, [user]);
  const addTarjetBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['70%'], []);

  return (
    <ScrollView>
      <FABGoBackButton fill="white" style={{top: 20, left: 20}} />
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

          <Layout
            style={{
              borderRadius: 30,
              padding: 20,
              // backgroundColor: 'black',
              flexDirection: 'row',
              paddingVertical: 30,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Layout
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 25}}>
                Métodos de pago
              </Text>

              <Layout style={{height: 15}}></Layout>

              <Layout
                style={{
                  padding: 20,
                  width: '100%',
                  left: 0,
                  right: 0,
                  borderRadius: 15,
                  backgroundColor: globalColors.themeDark,
                  flexDirection: 'column',
                  gap: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    justifyContent: 'flex-end',
                    color: globalColors.white,
                  }}>
                  Visa
                </Text>

                <Text
                  style={{
                    fontWeight: 'condensed',
                    justifyContent: 'flex-end',
                    color: globalColors.white,
                    fontSize: 22,
                  }}>
                  4575 6231 8229 0326 {`\n`}
                </Text>
                <Layout
                  style={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'yellow'}}>12/2025 {`\n`}</Text>
                  <Text
                    style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
                    {' '}
                    123
                  </Text>
                </Layout>
              </Layout>

              <Layout style={{height: 10}}></Layout>

              <Button
                onPress={() => addTarjetBottomSheetRef.current?.expand()}
                status="success"
                style={{borderRadius: 50}}>
                Añadir
              </Button>
            </Layout>
          </Layout>
        </Layout>
      </Layout>

      <BottomSheet
        enablePanDownToClose={true}
        ref={addTarjetBottomSheetRef}
        snapPoints={snapPoints}>
        <Layout style={{margin: 30}}>
          <Layout style={{flexDirection: 'column', gap: 10}}>
            <Text style={{fontSize: 18}}>Nombre</Text>
            <Input placeholder="Propietario" />
          </Layout>
          <Layout style={{height: 10}}></Layout>

          <Layout style={{flexDirection: 'column', gap: 10}}>
            <Text style={{fontSize: 18}}>Número de tarjeta</Text>
            <Input placeholder="4575 6231 8229 0326" />
          </Layout>

          <Layout style={{height: 10}}></Layout>

          <Layout style={{flexDirection: 'row', gap: 10}}>
            <Layout style={{flexDirection: 'column', gap: 10, flex: 1}}>
              <Text style={{fontSize: 18}}>Fecha</Text>
              <Input placeholder="MM/YY" />
            </Layout>

            <Layout style={{flexDirection: 'column', gap: 10, flex: 1}}>
              <Text style={{fontSize: 18}}>CVC</Text>
              <Input placeholder="123" />
            </Layout>
          </Layout>

          <Layout
            style={{
              margin: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CheckBox>
              <Text>Guardar datos para pagos futuros</Text>
            </CheckBox>
          </Layout>

          <Button status="success">Añadir</Button>
        </Layout>
      </BottomSheet>
    </ScrollView>
  );
};
