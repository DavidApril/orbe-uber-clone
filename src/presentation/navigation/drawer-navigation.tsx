import {createDrawerNavigator} from '@react-navigation/drawer';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon} from '../components';
import {CLIENT, RootStackParams} from '../../interfaces';
import {useAuthStore, useUIStore} from '../../store';
import {BottomTapNavigationClientDelivery} from './bottom-tap-navigation';
import {CouponsScreen, ProductsCartScreen} from '../screens';
import {TopTapCouponsNavigation} from './top-tap-coupons-navigation';

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
            name="WalletScreen"
            component={CouponsScreen}
          />
        </>
      )}
    </Navigator>
  );
}
