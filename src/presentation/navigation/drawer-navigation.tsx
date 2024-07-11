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

const {Navigator, Screen} = createDrawerNavigator();

export function DrawerNavigation() {
  const {role} = useAuthStore();

  return (
    <Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,

        // headerLeftLabelVisible: false,
        drawerType: 'slide',
        drawerActiveTintColor: globalColors.primary,
        drawerItemStyle: {
          borderRadius: 50,
          paddingHorizontal: 20,
        },
      }}>
      <Screen name="StackNavigator" component={StackNavigator} />
      <Screen
        name="Perfil"
        component={role === CLIENT ? ProfileClientScreen : ProfileDriverScreen}
      />
      <Screen name="Configuración" component={SettingsScreen} />
    </Navigator>
  );
}
