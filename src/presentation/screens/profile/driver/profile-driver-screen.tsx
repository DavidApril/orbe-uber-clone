import {Layout, Text} from '@ui-kitten/components';
import {useAuthStore} from '../../../../store';

export const ProfileDriverScreen = () => {
  const {user} = useAuthStore();

  console.log({user})

  return (
    <Layout style={{flex: 1}}>
      <Layout
        style={{
          margin: 30,
          height: 100,
          borderRadius: 30,
          // backgroundColor: 'black',
          borderWidth: 1,
        }}>
        <Text>Nombre: {user?.displayName}</Text>
      </Layout>

      <Text>Driver</Text>
    </Layout>
  );
};
