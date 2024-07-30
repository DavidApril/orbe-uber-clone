import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {RootStackParams} from '../../interfaces';
import {
  CheckoutScreen,
  OrderArrival,
  OrderScreen,
  OrderTrackingScreen,
  PreparingOrderScreen,
} from '../screens';
import {CustomIcon} from '../components';

const {Navigator, Screen} = createMaterialTopTabNavigator<RootStackParams>();

export const TopTapOrdersNavigations = () => {
  return (
    <Navigator
      screenOptions={{
        title: '',

        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarIcon: () => {
          return <CustomIcon fill="black" name="award" />;
        },
      }}>
      <Screen name="OrderScreen" component={OrderScreen} />
      <Screen name="PreparingOrderScreen" component={PreparingOrderScreen} />
      <Screen name="OrderTrackingScreen" component={OrderTrackingScreen} />
      <Screen name="OrderArrival" component={OrderArrival} />
    </Navigator>
  );
};
