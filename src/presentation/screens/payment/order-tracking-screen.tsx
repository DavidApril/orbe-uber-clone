import React from 'react';
import {CustomMapView, CView} from '../../components';
import {useLocationStore} from '../../../store';
import {LoadingScreen} from '../loading/loading-screen';

export const OrderTrackingScreen = () => {
  const {lastKnownLocation} = useLocationStore();

  return lastKnownLocation ? (
    <CView style={{flex: 1}}>
      <CustomMapView initialLocation={lastKnownLocation!}></CustomMapView>
    </CView>
  ) : (
    <LoadingScreen />
  );
};
