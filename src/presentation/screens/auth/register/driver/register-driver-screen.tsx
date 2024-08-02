import {useAuthStore} from '../../../../../store';
import {SectionDisplayEditDataDriver} from './section-display-edit-data-driver';
import {RegisterWorkerScreen} from './register-worker-screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootStackParams} from '../../../../../interfaces';
import {RegisterVehiclesDocumentsScreen} from './register-vehicle-documents-screen';
import {RegisterUserDocumentsScreen} from './register-user-documents-screen';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../../config/i18n/i18n';
import { CustomIcon } from '../../../../components';
import { globalColors, primaryColors } from '../../../../theme/styles';
import { Icon } from '@ui-kitten/components';

const {Screen, Navigator} = createMaterialTopTabNavigator<RootStackParams>();

export const RegisterDriverScreen = () => {
  const {registerForm, image_url} = useAuthStore();
  const {t} = useTranslation()

  return (
    <I18nextProvider i18n={i18n}>
      <Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarBounces: true,
        tabBarIndicatorContainerStyle: {
          width: '100%',
        },
      }}>
      <Screen name="RegisterWorkerScreen" options={{ title: t('register-driver') }} component={RegisterWorkerScreen} />
      <Screen
        options={{ 
          title: t('register-documents'), 
          // tabBarIcon: ({focused}) => (
          //   <CustomIcon name={focused ? 'person-fill' : 'person-outline'} fill={focused ? primaryColors.primary : globalColors.grayScale.gray} />
          // )
        }}
        name="RegisterUserDocumentsScreen"
        component={RegisterUserDocumentsScreen}
      />
      <Screen
        options={{ title: t('register-documents-vehicle') }}
        name="RegisterVehiclesDocumentsScreen"
        component={RegisterVehiclesDocumentsScreen}
      />
      <Screen
        options={{ title: t('register-edit') }}
        name="RegisterEditScreen"
        component={SectionDisplayEditDataDriver}
      />
    </Navigator>
    </I18nextProvider>
  );
};
