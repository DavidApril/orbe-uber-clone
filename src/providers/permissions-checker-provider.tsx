import React, {PropsWithChildren, useEffect} from 'react';
import {AppState} from 'react-native';
import {usePermissionStore} from '../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../presentation/navigation/stack-navigation';

export const PermissionsCheckerProvider = ({children}: PropsWithChildren) => {
  const {checkLocationPermission, locationStatus} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  useEffect(() => {
    if (locationStatus === 'granted') {
      navigation.navigate('HomeScreen');
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};
