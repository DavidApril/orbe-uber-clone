import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  HomeDriverScreen,
  HomeClientDriverScreen,
  HomeDeliveryScreen,
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
  ProductItemScreen,
  RestaurantScreen,
  ProductsCartScreen,
} from '../screens';
import {RootStackParams} from '../../interfaces';
import {BottomTapNavigationClientDelivery} from './bottom-tap-navigation';
import {DrawerNavigation} from './drawer-navigation';

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
      screenOptions={{headerShown: true}}>
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
        component={DrawerNavigation}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="RestaurantScreen"
        component={RestaurantScreen}
      />
    </Navigator>
  );
};
