import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {useDriverStore} from '../../../../../store';
import {useWindowDimensions} from 'react-native';
import {CustomIcon} from '../../../../components';
import {UsersService} from '../../../../../services';

export const SectionDisplayEditData = () => {
  const {width} = useWindowDimensions();
  const {driverRegisterForm} = useDriverStore();

  const [loading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit() {
    if (!driverRegisterForm) return;
    setIsLoading(true);
    await UsersService.createDriver(driverRegisterForm);
    setIsLoading(false);
  }

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Layout>
        <Text category="h1">Información</Text>
      </Layout>

      <Layout style={{height: 10}}></Layout>

      <Layout
        style={{
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'black',
          borderRadius: 10,
          width: width * 0.8,
        }}>
        <Layout
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomIcon name="person-outline" />
        </Layout>

        <Layout style={{backgroundColor: 'transparent'}}>
          <Text style={{color: 'white'}}>Hola,</Text>
          <Text style={{fontSize: 20, color: 'white'}} category="h3">
            {driverRegisterForm?.firstName + ' ' + driverRegisterForm?.lastName}
          </Text>
        </Layout>
      </Layout>

      <Layout style={{height: 10}}></Layout>

      <Layout
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: 'black',
          borderRadius: 10,
          width: width * 0.6,
        }}>
        <Layout style={{backgroundColor: 'transparent'}}>
          <Text style={{color: 'white'}}>{driverRegisterForm?.email}</Text>
          <Text style={{fontSize: 20, color: 'white'}} category="h3">
            {driverRegisterForm?.phone}
          </Text>
        </Layout>
      </Layout>

      <Layout style={{height: 10}}></Layout>

      <Layout>
        <Button onPress={() => handleSubmit()} appearance="ghost">
          Registrar
        </Button>
      </Layout>
    </Layout>
  );
};
