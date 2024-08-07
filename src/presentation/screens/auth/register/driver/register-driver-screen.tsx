import {useAuthStore} from '../../../../../store';
import {SectionDisplayEditDataDriver} from './section-display-edit-data-driver';
import {RegisterWorkerScreen} from './register-worker-screen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {RootStackParams} from '../../../../../interfaces';
import {RegisterVehiclesDocumentsScreen} from './register-vehicle-documents-screen';
import {RegisterUserDocumentsScreen} from './register-user-documents-screen';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from '../../../../../config/i18n/i18n';
import { globalColors, neutralColors, primaryColors } from '../../../../theme/styles';
import { CustomIcon } from '../../../../components';

const {Screen, Navigator} = createMaterialBottomTabNavigator<RootStackParams>();

export const RegisterDriverScreen = () => {
  const {registerForm, image_url} = useAuthStore();
  const {t} = useTranslation()

  return (
    <I18nextProvider i18n={i18n}>
      <Navigator
      activeColor={globalColors.primaryColors.primary}
      barStyle={{ backgroundColor: neutralColors.background, paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' }}
      screenOptions={{
        // swipeEnabled: false,
        // tabBarBounces: true,
        // tabBarIndicatorContainerStyle: {
        //   width: '100%',
        // },
      }}>
        <Screen 
          options={{
            tabBarLabel: t('register-driver'),
            tabBarIcon: ({color}) => (
              <CustomIcon name='person' fill={color} />
            )
          }} 
          component={RegisterWorkerScreen} 
          name="RegisterWorkerScreen" 
          />
      <Screen
        options={{ 
          tabBarLabel: t('register-documents'),
          // tabBarIcon: ({color}) => (
          //   <CustomIcon name='document' fill={color} />
          // )
          tabBarIcon: ({color}) => (
            <CustomIcon name='file-text' fill={color} />
          )
        }}
        name="RegisterUserDocumentsScreen"
        component={RegisterUserDocumentsScreen}
      />
      <Screen
        options={{ 
          tabBarLabel: t('register-documents-vehicle'),
          tabBarIcon: ({color}) => (
            <CustomIcon name='car' fill={color} />
          )
         }}
        name="RegisterVehiclesDocumentsScreen"
        component={RegisterVehiclesDocumentsScreen}
      />
      <Screen
        options={{ 
          tabBarLabel: t('edit-register'),
          tabBarIcon: ({color}) => (
            <CustomIcon name='edit' fill={color} />
          )
         }}
        name="RegisterEditScreen"
        component={SectionDisplayEditDataDriver}
      />
    </Navigator>
    </I18nextProvider>
  );
};
