import {
  StackCardStyleInterpolator,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  HomeScreen,
  LoadingScreen,
  LoginScreen,
  PermissionsScreen,
  RegisterScreen,
} from '../screens';

export type RootStackParams = {
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  PermissionsScreen: undefined;
  HomeScreen: undefined;
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
        name="PermissionsScreen"
        component={PermissionsScreen}
      />
      <Screen
        options={{cardStyleInterpolator: fadeAnimation}}
        name="HomeScreen"
        component={HomeScreen}
      />
    </Navigator>
  );
};
