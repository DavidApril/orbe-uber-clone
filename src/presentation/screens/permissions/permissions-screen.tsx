import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {usePermissionStore} from '../../../store';

export const PermissionsScreen = () => {
  const {locationStatus, requestLocationPermission} = usePermissionStore();

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>status: {locationStatus}</Text>
      <Button onPress={requestLocationPermission}>
        Habilitar localización
      </Button>
    </Layout>
  );
};
