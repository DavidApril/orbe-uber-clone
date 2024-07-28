import {createDrawerNavigator} from '@react-navigation/drawer';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon} from '../components';
import {CLIENT, DELIVERY, DRIVER, RootStackParams} from '../../interfaces';
import {useAuthStore, useUIStore} from '../../store';
import {BottomTapNavigationClientDelivery} from './bottom-tap-navigation';
import {
  CouponsScreen,
  ErrorScreen,
  HistoryShoppingScreen,
  ProductsCartScreen,
  RefillsScreen,
} from '../screens';
import {TopTapCouponsNavigation} from './top-tap-coupons-navigation';
import {BottomTapNavigationDriver} from './bottom-tab-nativagion-driver';
import {ShoppingHistoryNavigator} from './shopping-history-navigation';

const {Navigator, Screen} = createDrawerNavigator<RootStackParams>();

export function DrawerNavigation() {
  const {isDarkMode} = useUIStore();
  const {role} = useAuthStore();
  return (
    <Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'back',
        drawerInactiveTintColor: !isDarkMode ? 'black' : 'white',
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
            component={BottomTapNavigationClientDelivery}
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
            component={ShoppingHistoryNavigator}
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
            component={TopTapCouponsNavigation}
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
        <Screen
          options={{
            title: 'Inicio',
            headerShown: false,
            sceneContainerStyle: {
              flex: 1,
            },
            drawerIcon: ({color}) => <CustomIcon fill={color} name="home" />,
          }}
          name="HomeDriverScreen"
          component={BottomTapNavigationDriver}
        />
      )}
    </Navigator>
  );
}
