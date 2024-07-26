import 'react-native-gesture-handler';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import {AuthProvider, PermissionsCheckerProvider} from './src/providers';
import {DrawerNavigation} from './src/presentation/navigation';
import {globalColors} from './src/presentation/theme/styles';
import {useUIStore} from './src/store';
import {useEffect} from 'react';
import * as eva from '@eva-design/eva';

export const App = () => {
  const colorScheme = useColorScheme();
  const {setisDarkMode} = useUIStore();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  useEffect(() => {
    if (colorScheme === 'light') {
      setisDarkMode(false);
    } else {
      setisDarkMode(true);
    }
  }, [colorScheme]);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: globalColors.primaryColors.primary,
            },
          }}>
          <AuthProvider>
            <PermissionsCheckerProvider>
              {/* <StackNavigator /> */}
              <DrawerNavigation />
              {/* <BottomTapNavigationClientDelivery /> */}
            </PermissionsCheckerProvider>
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
