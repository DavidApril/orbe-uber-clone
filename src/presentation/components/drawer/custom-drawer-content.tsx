import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Button, Layout} from '@ui-kitten/components';
import {useAuthStore} from '../../../store';
import {Modal, Pressable, Text, useWindowDimensions} from 'react-native';
import { useState } from 'react';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const {user, logout} = useAuthStore();
  const {height} = useWindowDimensions();
  const [modal, setModal] = useState<boolean>(false)

  return (
    <Layout>
      <Layout
        style={{
          // backgroundColor: 'transparent',
          height,
          overflow: 'hidden'
        }}>
        <Layout style={{ backgroundColor: '#3fc1f2', height: '20%', padding: 10 }}>
          <Text>Bienvenido a OrbeDriver!</Text>
        </Layout>
        <Layout
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            height: '75%',
            paddingVertical: 20
          }}>
          {/* <DrawerItem label='Profile' onPress={() => {}} /> */}
          <Layout>
            <DrawerItemList {...props} />
          </Layout>

          <Button onPress={() => setModal(true)} status="danger" appearance="ghost">
              Cerrar sesión
          </Button>
        </Layout>
        <Modal visible={modal} animationType='fade' transparent={true} onRequestClose={() => {setModal(false)}}>
          <Pressable style={{ backgroundColor: '#0007', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => {setModal(false)}}>
            <Layout style={{ width: '90%', borderRadius: 20, height: 150, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
              <Text style={{ fontSize: 18 }}>Esta seguro de cerrar sesion?</Text>
              <Layout style={{ flexDirection: 'row', gap: 10 }}>
                <Pressable style={{ padding: 10, borderRadius: 10, backgroundColor: '#00c1f1', borderColor: '#00c1f1' }} onPress={() => setModal(false)}>
                  <Text style={{ color: 'white' }}>Cancelar</Text>
                </Pressable>
                <Pressable style={{ padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#00c1f1' }} onPress={() => {logout(), setModal(false)}}>
                  <Text style={{ color: '#00c1f1' }}>Cerrar sesion</Text>
                </Pressable>
              </Layout>
            </Layout>
          </Pressable>
        </Modal>
      </Layout>
    </Layout>
  );
};
