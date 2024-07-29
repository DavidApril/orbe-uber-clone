import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {CheckBox, Text} from '@ui-kitten/components';
import {useEffect, useMemo, useRef} from 'react';
import {fontColor, neutralColors} from '../../theme/styles';
import {
  useAuthStore,
  useCartStore,
  useCouponStore,
  usePaymentStore,
  useUIStore,
} from '../../../store';
import {
  Pressable,
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {PaymentService} from '../../../services';
import {CText} from '../ui/custom-text';

export const BSAddCreditCard = () => {
  const addTarjetBottomSheetRef = useRef<BottomSheet>(null);
  const {height} = useWindowDimensions();
  const snapPoints = useMemo(() => ['1%', height * 0.85], []);

  const {isDarkMode} = useUIStore();
  const {userByUid} = useAuthStore();
  const {setIsPaying, setAddTarjetBottomSheetRef, payWithCard} =
    usePaymentStore();
  const {couponToUse} = useCouponStore();
  const {cart, getSummaryInformation} = useCartStore();

  const {total} = getSummaryInformation(couponToUse?.value);

  const initialValues = {
    name: '',
    numberCard: '',
    expirationDate: '',
    CVC: '',
  };

  const handleAddCard = async (values: typeof initialValues) => {
    setIsPaying(true);

    console.log('sending', {
      value: total.toString(),
      docType: 'CC',
      docNumber: userByUid?.cliente.id.toString(),
      name: userByUid?.cliente.name,
      lastName: 'Apellido',
      email: userByUid?.email,
      cellPhone: userByUid?.cliente.phone,
      phone: userByUid?.cliente.phone,
      cardNumber: values.numberCard,
      cardExpYear: '2025',
      cardExpMonth: ' 12',
      cardCvc: values.CVC,
      dues: '12',
      userUid: userByUid?.uid_firebase,
      description: 'Pago de prueba',
      typeTransaction: 'Compra',
      methodPay: payWithCard ? 'Tarjeta de Crédito' : 'Efectivo',
      details: cart.map(itemInCart => ({
        key: itemInCart.product.name,
        value: itemInCart.quantity.toString(),
      })),
    });

    const response = await PaymentService.cardCreditPayment({
      value: total.toString(),
      docType: 'CC',
      docNumber: userByUid?.cliente.id.toString(),
      name: userByUid?.cliente.name,
      lastName: 'Apellido',
      email: userByUid?.email,
      cellPhone: userByUid?.cliente.phone,
      phone: userByUid?.cliente.phone,
      cardNumber: values.numberCard,
      cardExpYear: '2025',
      cardExpMonth: ' 12',
      cardCvc: values.CVC,
      dues: '12',
      userUid: userByUid?.uid_firebase,
      description: 'Pago de prueba',
      typeTransaction: 'Compra',
      methodPay: payWithCard ? 'Tarjeta de Crédito' : 'Efectivo',
      details: cart.map(itemInCart => ({
        key: itemInCart.product.name,
        value: itemInCart.quantity.toString(),
      })),
    });

    console.log({response});
    console.log(userByUid?.uid_firebase);

    setIsPaying(false);
  };

  useEffect(() => {
    setAddTarjetBottomSheetRef(addTarjetBottomSheetRef);
  }, [addTarjetBottomSheetRef]);

  return (
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
  );
};
