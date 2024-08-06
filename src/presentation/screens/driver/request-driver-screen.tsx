import {
  BSSelectOriginDestination,
  CButton,
  CText,
  CTextHeader,
  CustomIcon,
  CustomMapView,
  CView,
  CViewAlpha,
  FAB,
} from '../../components';
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
import {Modal, Pressable, useWindowDimensions} from 'react-native';
import {View} from 'react-native';

export const RequestDriverScreen = () => {
  const {user} = useAuthStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const {height, width} = useWindowDimensions();
  const [currentDriver, setCurrentDriver] = useState<any>(null);
  const [rating, setRating] = useState<number>(0);
  const {
    origin,
    destination,
    payWithCard,
    nearbyDrivers,
    setCurrentDriverAcceptRace,
    setNearbyDrivers,
    setRaceData,
  } = useClientDriverStore();
  const {socket, online} = useSocket(`${API_SOCKET_URL}/location-client`);
  const {socket: raceWaitsSocket} = useSocket(
    `${API_SOCKET_URL}/client-driver-wait`,
  );

  useEffect(() => {
    if (lastKnownLocation) {
      socket.emit('message-client', {
        id: user?.uid,
        longitud: lastKnownLocation.longitude,
        latitud: lastKnownLocation.latitude,
      });
    }
  }, [lastKnownLocation]);

  useEffect(() => {
    socket.on('conductores-cercanos', data => {
      console.log(data);
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
      console.log({response});
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

  useEffect(() => {
    console.log({rating});
  }, [rating]);

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

      <Modal
        animationType="slide"
        statusBarTranslucent
        visible
        hardwareAccelerated
        transparent
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width,
          height,
          backgroundColor: 'black',
          opacity: 0.6,
        }}>
        {/* <CViewAlpha style={{height: 400, width: 300}}></CViewAlpha> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 30,
          }}>
          <CViewAlpha
            style={{
              height: 'auto',
              width: '100%',
              borderRadius: 30,
              padding: 30,
            }}>
            <CTextHeader style={{fontWeight: '100', fontSize: 30}}>
              Ayudanos a mejorar nuestros servicios
            </CTextHeader>
            <CText>¿Qué tan felíz estás con tu servicio?</CText>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
                marginVertical: 30,
                transform: [{scale: 1.5}],
              }}>
              {Array.from({length: 5}).map((_, index) => {
                if (index < rating) {
                  return (
                    <Pressable onPress={() => setRating(index + 1)}>
                      <CustomIcon name="star" />
                    </Pressable>
                  );
                }
                return (
                  <Pressable onPress={() => setRating(index + 1)}>
                    <CustomIcon name="star-outline" />
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <CText>Enviar</CText>
            </Pressable>
          </CViewAlpha>
        </View>
      </Modal>

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
