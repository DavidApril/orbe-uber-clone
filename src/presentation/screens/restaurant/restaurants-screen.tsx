import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  RestaurantScreen,
  RestaurantsAndProductsScreen,
  ProductScreen,
  CouponsScreen,
  ProccesingOrderScreen,
} from '..';
import {RootStackParams} from '../../../interfaces';

const {Navigator, Screen} = createStackNavigator<RootStackParams>();
// @ts-ignore
const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardSyle: {
      opacity: current.progress,
    },
  };
};

export const RestaurantsScreen = () => {
  return (
    <Navigator
      initialRouteName="RestaurantsAndProductsScreen"
      screenOptions={{headerShown: false}}>
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="RestaurantsAndProductsScreen"
        component={RestaurantsAndProductsScreen}
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
        name="CouponsScreen"
        component={CouponsScreen}
      />
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="ProductScreen"
        component={ProductScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, title: 'Registro'}}
        name="ProccesingOrderScreen"
        component={ProccesingOrderScreen}
      />
    </Navigator>
  );
};
