import {Button, Layout} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {useAuthStore, usePermissionStore} from '../../../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DRIVER, CLIENT, RootStackParams, DELIVERY} from '../../../interfaces';

export const PermissionsScreen = () => {
  const {locationStatus, requestLocationPermission} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {role} = useAuthStore();

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
      <Button
        onPress={() => {
          requestLocationPermission();
        }}>
        Habilitar localización
      </Button>
    </Layout>
  );
};
