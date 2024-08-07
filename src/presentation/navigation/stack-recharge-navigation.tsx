import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';

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

export const StackRechargeNavigation = () => {
  return (
    <Navigator
      initialRouteName="RefillsScreen"
      screenOptions={{headerShown: false}}>
      <Screen
        options={{cardStyleInterpolator: fadeAnimation, headerShown: false}}
        name="ShoppingHistoryScreen"
        component={RefillsScreen}
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
