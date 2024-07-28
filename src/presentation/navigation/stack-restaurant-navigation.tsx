import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  ProductItemScreen,
  RestaurantScreen,
  ProductsCartScreen,
  HomeClientDeliveryScreen,
  CheckoutScreen,
} from '../screens';
import {RootStackParams} from '../../interfaces';

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
      screenOptions={{headerShown: false}}>
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
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, title: 'Registro'}}
        name="CheckoutScreen"
        component={CheckoutScreen}
      />
    </Navigator>
  );
};
