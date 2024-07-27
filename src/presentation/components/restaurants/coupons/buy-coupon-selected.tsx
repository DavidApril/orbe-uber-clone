import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useAuthStore, useCouponStore, useUIStore} from '../../../../store';
import {
  fontColor,
  globalDimensions,
  neutralColors,
  stateColors,
} from '../../../theme/styles';
import {CustomIcon} from '../../ui/custom-icon';
import {Coupon} from '../../../../interfaces';

interface Props {
  onPress: () => void;
  bottomName: string;
  couponSelected: Coupon;
  onPressDelete: () => void;
}

export const BuyCouponSelected = ({
  bottomName,
  onPress,
  couponSelected,
  onPressDelete,
}: Props) => {
  const {isDarkMode} = useUIStore();
  const {userByUid} = useAuthStore();
  const {couponToUse} = useCouponStore();
  return (
    <View
      style={{
        height: 80,
        borderColor: neutralColors.borderDark,
        borderRadius: globalDimensions.borderRadiusButtom,
        borderWidth: 2,
      }}>
      <View
        style={{
          flex: 1,
          borderRadius: 20,
          backgroundColor: isDarkMode
            ? neutralColors.backgroundDarkAlpha
            : neutralColors.backgroundAlpha,
        }}>
        <View style={{paddingHorizontal: 20, top: 15, position: 'relative'}}>
          <Pressable
            onPress={onPressDelete}
            style={{
              position: 'absolute',
              right: -15,
              top: -35,
              height: 40,
              width: 40,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: stateColors.error,
            }}>
            <CustomIcon white={!isDarkMode ? true : false} name="trash" />
          </Pressable>

          <Pressable
            onPress={onPress}
            style={{
              position: 'absolute',
              right: 40,
              left: 40,
              bottom: -45,
              borderRadius: globalDimensions.borderRadiusButtom,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: stateColors.warning,
            }}>
            <Text>{bottomName}</Text>
          </Pressable>

          <Text style={{fontWeight: 'bold', color: stateColors.success}}>
            {couponSelected?.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: isDarkMode
                  ? fontColor.textColorDark
                  : fontColor.textColor,
              }}>
              {couponSelected?.description}
            </Text>
            <Text
              style={{
                color: isDarkMode
                  ? fontColor.textColorDark
                  : fontColor.textColor,
              }}>
              {couponSelected?.cupon_type}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
