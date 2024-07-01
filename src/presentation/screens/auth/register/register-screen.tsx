import {StackScreenProps} from '@react-navigation/stack';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../../../navigation/stack-navigation';
import {CustomIcon} from '../../../components';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Registrar</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            accessoryLeft={<CustomIcon name="person-outline" />}
            placeholder="Nombre completo"
            style={{marginBottom: 10}}
          />
          <Input
            accessoryLeft={<CustomIcon name="email-outline" />}
            placeholder="Correo eléctronico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
          />
          <Input
            accessoryLeft={<CustomIcon name="lock-outline" />}
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{marginBottom: 20}}
          />
        </Layout>

        {/* Space */}
        <Layout style={{height: 20}}></Layout>

        {/* Button */}
        <Layout>
          <Button appearance="ghost">Crear</Button>
        </Layout>

        {/* Space */}
        <Layout style={{height: 50}}></Layout>

        {/* Not have account */}
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿ya tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}>
            {' '}
            Ingresa aquí
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
