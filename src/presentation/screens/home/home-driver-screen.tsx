import {useEffect, useState} from 'react';
import {
  useAuthStore,
  useDriverStore,
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
import {
  Pressable,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {orbeApi} from '../../../config/api';
import {Location, RootStackParams} from '../../../interfaces';
import {globalColors, globalDimensions} from '../../theme/styles';
import {currencyFormat} from '../../../utils';
import {RacesService} from '../../../services';
import {StackScreenProps} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';

interface Props
  extends StackScreenProps<RootStackParams, 'ProductsCartScreen'> {}

export const HomeDriverScreen = ({navigation}: Props) => {
  const colorScheme = useColorScheme();
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const {socket} = useSocket(`ws://orbeapi.devzeros.com:3001/location`);
  const {addBalance, increaseTrips} = useProfileDriverStore();
  const {isDarkMode} = useUIStore();

  const {
    driverServiceIsActive,
    setDriverServiceIsActive,
    origin,
    destination,
    analyzingRace,
    setAnalyzingRace,
    currentRaceAccepted,
    currentRequest,
    driverRequests,
    raceData,
    setCurrentRaceAccepted,
    setRaceData,
    setDriverRequests,
  } = useDriverStore();

  useEffect(() => {
    socket.on('driver-request', data => {
      // console.log(data.client_request)
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

    return () => {
      socket.off();
      clearInterval(driverLocationInterval);
    };
  }, [driverServiceIsActive]);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <Pressable
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{
          height: 45,
          zIndex: 999,
          width: 45,
          borderRadius: 500,
          backgroundColor: 'white',
          justifyContent: 'center',
          position: 'absolute',
          alignItems: 'center',
          top: 30,
          left: 30,
        }}>
        <CustomIcon fill="black" name="menu-2" />
      </Pressable>
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
            bottom: 10,
            position: 'absolute',
            height: 95,
            justifyContent: 'center',
            alignItems: 'center',
            left: '70%',
            right: 10,
            backgroundColor: driverServiceIsActive
              ? globalColors.stateColors.success
              : globalColors.stateColors.error,
            borderRadius: globalDimensions.borderRadiusButtom,
            borderWidth: 0,
          }}
          onPress={() => setDriverServiceIsActive(!driverServiceIsActive)}>
          {!driverServiceIsActive ? (
            <Pressable
              onPress={() => setDriverServiceIsActive(!driverServiceIsActive)}
              style={{
                position: 'absolute',
                right: 25,
                transform: [{scale: 1.3}],
              }}>
              <CustomIcon white name="power" />
            </Pressable>
          ) : (
            <View
              style={{
                position: 'absolute',
                right: 25,
                transform: [{scale: 1.3}],
              }}>
              <Spinner status="basic" />
            </View>
          )}
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
