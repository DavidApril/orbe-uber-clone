import '../../../../config/i18n/i18n';
import {Animated, Pressable, useWindowDimensions, View} from 'react-native';
import {Button, Input, Spinner, Text} from '@ui-kitten/components';
import {changeLanguage} from '../../../../config/i18n/change-language.ts';
import {CButton, CInput, CustomIcon, CView} from '../../../components';
import {Formik} from 'formik';
import {globalColors, stateColors} from '../../../theme/styles';
import {I18nextProvider} from 'react-i18next';
import {RootStackParams} from '../../../../interfaces';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {useAnimation} from '../../../../hooks';
import {useAuthStore} from '../../../../store/auth/auth.store';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import i18n from '../../../../config/i18n/i18n.ts';
import * as Yup from 'yup';

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
      <CView style={{flex: 1}}>
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
          <View
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

            <View>
              <Text category="h1">{t('welcome')}</Text>
              <Text category="p2">{t('please, log in to continue')}</Text>
            </View>
          </View>

          {/* Inputs */}
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({values, handleChange, handleSubmit, errors, touched}) => (
              <>
                <View>
                  <CInput
                    value={values.email}
                    handleValue={handleChange('email')}
                    accessoryLeft={<CustomIcon name="email-outline" />}
                    placeholder={t('email-address')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{
                      borderColor:
                        touched.email && errors.email
                          ? stateColors.error
                          : touched.email && !errors.email
                          ? stateColors.success
                          : stateColors.info,
                    }}
                  />
                  <CInput
                    value={values.password}
                    handleValue={handleChange('password')}
                    accessoryLeft={<CustomIcon name="lock-outline" />}
                    placeholder={t('password')}
                    secureTextEntry
                    autoCapitalize="none"
                    style={{
                      marginBottom: 10,
                      borderColor:
                        touched.password && errors.password
                          ? stateColors.error
                          : touched.password && !errors.password
                          ? stateColors.success
                          : stateColors.info,
                    }}
                  />
                </View>

                {/* Space */}
                <View style={{height: 40}}></View>

                {/* Button */}
                <View>
                  <CButton style={{ }} onPress={handleSubmit} label={t('login')} />
                </View>
              </>
            )}
          </Formik>

          {/* Space */}
          <View style={{height: 100}}></View>

          {/* Not have account */}
          <View
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
          </View>
        </ScrollView>
      </CView>
    </I18nextProvider>
  );
};
