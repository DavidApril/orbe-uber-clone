import {createDrawerNavigator} from '@react-navigation/drawer';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon} from '../components';
import {CLIENT, DELIVERY, DRIVER, RootStackParams} from '../../interfaces';
import {useAuthStore, useUIStore} from '../../store';
import {BottomTapNavigationClientDelivery, BottomTapNavigationDriver} from './bottom-tap-navigation';
import {ProductsCartScreen, RefillsScreen, ChatBotScreen} from '../screens';
import {TopTapCouponsNavigation} from './top-tap-coupons-navigation';
import {ShoppingHistoryNavigator} from './shopping-history-navigation';
import { StackRechargeNavigation } from './stack-recharge-navigation';

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
