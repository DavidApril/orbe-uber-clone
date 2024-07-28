import {Button, Layout, Text} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';
import {useEffect, useState} from 'react';
import {UserService} from '../../../services';
import {useDriverStore} from '../../../store';

interface Props {
  request: any;
}

export const ClientInformationCard = ({request}: Props) => {
  const [raceData] = useState<any>(request.coordinates);
  const [client, setClient] = useState<any>(null);

  const {
    setCurrentRequest,
    setDestination,
    setOrigin,
    setAnalyzingRace,
    setDriverServiceIsActive,
  } = useDriverStore();

  useEffect(() => {
    setCurrentRequest(request);
  }, []);

  const getClient = async () => {
    const client = await UserService.getClientByUid(request.id_client);
    setClient(client);
  };

  useEffect(() => {
    getClient();
  }, []);

  useEffect(() => {
    if (!raceData) return;
    raceData?.forEach(({type, latitud, longitud}: any) => {
      if (type == 'origen') {
        setOrigin({latitude: latitud, longitude: longitud});
      }

      if (type == 'destino') {
        setDestination({latitude: latitud, longitude: longitud});
      }
    });
  }, [raceData]);

  return (
    <Layout style={{marginHorizontal: 10, borderRadius: 30, padding: 20}}>
      <Layout
        style={{
          flexDirection: 'column',
          gap: 10,
        }}>
        <Layout
          style={{
            height: 1,
            backgroundColor: '#dedad9',
            marginTop: 10,
          }}></Layout>

        <Layout
          style={{
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 20,
          }}>
          <Layout
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              justifyContent: 'center',
              backgroundColor: 'black',
            }}>
            {/* <Image/> */}
          </Layout>

          <Layout style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {client?.cliente.name}
            </Text>
            <Text>{client?.email}</Text>
          </Layout>

          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>(4.8)</Text>
          </Layout>
        </Layout>

        {/* <Layout
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'center',
          }}>
          <Layout
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Tarifa</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              {currencyFormat(Math.ceil(raceData.distance * 850 + 4600))}
            </Text>
          </Layout>
        </Layout> */}

        <Button
          style={{borderRadius: 100}}
          status="warning"
          onPress={() => {
            setAnalyzingRace(true);
            setDriverServiceIsActive(false);
          }}>
          Analizar carrera
        </Button>

        {/* <Layout
          style={{
            height: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
          }}>
          <Layout>
            <Text>Distancia</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {Math.ceil(raceData.distance)} Km
            </Text>
          </Layout> */}

        {/* <Layout>
            <Text>Tiempo</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {Math.ceil(raceData.duration)} Min
            </Text>
          </Layout>
        </Layout> */}

        <Layout style={{height: 1, backgroundColor: '#dedad9'}}></Layout>
        {/* Información de contacto */}
        <Layout
          style={{
            flexDirection: 'column',
            gap: 20,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Detalle de contácto
          </Text>

          <Layout
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Layout style={{flexDirection: 'row', gap: 10}}>
              <Button
                status="success"
                style={{width: 40, height: 40, borderRadius: 50}}>
                <CustomIcon white name="phone-outline" />
              </Button>
              <Button
                status="success"
                style={{width: 40, height: 40, borderRadius: 50}}>
                <CustomIcon white name="message-circle-outline" />
              </Button>
            </Layout>

            <Text>+57 {client?.cliente.phone}</Text>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
