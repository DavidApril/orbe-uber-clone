import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {CartProduct, ProductRestaurant} from '../../../../interfaces';
import {globalColors} from '../../../theme/styles';
import {useCartStore, useUIStore} from '../../../../store';
import {CustomIcon} from '../../ui/custom-icon';
import {CartQuantitySelector} from './cart-quantity-selector';

interface Props {
  item?: CartProduct;
}

export const CartItem = ({item}: Props) => {
  const {isDarkMode} = useUIStore();
  const { removeProduct } = useCartStore();

  return item && (
    <View
      style={{
        borderRadius: 20,
        width: '100%',
        height: 100,
        padding: 13,
        gap: 15,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: isDarkMode
          ? globalColors.neutralColors.backgroundDark
          : globalColors.neutralColors.background,
      }}>
      <Pressable
        onPress={() => removeProduct(item)}
        style={{
          position: 'absolute',
          right: 18,
          top: 18,
          height: 10,
          width: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomIcon name="trash" />
      </Pressable>

      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 50,
          backgroundColor: 'white',
        }}></View>

      <View>
        <Text
          style={{
            fontSize: 16,

            color: isDarkMode
              ? globalColors.fontColor.textColorHeaderDark
              : globalColors.fontColor.textColorHeader,
          }}>
          {item?.product.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            color: isDarkMode
              ? globalColors.fontColor.textColorDark
              : globalColors.fontColor.textColor,
          }}>
          {item?.product.category}
        </Text>
      </View>

      <CartQuantitySelector product={item} />
    </View>
  );
};
