import React, {PropsWithChildren, useEffect} from 'react';
import {AppState, Keyboard} from 'react-native';
import {
  useAuthStore,
  useCouponStore,
  usePaymentStore,
  usePermissionStore,
  useUIStore,
} from '../store';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {CLIENT, DELIVERY, DRIVER, RootStackParams} from '../interfaces';
import {PaymentService} from '../services';

export const PermissionsCheckerProvider = ({children}: PropsWithChildren) => {
  const {status} = useAuthStore();
  const {role} = useAuthStore();
  const {checkLocationPermission, locationStatus} = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {userByUid} = useAuthStore();
  const {addPoints} = useCouponStore();
  const {setTransactionsByUser, setCreditCardsTokens} = usePaymentStore();
  const {keyboardHeight, setKeyboardHeight} = useUIStore();
  
  useEffect(() => {
    if (userByUid) {
      PaymentService.GetPayMethodsUser(userByUid?.uid_firebase).then(
        cardsTokens => setCreditCardsTokens(cardsTokens),
      );
      PaymentService.getTransactionsByUser(userByUid.uid_firebase).then(
        transactions => setTransactionsByUser(transactions),
      );
      PaymentService.getTransactionsByUser(userByUid.uid_firebase).then(
        transaction => setTransactionsByUser(transaction),
      );

      addPoints(userByUid.points);
    }
  }, [userByUid]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      ({endCoordinates}) => {
        setKeyboardHeight(endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (locationStatus === 'granted' && status === 'authorized') {
      if (role === CLIENT) {
        navigation.navigate('HomeClientScreen');
      } else if (role === DRIVER) {
        navigation.navigate('HomeDriverScreen');
      } else if (role === DELIVERY) {
        navigation.navigate('HomeDeliveryScreen');
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
