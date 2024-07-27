import {StackScreenProps} from '@react-navigation/stack';
import {useState} from 'react';
import {Animated, useWindowDimensions} from 'react-native';
import {Button, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuthStore} from '../../../../store/auth/auth.store';
import {CustomIcon} from '../../../components';
import {globalColors} from '../../../theme/styles';
import {Formik} from 'formik';
import {RootStackParams} from '../../../../interfaces';
import * as Yup from 'yup';

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
    await login(values.email, values.password);
    setIsLoading(false);
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 30}}>
        <Layout
          style={{
            paddingTop: height * 0.25,
            paddingBottom: 40,
            flexDirection: 'row',
            gap: 20,
          }}>
          <Animated.Image
            style={[
              {
                height: 80,
                width: 80,
              },
              // rotateStyle,
            ]}
            source={require('../../../../assets/loading.png')}
          />

          <Layout>
            <Text category="h1">Ingresar</Text>
            <Text category="p2">Por favor, ingrese para continuar</Text>
          </Layout>
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
                  status='info'
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
        <Layout style={{height: 100}}></Layout>

        {/* Not have account */}
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text>¿No tienes cuenta?</Text>
          <Text
            style={{color: globalColors.primaryColors.primary}}
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
