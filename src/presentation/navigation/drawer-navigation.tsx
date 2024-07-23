import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './stack-navigation';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent} from '../components';
import {
  ProfileClientScreen,
  ProfileDriverScreen,
  SettingsScreen,
} from '../screens';
import {useAuthStore} from '../../store';
import {CLIENT} from '../../interfaces';
import {useColorScheme} from 'react-native';


const {Navigator, Screen} = createDrawerNavigator();

export function DrawerNavigation() {
  const {role} = useAuthStore();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? globalColors.themeDark : globalColors.themeLight;

  return (
    <Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme,
        },
        headerTintColor: '#3fc1f2',

        // headerLeftLabelVisible: false,
        drawerType: 'slide',
        drawerInactiveTintColor: colorScheme === 'dark' ? globalColors.white : globalColors.gray,
        drawerActiveTintColor: globalColors.primary,
        drawerItemStyle: {
          borderRadius: 50,
          paddingHorizontal: 20,
        },
      }}>
      <Screen options={{ headerShown: false }} name="Inicio" component={StackNavigator} />
      <Screen
        name="Perfil"
        component={role === CLIENT ? ProfileClientScreen : ProfileDriverScreen}
      />
      <Screen
       name="Configuración" 
       component={SettingsScreen} 
      />
    </Navigator>
  );
}
