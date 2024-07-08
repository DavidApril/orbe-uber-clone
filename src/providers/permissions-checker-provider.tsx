import React, {PropsWithChildren, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useAuthStore, usePermissionStore} from '../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../presentation/navigation/stack-navigation';
import {orbeApi} from '../config/api';
import {LoadingScreen} from '../presentation/screens';

export const PermissionsCheckerProvider = ({children}: PropsWithChildren) => {
  const {status} = useAuthStore();
  const {user} = useAuthStore();
  const {checkLocationPermission, locationStatus} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [isDriver, setIsDriver] = useState<boolean | null>(null);

  const getUserByUid = async (uid: string) => {
    try {
      const {data: response} = await orbeApi.get(
        `/user/getUserByUid?uid_firebase=${uid}`,
      );
      if (!response.data) {
        setIsDriver(true);
      } else {
        setIsDriver(false);
      }
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(() => {
    console.log({isDriver});
  }, [isDriver]);

  useEffect(() => {
    if (user) {
      getUserByUid(user!.uid);
    }
  }, [user]);

  useEffect(() => {
    if (locationStatus === 'granted' && status === 'authorized') {
      if (isDriver) {
        navigation.navigate('HomeDriverScreen');
      } else {
        navigation.navigate('HomeClientScreen');
      }
    } else if (locationStatus === 'undetermined' && status === 'authorized') {
      navigation.navigate('PermissionsScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  }, [locationStatus, status, isDriver]);

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
