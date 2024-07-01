import 'react-native-gesture-handler';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AuthProvider } from './src/providers/auth-provider';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/presentation/navigation/stack-navigation';
import { useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';

export const App = () => {

  const colorScheme = useColorScheme();
	const theme = colorScheme === 'dark' ? eva.dark : eva.light;
	const backgroundColor = colorScheme === 'dark' ? theme['color-basic-800'] : theme['color-basic-100'];

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: colorScheme === 'dark',
            colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500'],
            },
          }}>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
