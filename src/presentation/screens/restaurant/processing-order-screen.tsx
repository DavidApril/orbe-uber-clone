import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParams} from '../../../interfaces';
import {CheckoutScreen} from '../payment/checkout-screen';
import { OrdersScreen } from '../payment/orders-screen';

const {Navigator, Screen} = createStackNavigator<RootStackParams>();

export const ProccesingOrderScreen = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Screen name="OrdersScreen" component={OrdersScreen} />
    </Navigator>
  );
};
