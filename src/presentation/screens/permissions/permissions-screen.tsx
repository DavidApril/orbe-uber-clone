import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {useAuthStore, usePermissionStore} from '../../../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/stack-navigation';
import {DRIVER, CLIENT} from '../../../interfaces';
import {DriverService} from '../../../services';
import { orbeApi } from '../../../config/api';

export const PermissionsScreen = () => {
  const {locationStatus, requestLocationPermission} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {user} = useAuthStore();

  const [isDriver, setIsDriver] = useState<boolean | null>(null);

  useEffect(() => {
    console.log({isDriver});
  }, [isDriver]);

  const getUserByUid = async () => {
    try {
      console.log(user?.uid)
      const userByUid = await DriverService.getDriverByUserUid(user!.uid);
      console.log({userByUid});
      if (userByUid.roles[0].name === DRIVER) {
        setIsDriver(true);
      } else if (userByUid.roles[0].name === CLIENT) {
        setIsDriver(false);
      } else {
        setIsDriver(null);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (user) {
      getUserByUid();
    }
  }, [user]);

  useEffect(() => {
    if (locationStatus === 'granted' && isDriver) {
      navigation.navigate('HomeDriverScreen');
    } else {
      navigation.navigate('HomeClientScreen');
    }
  }, [locationStatus]);

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>status: {locationStatus}</Text>
      <Button onPress={requestLocationPermission}>
        Habilitar localización
      </Button>
    </Layout>
  );
};
