import React, {useEffect, useMemo, useRef} from 'react';
import {
  CModal,
  CreditCard,
  CText,
  CTextHeader,
  CustomIcon,
  CView,
  CViewAlpha,
  OpenDrawerMenu,
} from '../../components';
import {
  fontColor,
  globalDimensions,
  neutralColors,
  stateColors,
} from '../../theme/styles';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  useAuthStore,
  useCartStore,
  useCouponStore,
  usePaymentStore,
  useUIStore,
} from '../../../store';
import {currencyFormat, parseNumberToText} from '../../../utils';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../interfaces';
import {useClientDriverStore} from '../../../store/client/client-driver-store';
import BottomSheet from '@gorhom/bottom-sheet';
import {CheckBox, Spinner} from '@ui-kitten/components';
import {PaymentService} from '../../../services';
import {Form, Formik} from 'formik';

interface Props extends StackScreenProps<RootStackParams, 'CheckoutScreen'> {}

export const CheckoutScreen = ({navigation}: Props) => {
  const addTarjetBottomSheetRef = useRef<BottomSheet>(null);
  const {cart, getSummaryInformation} = useCartStore();
  const {payWithCard} = useClientDriverStore();
  const {couponToUse} = useCouponStore();
  const {isDarkMode} = useUIStore();
  const snapPoints = useMemo(() => ['10%', '80%'], []);
  const {total, discount, subTotal, itemsInCart, tax} = getSummaryInformation(
    couponToUse?.value,
  );

  const {isPaying, setIsPaying, creditCardsTokens} = usePaymentStore();
  const {userByUid, user} = useAuthStore();

  const initialValues = {
    name: '',
    numberCard: '',
    expirationDate: '',
    CVC: '',
  };

  const handleAddCard = async (values: typeof initialValues) => {
    console.log(user?.getIdToken());
    setIsPaying(true);
    await PaymentService.cardCreditPayment({
      value: '50000',
      docType: 'CC',
      docNumber: '123456789',
      name: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@example.com',
      cellPhone: '3001234567',
      phone: '1234567',
      cardNumber: '123323123123123',
      cardExpYear: '2025',
      cardExpMonth: '12',
      cardCvc: '123',
      dues: '12',
      userUid: userByUid?.uid_firebase,
      description: 'Pago de prueba',
      typeTransaction: 'Compra',
      methodPay: 'Tarjeta de Crédito',
      details: cart.map(itemInCart => ({
        key: itemInCart.product.name,
        value: itemInCart.quantity.toString(),
      })),
    });

    setIsPaying(false);
  };

  const handlePay = async () => {};

  useEffect(() => {
    if (creditCardsTokens.length === 0 && payWithCard) {
      addTarjetBottomSheetRef.current?.expand();
    }
  }, []);

  return (
    <CView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <OpenDrawerMenu />

        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            top: 30,
            right: 30,
            height: 45,
            width: 45,
            backgroundColor: 'white',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomIcon fill="black" name="arrow-back" />
        </Pressable>
        <View
          style={{
            paddingHorizontal: 30,
            marginTop: globalDimensions.paddingTopCheckoutScreens,
          }}>
          <CText style={{fontSize: 35, fontWeight: '100'}}>Checkout</CText>

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

        {payWithCard && (
          <View style={{marginHorizontal: 30, position: 'relative'}}>
            <CTextHeader style={{fontWeight: '100', fontSize: 20}}>
              Método de pago
            </CTextHeader>
            <View
              style={{
                height: creditCardsTokens.length === 0 ? 120 : 300,
                marginTop: 10,
                flex: 1,
              }}>
              <View style={{position: 'absolute'}}>
                <FlatList
                  horizontal
                  data={creditCardsTokens}
                  renderItem={() => <CreditCard />}
                />
              </View>
              <Pressable
                onPress={() => addTarjetBottomSheetRef.current?.expand()}
                style={{
                  height: 80,
                  flex: 1,
                  position: 'absolute',
                  bottom: 15,
                  left: 15,
                  right: 15,
                }}>
                <CViewAlpha
                  style={{
                    borderRadius: 10,
                    opacity: 0.7,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  <CustomIcon name="plus-circle-outline" />
                  <CTextHeader style={{fontWeight: 'bold', letterSpacing: 1}}>
                    AÑADIR
                  </CTextHeader>
                </CViewAlpha>
              </Pressable>

              <ImageBackground
                style={{
                  borderRadius: globalDimensions.cardBorderRadius,
                  zIndex: -10,
                  height: '100%',
                  overflow: 'hidden',
                }}>
                <Image
                  source={require('../../../assets/white-gradient.webp')}
                  style={{width: '100%', height: '100%'}}
                />
              </ImageBackground>
            </View>
          </View>
        )}

        <Modal
          visible={isPaying}
          transparent
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              opacity: 0.9,
              // margin: 30,
              // backgroundColor: 'tranparent',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isDarkMode
                ? neutralColors.backgroundDarkAlpha
                : neutralColors.backgroundAlpha,
            }}>
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  transform: [{scale: 3}],
                  margin: 40,
                }}>
                <Spinner status="success" />
              </View>
            </View>
            <View>
              <CTextHeader
                style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
                Realizando pago
              </CTextHeader>
              <CText style={{fontSize: 24, textAlign: 'center'}}>
                Porfavor, espera que concluya la transacción
              </CText>
            </View>
            <Text></Text>
          </View>
        </Modal>

        <BottomSheet
          style={{zIndex: 99999}}
          handleStyle={{
            backgroundColor: isDarkMode
              ? neutralColors.backgroundDarkAlpha
              : neutralColors.backgroundAlpha,
          }}
          enablePanDownToClose={true}
          ref={addTarjetBottomSheetRef}
          backgroundStyle={{
            backgroundColor: isDarkMode
              ? neutralColors.backgroundDarkAlpha
              : neutralColors.backgroundAlpha,
          }}
          snapPoints={snapPoints}>
          <ScrollView
            style={{
              margin: 30,
            }}>
            <Formik initialValues={initialValues} onSubmit={handleAddCard}>
              {({handleChange, values, handleSubmit}) => (
                <>
                  <View style={{flexDirection: 'column', gap: 10}}>
                    <CText>Nombre</CText>
                    <TextInput
                      value={values.name}
                      onChangeText={handleChange('name')}
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>
                  <View style={{height: 10}}></View>

                  <View style={{flexDirection: 'column', gap: 10}}>
                    <CText>Número</CText>
                    <TextInput
                      value={values.numberCard.toString()}
                      onChangeText={handleChange('numberCard')}
                      style={{
                        borderBottomColor: 'gray',
                        borderBottomWidth: 1,
                      }}
                    />
                  </View>

                  <View style={{height: 10}}></View>

                  <View style={{flexDirection: 'row', gap: 10}}>
                    <View style={{flexDirection: 'column', gap: 10, flex: 1}}>
                      <CText>Vencimiento</CText>
                      <TextInput
                        value={values.expirationDate}
                        onChangeText={handleChange('expirationDate')}
                        keyboardType="phone-pad"
                        style={{
                          borderBottomColor: 'gray',
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>

                    <View style={{flexDirection: 'column', gap: 10, flex: 1}}>
                      <CText>CVC</CText>
                      <TextInput
                        value={values.CVC}
                        onChangeText={handleChange('CVC')}
                        style={{
                          borderBottomColor: 'gray',
                          borderBottomWidth: 1,
                        }}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      margin: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CheckBox>
                      <Text>Guardar datos para pagos futuros</Text>
                    </CheckBox>
                  </View>

                  <Pressable
                    onPress={() => handleSubmit()}
                    style={{
                      flex: 1,
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      backgroundColor: isDarkMode
                        ? neutralColors.backgroundDark
                        : neutralColors.background,
                    }}>
                    <Text
                      style={{
                        color: isDarkMode
                          ? fontColor.textColor
                          : fontColor.textColorDark,
                      }}>
                      Añadir
                    </Text>
                  </Pressable>
                </>
              )}
            </Formik>
          </ScrollView>
        </BottomSheet>

        {creditCardsTokens.length > 0 && (
          <Pressable
            disabled={
              isPaying || (payWithCard && creditCardsTokens.length === 0)
            }
            onPress={handlePay}
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
