import {useEffect, useState} from 'react';
import {
  useAuthStore,
  useDriverStore,
  useLocationStore,
  useUIStore,
} from '../../../store';
import {
  AcceptCancelButtons,
  ActiveServicesButton,
  CButton,
  CInput,
  ClientInformationCard,
  CText,
  CTextHeader,
  CustomIcon,
  CustomMapView,
  CView,
  FAB,
  OpenDrawerMenu,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {FlatList, Pressable, TextInput, View} from 'react-native';

import {RootStackParams} from '../../../interfaces';
import {currencyFormat} from '../../../utils';
import {StackScreenProps} from '@react-navigation/stack';
import {
  globalDimensions,
  globalStyles,
  neutralColors,
  stateColors,
} from '../../theme/styles';
import {API_SOCKET_URL} from '@env';

interface Props extends StackScreenProps<RootStackParams, 'HomeDriverScreen'> {}

export const HomeDriverScreen = ({}: Props) => {
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const {socket, online} = useSocket(`${API_SOCKET_URL}/location`);
  const {isDarkMode} = useUIStore();
  const [driverArrived, setDriverArrived] = useState<boolean>(false);
  const [clientCode, setClientCode] = useState<string>('');
  const {
    driverServiceIsActive,
    origin,
    currentRequest,
    destination,
    analyzingRace,
    currentRaceAccepted,
    driverRequests,
    raceData,
    setDriverServiceIsActive,
    setRaceData,
    setDriverRequests,
    setOrigin,
  } = useDriverStore();

  useEffect(() => {
    socket.on('driver-request', data => {
      setDriverRequests(data.client_request);
    });
  }, []);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  console.log({online})

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

  useEffect(() => {
    if (currentRaceAccepted) {
      setOrigin(lastKnownLocation);
    }
  }, [currentRaceAccepted, lastKnownLocation]);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <OpenDrawerMenu />
      {driverRequests.length > 0 && driverServiceIsActive && !analyzingRace && (
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

      {!analyzingRace && driverRequests.length === 0 ? (
        <ActiveServicesButton
          isActive={driverServiceIsActive}
          setIsActive={setDriverServiceIsActive}
          onPress={() => {}}
        />
      ) : (
        <>
          {raceData && (
            <View
              style={{
                top: 100,
                left: 40,
                right: 40,
                position: 'absolute',
                flexDirection: 'row',
                gap: 10,
              }}>
              <CView
                style={{
                  flex: 1,
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                  borderRadius: 10,
                }}>
                <CustomIcon name="activity" />
                <CTextHeader>{raceData.distance} km</CTextHeader>
              </CView>
              <CView
                style={{
                  flex: 1,
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                  borderRadius: 10,
                }}>
                <CustomIcon name="clock" />
                <CTextHeader>{raceData.duration.toFixed(2)} min</CTextHeader>
              </CView>
            </View>
          )}

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
          {!currentRaceAccepted && currentRequest && <AcceptCancelButtons />}
          {currentRaceAccepted && !driverArrived && (
            <View
              style={{
                position: 'absolute',
                bottom: 120,
                height: 120,
                left: 30,
                right: 30,
                flex: 1,
              }}>
              <CButton
                label="Ya estoy aquí"
                onPress={() => setDriverArrived(true)}
              />
            </View>
          )}
          {driverArrived && (
            <View
              style={{
                position: 'absolute',
                bottom: 120,
                height: 220,
                left: 30,
                right: 30,
                flex: 1,
                justifyContent: 'center',
                opacity: 0.9,
                alignItems: 'center',
                overflow: 'hidden',
                borderRadius: globalDimensions.cardBorderRadius,
                backgroundColor: isDarkMode
                  ? neutralColors.backgroundDarkAlpha
                  : neutralColors.backgroundAlpha,
              }}>
              <View style={{transform: [{scale: 3}], marginBottom: 30}}>
                <CustomIcon
                  fill={
                    clientCode.length < 4
                      ? stateColors.error
                      : stateColors.success
                  }
                  name="alert-circle-outline"
                />
              </View>
              <CText>Ingrese el código del cliente</CText>
              <TextInput
                value={clientCode}
                onChangeText={value => setClientCode(value.toUpperCase())}
                style={[
                  globalStyles.primaryInput,
                  {
                    backgroundColor: isDarkMode
                      ? neutralColors.textInputBackgroundDark
                      : neutralColors.textInputBackgroundDark,
                    borderRadius: globalDimensions.cardBorderRadius,
                    width: '80%',
                    fontSize: 30,
                    letterSpacing: 8,
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginVertical: 10,
                  },
                ]}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};
