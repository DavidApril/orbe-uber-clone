import {Button, Input, Layout} from '@ui-kitten/components/ui';
import {Formik} from 'formik';
import React from 'react';
import * as Yup from 'yup';
import {ClientRegisterForm} from '../../../../../interfaces';
import {useAuthStore} from '../../../../../store';
import {ClientService} from '../../../../../services/client/client.service';

export const RegisterClientForm = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    identification: Yup.string().required(),
    phone: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      // @ts-ignore
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const initialValues: ClientRegisterForm = {
    firstName: '',
    lastName: '',
    // selectedTypeId: '',
    identification: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {login} = useAuthStore();

  async function onSubmit(values: typeof initialValues) {
    if (!values.email || !values.password) return;

    try {
      await ClientService.createClient(values);
      await login(values!.email, values.password);
    } catch (error) {
      console.log({error});
    }
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {({values, handleChange, handleSubmit, touched, errors}) => (
        <Layout style={{gap: 10, marginTop: 20}}>
          <Input
            status={
              touched.firstName && errors.firstName
                ? 'danger'
                : touched.firstName && !errors.firstName
                ? 'success'
                : 'basic'
            }
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            placeholder="Nombres"
            autoCapitalize="words"
          />

          <Input
            status={
              touched.lastName && errors.lastName
                ? 'danger'
                : touched.lastName && !errors.lastName
                ? 'success'
                : 'basic'
            }
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            placeholder="Apellidos"
            autoCapitalize="words"
          />

          {/* <Select
                value={values.selectedTypeId}
                placeholder="Tipo de documento">
                <SelectItem title="Cédula de ciudadanía" />
              </Select> */}

          <Input
            status={
              touched.identification && errors.identification
                ? 'danger'
                : touched.identification && !errors.identification
                ? 'success'
                : 'basic'
            }
            value={values.identification}
            onChangeText={handleChange('identification')}
            inputMode="numeric"
            keyboardType="numbers-and-punctuation"
            placeholder="Número de identificación"
          />

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
            inputMode="email"
            keyboardType="email-address"
            placeholder="Correo electrónico"
          />

          <Input
            status={
              touched.phone && errors.phone
                ? 'danger'
                : touched.phone && !errors.phone
                ? 'success'
                : 'basic'
            }
            value={values.phone}
            onChangeText={handleChange('phone')}
            inputMode="numeric"
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
            placeholder="Número de teléfono"
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
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
          />

          <Input
            status={
              touched.confirmPassword && errors.confirmPassword
                ? 'danger'
                : touched.confirmPassword && !errors.confirmPassword
                ? 'success'
                : 'basic'
            }
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            placeholder="Confirmar contraseña"
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            // disabled={!isValid}
            onPress={() => {
              handleSubmit();
            }}
            style={{marginTop: 20}}>
            Continuar
          </Button>
        </Layout>
      )}
    </Formik>
  );
};
