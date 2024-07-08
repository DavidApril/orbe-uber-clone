import {useEffect, useState} from 'react';
import {useAuthStore, useLocationStore} from '../../../store';
import {CustomIcon, CustomMapView, FAB} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {Button, Layout, List, ListItem} from '@ui-kitten/components';
import {Alert, Modal, Pressable, Text, View} from 'react-native';
import {experimentalSetDeliveryMetricsExportedToBigQueryEnabled} from 'firebase/messaging/sw';
import { orbeApi } from '../../../config/api';

export const HomeDriverScreen = () => {
  const {user} = useAuthStore();
  const {logout} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [driverRequests, setDriveRequests] = useState<any[]>([]);
  const [driverServiceIsActive, setDriverServiceIsActive] =
    useState<boolean>(false);

  const {socket} = useSocket(`ws://orbeapi.devzeros.com:3001/location`);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<any>();
  console.log(data);

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
      if (driverRequests) setDriveRequests(data.client_request);
      else setDriveRequests([]);
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
      console.log(payload);
      socket.emit('location-driver', payload);
    }, 2000);

    return () => clearInterval(driverLocationInterval);
  }, [driverServiceIsActive]);

  function onActiveServicePress() {
    setDriverServiceIsActive(!driverServiceIsActive);
    console.log(driverRequests);
  }

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  const AcceptDeniedButtons = (): React.ReactElement => (
    <Layout
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Button style={{}} appearance="ghost" status="success">
        Aceptar
      </Button>
      <Button style={{}} appearance="ghost" status="danger">
        Rechazar
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
              title={`Cliente: ${request.id_client}`}
              // description={`Destino: ${request?.coordinates[1].longitud} - ${request?.coordinates[1].latitud}`}
              accessoryLeft={
                <Button onPress={() => console.log(request)}>
                  <CustomIcon name="cube-outline" />
                </Button>
              }
              accessoryRight={AcceptDeniedButtons}
            />
          )}
        />
      )}

      <CustomMapView initialLocation={lastKnownLocation!} />

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
    </>
  );
};
