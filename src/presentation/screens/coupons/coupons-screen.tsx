import React, {useEffect} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {
  globalColors,
  globalDimensions,
  neutralColors,
  stateColors,
} from '../../theme/styles';
import {
  BuyCouponSelected,
  CouponCard,
  CustomIcon,
  FABGoBackButton,
  OpenDrawerMenu,
} from '../../components';
import {useAuthStore, useCouponStore, useUIStore} from '../../../store';
import {CouponService} from '../../../services';

export const CouponsScreen = () => {
  const {isDarkMode} = useUIStore();
  const {userByUid} = useAuthStore();
  const {coupons, setCoupons, couponSelected, setCuponSelected, buyCoupon} =
    useCouponStore();

  const getCoupons = async () => {
    const response = await CouponService.getCoupons();
    return response;
  };

  useEffect(() => {
    getCoupons().then(coupons => {
      setCoupons(coupons);
    });
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: !isDarkMode
            ? globalColors.neutralColors.background
            : globalColors.neutralColors.backgroundDark,
        }}>
        <OpenDrawerMenu />
        <View
          style={{
            flex: 1,
            paddingTop: 90,
          }}>
          <View
            style={{
              flex: 1,
              padding: 30,
            }}>
            <View
              style={{
                height: 100,
                gap: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'black',
                  fontSize: 20,
                  color: !isDarkMode
                    ? globalColors.fontColor.textColor
                    : globalColors.fontColor.textColorDark,
                }}>
                {userByUid?.cliente.name},
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: !isDarkMode
                    ? globalColors.fontColor.textColorHeader
                    : globalColors.fontColor.textColorHeaderDark,
                }}>
                Tienes{'  '}
                <Text
                  style={{
                    color: globalColors.primaryColors.primary,
                    fontSize: 50,
                  }}>
                  45{' '}
                </Text>
                creditos
              </Text>
            </View>
            <FlatList
              data={coupons}
              style={{height: 300}}
              renderItem={({item}) => (
                <CouponCard
                  onPress={() => setCuponSelected(item)}
                  coupon={item}
                />
              )}></FlatList>

            {couponSelected && (
              <BuyCouponSelected
                couponSelected={couponSelected}
                bottomName="Adquirir cupón"
                onPressDelete={() => setCuponSelected(null)}
                onPress={async () => {
                  await buyCoupon(
                    couponSelected!.id,
                    userByUid!.uid_firebase,
                  );
    
                }}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};
