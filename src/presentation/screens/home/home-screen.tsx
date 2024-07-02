import {useEffect, useState} from 'react';
import {useAuthStore, useLocationStore} from '../../../store';
import {
  AcceptDeniedNotification,
  CustomIcon,
  CustomMapView,
  FAB,
} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {
  Button,
  ButtonGroup,
  Layout,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';

export const HomeScreen = () => {
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [driverRequests, setDriveRequests] = useState<any[]>([]);
  const [driverServiceIsActive, setDriverServiceIsActive] =
    useState<boolean>(false);

  const {socket} = useSocket(`ws://orbeapi.devzeros.com:3001/location`);

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

  // useEffect(() => {
  //   console.log(driverRequests)
  // }, [driverRequests]);


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
        // <FlatList
        //   style={{
        // position: 'absolute',
        // zIndex: 999,
        // top: 80,
        // left: 20,
        // backgroundColor: 'black',
        // right: 20,
        // height: 400,
        //   }}
        //   data={driverRequests}
        //   renderItem={data => (
        //     <Layout
        //       style={{
        // backgroundColor: 'black',
        // borderRadius: 30,
        // position: 'absolute',
        // zIndex: 999,
        // paddingHorizontal: 20,
        // paddingVertical: 10,
        // alignItems: 'center',
        //       }}>
        //       <Layout></Layout>
        // <Layout
        //   style={{
        //     backgroundColor: 'transparent',
        //     display: 'flex',
        //     flexDirection: 'row',
        //   }}>
        //   <Button appearance="ghost" status="success">
        //     Aceptar
        //   </Button>
        //   <Button appearance="ghost" status="danger">
        //     Rechazar
        //   </Button>
        // </Layout>
        //     </Layout>
        //   )}
        // />
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
