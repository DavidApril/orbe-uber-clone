import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  FavoritesScreen,
  ProfileScreen,
  RequestDriverScreen,
  RestaurantsScreen,
} from '..';
import {CustomBottomTabs} from '../../components';
import {RootStackParams} from '../../../interfaces';

const Tab = createBottomTabNavigator<RootStackParams>();

export const HomeScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabs {...props} />}
      screenOptions={{
        headerTransparent: true,
      }}>
      <Tab.Screen
        name={`RestaurantsScreen`}
        options={{
          // icon name
          title: 'home-outline',
          headerShown: false,
        }}
        component={RestaurantsScreen}
      />
      <Tab.Screen
        name="ProfileScreen"
        options={{
          // icon name
          title: 'person-outline',
          headerShown: false,
        }}
        component={ProfileScreen}
      />
      <Tab.Screen
        name="RequestDriverScreen"
        options={{
          // icon name
          title: 'map-outline',
          headerShown: false,
        }}
        component={RequestDriverScreen}
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

// export const HomeDriverScreen = () => {
//   return (
//     <Tab.Navigator
//       tabBar={props => <CustomBottomTabs {...props} />}
//       initialRouteName="HomeClientDeliveryScreen"
//       screenOptions={{
//         headerTransparent: true,
//       }}>
//       <Tab.Screen
//         name={`HomeDriverScreen`}
//         options={{
//           // icon name
//           title: 'home-outline',
//           headerShown: false,
//         }}
//         component={HomeDriverScreen}
//       />
//       <Tab.Screen
//         name="ProfileClientScreen"
//         options={{
//           // icon name
//           title: 'person-outline',
//           headerShown: false,
//         }}
//         component={ProfileDriverScreen}
//       />

//       <Tab.Screen
//         name="HistoryScreen"
//         options={{
//           headerShown: false,
//           // icon name
//           title: 'layers-outline',
//         }}
//         component={HistoryTravels}
//       />
//       <Tab.Screen
//         name="ChatBotScreen"
//         options={{
//           headerShown: false,
//           // icon name
//           title: 'message-circle-outline',
//         }}
//         component={ChatBotScreen}
//       />
//     </Tab.Navigator>
//   );
// };

// export const HomeDeliveryScreen = () => {
//   return (
//     <Tab.Navigator
//       tabBar={props => <CustomBottomTabs {...props} />}
//       initialRouteName="HomeDriverScreen"
//       screenOptions={{
//         headerTransparent: true,
//       }}>
//       <Tab.Screen
//         name={`HomeDriverScreen`}
//         options={{
//           // icon name
//           title: 'home-outline',
//           headerShown: false,
//         }}
//         component={HomeDeliveryScreen}
//       />
//       <Tab.Screen
//         name="ProfileClientScreen"
//         options={{
//           // icon name
//           title: 'person-outline',
//           headerShown: false,
//         }}
//         component={ProfileDriverScreen}
//       />

//       <Tab.Screen
//         name="HistoryScreen"
//         options={{
//           headerShown: false,
//           // icon name
//           title: 'layers-outline',
//         }}
//         component={HistoryTravels}
//       />
//       <Tab.Screen
//         name="ChatBotScreen"
//         options={{
//           headerShown: false,
//           // icon name
//           title: 'message-circle-outline',
//         }}
//         component={ChatBotScreen}
//       />
//     </Tab.Navigator>
//   );
// };
