import {useEffect, useState} from 'react';
import {useAuthStore, useLocationStore} from '../../../store';
import {CustomIcon, CustomMapView, FAB} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {Button, Layout, List, ListItem} from '@ui-kitten/components';
import {Marker} from 'react-native-maps';
import {orbeApi} from '../../../config/api';
import {API_PREFIX, API_URL} from '@env';
import axios from 'axios';

export const HomeClientScreen = () => {
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [nearbyDrivers, setNearbyDrivers] = useState<any[]>([]);

  const [origin, setOrigin] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);

  const [searchingDriver, setSearchingDriver] = useState<boolean>(false);

  const {socket, online} = useSocket(
    `ws://orbeapi.devzeros.com:3001/location-client`,
  );
  useEffect(() => {
    console.log({online});
  }, [online, searchingDriver]);

  useEffect(() => {
    const payload = {
      id: user?.uid,
      longitud: lastKnownLocation?.longitude,
      latitud: lastKnownLocation?.latitude,
    };
    socket.emit('message-client', payload);
  }, [lastKnownLocation]);

  useEffect(() => {
    socket.on('conductores-cercanos', data => {
      setNearbyDrivers(data);
      console.log({data});
    });
  }, [lastKnownLocation]);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  useEffect(() => {
    console.log(nearbyDrivers);
  }, [nearbyDrivers]);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  const createRequest = async (id_driver: any) => {
    const request = {
      coordinates: [
        {
          type: 'origen',
          latitud: origin?.latitude,
          longitud: origin?.longitude,
        },
        {
          type: 'destino',
          latitud: destination?.latitude,
          longitud: destination?.longitude,
        },
      ],
      id_client: user?.uid,
      id_driver: id_driver.toString(),
    };

    try {
      const {data: response} = await axios.post(
        `https://orbeapi.devzeros.com/api_v1/request/createRequest`,
        request,
      );
      console.log({request});
      console.log({response});
    } catch (error) {
      console.log(error);
    }
  };

  const AcceptDeniedButtons = (id_driver: string): React.ReactElement => (
    <Layout
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Button
        onPress={() => createRequest(id_driver)}
        appearance="ghost"
        status="success">
        Enviar
      </Button>
    </Layout>
  );

  const handlePress = (event: any) => {
    const {coordinate} = event.nativeEvent;
    if (!origin) {
      setOrigin(coordinate);
    } else {
      setDestination(coordinate);
    }
  };

  return (
    <>
      {nearbyDrivers && searchingDriver && (
        <List
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 999,
            top: 80,
            left: 5,
            right: 5,
          }}
          data={nearbyDrivers}
          renderItem={({item: request, index}) => (
            <ListItem
              style={{
                backgroundColor: 'black',
                borderRadius: 30,
                marginBottom: 5,
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: 'center',
              }}
              title={`Driver: ${request.id}`}
              description={`Status: ${
                request.connected ? 'activo' : 'inactivo'
              }`}
              accessoryLeft={<CustomIcon name="cube-outline" />}
              accessoryRight={() => AcceptDeniedButtons(request.id)}
            />
          )}
        />
      )}

      <CustomMapView
        handlePress={handlePress}
        initialLocation={lastKnownLocation!}>
        {origin && (
          <Marker
            draggable
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
          />
        )}

        {destination && (
          <Marker
            draggable
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
          />
        )}
      </CustomMapView>
      {origin && destination && (
        <>
          <FAB
            onPress={() => {
              setSearchingDriver(!searchingDriver);
            }}
            iconName={
              !searchingDriver ? 'checkmark-circle-outline' : 'slash-outline'
            }
            label={!searchingDriver ? '¿Confirmar viaje?' : 'Cancelar búsqueda'}
            style={{
              zIndex: 999,
              left: 20,
              bottom: 20,
              right: 20,
            }}
          />

          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="AIzaSyALjv44Bcm65rOIEMQSmkyDqQfD_82dAEY"
            strokeColor="hotpink"
            strokeWidth={4}
            /> */}
        </>
      )}
      {searchingDriver && (
        <FAB
          onPress={() => {
            console.log({nearbyDrivers});
          }}
          iconName={'search-outline'}
          label={'Buscando conductores...'}
          style={{
            zIndex: 999,
            left: 20,
            top: 20,
          }}
        />
      )}
    </>
  );
};
