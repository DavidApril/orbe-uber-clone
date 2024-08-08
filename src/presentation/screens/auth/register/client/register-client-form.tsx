import {Button, Input, Layout} from '@ui-kitten/components/ui';
import {Formik} from 'formik';
import React from 'react';
import {ClientRegisterForm} from '../../../../../interfaces';
import {useAuthStore} from '../../../../../store';
import {ClientService} from '../../../../../services/client/client.service';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from '../../../../../config/i18n/i18n';
import {parseError} from '../../../../../utils';
import * as Yup from 'yup';
import {CInput, CView} from '../../../../components';

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

  const {t} = useTranslation();

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
      parseError('error at try create or login user', error);
    }
  }

  return (
    <I18nextProvider i18n={i18n}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({values, handleChange, handleSubmit, touched, errors}) => (
          <CView style={{}}>
            <CInput
              // status={
              //   touched.firstName && errors.firstName
              //     ? 'danger'
              //     : touched.firstName && !errors.firstName
              //     ? 'success'
              //     : 'basic'
              // }
              value={values.firstName}
              handleValue={handleChange('firstName')}
              placeholder={t('name')}
              autoCapitalize="words"
            />

            <CInput
              // status={
              //   touched.lastName && errors.lastName
              //     ? 'danger'
              //     : touched.lastName && !errors.lastName
              //     ? 'success'
              //     : 'basic'
              // }
              value={values.lastName}
              handleValue={handleChange('lastName')}
              placeholder={t('lastname')}
              autoCapitalize="words"
            />

            <CInput
              // status={
              //   touched.identification && errors.identification
              //     ? 'danger'
              //     : touched.identification && !errors.identification
              //     ? 'success'
              //     : 'basic'
              // }
              value={values.identification}
              handleValue={handleChange('identification')}
              inputMode="numeric"
              keyboardType="numbers-and-punctuation"
              placeholder={t('identification')}
            />

            <CInput
              // status={
              //   touched.email && errors.email
              //     ? 'danger'
              //     : touched.email && !errors.email
              //     ? 'success'
              //     : 'basic'
              // }
              value={values.email}
              handleValue={handleChange('email')}
              inputMode="email"
              keyboardType="email-address"
              placeholder={t('email-address')}
            />

            <CInput
              // status={
              //   touched.phone && errors.phone
              //     ? 'danger'
              //     : touched.phone && !errors.phone
              //     ? 'success'
              //     : 'basic'
              // }
              value={values.phone}
              handleValue={handleChange('phone')}
              inputMode="numeric"
              dataDetectorTypes="phoneNumber"
              keyboardType="phone-pad"
              placeholder={t('phone')}
            />

            <CInput
              // status={
              //   touched.password && errors.password
              //     ? 'danger'
              //     : touched.password && !errors.password
              //     ? 'success'
              //     : 'basic'
              // }
              value={values.password}
              handleValue={handleChange('password')}
              placeholder={t('password')}
              secureTextEntry
              autoCapitalize="none"
            />

            <CInput
              // status={
              //   touched.confirmPassword && errors.confirmPassword
              //     ? 'danger'
              //     : touched.confirmPassword && !errors.confirmPassword
              //     ? 'success'
              //     : 'basic'
              // }
              value={values.confirmPassword}
              handleValue={handleChange('confirmPassword')}
              placeholder={t('confirm-password')}
              secureTextEntry
              autoCapitalize="none"
            />
            <Button
              // disabled={!isValid}
              onPress={() => handleSubmit()}
              style={{marginTop: 20}}>
              {t('next')}
            </Button>
          </CView>
        )}
      </Formik>
    </I18nextProvider>
  );
};
