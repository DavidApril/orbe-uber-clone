import {Button} from '@ui-kitten/components';
import {CustomIcon} from '../ui/custom-icon';
import {useEffect, useState} from 'react';
import {UserService} from '../../../services';
import {useDeliveryStore, useUIStore} from '../../../store';
import {Pressable, View, Text} from 'react-native';
import {globalDimensions, neutralColors, stateColors} from '../../theme/styles';
import {CTextHeader} from '../ui/custom-text-header';
import {CText} from '../ui/custom-text';

interface Props {
  request: any;
}

export const ClientInformationCard = ({request}: Props) => {
  const [raceData] = useState<any>(request.coordinates);
  const [setClient] = useState<any>(null);
  const {isDarkMode} = useUIStore();

  const {
    setCurrentRequest,
    setDestination,
    setOrigin,
    setAnalyzingRace,
  } = useDeliveryStore();

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
            }}>
            {/* <Image/> */}
          </View>

          <View style={{flexDirection: 'column'}}>
            <CTextHeader style={{fontWeight: 'bold', fontSize: 18}}>
              El Sabor del Paraíso
            </CTextHeader>
            <CText>Cra54 #24 - 32, 450 Avenue </CText>
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
            setCurrentRequest({ request: 0})
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
