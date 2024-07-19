import {Button, Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../../../store';
import {CustomIcon} from '../../../components';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { RootStackParams } from '../../../../interfaces';

export const ProfileDriverScreen = () => {
  const {user} = useAuthStore();
  // const navigation = useNavigation<NavigationProp<RootStackParams>>();

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
            <Text style={{}}>hola,</Text>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {user?.displayName}
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

          <Button
            status="success"
            accessoryRight={
              <CustomIcon white name="arrow-circle-down-outline" />
            }
            appearance="ghost">
            Retirar dinero
          </Button>
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
  );
};
