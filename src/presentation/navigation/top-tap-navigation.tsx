import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  HomeClientDeliveryScreen,
  ProfileClientScreen,
  SettingsScreen,
} from '../screens';
import {CustomIcon} from '../components';

const Tab = createMaterialTopTabNavigator();

export const TopTapNavigationClientDelivery = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Perfil" component={ProfileClientScreen} />
    </Tab.Navigator>
  );
};
