import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  FavoritesScreen,
  HistoryTravels,
  HomeClientDriverScreen,
  HomeDriverScreen,
  ProfileDriverScreen,
} from '../screens';
import {CustomBottomTabs} from '../components';
import {RootStackParams} from '../../interfaces';
import {ChatBotScreen} from '../screens/chatbot/chatbot-screen';
import {StackRestaurantNavigation} from './stack-restaurant-navigation';
import {TopTabClientProfileNavigation} from './top-tab-client-profile';

const Tab = createBottomTabNavigator<RootStackParams>();

export const BottomTapNavigationClientDelivery = () => {
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
          // icon name
          title: 'home-outline',
          headerShown: false,
        }}
        component={StackRestaurantNavigation}
      />
      <Tab.Screen
        name="ProfileClientScreen"
        options={{
          // icon name
          title: 'person-outline',
          headerShown: false,
        }}
        component={TopTabClientProfileNavigation}
      />
      <Tab.Screen
        name="HomeClientDriverScreen"
        options={{
          // icon name
          title: 'map-outline',
          headerShown: false,
        }}
        component={HomeClientDriverScreen}
      />
      <Tab.Screen
        name="favoritesScreen"
        options={{
          // icon name
          title: 'heart',
          headerShown: false,
        }}
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );
};

export const BottomTapNavigationDriver = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabs {...props} />}
      initialRouteName="HomeClientDeliveryScreen"
      screenOptions={{
        headerTransparent: true,
      }}>
      <Tab.Screen
        name={`HomeDriverScreen`}
        options={{
          // icon name
          title: 'home-outline',
          headerShown: false,
        }}
        component={HomeDriverScreen}
      />
      <Tab.Screen
        name="ProfileClientScreen"
        options={{
          // icon name
          title: 'person-outline',
          headerShown: false,
        }}
        component={ProfileDriverScreen}
      />

      <Tab.Screen
        name="HistoryScreen"
        options={{
          headerShown: false,
          // icon name
          title: 'layers-outline',
        }}
        component={HistoryTravels}
      />
      <Tab.Screen
        name="ChatBotScreen"
        options={{
          headerShown: false,
          // icon name
          title: 'message-circle-outline',
        }}
        component={ChatBotScreen}
      />
    </Tab.Navigator>
  );
};
