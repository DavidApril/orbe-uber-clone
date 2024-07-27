import {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  Modal,
  useWindowDimensions,
} from 'react-native';

import {RootStackParams} from '../../../../interfaces';
import {StackScreenProps} from '@react-navigation/stack';
import {useCartStore, useUIStore} from '../../../../store';
import {
  CartItem,
  FAB,
  FABGoBackButton,
  FABShoppingCart,
  OpenDrawerMenu,
  PaymentControllers,
} from '../../../components';
import {globalColors} from '../../../theme/styles';
import BottomSheet from '@gorhom/bottom-sheet';
import {List} from '@ui-kitten/components';

interface Props
  extends StackScreenProps<RootStackParams, 'ProductsCartScreen'> {}

export const ProductsCartScreen = ({navigation}: Props) => {
  const [shipping] = useState(3000);
  const {height} = useWindowDimensions();
  const {isDarkMode} = useUIStore();
  const {cart, getSummaryInformation, getTotalItems} = useCartStore();
  const {itemsInCart, subTotal, tax, total} = getSummaryInformation();

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
      <View style={{paddingHorizontal: 30}}>
        <View style={{marginBottom: 20}}>
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
            height: height * 0.8,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            width: '100%',
            padding: 5,
            backgroundColor: isDarkMode
              ? globalColors.neutralColors.backgroundDarkAlpha
              : globalColors.neutralColors.backgroundAlpha,
          }}>
          {/* <ScrollView style={{padding: 15}}>
            <CartItem />
          </ScrollView> */}
          <FlatList
            data={cart}
            renderItem={({item}) => <CartItem item={item} />}
          />
        </View>
      </View>
    </View>
  );
};
