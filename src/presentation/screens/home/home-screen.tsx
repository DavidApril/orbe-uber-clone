import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  FavoritesScreen,
  HomeDeliveryScreen,
  HomeDriverScreen,
  ProfileScreen,
  RequestDriverScreen,
  RestaurantsScreen,
} from '..';
import {CustomBottomTabs} from '../../components';
import {CLIENT, DELIVERY, DRIVER, RootStackParams} from '../../../interfaces';
import {useAuthStore} from '../../../store';

const Tab = createBottomTabNavigator<RootStackParams>();

export const HomeScreen = () => {
  const {role} = useAuthStore();
  const isClient = role === CLIENT;
  const isDriver = role === DRIVER;
  const isDelivery = role === DELIVERY;
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabs {...props} />}
      initialRouteName="RestaurantsScreen"
      screenOptions={{
        headerTransparent: true,
      }}>
      {isClient && (
        <Tab.Screen
          name={`RestaurantsScreen`}
          options={{
            // icon name
            title: 'home-outline',
            headerShown: false,
          }}
          component={RestaurantsScreen}
        />
      )}

      {isDriver && (
        <Tab.Screen
          name={`HomeDriverScreen`}
          options={{
            // icon name
            title: 'home-outline',
            headerShown: false,
          }}
          component={HomeDriverScreen}
        />
      )}

      {isDelivery && (
        <Tab.Screen
          name={`HomeDeliveryScreen`}
          options={{
            // icon name
            title: 'home-outline',
            headerShown: false,
          }}
          component={HomeDeliveryScreen}
        />
      )}

      <Tab.Screen
        name="ProfileScreen"
        options={{
          // icon name
          title: 'person-outline',
          headerShown: false,
        }}
        component={ProfileScreen}
      />

      {isClient && (
        <Tab.Screen
          name="RequestDriverScreen"
          options={{
            // icon name
            title: 'map-outline',
            headerShown: false,
          }}
          component={RequestDriverScreen}
        />
      )}
      {isClient && (
        <Tab.Screen
          name="favoritesScreen"
          options={{
            // icon name
            title: 'heart',
            headerShown: false,
          }}
          component={FavoritesScreen}
        />
      )}
    </Tab.Navigator>
  );
};