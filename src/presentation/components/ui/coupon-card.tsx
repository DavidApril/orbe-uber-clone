import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useCouponStore, useUIStore} from '../../../store';
import {globalColors, globalStyles} from '../../theme/styles';
import {Coupon} from '../../../interfaces';

interface Props {
  height?: number;
  width?: number;
  coupon: Coupon;
  onPress: () => void;
}

export const CouponCard = ({height, width, coupon, onPress}: Props) => {
  const {isDarkMode} = useUIStore();
  const {setCuponSelected, couponSelected} = useCouponStore();

  const isCouponSelected = couponSelected?.id === coupon.id;

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          marginVertical: 38,
          position: 'relative',
          borderRadius: 30,
          transform: [{scale: !isCouponSelected ? 0.9 : 1}],

          flex: 1,
          width: width ?? 340,
          backgroundColor: globalColors.primaryColors.primary,
          height: height ?? 230,
          marginRight: 30,
        },
        globalStyles.boxShadow,
      ]}>
      <View
        style={{
          top: 80,
          bottom: 80,
          borderRadius: 100,
          right: -40,
          width: 80,
          position: 'absolute',
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
        }}
      />
      <View style={{marginLeft: 50, marginTop: 80}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', letterSpacing: 2}}>
          {coupon.name}
        </Text>
        <Text style={{fontSize: 18}}>{coupon.description}</Text>
      </View>
    </Pressable>
  );
};
