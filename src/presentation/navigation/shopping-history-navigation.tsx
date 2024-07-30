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
  HistoryShoppingScreen,
} from '../screens';
import {RootStackParams} from '../../interfaces';
import {BottomTapNavigationClient} from './bottom-tap-navigation';
import {DrawerNavigation} from './drawer-navigation';
import {ShoppingHistoryItemScreen} from '../screens/historical/history-shopping-item-screen';

const {Navigator, Screen} = createStackNavigator<RootStackParams>();
// @ts-ignore
const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardSyle: {
      opacity: current.progress,
    },
  };
};

export const ShoppingHistoryNavigator = () => {
  return (
    <Navigator
      initialRouteName="HistoryListScreen"
      screenOptions={{headerShown: true}}>
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="ShoppingHistoryScreen"
        component={HistoryShoppingScreen}
      />
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="ShoppingHistoryItemScreen"
        component={ShoppingHistoryItemScreen}
      />
    </Navigator>
  );
};
