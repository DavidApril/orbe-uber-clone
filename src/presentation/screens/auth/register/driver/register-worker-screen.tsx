import {ScrollView} from 'react-native';
import {
  CView,
  TextHeaderScreen,
  RegisterWorkerForm,
} from '../../../../components';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../../config/i18n/i18n';

export const RegisterWorkerScreen = () => {
  const {t} = useTranslation()
  return (
    <I18nextProvider i18n={i18n}>
      <CView style={{flex: 1, width: '99%'}}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <TextHeaderScreen
          paddingTop={30}
          title={t("registration-form")}
          description={t("enter-all-your-details-to-continue")}
        />

        <RegisterWorkerForm />
      </ScrollView>
    </CView>
    </I18nextProvider>
  );
};
