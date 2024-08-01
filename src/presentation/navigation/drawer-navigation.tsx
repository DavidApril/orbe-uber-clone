import {createDrawerNavigator} from '@react-navigation/drawer';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon} from '../components';
import {CLIENT, DELIVERY, DRIVER, RootStackParams} from '../../interfaces';
import {useAuthStore, useUIStore} from '../../store';
import {
  HomeScreen,
  BottomTapNavigationDelivery,
  BottomTapNavigationDriver,
} from '../screens/home/home-screen';
import {ProductsCartScreen, RefillsScreen, ChatBotScreen} from '../screens';
import {CouponsScreen} from './top-tap-coupons-navigation';
import {HistoryScreen} from '../screens';
import {StackRechargeNavigation} from './stack-recharge-navigation';
import {StackNavigator} from './stack-navigation';

const {Navigator, Screen} = createDrawerNavigator<RootStackParams>();

export function DrawerNavigation() {
  const {isDarkMode} = useUIStore();
  const {role} = useAuthStore();

  return (
    <Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'back',
        drawerInactiveTintColor: !isDarkMode ? '#444' : 'white',
        drawerActiveTintColor: globalColors.primaryColors.primary,
        drawerItemStyle: {
          borderRadius: 50,
          paddingHorizontal: 20,
        },
      }}>
      {role === CLIENT && (
        <>
          <Screen
            options={{
              title: 'Inicio',
              drawerIcon: ({color}) => <CustomIcon fill={color} name="home" />,
              headerShown: false,
            }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Screen
            options={{
              title: 'Mi carrito',
              headerShown: false,
              sceneContainerStyle: {
                flex: 1,
              },
              drawerIcon: ({color}) => (
                <CustomIcon fill={color} name="shopping-cart-outline" />
              ),
            }}
            name="ProductsCartScreen"
            component={ProductsCartScreen}
          />

          <Screen
            options={{
              title: 'Compras',
              headerShown: false,
              sceneContainerStyle: {
                flex: 1,
              },
              drawerIcon: ({color}) => <CustomIcon fill={color} name="menu" />,
            }}
            name="HistoryScreen"
            component={HistoryScreen}
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
            name="CouponsScreen"
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
            name="RefillsScreen"
            component={StackRechargeNavigation}
          />
          <Screen
            name="ChatBotScreen"
            options={{
              headerShown: false,
              // icon name
              title: 'Orbe chat',
              drawerIcon: ({color}) => (
                <CustomIcon fill={color} name="message-circle-outline" />
              ),
            }}
            component={ChatBotScreen}
          />
          <Screen
            name="LoginScreen"
            options={{
              headerShown: false,
              title: 'Cerrar sesión',
              drawerIcon: ({color}) => <CustomIcon fill={color} name="power" />,
            }}
            component={StackNavigator}
          />
        </>
      )}

      {role === DRIVER && (
        <>
          <Screen
            options={{
              title: 'Inicio',
              headerShown: false,
              sceneContainerStyle: {
                flex: 1,
              },
              drawerIcon: ({color}) => <CustomIcon fill={color} name="home" />,
            }}
            name="HomeScreen"
            component={BottomTapNavigationDriver}
          />
          <Screen
            options={{
              title: 'Viajes',
              headerShown: false,
              sceneContainerStyle: {
                flex: 1,
              },
              drawerIcon: ({color}) => <CustomIcon fill={color} name="menu" />,
            }}
            name="HistoryScreen"
            component={HistoryScreen}
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
            name="RefillsScreen"
            component={RefillsScreen}
          />
        </>
      )}

      {role === DELIVERY && (
        <>
          <Screen
            options={{
              title: 'Inicio',
              headerShown: false,
              sceneContainerStyle: {
                flex: 1,
              },
              drawerIcon: ({color}) => <CustomIcon fill={color} name="home" />,
            }}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Screen
            options={{
              title: 'Ordenes',
              headerShown: false,
              sceneContainerStyle: {
                flex: 1,
              },
              drawerIcon: ({color}) => <CustomIcon fill={color} name="menu" />,
            }}
            name="HistoryScreen"
            component={HistoryScreen}
          />
        </>
      )}
    </Navigator>
  );
}
