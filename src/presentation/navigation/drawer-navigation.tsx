import {createDrawerNavigator} from '@react-navigation/drawer';
import {StackNavigator} from './stack-navigation';
import {globalColors} from '../theme/styles';
import {CustomDrawerContent} from '../components';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        // headerLeftLabelVisible: false,
        drawerType: 'slide',
        drawerActiveTintColor: globalColors.primary,
        drawerItemStyle: {
          borderRadius: 50,
          paddingHorizontal: 20,
        },
      }}>
      <Drawer.Screen name="StackNavigator" component={StackNavigator} />
    </Drawer.Navigator>
  );
}
