import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  FavoritesScreen,
  HomeClientDriverScreen,
  ProfileClientScreen,
  SettingsScreen,
} from '../screens';
import {CustomBottomTabs, CustomIcon, HeaderChatBot} from '../components';
import {
  profileRoutesByRoleMapper,
  routesHomeByRoleMapper,
} from '../../utils/mappers';
import {HomeClientScreen} from '../screens/home/home-client-screen';
import {useAuthStore} from '../../store';
import {RootStackParams} from '../../interfaces';
import { globalColors } from '../theme/styles';
import {ChatBotScreen} from '../screens/chatbot/chatbot-screen';

const Tab = createBottomTabNavigator<RootStackParams>();

export const BottomTapNavigationClientDelivery = () => {
  const {role} = useAuthStore();

  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabs {...props} />}
      initialRouteName="HomeClientDeliveryScreen"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          // width: '100%',
          backgroundColor: '#F8F7FB',

          borderRadius: 30,
          flexDirection: 'row',
          // paddingHorizontal: 20,
          justifyContent: 'space-around',

          margin: 10,
        },
        tabBarShowLabel: false,
        headerStyle: {
          shadowColor: 'transparent',
        },
        headerTintColor: globalColors.primaryColors.primary
      }}>
      <Tab.Screen
        name={`HomeClientDeliveryScreen`}
        options={{
          // icon name
          title: 'home-outline',
          headerShown: false,
        }}
        component={routesHomeByRoleMapper(role!) ?? HomeClientScreen}
      />
      <Tab.Screen
        name="ProfileClientScreen"
        options={{
          // icon name
          title: 'person-outline',
          headerShown: false,
        }}
        component={profileRoutesByRoleMapper(role!) ?? ProfileClientScreen}
      />
      <Tab.Screen
        name="HomeClientDriverScreen"
        options={{
          // icon name
          title: 'map-outline',
        }}
        component={HomeClientDriverScreen}
      />
      <Tab.Screen
        name="favoritesScreen"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({color}) => <CustomIcon fill={color} name="heart" />,
          tabBarIconStyle: {},
        }}
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="chatBotScreen"
        options={{
          headerShown: false,
          // icon name
          title: 'message-circle-outline',
        }}
        component={ChatBotScreen}
      />
      <Tab.Screen
        name="SettingsScreen"
        options={{
          title: 'Ajustes',
          tabBarIconStyle: {
            backgroundColor: 'black',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarIcon: ({color}) => (
            <CustomIcon fill={color} name="settings-outline" />
          ),
        }}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};
