import {useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
} from 'react-native';

import {RootStackParams} from '../../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {useCartStore, useUIStore} from '../../../../store';
import {
  CartItem,
  FABGoBackButton,
  PaymentControllers,
} from '../../../components';
import {
  globalColors,
  globalDimensions,
  stateColors,
} from '../../../theme/styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {Divider} from '@ui-kitten/components';

interface Props
  extends StackScreenProps<RootStackParams, 'ProductsCartScreen'> {}

export const ProductsCartScreen = ({navigation}: Props) => {
  const [shipping] = useState(3000);
  const {height} = useWindowDimensions();
  const {isDarkMode} = useUIStore();
  const {cart, getSummaryInformation} = useCartStore();
  const {itemsInCart, subTotal, tax, total} = getSummaryInformation();

  const snapPoints = useMemo(() => ['18%', '100%'], []);
  const summaryBottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDark
          : globalColors.neutralColors.background,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <FABGoBackButton />
      <View style={{}}>
        <View style={{marginBottom: 20, marginHorizontal: 30}}>
          <Text
            style={{
              fontSize: 25,
              color: !isDarkMode
                ? globalColors.fontColor.textColorHeader
                : globalColors.fontColor.textColorHeaderDark,
            }}>
            Productos
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: !isDarkMode
                ? globalColors.fontColor.textColor
                : globalColors.fontColor.textColorDark,
            }}>
            Una lista de todos los productos en el carrito.
          </Text>
        </View>
        <View
          style={{
            height: height * 0.74,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            width: '100%',
            padding: 30,
            backgroundColor: isDarkMode
              ? globalColors.neutralColors.backgroundDarkAlpha
              : globalColors.neutralColors.backgroundAlpha,
          }}>
          {cart.length > 0 ? (
            <FlatList
              data={cart}
              style={{
                gap: 10,
                flexDirection: 'column',
              }}
              renderItem={({item}) => <CartItem item={item} />}
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>No hay productos en el carrito.</Text>
              <Pressable
                onPress={() => navigation.navigate('HomeClientDeliveryScreen')}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  borderRadius: globalDimensions.borderRadiusButtom,
                  backgroundColor: stateColors.warning,
                  marginVertical: 10,
                }}>
                <Text style={{}}>Ver restaurantes</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {cart.length > 0 && (
        <BottomSheet
          ref={summaryBottomSheetRef}
          backgroundStyle={{
            backgroundColor: isDarkMode
              ? globalColors.neutralColors.backgroundDark
              : globalColors.neutralColors.background,
          }}
          handleStyle={{
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            backgroundColor: isDarkMode
              ? globalColors.grayScale.black
              : globalColors.grayScale.white,
          }}
          style={{borderTopRightRadius: 100}}
          snapPoints={snapPoints}>
          <View
            style={{
              height: height * 0.8,
              backgroundColor: isDarkMode
                ? globalColors.grayScale.black
                : globalColors.grayScale.white,
            }}>
            <Text
              style={{
                paddingLeft: 30,
                marginVertical: 20,
                fontSize: 30,
                fontWeight: 'bold',
                color: isDarkMode
                  ? globalColors.fontColor.textColorHeaderDark
                  : globalColors.fontColor.textColorHeader,
              }}>
              Paga aquí
            </Text>

            <Divider style={{marginVertical: 10}} />

            <PaymentControllers
              itemsInCart={itemsInCart}
              shipping={shipping}
              subtotal={subTotal}
              tax={tax}
              total={total}
            />
          </View>
        </BottomSheet>
      )}
    </View>
  );
};
