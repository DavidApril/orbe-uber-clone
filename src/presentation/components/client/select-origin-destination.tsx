import {GOOGLE_API_KEY} from '@env';
import {Button, Radio, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {Modal, Pressable, useWindowDimensions, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Location} from '../../../interfaces';
import {globalColors, globalDimensions} from '../../theme/styles';
import {CustomIcon} from '../ui/custom-icon';
import {useUIStore} from '../../../store';
import {useClientDriverStore} from '../../../store/client/client-driver-store';
import {CView} from '../ui/custom-view';
import {CViewAlpha} from '../ui/custom-view-alpha';

export const SelectOriginDestination = () => {
  const {height, width} = useWindowDimensions();
  const {isDarkMode} = useUIStore();

  const {
    setOrigin,
    setDestination,
    setSearchingDriver,
    searchingDriver,
    payWithCard,
    setPayWithCard,
  } = useClientDriverStore();

  const [modalLocation, setModalLocation] = useState(false);
  const [modalDestiny, setModalDestiny] = useState(false);
  const [inputLocation, setInputLocation] = useState('');
  const [inputDestiny, setInputDestiny] = useState('');

  return (
    <View
      style={{
        bottom: 0,
        zIndex: 9999,
        padding: 20,
        gap: 10,
        paddingTop: 40,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 30}}>Selecciona</Text>
      <Text> dos puntos para buscar un conductor</Text>

      <View style={{height: 20}}></View>

      <Pressable
        style={{
          padding: 15,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#3fc1f2',
        }}
        onPress={() => {
          setModalLocation(true);
        }}>
        <Text
          style={{
            color: isDarkMode
              ? globalColors.grayScale.white
              : globalColors.grayScale.black,
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
          <CViewAlpha
            style={{
              width: width * 0.9,
              height: height * 0.6,
              borderWidth: 1,
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              elevation: 5,
            }}>
            <GooglePlacesAutocomplete
              placeholder="Lugar de recogida"
              textInputProps={{
                placeholderTextColor: isDarkMode
                  ? globalColors.fontColor.textColorDark
                  : globalColors.fontColor.textColor,
              }}
              fetchDetails={true}
              enableHighAccuracyLocation
              numberOfLines={5}
              debounce={300}
              styles={{
                container: {
                  flex: 1,
                  width: '100%',
                  opacity: 0.3,
                  gap: 20,
                },
                row: {
                  padding: 13,
                  height: 100,
                  backgroundColor: isDarkMode
                    ? globalColors.neutralColors.backgroundDarkAlpha
                    : globalColors.neutralColors.backgroundAlpha,
                  flexDirection: 'row',
                  borderRadius: 12,
                  width: width * 0.75,
                  left: 10,
                  right: 10,
                },
                primaryText: {
                  color: isDarkMode
                    ? globalColors.fontColor.textColorHeaderDark
                    : globalColors.fontColor.textColorDark,
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
                  transform: [{translateY: height * 0}],
                },
              }}
              onPress={(_, details = null) => {
                if (details?.geometry.location) {
                  setOrigin({
                    latitude: details?.geometry.location.lat,
                    longitude: details?.geometry.location.lng,
                  });
                  setInputLocation(details.formatted_address || '');
                  setModalLocation(false);
                }
              }}
              query={{
                key: GOOGLE_API_KEY,
                language: 'es',
              }}
            />
          </CViewAlpha>
        </Pressable>
      </Modal>

      <Pressable
        style={{
          padding: 15,
          borderRadius: 10,
          borderColor: '#3fc1f2',
          borderWidth: 1,
        }}
        onPress={() => {
          setModalDestiny(true);
        }}>
        <Text
          style={{
            color: isDarkMode
              ? globalColors.grayScale.white
              : globalColors.grayScale.black,
          }}>
          {inputDestiny || 'Lugar de llegada'}
        </Text>
      </Pressable>

      <Modal
        transparent={true}
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
          <CViewAlpha
            style={{
              width: width * 0.9,
              height: height * 0.5,
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
            }}>
            <GooglePlacesAutocomplete
              placeholder="Lugar de llegada"
              textInputProps={{
                placeholderTextColor: isDarkMode
                  ? globalColors.fontColor.textColorDark
                  : globalColors.fontColor.textColor,
              }}
              fetchDetails={true}
              enableHighAccuracyLocation
              numberOfLines={5}
              debounce={300}
              styles={{
                container: {
                  flex: 1,
                  width: '100%',
                  opacity: 0.3,
                  gap: 20,
                },
                row: {
                  padding: 13,
                  height: 100,
                  backgroundColor: isDarkMode
                    ? globalColors.neutralColors.backgroundDarkAlpha
                    : globalColors.neutralColors.backgroundAlpha,
                  flexDirection: 'row',
                  borderRadius: 12,
                  width: width * 0.75,
                  left: 10,
                  right: 10,
                },
                primaryText: {
                  color: isDarkMode
                    ? globalColors.fontColor.textColorHeaderDark
                    : globalColors.fontColor.textColorDark,
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
                  transform: [{translateY: height * 0}],
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
            <View>
              <Pressable
                onPress={() => {
                  setModalDestiny(false);
                }}>
                <Text>Cerrar</Text>
              </Pressable>
            </View>
          </CViewAlpha>
        </Pressable>
      </Modal>

      <View style={{height: 20}}></View>

      <View>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Metodo de pago</Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{
              marginVertical: 20,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
            }}>
            <Radio onChange={() => setPayWithCard(true)} checked={payWithCard}>
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 5,
                }}>
                <CustomIcon name="credit-card-outline" />
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  Tarjeta
                </Text>
              </Text>
            </Radio>
          </View>

          <View
            style={{
              marginVertical: 20,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              // borderWidth: 1,
            }}>
            <Radio
              onChange={() => setPayWithCard(false)}
              checked={!payWithCard}>
              <Text
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  gap: 5,
                }}>
                <CustomIcon name="layers-outline" />
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  Efectivo
                </Text>
              </Text>
            </Radio>
          </View>
        </View>
      </View>

      <Button
        disabled={!inputDestiny || !inputLocation}
        appearance="ghost"
        onPress={() => {
          setSearchingDriver(!searchingDriver);
        }}
        style={{padding: 20}}>
        <Text style={{color: '#3fc1f2', textAlign: 'center'}}>
          {!searchingDriver ? 'Confirmar' : 'Cancelar'}
        </Text>
      </Button>
    </View>
  );
};
