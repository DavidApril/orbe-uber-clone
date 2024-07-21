import {useWindowDimensions} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {RegisterClientForm} from './register-client-form';

export const RegisterClientScreen = () => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.1}}>
          <Text category="h1">Registro</Text>
          <Text category="p2">
            Ingresa los siguientes datos para registrarte
          </Text>
        </Layout>

        <RegisterClientForm />
      </ScrollView>
    </Layout>
  );
};
