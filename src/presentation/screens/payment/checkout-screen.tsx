import React, {useMemo, useRef} from 'react';
import {
  BSAddCreditCard,
  CreditCard,
  CText,
  CTextHeader,
  CustomIcon,
  CView,
  CViewAlpha,
  OpenDrawerMenu,
} from '../../components';
import {globalDimensions, neutralColors, stateColors} from '../../theme/styles';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCartStore, useCouponStore, useUIStore} from '../../../store';
import {currencyFormat, parseNumberToText} from '../../../utils';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../../interfaces';
import {useClientDriverStore} from '../../../store/client/client-driver-store';
import BottomSheet from '@gorhom/bottom-sheet';
import {CheckBox} from '@ui-kitten/components';

interface Props extends StackScreenProps<RootStackParams, 'CheckoutScreen'> {}

export const CheckoutScreen = ({navigation}: Props) => {
  const addTarjetBottomSheetRef = useRef<BottomSheet>(null);
  const {getSummaryInformation} = useCartStore();
  const {payWithCard} = useClientDriverStore();
  const {couponToUse} = useCouponStore();
  const {isDarkMode} = useUIStore();
  const snapPoints = useMemo(() => ['10%', '70%'], []);

  const {total, discount, subTotal, itemsInCart, tax} = getSummaryInformation(
    couponToUse?.value,
  );

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

        {!payWithCard && (
          <View style={{marginHorizontal: 30, position: 'relative'}}>
            <CTextHeader style={{fontWeight: '100', fontSize: 20}}>
              Método de pago
            </CTextHeader>
            <View
              style={{
                height: 300,
                marginTop: 10,
                flex: 1,
              }}>
              <View style={{position: 'absolute'}}>
                <FlatList
                  horizontal
                  data={[0, 1]}
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
                    AÑADIR TARJETA
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

        <BottomSheet
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
          <View
            style={{
              margin: 30,
            }}>
            <View style={{flexDirection: 'column', gap: 10}}>
              <Text style={{fontSize: 18}}>Nombre</Text>
              <TextInput placeholder="Propietario" />
            </View>
            <View style={{height: 10}}></View>

            <View style={{flexDirection: 'column', gap: 10}}>
              <Text style={{fontSize: 18}}>Número de tarjeta</Text>
              <TextInput placeholder="4575 6231 8229 0326" />
            </View>

            <View style={{height: 10}}></View>

            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flexDirection: 'column', gap: 10, flex: 1}}>
                <Text style={{fontSize: 18}}>Fecha</Text>
                <TextInput placeholder="MM/YY" />
              </View>

              <View style={{flexDirection: 'column', gap: 10, flex: 1}}>
                <Text style={{fontSize: 18}}>CVC</Text>
                <TextInput placeholder="123" />
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

            <Pressable>
              <Text>Añadir</Text>
            </Pressable>
          </View>
        </BottomSheet>

        <View style={{height: 200}} />
      </ScrollView>
    </CView>
  );
};
