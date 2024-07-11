import {Alert, useWindowDimensions} from 'react-native';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {Formik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import * as Yup from 'yup';
import {ClientRegisterForm} from '../../../../../interfaces';
import {useAuthStore, useClientStore} from '../../../../../store';
import {ClientService} from '../../../../../services/client/client.service';
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
