import {StackScreenProps} from '@react-navigation/stack';
import {Button, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuthStore} from '../../../../store/auth/auth.store';
import {CustomIcon} from '../../../components';
import {RootStackParams} from '../../../../interfaces';
import * as Yup from 'yup';
import {Formik} from 'formik';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {height} = useWindowDimensions();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  async function onSubmit(values: typeof initialValues) {
    setIsLoading(true);
    const {ok} = await login(values.email, values.password);
    console.log({ok});
    setIsLoading(false);
  }

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
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <>
              <Layout style={{marginTop: 20}}>
                <Input
                  status={
                    touched.email && errors.email
                      ? 'danger'
                      : touched.email && !errors.email
                      ? 'success'
                      : 'basic'
                  }
                  value={values.email}
                  onChangeText={handleChange('email')}
                  accessoryLeft={<CustomIcon name="email-outline" />}
                  placeholder="Correo eléctronico"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{marginBottom: 10}}
                />
                <Input
                  status={
                    touched.password && errors.password
                      ? 'danger'
                      : touched.password && !errors.password
                      ? 'success'
                      : 'basic'
                  }
                  value={values.password}
                  onChangeText={handleChange('password')}
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
                <Button
                  disabled={isLoading}
                  onPress={() => handleSubmit()}
                  appearance="ghost">
                  {!isLoading ? (
                    'Ingresar'
                  ) : (
                    <Text>
                      <Spinner />
                    </Text>
                  )}
                </Button>
              </Layout>
            </>
          )}
        </Formik>

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
