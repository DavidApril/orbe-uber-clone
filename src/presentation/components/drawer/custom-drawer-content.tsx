import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Button, Layout} from '@ui-kitten/components';
import {useAuthStore} from '../../../store';
import {useWindowDimensions} from 'react-native';

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
