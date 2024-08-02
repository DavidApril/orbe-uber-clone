import {Button, Spinner, Text} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';
import {useEffect, useState} from 'react';
import {StorageService} from '../../../services';
import {currencyFormat} from '../../../utils';
import {globalColors, globalDimensions} from '../../theme/styles';
import {Image, View} from 'react-native';
import {useUIStore} from '../../../store';
import {CViewAlpha} from '../ui/custom-view-alpha';

interface Props {
  driver: any;
  raceData: any;
  createRequest: any;
  currentDriverAcceptRace: boolean | null;
}

export const DriverInformationCard = ({
  driver,
  raceData,
  createRequest,
  currentDriverAcceptRace,
}: Props) => {
  const [driverData, setDriverData] = useState<any>();
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
  const {isDarkMode} = useUIStore();

  const getDriverData = async () => {
    const response = await DriverService.getDriverByUserUid(driver.id);
    if (response && !driverData) {
      setDriverData(response.data);
    }
  };

  useEffect(() => {
    if (currentDriverAcceptRace !== null) {
      setLoadingRequest(false);
    }
  }, [currentDriverAcceptRace]);

  useEffect(() => {
    getDriverData();
  }, []);

  return (
    <CViewAlpha
      style={{margin: 30, borderRadius: globalDimensions.cardBorderRadius}}>
      <View style={{flexDirection: 'column', gap: 10, margin: 20}}>
        <View
          style={{
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 20,
          }}>
          <View
            style={{
              height: 80,
              width: 80,
              borderRadius: 50,
              justifyContent: 'center',
              backgroundColor: 'black',
            }}>
            <Image
              style={{height: 80, width: 80, borderRadius: 50}}
              source={{
                uri: StorageService.getPhotoByFilename('product/image.png'),
              }}
            />
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              {driverData?.driver.name + ' ' + driverData?.driver.lastName}
            </Text>
            <Text>{driverData?.driver.identification}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>(4.8)</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'center',
          }}>
          <View
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
          </View>
        </View>

        <View
          style={{
            height: 100,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
          }}>
          <View>
            <Text>Distancia</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {Math.ceil(raceData.distance)} Km
            </Text>
          </View>

          <View>
            <Text>Tiempo</Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {Math.ceil(raceData.duration)} Min
            </Text>
          </View>
        </View>

        <View style={{height: 1, backgroundColor: '#dedad9'}}></View>
        {/* Información de contacto */}
        <View
          style={{
            flexDirection: 'column',
            gap: 20,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            Detalle de contácto
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', gap: 10}}>
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
            </View>

            <Text>+57 {driverData?.driver.phone}</Text>

            {/* <Button style={{borderRadius: 60, paddingHorizontal: 50}}>
              Ver perfil
            </Button> */}
          </View>
          <View style={{height: 1, backgroundColor: '#dedad9'}}></View>

          {/* Create request  */}
          {currentDriverAcceptRace == null && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-between',
              }}>
              <Button status="danger" style={{borderRadius: 50}}>
                Eliminar conductor
              </Button>
              <Button
                disabled={loadingRequest}
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
                    <Spinner status="basic" />
                  </Text>
                )}
              </Button>
            </View>
          )}

          {currentDriverAcceptRace && (
            <View
              style={{
                flex: 1,
                paddingVertical: 15,
                backgroundColor: globalColors.primary,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: 16,
                }}>
                En camino
              </Text>
            </View>
          )}
        </View>
      </View>
    </CViewAlpha>
  );
};
