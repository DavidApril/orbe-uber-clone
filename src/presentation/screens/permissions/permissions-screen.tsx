import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {useAuthStore, usePermissionStore} from '../../../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/stack-navigation';

export const PermissionsScreen = () => {
  const {locationStatus, requestLocationPermission} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {user} = useAuthStore();

  useEffect(() => {
    if (locationStatus === 'granted' && user?.email?.includes('conductor')) {
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
