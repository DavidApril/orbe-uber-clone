import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './stack-navigation';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon} from '../components';

import {RootStackParams} from '../../interfaces';
import {CouponsScreen} from '../screens';
import {useUIStore} from '../../store';

const {Navigator, Screen} = createDrawerNavigator<RootStackParams>();

export function DrawerNavigation() {
  const {isDarkMode} = useUIStore();
  return (
    <Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'back',
        drawerInactiveTintColor: isDarkMode ? 'black' : 'white',
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
        name="HomeClientDeliveryScreen"
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
