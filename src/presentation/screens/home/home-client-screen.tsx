import {
  Button,
  Layout,
  List,
  ListItem,
  Spinner,
  Text,
} from '@ui-kitten/components';
import {
  CustomIcon,
  CustomMapView,
  FAB,
  SearchPlacesInput,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useAuthStore, useLocationStore} from '../../../store';
import {useEffect, useMemo, useState} from 'react';
import {useSocket} from '../../../hooks';
import {
  Modal,
  Pressable,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {DriverService, RacesService} from '../../../services';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {API_PREFIX, API_SOCKET_URL, API_URL, GOOGLE_API_KEY} from '@env';
import {Location} from '../../../interfaces';
import MapViewDirections from 'react-native-maps-directions';
import {orbeApi} from '../../../config/api';

export const HomeClientScreen = () => {
  const {user} = useAuthStore();
  const {logout} = useAuthStore();
  const {height, width} = useWindowDimensions();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [nearbyDrivers, setNearbyDrivers] = useState<any[]>([]);
  const [nearbyDriversDetails, setNearbyDriversDetails] = useState<any[]>([]);
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [modalLocation, setModalLocation] = useState(false);
  const [modalDestiny, setModalDestiny] = useState(false);
  const [inputLocation, setInputLocation] = useState('');
  const [inputDestiny, setInputDestiny] = useState('');
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async (uid: string) => {
      const res = await orbeApi.get(`/user/getUserByUid?uid_firebase=${uid}`);
      setData(res.data.data.cliente);
      console.log(res.data.data.cliente, 'this is data');
    };
    if (user?.uid) {
      fetchData(user?.uid);
    }
  }, []);

  const [raceData, setRaceData] = useState<{
    distance: number;
    duration: number;
  } | null>(null);

  const [searchingDriver, setSearchingDriver] = useState<boolean>(false);

  const {socket} = useSocket(`${API_SOCKET_URL}/location-client`);

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
      // console.log({data})
    });
  }, []);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  const createRequest = async (id_driver: any) => {
    if (!user || !origin || !destination) return;

    console.log({user, origin, destination});
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
    console.log(response);
  };

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

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
      <FAB
        iconName="arrow-circle-left-outline"
        onPress={() => {
          logout();
        }}
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
        }}
      />
      <FAB
        iconName="person-outline"
        onPress={() => {
          setModal(true);
        }}
        style={{
          position: 'absolute',
          left: 80,
          top: 20,
        }}
      />
      <Modal
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0006',
        }}
        animationType="fade"
        visible={modal}
        transparent={true}
        onRequestClose={() => {
          setModal(false);
        }}>
        <Layout
          style={{
            margin: 'auto',
            backgroundColor: 'black',
            borderRadius: 20,
            padding: 20,
            width: '90%',
            height: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 35,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Tus Datos</Text>
          <Layout style={{gap: 15, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 15, color: '#fff8'}}>
              Nombre: {data?.name}
            </Text>
            <Text style={{fontSize: 15, color: '#fff8'}}>
              Telefono: {data?.phone}
            </Text>
          </Layout>
          <Pressable
            onPress={() => {
              setModal(false);
            }}
            style={{
              padding: 10,
              borderRadius: 25,
              width: '90%',
              backgroundColor: '#20f',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Cerrar
            </Text>
          </Pressable>
        </Layout>
      </Modal>
      <CustomMapView
        origin={origin}
        destination={destination}
        setRaceData={setRaceData}
        initialLocation={lastKnownLocation!}></CustomMapView>

      <Layout style={{position: 'relative', backgroundColor: 'white'}}>
        <Layout
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            zIndex: 9999,
            padding: 20,
            left: 10,
            right: 10,
            bottom: height * 0.3,
          }}>
          {raceData && raceData.duration && (
            <Layout
              style={{
                borderRadius: 35,
                flex: 1,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                paddingHorizontal: 10,
              }}>
              <Text>{Math.ceil(raceData?.duration)} minutos</Text>
            </Layout>
          )}

          {raceData && raceData.distance && (
            <Layout
              style={{
                borderRadius: 35,
                flex: 1,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black',
                paddingHorizontal: 10,
              }}>
              <Text>{Math.ceil(raceData.distance)} km</Text>
            </Layout>
          )}
        </Layout>
      </Layout>
      
      <Layout
        style={{
          width: '100%',
          height: height * 0.3,
          bottom: 0,
          backgroundColor: 'black',
          position: 'absolute',
          zIndex: 9999,
          borderStartEndRadius: 35,
          padding: 20,
          gap: 10,
        }}>
        <Pressable
          style={{
            padding: 20,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#20f',
            paddingLeft: 15,
          }}
          onPress={() => {
            setModalLocation(true);
          }}>
          <Text style={{color: 'white'}}>
            {inputLocation || 'Lugar de recogida'}
          </Text>
        </Pressable>

        <Modal
          transparent={true}
          visible={modalLocation}
          onRequestClose={() => {
            setModalLocation(false);
          }}>
          <Pressable
            onPress={() => {
              setModalLocation(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                width: width * 0.9,
                height: height * 0.5,
                backgroundColor: 'black',
                borderColor: '#20f',
                borderWidth: 1,
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
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
                    width: '100%',
                    backgroundColor: 'transparent',
                    gap: 20,
                  },
                  row: {
                    backgroundColor: 'black',
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                    borderRadius: 50,
                    width: width * 0.75,
                    left: 10,
                    right: 10,
                  },
                  primaryText: {
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
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
                    backgroundColor: 'white',
                  },
                  listView: {
                    backgroundColor: 'transparent',
                    zIndex: 9999,
                    transform: [{translateY: height * 0}],
                  },
                }}
                onPress={(_, details = null) => {
                  if (details?.geometry.location) {
                    setOrigin({
                      latitude: details?.geometry.location.lat,
                      longitude: details?.geometry.location.lng,
                    });
                    setInputLocation(details.formatted_address || ''); // Actualiza el texto del input
                    setModalLocation(false); // Cierra el modal al seleccionar un lugar
                  }
                }}
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'es',
                }}
              />
            </View>
          </Pressable>
        </Modal>

        <Pressable
          style={{
            padding: 20,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#20f',
            paddingLeft: 15,
          }}
          onPress={() => {
            setModalDestiny(true);
          }}>
          <Text style={{color: 'white'}}>
            {inputDestiny || 'Lugar de llegada'}
          </Text>
        </Pressable>

        <Modal
          visible={modalDestiny}
          onRequestClose={() => {
            setModalDestiny(false);
          }}>
          <Pressable
            onPress={() => {
              setModalDestiny(false);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                width: width * 0.9,
                height: height * 0.5,
                backgroundColor: 'black',
                borderColor: '#20f',
                borderWidth: 1,
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <GooglePlacesAutocomplete
                placeholder="Lugar de llegada"
                textInputProps={{placeholderTextColor: 'white'}}
                fetchDetails={true}
                enableHighAccuracyLocation
                debounce={300}
                styles={{
                  container: {
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent',
                    gap: 20,
                  },
                  row: {
                    backgroundColor: 'black',
                    padding: 13,
                    height: 44,
                    flexDirection: 'row',
                    borderRadius: 50,
                    width: width * 0.75,
                    left: 10,
                    right: 10,
                  },
                  primaryText: {
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
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
                    backgroundColor: 'white',
                  },
                  listView: {
                    backgroundColor: 'transparent',
                    zIndex: 9999,
                    transform: [{translateY: height * 0}],
                  },
                }}
                onPress={(_, details = null) => {
                  if (details?.geometry.location) {
                    setDestination({
                      latitude: details?.geometry.location.lat,
                      longitude: details?.geometry.location.lng,
                    });
                    setInputDestiny(details.formatted_address || ''); // Actualiza el texto del input
                    setModalDestiny(false); // Cierra el modal al seleccionar un lugar
                  }
                }}
                query={{
                  key: GOOGLE_API_KEY,
                  language: 'es',
                }}
              />
              <View>
                <Pressable
                  onPress={() => {
                    setModalDestiny(false);
                  }}>
                  <Text>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>

        <Button appearance="ghost">Confirmar</Button>
      </Layout>

      {searchingDriver && (
        <Layout
          style={{
            marginTop: 10,
            marginLeft: 10,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            backgroundColor: 'transparent',
          }}>
          <Spinner />
        </Layout>
      )}
    </>
  );
};
