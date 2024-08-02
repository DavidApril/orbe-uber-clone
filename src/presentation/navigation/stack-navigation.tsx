import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  LoadingScreen,
  LoginScreen,
  RegisterScreen,
  RegisterDriverScreen,
  RegisterClientScreen,
  RegisterDeliveryScreen,
} from '../screens';
import {RootStackParams} from '../../interfaces';
import {DrawerNavigation} from './drawer-navigation';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from '../../config/i18n/i18n';
import {globalColors} from '../theme/styles';

const {Navigator, Screen} = createStackNavigator<RootStackParams>();
// @ts-ignore
const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardSyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  const {t} = useTranslation();
  return (
    <I18nextProvider i18n={i18n}>
      <Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: true,
          headerTintColor: globalColors.primaryColors.primary,
        }}>
        <Screen
          options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
          name="LoadingScreen"
          component={LoadingScreen}
        />
        <Screen
          options={{
            cardStyleInterpolator: fadeAnimation,
            headerShown: false,
          }}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Screen
          options={{
            cardStyleInterpolator: fadeAnimation,
            headerShown: false,
          }}
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Screen
          options={{
            cardStyleInterpolator: fadeAnimation,
            title: t('register-client'),
          }}
          name="RegisterClientScreen"
          component={RegisterClientScreen}
        />
        <Screen
          options={{
            cardStyleInterpolator: fadeAnimation,
            headerShown: false,
          }}
          name="RegisterDriverScreen"
          component={RegisterDriverScreen}
        />
        <Screen
          options={{
            cardStyleInterpolator: fadeAnimation,
            title: t('register-delivery'),
          }}
          name="RegisterDeliveryScreen"
          component={RegisterDeliveryScreen}
        />
        <Screen
          options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
          name="PermissionsScreen"
          component={DrawerNavigation}
        />
      </Navigator>
    </I18nextProvider>
  );
};
