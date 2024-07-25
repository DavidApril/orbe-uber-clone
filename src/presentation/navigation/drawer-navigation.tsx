import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './stack-navigation';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon, FABGoBackButton} from '../components';
import {ProfileClientScreen, SettingsScreen} from '../screens';
import {useAuthStore} from '../../store';
import {useColorScheme} from 'react-native';
import {profileRoutesByRoleMapper} from '../../utils/mappers';
import {RootStackParams} from '../../interfaces';

const {Navigator, Screen} = createDrawerNavigator<RootStackParams>();

export function DrawerNavigation() {
  const {role} = useAuthStore();
  const colorScheme = useColorScheme();
  const theme =
    colorScheme === 'dark' ? globalColors.themeDark : globalColors.themeLight;

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
        drawerInactiveTintColor:
          colorScheme === 'dark' ? globalColors.white : globalColors.gray,
        drawerActiveTintColor: globalColors.primary,
        drawerItemStyle: {
          borderRadius: 50,
          paddingHorizontal: 20,
        },
      }}>
      <Screen
        options={{
          title: 'Inicio',
          drawerIcon: ({color}) => <CustomIcon fill={color} name="home" />,

          headerShown: false,
        }}
        name="HomeClientDriverScreen"
        component={StackNavigator}
      />
      {/* <Screen
        options={{
          title: 'Configuración',
          drawerIcon: ({color}) => <CustomIcon fill={color} name="settings" />,
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      /> */}
    </Navigator>
  );
}
