import {GOOGLE_API_KEY} from '@env';
import {Button, Layout, Radio, Text} from '@ui-kitten/components';
import {useState} from 'react';
import {
  Modal,
  Pressable,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Location} from '../../../interfaces';
import {globalColors} from '../../theme/styles';
import {CustomIcon} from '../ui/custom-icon';

interface Props {
  setOrigin: React.Dispatch<React.SetStateAction<Location | null>>;
  setDestination: React.Dispatch<React.SetStateAction<Location | null>>;
  setSearchingDriver: React.Dispatch<React.SetStateAction<boolean>>;
  searchingDriver: boolean;
  setPayWithCard: React.Dispatch<React.SetStateAction<boolean>>;
  payWithCard: boolean;
}

export const SelectOriginDestination = ({
  setOrigin,
  setDestination,
  setSearchingDriver,
  searchingDriver,
  payWithCard,
  setPayWithCard,
}: Props) => {
  const {height, width} = useWindowDimensions();

  const colorScheme = useColorScheme();

  const [modalLocation, setModalLocation] = useState(false);
  const [modalDestiny, setModalDestiny] = useState(false);
  const [inputLocation, setInputLocation] = useState('');
  const [inputDestiny, setInputDestiny] = useState('');


  return (
    <Layout
      style={{
        bottom: 0,
        zIndex: 9999,
        padding: 20,
        gap: 10,
        paddingTop: 40,
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 30}}>Selecciona</Text>
      <Text> dos puntos para buscar un conductor</Text>

      <Layout style={{height: 20}}></Layout>

      <Pressable
        style={{
          padding: 15,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: '#3fc1f2',
        }}
        onPress={() => {
          setModalLocation(true);
        }}>
        <Text
          style={{
            color:
              colorScheme === 'dark' ? globalColors.white : globalColors.black,
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
          <Layout
            style={{
              width: width * 0.9,
              height: height * 0.6,
              // backgroundColor: 'black',
              // borderColor: '#20f',
              borderWidth: 1,
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <GooglePlacesAutocomplete
              placeholder="Lugar de recogida"
              textInputProps={{placeholderTextColor: 'white'}}
              fetchDetails={true}
              enableHighAccuracyLocation
              debounce={300}
              styles={{
                container: {
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  gap: 20,
                },
                row: {
                  padding: 13,
                  height: 44,
                  flexDirection: 'row',
                  borderRadius: 50,
                  width: width * 0.75,
                  left: 10,
                  right: 10,
                },
                primaryText: {
                  color: 'white',
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
                  backgroundColor: 'white',
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
                  setInputLocation(details.formatted_address || ''); // Actualiza el texto del input
                  setModalLocation(false); // Cierra el modal al seleccionar un lugar
                }
              }}
              query={{
                key: GOOGLE_API_KEY,
                language: 'es',
              }}
            />
          </Layout>
        </Pressable>
      </Modal>

      <Pressable
        style={{
          padding: 15,
          borderRadius: 50,
          borderColor: '#3fc1f2',
          borderWidth: 1,
        }}
        onPress={() => {
          setModalDestiny(true);
        }}>
        <Text
          style={{
            color:
              colorScheme === 'dark' ? globalColors.white : globalColors.black,
          }}>
          {inputDestiny || 'Lugar de llegada'}
        </Text>
      </Pressable>

      <Modal
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
          <Layout
            style={{
              width: width * 0.9,
              height: height * 0.5,
              borderRadius: 20,
              padding: 20,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <GooglePlacesAutocomplete
              placeholder="Lugar de llegada"
              textInputProps={{placeholderTextColor: 'white'}}
              fetchDetails={true}
              enableHighAccuracyLocation
              debounce={300}
              styles={{
                container: {
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  gap: 20,
                },
                row: {
                  padding: 13,
                  height: 44,
                  flexDirection: 'row',
                  borderRadius: 50,
                  width: width * 0.75,
                  left: 10,
                  right: 10,
                },
                primaryText: {
                  color: 'white',
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
            <Layout>
              <Pressable
                onPress={() => {
                  setModalDestiny(false);
                }}>
                <Text>Cerrar</Text>
              </Pressable>
            </Layout>
          </Layout>
        </Pressable>
      </Modal>

      <Layout style={{height: 20}}></Layout>

      <Layout>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Metodo de pago</Text>
        <Layout
          style={{
            flexDirection: 'row',
            gap: 10,
          }}>
          <Layout
            // onPress={() => setMethodPay('pse')}
            style={{
              marginVertical: 20,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              // borderWidth: 1,
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
                  PSE
                </Text>
              </Text>
            </Radio>
          </Layout>

          <Layout
            style={{
              marginVertical: 20,
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 5,
              // borderWidth: 1,
            }}>
            <Radio onChange={() => setPayWithCard(false)} checked={!payWithCard}>
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
          </Layout>
        </Layout>
      </Layout>

      <Pressable
        onPress={() => {
          setSearchingDriver(!searchingDriver);
        }}
        style={{padding: 20}}>
        <Text style={{color: '#3fc1f2', textAlign: 'center'}}>
          {!searchingDriver ? 'Confirmar' : 'Cancelar'}
        </Text>
      </Pressable>
    </Layout>
    // <Layout
    //   style={{
    //     bottom: 0,
    //     zIndex: 9999,
    //     padding: 20,
    //     gap: 10,
    //     paddingTop: 40,
    //   }}>
    //   <Text style={{fontWeight: 'bold', fontSize: 30}}>
    //     Selecciona
    //     <Text> dos puntos para buscar un conductor</Text>
    //   </Text>

    //   <Layout style={{height: 20}}></Layout>

    //   <Pressable
    //     style={{
    //       padding: 15,
    //       borderRadius: 50,
    //       backgroundColor: 'black',
    //     }}
    //     onPress={() => {
    //       setModalLocation(true);
    //     }}>
    //     <Text style={{color: 'white'}}>
    //       {inputLocation || 'Lugar de recogida'}
    //     </Text>
    //   </Pressable>

    //   <Modal
    //     transparent={true}
    //     visible={modalLocation}
    //     onRequestClose={() => {
    //       setModalLocation(false);
    //     }}>
    //     <Pressable
    //       onPress={() => {
    //         setModalLocation(false);
    //       }}
    //       style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //       }}>
    //       <Layout
    //         style={{
    //           width: width * 0.9,
    //           height: height * 0.5,
    //           // backgroundColor: 'black',
    //           // borderColor: '#20f',
    //           borderWidth: 1,
    //           borderRadius: 20,
    //           padding: 20,
    //           alignItems: 'center',
    //           shadowColor: '#000',
    //           shadowOffset: {
    //             width: 0,
    //             height: 2,
    //           },
    //           shadowOpacity: 0.25,
    //           shadowRadius: 4,
    //           elevation: 5,
    //         }}>
    //         <GooglePlacesAutocomplete
    //           placeholder="Lugar de recogida"
    //           textInputProps={{placeholderTextColor: 'white'}}
    //           fetchDetails={true}
    //           enableHighAccuracyLocation
    //           debounce={300}
    //           styles={{
    //             container: {
    //               flex: 1,
    //               width: '100%',
    //               backgroundColor: 'transparent',
    //               gap: 20,
    //             },
    //             row: {
    //               padding: 13,
    //               height: 44,
    //               flexDirection: 'row',
    //               borderRadius: 50,
    //               width: width * 0.75,
    //               left: 10,
    //               right: 10,
    //             },
    //             primaryText: {
    //               color: 'white',
    //               fontSize: 16,
    //               fontWeight: 'bold',
    //             },
    //             separator: {
    //               height: 5,
    //               backgroundColor: 'transparent',
    //             },
    //             textInput: {
    //               borderRadius: 50,
    //               backgroundColor: 'black',
    //               color: 'white',
    //               paddingHorizontal: 20,
    //             },
    //             poweredContainer: {
    //               display: 'none',
    //               backgroundColor: 'white',
    //             },
    //             listView: {
    //               backgroundColor: 'transparent',
    //               zIndex: 9999,
    //               transform: [{translateY: height * 0}],
    //             },
    //           }}
    //           onPress={(_, details = null) => {
    //             if (details?.geometry.location) {
    //               setOrigin({
    //                 latitude: details?.geometry.location.lat,
    //                 longitude: details?.geometry.location.lng,
    //               });
    //               setInputLocation(details.formatted_address || ''); // Actualiza el texto del input
    //               setModalLocation(false); // Cierra el modal al seleccionar un lugar
    //             }
    //           }}
    //           query={{
    //             key: GOOGLE_API_KEY,
    //             language: 'es',
    //           }}
    //         />
    //       </Layout>
    //     </Pressable>
    //   </Modal>

    //   <Pressable
    //     style={{
    //       padding: 15,
    //       borderRadius: 50,
    //       backgroundColor: 'black',
    //     }}
    //     onPress={() => {
    //       setModalDestiny(true);
    //     }}>
    //     <Text style={{color: 'white'}}>
    //       {inputDestiny || 'Lugar de llegada'}
    //     </Text>
    //   </Pressable>

    //   <Modal
    //     visible={modalDestiny}
    //     onRequestClose={() => {
    //       setModalDestiny(false);
    //     }}>
    //     <Pressable
    //       onPress={() => {
    //         setModalDestiny(false);
    //       }}
    //       style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //       }}>
    //       <Layout
    //         style={{
    //           width: width * 0.9,
    //           height: height * 0.5,
    //           borderRadius: 20,
    //           padding: 20,
    //           alignItems: 'center',
    //           shadowColor: '#000',
    //           shadowOffset: {
    //             width: 0,
    //             height: 2,
    //           },
    //           shadowOpacity: 0.25,
    //           shadowRadius: 4,
    //           elevation: 5,
    //         }}>
    //         <GooglePlacesAutocomplete
    //           placeholder="Lugar de llegada"
    //           textInputProps={{placeholderTextColor: 'white'}}
    //           fetchDetails={true}
    //           enableHighAccuracyLocation
    //           debounce={300}
    //           styles={{
    //             container: {
    //               flex: 1,
    //               width: '100%',
    //               backgroundColor: 'transparent',
    //               gap: 20,
    //             },
    //             row: {
    //               padding: 13,
    //               height: 44,
    //               flexDirection: 'row',
    //               borderRadius: 50,
    //               width: width * 0.75,
    //               left: 10,
    //               right: 10,
    //             },
    //             primaryText: {
    //               color: 'white',
    //               fontSize: 16,
    //               fontWeight: 'bold',
    //             },
    //             separator: {
    //               height: 5,
    //               backgroundColor: 'transparent',
    //             },
    //             textInput: {
    //               borderRadius: 50,
    //               backgroundColor: 'black',
    //               color: 'white',
    //               paddingHorizontal: 20,
    //             },
    //             poweredContainer: {
    //               display: 'none',
    //             },
    //             listView: {
    //               backgroundColor: 'transparent',
    //               zIndex: 9999,
    //             },
    //           }}
    //           onPress={(_, details = null) => {
    //             if (details?.geometry.location) {
    //               setDestination({
    //                 latitude: details?.geometry.location.lat,
    //                 longitude: details?.geometry.location.lng,
    //               });
    //               setInputDestiny(details.formatted_address || ''); // Actualiza el texto del input
    //               setModalDestiny(false); // Cierra el modal al seleccionar un lugar
    //             }
    //           }}
    //           query={{
    //             key: GOOGLE_API_KEY,
    //             language: 'es',
    //           }}
    //         />
    //         <Layout>
    //           <Pressable
    //             onPress={() => {
    //               setModalDestiny(false);
    //             }}>
    //             <Text>Cerrar</Text>
    //           </Pressable>
    //         </Layout>
    //       </Layout>
    //     </Pressable>
    //   </Modal>

    //   <Layout style={{height: 20}}></Layout>

    //   <Button
    //     disabled={!inputDestiny || !inputLocation}
    //     onPress={() => {
    //       setSearchingDriver(!searchingDriver);
    //     }}
    //     status="success"
    //     appearance="ghost">
    //     {!searchingDriver ? 'Confirmar' : 'Cancelar'}
    //   </Button>
    // </Layout>
  );
};
