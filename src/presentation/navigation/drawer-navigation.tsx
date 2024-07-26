import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './stack-navigation';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon, FABGoBackButton} from '../components';
import {ProfileClientScreen, SettingsScreen} from '../screens';
import {useAuthStore} from '../../store';
import {useColorScheme} from 'react-native';
import {profileRoutesByRoleMapper} from '../../utils/mappers';
import {RootStackParams} from '../../interfaces';
import {TopTapNavigationClientDelivery} from './top-tap-wallet-navigation';

const {Navigator, Screen} = createDrawerNavigator<RootStackParams>();

export function DrawerNavigation() {
  const {role} = useAuthStore();
  const colorScheme = useColorScheme();

  return (
    <Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerType: 'back',
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
      <Screen
        options={{
          title: 'Billetera',
          sceneContainerStyle: {
            flex: 1,
          },
          drawerIcon: ({color}) => (
            <CustomIcon fill={color} name="credit-card-outline" />
          ),
        }}
        name="WalletScreen"
        component={TopTapNavigationClientDelivery}
      />
    </Navigator>
  );
}
