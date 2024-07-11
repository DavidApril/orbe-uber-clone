import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Button, Layout} from '@ui-kitten/components';
import {useAuthStore} from '../../../store';
import {useWindowDimensions, View} from 'react-native';
import { CustomIcon } from '../ui/custom-icon';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {user, logout} = useAuthStore();
  const {height} = useWindowDimensions();

  return (
    <DrawerContentScrollView>
      <Layout
        style={{
          // backgroundColor: 'transparent',
          height,
        }}>
        <Layout
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
          }}>
          <DrawerItemList {...props} />
          {/* <DrawerItem label='Profile' onPress={() => {}} /> */}
          <Button onPress={() => logout()} status="danger" appearance="ghost">
            Cerrar sesión
          </Button>
        </Layout>
      </Layout>
    </DrawerContentScrollView>
  );
};
