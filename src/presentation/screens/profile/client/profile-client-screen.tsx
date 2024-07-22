import {Button, Layout, Radio, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../../../store';
import {CustomIcon} from '../../../components';
import {UserService} from '../../../../services';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { RootStackParams } from '../../../../interfaces';

export const ProfileClientScreen = () => {
  const {user} = useAuthStore();
  // const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [userByUid, setUserByUid] = useState<any>();

  const getClientByUID = async () => {
    const clientByUID = await UserService.getUserByUid(user?.uid);
    setUserByUid(clientByUID);
  };

  useEffect(() => {
    getClientByUID();
  }, [user]);

  return (
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
              borderRadius: 50,
            }}></Layout>

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
          <Layout style={{backgroundColor: 'transparent'}}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>
              Metodo de pago
            </Text>
            <Text>
              Visa {`\n`}
              Número: 4575623182290326 {`\n`}
              Fecha Expiración: 12/2025 {`\n`}
              CVV: 123 {`\n`}
            </Text>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
