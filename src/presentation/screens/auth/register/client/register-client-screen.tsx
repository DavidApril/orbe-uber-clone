import {useWindowDimensions} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native-gesture-handler';
import {RegisterClientForm} from './register-client-form';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from '../../../../../config/i18n/i18n';
import {CView} from '../../../../components';

export const RegisterClientScreen = () => {
  const {height} = useWindowDimensions();
  const {t} = useTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <CView style={{flex: 1}}>
        <ScrollView style={{marginHorizontal: 40}}>
          <CView style={{paddingTop: height * 0.1}}>
            <Text category="h1">{t('register')}</Text>
            <Text category="p2">
              {t('enter-the-following-information-to-register')}
            </Text>
          </CView>

          <RegisterClientForm />
        </ScrollView>
      </CView>
    </I18nextProvider>
  );
};
