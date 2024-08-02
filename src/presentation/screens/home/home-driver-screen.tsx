import {useEffect} from 'react';
import {
  useAuthStore,
  useDriverStore,
  useLocationStore,
  useProfileDriverStore,
  useUIStore,
} from '../../../store';
import {
  ActiveServicesButton,
  ClientInformationCard,
  ClientInformationCardDriver,
  CustomMapView,
  FAB,
  OpenDrawerMenu,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {Button, Layout, List} from '@ui-kitten/components';
import {FlatList, useColorScheme, View} from 'react-native';

import {RootStackParams} from '../../../interfaces';
import {globalColors} from '../../theme/styles';
import {currencyFormat} from '../../../utils';
import {StackScreenProps} from '@react-navigation/stack';
import {API_SOCKET_URL} from '@env';
import {OrderService, RaceService} from '../../../services';

interface Props extends StackScreenProps<RootStackParams, 'HomeDriverScreen'> {}

export const HomeDriverScreen = ({}: Props) => {
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const {socket, online} = useSocket(`${API_SOCKET_URL}/location`);
  const {addBalance, increaseTrips} = useProfileDriverStore();

  const {
    driverServiceIsActive,
    origin,
    destination,
    analyzingRace,
    currentRaceAccepted,
    currentRequest,
    driverRequests,
    raceData,
    setDriverServiceIsActive,
    setAnalyzingRace,
    setCurrentRaceAccepted,
    setRaceData,
    setDriverRequests,
  } = useDriverStore();

  useEffect(() => {
    socket.on('driver-request', data => {
      data.client_request.forEach((request: any) => {
        if (request.coordinates) {
          setDriverRequests([...driverRequests, request]);
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
    return () => clearInterval(driverLocationInterval);
  }, [driverServiceIsActive]);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <OpenDrawerMenu />
      {driverRequests.length > 0 && driverServiceIsActive && (
        <FlatList
          style={{
            position: 'absolute',
            zIndex: 999,
            top: 80,
            left: 5,
            right: 5,
            borderRadius: 30,
            marginBottom: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          data={driverRequests}
          renderItem={({item: request}) => (
            <ClientInformationCardDriver request={request} />
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
      {/* !analyzingRace  !!!!  */}
      {!analyzingRace &&  driverRequests.length === 0 ? (
        <ActiveServicesButton
          isActive={driverServiceIsActive}
          setIsActive={setDriverServiceIsActive}
          onPress={() => {}}
        />
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
              // @ts-ignore
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
                  const response = await RaceService.acceptOrder(
                    currentRequest.id_client,
                    currentRequest.id_driver,
                    currentRequest.id,
                    raceData!.distance * 850 + 4600,
                  );
                  if (response) {
                    setCurrentRaceAccepted(currentRequest);
                    addBalance(Math.ceil(raceData!.distance * 850 + 4600));
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
    </View>
  );
};
