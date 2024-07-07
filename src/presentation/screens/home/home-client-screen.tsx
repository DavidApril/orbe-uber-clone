import {Button, Layout, List, ListItem} from '@ui-kitten/components';
import {
  CustomIcon,
  CustomMapView,
  FAB,
  SearchPlacesInput,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useAuthStore, useLocationStore} from '../../../store';
import {useEffect, useState} from 'react';
import {useSocket} from '../../../hooks';
import {useWindowDimensions} from 'react-native';
import {RacesService} from '../../../services';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_API_KEY} from '@env';
import {Location} from '../../../interfaces';
import MapViewDirections from 'react-native-maps-directions';

export const HomeClientScreen = () => {
  const {user} = useAuthStore();
  const {height, width} = useWindowDimensions();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [nearbyDrivers, setNearbyDrivers] = useState<any[]>([]);

  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  
  const [raceData, setRaceData] = useState<{
    distance: number;
    duration: number;
  } | null>(null);

  const [searchingDriver, setSearchingDriver] = useState<boolean>(false);

  const {socket} = useSocket(`ws://orbeapi.devzeros.com:3001/location-client`);

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
    });
  }, [lastKnownLocation]);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  const createRequest = async (id_driver: any) => {
    if (!user || !origin || !destination) return;

    await RacesService.createRequest({
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

  return (
    <>
      <CustomMapView
        origin={origin}
        destination={destination}
        setRaceData={setRaceData}
        initialLocation={lastKnownLocation!}></CustomMapView>
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

      {/* {origin && destination && (
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

          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey="AIzaSyALjv44Bcm65rOIEMQSmkyDqQfD_82dAEY"
            strokeColor="hotpink"
            strokeWidth={4}
            />
            </>
      )} */}

      <Layout
        style={{
          // width: width * 0.9,
          height: height * 0.3,
          left: 10,
          right: 10,
          bottom: 10,
          backgroundColor: 'black',
          position: 'absolute',
          zIndex: 9999,
          borderRadius: 35,
          padding: 20,
        }}>
        <GooglePlacesAutocomplete
          placeholder="Lugar de recogida"
          textInputProps={{placeholderTextColor: 'white'}}
          fetchDetails={true}
          enableHighAccuracyLocation
          debounce={300}
          styles={{
            container: {
              flex: 1,
              backgroundColor: 'transparent',
            },
            row: {
              backgroundColor: 'black',
              padding: 13,
              height: 44,
              flexDirection: 'row',
              borderRadius: 50,
              width: width * 0.8,
              left: 10,
              right: 10,
            },
            separator: {
              height: 5,
              backgroundColor: 'transparent',
            },
            textInput: {
              borderRadius: 50,
              backgroundColor: 'black',
              borderColor: 'blue',
              borderWidth: 1,
              color: 'white',
              paddingHorizontal: 20,
            },
            poweredContainer: {
              display: 'none',
            },
            listView: {
              backgroundColor: 'transparent',
              position: 'absolute',
              zIndex: 9999,
              transform: [{translateY: height * -0.3}],
            },
          }}
          onPress={(_, details = null) => {
            if (details?.geometry.location) {
              setOrigin({
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
              });
            }
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'es',
          }}
        />

        <GooglePlacesAutocomplete
          placeholder="Lugar de llegada"
          textInputProps={{placeholderTextColor: 'white'}}
          fetchDetails={true}
          enableHighAccuracyLocation
          debounce={300}
          styles={{
            container: {
              flex: 1,
              backgroundColor: 'transparent',
            },
            row: {
              backgroundColor: 'black',
              padding: 13,
              height: 44,
              flexDirection: 'row',
              borderRadius: 50,
              width: width * 0.8,
              left: 10,
              right: 10,
            },
            separator: {
              height: 5,
              backgroundColor: 'transparent',
            },
            textInput: {
              borderRadius: 50,
              backgroundColor: 'black',
              borderColor: 'blue',
              borderWidth: 1,
              color: 'white',
              paddingHorizontal: 20,
            },
            poweredContainer: {
              display: 'none',
            },
            listView: {
              backgroundColor: 'transparent',
              position: 'absolute',
              zIndex: 9999,
              transform: [{translateY: height * -0.3}],
            },
          }}
          onPress={(_, details = null) => {
            if (details?.geometry.location) {
              setDestination({
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
              });
            }
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: 'es',
          }}
        />

        <Button appearance="ghost">Confirmar</Button>
      </Layout>

      {searchingDriver && (
        <FAB
          onPress={() => {}}
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
