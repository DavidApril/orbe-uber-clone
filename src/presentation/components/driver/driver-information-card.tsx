import {Button, Layout, Spinner, Text} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';
import {useEffect, useState} from 'react';
import {DriverService} from '../../../services';
import {currencyFormat} from '../../../utils';

interface Props {
  driver: any;
  raceData: any;
  createRequest: any;
}

export const DriverInformationCard = ({
  driver,
  raceData,
  createRequest,
}: Props) => {
  const [driverData, setDriverData] = useState<any>();
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);

  const getDriverData = async () => {
    const response = await DriverService.getDriverByUserUid(driver.id);
    if (response && !driverData) {
      setDriverData(response.data);
    }
  };

  useEffect(() => {
    getDriverData();
  }, []);

  return (
    <Layout style={{marginHorizontal: 30}}>
      <Layout style={{flexDirection: 'column', gap: 10}}>
        <Layout style={{height: 1, backgroundColor: '#dedad9'}}></Layout>

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
              {driverData?.driver.name + ' ' + driverData?.driver.lastName}
            </Text>
            <Text>{driverData?.driver.identification}</Text>
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

        <Layout
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
        </Layout>

        <Layout
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
          </Layout>

          <Layout>
            <Text>Tiempo</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {Math.ceil(raceData.duration)} Min
            </Text>
          </Layout>
        </Layout>

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

            <Text>+57 {driverData?.driver.phone}</Text>

            {/* <Button style={{borderRadius: 60, paddingHorizontal: 50}}>
              Ver perfil
            </Button> */}
          </Layout>
          <Layout style={{height: 1, backgroundColor: '#dedad9'}}></Layout>

          {/* Create request  */}
          <Layout
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
            }}>
            <Button status="danger" style={{borderRadius: 50}}>
              Eliminar conductor
            </Button>
            <Button
              onPress={() => {
                setLoadingRequest(true);
                createRequest();
              }}
              status="success"
              style={{flex: 1, borderRadius: 50}}>
              {!loadingRequest ? (
                'Hacer petición'
              ) : (
                <Text>
                  <Spinner status='basic' />
                </Text>
              )}
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
