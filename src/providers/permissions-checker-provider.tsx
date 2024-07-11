import React, {PropsWithChildren, useEffect} from 'react';
import {AppState} from 'react-native';
import {useAuthStore, usePermissionStore} from '../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../interfaces';

export const PermissionsCheckerProvider = ({children}: PropsWithChildren) => {
  const {status} = useAuthStore();
  const {role} = useAuthStore();
  const {checkLocationPermission, locationStatus} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    if (locationStatus === 'granted' && status === 'authorized') {
      if (role === 'DRIVER') {
        navigation.navigate('HomeDriverScreen');
      } else if (role === 'CLIENTE') {
        navigation.navigate('HomeClientScreen');
      }
    } else if (locationStatus === 'undetermined' && status === 'authorized') {
      navigation.navigate('PermissionsScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  }, [locationStatus, status]);

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
