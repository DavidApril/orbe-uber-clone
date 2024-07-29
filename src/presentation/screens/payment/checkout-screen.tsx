import React, {useEffect, useMemo, useRef} from 'react';
import {
  BSAddCreditCard,
  CModal,
  CreditCard,
  CreditCardSelector,
  CText,
  CTextHeader,
  CustomIcon,
  CView,
  CViewAlpha,
  ModalPaying,
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
import {Spinner} from '@ui-kitten/components';
import {PaymentService} from '../../../services';

interface Props extends StackScreenProps<RootStackParams, 'CheckoutScreen'> {}

export const CheckoutScreen = ({navigation}: Props) => {
  const {cart, getSummaryInformation} = useCartStore();
  const {couponToUse} = useCouponStore();
  const {isDarkMode} = useUIStore();

  const {total, discount, subTotal, itemsInCart, tax} = getSummaryInformation(
    couponToUse?.value,
  );

  const {
    isPaying,
    setIsPaying,
    creditCardsTokens,
    addTarjetBottomSheetRef,
    payWithCard,
  } = usePaymentStore();
  const {userByUid} = useAuthStore();

  const initialValues = {
    name: '',
    numberCard: '',
    expirationDate: '',
    CVC: '',
  };

  const handleAddCard = async (values: typeof initialValues) => {
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
          <CreditCardSelector
            horizontal={false}
            onAddButtonPress={() => addTarjetBottomSheetRef?.current?.expand()}
          />
        )}

        <ModalPaying />

        <BSAddCreditCard />

        {creditCardsTokens.length > 0 && (
          <Pressable
            disabled={
              isPaying || (payWithCard && creditCardsTokens.length === 0)
            }
            // onPress={handlePay}
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
