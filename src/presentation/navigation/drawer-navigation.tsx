import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './stack-navigation';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon} from '../components';
import {useColorScheme} from 'react-native';

import {RootStackParams} from '../../interfaces';
import {TopTapNavigationClientDelivery} from './top-tap-wallet-navigation';
import {CouponsScreen} from '../screens';

const {Navigator, Screen} = createDrawerNavigator<RootStackParams>();

export function DrawerNavigation() {
  const colorScheme = useColorScheme();

  return (
    <Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'back',
        drawerInactiveTintColor: colorScheme === 'light' ? 'black' : 'white',
        drawerActiveTintColor: globalColors.primaryColors.primary,
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
          title: 'Cupones',
          headerShown: false,
          sceneContainerStyle: {
            flex: 1,
          },
          drawerIcon: ({color}) => <CustomIcon fill={color} name="award" />,
        }}
        name="WalletScreen"
        component={CouponsScreen}
      />

      <Screen
        options={{
          title: 'Recargas',
          headerShown: false,
          sceneContainerStyle: {
            flex: 1,
          },
          drawerIcon: ({color}) => (
            <CustomIcon fill={color} name="credit-card" />
          ),
        }}
        name="CouponsScreen"
        component={CouponsScreen}
      />
    </Navigator>
  );
}
