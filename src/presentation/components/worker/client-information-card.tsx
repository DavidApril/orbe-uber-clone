import {Button, Spinner} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';
import {useEffect, useState} from 'react';
import {useDriverStore, useUIStore} from '../../../store';
import {Pressable, View, Text, Image} from 'react-native';
import {globalDimensions, neutralColors, stateColors} from '../../theme/styles';
import {CTextHeader} from '../ui/custom-text-header';
import {CText} from '../ui/custom-text';
import {ClientService, StorageService} from '../../../services';
import {GetClientByUidResponseData} from '../../../interfaces';
import {CViewAlpha} from '../ui/custom-view-alpha';

interface Props {
  request: any;
}

export const ClientInformationCard = ({request}: Props) => {
  console.log(request.coordinates);
  const [raceData] = useState<any>(request.coordinates);
  const [client, setClient] = useState<GetClientByUidResponseData | null>(null);
  const {isDarkMode} = useUIStore();

  const {setCurrentRequest, setDestination, setOrigin, setAnalyzingRace} =
    useDriverStore();

  useEffect(() => {
    ClientService.getClientByUid(request.id_client).then(client =>
      setClient(client),
    );
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


  if (!client) {
    return (
      <CViewAlpha
        style={{
          width: '100%',
          opacity: 0.9,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Spinner status="basic" />
      </CViewAlpha>
    );
  }

  return (
    <View
      style={{
        marginHorizontal: 10,
        opacity: 0.7,
        borderRadius: 30,
        padding: 20,
        marginBottom: 10,
        backgroundColor: isDarkMode
          ? neutralColors.backgroundDark
          : neutralColors.background,
      }}>
      <View
        style={{
          flexDirection: 'column',
          gap: 10,
        }}>
        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode
              ? neutralColors.borderDark
              : neutralColors.border,
            marginTop: 10,
          }}></View>

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
              overflow: 'hidden',
            }}>
            <Image
              source={{
                uri: StorageService.getPhotoByFilename(client.cliente.photo),
              }}
              style={{height: 80, width: 80}}
            />
          </View>

          <View style={{flexDirection: 'column'}}>
            <CTextHeader style={{fontWeight: 'bold', fontSize: 18}}>
              {client?.cliente.name}
            </CTextHeader>
            <CText>{client.cliente.phone}</CText>
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

        <CViewAlpha
          style={{
            height: 100,
            borderRadius: globalDimensions.cardBorderRadius,
            padding: 10,
          }}>
          {/* <CTextHeader>{raceData}</CTextHeader> */}
        </CViewAlpha>

        <Pressable
          style={{
            flex: 1,
            borderRadius: globalDimensions.borderRadiusButtom,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: stateColors.success,
            padding: 10,
          }}
          onPress={() => {
            setAnalyzingRace(true);
            setCurrentRequest(request);
          }}>
          <CTextHeader>Analizar pedido</CTextHeader>
        </Pressable>

        <View
          style={{
            height: 1,
            backgroundColor: isDarkMode
              ? neutralColors.borderDark
              : neutralColors.border,
          }}></View>
        {/* Información de contacto */}
        <View
          style={{
            flexDirection: 'column',
            gap: 20,
          }}>
          <CTextHeader style={{fontWeight: 'bold', fontSize: 20}}>
            Detalle de contácto
          </CTextHeader>

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

            <CText>+57 303442334</CText>
          </View>
        </View>
      </View>
    </View>
  );
};
