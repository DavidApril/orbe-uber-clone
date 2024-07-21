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
import {
  Modal,
  Pressable,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {RacesService} from '../../../services';
import {API_SOCKET_URL, GOOGLE_API_KEY} from '@env';
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
import {globalColors} from '../../theme/styles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export const HomeClientScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const SearchingDriverBottomSheetRef = useRef<BottomSheet>(null);

  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [nearbyDrivers, setNearbyDrivers] = useState<
    DriverResponseByUidData[] | undefined
  >([]);
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [payWithCard, setPayWithCard] = useState<boolean>(false);

  const {height, width} = useWindowDimensions();

  const [searchingDriver, setSearchingDriver] = useState<boolean>(false);
  const [raceData, setRaceData] = useState<{
    distance: number;
    duration: number;
  } | null>(null);

  const {socket} = useSocket(`${API_SOCKET_URL}/location-client`);
  const {socket: driverSocket, online} = useSocket(
    `ws://orbeapi.devzeros.com:3001/location`,
  );

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
    });
  }, []);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  const snapPoints = useMemo(() => ['20%', '50%', '80%'], []);

  const [currentDriver, setCurrentDriver] = useState<any>(null);

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

    const driver = nearbyDrivers?.filter(
      (driver: any) => driver.id === id_driver,
    );

    if (driver) {
      setCurrentDriver(driver[0]);
    }

    return response;
  };

  useEffect(() => {
    
  },[])

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
          backgroundColor: '#3fc1f2',
        }}
      />

      <CustomMapView
        driverPosition={currentDriver ? currentDriver : null}
        origin={origin}
        destination={destination}
        setRaceData={setRaceData}
        initialLocation={lastKnownLocation!}></CustomMapView>

      {searchingDriver && (
        <Layout
          style={{
            top: 20,
            position: 'absolute',
            left: 100,
            backgroundColor: 'transparent',
            right: 100,
          }}>
          <Button
            style={{
              backgroundColor: 'black',
              borderRadius: 50,
            }}
            onPress={() => setSearchingDriver(false)}
            status="danger"
            appearance="ghost">
            Cancelar búsqueda
          </Button>
        </Layout>
      )}

      <BottomSheet ref={SearchingDriverBottomSheetRef} snapPoints={snapPoints}>
        {!searchingDriver ? (
          <SelectOriginDestination
            setOrigin={setOrigin}
            setDestination={setDestination}
            searchingDriver={searchingDriver}
            setSearchingDriver={setSearchingDriver}
            setPayWithCard={setPayWithCard}
            payWithCard={payWithCard}
          />
        ) : (
          <ScrollView>
            {searchingDriver && nearbyDrivers?.length === 0 && (
              <Layout
                style={{
                  margin: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <Spinner />
                <Text style={{fontWeight: 'bold'}}>
                  Buscando conductores...
                </Text>
              </Layout>
            )}

            {nearbyDrivers?.length === 0 && (
              <Layout
                style={{
                  flex: 1,
                  width: width,
                  height: height * 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>
                  <CustomIcon
                    height={100}
                    width={100}
                    name="alert-circle-outline"
                    fill="#d5d9e0"
                  />
                </Text>
              </Layout>
            )}

            {nearbyDrivers &&
              nearbyDrivers?.map(driver => (
                <>
                  <DriverInformationCard
                    key={driver.uid_firebase}
                    createRequest={() => {
                      createRequest(driver.id);
                    }}
                    raceData={raceData}
                    driver={driver}
                  />
                </>
              ))}
          </ScrollView>
        )}
      </BottomSheet>
    </>
  );
};
