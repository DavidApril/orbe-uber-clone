import {StackScreenProps} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Animated, Pressable, useWindowDimensions} from 'react-native';
import {Button, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuthStore} from '../../../../store/auth/auth.store';
import {CustomIcon} from '../../../components';
import {globalColors} from '../../../theme/styles';
import {Formik} from 'formik';
import {RootStackParams} from '../../../../interfaces';
import {useAnimation} from '../../../../hooks';
import * as Yup from 'yup';
import {I18nextProvider} from 'react-i18next';

import '../../../../config/i18n/i18n';
import {useTranslation} from 'react-i18next';
import i18n from '../../../../config/i18n/i18n.ts';
import {changeLanguage} from '../../../../config/i18n/change-language.ts';
import {orbeApi} from '../../../../config/api/orbe-api.ts';
import axios from 'axios';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {login} = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {height} = useWindowDimensions();
  const [english, setEnglish] = useState<boolean>(false);

  const handleLanguage = () => {
    setEnglish(!english);
    if (english) {
      changeLanguage('en');
    } else {
      changeLanguage('es');
    }
  };

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

  const {rotateStyle} = useAnimation();

  return (
    <I18nextProvider i18n={i18n}>
      <Layout style={{flex: 1}}>
        <Pressable
          onPress={handleLanguage}
          style={{
            position: 'absolute',
            right: 0,
            top: 2,
            width: '100%',
            zIndex: 999,
            padding: 10,
          }}>
          <Text
            style={{
              color: globalColors.primaryColors.primary,
              fontWeight: 'bold',
            }}>
            {t('change-language')}
          </Text>
        </Pressable>
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
                rotateStyle,
              ]}
              source={require('../../../../assets/loading.png')}
            />

            <Layout>
              <Text category="h1">{t('welcome')}</Text>
              <Text category="p2">{t('please, log in to continue')}</Text>
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
                    placeholder={t('email-address')}
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
                    placeholder={t('password')}
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
                      t('login')
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
            <Text>{t('you do not have an account?')}</Text>
            <Text
              style={{color: globalColors.primaryColors.primary}}
              category="s1"
              onPress={() => navigation.navigate('RegisterScreen')}>
              {' '}
              {t('create one here')}
            </Text>
          </Layout>
        </ScrollView>
      </Layout>
    </I18nextProvider>
  );
};
