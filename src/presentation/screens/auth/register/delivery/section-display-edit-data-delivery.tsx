import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {useAuthStore} from '../../../../../store';
import {Alert, Image, useWindowDimensions} from 'react-native';
import {LoadingScreen} from '../../../loading/loading-screen';
import {UserService} from '../../../../../services';

export const SectionDisplayEditDataDelivery = () => {
  const {width} = useWindowDimensions();

  const {login, image_url, registerForm} = useAuthStore();
  const [loading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(email: string, password: string) {
    if (!registerForm || !image_url) return;

    try {
      setIsLoading(true);
      console.log({registerForm});
      await UserService.createDelivery(registerForm, image_url);
      await login(email, password);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('user registration failed');
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Layout>
        <Text category="h1">Bienvenid@</Text>
      </Layout>

      <Layout style={{height: 10}}></Layout>
      {/* {"image_url": "file:///data/user/0/com.orbe.www/cache/rn_image_picker_lib_temp_dd400227-b874-4e6a-ab75-3ef98d6682f1.jpg"} */}
      <Layout
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'black',
          borderRadius: 10,
          width: width * 0.8,
        }}>
        {image_url && (
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
            }}
            source={{
              uri: `file:///data/user/0/com.orbe.www/cache/${image_url}`,
            }}></Image>
        )}

        <Layout style={{backgroundColor: 'transparent'}}>
          <Text style={{color: 'white'}}>Hola,</Text>
          <Text style={{fontSize: 20, color: 'white'}} category="h3">
            {registerForm?.firstName + ' ' + registerForm?.lastName}
          </Text>
        </Layout>
      </Layout>

      <Layout style={{height: 10}}></Layout>

      <Layout
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'black',
          borderRadius: 10,
          width: width * 0.6,
        }}>
        <Layout style={{backgroundColor: 'transparent'}}>
          <Text style={{color: 'white'}}>{registerForm?.email}</Text>
          <Text style={{fontSize: 20, color: 'white'}} category="h3">
            {registerForm?.phone}
          </Text>
        </Layout>
      </Layout>

      <Layout style={{height: 10}}></Layout>

      <Layout>
        <Button
          onPress={() => {
            if (registerForm?.email && registerForm.password) {
              handleSubmit(registerForm!.email, registerForm?.password);
            }
          }}
          appearance="ghost">
          Registrar
        </Button>
      </Layout>
    </Layout>
  );
};
