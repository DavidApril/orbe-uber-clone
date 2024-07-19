import {Button, Layout, Spinner, Text} from '@ui-kitten/components';
import {
  CustomMapView,
  DriverInformationCard,
  FAB,
  SelectOriginDestination,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useAuthStore, useLocationStore} from '../../../store';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useSocket} from '../../../hooks';
import {
  Modal,
  Pressable,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import {RacesService} from '../../../services';
import {API_SOCKET_URL, GOOGLE_API_KEY} from '@env';
import {
  DriverResponseByUidData,
  Location,
  RootStackParams,
} from '../../../interfaces';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import {globalColors} from '../../theme/styles';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const HomeClientScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const SearchingDriverBottomSheetRef = useRef<BottomSheet>(null);

  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [nearbyDrivers, setNearbyDrivers] = useState<
    DriverResponseByUidData[] | undefined
  >([]);
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [modalLocation, setModalLocation] = useState(false);
  const [modalDestiny, setModalDestiny] = useState(false);
  const [inputLocation, setInputLocation] = useState('');
  const [inputDestiny, setInputDestiny] = useState('');

  const {height, width} = useWindowDimensions();

  const colorScheme = useColorScheme();

  const [searchingDriver, setSearchingDriver] = useState<boolean>(false);
  const [raceData, setRaceData] = useState<{
    distance: number;
    duration: number;
  } | null>(null);

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
    });
  }, []);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  const snapPoints = useMemo(() => ['20%', '50%', '80%'], []);

  const [currentDriver, setCurrentDriver] = useState<any>(null);

  const createRequest = async (id_driver: any) => {
    if (!user || !origin || !destination) return;
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

    const driver = nearbyDrivers?.filter(
      (driver: any) => driver.id === id_driver,
    );

    if (driver) {
      setCurrentDriver(driver[0]);
    }

    return response;
  };

  useEffect(() => {
    if (searchingDriver) {
      SearchingDriverBottomSheetRef.current?.collapse();
    }
  }, [searchingDriver]);

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FAB
        white
        iconName="menu-2-outline"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
          backgroundColor: '#3fc1f2',
        }}
      />

      <CustomMapView
        driverPosition={currentDriver ? currentDriver : null}
        origin={origin}
        destination={destination}
        setRaceData={setRaceData}
        initialLocation={lastKnownLocation!}></CustomMapView>

      <Layout
        style={{
          position: 'relative',
          backgroundColor:
            colorScheme === 'dark'
              ? globalColors.themeDark
              : globalColors.themeLight,
        }}>
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

      <BottomSheet
        style={{
          backgroundColor:
            colorScheme === 'dark'
              ? globalColors.themeDark
              : globalColors.themeLight,
          borderColor:
            colorScheme === 'dark'
              ? globalColors.themeDark
              : globalColors.themeLight,
        }}
        snapPoints={snapPoints}>
        <Layout
          style={{
            bottom: 0,
            zIndex: 9999,
            padding: 20,
            gap: 10,
            paddingTop: 40,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 30}}>Selecciona</Text>
          <Text> dos puntos para buscar un conductor</Text>

          <Layout style={{height: 20}}></Layout>

          <Pressable
            style={{
              padding: 15,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: '#3fc1f2',
            }}
            onPress={() => {
              setModalLocation(true);
            }}>
            <Text
              style={{
                color:
                  colorScheme === 'dark'
                    ? globalColors.white
                    : globalColors.black,
              }}>
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
              <Layout
                style={{
                  width: width * 0.9,
                  height: height * 0.6,
                  // backgroundColor: 'black',
                  // borderColor: '#20f',
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
              </Layout>
            </Pressable>
          </Modal>

          <Pressable
            style={{
              padding: 15,
              borderRadius: 50,
              borderColor: '#3fc1f2',
              borderWidth: 1,
            }}
            onPress={() => {
              setModalDestiny(true);
            }}>
            <Text
              style={{
                color:
                  colorScheme === 'dark'
                    ? globalColors.white
                    : globalColors.black,
              }}>
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
              <Layout
                style={{
                  width: width * 0.9,
                  height: height * 0.5,
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
                      color: 'white',
                      paddingHorizontal: 20,
                    },
                    poweredContainer: {
                      display: 'none',
                    },
                    listView: {
                      backgroundColor: 'transparent',
                      zIndex: 9999,
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
                <Layout>
                  <Pressable
                    onPress={() => {
                      setModalDestiny(false);
                    }}>
                    <Text>Cerrar</Text>
                  </Pressable>
                </Layout>
              </Layout>
            </Pressable>
          </Modal>

          <Layout style={{height: 20}}></Layout>

          <Pressable
            onPress={() => {
              setSearchingDriver(!searchingDriver);
            }}
            style={{padding: 20}}>
            <Text style={{color: '#3fc1f2', textAlign: 'center'}}>
              {!searchingDriver ? 'Confirmar' : 'Cancelar'}
            </Text>
          </Pressable>
        </Layout>
      </BottomSheet>

      {searchingDriver && (
        <Layout
          style={{
            top: 20,
            position: 'absolute',
            left: 100,
            backgroundColor: 'transparent',
            right: 100,
          }}>
          <Button
            style={{
              backgroundColor: 'black',
              borderRadius: 50,
            }}
            onPress={() => setSearchingDriver(false)}
            status="danger"
            appearance="ghost">
            Cancelar búsqueda
          </Button>
        </Layout>
      )}

      <BottomSheet ref={SearchingDriverBottomSheetRef} snapPoints={snapPoints}>
        {!searchingDriver ? (
          <SelectOriginDestination
            setOrigin={setOrigin}
            setDestination={setDestination}
            searchingDriver={searchingDriver}
            setSearchingDriver={setSearchingDriver}
          />
        ) : (
          <ScrollView>
            {searchingDriver && nearbyDrivers?.length === 0 && (
              <Layout
                style={{
                  margin: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                }}>
                <Spinner />
                <Text style={{fontWeight: 'bold'}}>
                  Buscando conductores...
                </Text>
              </Layout>
            )}
            {nearbyDrivers &&
              nearbyDrivers?.map(driver => (
                <>
                  <DriverInformationCard
                    key={driver.uid_firebase}
                    createRequest={() => createRequest(driver.id)}
                    raceData={raceData}
                    driver={driver}
                  />
                </>
              ))}
          </ScrollView>
        )}
      </BottomSheet>
    </>
  );
};
