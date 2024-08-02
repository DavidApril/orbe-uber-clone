import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';
import {PurchaseInfoScreen, PurchasesHistoryScreen} from '..';
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

export const ShoppingHistoryScreen = () => {
  return (
    <Navigator
      initialRouteName="PurchasesHistoryScreen"
      screenOptions={{headerShown: true}}>
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="PurchasesHistoryScreen"
        component={PurchasesHistoryScreen}
      />
      <Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
          headerShown: false,
        }}
        name="PurchaseInfoScreen"
        component={PurchaseInfoScreen}
      />
    </Navigator>
  );
};
