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
} from '../screens';
import {useAuthStore} from '../../store';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  PermissionsScreen: undefined;
  HomeClientScreen: undefined;
  HomeDriverScreen: undefined;
  RegisterDriverScreen: undefined;
  RegisterClientScreen: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return {
    cardSyle: {
      opacity: current.progress,
    },
  };
};

export const StackNavigator = () => {
  const {user} = useAuthStore();

  console.log(user?.email);

  const isDriver = user?.email?.includes('conductor');

  return (
    <Navigator
      initialRouteName="RegisterDriverScreen"
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
        name="PermissionsScreen"
        component={PermissionsScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="HomeDriverScreen"
        component={HomeDriverScreen}
      />
      {!isDriver && (
        <Screen
          options={{cardStyleInterpolator: fadeAnimation}}
          name="HomeClientScreen"
          component={HomeClientScreen}
        />
      )}
    </Navigator>
  );
};
