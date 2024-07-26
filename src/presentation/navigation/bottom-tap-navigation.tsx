import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FavoritesScreen, ProfileClientScreen, SettingsScreen} from '../screens';
import {CustomIcon, HeaderChatBot} from '../components';
import {
  profileRoutesByRoleMapper,
  routesHomeByRoleMapper,
} from '../../utils/mappers';
import {HomeClientScreen} from '../screens/home/home-client-screen';
import {useAuthStore} from '../../store';
import {RootStackParams} from '../../interfaces';
import {ChatBotScreen} from '../screens/chatbot/chatbot-screen';
import {globalColors} from '../theme/styles';

const Tab = createBottomTabNavigator<RootStackParams>();

export const BottomTapNavigationClientDelivery = () => {
  const {role} = useAuthStore();

  return (
    <Tab.Navigator
      initialRouteName="HomeClientDeliveryScreen"
      backBehavior="history"
      screenOptions={{
        headerTransparent: true,
        headerPressOpacity: 0.2,
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
      }}>
      <Tab.Screen
        name={`HomeClientDeliveryScreen`}
        options={{
          title: 'Inicio',
          tabBarIcon: ({color}) => <CustomIcon fill={color} name="home" />,
          headerShown: false,
        }}
        component={routesHomeByRoleMapper(role!) ?? HomeClientScreen}
      />
      <Tab.Screen
        name="ProfileClientScreen"
        options={{
          title: 'Perfil',
          tabBarIcon: ({color}) => (
            <CustomIcon fill={color} name="person-outline" />
          ),
          headerShown: true,
        }}
        component={profileRoutesByRoleMapper(role!) ?? ProfileClientScreen}
      />
      <Tab.Screen
        name="favoritesScreen"
        options={{
          title: 'Fav',
          tabBarIcon: ({color}) => <CustomIcon fill={color} name="heart" />,
          tabBarIconStyle: {},
        }}
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="chatBotScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <CustomIcon fill={color} name="message-circle-outline" />
          ),
          tabBarIconStyle: {},
        }}
        component={ChatBotScreen}
      />
      <Tab.Screen
        name="SettingsScreen"
        options={{
          tabBarIconStyle: {
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
