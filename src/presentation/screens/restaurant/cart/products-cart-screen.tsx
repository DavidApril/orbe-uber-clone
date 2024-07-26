import {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  Modal,
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const {isDarkMode} = useUIStore();
  const {cart, getSummaryInformation} = useCartStore();
  const {itemsInCart, subTotal, tax, total} = getSummaryInformation();
  const summaryBottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: !isDarkMode
          ? globalColors.neutralColors.background
          : globalColors.neutralColors.background,
      }}></View>
  );
};
