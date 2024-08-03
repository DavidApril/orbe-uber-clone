import {
  BSAddCreditCard,
  CreditCardSelector,
  CText,
  CTextHeader,
  CustomIcon,
  CView,
  CViewAlpha,
  FABGoBackButton,
  ModalPaying,
  OpenDrawerMenu,
} from '../../components';
import {globalDimensions, stateColors} from '../../theme/styles';
import {
  Image,
  ImageBackground,
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
  usePaymentStore,
} from '../../../store';
import {currencyFormat, parseNumberToText} from '../../../utils';
import {StackScreenProps} from '@react-navigation/stack';
import {PaymentDetails, RootStackParams} from '../../../interfaces';
import {Spinner} from '@ui-kitten/components';

interface Props extends StackScreenProps<RootStackParams, 'CheckoutScreen'> {}

export const CheckoutScreen = ({navigation}: Props) => {
  const {userByUid} = useAuthStore();
  const {cart, getSummaryInformation} = useCartStore();
  const {couponToUse} = useCouponStore();
  const {height} = useWindowDimensions();
  const {total, discount, subTotal, itemsInCart, tax} = getSummaryInformation(
    couponToUse?.value,
  );

  const {
    isPaying,
    setIsPaying,
    creditCardsTokens,
    creditCardsSelected,
    addTarjetBottomSheetRef,
    pay,
    payWithCard,
  } = usePaymentStore();

  const handleAddCard = async () => {
    let paymentDetailsDto: PaymentDetails = {
      value: total < 100000 ? total.toString() : '100000',
      docType: 'CC',
      docNumber: '123456789',
      name: 'jon',
      lastName: 'doe',
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
      typeTransaction: 'Travel',
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

    setIsPaying(true);
    await pay(paymentDetailsDto);
    setIsPaying(false);

    navigation.navigate('OrderScreen');
  };

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

        <View
          style={{
            paddingHorizontal: 30,
            marginTop: globalDimensions.paddingTopCheckoutScreens,
          }}>
          <CTextHeader style={{fontSize: 35, fontWeight: '100'}}>Checkout</CTextHeader>

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
