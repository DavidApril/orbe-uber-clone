import {StackScreenProps} from '@react-navigation/stack';
import {Button, Layout, Text, Toggle} from '@ui-kitten/components';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import { RootStackParams } from '../../../../interfaces';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();

  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{height: 60}}></Layout>

        <Layout
          style={{
            paddingTop: height * 0.35,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text style={{fontSize: 20, color: checked ? 'green' : 'gray'}}>
            ¿Eres un conductor?
          </Text>
          <Toggle
            checked={checked}
            onChange={setChecked}
            style={{marginVertical: 10}}></Toggle>
        </Layout>
        <Layout style={{height: 60}}></Layout>

        <Button
          onPress={() => {
            navigation.push(
              checked ? 'RegisterDriverScreen' : 'RegisterClientScreen',
            );
          }}>
          Continuar
        </Button>

        {/* Inputs */}
        {/* <Layout style={{marginTop: 20}}>
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
        </Layout> */}

        {/* Space */}

        {/* Button */}
        {/* <Layout>
          <Button appearance="ghost">Crear</Button>
        </Layout> */}

        {/* Space */}
        {/* <Layout style={{height: 50}}></Layout> */}

        {/* Not have account */}
        {/* <Layout
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
        </Layout> */}
      </ScrollView>
    </Layout>
  );
};
