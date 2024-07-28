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
  HomeClientDeliveryScreen,
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

export const StackRestaurantNavigation = () => {
  return (
    <Navigator
      initialRouteName="HomeClientDeliveryScreen"
      screenOptions={{headerShown: true}}>
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="HomeClientDeliveryScreen"
        component={HomeClientDeliveryScreen}
      />
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="RestaurantScreen"
        component={RestaurantScreen}
      />
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="ProductItemScreen"
        component={ProductItemScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, title: 'Registro'}}
        name="ProductsCartScreen"
        component={ProductsCartScreen}
      />
    </Navigator>
  );
};
