import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FavoritesScreen, ProfileClientScreen, SettingsScreen} from '../screens';
import {CustomIcon} from '../components';
import {
  profileRoutesByRoleMapper,
  routesHomeByRoleMapper,
} from '../../utils/mappers';
import {HomeClientScreen} from '../screens/home/home-client-screen';
import {useAuthStore} from '../../store';
import {RootStackParams} from '../../interfaces';
import { globalColors } from '../theme/styles';

const Tab = createBottomTabNavigator<RootStackParams>();

export const BottomTapNavigationClientDelivery = () => {
  const {role} = useAuthStore();

  return (
    <Tab.Navigator
      initialRouteName="HomeClientDeliveryScreen"
      sceneContainerStyle={{
        backgroundColor: 'black',
      }}
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
        headerTintColor: globalColors.primary
      }}>
      <Tab.Screen
        name={`HomeClientDeliveryScreen`}
        options={{
          title: 'Inicio',
          tabBarIcon: ({color}) => <CustomIcon fill={color} name="home" />,
          tabBarIconStyle: {
            backgroundColor: 'black',
          },
          headerShown: false,
        }}
        component={routesHomeByRoleMapper(role!) ?? HomeClientScreen}
      />
      <Tab.Screen
        name="ProfileClientScreen"
        options={{
          title: 'Perfil',
          tabBarIconStyle: {
            backgroundColor: 'black',
          },
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
          title: 'Favoritos',
          tabBarIcon: ({color}) => <CustomIcon fill={color} name="heart" />,
          tabBarIconStyle: {},
        }}
        component={FavoritesScreen}
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
