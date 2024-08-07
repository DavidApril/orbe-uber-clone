import {useEffect} from 'react';
import {useDeliveryStore, useLocationStore} from '../../../store';
import {
  AcceptCancelButtons,
  ActiveServicesButton,
  ClientInformationCard,
  CText,
  CTextHeader,
  CustomIcon,
  CustomMapView,
  CViewAlpha,
  OpenDrawerMenu,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {List} from '@ui-kitten/components';

import {RootStackParams} from '../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {Image, Pressable, View} from 'react-native';
import {globalDimensions} from '../../theme/styles';
import {CameraAdapter} from '../../../config/adapters';
import {StorageService} from '../../../services';
import {API_SOCKET_URL} from '@env';

interface Props
  extends StackScreenProps<RootStackParams, 'HomeDeliveryScreen'> {}

export const HomeDeliveryScreen = ({navigation}: Props) => {
  const {lastKnownLocation} = useLocationStore();
  const {socket} = useSocket(`${API_SOCKET_URL}/request-restaurant`);

  const {
    deliveryServiceIsActive,
    setDeliveryServiceIsActive,
    origin,
    destination,
    analyzingRace,
    currentRaceAccepted,
    deliveryRequests,
    setRaceData,
    setDeliveryRequests,
    setDeliveryArrived,
    deliveryArrived,
    setProductImage,
    productImage,
  } = useDeliveryStore();

  useEffect(() => {}, [productImage]);

  const sendDeliveryLocation = () => {
    // socket.emit('location-driver', {
    //   id: user?.uid,
    //   longitud: lastKnownLocation?.longitude,
    //   latitud: lastKnownLocation?.latitude,
    // });
  };

  useEffect(() => {
    if (!deliveryServiceIsActive) return;
    const driverLocationInterval = setInterval(() => {
      sendDeliveryLocation();
    }, 2000);
    return () => clearInterval(driverLocationInterval);
  }, [deliveryServiceIsActive]);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={{flex: 1}}>
      <OpenDrawerMenu />
      {!analyzingRace && (
        <List
          style={{
            position: 'absolute',
            zIndex: 999,
            top: 80,
            left: 5,
            right: 5,
            backgroundColor: 'transparent',
            borderRadius: 30,
            marginBottom: 5,
            paddingHorizontal: 20,
            paddingVertical: 10,
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

      {deliveryRequests.length === 0 && !analyzingRace && (
        <ActiveServicesButton
          isActive={deliveryServiceIsActive}
          setIsActive={setDeliveryServiceIsActive}
          onPress={() => {
            setDeliveryRequests([0]);
          }}
        />
      )}

      {analyzingRace && !currentRaceAccepted && <AcceptCancelButtons />}

      {currentRaceAccepted && (
        <Pressable
          disabled={deliveryArrived}
          onPress={() => setDeliveryArrived(true)}
          style={{
            bottom: 120,
            position: 'absolute',
            left: 30,
            right: 30,
            height: !deliveryArrived ? 140 : 700,
          }}>
          <CViewAlpha
            style={{
              flex: 1,
              borderRadius: globalDimensions.cardBorderRadius,
              justifyContent: 'center',
              opacity: !deliveryArrived ? 0.77 : 0.8,
              borderWidth: 1,
              alignItems: 'center',
            }}>
            {deliveryArrived && (
              <View>
                <CTextHeader
                  style={{fontSize: 70, fontWeight: '100', letterSpacing: 10}}>
                  XH3XYZ
                </CTextHeader>
                <CText>Entrega este código al restaurante...</CText>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <Pressable
                    onPress={async () => {
                      const image_url = await CameraAdapter.takePicture('back');
                      if (image_url) {
                        setProductImage(
                          StorageService.getPhotoFromCache(image_url[0]),
                        );
                      }
                    }}
                    style={{
                      height: 200,
                      width: 200,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'black',
                      opacity: 0.5,
                    }}>
                    <View
                      style={{
                        transform: [{scale: 2}],
                      }}>
                      <CustomIcon name="image-outline" />
                    </View>
                  </Pressable>
                </View>
              </View>
            )}

            {/* {productImage && (
              <View style={{alignItems: 'center', marginVertical: 10}}>
                <Pressable
                  onPress={async () => {
                    const image_url = await CameraAdapter.takePicture('back');
                    if (image_url) {
                      setProductImage(
                        StorageService.getPhotoFromCache(image_url[0]),
                      );
                    }
                  }}
                  style={{
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.5,
                  }}>
                  <Image
                    style={{height: 190, width: 190, borderRadius: 100}}
                    source={{
                      uri: StorageService.getPhotoFromCache(productImage),
                    }}
                  />
                </Pressable>
              </View>
            )} */}

            {!deliveryArrived && (
              <Pressable>
                <CText style={{fontWeight: 'bold', fontSize: 18}}>
                  Estoy aquí
                </CText>
              </Pressable>
            )}
          </CViewAlpha>
        </Pressable>
      )}
    </View>
  );
};
