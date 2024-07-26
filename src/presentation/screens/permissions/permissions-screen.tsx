import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useAuthStore, usePermissionStore} from '../../../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DRIVER, CLIENT, RootStackParams, DELIVERY} from '../../../interfaces';

export const PermissionsScreen = () => {
  const {locationStatus, requestLocationPermission} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {role} = useAuthStore();

  console.log({role});

  useEffect(() => {
    if (locationStatus === 'granted' && role === DRIVER) {
      navigation.navigate('HomeDriverScreen');
    } else if (locationStatus === 'granted' && role === CLIENT) {
      navigation.navigate('HomeDeliveryScreen');
    } else if (locationStatus === 'granted' && role === DELIVERY) {
      navigation.navigate('HomeDeliveryScreen');
    }
  }, [locationStatus, role]);

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button onPress={requestLocationPermission}>
        Habilitar localización
      </Button>
    </Layout>
  );
};
