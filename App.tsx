import 'react-native-gesture-handler';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useColorScheme} from 'react-native';
import * as eva from '@eva-design/eva';
import {AuthProvider, PermissionsCheckerProvider} from './src/providers';
import {
  BottomTapNavigationClientDelivery,
  DrawerNavigation,
  StackNavigator,
} from './src/presentation/navigation';
import {globalColors} from './src/presentation/theme/styles';

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  // const backgroundColor =
  //   colorScheme === 'dark' ? theme['black'] : theme['white'];

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
