import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';

import {HistoryShoppingScreen} from '..';
import {RootStackParams} from '../../../interfaces';
import {ShoppingHistoryItemScreen} from './history-shopping-item-screen';
import {useAuthStore} from '../../../store';

const {Navigator, Screen} = createStackNavigator<RootStackParams>();
// @ts-ignore
const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardSyle: {
      opacity: current.progress,
    },
  };
};

export const HistoryScreen = () => {
  const {role} = useAuthStore();

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
