import {
  BSAddCreditCard,
  CInput,
  CreditCardSelector,
  CText,
  CTextHeader,
  CustomIcon,
  CustomMapView,
  CView,
  CViewAlpha,
  FABGoBackButton,
  ModalPaying,
  OpenDrawerMenu,
} from '../../components';
import {globalColors, globalDimensions, stateColors} from '../../theme/styles';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  useAuthStore,
  useCartStore,
  useCouponStore,
  useLocationStore,
  useOrderStore,
  usePaymentStore,
  usePermissionStore,
  useUIStore,
} from '../../../store';
import {currencyFormat, parseNumberToText} from '../../../utils';
import {StackScreenProps} from '@react-navigation/stack';
import {PaymentDetails, RootStackParams} from '../../../interfaces';
import {Spinner} from '@ui-kitten/components';
import {useEffect, useState} from 'react';
import {GOOGLE_API_KEY} from '@env';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

interface Props extends StackScreenProps<RootStackParams, 'CheckoutScreen'> {}

export const CheckoutScreen = ({navigation}: Props) => {
  const {userByUid} = useAuthStore();
  const {cart, restaurantSelected, getSummaryInformation} = useCartStore();
  const {couponToUse} = useCouponStore();
  const {lastKnownLocation, getLocation} = useLocationStore();
  const {locationStatus} = usePermissionStore();
  const {height, width} = useWindowDimensions();
  const {isDarkMode} = useUIStore();
  const {total, discount, subTotal, itemsInCart, tax} = getSummaryInformation(
    couponToUse?.value,
  );
  const [address_destination, setAddress_destination] = useState<string>('');

  const [selectingAddress, setSelectingAddress] = useState<boolean>(false);

  const {
    isPaying,
    creditCardsTokens,
    creditCardsSelected,
    addTarjetBottomSheetRef,
    payWithCard,
    setIsPaying,
    pay,
  } = usePaymentStore();
  const {createOrder} = useOrderStore();

  const handleAddCard = async () => {
    let paymentDetailsDto: PaymentDetails = {
      value: total < 100000 ? total.toString() : '100000',
      docType: 'CC',
      docNumber: '123456789',
      name: userByUid?.cliente.name,
      lastName: '',
      email: userByUid?.email,
      cellPhone: userByUid?.cliente?.phone,
      phone: userByUid?.cliente?.phone,
      cardNumber: '',
      cardExpYear: '',
      cardExpMonth: ' ',
      cardCvc: '123',
      userUid: userByUid?.uid_firebase,
      dues: '1',
      methodPay: 'TC',
      typeTransaction: 'Food',
      description: 'Pago por productos',
      details: cart.map(item => ({
        key: item.product.name,
        value: item.quantity.toString(),
      })),
    };

    if (creditCardsSelected) {
      paymentDetailsDto = {
        ...paymentDetailsDto,
        payment: {
          bank: creditCardsSelected.bank,
          id: creditCardsSelected.id,
          tokenCard: creditCardsSelected.tokenCard,
        },
      };
    }
    createOrder({
      id_restaurant: restaurantSelected!.id.toString(),
      address_destination: 'valledupar',
      id_client: userByUid!.uid_firebase,
      method_pay: 'TC',
      products: cart.map(product => ({
        name: product.product.name,
        price: +product.product.priceUnitary,
        description: product.product.description,
        extras: product.product.extras.map(extra => ({
          name: extra.name,
          description: extra.description,
          price: extra.price,
        })),
      })),
    });

    setIsPaying(true);
    const {ok} = await pay(paymentDetailsDto);
    setIsPaying(false);

    if (ok) {
      navigation.navigate('OrdersScreen');
    }
  };

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  return (
    <CView style={{flex: 1}}>
      <ImageBackground
        style={{
          zIndex: -10,
        }}>
        <Image
          source={require('../../../assets/background-gradient.jpg')}
          style={{
            position: 'absolute',

            width: '100%',
            height,
          }}
        />
      </ImageBackground>
      <ScrollView style={{flex: 1}}>
        <OpenDrawerMenu />
        <FABGoBackButton />

        <Modal
          visible={selectingAddress}
          onRequestClose={() => {
            setSelectingAddress(false);
          }}></Modal>

        <View
          style={{
            paddingHorizontal: 30,
            marginTop: globalDimensions.paddingTopCheckoutScreens,
          }}>
          <CTextHeader style={{fontSize: 35, fontWeight: '100'}}>
            Checkout
          </CTextHeader>

          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {couponToUse && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View
                  style={{
                    width: 60,
                    backgroundColor: '#121212',
                    borderRadius: 50,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: stateColors.success,
                    }}>
                    {couponToUse?.value}%
                  </Text>
                </View>

                <View>
                  <CText style={{fontSize: 13}}>descuento</CText>
                  <CTextHeader style={{fontSize: 17}}>
                    {currencyFormat(discount)}
                  </CTextHeader>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <View
                style={{
                  width: 60,
                  backgroundColor: '#121212',
                  borderRadius: 50,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  fill={stateColors.error}
                  name="trending-down-outline"
                />
              </View>

              <View>
                <CText style={{fontSize: 13}}>Inpuestos</CText>
                <CTextHeader style={{fontSize: 17}}>
                  {currencyFormat(tax)}
                </CTextHeader>
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}>
              <View
                style={{
                  width: 60,
                  backgroundColor: '#121212',
                  borderRadius: 50,
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CustomIcon
                  fill={stateColors.warning}
                  name="checkmark-circle-outline"
                />
              </View>

              <View>
                <CText style={{fontSize: 13}}>Subtotal</CText>
                <CTextHeader style={{fontSize: 17}}>
                  {currencyFormat(subTotal)}
                </CTextHeader>
              </View>
            </View>
          </View>
        </View>
        <CViewAlpha
          style={{
            height: 200,
            margin: 30,

            borderRadius: globalDimensions.cardBorderRadius,
          }}>
          <View style={{padding: 30}}>
            <CText style={{fontWeight: '500'}}>{itemsInCart} Productos</CText>
            <CTextHeader style={{fontSize: 50, fontWeight: '100'}}>
              <CText style={{fontSize: 30, fontWeight: 'bold'}}>COP</CText>
              {parseNumberToText(total)}
            </CTextHeader>
          </View>
        </CViewAlpha>

        <ScrollView
          style={{
            margin: 30,
          }}>
          <GooglePlacesAutocomplete
            placeholder="Dirección de entrega"
            textInputProps={{
              placeholderTextColor: isDarkMode
                ? globalColors.fontColor.textColorHeaderDark
                : globalColors.fontColor.textColorHeader,
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
            onPress={(data, details = null) => {
              console.log({data});
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: 'es',
            }}
          />
        </ScrollView>

        {locationStatus === 'granted' && lastKnownLocation && (
          <View
            style={{
              height: 300,
              marginHorizontal: 30,
              marginBottom: 30,
              borderRadius: globalDimensions.cardBorderRadius,
            }}>
            <CustomMapView initialLocation={lastKnownLocation} />
          </View>
        )}

        {/* {locationStatus === 'granted'  &&   <View style={{height: 400}}>
              <CustomMapView initialLocation={lastKnownLocation!}></CustomMapView>
            </View>,
          } */}
        {payWithCard && (
          <CreditCardSelector
            showAddButton={false}
            horizontal={false}
            onAddButtonPress={() => addTarjetBottomSheetRef?.current?.expand()}
          />
        )}

        <ModalPaying />

        <BSAddCreditCard />

        {creditCardsTokens.length > 0 && creditCardsSelected && (
          <Pressable
            disabled={
              isPaying || (payWithCard && creditCardsTokens.length === 0)
            }
            onPress={() => handleAddCard()}
            style={{
              backgroundColor: stateColors.success,
              opacity:
                isPaying || (payWithCard && creditCardsTokens.length === 0)
                  ? 0.4
                  : 1,
              height: 50,
              flex: 1,
              margin: 30,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isPaying ? (
              <Spinner status="basic" />
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '300',
                  color: 'white',
                }}>
                Pagar
              </Text>
            )}
          </Pressable>
        )}
        <View style={{height: 200}}></View>
      </ScrollView>
    </CView>
  );
};
