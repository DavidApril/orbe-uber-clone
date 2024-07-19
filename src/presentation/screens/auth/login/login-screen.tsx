import {StackScreenProps} from '@react-navigation/stack';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParams} from '../../../navigation/stack-navigation';
import {useAuthStore} from '../../../../store/auth/auth.store';
import {CustomIcon} from '../../../components';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{email: string; password: string}>({
    email: '',
    password: '',
  });
  

  async function onLogin() {
    if (form.email.length === 0 || form.password.length === 0) return;

    setIsLoading(true);
    const {ok} = await login(form.email, form.password);
    setIsLoading(false);
  }

  const {height} = useWindowDimensions();

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Image
            style={{
              height: 80,
              width: 80,
            }}
            source={require('../../../../assets/loading.png')}
          />

          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            value={form.email}
            onChangeText={value => setForm({...form, email: value})}
            accessoryLeft={<CustomIcon name="email-outline" />}
            placeholder="Correo eléctronico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{marginBottom: 10}}
          />
          <Input
            value={form.password}
            onChangeText={value => setForm({...form, password: value})}
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
          <Button disabled={isLoading} onPress={onLogin} appearance="ghost">
            Ingresar
          </Button>
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
          <Text>¿No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}>
            {' '}
            crea una aquí
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
