import {useEffect, useState} from 'react';
import {useAuthStore, useLocationStore, useProfileDriverStore} from '../../../store';
import {ClientInformationCard, CustomMapView, FAB} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {
  Button,
  Icon,
  Layout,
  List,
  ListItem,
  Spinner,
} from '@ui-kitten/components';
import {Modal, Pressable, Text, useColorScheme, View} from 'react-native';
import {orbeApi} from '../../../config/api';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParams, Location} from '../../../interfaces';
import {withDecay} from 'react-native-reanimated';
import {globalColors} from '../../theme/styles';
import {currencyFormat} from '../../../utils';
import {RacesService} from '../../../services';

export const HomeDriverScreen = () => {
  const colorScheme = useColorScheme();

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [driverRequests, setDriveRequests] = useState<any[]>([]);
  const [driverServiceIsActive, setDriverServiceIsActive] =
    useState<boolean>(false);
  const {socket} = useSocket(`ws://orbeapi.devzeros.com:3001/location`);
  const [data, setData] = useState<any>();
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [analyzingRace, setAnalyzingRace] = useState<boolean>(false);
  const [raceData, setRaceData] = useState<{
    distance: number;
    duration: number;
  } | null>(null);
  const [currentRequest, setCurrentRequest] = useState<any>();
  const [currentRaceAccepted, setCurrentRaceAccepted] = useState<any>(null);
  const { addBalance, increaseTrips } = useProfileDriverStore();
  useEffect(() => {
    const fetchData = async (uid: string) => {
      const res = await orbeApi.get(`/worker/getDriversByUid?uid=${uid}`);
      setData(res.data.data.driver);
    };
    if (user?.uid) {
      fetchData(user?.uid);
    }
  }, []);

  useEffect(() => {
    socket.on('driver-request', data => {
      // console.log(data.client_request)
      data.client_request.forEach((request: any) => {
        if (request.coordinates) {
          setDriveRequests([...driverRequests, request]);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  const sendDriverLocation = () => {
    socket.emit('location-driver', {
      id: user?.uid,
      longitud: lastKnownLocation?.longitude,
      latitud: lastKnownLocation?.latitude,
    });
  };

  useEffect(() => {
    if (!driverServiceIsActive) return;
    const driverLocationInterval = setInterval(() => {
      sendDriverLocation();
    }, 2000);

    return () => {
      socket.off();
      clearInterval(driverLocationInterval);
    };
  }, [driverServiceIsActive]);

  function onActiveServicePress() {
    setDriverServiceIsActive(!driverServiceIsActive);
  }

  function analyzeRace() {
    setAnalyzingRace(true);
    setDriverServiceIsActive(false);
  }

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FAB
        iconName="menu-2-outline"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
          backgroundColor: '#3fc1f2',
        }}
        white={true}
      />

      {driverRequests.length > 0 && driverServiceIsActive && (
        <List
          style={{
            position: 'absolute',
            zIndex: 999,
            top: 80,
            left: 5,
            right: 5,
            backgroundColor:
              colorScheme === 'dark'
                ? globalColors.themeDark
                : globalColors.themeLight,
            borderRadius: 30,
            marginBottom: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
            // alignItems: 'center',
          }}
          data={driverRequests}
          renderItem={({item: request}) => (
            <ClientInformationCard
              setCurrentRequest={setCurrentRequest}
              analyzeRace={analyzeRace}
              request={request}
              setOrigin={setOrigin}
              setDestination={setDestination}
            />
          )}
        />
      )}

      <CustomMapView
        showTraffic
        setRaceData={setRaceData}
        destination={analyzingRace ? destination : null}
        origin={analyzingRace ? origin : null}
        initialLocation={lastKnownLocation!}
      />

      {!analyzingRace ? (
        <Button
          style={{
            bottom: 20,
            position: 'absolute',
            left: 40,
            right: 40,
            backgroundColor: globalColors.primary,
            borderRadius: 100,
            borderWidth: 0,
          }}
          onPress={onActiveServicePress}>
          {!driverServiceIsActive ? (
            <Text>Activar servicios</Text>
          ) : (
            <>
              <Spinner status="basic" />
            </>
          )}
        </Button>
      ) : (
        <>
          <Layout
            style={{
              bottom: 140,
              left: 40,
              backgroundColor: 'transparent',
              right: 40,
              position: 'absolute',
              flexDirection: 'row',
              gap: 10,
            }}>
            <FAB
              iconName={'activity-outline'}
              white={true}
              style={{position: 'static', flex: 1}}
              label={`${Math.ceil(raceData?.distance ?? 0)} Km`}
              onPress={() => {}}
            />
            <FAB
              white={true}
              iconName={'clock-outline'}
              style={{position: 'static', flex: 1}}
              label={`${Math.ceil(raceData?.duration ?? 0)} Min`}
              onPress={() => {}}
            />
          </Layout>

          <FAB
            white={true}
            iconName={'trending-up-outline'}
            style={{
              bottom: 80,
              left: 40,
              right: 40,
            }}
            label={`${currencyFormat(
              Math.ceil(raceData?.distance * 850 + 4600),
            )}`}
            onPress={() => {}}
          />
          {!currentRaceAccepted ? (
            <Layout
              style={{
                bottom: 20,
                left: 40,
                backgroundColor: 'transparent',
                right: 40,
                position: 'absolute',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Button
                onPress={() => {
                  setDriverServiceIsActive(true);
                  setAnalyzingRace(false);
                }}
                status="danger"
                style={{flex: 1, borderRadius: 50}}>
                Rechazar
              </Button>
              <Button
                onPress={async () => {
                  const response = await RacesService.acceptRequest(
                    currentRequest.id_client,
                    currentRequest.id_driver,
                    currentRequest.id,
                    raceData!.distance * 850 + 4600,
                  );
                  if (response) {
                    setCurrentRaceAccepted(currentRequest);
                    addBalance(Math.ceil(raceData!.distance * 850 + 4600))
                    increaseTrips();
                  }
                }}
                status="success"
                style={{flex: 1, borderRadius: 50}}>
                Aceptar
              </Button>
            </Layout>
          ) : (
            <Layout
              style={{
                bottom: 20,
                left: 40,
                backgroundColor: 'transparent',
                right: 40,
                position: 'absolute',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Button status="success" style={{flex: 1}}>
                Ya estoy aquí
              </Button>
            </Layout>
          )}
        </>
      )}
    </>
  );
};
