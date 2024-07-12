import {
  Button,
  Input,
  Layout,
  List,
  Spinner,
  Text,
} from '@ui-kitten/components';
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
import {Location, RootStackParams} from '../../../interfaces';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import {globalColors} from '../../theme/styles';

export const HomeClientScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const SearchingDriverBottomSheetRef = useRef<BottomSheet>(null);

  const {user} = useAuthStore();
  const {height} = useWindowDimensions();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [nearbyDrivers, setNearbyDrivers] = useState<any[]>([]);
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [searchingDriver, setSearchingDriver] = useState<boolean>(false);
  const [raceData, setRaceData] = useState<{
    distance: number;
    duration: number;
  } | null>(null);

  const {socket} = useSocket(`${API_SOCKET_URL}/location-client`);

  useEffect(() => {
    const sendClientLocation = setInterval(() => {
      const payload = {
        id: user?.uid,
        longitud: lastKnownLocation?.longitude,
        latitud: lastKnownLocation?.latitude,
      };
      socket.emit('message-client', payload);
    }, 1000);

    return () => clearInterval(sendClientLocation);
  }, [lastKnownLocation]);

  useEffect(() => {
    socket.on('conductores-cercanos', data => {
      setNearbyDrivers(data);
      // console.log({data})
    });
  }, []);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  const snapPoints = useMemo(() => ['50%', '80%'], []);

  const createRequest = async (id_driver: any) => {
    if (!user || !origin || !destination) return;
    const response = await RacesService.createRequest({
      id_client: user.uid,
      id_driver: id_driver,
      origin: {
        latitude: origin?.latitude,
        longitude: origin?.longitude,
      },
      destination: {
        latitude: destination?.latitude,
        longitude: destination?.longitude,
      },
    });
  };

  useEffect(() => {
    if (searchingDriver) {
      SearchingDriverBottomSheetRef.current?.collapse();
    }
  }, [searchingDriver]);

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
        }}
      />

      {nearbyDrivers && searchingDriver && (
        <List
          style={{
            position: 'absolute',
            zIndex: 99999,
            marginTop: height * 0.1,
            left: 20,
            right: 20,
            borderRadius: 35,
            overflow: 'hidden',
            // height: height * 0.5,
            backgroundColor: 'white',
          }}
          data={nearbyDrivers}
          renderItem={({item}) => {
            return (
              <Layout
                style={{
                  backgroundColor: 'black',
                  borderRadius: 35,
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                }}>
                <Text>{item.id}</Text>
              </Layout>
            );
          }}
        />
      )}

      <CustomMapView
        origin={origin}
        destination={destination}
        setRaceData={setRaceData}
        initialLocation={lastKnownLocation!}></CustomMapView>

      <Layout style={{position: 'relative', backgroundColor: 'white'}}>
        <Layout
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            zIndex: 9999,
            padding: 20,
            left: 10,
            right: 10,
            bottom: height * 0.3,
          }}>
          {raceData && raceData.duration && (
            <Layout
              style={{
                borderRadius: 35,
                flex: 1,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                paddingHorizontal: 10,
              }}>
              <Text>{Math.ceil(raceData?.duration)} minutos</Text>
            </Layout>
          )}

          {raceData && raceData.distance && (
            <Layout
              style={{
                borderRadius: 35,
                flex: 1,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                paddingHorizontal: 10,
              }}>
              <Text>{Math.ceil(raceData.distance)} km</Text>
            </Layout>
          )}
        </Layout>
      </Layout>

      <BottomSheet ref={SearchingDriverBottomSheetRef} snapPoints={snapPoints}>
        {!searchingDriver ? (
          <SelectOriginDestination
            setOrigin={setOrigin}
            setDestination={setDestination}
            searchingDriver={searchingDriver}
            setSearchingDriver={setSearchingDriver}
          />
        ) : (
          <DriverInformationCard />
        )}
      </BottomSheet>

      {searchingDriver && (
        <Layout
          style={{
            marginTop: 40,
            left: 0,
            right: 0,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: 'transparent',
          }}>
          <Spinner />
        </Layout>
      )}
    </>
  );
};
