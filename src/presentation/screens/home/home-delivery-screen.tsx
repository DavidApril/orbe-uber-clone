import {Button, Layout, Spinner, Text} from '@ui-kitten/components';
import {
  CustomIcon,
  CustomMapView,
  DriverInformationCard,
  FAB,
  SelectOriginDestination,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useAuthStore, useLocationStore} from '../../../store';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useSocket} from '../../../hooks';
import {useWindowDimensions} from 'react-native';
import {RacesService} from '../../../services';
import {API_SOCKET_URL} from '@env';
import {
  DriverResponseByUidData,
  Location,
  RootStackParams,
} from '../../../interfaces';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

export const HomeDeliveryScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const SearchingDriverBottomSheetRef = useRef<BottomSheet>(null);

  const {lastKnownLocation} = useLocationStore();

  const snapPoints = useMemo(() => ['20%', '50%', '80%'], []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FAB
        white
        iconName="menu-2-outline"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
          backgroundColor: '#3fc1f2',
        }}
      />

      <CustomMapView initialLocation={lastKnownLocation!}></CustomMapView>

      <BottomSheet ref={SearchingDriverBottomSheetRef} snapPoints={snapPoints}>
        <Layout></Layout>
      </BottomSheet>
    </>
  );
};
