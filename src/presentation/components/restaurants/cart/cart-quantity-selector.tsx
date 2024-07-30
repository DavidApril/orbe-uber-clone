import {Button, ButtonGroup} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Pressable, StyleProp, Text, View, ViewStyle} from 'react-native';
import {useCartStore, useUIStore} from '../../../../store';
import {globalColors, grayScale} from '../../../theme/styles';
import {CartProduct} from '../../../../interfaces';

interface Props {
  product: CartProduct;
  style?: StyleProp<ViewStyle>;
}

export const CartQuantitySelector = ({product}: Props) => {
  const {isDarkMode} = useUIStore();
  const {updateProductQuantity, removeProduct} = useCartStore();

  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        flex: 1,
        position: 'absolute',
        height: 35,
        right: 10,
        bottom: 18,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Pressable
        onPress={() => {
          if (product.quantity > 0) {
            updateProductQuantity(-1, product);
          } else {
            removeProduct(product);
          }
        }}
        style={{paddingHorizontal: 10}}>
        <Text
          style={{
            color: isDarkMode
              ? globalColors.fontColor.textColorDark
              : globalColors.fontColor.textColor,
          }}>
          -
        </Text>
      </Pressable>
      <View
        style={{
          height: 30,
          width: 30,
          borderRadius: 10,
          backgroundColor: globalColors.primaryColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', color: grayScale.white}}>{product?.quantity}</Text>
      </View>
      <Pressable
        onPress={() => updateProductQuantity(+1, product)}
        style={{paddingHorizontal: 10}}>
        <Text
          style={{
            color: isDarkMode
              ? globalColors.fontColor.textColorDark
              : globalColors.fontColor.textColor,
          }}>
          +
        </Text>
      </Pressable>
    </View>
  );
};
