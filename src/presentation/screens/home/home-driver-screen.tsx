import {useEffect, useState} from 'react';
import {useAuthStore, useLocationStore} from '../../../store';
import {ClientInformationCard, CustomMapView, FAB} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {Button, Layout, List, ListItem} from '@ui-kitten/components';
import {Modal, Pressable, Text, View} from 'react-native';
import {orbeApi} from '../../../config/api';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {Location, RootStackParams} from '../../../interfaces';
import {currencyFormat} from '../../../utils';
import {RacesService} from '../../../services';

export const HomeDriverScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [driverRequests, setDriveRequests] = useState<any[]>([]);
  const [driverServiceIsActive, setDriverServiceIsActive] =
    useState<boolean>(false);
  const {socket} = useSocket(`ws://orbeapi.devzeros.com:3001/location`);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<any>();
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [analyzingRace, setAnalyzingRace] = useState<boolean>(false);
  const [raceData, setRaceData] = useState<{
    distance: number;
    duration: number;
  } | null>(null);
  const [currentRequest, setCurrentRequest] = useState<any>();

  useEffect(() => {
    console.log({raceData, currentRequest});
  }, [raceData, currentRequest]);

  useEffect(() => {
    const fetchData = async (uid: string) => {
      const res = await orbeApi.get(`/worker/getDriversByUid?uid=${uid}`);
      setData(res.data.data.driver);
    };
    if (user?.uid) {
      fetchData(user?.uid);
    }
  }, []);

  useEffect(() => {
    socket.on('driver-request', data => {
      setDriveRequests(data.client_request);
    });
  }, []);

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  useEffect(() => {
    if (!driverServiceIsActive) return;

    const driverLocationInterval = setInterval(() => {
      const payload = {
        id: user?.uid,
        longitud: lastKnownLocation?.longitude,
        latitud: lastKnownLocation?.latitude,
      };
      socket.emit('location-driver', payload);
    }, 2000);

    return () => clearInterval(driverLocationInterval);
  }, [driverServiceIsActive]);

  function onActiveServicePress() {
    setDriverServiceIsActive(!driverServiceIsActive);
  }

  function handleAcceptRequest() {
    setDriverServiceIsActive(false);
  }

  function analyzeRace() {
    setAnalyzingRace(true);
    setDriverServiceIsActive(false);
  }

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <FAB
        iconName="menu-2-outline"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        style={{
          position: 'absolute',
          left: 20,
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
        <View
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
          <View style={{gap: 15, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 15, color: '#fff8'}}>
              Nombre: {data?.name}
            </Text>
            <Text style={{fontSize: 15, color: '#fff8'}}>
              Apellido: {data?.lastName}
            </Text>
            <Text style={{fontSize: 15, color: '#fff8'}}>
              Identificacion: {data?.identification}
            </Text>
            <Text style={{fontSize: 15, color: '#fff8'}}>
              Telefono: {data?.phone}
            </Text>
          </View>
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
        </View>
      </Modal>
      {driverRequests && driverServiceIsActive && (
        <List
          style={{
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 999,
            top: 80,
            left: 5,
            right: 5,
          }}
          data={driverRequests}
          renderItem={({item: request}) => (
            <ClientInformationCard
              setCurrentRequest={setCurrentRequest}
              analyzeRace={analyzeRace}
              request={request}
              setOrigin={setOrigin}
              setDestination={setDestination}
            />
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
        <FAB
          iconName={
            !driverServiceIsActive ? 'power-outline' : 'bar-chart-2-outline'
          }
          style={{
            bottom: 20,
            left: 40,
            right: 40,
          }}
          label={
            !driverServiceIsActive ? 'Activar servicios' : 'Capturando viajes'
          }
          onPress={onActiveServicePress}
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
              style={{position: 'static', flex: 1}}
              label={`${Math.ceil(raceData?.distance ?? 0)} Km`}
              onPress={() => {}}
            />
            <FAB
              iconName={'clock-outline'}
              style={{position: 'static', flex: 1}}
              label={`${Math.ceil(raceData?.duration ?? 0)} Min`}
              onPress={() => {}}
            />
          </Layout>

          <FAB
            iconName={'trending-up-outline'}
            style={{
              bottom: 80,
              left: 40,
              right: 40,
            }}
            label={`${currencyFormat(
              Math.ceil(raceData?.distance * 850 + 4600),
            )}`}
            onPress={() => {}}
          />
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
                  raceData!.distance * 850 + 4600,
                );
                console.log({response});
              }}
              status="success"
              style={{flex: 1, borderRadius: 50}}>
              Aceptar
            </Button>
          </Layout>
          {/* <FAB
            iconName={'bar-chart-2-outline'}
            style={{
              bottom: 20,
              left: 40,
              right: 40,
            }}
            label={'Volver'}
            onPress={() => {}}
          /> */}
        </>
      )}
    </>
  );
};
