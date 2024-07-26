import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FavoritesScreen, ProfileClientScreen, SettingsScreen} from '../screens';
import {CustomBottomTabs, CustomIcon, HeaderChatBot} from '../components';
import {
  profileRoutesByRoleMapper,
  routesHomeByRoleMapper,
} from '../../utils/mappers';
import {HomeClientScreen} from '../screens/home/home-client-screen';
import {useAuthStore} from '../../store';
import {RootStackParams} from '../../interfaces';
import {ChatBotScreen} from '../screens/chatbot/chatbot-screen';
import {Layout, Text} from '@ui-kitten/components';

const Tab = createBottomTabNavigator<RootStackParams>();

export const BottomTapNavigationClientDelivery = () => {
  const {role} = useAuthStore();

  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabs {...props} />}
      initialRouteName="HomeClientDeliveryScreen"
      screenOptions={{
        headerTransparent: true,
      }}>
      <Tab.Screen
        name={`HomeClientDeliveryScreen`}
        options={{
          title: 'home-outline',
          headerShown: false,
        }}
        component={routesHomeByRoleMapper(role!) ?? HomeClientScreen}
      />
      <Tab.Screen
        name="ProfileClientScreen"
        options={{
          title: 'person-outline',
          headerShown: true,
        }}
        component={profileRoutesByRoleMapper(role!) ?? ProfileClientScreen}
      />
      <Tab.Screen
        name="favoritesScreen"
        options={{
          title: 'heart',
        }}
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="chatBotScreen"
        options={{
          headerShown: false,
          title: 'message-circle-outline',
        }}
        component={ChatBotScreen}
      />
      <Tab.Screen
        name="SettingsScreen"
        options={{
          title: 'settings-outline',
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};
