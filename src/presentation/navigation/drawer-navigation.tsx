import {createDrawerNavigator} from '@react-navigation/drawer';
import {globalColors, primaryColors} from '../theme/styles';
import {CustomDrawerContent, CustomIcon} from '../components';
import {RootStackParams} from '../../interfaces';
import {useUIStore} from '../../store';
import {HomeScreen} from '../screens/home/home-screen';
import {
  CartOfProductsScreen,
  ChatBotScreen,
  RechargeScreen,
  SettingsScreen,
  ShoppingHistoryScreen,
} from '../screens';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from '../../config/i18n/i18n';

const {Navigator, Screen} = createDrawerNavigator<RootStackParams>();

export function DrawerNavigation() {
  const {isDarkMode} = useUIStore();

  return (
    <I18nextProvider i18n={i18n}>
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
            name="CartOfProductsScreen"
            component={CartOfProductsScreen}
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
            name="ShoppingHistoryScreen"
            component={ShoppingHistoryScreen}
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
            name="RechargeScreen"
            component={RechargeScreen}
          />

          <Screen
            options={{
              headerShown: false,
              // icon name
              title: 'Orbe chat',
              drawerIcon: ({color}) => (
                <CustomIcon fill={color} name="message-circle-outline" />
              ),
            }}
            name="ChatBotScreen"
            component={ChatBotScreen}
          />

          <Screen
            options={{
              headerShown: true,
              title: 'settings',
              headerTintColor: primaryColors.primary,
              drawerIcon: ({color}) => (
                <CustomIcon fill={color} name="settings-outline" />
              ),
            }}
            name="SettingsScreen"
            component={SettingsScreen}
          />
        </>

        {/* {role === DRIVER && (
          <>
            <Screen
              options={{
                title: 'Inicio',
                headerShown: false,
                sceneContainerStyle: {
                  flex: 1,
                },
                drawerIcon: ({color}) => (
                  <CustomIcon fill={color} name="home" />
                ),
              }}
              name="HomeDriverScreen"
              component={HomeDriverScreen}
            />
            <Screen
              options={{
                title: 'Viajes',
                headerShown: false,
                sceneContainerStyle: {
                  flex: 1,
                },
                drawerIcon: ({color}) => (
                  <CustomIcon fill={color} name="menu" />
                ),
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
              name="RechargeScreen"
              component={RechargeScreen}
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
                drawerIcon: ({color}) => (
                  <CustomIcon fill={color} name="home" />
                ),
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
                drawerIcon: ({color}) => (
                  <CustomIcon fill={color} name="menu" />
                ),
              }}
              name="HistoryScreen"
              component={HistoryScreen}
            />
          </>
        )} */}
      </Navigator>
    </I18nextProvider>
  );
}
