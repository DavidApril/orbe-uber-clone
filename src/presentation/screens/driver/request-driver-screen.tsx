import {BSSelectOriginDestination, CustomMapView, FAB} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useAuthStore, useLocationStore} from '../../../store';
import {useEffect, useState} from 'react';
import {useSocket} from '../../../hooks';
import {API_SOCKET_URL} from '@env';
import {RootStackParams} from '../../../interfaces';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {useClientDriverStore} from '../../../store/client/client-driver-store';

export const RequestDriverScreen = () => {
  const {user} = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [currentDriver, setCurrentDriver] = useState<any>(null);

  const {
    origin,
    destination,
    payWithCard,
    nearbyDrivers,
    setCurrentDriverAcceptRace,
    setNearbyDrivers,
    setRaceData,
    searchingDriver,
  } = useClientDriverStore();
  const {socket, online} = useSocket(`${API_SOCKET_URL}/location-client`);
  const {socket: raceWaitsSocket} = useSocket(
    `${API_SOCKET_URL}/client-driver-wait`,
  );

  const checkout = async () => {};

  useEffect(() => {
    if (payWithCard) {
      checkout();
    }
  }, [payWithCard]);

  useEffect(() => {
    const payload = {
      id: user?.uid,
      longitud: lastKnownLocation?.longitude,
      latitud: lastKnownLocation?.latitude,
    };
    socket.emit('message-client', payload);
    return () => {
      socket.off();
    };
  }, [lastKnownLocation]);

  useEffect(() => {
    socket.on('conductores-cercanos', data => {
      setNearbyDrivers(data);
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  useEffect(() => {
    raceWaitsSocket.on('request-response', response => {
      if (response.data.price) {
        setCurrentDriverAcceptRace(true);
      }
    });
  }, []);

  useEffect(() => {
    const driver = nearbyDrivers?.filter(
      (driver: any) => driver.id === currentDriver?.id,
    );
    if (driver) {
      setCurrentDriver(driver[0]);
    }
  }, [nearbyDrivers]);

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

      <CustomMapView
        driverPosition={currentDriver ? currentDriver : null}
        origin={origin}
        destination={destination}
        setRaceData={setRaceData}
        initialLocation={lastKnownLocation!}></CustomMapView>

      <BSSelectOriginDestination />
    </>
  );
};
