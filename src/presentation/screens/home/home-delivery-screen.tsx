import {useEffect, useState} from 'react';
import {
  useAuthStore,
  useLocationStore,
  useUIStore,
  useWorkerStore,
} from '../../../store';
import {
  AcceptCancelButtons,
  ActiveServicesButton,
  CButton,
  ClientInformationCard,
  CText,
  CTextHeader,
  CustomIcon,
  CustomMapView,
  CView,
  CViewAlpha,
  FAB,
  OpenDrawerMenu,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {TextInput, View} from 'react-native';
import {
  globalDimensions,
  globalStyles,
  neutralColors,
  stateColors,
} from '../../theme/styles';
import {API_SOCKET_URL} from '@env';
import {FlatList} from 'react-native';
import {currencyFormat} from '../../../utils';

export const HomeDeliveryScreen = () => {
  const {lastKnownLocation, getLocation} = useLocationStore();
  const {socket} = useSocket(`${API_SOCKET_URL}/location-delivery`);
  const {userByUid} = useAuthStore();
  const {isDarkMode} = useUIStore();
  const [clientCode, setClientCode] = useState<string>('');

  const {
    workerServiceIsActive,
    setWorkerServiceIsActive,
    origin,
    destination,
    analyzingRace,
    currentRaceAccepted,
    workerRequests,
    setRaceData,
    setWorkerArrived,
    workerArrived,
    raceData,
    currentRequest,
    productImage,
  } = useWorkerStore();

  useEffect(() => {}, [productImage]);

  const sendDeliveryLocation = () => {
    console.log({
      id: userByUid!.uid_firebase,
      longitud: lastKnownLocation?.longitude,
      latitud: lastKnownLocation?.latitude,
    });
    socket.emit('delivery-connect', {
      id: userByUid!.uid_firebase,
      longitud: lastKnownLocation?.longitude,
      latitud: lastKnownLocation?.latitude,
    });
  };

  useEffect(() => {
    if (!workerServiceIsActive) return;
    const workerLocationInterval = setInterval(() => {
      sendDeliveryLocation();
    }, 2000);
    return () => clearInterval(workerLocationInterval);
  }, [workerServiceIsActive]);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <OpenDrawerMenu />
      {workerRequests.length > 0 && workerServiceIsActive && !analyzingRace && (
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
          data={workerRequests}
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

      {!analyzingRace && workerRequests.length === 0 ? (
        <ActiveServicesButton
          isActive={workerServiceIsActive}
          setIsActive={setWorkerServiceIsActive}
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
          {currentRaceAccepted && !workerArrived && (
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
                onPress={() => setWorkerArrived(true)}
              />
            </View>
          )}
          {workerArrived && (
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
