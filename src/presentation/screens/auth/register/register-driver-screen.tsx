import {
  Button,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const RegisterDriverScreen = () => {
  const {height} = useWindowDimensions();

  const initialValues = {
    fullName: '',
    selectedTypeId: '',
    identification: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  function onSubmit(values: typeof initialValues) {
    console.log(values);
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.1}}>
          <Text category="h1">Registro</Text>
          <Text category="p2">
            Ingresa los siguientes datos para registrarte
          </Text>
        </Layout>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({values, handleChange, handleSubmit}) => (
            <Layout style={{gap: 10, marginTop: 20}}>
              <Input
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                placeholder="Nombre completo"
                autoCapitalize="words"
              />

              <Select
                value={values.selectedTypeId}
                placeholder="Tipo de documento">
                <SelectItem title="Cédula de ciudadanía" />
              </Select>

              <Input
                value={values.identification}
                onChangeText={handleChange('identification')}
                inputMode="numeric"
                keyboardType="numbers-and-punctuation"
                placeholder="Número de identificación"
              />

              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                inputMode="email"
                keyboardType="email-address"
                placeholder="Correo electrónico"
              />

              <Input
                value={values.phone}
                onChangeText={handleChange('phone')}
                inputMode="numeric"
                dataDetectorTypes="phoneNumber"
                keyboardType="phone-pad"
                placeholder="Número de teléfono"
              />

              <Input
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Contraseña"
                secureTextEntry
                autoCapitalize="none"
              />

              <Input
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder="Confirmar contraseña"
                secureTextEntry
                autoCapitalize="none"
              />
              <Button onPress={ handleSubmit } style={{marginTop: 20}}>Continuar</Button>
            </Layout>
          )}
        </Formik>
      </ScrollView>
    </Layout>
  );
};
