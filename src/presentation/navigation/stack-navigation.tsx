import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  HomeDriverScreen,
  HomeClientDriverScreen,
  HomeClientDeliveryScreen,
  TypeClientScreen,
  LoadingScreen,
  LoginScreen,
  PermissionsScreen,
  RegisterScreen,
  RegisterDriverScreen,
  RegisterClientScreen,
  ProfileClientScreen,
  ProfileDriverScreen,
  SettingsScreen,
  RegisterDeliveryScreen,
  HomeDeliveryScreen,
  ProductItemScreen,
  RestaurantScreen,
  ProductsCartScreen,
} from '../screens';
import {RootStackParams} from '../../interfaces';
import { globalColors } from '../theme/styles';

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
  return (
    <Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{headerShown: true, headerTintColor: globalColors.primary}}>
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, title: 'Registro'}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          title: 'Registro Driver',
        }}
        name="RegisterDriverScreen"
        component={RegisterDriverScreen}
      />
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          title: 'Registro cliente',
        }}
        name="RegisterClientScreen"
        component={RegisterClientScreen}
      />
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          title: 'Registro delivery',
        }}
        name="RegisterDeliveryScreen"
        component={RegisterDeliveryScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="PermissionsScreen"
        component={PermissionsScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="HomeDriverScreen"
        component={HomeDriverScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="TypeClientScreen"
        component={TypeClientScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="HomeClientDeliveryScreen"
        component={HomeClientDeliveryScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="RestaurantScreen"
        component={RestaurantScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="ProductsCartScreen"
        component={ProductsCartScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="ProductItemScreen"
        component={ProductItemScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="HomeClientDriverScreen"
        component={HomeClientDriverScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="HomeDeliveryScreen"
        component={HomeDeliveryScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, title: 'Perfil'}}
        name="ProfileClientScreen"
        component={ProfileClientScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, title: 'Perfil'}}
        name="ProfileDriverScreen"
        component={ProfileDriverScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, title: 'Configuracion'}}
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Navigator>
  );
};
