import {useEffect, useState} from 'react';
import {useAuthStore, useLocationStore} from '../../../store';
import {CustomIcon, CustomMapView, FAB} from '../../components';
import {LoadingScreen} from '../loading/loading-screen';
import {useSocket} from '../../../hooks';
import {Button, Icon, Layout, List, ListItem} from '@ui-kitten/components';
import {Modal, Pressable, Text, useColorScheme, View} from 'react-native';
import {orbeApi} from '../../../config/api';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {RootStackParams} from '../../../interfaces';
import { withDecay } from 'react-native-reanimated';
import { globalColors } from '../../theme/styles';

export const HomeDriverScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const colorScheme = useColorScheme();
  
  const {user} = useAuthStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const [driverRequests, setDriveRequests] = useState<any[]>([]);
  const [driverServiceIsActive, setDriverServiceIsActive] = useState<boolean>(false);

  const {socket} = useSocket(`ws://orbeapi.devzeros.com:3001/location`);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<any>();

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
        iconName="menu-2-outline"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
          backgroundColor: '#3fc1f2',
        }}
        white={true}
      />

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
                backgroundColor: colorScheme === 'dark' ? globalColors.themeDark : globalColors.themeLight,
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
                  <CustomIcon color='#3fc1f2' name="cube-outline" />
                </Button>
              }
              accessoryRight={AcceptDeniedButtons}
            />
          )}
        />
      )}

      <CustomMapView initialLocation={lastKnownLocation!} />

      <Pressable 
        style={{
          bottom: 20,
          left: 20,
          borderRadius: 20,
          backgroundColor: '#3fc1f2',
          width: '90%',
          height: 50,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'center', 
          alignItems: 'center',
          gap: 10
        }} 
        onPress={onActiveServicePress}>
          <Icon fill={'white'} style={{ width: 30, height: 40 }} name={!driverServiceIsActive ? 'power-outline' : 'bar-chart-2-outline'} />
          <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
            {!driverServiceIsActive ? 'Activar servicios' : 'Capturando viajes'}
          </Text>
      </Pressable>
    </>
  );
};
