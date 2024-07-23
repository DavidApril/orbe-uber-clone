import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';

import {
  HomeDriverScreen,
  HomeClientScreen,
  LoadingScreen,
  LoginScreen,
  PermissionsScreen,
  RegisterScreen,
  RegisterDriverScreen,
  RegisterClientScreen,
  ProfileClientScreen,
  ProfileDriverScreen,
  SettingsScreen,
  RegisterDeliveryScreen,
} from '../screens';
import {RootStackParams} from '../../interfaces';

const {Navigator, Screen} = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardSyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  return (
    <Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{headerShown: false}}>
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="RegisterDriverScreen"
        component={RegisterDriverScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="RegisterClientScreen"
        component={RegisterClientScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="RegisterDeliveryScreen"
        component={RegisterDeliveryScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="PermissionsScreen"
        component={PermissionsScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="HomeDriverScreen"
        component={HomeDriverScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="HomeClientScreen"
        component={HomeClientScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="ProfileClientScreen"
        component={ProfileClientScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="ProfileDriverScreen"
        component={ProfileDriverScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Navigator>
  );
};
