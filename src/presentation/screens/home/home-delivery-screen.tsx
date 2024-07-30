import {useEffect} from 'react';
import {
  useAuthStore,
  useDeliveryStore,
  useLocationStore,
  useProfileDriverStore,
  useUIStore,
} from '../../../store';
import {
  ClientInformationCard,
  CustomIcon,
  CustomMapView,
  FAB,
  OpenDrawerMenu,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {Button, Layout, List, Spinner} from '@ui-kitten/components';
import {Pressable, useColorScheme, View} from 'react-native';

import {RootStackParams} from '../../../interfaces';
import {globalColors, stateColors} from '../../theme/styles';
import {currencyFormat} from '../../../utils';
import {RacesService} from '../../../services';
import {StackScreenProps} from '@react-navigation/stack';
import {API_SOCKET_URL} from '@env';

interface Props extends StackScreenProps<RootStackParams, 'HomeDriverScreen'> {}

export const HomeDeliveryScreen = ({navigation}: Props) => {
  const colorScheme = useColorScheme();
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const {socket, online} = useSocket(`${API_SOCKET_URL}/location`);
  const {addBalance, increaseTrips} = useProfileDriverStore();

  const {isDarkMode} = useUIStore();

  const {
    deliveryServiceIsActive,
    setDeliveryServiceIsActive,
    origin,
    destination,
    analyzingRace,
    setAnalyzingRace,
    currentRaceAccepted,
    currentRequest,
    deliveryRequests,
    raceData,
    setCurrentRaceAccepted,
    setRaceData,
    setDeliveryRequests,
  } = useDeliveryStore();

  useEffect(() => {
    socket.on('driver-request', data => {
      // console.log(data.client_request)
      data.client_request.forEach((request: any) => {
        if (request.coordinates) {
          setDeliveryRequests([...deliveryRequests, request]);
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
    console.log('enviando');
    socket.emit('location-driver', {
      id: user?.uid,
      longitud: lastKnownLocation?.longitude,
      latitud: lastKnownLocation?.latitude,
    });
  };

  useEffect(() => {
    if (!deliveryServiceIsActive) return;
    const driverLocationInterval = setInterval(() => {
      sendDriverLocation();
    }, 2000);
    return () => clearInterval(driverLocationInterval);
  }, [deliveryServiceIsActive]);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <OpenDrawerMenu />
      {deliveryRequests.length > 0 && deliveryServiceIsActive && (
        <List
          style={{
            position: 'absolute',
            zIndex: 999,
            top: 80,
            left: 5,
            right: 5,
            backgroundColor:
              colorScheme === 'dark'
                ? globalColors.primaryColors.primaryDark
                : globalColors.primaryColors.primaryLight,
            borderRadius: 30,
            marginBottom: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
            // alignItems: 'center',
          }}
          data={deliveryRequests}
          renderItem={({item: request}) => (
            <ClientInformationCard request={request} />
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
        <Pressable
          style={{
            position: 'absolute',
            zIndex: 999999,
            top: 120,
            left: 30,
            borderRadius: 20,
            right: 30,
            bottom: 120,
            opacity: !deliveryServiceIsActive ? 0.8 : 0.4,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setDeliveryServiceIsActive(!deliveryServiceIsActive)}>
          <View
            style={{transform: [{scale: !deliveryServiceIsActive ? 4 : 2}]}}>
            {!deliveryServiceIsActive ? (
              <CustomIcon fill={stateColors.error} name="power" />
            ) : (
              <Spinner />
            )}
          </View>
        </Pressable>
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
                  setDeliveryServiceIsActive(true);
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
