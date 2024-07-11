import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './stack-navigation';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent} from '../components';
import {ProfileClientScreen, SettingsScreen} from '../screens';

const {Navigator, Screen} = createDrawerNavigator();

export function DrawerNavigation() {
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
      <Screen name="Perfil" component={ProfileClientScreen} />
      <Screen name="Configuración" component={SettingsScreen} />
    </Navigator>
  );
}
